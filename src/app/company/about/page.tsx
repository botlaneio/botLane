import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, LockKeyhole, MonitorCog, UserRound } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "About | BotLane",
  description:
    "BotLane builds private, managed AI systems that handle real work inside your tools, under your control.",
};

const PILLARS = [
  {
    icon: LockKeyhole,
    title: "Private by design",
    text: "Your data stays in your environment. No training on your data.",
  },
  {
    icon: MonitorCog,
    title: "Managed in operation",
    text: "We run, monitor, and improve the systems for you.",
  },
  {
    icon: UserRound,
    title: "Human control",
    text: "You approve the work. Always.",
  },
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="mx-auto grid max-w-[1200px] gap-6 px-6 pt-8 sm:gap-10 sm:pt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:items-end lg:gap-20">
          <div>
            <div className="inline-flex rounded-[8px] bg-surface px-3 py-1.5 font-mono text-[12px] uppercase tracking-[0.14em] text-ink-2">
              About us
            </div>
            <h1 className="mt-5 text-[clamp(44px,6vw,80px)] font-bold leading-[0.95] tracking-[-0.05em] text-ink">
              Built for operational clarity.
            </h1>
            <p className="mt-5 max-w-[620px] text-lg leading-relaxed text-muted sm:text-xl">
              BotLane builds private, managed AI systems that handle real work, inside your tools and under your
              control.
            </p>
          </div>
          <p className="text-base leading-relaxed text-muted sm:text-lg lg:pb-14">
            We started BotLane to help modern teams deal with operational overload. Our focus is simple: remove
            repetitive work, improve execution, and keep humans in control.
          </p>
        </section>

        {/* Pillars */}
        <section className="mx-auto grid max-w-[1200px] gap-3 px-6 py-8 sm:grid-cols-3 sm:gap-10 sm:py-20">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.title} className="flex items-start gap-4 rounded-[16px] border border-line bg-white p-4 sm:block sm:border-0 sm:bg-transparent sm:p-0">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-[14px] bg-lane/10 text-lane sm:size-16 sm:rounded-[16px]">
                  <Icon className="size-5 sm:size-7" />
                </span>
                <h2 className="text-lg font-semibold sm:mt-6 sm:text-2xl tracking-[-0.02em] text-ink">{pillar.title}</h2>
                <p className="mt-1 max-w-[300px] text-sm leading-relaxed text-muted sm:mt-3 sm:text-base">{pillar.text}</p>
              </div>
            );
          })}
        </section>

        {/* Closing band */}
        <section className="mx-auto max-w-[1340px] px-6 pb-20 sm:pb-24">
          <div className="relative overflow-hidden rounded-[20px] bg-[#0b0d17] px-6 py-8 sm:rounded-[28px] sm:px-16 sm:py-14">
            {/* light streaks */}
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-40 -left-24 h-80 w-[60%] rounded-[50%] border-t-2 border-blue-500/60 blur-[2px]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -bottom-48 h-96 w-[70%] rotate-[-14deg] rounded-[50%] border-t-2 border-lane/60 blur-[2px]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_85%_110%,rgba(224,49,43,0.28),transparent_70%),radial-gradient(50%_70%_at_10%_120%,rgba(59,130,246,0.25),transparent_70%)]"
            />

            <div className="relative grid items-center gap-4 sm:gap-8 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-16">
              <h2 className="text-[clamp(28px,4vw,48px)] font-semibold leading-[1.05] tracking-[-0.04em] text-white">
                Three systems.
                <br />
                Real outcomes.
              </h2>
              <p className="max-w-[470px] text-[15px] leading-relaxed text-white/80 sm:text-lg">
                We&rsquo;re starting with three high-impact operational lanes: client reporting, lead intake, and AR
                recovery.
              </p>
              <Link
                href="/company/contact"
                className="group mt-1 inline-flex h-11 w-fit items-center gap-3 rounded-[10px] bg-white px-6 text-sm sm:mt-0 sm:h-14 sm:rounded-[12px] sm:px-8 sm:text-base font-medium text-ink transition hover:bg-white/90"
              >
                Contact us
                <ArrowRight className="size-[18px] transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
