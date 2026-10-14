"use client";

import Link from "next/link";
import {
  Layers,
  GitCommit,
  RotateCw,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LaneMarkCycle } from "@/components/lane-mark-cycle";

interface SystemComparison {
  id: string;
  href: string;
  shape: string;
  num: string;
  title: string;
  icon: typeof Layers;
  tagline: string;
  trigger: string;
  cadence: string;
  inputs: string[];
  preparedDeliverable: string;
  humanApprovalStep: string;
  outputDestination: string;
  agencyImpact: string;
}

const SYSTEMS_MATRIX: SystemComparison[] = [
  {
    id: "client-reporting",
    href: "/systems/client-reporting",
    shape: "FUNNEL",
    num: "01",
    title: "Client Reporting",
    icon: Layers,
    tagline: "Many fragmented sources synthesized into one executive client report.",
    trigger: "Scheduled weekly cycle (e.g. Monday 08:00 AM) or custom billing period.",
    cadence: "Weekly / Bi-weekly / Monthly per retained account.",
    inputs: ["Google Ads", "Meta Ads", "Google Analytics 4", "HubSpot", "Google Sheets"],
    preparedDeliverable: "Interactive web dossier & PDF executive summary with performance narrative.",
    humanApprovalStep: "Review highlights, tweak tone, tap 'Approve & Send'.",
    outputDestination: "Direct email to client leadership + Slack summary to account team.",
    agencyImpact: "Saves ~3.5 hours per client per month; zero manual spreadsheet copy-pasting.",
  },
  {
    id: "lead-follow-up",
    href: "/systems/lead-follow-up",
    shape: "LINE",
    num: "02",
    title: "Lead Follow-Up",
    icon: GitCommit,
    tagline: "Sub-3-minute personalized reply, followed by calibrated multi-touch nudges.",
    trigger: "New inbound form submission (Typeform, Webflow, HubSpot, website contact).",
    cadence: "Instant qualification + 3 polite graduated nudges until meeting booked.",
    inputs: ["Typeform", "HubSpot CRM", "Gmail / GSuite", "Google Calendar", "Calendly"],
    preparedDeliverable: "Contextual, research-backed email reply referencing prospect company & pain points.",
    humanApprovalStep: "Pre-dispatch sanity check (or autopilot mode for high-confidence leads).",
    outputDestination: "Direct prospect inbox from your authentic team email address.",
    agencyImpact: "+34% increase in discovery call conversion due to 180s initial response speed.",
  },
  {
    id: "invoice-follow-up",
    href: "/systems/invoice-follow-up",
    shape: "LOOP",
    num: "03",
    title: "Invoice Follow-Up",
    icon: RotateCw,
    tagline: "Gentle, graduated payment reminders that halt immediately upon payment.",
    trigger: "Invoice issued in Stripe / QuickBooks / Xero reaching T-3 days or overdue.",
    cadence: "T-3 days friendly heads-up -> Due Date -> +5 days statement -> +14 days senior check.",
    inputs: ["Stripe", "QuickBooks Online", "Xero", "Plaid bank feeds", "Gmail"],
    preparedDeliverable: "Polite reminder email with 1-click payment link, PDF invoice, and bank account details.",
    humanApprovalStep: "Approve escalation steps or apply custom grace periods per client.",
    outputDestination: "Client billing contact / AP department; updates internal Slack ledger.",
    agencyImpact: "Reduces days sales outstanding (DSO) by 18 days; eliminates awkward money calls.",
  },
];

export default function SystemsPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-bg">
        {/* Hero Section */}
        <section className="relative mx-auto max-w-[75rem] px-6 pt-16 pb-20 text-center sm:pt-24 sm:pb-28">
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-lane">
            <LaneMarkCycle size={14} />
            <span>Systems Comparison & Blueprint</span>
          </div>

          <h1 className="mt-5 text-[clamp(2.25rem,5vw,4.25rem)] font-bold leading-[1] tracking-[-0.04em] text-ink">
            Three autonomous engines. <br className="hidden sm:inline" />
            Compared side-by-side.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Every agency runs on three operational arteries: delivering client results, booking new business,
            and getting paid. Here is exactly how Lane automates each one without ever leaving you out of the loop.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/demo"
              className="inline-flex h-11 items-center gap-2 rounded-[0.5rem] bg-btn px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-btn-hover"
            >
              <Sparkles size={15} className="text-lane" />
              <span>Book a Systems Walkthrough</span>
            </Link>
            <Link
              href="/pricing"
              className="inline-flex h-11 items-center rounded-[0.5rem] border border-line bg-white px-5 text-sm font-semibold text-ink shadow-sm transition hover:bg-surface"
            >
              <span>View Retainer Pricing</span>
            </Link>
          </div>
        </section>

        {/* Detailed 3 Systems Cards */}
        <section className="mx-auto max-w-[75rem] px-6 pb-20">
          <div className="grid gap-8 lg:grid-cols-3">
            {SYSTEMS_MATRIX.map((sys) => {
              const Icon = sys.icon;
              return (
                <div
                  key={sys.id}
                  className="flex flex-col justify-between rounded-[1.5rem] border border-line bg-white p-7 shadow-[0_0.75rem_2.25rem_rgba(20,20,40,0.04)] transition hover:border-lane/30 hover:shadow-[0_1.25rem_3.125rem_rgba(20,20,40,0.08)]"
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-line pb-4">
                      <div className="font-mono text-xs font-semibold tracking-wider text-lane">
                        {sys.num} · {sys.shape}
                      </div>
                      <span className="flex size-9 items-center justify-center rounded-[0.625rem] bg-surface text-ink">
                        <Icon size={18} />
                      </span>
                    </div>

                    <h2 className="mt-5 text-2xl font-bold tracking-tight text-ink">
                      {sys.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {sys.tagline}
                    </p>

                    <div className="mt-6 space-y-4 border-t border-line/60 pt-5 text-xs">
                      <div>
                        <div className="font-mono font-semibold uppercase tracking-wider text-muted text-[0.625rem]">
                          Trigger & Cadence
                        </div>
                        <div className="mt-1 text-ink-2 leading-snug">
                          {sys.cadence}
                        </div>
                      </div>

                      <div>
                        <div className="font-mono font-semibold uppercase tracking-wider text-muted text-[0.625rem]">
                          Connected Sources
                        </div>
                        <div className="mt-1.5 flex flex-wrap gap-1.5">
                          {sys.inputs.map((tool) => (
                            <span
                              key={tool}
                              className="rounded-[0.375rem] bg-surface px-2 py-0.5 font-mono text-[0.625rem] text-ink"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="font-mono font-semibold uppercase tracking-wider text-muted text-[0.625rem]">
                          Prepared Deliverable
                        </div>
                        <div className="mt-1 text-ink-2 leading-snug">
                          {sys.preparedDeliverable}
                        </div>
                      </div>

                      <div>
                        <div className="font-mono font-semibold uppercase tracking-wider text-muted text-[0.625rem]">
                          Human Approval Step
                        </div>
                        <div className="mt-1 flex items-center gap-1.5 text-emerald-700 font-medium">
                          <CheckCircle2 size={13} className="shrink-0" />
                          <span>{sys.humanApprovalStep}</span>
                        </div>
                      </div>

                      <div>
                        <div className="font-mono font-semibold uppercase tracking-wider text-muted text-[0.625rem]">
                          Agency Impact
                        </div>
                        <div className="mt-1 font-mono font-medium text-lane">
                          {sys.agencyImpact}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 border-t border-line pt-5">
                    <Link
                      href={sys.href}
                      className="group flex w-full items-center justify-center gap-2 rounded-[0.625rem] bg-surface py-3 text-xs font-semibold text-ink transition hover:bg-btn hover:text-white"
                    >
                      <span>Deep Dive: {sys.title}</span>
                      <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Full Side-by-Side Comparison Matrix Table */}
        <section className="mx-auto max-w-[75rem] px-6 py-16 border-t border-line">
          <div className="max-w-xl">
            <div className="font-mono text-xs font-semibold uppercase tracking-wider text-lane">
              Technical Matrix
            </div>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink">
              System Specifications
            </h2>
            <p className="mt-2 text-sm text-muted">
              How data flows through BotLane from ingestion to verified human dispatch.
            </p>
          </div>

          <div className="mt-10 overflow-x-auto rounded-[1.25rem] border border-line bg-white shadow-sm">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-line bg-surface/60 font-mono text-xs text-muted">
                  <th className="p-4 pl-6 font-semibold uppercase tracking-wider">Dimension</th>
                  <th className="p-4 font-semibold uppercase tracking-wider text-ink">01 · Funnel (Reporting)</th>
                  <th className="p-4 font-semibold uppercase tracking-wider text-ink">02 · Line (Leads)</th>
                  <th className="p-4 pr-6 font-semibold uppercase tracking-wider text-ink">03 · Loop (Invoices)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/70">
                <tr>
                  <td className="p-4 pl-6 font-mono text-xs text-muted font-medium">Core Geometry</td>
                  <td className="p-4 text-ink">Funnel (N sources to 1 report)</td>
                  <td className="p-4 text-ink">Line (Inquiry to booked meeting)</td>
                  <td className="p-4 pr-6 text-ink">Loop (Graduated reminders until paid)</td>
                </tr>
                <tr>
                  <td className="p-4 pl-6 font-mono text-xs text-muted font-medium">Trigger</td>
                  <td className="p-4 text-muted">Time / Schedule based</td>
                  <td className="p-4 text-muted">Webhook / Inbound form submission</td>
                  <td className="p-4 pr-6 text-muted">Ledger due date & bank sync</td>
                </tr>
                <tr>
                  <td className="p-4 pl-6 font-mono text-xs text-muted font-medium">Average Latency</td>
                  <td className="p-4 text-muted">Queued 2 hrs before dispatch window</td>
                  <td className="p-4 text-emerald-600 font-semibold">&lt; 180 seconds</td>
                  <td className="p-4 pr-6 text-muted">Immediate halt upon payment sync</td>
                </tr>
                <tr>
                  <td className="p-4 pl-6 font-mono text-xs text-muted font-medium">Approval Interface</td>
                  <td className="p-4 text-muted">Report dossier preview + metric check</td>
                  <td className="p-4 text-muted">Email copy preview + qualification score</td>
                  <td className="p-4 pr-6 text-muted">Invoice aging ledger + pause override</td>
                </tr>
                <tr>
                  <td className="p-4 pl-6 font-mono text-xs text-muted font-medium">Client Experience</td>
                  <td className="p-4 text-muted">Executive clarity, polished PDF & web report</td>
                  <td className="p-4 text-muted">Warm, tailored, lightning-fast response</td>
                  <td className="p-4 pr-6 text-muted">Polite, respectful payment links</td>
                </tr>
                <tr>
                  <td className="p-4 pl-6 font-mono text-xs text-muted font-medium">Standalone Retainer</td>
                  <td className="p-4 font-mono font-medium text-ink">$600 / month</td>
                  <td className="p-4 font-mono font-medium text-ink">$600 / month</td>
                  <td className="p-4 pr-6 font-mono font-medium text-ink">$600 / month</td>
                </tr>
                <tr>
                  <td className="p-4 pl-6 font-mono text-xs text-lane font-semibold">Full Suite Bundle</td>
                  <td colSpan={3} className="p-4 pr-6 text-center font-mono font-bold text-lane bg-lane/[0.03]">
                    All 3 Systems included for $1,500 / month (Save $300/mo)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Cross-System Coordination Architecture */}
        <section className="mx-auto max-w-[75rem] px-6 py-20">
          <div className="rounded-[1.75rem] border border-line bg-white p-8 sm:p-12 shadow-[0_0.5rem_1.875rem_rgba(20,20,40,0.04)]">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-lane">
                <ShieldCheck size={14} />
                <span>Unified Lane Runtime</span>
              </div>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                One unified coworker. Not 3 disconnected tools.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted">
                When you deploy BotLane, all three engines share a singular agency memory: your brand voice,
                your client roster, your billing rules, and your approval team.
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              <div className="rounded-[1rem] border border-line/70 bg-surface/50 p-5">
                <div className="font-mono text-xs font-semibold text-ink">01 · Shared Tone Model</div>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  Lane writes with the exact same vocabulary in client reports as in lead outreach and reminder emails.
                </p>
              </div>

              <div className="rounded-[1rem] border border-line/70 bg-surface/50 p-5">
                <div className="font-mono text-xs font-semibold text-ink">02 · Central Approval Desk</div>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  Review reports, new lead drafts, and pending invoices in one unified 60-second morning queue.
                </p>
              </div>

              <div className="rounded-[1rem] border border-line/70 bg-surface/50 p-5">
                <div className="font-mono text-xs font-semibold text-ink">03 · Cross-Signal Protection</div>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  If a client has an overdue invoice in Loop, Lane can flag their weekly report with an internal note.
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
              <span className="text-xs text-muted">
                Ready to deploy Lane across your client operations?
              </span>
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 rounded-[0.5rem] bg-btn px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-btn-hover"
              >
                <span>Book a Demo Call</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
