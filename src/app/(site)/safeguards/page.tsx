import type { Metadata } from "next";
import { ApprovalCard } from "@/components/illustrations/approval-card";
import { ClosingCta } from "@/components/site/cta";
import { Faq } from "@/components/site/faq";
import { laneDoes, laneNever, safeguardSections } from "@/content/safeguards";

export const metadata: Metadata = {
  title: "Safeguards",
  description: "How BotLane keeps you in control: approval before anything is sent, sourced figures, a pause switch, and clear limits on what Lane does.",
};

const faq = [
  { q: "Can Lane ever send something automatically?", a: "Only if you explicitly agree a rule for a specific, low-risk type of work. By default, everything waits for your approval." },
  { q: "Who at BotLane can see our data?", a: "Only the people who build and operate your workflows, and only for that purpose." },
  { q: "What if we want to stop?", a: "Pause or disconnect at any time. Revoking a connection in your own tools cuts Lane's access immediately." },
];

export default function SafeguardsPage() {
  return (
    <>
      <section className="page-top pb-[clamp(88px,10vw,160px)]" aria-labelledby="sg-h">
        <div className="wrap grid items-center gap-14 min-[1000px]:grid-cols-2">
          <div>
            <p className="eyebrow">Safeguards</p>
            <h1 id="sg-h" className="mt-5">
              Control is
              <br />
              <em>the product.</em>
            </h1>
            <p className="lead mt-6">
              Automation is only useful if you can trust what goes out in your name. These are the rules every BotLane workflow
              follows.
            </p>
          </div>
          <div className="grid place-items-center rounded-[28px] bg-[linear-gradient(160deg,#f8f6f3,#fbe1d166)] p-[clamp(20px,4vw,48px)]">
            <ApprovalCard />
          </div>
        </div>
      </section>

      <section className="sec bg-fog" aria-label="Safeguards in detail">
        <div className="wrap grid">
          {safeguardSections.map((s, i) => (
            <article
              key={s.id}
              id={s.id}
              className="rv grid scroll-mt-28 gap-4 border-t border-line py-10 last:border-b md:grid-cols-[80px_1fr_1.3fr] md:gap-10"
            >
              <span className="font-serif text-[30px] leading-none text-terra">{i + 1}</span>
              <h2 className="text-[clamp(26px,1vw+20px,34px)]">{s.title}</h2>
              <p className="text-[18px] text-muted">{s.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="sec" aria-labelledby="limits-h">
        <div className="wrap">
          <h2 id="limits-h" className="max-w-[18ch]">
            What Lane does, <em>and what it never does.</em>
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <div className="rv rounded-[24px] bg-mist p-8">
              <h3>Lane does</h3>
              <ul className="mt-5 grid gap-3">
                {laneDoes.map((x) => (
                  <li key={x} className="flex gap-3">
                    <span aria-hidden="true" className="text-ok">
                      ✓
                    </span>
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rv rounded-[24px] bg-mist p-8">
              <h3>Lane never</h3>
              <ul className="mt-5 grid gap-3">
                {laneNever.map((x) => (
                  <li key={x} className="flex gap-3">
                    <span aria-hidden="true" className="font-medium text-terra">
                      ×
                    </span>
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="sec bg-fog" aria-labelledby="faq-h">
        <div className="wrap grid gap-10 min-[960px]:grid-cols-[0.8fr_1.2fr] min-[960px]:gap-24">
          <h2 id="faq-h">Questions</h2>
          <Faq items={faq} />
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
