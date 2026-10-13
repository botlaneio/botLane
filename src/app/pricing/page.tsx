"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ArrowRight, ShieldCheck, ChevronDown } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LaneMarkCycle } from "@/components/lane-mark-cycle";

const TIERS = [
  {
    id: "single",
    name: "Single System",
    badge: null,
    price: "$490",
    period: "/month",
    description: "Deploy Lane to solve your single largest agency operational bottleneck.",
    features: [
      "Choice of System: Client Reporting, Leads, or Invoices",
      "Unlimited automated runs for all your active clients",
      "1-click review & approval desk (Desktop & Mobile)",
      "Native OAuth connections with your primary tools",
      "Shared Slack connect channel with BotLane engineering",
      "Unlimited agency team member seats",
      "Standard 30-day money-back guarantee",
    ],
    ctaText: "Start with 1 system",
    ctaHref: "/demo?plan=single",
    highlight: false,
  },
  {
    id: "full-suite",
    name: "Full Suite",
    badge: "Most Popular for Agencies",
    price: "$1,190",
    period: "/month",
    description: "All three autonomous engines orchestrated together with unified agency memory.",
    features: [
      "All 3 systems: Client Reporting, Leads, and Invoices",
      "Unified approval desk & centralized morning briefing",
      "Custom agency voice & vocabulary calibration",
      "Cross-system anomaly protection & mutual signals",
      "Dedicated senior solutions engineer on your Slack",
      "White-labeled client reports with your agency branding",
      "Continuous data audit log & SOC2 compliance export",
      "Priority feature roadmap requests",
    ],
    ctaText: "Deploy Full Suite",
    ctaHref: "/demo?plan=suite",
    highlight: true,
  },
  {
    id: "enterprise",
    name: "Enterprise Multi-Roster",
    badge: "For 40+ Retainer Clients",
    price: "$2,400",
    period: "/month",
    description: "Designed for scaled agencies and holding companies running multiple client rosters.",
    features: [
      "Everything in Full Suite across multiple sub-brands",
      "Custom bespoke ERP or internal SQL database pipelines",
      "Dedicated private cloud deployment isolation",
      "Custom SLA: 99.9% uptime & 1-hour engineer response",
      "Tailored security review & custom vendor DPAs",
      "Quarterly on-site or video workflow audits",
    ],
    ctaText: "Talk to Founders",
    ctaHref: "/demo?plan=enterprise",
    highlight: false,
  },
];

const COMPARISON_ROWS = [
  { feature: "Included Workflows", single: "1 Selected System", suite: "All 3 Systems", enterprise: "All 3 + Bespoke" },
  { feature: "Active Client Limit", single: "Unlimited", suite: "Unlimited", enterprise: "Unlimited" },
  { feature: "Seats / User Licenses", single: "Unlimited", suite: "Unlimited", enterprise: "Unlimited" },
  { feature: "Human-in-the-Loop Desk", single: "Yes", suite: "Yes", enterprise: "Yes" },
  { feature: "White-Label Branding", single: "Standard", suite: "Full White-Label", enterprise: "Custom Domain & CSS" },
  { feature: "Slack Connect Channel", single: "Included", suite: "Priority Dedicated", enterprise: "Direct Founders & VIP" },
  { feature: "30-Day Money-Back Guarantee", single: "100% Refund", suite: "100% Refund", enterprise: "Contractual SLA" },
];

const PRICING_FAQS = [
  {
    q: "Are there any hidden setup fees or onboarding charges?",
    a: "None. Our team configures your sandbox, sets up your API integrations, and fine-tunes your agency's tone model during our standard onboarding with zero added setup fees.",
  },
  {
    q: "Can we switch between Single System and Full Suite later?",
    a: "Yes. Many agencies start with Client Reporting or Invoice Follow-Up and upgrade to the Full Suite once they experience the relief of automated preparation.",
  },
  {
    q: "Do you charge extra if our agency signs more clients?",
    a: "No. BotLane operates on a transparent flat monthly retainer, not punitive per-client or per-seat metering. Grow your roster freely without surprise invoices.",
  },
  {
    q: "How does the 30-day money-back guarantee work?",
    a: "If within your first 30 days you feel BotLane has not reclaimed at least 15 hours of your team's weekly labor or dramatically simplified your operations, let us know and we will issue a complete refund immediately.",
  },
];

export default function PricingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-bg">
        {/* Hero Section */}
        <section className="relative mx-auto max-w-[1200px] px-6 pt-16 pb-20 text-center sm:pt-24 sm:pb-28">
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-lane">
            <LaneMarkCycle size={14} />
            <span>Predictable Retainer Pricing</span>
          </div>

          <h1 className="mt-5 text-[clamp(36px,5vw,68px)] font-bold leading-[1] tracking-[-0.04em] text-ink">
            One flat fee. <br />
            Zero per-seat penalties.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Hiring an operations coordinator costs $85k/year plus benefits. Lane prepares your work flawlessly,
            runs 24/7, and costs a fraction of a single junior salary.
          </p>
        </section>

        {/* Pricing Cards */}
        <section className="mx-auto max-w-[1200px] px-6 pb-24">
          <div className="grid gap-8 lg:grid-cols-3 lg:items-stretch">
            {TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`relative flex flex-col justify-between rounded-[26px] p-8 transition-all ${
                  tier.highlight
                    ? "border-2 border-lane bg-white shadow-[0_24px_60px_rgba(20,20,40,0.10)] -translate-y-2"
                    : "border border-line bg-white shadow-[0_8px_30px_rgba(20,20,40,0.03)]"
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-lane px-3.5 py-1 font-mono text-[11px] font-semibold text-white shadow-sm">
                    {tier.badge}
                  </div>
                )}

                <div>
                  <div className="font-mono text-xs font-semibold uppercase tracking-wider text-muted">
                    {tier.name}
                  </div>

                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-[clamp(40px,4vw,56px)] font-bold tracking-tight text-ink">
                      {tier.price}
                    </span>
                    <span className="font-mono text-sm text-muted">{tier.period}</span>
                  </div>

                  <p className="mt-3 text-sm text-muted leading-relaxed">
                    {tier.description}
                  </p>

                  <div className="mt-8 border-t border-line/70 pt-6">
                    <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink mb-4">
                      What is included:
                    </div>
                    <ul className="space-y-3">
                      {tier.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5 text-xs text-ink-2">
                          <Check size={14} className="mt-0.5 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-10 border-t border-line pt-6">
                  <Link
                    href={tier.ctaHref}
                    className={`flex h-12 w-full items-center justify-center gap-2 rounded-[10px] text-xs font-semibold transition ${
                      tier.highlight
                        ? "bg-lane text-white hover:bg-lane/90 shadow-md shadow-lane/20"
                        : "bg-ink text-white hover:bg-black"
                    }`}
                  >
                    <span>{tier.ctaText}</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Feature Comparison Matrix Table */}
        <section className="mx-auto max-w-[1200px] px-6 py-20 border-t border-line">
          <div className="max-w-xl">
            <div className="font-mono text-xs font-semibold uppercase tracking-wider text-lane">
              Detailed Breakdown
            </div>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink">
              Compare plan capabilities
            </h2>
          </div>

          <div className="mt-10 overflow-x-auto rounded-[20px] border border-line bg-white shadow-sm">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-line bg-surface/60 font-mono text-xs text-muted">
                  <th className="p-4 pl-6 font-semibold uppercase tracking-wider">Capability</th>
                  <th className="p-4 font-semibold uppercase tracking-wider text-ink">Single System</th>
                  <th className="p-4 font-semibold uppercase tracking-wider text-lane">Full Suite</th>
                  <th className="p-4 pr-6 font-semibold uppercase tracking-wider text-ink">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/70">
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.feature}>
                    <td className="p-4 pl-6 font-medium text-ink">{row.feature}</td>
                    <td className="p-4 text-muted">{row.single}</td>
                    <td className="p-4 text-lane font-semibold">{row.suite}</td>
                    <td className="p-4 pr-6 text-muted">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 30-Day Guarantee Box */}
        <section className="mx-auto max-w-[1200px] px-6 py-10">
          <div className="rounded-[22px] border border-emerald-500/20 bg-emerald-500/5 p-8 sm:flex sm:items-center sm:gap-6">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
              <ShieldCheck size={28} />
            </div>
            <div className="mt-4 sm:mt-0">
              <h3 className="text-lg font-bold text-ink">
                Our 30-Day Risk-Free Agency Guarantee
              </h3>
              <p className="mt-1 text-sm text-muted leading-relaxed">
                We believe software should prove its value in cold, hard hours saved. If you are not delighted with
                how Lane automates your client preparation within 30 days of kickoff, email us for an unconditional 100% refund.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing FAQ */}
        <section className="mx-auto max-w-[960px] px-6 py-20 border-t border-line">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-ink">
              Pricing & Billing FAQ
            </h2>
          </div>

          <div className="mt-10 space-y-3">
            {PRICING_FAQS.map((faq, idx) => (
              <div
                key={faq.q}
                className="rounded-[14px] border border-line bg-white p-5 cursor-pointer"
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-ink">{faq.q}</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${activeFaq === idx ? "rotate-180" : ""}`}
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
