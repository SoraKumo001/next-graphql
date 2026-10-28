"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphqlContentMapper = graphqlContentMapper;
const compiler_js_1 = require("./compiler.js");
function graphqlContentMapper(options) {
    return {
        name: "vite-plugin-graphql-content-mapper",
        enforce: "pre",
        transform(code, id) {
            // Ignore queries with query params (e.g. ?raw)
            const cleanId = id.split("?")[0];
            if (!/\.(graphql|gql)$/.test(cleanId)) {
                return null;
            }
            const { code: esmCode, schemaPath } = (0, compiler_js_1.compileGraphQLToEsm)(code, undefined, options);
            if (this.addWatchFile && schemaPath) {
                this.addWatchFile(schemaPath);
            }
            return {
                code: esmCode,
                map: { mappings: "" },
            };
        },
    };
}
exports.default = graphqlContentMapper;
