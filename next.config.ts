import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow the local Cascade browser-preview proxy origin during development.
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
