"use client";

import { useState } from "react";
import Link from "next/link";
import { Layers, ArrowRight, CheckCircle2, Clock, Sparkles, ChevronDown, TrendingUp, UserCheck, Palette, CalendarClock } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SystemControls, SystemPricing, SystemTools } from "@/components/systems/system-extras";
import { ReportingStory } from "@/components/client-reporting/reporting-story";

export default function ClientReportingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-bg">
        {/* Top Breadcrumb */}
        <div className="mx-auto max-w-[75rem] px-6 pt-10">
          <div className="flex items-center gap-2 text-xs font-mono text-muted">
            <Link href="/systems" className="hover:text-lane transition">
              Systems
            </Link>
            <span>/</span>
            <span className="text-ink font-semibold">01 · Client Reporting</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative mx-auto max-w-[75rem] px-6 pt-8 pb-16 text-center sm:pt-12 sm:pb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-lane/20 bg-lane/5 px-3 py-1 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-lane">
            <Layers size={13} />
            <span>System 01 · The Funnel</span>
          </div>

          <h1 className="mt-5 text-[clamp(2.25rem,5vw,4.25rem)] font-bold leading-[1.02] tracking-[-0.04em] text-ink">
            Your clients stay informed. <br className="hidden sm:block" />
            Your team stays focused.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Lane monitors your Google Ads, Meta Ads, and CRM data each week, synthesizes blended metrics,
            writes the executive commentary, and waits for your 30-second approval.
          </p>

          <div className="cta-pair mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/demo"
              className="inline-flex h-11 items-center gap-2 rounded-[0.5rem] bg-btn px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-btn-hover"
            >
              <Sparkles size={15} className="text-lane" />
              <span className="sm:hidden">Book a demo</span>
              <span className="hidden sm:inline">Book a Live Reporting Demo</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex h-11 items-center rounded-[0.5rem] border border-line bg-white px-5 text-sm font-semibold text-ink shadow-sm transition hover:bg-surface"
            >
              <span className="sm:hidden">From $600/mo</span>
              <span className="hidden sm:inline">$600/mo Standalone Retainer</span>
            </Link>
          </div>

          {/* Key Stat Badges */}
          <div className="mt-12 flex flex-col items-center gap-3 border-y border-line py-5 text-xs text-muted sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-8">
            <div className="flex items-center gap-2">
              <Clock size={15} className="text-lane" />
              <span><strong className="text-ink font-mono">3.5 hrs</strong> saved per client / month</span>
            </div>
            <span aria-hidden className="hidden lg:inline">•</span>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-emerald-600" />
              <span><strong className="text-ink">100%</strong> human-approved before sending</span>
            </div>
            <span aria-hidden className="hidden lg:inline">•</span>
            <div className="flex items-center gap-2">
              <TrendingUp size={15} className="text-ink" />
              <span>Blended ROAS, CPA & spend attribution</span>
            </div>
          </div>
        </section>

        <ReportingStory />

        {/* Closing */}
        <section className="mx-auto max-w-[75rem] px-6 pt-20 pb-4 text-center sm:pt-28">
          <h2 className="text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-ink">
            Reporting, handled.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            From scattered updates to consistent client reporting. Built, managed, and overseen by Botlane.
          </p>
        </section>

        <SystemControls
          items={[
            { icon: UserCheck, title: "You approve every report", text: "Lane prepares the report and waits. Nothing reaches a client until you approve it." },
            { icon: Palette, title: "Your branding", text: "Reports carry your agency logo, colours and typography. BotLane stays in the background." },
            { icon: CalendarClock, title: "Your schedule", text: "Each client gets its own rule, such as Monday at 8am or the 1st of every month." },
          ]}
        />
        <SystemTools system="01" />
        <SystemPricing system="01" />

        {/* CTA Banner */}
        <section className="mx-auto max-w-[75rem] px-6 py-16">
          <div className="rounded-[1.5rem] border border-line bg-ink p-8 text-center text-white sm:p-14">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Automate your client reporting this Friday.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-white/70">
              Get started with System 01 on a flat $600/mo retainer or deploy the full suite. 30-day money-back guarantee.
            </p>
            <div className="cta-pair mt-7 flex flex-wrap items-center justify-center gap-3.5">
              <Link
                href="/demo"
                className="inline-flex h-11 items-center gap-2 rounded-[0.5rem] bg-white px-5 text-xs font-semibold text-ink hover:bg-white/90"
              >
                <span className="sm:hidden">Book a walkthrough</span>
              <span className="hidden sm:inline">Schedule a 20-min Walkthrough</span>
                <ArrowRight size={13} />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex h-11 items-center rounded-[0.5rem] border border-white/20 px-5 text-xs font-semibold text-white hover:bg-white/10"
              >
                <span className="sm:hidden">See pricing</span>
              <span className="hidden sm:inline">View All Pricing Tiers</span>
              </Link>
            </div>
          </div>
        </section>
        {/* Reporting FAQ */}
        <section className="mx-auto max-w-[60rem] px-6 py-20 border-t border-line">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-ink">
              Client Reporting FAQ
            </h2>
          </div>

          <div className="mt-10 space-y-3">
            {[
              {
                q: "Can I add custom metrics or proprietary formulas?",
                a: "Yes. During onboarding, we map your exact formulas (e.g. Blended MER, ROAS with COGS deducts, or custom Lead-to-Qualified ratios) so Lane calculates them automatically.",
              },
              {
                q: "Is the final report white-labeled with our agency branding?",
                a: "100%. Deliverables feature your agency logo, primary color scheme, and typography. BotLane operates invisibly in the background.",
              },
              {
                q: "Can I schedule reports on different days for different clients?",
                a: "Yes. Each client profile has an individual schedule rule (e.g., Client A on Monday 8am, Client B on the 1st of every month).",
              },
            ].map((faq, idx) => (
              <div
                key={faq.q}
                className="rounded-[0.875rem] border border-line bg-white p-5 cursor-pointer"
                onClick={() => toggleFaq(idx)}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-semibold text-sm text-ink">{faq.q}</span>
                  <ChevronDown
                    size={14}
                    className={`shrink-0 transition-transform ${activeFaq === idx ? "rotate-180" : ""}`}
                  />
                </div>
                {activeFaq === idx && (
                  <p className="mt-3 text-xs leading-relaxed text-muted">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
