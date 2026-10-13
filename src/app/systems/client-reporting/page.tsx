"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Layers,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronDown,
  RotateCcw,
  TrendingUp,
  BarChart3,
  ShieldCheck,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AssembleController } from "@/components/assemble/assemble-controller";
import { AssembleScene } from "@/components/assemble/assemble-scene";
import "@/components/assemble/assemble.css";
import {
  GoogleAdsLogo,
  GoogleAnalyticsLogo,
  MetaAdsLogo,
  HubSpotLogo,
} from "@/components/assemble/company-icons";

export default function ClientReportingPage() {
  const [approved, setApproved] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-bg">
        {/* Top Breadcrumb */}
        <div className="mx-auto max-w-[1200px] px-6 pt-10">
          <div className="flex items-center gap-2 text-xs font-mono text-muted">
            <Link href="/systems" className="hover:text-lane transition">
              Systems
            </Link>
            <span>/</span>
            <span className="text-ink font-semibold">01 · Client Reporting</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative mx-auto max-w-[1200px] px-6 pt-8 pb-16 text-center sm:pt-12 sm:pb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-lane/20 bg-lane/5 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-lane">
            <Layers size={13} />
            <span>System 01 · The Funnel</span>
          </div>

          <h1 className="mt-5 text-[clamp(36px,5vw,68px)] font-bold leading-[1.02] tracking-[-0.04em] text-ink">
            Client reporting, solved. <br />
            Ten ad channels in. One report out.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Lane monitors your Google Ads, Meta Ads, and CRM data each week, synthesizes blended metrics,
            writes the executive commentary, and waits for your 30-second approval.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/demo"
              className="inline-flex h-11 items-center gap-2 rounded-[8px] bg-ink px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-black"
            >
              <Sparkles size={15} className="text-lane" />
              <span>Book a Live Reporting Demo</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex h-11 items-center rounded-[8px] border border-line bg-white px-5 text-sm font-semibold text-ink shadow-sm transition hover:bg-surface"
            >
              <span>$490/mo Standalone Retainer</span>
            </Link>
          </div>

          {/* Key Stat Badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 border-y border-line py-5 text-xs text-muted">
            <div className="flex items-center gap-2">
              <Clock size={15} className="text-lane" />
              <span><strong className="text-ink font-mono">3.5 hrs</strong> saved per client / month</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-emerald-600" />
              <span><strong className="text-ink">100%</strong> human-approved before sending</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <TrendingUp size={15} className="text-ink" />
              <span>Blended ROAS, CPA & spend attribution</span>
            </div>
          </div>
        </section>

        {/* 3D Workflow Hero: Assemble Scene */}
        <section className="relative mx-auto max-w-[1200px] px-6 pb-20">
          <div className="mb-4 text-center">
            <span className="font-mono text-xs uppercase tracking-wider text-muted">
              Interactive 3D Assembly · Funnel Architecture
            </span>
          </div>
          <div className="overflow-hidden rounded-[24px] border border-line bg-white shadow-[0_16px_50px_rgba(20,20,40,0.06)]">
            <AssembleController>
              <AssembleScene />
            </AssembleController>
          </div>
        </section>

        {/* How It Works (Step-by-Step Pipeline) */}
        <section className="mx-auto max-w-[1200px] px-6 py-20 border-t border-line">
          <div className="max-w-xl">
            <div className="font-mono text-xs font-semibold uppercase tracking-wider text-lane">
              The Funnel Pipeline
            </div>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              How Lane builds your reports.
            </h2>
            <p className="mt-2 text-sm text-muted">
              From raw API queries on Monday morning to dispatched client deliverables in under 5 minutes.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {[
              {
                step: "01",
                title: "Scheduled Ingestion",
                desc: "At 06:00 AM every Monday, Lane connects to Google Ads, Meta, GA4, and HubSpot via native OAuth APIs and extracts 7-day performance data.",
              },
              {
                step: "02",
                title: "Cross-Channel Blending",
                desc: "Calculates true blended ROAS, removes duplicate conversions across platforms, and cross-references CRM closed-won pipeline revenue.",
              },
              {
                step: "03",
                title: "Executive Synthesis",
                desc: "Writes human-sounding bullet points in your agency's tone: top performing creatives, campaign wins, budget pacing, and strategic recommendations.",
              },
              {
                step: "04",
                title: "One-Click Dispatch",
                desc: "Renders an elegant PDF and interactive link. Alerts your Slack/email desk. You click Approve, and it delivers straight to your client's inbox.",
              },
            ].map((col) => (
              <div
                key={col.step}
                className="rounded-[18px] border border-line bg-white p-6 shadow-sm"
              >
                <div className="font-mono text-2xl font-bold text-ink">{col.step}</div>
                <h3 className="mt-4 text-base font-semibold text-ink">{col.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted">{col.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tools It Connects */}
        <section className="mx-auto max-w-[1200px] px-6 py-16 border-t border-line">
          <div className="text-center max-w-2xl mx-auto">
            <div className="font-mono text-xs font-semibold uppercase tracking-wider text-lane">
              Supported Sources
            </div>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink">
              Every data source your agency touches.
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { name: "Google Ads", icon: GoogleAdsLogo, desc: "Search, PMax, YouTube spend & conversion tracking" },
              { name: "Meta Ads", icon: MetaAdsLogo, desc: "Instagram & Facebook ad sets, CPM & blended ROAS" },
              { name: "Google Analytics 4", icon: GoogleAnalyticsLogo, desc: "Sessions, engaged users, key event tracking" },
              { name: "HubSpot CRM", icon: HubSpotLogo, desc: "Deals won, lifecycle stages, pipeline ROI match" },
            ].map((tool) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.name}
                  className="rounded-[16px] border border-line bg-white p-5 text-center shadow-sm"
                >
                  <div className="mx-auto flex size-12 items-center justify-center rounded-[12px] bg-surface p-2.5">
                    <Icon size={26} />
                  </div>
                  <div className="mt-4 text-sm font-semibold text-ink">{tool.name}</div>
                  <div className="mt-1 text-xs text-muted leading-snug">{tool.desc}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* What You Approve & Example Output (Interactive Component) */}
        <section className="mx-auto max-w-[1200px] px-6 py-20 border-t border-line">
          <div className="max-w-xl">
            <div className="font-mono text-xs font-semibold uppercase tracking-wider text-lane">
              Human-in-the-Loop Artifact
            </div>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              What you actually approve.
            </h2>
            <p className="mt-2 text-sm text-muted">
              Try the interactive approval below. Inspect the client report, verify numbers, and click Approve & Dispatch.
            </p>
          </div>

          {/* Interactive Workspace Preview */}
          <div className="mt-10 rounded-[24px] border border-line bg-white p-6 sm:p-8 shadow-[0_16px_50px_rgba(20,20,40,0.06)]">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-[8px] bg-lane/10 text-lane">
                  <BarChart3 size={18} />
                </span>
                <div>
                  <div className="text-sm font-semibold text-ink">
                    Weekly Performance Brief · Meridian Health Group
                  </div>
                  <div className="text-xs text-muted">
                    Period: Oct 6 – Oct 13, 2026 · Blended Meta + Google Ads
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setApproved(!approved)}
                  className={`inline-flex items-center gap-2 rounded-[8px] px-4 py-2 text-xs font-semibold transition ${
                    approved
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "bg-ink text-white hover:bg-black"
                  }`}
                >
                  {approved ? (
                    <>
                      <CheckCircle2 size={14} />
                      <span>Approved & Dispatched (08:14 AM)</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={14} className="text-lane" />
                      <span>Approve & Dispatch</span>
                    </>
                  )}
                </button>

                {approved && (
                  <button
                    type="button"
                    onClick={() => setApproved(false)}
                    className="flex size-8 items-center justify-center rounded-[8px] border border-line text-muted hover:text-ink"
                    title="Reset simulation"
                  >
                    <RotateCcw size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Rendered Report Dossier */}
            <div className="mt-6 grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-8 space-y-6">
                {/* 3 Metric Cards */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-[14px] border border-line/70 bg-surface/60 p-4">
                    <div className="font-mono text-[10px] uppercase text-muted">Total Ad Spend</div>
                    <div className="mt-1.5 font-mono text-xl font-bold text-ink">$8,420</div>
                    <div className="mt-1 text-[11px] text-emerald-600 font-medium">-4.2% pacing vs target</div>
                  </div>
                  <div className="rounded-[14px] border border-line/70 bg-surface/60 p-4">
                    <div className="font-mono text-[10px] uppercase text-muted">Blended Leads</div>
                    <div className="mt-1.5 font-mono text-xl font-bold text-ink">142</div>
                    <div className="mt-1 text-[11px] text-emerald-600 font-medium">+18.3% WoW</div>
                  </div>
                  <div className="rounded-[14px] border border-line/70 bg-surface/60 p-4">
                    <div className="font-mono text-[10px] uppercase text-muted">Effective CPA</div>
                    <div className="mt-1.5 font-mono text-xl font-bold text-emerald-600">$59.29</div>
                    <div className="mt-1 text-[11px] text-muted font-medium">Target: $65.00</div>
                  </div>
                </div>

                {/* Narrative Summary Generated by Lane */}
                <div className="rounded-[16px] border border-line/80 bg-white p-5">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-muted font-semibold">
                    Lane Executive Commentary
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink-2">
                    &quot;This week we unlocked strong scale in the Meta Advantage+ campaign, lowering blended acquisition
                    cost from $72.10 to $59.29. Google Search exact-match terms generated 48 high-intent patient inquiries,
                    while creative refresh in batch #4 brought click-through rate to 2.41%.&quot;
                  </p>
                  <div className="mt-4 border-t border-line/50 pt-3 flex items-center justify-between text-xs text-muted">
                    <span>Cites: Google Ads API, Meta Marketing API, GA4</span>
                    <span className="font-mono text-[10px] text-emerald-600 font-medium">Confidence: 99.4%</span>
                  </div>
                </div>
              </div>

              {/* Right Side: Delivery Details */}
              <div className="lg:col-span-4 rounded-[16px] border border-line/70 bg-surface/50 p-5 flex flex-col justify-between">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-muted font-semibold">
                    Delivery Payload
                  </div>
                  <div className="mt-3 space-y-2.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-muted">Recipient:</span>
                      <span className="font-mono text-ink">sarah@meridianhealth.com</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted">Format:</span>
                      <span className="font-mono text-ink">Executive PDF + Web Link</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted">Sender Tone:</span>
                      <span className="font-mono text-ink">Boutique Executive</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted">Slack Webhook:</span>
                      <span className="font-mono text-emerald-600">#client-meridian</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-[10px] bg-white p-3 border border-line text-[11px] text-muted">
                  <ShieldCheck size={14} className="text-emerald-600 inline mr-1.5" />
                  No deliverable is ever dispatched until this specific approval button is clicked.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reporting FAQ */}
        <section className="mx-auto max-w-[960px] px-6 py-20 border-t border-line">
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
                className="rounded-[14px] border border-line bg-white p-5 cursor-pointer"
                onClick={() => toggleFaq(idx)}
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

        {/* CTA Banner */}
        <section className="mx-auto max-w-[1200px] px-6 py-16">
          <div className="rounded-[24px] border border-line bg-ink p-8 text-center text-white sm:p-14">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Automate your client reporting this Friday.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-white/70">
              Get started with System 01 on a flat $490/mo retainer or deploy the full suite. 30-day money-back guarantee.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
              <Link
                href="/demo"
                className="inline-flex h-11 items-center gap-2 rounded-[8px] bg-white px-5 text-xs font-semibold text-ink hover:bg-white/90"
              >
                <span>Schedule a 20-min Walkthrough</span>
                <ArrowRight size={13} />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex h-11 items-center rounded-[8px] border border-white/20 px-5 text-xs font-semibold text-white hover:bg-white/10"
              >
                <span>View All Pricing Tiers</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
