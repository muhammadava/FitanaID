import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Proxy semua request /api/v1/* ke FastAPI backend
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${process.env.BACKEND_URL}/api/v1/:path*`,
      },
    ];
  },
  // Izinkan image dari Google Profile
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
