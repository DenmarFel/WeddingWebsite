import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable origin checks for local network access
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
    ];
  },
};

export default nextConfig;
