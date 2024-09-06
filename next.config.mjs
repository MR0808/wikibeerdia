/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ijtvuxdbxfqssvyrwmla.supabase.co'
            }
        ]
    },
    experimental: {
        serverSourceMaps: true,
        serverActions: {
            allowedOrigins: [
                'organic-space-rotary-phone-5r5w4qxq6qh7r9j-3000.app.github.dev',
                'localhost:3000'
            ]
        }
    }
};

export default nextConfig;
