import type { BlogArtVariant } from "./blog-art";

/**
 * Blog posts shown on /blog, newest first. The first three render as large cards.
 *
 * Cards without an `href` show "Coming soon" and don't link. To publish an article,
 * add its body to articles.ts (same slug), then give the post a `date` (e.g.
 * "12 Oct 2026") and `href: "/blog/<slug>"`; the card becomes a "Read article" link.
 */

export const BLOG_CATEGORIES = [
  "AI Operations",
  "Agency Growth",
  "Client Reporting",
  "Lead Follow-up",
  "Invoice Follow-up",
  "Tools & Integrations",
  "Behind the Build",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

/** The live site's address, for canonical links, the sitemap and structured data. */
export const SITE_URL = "https://botlane.io";

export type BlogPost = {
  slug: string;
  category: BlogCategory;
  title: string;
  excerpt: string;
  art: BlogArtVariant;
  date?: string;
  /** The same date as YYYY-MM-DD, for search engines. */
  isoDate?: string;
  href?: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "ppc-report-commentary",
    category: "Client Reporting",
    title: "How to write PPC report commentary clients actually read",
    excerpt: "A four-part structure, before-and-after examples and a summary template you can copy.",
    art: "skyline",
    date: "15 Oct 2026",
    isoDate: "2026-10-15",
    href: "/blog/ppc-report-commentary",
  },
  {
    slug: "google-ads-meta-ga4-numbers-dont-match",
    category: "Client Reporting",
    title: "Why Google Ads, Meta and GA4 never match (and how to explain it to clients)",
    excerpt: "The usual causes, which number to report, and a note you can send your client.",
    art: "horizon",
    date: "15 Oct 2026",
    isoDate: "2026-10-15",
    href: "/blog/google-ads-meta-ga4-numbers-dont-match",
  },
  {
    slug: "chase-overdue-retainer-invoice",
    category: "Invoice Follow-up",
    title: "How to chase an overdue retainer invoice without straining the relationship",
    excerpt: "A reminder schedule, email wording for each step, and who should send it.",
    art: "gallery",
    date: "15 Oct 2026",
    isoDate: "2026-10-15",
    href: "/blog/chase-overdue-retainer-invoice",
  },
  {
    slug: "agency-lead-response-time",
    category: "Lead Follow-up",
    title: "How fast should an agency reply to a new enquiry?",
    excerpt: "Set a response standard your team can keep, and what a good first reply contains.",
    art: "folds",
    date: "15 Oct 2026",
    isoDate: "2026-10-15",
    href: "/blog/agency-lead-response-time",
  },
  {
    slug: "human-in-the-loop-ai-for-agencies",
    category: "AI Operations",
    title: "Human-in-the-loop AI for agencies: what approval should really mean",
    excerpt: "Why agencies need approval, not monitoring, and the questions to ask any AI vendor.",
    art: "ribbons",
    date: "15 Oct 2026",
    isoDate: "2026-10-15",
    href: "/blog/human-in-the-loop-ai-for-agencies",
  },
  {
    slug: "automated-client-reporting-for-agencies",
    category: "Client Reporting",
    title: "Automated client reporting for agencies: what to automate and what to keep",
    excerpt: "Split the work between automation and your team, and switch off spreadsheets safely.",
    art: "corridor",
    date: "15 Oct 2026",
    isoDate: "2026-10-15",
    href: "/blog/automated-client-reporting-for-agencies",
  },
  {
    slug: "why-we-built-botlane",
    category: "Behind the Build",
    title: "Why we built BotLane",
    excerpt: "A look at the thinking, decisions, and principles behind BotLane.",
    art: "ember",
    date: "15 Oct 2026",
    isoDate: "2026-10-15",
    href: "/blog/why-we-built-botlane",
  },
];
