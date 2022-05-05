/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  /* env: {
    image:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3001"
        : "https://studentconnection.herokuapp.com",
  }, */
};

module.exports = nextConfig;
