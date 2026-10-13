import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Layers, GitCommit, RotateCw } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LaneMarkCycle } from "@/components/lane-mark-cycle";
import { About } from "@/components/about";
import { FinalCta } from "@/components/home/final-cta";

export const metadata: Metadata = {
  title: "About | BotLane",
  description:
    "BotLane builds Lane, an AI coworker that prepares client reports, lead replies and invoice reminders for agencies, then waits for your OK.",
};

const WHY = [
  {
    icon: Layers,
    title: "Reports eat the week",
    description:
      "Copying numbers from five dashboards into one client report is work nobody started an agency to do.",
  },
  {
    icon: GitCommit,
    title: "Leads go cold",
    description:
      "A new inquiry that waits a day for a reply often books with someone else instead.",
  },
  {
    icon: RotateCw,
    title: "Invoices slip",
    description:
      "Chasing late payments is awkward, so it gets put off, and cash flow pays the price.",
  },
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="mx-auto max-w-[1200px] px-6 pt-16 pb-16 text-center sm:pt-24 sm:pb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-lane">
            <LaneMarkCycle size={14} />
            <span>About BotLane</span>
          </div>

          <h1 className="mt-5 text-[clamp(36px,5vw,68px)] font-bold leading-[1] tracking-[-0.04em] text-ink">
            We build Lane, <br className="hidden sm:inline" />
            the hire that does the busywork.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            BotLane makes Lane, an AI coworker for agencies and service teams. Lane prepares the
            repeat work that keeps a business running, and you stay the one who decides what goes out.
          </p>
        </section>

        {/* Why it exists */}
        <section className="mx-auto max-w-[1200px] border-t border-line px-6 py-24">
          <div className="max-w-2xl">
            <div className="font-mono text-xs font-semibold uppercase tracking-wider text-lane">
              Why Lane exists
            </div>
            <h2 className="mt-2 text-[clamp(28px,3.4vw,44px)] font-semibold leading-[1.05] tracking-[-0.04em] text-ink">
              Small teams lose hours to the same three jobs.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Each one matters to clients, and each one is easy to put off. So we built one system for
              each, all run by the same coworker.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {WHY.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-[22px] border border-line bg-white p-7 shadow-[0_4px_24px_rgba(20,20,40,0.04)]"
                >
                  <div className="flex size-10 items-center justify-center rounded-[10px] bg-surface text-ink">
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold tracking-[-0.02em] text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-8">
            <Link
              href="/systems"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-lane hover:underline"
            >
              <span>Meet the three systems</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        {/* What we believe */}
        <div className="border-t border-line">
          <About />
        </div>

        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
