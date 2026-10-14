import type { Metadata } from "next";
import Link from "next/link";
import { Check, X, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HowItWorksHero } from "@/components/how-it-works-hero";
import { OnboardingSteps } from "@/components/home/onboarding-steps";
import { ControlSection } from "@/components/home/control-section";
import { FinalCta } from "@/components/home/final-cta";

export const metadata: Metadata = {
  title: "How it works | BotLane",
  description:
    "How Lane prepares your client reports, lead replies and invoice reminders, and why nothing goes out until you approve it.",
};

const LANE_DOES = [
  "Pulls numbers from the tools you already use",
  "Writes reports, replies and reminders in your tone",
  "Shows the source behind every figure it uses",
  "Queues each draft on your approval desk",
  "Stops an invoice sequence as soon as it's paid",
];

const LANE_DOESNT = [
  "Send anything without your approval",
  "Change data inside your tools",
  "Move money or issue refunds",
  "Talk to your clients on its own",
  "Train public AI models on your data",
];

export default function HowItWorksPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen">
        <HowItWorksHero />

        {/* What Lane does and doesn't do */}
        <section className="mx-auto max-w-[75rem] border-t border-line px-6 py-24">
          <div className="max-w-2xl">
            <div className="font-mono text-xs font-semibold uppercase tracking-wider text-lane">
              Clear limits
            </div>
            <h2 className="mt-2 text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-ink">
              What Lane does, and what it never does.
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-[1.375rem] border border-line bg-white p-7 shadow-[0_0.25rem_1.5rem_rgba(20,20,40,0.04)]">
              <div className="font-mono text-[0.6875rem] font-semibold uppercase tracking-wider text-ok">
                Lane does
              </div>
              <ul className="mt-5 space-y-3.5">
                {LANE_DOES.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-ink-2">
                    <Check size={16} className="mt-0.5 shrink-0 text-ok" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[1.375rem] border border-line bg-surface/50 p-7">
              <div className="font-mono text-[0.6875rem] font-semibold uppercase tracking-wider text-lane">
                Lane never
              </div>
              <ul className="mt-5 space-y-3.5">
                {LANE_DOESNT.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-ink-2">
                    <X size={16} className="mt-0.5 shrink-0 text-lane" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="/systems"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-lane hover:underline"
            >
              <span>See how each system uses these steps</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        {/* Getting started */}
        <OnboardingSteps />

        {/* Guardrails */}
        <ControlSection />

        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
