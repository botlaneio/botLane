import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";
import { solutions } from "@/content/solutions";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/solutions", "/how-it-works", "/about", "/pricing", "/safeguards", "/book", "/assessment", "/legal/privacy", "/legal/terms"];
  return [...paths, ...solutions.map((s) => `/solutions/${s.slug}`)].map((p) => ({ url: `${siteUrl}${p}` }));
}
