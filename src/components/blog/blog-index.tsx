"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { BlogArt } from "./blog-art";
import { BLOG_CATEGORIES, BLOG_POSTS, type BlogCategory, type BlogPost } from "./posts";

type Filter = "All" | BlogCategory;

export function BlogIndex() {
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");

  const posts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return BLOG_POSTS.filter(
      (p) =>
        (filter === "All" || p.category === filter) &&
        (!q || `${p.title} ${p.excerpt} ${p.category}`.toLowerCase().includes(q)),
    );
  }, [filter, query]);

  // With no filter the first three are the large feature cards, as in the design.
  const featured = filter === "All" && !query ? posts.slice(0, 3) : [];
  const rest = filter === "All" && !query ? posts.slice(3) : posts;

  return (
    <section className="mx-auto max-w-[75rem] px-6 pb-20 sm:pb-24">
      {/* Filters + search */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
        <div
          role="group"
          aria-label="Filter articles by topic"
          className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
        >
          {(["All", ...BLOG_CATEGORIES] as Filter[]).map((c) => {
            const active = c === filter;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(c)}
                className={`h-10 shrink-0 whitespace-nowrap rounded-full border px-4 text-[0.8125rem] font-medium transition ${
                  active
                    ? "border-ink bg-ink text-white"
                    : "border-line bg-white text-ink-2 hover:border-[#d6d6da] hover:text-ink"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
        <label className="relative block w-full lg:w-[15rem] lg:shrink-0">
          <span className="sr-only">Search articles</span>
          <Search size={15} aria-hidden className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-faint" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles…"
            className="h-10 w-full rounded-full border border-line bg-white pl-10 pr-4 text-base text-ink placeholder:text-faint focus:border-[#c9c9ce] focus:outline-none sm:text-[0.8125rem]"
          />
        </label>
      </div>

      {posts.length === 0 ? (
        <p className="mt-16 text-center text-sm text-muted">No articles match that yet.</p>
      ) : (
        <>
          {featured.length > 0 && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((post) => (
                <FeatureCard key={post.slug} post={post} />
              ))}
            </div>
          )}
          {rest.length > 0 && (
            <div className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${featured.length ? "mt-4" : "mt-6"}`}>
              {rest.map((post) => (
                <CompactCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}

function Meta({ post }: { post: BlogPost }) {
  return (
    <div className="font-mono text-[0.625rem] font-medium uppercase tracking-[0.14em] text-faint">
      {post.category}
      {post.date && <span> · {post.date}</span>}
    </div>
  );
}

function ReadMore({ post }: { post: BlogPost }) {
  if (!post.href) {
    return <span className="text-[0.8125rem] font-medium text-faint">Coming soon</span>;
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-lane">
      Read article
      <ArrowRight size={13} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
    </span>
  );
}

/** Wraps a card in a link only when the article exists. */
function CardShell({ post, className, children }: { post: BlogPost; className: string; children: React.ReactNode }) {
  const base = `group overflow-hidden rounded-[0.875rem] border border-line bg-white ${className}`;
  if (post.href) {
    return (
      <Link href={post.href} className={`${base} transition hover:border-[#dcdcde] hover:shadow-[0_0.75rem_1.75rem_-1rem_rgba(20,20,40,0.18)]`}>
        {children}
      </Link>
    );
  }
  return <article className={base}>{children}</article>;
}

function FeatureCard({ post }: { post: BlogPost }) {
  return (
    <CardShell post={post} className="flex flex-col">
      <div className="aspect-[16/7] overflow-hidden bg-surface sm:aspect-[8/3]">
        <BlogArt variant={post.art} />
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <Meta post={post} />
        <h2 className="mt-2 text-[1.0625rem] font-medium leading-[1.25] tracking-[-0.015em] text-ink sm:text-lg">{post.title}</h2>
        <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted">{post.excerpt}</p>
        <div className="mt-auto pt-4">
          <ReadMore post={post} />
        </div>
      </div>
    </CardShell>
  );
}

function CompactCard({ post }: { post: BlogPost }) {
  return (
    <CardShell post={post} className="flex items-stretch gap-4 p-3 sm:p-3.5">
      <div className="flex min-w-0 flex-1 flex-col py-1 pl-1">
        <Meta post={post} />
        <h2 className="mt-1.5 text-[0.9375rem] font-medium leading-[1.25] tracking-[-0.01em] text-ink">{post.title}</h2>
        <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted">{post.excerpt}</p>
        <div className="mt-auto pt-3">
          <ReadMore post={post} />
        </div>
      </div>
      <div className="w-[5.5rem] shrink-0 self-stretch overflow-hidden rounded-[0.5rem] bg-surface sm:w-[6rem]">
        <BlogArt variant={post.art} />
      </div>
    </CardShell>
  );
}
