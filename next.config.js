/**
 * @type { import("next").NextConfig}
 */
const config = {
  experimental: {
    serverComponentsExternalPackages: ["@whatwg-node"],
  },
};
module.exports = config;
