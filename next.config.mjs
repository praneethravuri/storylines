/** @type {import('next').NextConfig} */
const nextConfig = {
    // change in production
    experimental: {
        missingSuspenseWithCSRBailout: false,
      },
};

export default nextConfig;
