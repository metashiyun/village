/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'static.shiyun.org',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
