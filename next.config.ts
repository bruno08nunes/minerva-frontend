import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "3333",
            },
            {
                protocol: "https",
                hostname: "minerva-backend-zyhi.onrender.com",
            },
        ],
        
    },
};

export default nextConfig;
