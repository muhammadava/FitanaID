import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Proxy semua request /api/v1/* ke FastAPI backend
  reactCompiler: true,
  async rewrites() {
    return [
      // Health check endpoint (root level)
      {
        source: "/api/health",
        destination: `${process.env.BACKEND_URL}/health`,
      },
      // Semua endpoint API v1
      {
        source: "/api/v1/:path*",
        destination: `${process.env.BACKEND_URL}/api/v1/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
