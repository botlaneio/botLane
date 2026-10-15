import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BlogArt } from "./blog-art";
import { readingMinutes, type Article, type ArticleBlock } from "./articles";
import { BLOG_POSTS, SITE_URL, type BlogPost } from "./posts";

/** Anchor id for a section heading, e.g. "Where to start" → "where-to-start". */
export function headingId(text: string) {
  return text
    .toLowerCase()
    .replace(/[“”"’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Renders **bold** and [label](href) inside a line of copy. */
function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const bold = part.match(/^\*\*([^*]+)\*\*$/);
        if (bold) return <strong key={i} className="font-semibold text-ink">{bold[1]}</strong>;
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          const [, label, href] = link;
          const className = "font-medium text-ink underline decoration-line decoration-1 underline-offset-[0.2em] transition hover:text-lane hover:decoration-lane";
          return href.startsWith("/") ? (
            <Link key={i} href={href} className={className}>{label}</Link>
          ) : (
            <a key={i} href={href} className={className}>{label}</a>
          );
        }
        return part;
      })}
    </>
  );
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2
          id={headingId(block.text)}
          className="mt-12 scroll-mt-24 text-[1.5rem] font-semibold leading-[1.2] tracking-[-0.025em] text-ink sm:text-[1.625rem]"
        >
          {block.text}
        </h2>
      );
    case "h3":
      return <h3 className="mt-8 text-[1.125rem] font-semibold tracking-[-0.015em] text-ink">{block.text}</h3>;
    case "p":
      return <p className="mt-5"><Inline text={block.text} /></p>;
    case "ul":
      return (
        <ul className="mt-5 space-y-3">
          {block.items.map((item) => (
            <li key={item} className="relative pl-6">
              <span aria-hidden className="absolute left-1 top-[0.7em] size-1.5 rounded-full bg-lane" />
              <Inline text={item} />
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="mt-5 space-y-3">
          {block.items.map((item, i) => (
            <li key={item} className="relative pl-8">
              <span aria-hidden className="absolute left-0 top-[0.15em] font-mono text-[0.8125rem] font-semibold text-lane">
                {String(i + 1).padStart(2, "0")}
              </span>
              <Inline text={item} />
            </li>
          ))}
        </ol>
      );
    case "callout":
      return (
        <aside className="mt-8 rounded-[0.875rem] border border-lane/20 bg-lane/[0.04] p-5 sm:p-6">
          <div className="flex items-center gap-2 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-lane">
            <span className="size-1.5 rounded-full bg-lane" />
            {block.title}
          </div>
          <p className="mt-2 text-ink"><Inline text={block.text} /></p>
        </aside>
      );
    case "template":
      return (
        <figure className="mt-8 overflow-hidden rounded-[0.875rem] border border-line bg-white">
          <figcaption className="border-b border-line bg-surface px-5 py-2.5 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted">
            {block.title}
          </figcaption>
          <div className="space-y-3 px-5 py-4 text-[0.9375rem] leading-relaxed text-ink">
            {block.lines.map((line) => (
              <p key={line}><Inline text={line} /></p>
            ))}
          </div>
        </figure>
      );
    case "compare":
      return (
        <div className="mt-5 grid gap-3 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div className="rounded-[0.75rem] border border-line bg-surface/60 p-4">
            <div className="font-mono text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-faint">Before</div>
            <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">{block.before}</p>
          </div>
          <div className="rounded-[0.75rem] border border-lane/20 bg-white p-4">
            <div className="font-mono text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-lane">After</div>
            <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink">{block.after}</p>
          </div>
        </div>
      );
    case "quote":
      return (
        <blockquote className="mt-8 border-l-2 border-lane pl-5 text-[1.1875rem] leading-relaxed text-ink">
          <Inline text={block.text} />
        </blockquote>
      );
  }
}

export function ArticleView({ post, article }: { post: BlogPost; article: Article }) {
  const sections = article.body.filter((b): b is Extract<ArticleBlock, { type: "h2" }> => b.type === "h2");
  const more = BLOG_POSTS.filter((p) => p.slug !== post.slug && p.href).slice(0, 3);

  const url = `${SITE_URL}/blog/${post.slug}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: article.dek,
      ...(post.isoDate ? { datePublished: post.isoDate, dateModified: post.isoDate } : {}),
      mainEntityOfPage: url,
      author: { "@type": "Organization", name: "BotLane", url: SITE_URL },
      publisher: { "@type": "Organization", name: "BotLane LLC", url: SITE_URL },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];

  return (
    <article>
      <script
        type="application/ld+json"
        // Static JSON from our own post data; "<" is escaped so it can't close the tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      {/* Header */}
      <header className="mx-auto max-w-[75rem] px-6 pt-10 sm:pt-14">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition hover:text-ink"
        >
          <ArrowLeft size={13} aria-hidden />
          <span>All articles</span>
        </Link>
        <div className="mt-8 max-w-[47.5rem]">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted">
            <span className="size-2 rounded-full bg-lane" />
            <span>{post.category}</span>
            {post.date && <span className="text-faint">· {post.date}</span>}
            <span className="text-faint">· {readingMinutes(article)} min read</span>
          </div>
          <h1 className="mt-4 text-[clamp(2rem,4.6vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-ink">
            {post.title}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-[1.125rem]">{article.dek}</p>
          <div className="mt-6 text-[0.8125rem] text-muted">
            By <span className="font-medium text-ink">The BotLane team</span>
          </div>
        </div>
        <div className="mt-10 aspect-[16/8] overflow-hidden rounded-[1rem] bg-surface sm:aspect-[3/1]">
          <BlogArt variant={post.art} />
        </div>
      </header>

      {/* Body + contents */}
      <div className="mx-auto grid max-w-[75rem] gap-10 px-6 pt-10 pb-16 sm:pt-12 lg:grid-cols-[minmax(0,47.5rem)_1fr] lg:gap-16 lg:pb-20">
        <div className="text-[1.0625rem] leading-[1.75] text-ink-2">
          {article.body.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>

        {sections.length > 2 && (
          <nav aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-24 border-l border-line pl-5">
              <div className="font-mono text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-faint">On this page</div>
              <ul className="mt-3 space-y-2.5 text-[0.8125rem] leading-snug">
                {sections.map((s) => (
                  <li key={s.text}>
                    <a href={`#${headingId(s.text)}`} className="text-muted transition hover:text-ink">
                      {s.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        )}
      </div>

      {/* Closing CTA */}
      <section className="mx-auto max-w-[75rem] px-6">
        <div className="flex flex-col gap-5 rounded-[1rem] border border-line bg-white p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <h2 className="text-[1.25rem] font-semibold tracking-[-0.02em] text-ink">See Lane prepare the work</h2>
            <p className="mt-1.5 max-w-[32rem] text-sm leading-relaxed text-muted">
              Lane prepares the reports, replies and reminders. Your team approves every one before it goes out.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link
              href="/demo"
              className="inline-flex h-11 items-center gap-2 rounded-[0.5rem] bg-btn px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-btn-hover"
            >
              Book a demo
              <ArrowRight size={15} aria-hidden />
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex h-11 items-center rounded-[0.5rem] border border-line bg-white px-5 text-sm font-semibold text-ink shadow-sm transition hover:bg-surface"
            >
              How it works
            </Link>
          </div>
        </div>
      </section>

      {/* More articles */}
      {more.length > 0 && (
        <section aria-labelledby="more-articles" className="mx-auto max-w-[75rem] px-6 pt-16 pb-20 sm:pb-24">
          <div className="flex items-end justify-between gap-4">
            <h2 id="more-articles" className="text-[1.25rem] font-semibold tracking-[-0.02em] text-ink">
              More articles
            </h2>
            <Link href="/blog" className="text-[0.8125rem] font-medium text-muted transition hover:text-ink">
              View all
            </Link>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((p) => (
              <Link
                key={p.slug}
                href={p.href!}
                className="group flex flex-col overflow-hidden rounded-[0.875rem] border border-line bg-white transition hover:border-[#dcdcde] hover:shadow-[0_0.75rem_1.75rem_-1rem_rgba(20,20,40,0.18)]"
              >
                <div className="aspect-[8/3] overflow-hidden bg-surface">
                  <BlogArt variant={p.art} />
                </div>
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <div className="font-mono text-[0.625rem] font-medium uppercase tracking-[0.14em] text-faint">{p.category}</div>
                  <h3 className="mt-2 text-[1rem] font-medium leading-[1.3] tracking-[-0.015em] text-ink">{p.title}</h3>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[0.8125rem] font-medium text-lane">
                    Read article
                    <ArrowRight size={13} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
