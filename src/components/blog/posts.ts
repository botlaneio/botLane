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

export type BlogPost = {
  slug: string;
  category: BlogCategory;
  title: string;
  excerpt: string;
  art: BlogArtVariant;
  date?: string;
  href?: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "human-in-the-loop",
    category: "Agency Growth",
    title: "What “human-in-the-loop” really means in AI operations",
    excerpt:
      "AI can do the work, but you stay in control. Here’s how we implement real human oversight at BotLane.",
    art: "skyline",
    date: "15 Oct 2026",
    href: "/blog/human-in-the-loop",
  },
  {
    slug: "operational-bottlenecks",
    category: "AI Operations",
    title: "5 operational bottlenecks that slow down growing agencies",
    excerpt: "And how to remove them with simple, managed automation systems.",
    art: "horizon",
    date: "15 Oct 2026",
    href: "/blog/operational-bottlenecks",
  },
  {
    slug: "lane-for-client-reporting",
    category: "Client Reporting",
    title: "Placeholder Title 1",
    excerpt: "Faster reports, fewer follow-ups, and happier clients.",
    art: "gallery",
  },
  {
    slug: "spreadsheets-to-automated-reports",
    category: "Client Reporting",
    title: "From spreadsheets to automated client reports",
    excerpt: "What changes when the weekly report is prepared for you, and what stays with your team.",
    art: "folds",
    date: "15 Oct 2026",
    href: "/blog/spreadsheets-to-automated-reports",
  },
  {
    slug: "tools-agencies-use",
    category: "Tools & Integrations",
    title: "The tools agencies already use (and how we work with them)",
    excerpt: "No new tools. Just reliable workflows across your existing stack.",
    art: "ribbons",
    date: "15 Oct 2026",
    href: "/blog/tools-agencies-use",
  },
  {
    slug: "why-we-built-botlane",
    category: "Behind the Build",
    title: "Why we built BotLane",
    excerpt: "A look at the thinking, decisions, and principles behind BotLane.",
    art: "ember",
    date: "15 Oct 2026",
    href: "/blog/why-we-built-botlane",
  },
];
