/**
 * @type { import("next").NextConfig}
 */
const config = {
  experimental: {
    serverComponentsExternalPackages: ["@whatwg-node"],
  },
};
// eslint-disable-next-line no-undef
module.exports = config;
