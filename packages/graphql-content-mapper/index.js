const fs = require("fs");
const path = require("path");
const { parse } = require("graphql");
const { executeCodegen } = require("@graphql-codegen/cli");

const originalStdoutWrite = process.stdout.write.bind(process.stdout);
// Mute stdout during any library logs so JSON-RPC framing is not corrupted
process.stdout.write = (chunk, encoding, callback) => {
  if (typeof callback === "function") callback();
  return true;
};

function send(response) {
  const json = JSON.stringify(response);
  const len = Buffer.byteLength(json, "utf-8");
  const header = `Content-Length: ${len}\r\n\r\n`;
  originalStdoutWrite(header + json);
}

let buffer = Buffer.alloc(0);

process.stdin.on("data", (chunk) => {
  buffer = Buffer.concat([buffer, chunk]);
  while (true) {
    const headerEnd = buffer.indexOf("\r\n\r\n");
    if (headerEnd === -1) break;
    const header = buffer.subarray(0, headerEnd).toString("utf-8");
    const match = header.match(/Content-Length:\s*(\d+)/i);
    if (!match) break;
    const contentLength = parseInt(match[1], 10);
    const bodyStart = headerEnd + 4;
    if (buffer.length < bodyStart + contentLength) {
      break;
    }
    const body = buffer.subarray(bodyStart, bodyStart + contentLength).toString("utf-8");
    buffer = buffer.subarray(bodyStart + contentLength);

    try {
      const msg = JSON.parse(body);
      handleMessage(msg);
    } catch (e) {}
  }
});

function deduplicateDeclarations(content) {
  const lines = content.split("\n");
  const seen = new Set();
  const cleaned = [];
  let skipping = false;
  let braceCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!skipping) {
      const match = line.match(/^export (?:type|enum)\s+(\w+)/);
      if (match) {
        const name = match[1];
        if (seen.has(name)) {
          skipping = true;
          braceCount = (line.match(/{/g) || []).length - (line.match(/}/g) || []).length;
          if (braceCount === 0 && line.trim().endsWith(";")) {
            skipping = false;
          }
          continue;
        } else {
          seen.add(name);
        }
      }
      cleaned.push(line);
    } else {
      braceCount += (line.match(/{/g) || []).length - (line.match(/}/g) || []).length;
      if (braceCount === 0 && line.trim().endsWith(";")) {
        skipping = false;
      }
    }
  }
  return cleaned.join("\n");
}

async function transformGraphQL(fileName, content, projectDir) {
  if (fileName.endsWith("schema.graphql")) {
    return {
      text: "export {};",
      extension: ".ts",
      mappings: [],
    };
  }

  const schemaPath = path.join(projectDir, "graphql", "schema.graphql");
  if (!fs.existsSync(schemaPath)) {
    return {
      text: "export {};",
      extension: ".ts",
      mappings: [],
    };
  }

  try {
    const doc = parse(content);

    const codegenResult = await executeCodegen({
      schema: schemaPath,
      documents: fileName,
      generates: {
        "virtual.ts": {
          plugins: ["typescript", "typescript-operations"],
          config: {
            scalars: { DateTime: "string" },
            skipTypename: false,
          },
        },
      },
    });

    const rawGenerated = codegenResult?.result?.[0]?.content || "";
    const cleanGenerated = deduplicateDeclarations(rawGenerated);

    const operations = doc.definitions
      .filter((d) => d.kind === "OperationDefinition" && d.name)
      .map((d) => ({
        name: d.name.value,
        op: d.operation.charAt(0).toUpperCase() + d.operation.slice(1),
      }));

    const docTypeDefinitions = `
import type { DocumentNode } from "graphql";

export interface TypedDocumentNode<
  Result = { [key: string]: any },
  Variables = { [key: string]: any },
> extends DocumentNode {
  /**
   * Type signature used for inference
   */
  __apiType?: (variables: Variables) => Result;
}
`;

    const docExports = operations
      .map((o) => {
        const varType = o.name + o.op + "Variables";
        const resType = o.name + o.op;
        return `export declare const ${o.name}: TypedDocumentNode<${resType}, ${varType}>;`;
      })
      .join("\n");

    const fullText = [
      docTypeDefinitions,
      cleanGenerated,
      docExports,
    ].join("\n\n");

    
    return {
      text: fullText,
      extension: ".ts",
      mappings: [],
    };
  } catch (err) {
    return {
      text: "export {};",
      extension: ".ts",
      mappings: [],
    };
  }
}

let projectDirMap = new Map();

async function handleMessage(msg) {
  if (msg.id === undefined) return;

  let result = null;
  switch (msg.method) {
    case "initialize":
      result = {
        positionEncoding: "utf-16",
        diagnosticSource: "graphql-content-mapper",
      };
      break;
    case "openProject":
      {
        const configPath = msg.params?.configFileName;
        const projectDir = configPath ? path.dirname(configPath) : process.cwd();
        projectDirMap.set(msg.params?.projectHandle, projectDir);
        result = {};
      }
      break;
    case "transform":
      {
        const projectDir = projectDirMap.get(msg.params?.projectHandle) || process.cwd();
        result = await transformGraphQL(msg.params?.fileName, msg.params?.content, projectDir);
      }
      break;
    case "closeProject":
      projectDirMap.delete(msg.params?.projectHandle);
      result = null;
      break;
    default:
      result = {};
  }
  send({
    jsonrpc: "2.0",
    id: msg.id,
    result,
  });
}
