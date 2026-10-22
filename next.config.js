/**
 * @type { import("next").NextConfig}
 */
const path = require("path");

const graphqlLoader = path.resolve(__dirname, "packages/graphql-content-mapper/dist/loader.js");

const config = {
  serverExternalPackages: ["@whatwg-node"],
  typescript: {
    // Next.js internal typecheck uses standard tsc without --runExternalCode
    // We run typecheck via 'npm run typecheck'
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: graphqlLoader,
    });
    return config;
  },
  turbopack: {
    rules: {
      "*.graphql": {
        loaders: [graphqlLoader],
        as: "*.js",
      },
    },
  },
};
module.exports = config;
