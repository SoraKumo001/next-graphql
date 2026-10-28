"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileGraphQLToEsm = compileGraphQLToEsm;
const fs = __importStar(require("node:fs"));
const graphql_1 = require("graphql");
const config_js_1 = require("./config.js");
function extractEnumsFromSchema(schemaPath) {
    const enums = {};
    if (!fs.existsSync(schemaPath)) {
        return enums;
    }
    try {
        const schemaContent = fs.readFileSync(schemaPath, "utf-8");
        const schemaDoc = (0, graphql_1.parse)(schemaContent, { noLocation: true });
        for (const def of schemaDoc.definitions) {
            if (def.kind === "EnumTypeDefinition") {
                const enumDef = def;
                const enumName = enumDef.name.value;
                const values = {};
                if (enumDef.values) {
                    for (const val of enumDef.values) {
                        values[val.name.value] = val.name.value;
                    }
                }
                enums[enumName] = values;
            }
        }
    }
    catch {
        // If schema parsing fails, return empty enums
    }
    return enums;
}
function findFragmentSpreads(node, spreads) {
    if (!node || typeof node !== "object")
        return;
    if (node.kind === "FragmentSpread") {
        spreads.add(node.name.value);
    }
    for (const key of Object.keys(node)) {
        if (key !== "loc") {
            findFragmentSpreads(node[key], spreads);
        }
    }
}
function compileGraphQLToEsm(source, projectDir, customOptions) {
    const { schemaPath } = (0, config_js_1.resolveConfig)(projectDir, customOptions);
    const targetSchemaPath = schemaPath;
    const doc = (0, graphql_1.parse)(source, { noLocation: true });
    const operations = [];
    const fragments = new Map();
    for (const def of doc.definitions) {
        if (def.kind === "OperationDefinition") {
            operations.push(def);
        }
        else if (def.kind === "FragmentDefinition") {
            fragments.set(def.name.value, def);
        }
    }
    const codeBlocks = [];
    // Helper to collect all required fragments recursively
    function getRequiredFragments(root) {
        const needed = new Set();
        findFragmentSpreads(root, needed);
        const result = [];
        const visited = new Set();
        const queue = Array.from(needed);
        while (queue.length > 0) {
            const fragName = queue.shift();
            if (visited.has(fragName))
                continue;
            visited.add(fragName);
            const fragDef = fragments.get(fragName);
            if (fragDef) {
                result.push(fragDef);
                const subSpreads = new Set();
                findFragmentSpreads(fragDef, subSpreads);
                for (const sub of subSpreads) {
                    if (!visited.has(sub)) {
                        queue.push(sub);
                    }
                }
            }
        }
        return result;
    }
    let defaultExportName;
    for (const op of operations) {
        const opName = op.name?.value;
        if (!opName)
            continue;
        if (!defaultExportName) {
            defaultExportName = opName;
        }
        const opFragments = getRequiredFragments(op);
        const opDoc = {
            kind: "Document",
            definitions: [op, ...opFragments],
        };
        codeBlocks.push(`export const ${opName} = ${JSON.stringify(opDoc)};`);
    }
    for (const [fragName, fragDef] of fragments.entries()) {
        const subFragments = getRequiredFragments(fragDef);
        const fragDoc = {
            kind: "Document",
            definitions: [fragDef, ...subFragments],
        };
        codeBlocks.push(`export const ${fragName} = ${JSON.stringify(fragDoc)};`);
    }
    // Enums from schema
    const enums = extractEnumsFromSchema(targetSchemaPath);
    for (const [enumName, enumValues] of Object.entries(enums)) {
        codeBlocks.push(`export const ${enumName} = ${JSON.stringify(enumValues)};`);
    }
    if (defaultExportName) {
        codeBlocks.push(`export default ${defaultExportName};`);
    }
    else if (operations.length === 0 && fragments.size > 0) {
        const firstFrag = fragments.keys().next().value;
        codeBlocks.push(`export default ${firstFrag};`);
    }
    else {
        codeBlocks.push(`export default ${JSON.stringify(doc)};`);
    }
    return {
        code: codeBlocks.join("\n"),
        schemaPath: targetSchemaPath,
    };
}
