"use client";

import { ShieldCheck, Eye, Zap, Clock } from "lucide-react";
import { BotLaneLogo } from "@/components/brand/botlane-logo";

const PRINCIPLES = [
  {
    icon: ShieldCheck,
    title: "You retain total authority",
    description:
      "Lane prepares everything to 100% completion, but never sends an email, report, or reminder without your explicit one-click approval.",
  },
  {
    icon: Eye,
    title: "Transparent rationale",
    description:
      "Every draft displays exactly where the data came from, which signals were matched, and why the next action is recommended.",
  },
  {
    icon: Zap,
    title: "Zero workflow disruption",
    description:
      "Connects to the tools you already rely on — Google Ads, HubSpot, Stripe, QuickBooks, and Gmail. No new platforms to learn.",
  },
  {
    icon: Clock,
    title: "15 hours saved each week",
    description:
      "Reclaim your Friday afternoons. Stop cobbling together spreadsheets and chasing late invoices by hand.",
  },
];

export function About() {
  return (
    <section id="about" className="mx-auto max-w-[75rem] scroll-mt-24 px-6 pt-24 pb-20">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
        {/* Left Column: Mission & Manifesto */}
        <div className="lg:col-span-5">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.08em] text-lane">
            <span className="size-[0.4375rem] rounded-full bg-lane" />
            <span>About BotLane</span>
          </div>

          <h2 className="mt-4 text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-ink">
            Not a chatbot. <br />
            An AI coworker who prepares the work.
          </h2>

          <p className="mt-5 text-base leading-relaxed text-muted">
            Most AI tools ask you to stare at a blank prompt box. Lane is different: Lane monitors
            your incoming signals, synthesizes metrics, writes the prose, and queues it up on your
            approval desk.
          </p>

          <p className="mt-4 text-base leading-relaxed text-muted">
            You spend 30 seconds giving the final OK, and Lane delivers. You stay the trusted leader
            your clients know, without drowning in manual busywork.
          </p>

          <div className="mt-8 flex items-center gap-4 border-t border-line pt-6">
            <BotLaneLogo size={36} decorative />
            <div>
              <div className="text-sm font-semibold text-ink">Engineered for lean teams</div>
              <div className="text-xs text-muted">Agencies, consultancies & high-touch studios</div>
            </div>
          </div>
        </div>

        {/* Right Column: 4 Core Tenets Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
          {PRINCIPLES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-[1.25rem] border border-line bg-surface/40 p-6 transition-all hover:bg-white hover:shadow-[0_0.75rem_2rem_rgba(20,20,40,0.05)]"
              >
                <div className="flex size-10 items-center justify-center rounded-xl bg-white shadow-sm border border-line/60 text-ink">
                  <Icon size={20} className="text-lane" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-ink tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
