import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "blog.footballnigeria.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "football.ogitechconsults.ng",
        pathname: "/**",
      },
        {
        protocol: "https",
        hostname: "flagcdn.com",
      },
    ],
  },
   eslint: {
    // ⚠️ This will completely disable ESLint checks during builds
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
