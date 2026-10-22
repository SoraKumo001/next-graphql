import * as fs from "node:fs";
import * as path from "node:path";
import process from "node:process";
// @ts-expect-error graphql-tag/loader has no official types
import loader from "graphql-tag/loader";

export interface LoaderContext {
  cacheable?: () => void;
  [key: string]: any;
}

export default function graphqlContentMapperLoader(this: LoaderContext, source: string): string {
  if (this.cacheable) {
    this.cacheable();
  }
  const rawJs: string = loader.call(this, source);

  // Read schema to find enums and append them to runtime module.exports
  try {
    const schemaPath = path.resolve(process.cwd(), "graphql/schema.graphql");
    if (fs.existsSync(schemaPath)) {
      const schemaText = fs.readFileSync(schemaPath, "utf-8");
      const enumMatches = [...schemaText.matchAll(/enum\s+(\w+)\s*\{([^}]+)\}/g)];
      let enumCode = "";
      for (const match of enumMatches) {
        const enumName = match[1];
        const values = match[2]
          .split("\n")
          .map((v: string) => v.trim())
          .filter((v: string) => v && !v.startsWith("#"));
        const objEntries = values.map((v: string) => `"${v}": "${v}"`).join(", ");
        enumCode += `\nmodule.exports["${enumName}"] = { ${objEntries} };\n`;
      }
      return rawJs + enumCode;
    }
  } catch {
    // Ignore error
  }

  return rawJs;
}

module.exports = graphqlContentMapperLoader;
