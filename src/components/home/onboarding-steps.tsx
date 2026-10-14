"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT, FadeUp } from "@/components/motion/fade-up";
import { Link2, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

const STEPS = [
  {
    step: "01",
    phase: "15-MINUTE SETUP",
    title: "Connect your current tools",
    description:
      "Authorize your ad accounts, billing software, and email inbox via standard OAuth. Zero software to install on client machines. Read-only permissions during initial sync.",
    detail: "Google Ads · Meta · Stripe · HubSpot · Gmail",
    icon: Link2,
  },
  {
    step: "02",
    phase: "DAY 1 SANDBOX",
    title: "Lane learns your tone & metrics",
    description:
      "Lane analyzes your past 6 months of client reports and team follow-up emails. Lane mirrors your vocabulary, signature conventions, and performance benchmarks.",
    detail: "Private memory · Zero hallucination guardrails",
    icon: Sparkles,
  },
  {
    step: "03",
    phase: "DAY 2 PRODUCTION",
    title: "You approve your first batch",
    description:
      "Lane queues your weekly reports and follow-ups. You review the rendered deliverables, tweak anything if desired, and tap Approve. Lane handles delivery.",
    detail: "Zero manual spreadsheet work ever again",
    icon: CheckCircle2,
  },
];

export function OnboardingSteps() {
  const reduce = useReducedMotion();
  return (
    <section className="relative mx-auto max-w-[75rem] px-6 py-24 sm:py-32 border-t border-line">
      <FadeUp className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-lane">
          <span className="size-1.5 rounded-full bg-lane-gradient" />
          <span>Frictionless Onboarding</span>
        </div>
        <h2 className="mt-4 text-[clamp(2rem,4.2vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-ink">
          How getting started works. <br />
          No 6-week enterprise deployment.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          We onboard your agency in an afternoon. By Friday, your client reports and pending invoices
          are prepared automatically.
        </p>
      </FadeUp>

      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {STEPS.map((s, idx) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.step}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -12% 0px" }}
              whileHover={{ y: -4, transition: { duration: 0.25, ease: EASE_OUT } }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: EASE_OUT }}
              className="group relative flex flex-col justify-between rounded-[1.375rem] border border-line bg-white p-7 shadow-[0_0.25rem_1.5rem_rgba(20,20,40,0.04)] transition-[border-color,box-shadow] duration-300 hover:border-lane/25 hover:shadow-[0_1rem_2.25rem_rgba(20,20,40,0.08)]"
            >
              <div>
                <div className="flex items-center justify-between border-b border-line pb-4">
                  <span className="font-mono text-2xl font-bold tracking-tight text-ink">
                    {s.step}
                  </span>
                  <span className="font-mono text-[0.6875rem] font-semibold uppercase tracking-wider text-lane-gradient">
                    {s.phase}
                  </span>
                </div>

                <div className="mt-6 flex size-10 items-center justify-center rounded-[0.625rem] bg-surface text-ink transition-colors duration-300 group-hover:bg-lane/10 group-hover:text-lane">
                  <Icon size={20} />
                </div>

                <h3 className="mt-4 text-xl font-semibold tracking-[-0.02em] text-ink">
                  {s.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {s.description}
                </p>
              </div>

              <div className="mt-8 rounded-[0.625rem] bg-surface/70 px-3 py-2 text-[0.6875rem] font-mono text-ink-2">
                {s.detail}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/demo"
          className="inline-flex items-center gap-2 rounded-[0.5rem] bg-ink px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-black"
        >
          <span>Schedule an Onboarding Walkthrough (20 mins)</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}
