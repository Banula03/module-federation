/** @type {import('next').NextConfig} */
const nextConfig = {
  // No federation plugin for now, just test if it starts
  webpack(config, options) {
    return config;
  },
};

module.exports = nextConfig;
