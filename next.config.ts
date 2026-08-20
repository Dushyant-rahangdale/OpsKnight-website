import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.NODE_ENV === "production" ? "export" : undefined,
  // Directory index (`page/index.html`) so Cloudflare Pages does not content-negotiate
  // a sibling RSC payload (`page.txt`) for extensionless docs URLs.
  trailingSlash: true,
  images: {
    // When using output: 'export', Next.js cannot optimize images at build time.
    // We must leave unoptimized: true to allow static export to work properly.
    unoptimized: true,
  },
};

export default nextConfig;
