/** @type {import('next').NextConfig} */
const nextConfig = {}
const StylelintPlugin = require('stylelint-webpack-plugin')

module.exports = {
  nextConfig,
  reactStrictMode: true,
  webpack: (config, options) => {
    config.plugins.push(new StylelintPlugin());
    return config;
  }
};
