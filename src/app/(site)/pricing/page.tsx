import type { Metadata } from "next";
import Link from "next/link";
import { ClosingCta, CtaPair } from "@/components/site/cta";
import { Faq } from "@/components/site/faq";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Every BotLane engagement is scoped to your workflow after an assessment, with a written proposal before any work starts.",
};

const stages = [
  {
    title: "Assessment",
    body: "We look at one workflow: how it runs today, the tools involved and the volume. You get a written recommendation.",
  },
  {
    title: "Proposal",
    body: "If it's a fit, you get a clear written proposal: what we'll build, what you'll approve, and what it costs. No surprises.",
  },
  {
    title: "Build and operate",
    body: "We set the workflow up, test it with you, and then run and maintain it on an ongoing basis.",
  },
];

const included = [
  "Design of the workflow and its approval rules",
  "Connecting the tools you already use",
  "Testing on real examples before go-live",
  "Monitoring, fixes and maintenance",
  "Updates when your tools or process change",
  "Regular reporting on what Lane did",
];

const faq = [
  { q: "Why isn't there a price list?", a: "Every workflow is different: the tools, the volume and how much needs your approval. We'd rather quote accurately after an assessment than show a number that doesn't fit your business." },
  { q: "What affects the cost?", a: "Mainly the number of workflows, how many tools they connect to, and the volume of work Lane prepares." },
  { q: "Is there a long commitment?", a: "Terms are set out in your proposal before anything starts, so you know exactly what you're agreeing to." },
];

export default function PricingPage() {
  return (
    <>
      <section className="page-top pb-[clamp(88px,10vw,160px)]" aria-labelledby="p-h">
        <div className="wrap flex flex-col items-center gap-6 text-center">
          <p className="eyebrow">Pricing</p>
          <h1 id="p-h">
            Scoped to
            <br />
            <em>your workflow.</em>
          </h1>
          <p className="lead max-w-[48ch]">
            We don&apos;t sell seats or software plans. Each engagement is priced for the work it takes on, after we&apos;ve
            seen how that work runs today.
          </p>
          <CtaPair className="justify-center" />
        </div>
        <ol className="wrap mt-[clamp(56px,7vw,96px)] grid gap-4 md:grid-cols-3">
          {stages.map((s, i) => (
            <li key={s.title} className="rv rounded-[24px] bg-fog p-8 shadow-[inset_0_0_0_1px_var(--line)]">
              <span className="text-[13px] text-subtle tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="mt-3 font-sans text-[21px] font-medium tracking-[-0.01em]">{s.title}</h2>
              <p className="mt-2 text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="pb-[clamp(88px,10vw,168px)]" aria-labelledby="inc-h">
        <div className="wrap">
          <div className="rv grid gap-10 rounded-[28px] bg-peach p-[clamp(32px,5vw,72px)] text-sienna min-[900px]:grid-cols-2">
            <h2 id="inc-h" className="text-sienna">
              What&apos;s included
              <br />
              <em>when we operate it.</em>
            </h2>
            <ul className="grid content-center gap-3 text-[17px]">
              {included.map((x) => (
                <li key={x} className="flex gap-3">
                  <span aria-hidden="true">✓</span>
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="sec bg-fog" aria-labelledby="faq-h">
        <div className="wrap grid gap-10 min-[960px]:grid-cols-[0.8fr_1.2fr] min-[960px]:gap-24">
          <div>
            <h2 id="faq-h">Questions</h2>
            <Link href="/assessment" className="arrow mt-6 text-[16px]">
              Request an assessment
            </Link>
          </div>
          <Faq items={faq} />
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
