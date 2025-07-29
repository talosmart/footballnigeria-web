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
    ],
  },
};

export default nextConfig;
