import type { Metadata } from "next";
import Link from "next/link";
import {
  Inbox,
  FileText,
  CheckCircle2,
  Send,
  Check,
  X,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LaneMarkCycle } from "@/components/lane-mark-cycle";
import { OnboardingSteps } from "@/components/home/onboarding-steps";
import { ControlSection } from "@/components/home/control-section";
import { FinalCta } from "@/components/home/final-cta";

export const metadata: Metadata = {
  title: "How it works | BotLane",
  description:
    "How Lane prepares your client reports, lead replies and invoice reminders, and why nothing goes out until you approve it.",
};

const CYCLE = [
  {
    num: "01",
    label: "Signal",
    title: "Something needs doing",
    description:
      "A reporting day arrives, a new lead fills in your form, or an invoice passes its due date. Lane notices on its own.",
    icon: Inbox,
  },
  {
    num: "02",
    label: "Prepare",
    title: "Lane does the work",
    description:
      "Lane pulls the numbers from your tools, writes the report or email in your tone, and shows where every figure came from.",
    icon: FileText,
  },
  {
    num: "03",
    label: "Approve",
    title: "You give the OK",
    description:
      "The finished draft waits on your approval desk. Read it, edit anything you like, then approve it or hold it back.",
    icon: CheckCircle2,
  },
  {
    num: "04",
    label: "Deliver",
    title: "Lane sends it",
    description:
      "Only after your OK does Lane send it from your own inbox, then logs what went out and when.",
    icon: Send,
  },
];

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
        {/* Hero */}
        <section className="mx-auto max-w-[1200px] px-6 pt-16 pb-16 text-center sm:pt-24 sm:pb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-lane">
            <LaneMarkCycle size={14} />
            <span>How it works</span>
          </div>

          <h1 className="mt-5 text-[clamp(36px,5vw,68px)] font-bold leading-[1] tracking-[-0.04em] text-ink">
            Lane does the work. <br className="hidden sm:inline" />
            You give the word.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Every system follows the same four steps. Lane spots what needs doing, prepares it, and
            waits for you. Nothing reaches a client until you approve it.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/demo"
              className="inline-flex h-11 items-center gap-2 rounded-[8px] bg-ink px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-black"
            >
              <Sparkles size={15} className="text-lane" />
              <span>Book a demo</span>
            </Link>
            <Link
              href="/systems"
              className="inline-flex h-11 items-center rounded-[8px] border border-line bg-white px-5 text-sm font-semibold text-ink shadow-sm transition hover:bg-surface"
            >
              <span>See the three systems</span>
            </Link>
          </div>
        </section>

        {/* The four-step cycle */}
        <section className="mx-auto max-w-[1200px] px-6 pb-20">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CYCLE.map((step) => {
              const Icon = step.icon;
              const isApproval = step.label === "Approve";
              return (
                <div
                  key={step.num}
                  className={`flex flex-col rounded-[22px] border bg-white p-6 shadow-[0_4px_24px_rgba(20,20,40,0.04)] ${
                    isApproval ? "border-lane/40 ring-1 ring-lane/10" : "border-line"
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-line pb-4">
                    <span className="font-mono text-2xl font-bold tracking-tight text-ink">
                      {step.num}
                    </span>
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-lane">
                      {step.label}
                    </span>
                  </div>
                  <div
                    className={`mt-6 flex size-10 items-center justify-center rounded-[10px] ${
                      isApproval ? "bg-lane/10 text-lane" : "bg-surface text-ink"
                    }`}
                  >
                    <Icon size={20} />
                  </div>
                  <h2 className="mt-4 text-lg font-semibold tracking-[-0.02em] text-ink">
                    {step.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* What Lane does and doesn't do */}
        <section className="mx-auto max-w-[1200px] border-t border-line px-6 py-24">
          <div className="max-w-2xl">
            <div className="font-mono text-xs font-semibold uppercase tracking-wider text-lane">
              Clear limits
            </div>
            <h2 className="mt-2 text-[clamp(28px,3.4vw,44px)] font-semibold leading-[1.05] tracking-[-0.04em] text-ink">
              What Lane does, and what it never does.
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-[22px] border border-line bg-white p-7 shadow-[0_4px_24px_rgba(20,20,40,0.04)]">
              <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ok">
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

            <div className="rounded-[22px] border border-line bg-surface/50 p-7">
              <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-lane">
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
