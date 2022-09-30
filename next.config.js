/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",

  compiler: {
    reactRemoveProperties: true,
  },
};

module.exports = nextConfig;
