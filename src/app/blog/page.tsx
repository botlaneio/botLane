import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BlogArt } from "@/components/blog/blog-art";
import { BlogIndex } from "@/components/blog/blog-index";

export const metadata: Metadata = {
  title: "Blog | BotLane",
  description: "Practical perspectives on AI operations, agency growth and the systems that keep work moving.",
  alternates: { canonical: "https://botlane.io/blog" },
};

export default function BlogPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#f8f8f6]">
        <section className="mx-auto grid max-w-[75rem] items-center gap-8 px-6 pt-12 pb-10 sm:pt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12 lg:pb-12">
          <div>
            <div className="flex items-center gap-2 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-muted">
              <span className="size-2 rounded-full bg-lane" />
              Blog
            </div>
            <h1 className="mt-4 text-[clamp(2.25rem,5vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-ink">
              Ideas, insights and operational clarity.
            </h1>
            <p className="mt-4 max-w-[30rem] text-base leading-relaxed text-muted sm:text-[1.0625rem]">
              Practical perspectives on AI operations, agency growth and the systems that keep work moving.
            </p>
          </div>
          <div className="aspect-[3/1.15] overflow-hidden rounded-[1rem] bg-surface lg:aspect-[3/1]">
            <BlogArt variant="corridor" />
          </div>
        </section>

        <BlogIndex />
      </main>
      <SiteFooter />
    </>
  );
}
