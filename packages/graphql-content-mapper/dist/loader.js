"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = graphqlContentMapperLoader;
const node_process_1 = __importDefault(require("node:process"));
const compiler_js_1 = require("./compiler.js");
function graphqlContentMapperLoader(source) {
    if (this.cacheable) {
        this.cacheable();
    }
    const options = typeof this.getOptions === "function" ? this.getOptions() : {};
    const projectDir = this.rootContext || node_process_1.default.cwd();
    const { code, schemaPath } = (0, compiler_js_1.compileGraphQLToEsm)(source, projectDir, options);
    if (this.addDependency && schemaPath) {
        this.addDependency(schemaPath);
    }
    return code;
}
// Support CommonJS require
try {
    if (typeof module !== "undefined" && module.exports) {
        module.exports = graphqlContentMapperLoader;
    }
}
catch {
    // Ignore in pure ESM environment
}
