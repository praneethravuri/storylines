/** @type {import('next').NextConfig} */
const nextConfig = {
  // change in production
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  reactStrictMode: true,
  images: {
    domains: ['assets.aceternity.com'],
  },
};

export default nextConfig;
