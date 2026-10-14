import type { Metadata } from "next";
import Link from "next/link";
import { SolutionArt } from "@/components/illustrations/solution-art";
import { ClosingCta, CtaPair } from "@/components/site/cta";
import { solutions, type Solution } from "@/content/solutions";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Five managed AI workflows: lead follow-up, client reporting, support triage, invoice follow-up and operations intake. Designed, run and maintained by BotLane, approved by you.",
};

function Tile({ s, wide, warm }: { s: Solution; wide?: boolean; warm?: boolean }) {
  return (
    <Link
      href={`/solutions/${s.slug}`}
      className={cn(
        "rv group grid gap-5 rounded-[22px] p-6 no-underline transition-[transform,box-shadow] duration-300 hover:-translate-y-[3px] hover:shadow-float",
        wide && "sm:col-span-2 sm:grid-cols-[1fr_1.25fr] sm:items-center",
        warm ? "bg-peach text-sienna" : "bg-fog shadow-[inset_0_0_0_1px_var(--line)]",
      )}
    >
      <div className="flex flex-col gap-2">
        <h2 className="font-sans text-[20px] font-medium tracking-[-0.01em] leading-tight">{s.name}</h2>
        <p className={cn("text-[15.5px]", warm ? "text-sienna/85" : "text-muted")}>{s.summary}</p>
        <span
          className="mt-3 grid size-9 place-items-center rounded-[8px] bg-white text-ink shadow-[0_0_0_1px_var(--line)] transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        >
          →
        </span>
      </div>
      <SolutionArt slug={s.slug} />
    </Link>
  );
}

export default function SolutionsPage() {
  const [lead, reporting, support, invoice, intake] = solutions;
  return (
    <>
      <section className="page-top pb-[clamp(88px,10vw,160px)]" aria-labelledby="sol-h">
        <div className="wrap grid gap-14 min-[1100px]:grid-cols-[0.8fr_1.2fr] min-[1100px]:gap-16">
          <div className="min-[1100px]:sticky min-[1100px]:top-32 min-[1100px]:self-start">
            <p className="eyebrow">Our solutions</p>
            <h1 id="sol-h" className="mt-5">
              The work
              <br />
              <em>gets done.</em>
            </h1>
            <p className="lead mt-6">
              Five workflows we design, run and maintain to take repetitive work off your team. You approve what matters.
            </p>
            <CtaPair className="mt-8" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Tile s={lead} wide />
            <Tile s={reporting} />
            <Tile s={support} warm />
            <Tile s={invoice} />
            <Tile s={intake} />
          </div>
        </div>
      </section>

      <section className="sec bg-fog" aria-labelledby="custom-h">
        <div className="wrap grid items-center gap-10 min-[960px]:grid-cols-2 min-[960px]:gap-24">
          <h2 id="custom-h">
            Don&apos;t see
            <br />
            <em>your workflow?</em>
          </h2>
          <div className="rv">
            <p className="lead">
              These five are where most teams start. If your repetitive work looks different, tell us about it. We&apos;ll
              look at how it runs today and tell you honestly whether it&apos;s a good fit.
            </p>
            <Link href="/assessment?workflow=other" className="btn btn-primary mt-8">
              Request an assessment
            </Link>
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
