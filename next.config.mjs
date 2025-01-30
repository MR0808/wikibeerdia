const isDev = process.argv.indexOf("dev") !== -1;
const isBuild = process.argv.indexOf("build") !== -1;
if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
    process.env.VELITE_STARTED = "1";
    const { build } = await import("velite");
    await build({ watch: isDev, clean: !isDev });
}

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "ijtvuxdbxfqssvyrwmla.supabase.co"
            }
        ]
    },
    experimental: {
        serverSourceMaps: true,
        serverActions: {
            allowedOrigins: [
                "organic-space-rotary-phone-5r5w4qxq6qh7r9j-3000.app.github.dev",
                "localhost:3000"
            ]
        }
    },
    compiler: {
        removeConsole: false
    },
    async headers() {
        return [
            {
                source: "/:path*{/}?",
                headers: [
                    {
                        key: "X-Accel-Buffering",
                        value: "no"
                    }
                ]
            }
        ];
    }
};

export default nextConfig;
