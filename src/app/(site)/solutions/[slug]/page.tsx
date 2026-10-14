import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SolutionArt } from "@/components/illustrations/solution-art";
import { Faq } from "@/components/site/faq";
import { ClosingCta, CtaPair } from "@/components/site/cta";
import { Emph } from "@/components/site/emph";
import { getSolution, solutions } from "@/content/solutions";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getSolution((await params).slug);
  if (!s) return {};
  return { title: s.name, description: s.lead };
}

export default async function SolutionPage({ params }: Props) {
  const s = getSolution((await params).slug);
  if (!s) notFound();
  const assess = `/assessment?workflow=${s.slug}`;
  const index = solutions.indexOf(s);
  const next = solutions[(index + 1) % solutions.length];

  return (
    <>
      <section className="page-top pb-[clamp(72px,8vw,128px)]" aria-labelledby="s-h">
        <div className="wrap grid items-center gap-14 min-[1000px]:grid-cols-[1.1fr_0.9fr]">
          <div>
            <nav aria-label="Breadcrumb" className="eyebrow">
              <Link href="/solutions" className="no-underline hover:text-ink">
                Solutions
              </Link>{" "}
              / {String(index + 1).padStart(2, "0")}
            </nav>
            <h1 id="s-h" className="mt-5 text-[clamp(42px,3.4vw+22px,76px)]">
              <Emph text={s.headline} />
            </h1>
            <p className="lead mt-6">{s.lead}</p>
            <CtaPair className="mt-8" assessmentHref={assess} />
          </div>
          <div className="relative rounded-[28px] bg-[linear-gradient(160deg,#f8f6f3,#fbe1d1aa)] p-[clamp(20px,4vw,48px)]">
            <p className="mb-3 text-[13px] text-sienna">{s.name}</p>
            <SolutionArt slug={s.slug} className="text-[13.5px]" />
          </div>
        </div>
      </section>

      <section className="sec bg-fog" aria-labelledby="compare-h">
        <div className="wrap">
          <h2 id="compare-h" className="max-w-[18ch]">
            Before, and <em>with Lane.</em>
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <div className="rv rounded-[24px] bg-white p-8 shadow-[inset_0_0_0_1px_var(--line)]">
              <h3>Today</h3>
              <ul className="mt-4 grid gap-3 text-muted">
                {s.before.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[11px] size-1.5 flex-none rounded-full bg-subtle/60" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rv rounded-[24px] bg-white p-8 shadow-float">
              <h3>With Lane</h3>
              <ul className="mt-4 grid gap-3">
                {s.withLane.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[11px] size-1.5 flex-none rounded-full bg-terra" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" aria-labelledby="run-h">
        <div className="wrap">
          <p className="eyebrow">How a run works</p>
          <h2 id="run-h" className="mt-4">
            Lane prepares. <em>You approve.</em>
          </h2>
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {s.steps.map((step, i) => (
              <li key={step.title} className="rv relative rounded-[20px] border border-line p-6">
                <span className="text-[13px] text-subtle tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3">{step.title}</h3>
                <p className="mt-2 text-[16px] text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="pb-[clamp(88px,10vw,168px)]" aria-labelledby="limits-h">
        <div className="wrap">
          <h2 id="limits-h" className="max-w-[20ch]">
            What you approve, <em>and what never happens.</em>
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <div className="rv rounded-[24px] bg-mist p-8">
              <h3>You approve</h3>
              <ul className="mt-4 grid gap-3">
                {s.youApprove.map((x) => (
                  <li key={x} className="flex gap-3">
                    <span className="chip chip-wait mt-0.5 h-fit">OK?</span>
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rv rounded-[24px] bg-mist p-8">
              <h3>Lane never</h3>
              <ul className="mt-4 grid gap-3">
                {s.never.map((x) => (
                  <li key={x} className="flex gap-3">
                    <span aria-hidden="true" className="mt-0.5 font-medium text-terra">
                      ×
                    </span>
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-[15.5px]">
            <span className="eyebrow">Typical tools</span>
            {s.tools.map((t) => (
              <span key={t}>{t}</span>
            ))}
            <span className="text-muted">or the ones you already use</span>
          </div>
        </div>
      </section>

      <section className="sec bg-fog" aria-labelledby="faq-h">
        <div className="wrap grid gap-10 min-[960px]:grid-cols-[0.8fr_1.2fr] min-[960px]:gap-24">
          <h2 id="faq-h">Questions</h2>
          <Faq items={s.faq} />
        </div>
      </section>

      <ClosingCta assessmentHref={assess} />

      <div className="wrap pb-16 text-right">
        <Link href={`/solutions/${next.slug}`} className="arrow text-[16px]">
          Next: {next.name}
        </Link>
      </div>
    </>
  );
}
