import type { Metadata } from "next";
import Link from "next/link";
import { ApprovalCard, AuditTrail } from "@/components/illustrations/approval-card";
import { ClosingCta } from "@/components/site/cta";
import { Arrow } from "@/components/site/icons";

export const metadata: Metadata = {
  title: "About",
  description: "BotLane builds AI workflows for real businesses, with privacy, security and human control by default.",
};

const principles = [
  {
    title: "Private by design",
    body: "Lane only gets the access a workflow needs. Your data isn't used to train public AI models, and you can revoke access at any time.",
  },
  {
    title: "Managed in operation",
    body: "We don't hand over software and walk away. We run, monitor and maintain every workflow, and we fix it when something breaks.",
  },
  {
    title: "Human control",
    body: "Anything that goes out in your name waits for a person's approval. Every action is recorded so you can see what happened and why.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="page-top pb-[clamp(88px,10vw,160px)]" aria-labelledby="a-h">
        <div className="wrap grid items-center gap-14 min-[1100px]:grid-cols-[1fr_1.05fr]">
          <div>
            <p className="eyebrow">Our philosophy</p>
            <h1 id="a-h" className="mt-5">
              Intelligence,
              <br />
              <em>with boundaries.</em>
            </h1>
            <p className="lead mt-6">
              Capable AI workflows, designed for real businesses, with privacy, security and human control by default.
            </p>
            <Link href="/safeguards" className="btn btn-primary mt-8">
              Our approach <Arrow />
            </Link>
          </div>
          <div className="grid items-center gap-10 rounded-[28px] bg-[linear-gradient(160deg,#f8f6f3,#fbe1d166)] p-[clamp(20px,4vw,40px)] sm:grid-cols-[1.3fr_0.7fr]">
            <ApprovalCard />
            <AuditTrail />
          </div>
        </div>
      </section>

      <section className="pb-[clamp(88px,10vw,168px)]" aria-labelledby="band-h">
        <div className="wrap">
          <div className="rv grid items-center gap-8 rounded-[28px] bg-peach p-[clamp(28px,4vw,56px)] text-sienna min-[900px]:grid-cols-[0.6fr_1.2fr_1.4fr]">
            <p className="eyebrow text-sienna/80">Built for real business</p>
            <h2 id="band-h" className="text-[clamp(30px,1.6vw+22px,44px)] text-sienna">
              Zero stack <em>migration.</em>
              <br />
              Total control.
            </h2>
            <div className="min-[900px]:border-l min-[900px]:border-sienna/20 min-[900px]:pl-8">
              <p>
                We work with your existing tools and data. Your information stays private, every action is auditable, and you
                always have the final say.
              </p>
              <Link href="/safeguards" className="arrow mt-4 text-sienna">
                Learn more about our safeguards
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="sec bg-fog" aria-labelledby="why-h">
        <div className="wrap grid gap-12 min-[960px]:grid-cols-2 min-[960px]:gap-24">
          <h2 id="why-h">
            Why BotLane
            <br />
            <em>exists.</em>
          </h2>
          <div className="rv grid gap-5 text-[18px] text-muted">
            <p>
              Most businesses don&apos;t need another AI tool. They need the repetitive work done properly: reports sent on
              time, leads answered, invoices chased, requests sorted.
            </p>
            <p>
              Tools leave the setup, the upkeep and the risk with you. We take those on. We design each workflow around how
              your business already runs, operate it for you, and keep a person in charge of every decision that matters.
            </p>
          </div>
        </div>
      </section>

      <section className="sec" aria-labelledby="pr-h">
        <div className="wrap">
          <h2 id="pr-h" className="max-w-[16ch]">
            Three principles, <em>no exceptions.</em>
          </h2>
          <div className="mt-14 grid gap-12 md:grid-cols-3">
            {principles.map((p, i) => (
              <div key={p.title} className="rv border-t border-ink pt-6">
                <span className="text-[13px] text-subtle tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3">{p.title}</h3>
                <p className="mt-2.5 text-muted">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
