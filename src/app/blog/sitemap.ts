import type { MetadataRoute } from "next";
import { ARTICLES } from "@/components/blog/articles";
import { BLOG_POSTS, SITE_URL } from "@/components/blog/posts";

// Served at /blog/sitemap.xml: the blog index and every published post.
export default function sitemap(): MetadataRoute.Sitemap {
  const published = BLOG_POSTS.filter((p) => p.href && ARTICLES[p.slug]);
  const newest = published.map((p) => p.isoDate).filter(Boolean).sort().pop();
  return [
    { url: `${SITE_URL}/blog`, ...(newest ? { lastModified: newest } : {}) },
    ...published.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      ...(p.isoDate ? { lastModified: p.isoDate } : {}),
    })),
  ];
}
