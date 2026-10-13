import Link from "next/link";
import { Check } from "lucide-react";

const TIERS = [
  {
    name: "Single System",
    description: "Ideal if you want Lane to master one specific workflow first.",
    price: "$490",
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
    price: "$1,190",
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

export function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-[1200px] scroll-mt-20 px-6 pt-16 pb-28">
      <div className="mx-auto max-w-2xl text-center">
        <div className="font-mono text-xs uppercase tracking-[0.08em] text-lane">
          Straightforward Investment
        </div>
        <h2 className="mt-3 text-[clamp(32px,4vw,52px)] font-semibold tracking-[-0.04em] text-ink">
          One flat monthly fee. No hourly billing.
        </h2>
        <p className="mt-3 text-base text-muted">
          Lane replaces dozens of scattered hours each week with a clean 30-second approval tap.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:max-w-4xl lg:mx-auto">
        {TIERS.map((tier) => (
          <div
            key={tier.name}
            className={`relative flex flex-col justify-between rounded-[22px] border p-8 transition-all ${
              tier.highlight
                ? "border-lane/40 bg-white shadow-[0_16px_40px_rgba(224,49,43,0.06)]"
                : "border-line bg-surface/30"
            }`}
          >
            {tier.badge && (
              <span className="absolute -top-3 right-8 rounded-full bg-lane px-3 py-0.5 font-mono text-[11px] font-semibold tracking-wide text-white uppercase">
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

              <ul className="space-y-3 text-[13px] text-ink-2">
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

            <Link
              href="#demo"
              className={`mt-8 flex h-11 w-full items-center justify-center rounded-[8px] text-sm font-medium transition-all ${
                tier.highlight
                  ? "bg-lane-strong text-white hover:bg-lane-ink shadow-[0_4px_14px_rgba(224,49,43,0.2)]"
                  : "bg-ink text-white hover:bg-black"
              }`}
            >
              {tier.cta}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
