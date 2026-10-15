import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArticleView } from "@/components/blog/article-view";
import { ARTICLES } from "@/components/blog/articles";
import { BLOG_POSTS } from "@/components/blog/posts";

// Only written articles get a page; every other slug is a 404. All pages are prerendered.
export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_POSTS.filter((p) => ARTICLES[p.slug]).map((p) => ({ slug: p.slug }));
}

function find(slug: string) {
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  const article = ARTICLES[slug];
  return post && article ? { post, article } : null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const found = find(slug);
  if (!found) return {};
  const { post, article } = found;
  return {
    title: `${post.title} | BotLane Blog`,
    description: article.dek,
    openGraph: { type: "article", title: post.title, description: article.dek },
  };
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const found = find(slug);
  if (!found) notFound();

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#f8f8f6]">
        <ArticleView post={found.post} article={found.article} />
      </main>
      <SiteFooter />
    </>
  );
}
