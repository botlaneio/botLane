import type { ReactNode } from "react";
import { DraftNote, Eyebrow, PageShell } from "./page/parts";

export type LegalSection = { id: string; title: string; body: ReactNode };

// A legal page: title, "last updated", contents on the left, sections on the right.
export function LegalPage({ title, updated, intro, sections }: { title: string; updated: string; intro: ReactNode; sections: LegalSection[] }) {
  return (
    <PageShell>
      <section className="mx-auto max-w-[1200px] px-6 pt-20 pb-24 md:pt-24">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="mt-3 text-[clamp(40px,5vw,64px)] leading-none font-semibold tracking-[-0.045em]">{title}</h1>
        <p className="mt-4 text-sm text-faint">Last updated: {updated}</p>
        <div className="mt-8 max-w-[760px]">
          <DraftNote>
            <strong className="font-semibold">Draft.</strong> This page sets out what the final policy will cover. It is not yet
            legal advice or a binding policy, and will be finalised with a lawyer before launch.
          </DraftNote>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[220px_1fr]">
          <nav aria-label="On this page" className="lg:sticky lg:top-24 lg:self-start">
            <div className="font-mono text-xs uppercase tracking-[0.08em] text-faint">On this page</div>
            <ol className="mt-4 flex flex-col gap-2.5 text-sm text-muted">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="hover:text-ink">
                    {i + 1}. {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <article className="max-w-[720px]">
            <div className="text-lg leading-relaxed text-ink-2">{intro}</div>
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-24 border-t border-line pt-8 mt-10 first-of-type:mt-12">
                <h2 className="text-2xl font-semibold tracking-[-0.02em]">
                  {i + 1}. {s.title}
                </h2>
                <div className="mt-4 flex flex-col gap-4 text-base leading-relaxed text-muted">{s.body}</div>
              </section>
            ))}
          </article>
        </div>
      </section>
    </PageShell>
  );
}

/** Marks a gap that still needs final wording. */
export function ToConfirm({ children }: { children: ReactNode }) {
  return <span className="rounded bg-[#fdf6e7] px-1.5 py-0.5 text-[#7a5205]">[To confirm: {children}]</span>;
}
