/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MONGODB_URL: process.env.MONGODB_URI,
    },
    reactStrictMode: true,
};

export default nextConfig;
