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
        <section className="mx-auto grid max-w-[75rem] gap-6 px-6 pt-8 sm:gap-10 sm:pt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,27.5rem)] lg:items-end lg:gap-20">
          <div>
            <div className="inline-flex rounded-[0.5rem] bg-surface px-3 py-1.5 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-ink-2">
              About us
            </div>
            <h1 className="mt-5 text-[clamp(2.75rem,6vw,5rem)] font-bold leading-[0.95] tracking-[-0.05em] text-ink">
              Built for operational clarity.
            </h1>
            <p className="mt-5 max-w-[38.75rem] text-lg leading-relaxed text-muted sm:text-xl">
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
        <section className="mx-auto grid max-w-[75rem] gap-3 px-6 py-8 sm:grid-cols-3 sm:gap-10 sm:py-20">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.title} className="flex items-start gap-4 rounded-[1rem] border border-line bg-white p-4 sm:block sm:border-0 sm:bg-transparent sm:p-0">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-[0.875rem] bg-lane/10 text-lane sm:size-16 sm:rounded-[1rem]">
                  <Icon className="size-5 sm:size-7" />
                </span>
                <h2 className="text-lg font-semibold sm:mt-6 sm:text-2xl tracking-[-0.02em] text-ink">{pillar.title}</h2>
                <p className="mt-1 max-w-[18.75rem] text-sm leading-relaxed text-muted sm:mt-3 sm:text-base">{pillar.text}</p>
              </div>
            );
          })}
        </section>

        {/* Closing band */}
        <section className="mx-auto max-w-[83.75rem] px-6 pb-20 sm:pb-24">
          <div className="relative overflow-hidden rounded-[1.25rem] bg-[#0b0d17] px-6 py-8 sm:rounded-[1.75rem] sm:px-16 sm:py-14">
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
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_85%_110%,rgba(90,44,184,0.28),transparent_70%),radial-gradient(50%_70%_at_10%_120%,rgba(59,130,246,0.25),transparent_70%)]"
            />

            <div className="relative grid items-center gap-4 sm:gap-8 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-16">
              <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-white">
                Three systems.
                <br />
                Real outcomes.
              </h2>
              <p className="max-w-[29.375rem] text-[0.9375rem] leading-relaxed text-white/80 sm:text-lg">
                We&rsquo;re starting with three high-impact operational lanes: client reporting, lead intake, and AR
                recovery.
              </p>
              <Link
                href="/company/contact"
                className="group mt-1 inline-flex h-11 w-fit items-center gap-3 rounded-[0.625rem] bg-white px-6 text-sm sm:mt-0 sm:h-14 sm:rounded-[0.75rem] sm:px-8 sm:text-base font-medium text-ink transition hover:bg-white/90"
              >
                Contact us
                <ArrowRight className="size-[1.125rem] transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
