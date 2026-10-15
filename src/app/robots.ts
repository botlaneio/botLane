import type { MetadataRoute } from "next";

// Served at /robots.txt: every page may be crawled, and crawlers are pointed at the blog sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://botlane.io/blog/sitemap.xml",
  };
}
