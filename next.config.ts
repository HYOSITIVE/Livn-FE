import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    domains: ["live.staticflickr.com", "media.gettyimages.com"],
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors during build
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors during build
  },
  env: {
    NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
  },
  async headers() {
    return [
      {
        source: "/(.*)", // Match all routes
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; connect-src http: https:; img-src 'self' data: https: http:; script-src 'self' 'unsafe-inline' https: http:;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
