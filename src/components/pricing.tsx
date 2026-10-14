"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT, FadeUp } from "@/components/motion/fade-up";
import { Check } from "lucide-react";

interface PricingProps {
  onOpenDemo?: () => void;
}

const TIERS = [
  {
    name: "Single System",
    description: "Ideal if you want Lane to master one specific workflow first.",
    price: "$600",
    period: "/month",
    features: [
      "Choose Client reporting, Lead follow-up, or Invoices",
      "Unlimited automated runs",
      "1-click review & approval interface",
      "Native integrations with your tools",
      "Dedicated onboarding Slack / Teams channel",
    ],
    highlight: false,
    cta: "Start with 1 system",
  },
  {
    name: "Full Suite",
    description: "All three core engines working in tandem for your business.",
    price: "$1,500",
    period: "/month",
    features: [
      "All 3 systems: Funnel, Line, and Loop",
      "Unified approval dashboard & notifications",
      "Custom brand voice & tone alignment",
      "Audit trail of every signal and send",
      "Priority 24/7 dedicated support",
    ],
    highlight: true,
    badge: "Most popular",
    cta: "Deploy Lane full suite",
  },
];

export function Pricing({ onOpenDemo }: PricingProps) {
  const reduce = useReducedMotion();
  return (
    <section id="pricing" className="mx-auto max-w-[75rem] scroll-mt-20 px-6 pt-16 pb-28">
      <FadeUp className="mx-auto max-w-2xl text-center">
        <div className="font-mono text-xs uppercase tracking-[0.08em] text-lane">
          Straightforward Investment
        </div>
        <h2 className="mt-3 text-[clamp(2rem,4vw,3.25rem)] font-semibold tracking-[-0.04em] text-ink">
          One flat monthly fee. No hourly billing.
        </h2>
        <p className="mt-3 text-base text-muted">
          Lane replaces dozens of scattered hours each week with a clean 30-second approval tap.
        </p>
      </FadeUp>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:max-w-4xl lg:mx-auto">
        {TIERS.map((tier, idx) => (
          <motion.div
            key={tier.name}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -12% 0px" }}
            whileHover={{ y: -4, transition: { duration: 0.25, ease: EASE_OUT } }}
            transition={{ duration: 0.7, delay: idx * 0.1, ease: EASE_OUT }}
            className={`relative flex flex-col justify-between rounded-[1.375rem] border p-8 transition-[border-color,box-shadow] duration-300 hover:shadow-[0_1.25rem_2.75rem_rgba(20,20,40,0.08)] ${
              tier.highlight
                ? "border-lane/40 bg-white shadow-[0_1rem_2.5rem_rgba(90,44,184,0.06)]"
                : "border-line bg-surface/30"
            }`}
          >
            {tier.badge && (
              <span className="absolute -top-3 right-8 rounded-full bg-lane px-3 py-0.5 font-mono text-[0.6875rem] font-semibold tracking-wide text-white uppercase">
                {tier.badge}
              </span>
            )}

            <div>
              <div className="flex items-baseline justify-between">
                <h3 className="text-xl font-semibold tracking-tight text-ink">{tier.name}</h3>
              </div>
              <p className="mt-2 text-sm text-muted">{tier.description}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-tight text-ink">{tier.price}</span>
                <span className="text-sm text-muted">{tier.period}</span>
              </div>

              <div className="my-6 h-px w-full bg-line" />

              <ul className="space-y-3 text-[0.8125rem] text-ink-2">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex size-4 flex-none items-center justify-center rounded-full bg-ok/10 text-ok">
                      <Check size={11} strokeWidth={2.5} />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              onClick={onOpenDemo}
              className={`mt-8 flex h-11 w-full items-center justify-center rounded-[0.5rem] text-sm font-medium transition-all ${
                tier.highlight
                  ? "bg-lane-strong text-white hover:bg-lane-ink shadow-[0_0.25rem_0.875rem_rgba(90,44,184,0.2)]"
                  : "bg-ink text-white hover:bg-black"
              }`}
            >
              {tier.cta}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
