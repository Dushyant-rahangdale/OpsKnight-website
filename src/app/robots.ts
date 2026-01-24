import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/brand";

const baseUrl = `https://${BRAND.domain}`;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
