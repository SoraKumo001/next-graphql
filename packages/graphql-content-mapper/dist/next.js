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
exports.withGraphQLContentMapper = withGraphQLContentMapper;
const path = __importStar(require("node:path"));
function withGraphQLContentMapper(nextConfig = {}, options) {
    const loaderPath = path.resolve(__dirname, "./loader.js");
    const loaderOptions = options && Object.keys(options).length > 0 ? options : undefined;
    return {
        ...nextConfig,
        webpack: (config, webpackOptions) => {
            config.module.rules.push({
                test: /\.(graphql|gql)$/,
                exclude: /node_modules/,
                loader: loaderPath,
                options: loaderOptions,
            });
            if (typeof nextConfig.webpack === "function") {
                return nextConfig.webpack(config, webpackOptions);
            }
            return config;
        },
        turbopack: {
            ...nextConfig.turbopack,
            rules: {
                ...nextConfig.turbopack?.rules,
                "*.graphql": {
                    loaders: loaderOptions
                        ? [{ loader: loaderPath, options: loaderOptions }]
                        : [loaderPath],
                    as: "*.js",
                },
                "*.gql": {
                    loaders: loaderOptions
                        ? [{ loader: loaderPath, options: loaderOptions }]
                        : [loaderPath],
                    as: "*.js",
                },
            },
        },
    };
}
exports.default = withGraphQLContentMapper;
try {
    if (typeof module !== "undefined" && module.exports) {
        module.exports = withGraphQLContentMapper;
        module.exports.withGraphQLContentMapper = withGraphQLContentMapper;
    }
}
catch {
    // Ignore in pure ESM environment
}
