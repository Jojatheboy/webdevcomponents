import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "www.souzaesouza.com.br",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "souzaesouza.com.br",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.souzaesouza.com.br",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "souzaesouza.com.br",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
