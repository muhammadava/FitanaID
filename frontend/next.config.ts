import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/api/health", destination: `${process.env.BACKEND_URL}/health` },
      { source: "/api/v1/:path*", destination: `${process.env.BACKEND_URL}/api/v1/:path*` },
    ];
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "lh3.googleusercontent.com" }],
  },
};

export default nextConfig;
