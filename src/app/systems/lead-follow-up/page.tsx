"use client";

import { useState } from "react";
import Link from "next/link";
import {
  GitCommit,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronDown,
  RotateCcw,
  Zap,
  Mail,
  UserCheck,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  HubSpotLogo,
  TypeformLogo,
  GoogleCalendarLogo,
  GmailLogo,
} from "@/components/assemble/company-icons";

export default function LeadFollowUpPage() {
  const [approved, setApproved] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeStepTab, setActiveStepTab] = useState<number>(0);

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const CADENCE_STEPS = [
    {
      timing: "Minute 3",
      title: "Touch 1: Immediate Tailored Intake Reply",
      subject: "Re: Partnership inquiry from Acme Corp",
      snippet:
        "Hi Marcus, saw your note on scaling paid acquisition for Acme's Q4 launch. Took a quick look at your current meta library—spotted two quick wins on conversion tracking. Do you have 15 mins this Thursday to compare notes?",
      status: "Dispatched upon approval",
    },
    {
      timing: "Day 2",
      title: "Touch 2: Contextual Value Nudge",
      subject: "Quick case study relevant to Acme's checkout flow",
      snippet:
        "Hey Marcus, circling back with a 2-page teardown we did for a similar B2B SaaS in your space that dropped CPA by 31%. Grabbing 15 mins with our director here: botlane.io/calendar/marcus",
      status: "Queued (halts if prospect replies)",
    },
    {
      timing: "Day 5",
      title: "Touch 3: Clean Polite Check-In",
      subject: "Closing the loop on Acme's acquisition sprint",
      snippet:
        "Hi Marcus, assume timing might be tight for Q4. I'll park our deck for now so I don't clutter your inbox, but feel free to grab time whenever your roadmap clears up.",
      status: "Final gentle touchpoint",
    },
  ];

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-bg">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-[1200px] px-6 pt-10">
          <div className="flex items-center gap-2 text-xs font-mono text-muted">
            <Link href="/systems" className="hover:text-lane transition">
              Systems
            </Link>
            <span>/</span>
            <span className="text-ink font-semibold">02 · Lead Follow-Up</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative mx-auto max-w-[1200px] px-6 pt-8 pb-16 text-center sm:pt-12 sm:pb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-lane/20 bg-lane/5 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-lane">
            <GitCommit size={13} />
            <span>System 02 · The Line</span>
          </div>

          <h1 className="mt-5 text-[clamp(36px,5vw,68px)] font-bold leading-[1.02] tracking-[-0.04em] text-ink">
            Never lose another lead <br />
            to a slow reply.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Replies to inbound enquiries in under 180 seconds in your authentic tone, conducts instant prospect research,
            and runs calibrated nudges until the discovery call is booked on your calendar.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/demo"
              className="inline-flex h-11 items-center gap-2 rounded-[8px] bg-ink px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-black"
            >
              <Sparkles size={15} className="text-lane" />
              <span>Book a Lead Cadence Demo</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex h-11 items-center rounded-[8px] border border-line bg-white px-5 text-sm font-semibold text-ink shadow-sm transition hover:bg-surface"
            >
              <span>$600/mo Standalone Retainer</span>
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 border-y border-line py-5 text-xs text-muted">
            <div className="flex items-center gap-2">
              <Zap size={15} className="text-lane" />
              <span><strong className="text-ink font-mono">&lt; 180s</strong> average response speed</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <UserCheck size={15} className="text-emerald-600" />
              <span><strong className="text-ink font-mono">+34%</strong> discovery call booking rate</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <Clock size={15} className="text-ink" />
              <span>Halts instantly when prospect books</span>
            </div>
          </div>
        </section>

        {/* How It Works (The Line Pipeline) */}
        <section className="mx-auto max-w-[1200px] px-6 py-20 border-t border-line">
          <div className="max-w-xl">
            <div className="font-mono text-xs font-semibold uppercase tracking-wider text-lane">
              Linear Architecture
            </div>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              From web form to confirmed calendar invite.
            </h2>
            <p className="mt-2 text-sm text-muted">
              Most agency leads go cold because replies take 4+ hours. Lane eliminates the gap completely.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {[
              {
                step: "01",
                title: "Instant Webhook",
                desc: "Prospect submits form on your website via Typeform, Webflow, or HubSpot. Lane receives payload in real-time.",
              },
              {
                step: "02",
                title: "Contextual Enrichment",
                desc: "Lane scrapes the prospect domain, verifies company headcount, and detects tech stack to personalize the angle.",
              },
              {
                step: "03",
                title: "Drafting in Your Tone",
                desc: "Drafts a sharp, human reply referencing their exact challenge with your live calendar scheduling link.",
              },
              {
                step: "04",
                title: "Calibrated Nudges",
                desc: "If no booking after 48 hrs, sends a value-packed follow-up. Pauses permanently the millisecond they reply or book.",
              },
            ].map((col) => (
              <div key={col.step} className="rounded-[18px] border border-line bg-white p-6 shadow-sm">
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
              Supported Integrations
            </div>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink">
              Seamless connection to your sales tools.
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { name: "Typeform / Forms", icon: TypeformLogo, desc: "Instant form ingestion and qualification logic" },
              { name: "HubSpot CRM", icon: HubSpotLogo, desc: "Automatic deal creation, pipeline stage progression" },
              { name: "Google Calendar", icon: GoogleCalendarLogo, desc: "Real-time availability check, auto-reserving slots" },
              { name: "Gmail / GSuite", icon: GmailLogo, desc: "Sends from your authentic team member email address" },
            ].map((tool) => {
              const Icon = tool.icon;
              return (
                <div key={tool.name} className="rounded-[16px] border border-line bg-white p-5 text-center shadow-sm">
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

        {/* Interactive Approval & Output Workspace */}
        <section className="mx-auto max-w-[1200px] px-6 py-20 border-t border-line">
          <div className="max-w-xl">
            <div className="font-mono text-xs font-semibold uppercase tracking-wider text-lane">
              Approval Desk Experience
            </div>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              What you approve.
            </h2>
            <p className="mt-2 text-sm text-muted">
              Lane prepares the response within 90 seconds. You review the prospect background and click Approve.
            </p>
          </div>

          <div className="mt-10 rounded-[24px] border border-line bg-white p-6 sm:p-8 shadow-[0_16px_50px_rgba(20,20,40,0.06)]">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-[8px] bg-lane/10 text-lane">
                  <Mail size={18} />
                </span>
                <div>
                  <div className="text-sm font-semibold text-ink">
                    Inbound Prospect: Marcus Chen · VP Growth @ Acme SaaS
                  </div>
                  <div className="text-xs text-muted">
                    Source: Website Enterprise Form · Budget: $25k+/mo
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
                      <span>Approved & Dispatched (2m 14s elapsed)</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={14} className="text-lane" />
                      <span>Approve & Send Draft</span>
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

            {/* Interactive Cadence Inspector Tabs */}
            <div className="mt-6">
              <div className="flex items-center gap-2 border-b border-line pb-2">
                {CADENCE_STEPS.map((step, idx) => (
                  <button
                    key={step.timing}
                    type="button"
                    onClick={() => setActiveStepTab(idx)}
                    className={`rounded-[8px] px-3 py-1.5 text-xs font-medium transition ${
                      activeStepTab === idx
                        ? "bg-ink text-white"
                        : "text-muted hover:text-ink hover:bg-surface"
                    }`}
                  >
                    {step.timing} ({idx === 0 ? "Initial" : `Follow-up #${idx}`})
                  </button>
                ))}
              </div>

              <div className="mt-5 rounded-[16px] border border-line/80 bg-surface/40 p-5">
                <div className="flex items-center justify-between text-xs font-mono text-muted border-b border-line/50 pb-2">
                  <span>Subject: {CADENCE_STEPS[activeStepTab].subject}</span>
                  <span className="text-emerald-700 font-semibold">{CADENCE_STEPS[activeStepTab].status}</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-ink font-serif italic">
                  &ldquo;{CADENCE_STEPS[activeStepTab].snippet}&rdquo;
                </p>
                <div className="mt-5 pt-3 border-t border-line/50 flex items-center justify-between text-[11px] text-muted">
                  <span>Sent via your agency domain: hello@youragency.com</span>
                  <span className="text-lane font-mono">Auto-pause if prospect books discovery call</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lead FAQ */}
        <section className="mx-auto max-w-[960px] px-6 py-20 border-t border-line">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-ink">
              Lead Follow-Up FAQ
            </h2>
          </div>

          <div className="mt-10 space-y-3">
            {[
              {
                q: "What if the prospect replies before the second touch?",
                a: "The entire follow-up sequence halts immediately within 60 seconds. Lane marks the lead as 'Engaged' in HubSpot and assigns a team member.",
              },
              {
                q: "Can I filter out spam or low-budget submissions?",
                a: "Yes. You set minimum budget or qualification thresholds. Submissions under your criteria are politely directed to self-serve resources without cluttering your desk.",
              },
              {
                q: "Does it send from our authentic company email?",
                a: "Yes. Lane authenticates via Google Workspace or Microsoft 365 OAuth to send from your real staff accounts (e.g. alex@youragency.com) with high deliverability.",
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
              Turn your inbound leads into booked meetings.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-white/70">
              Deploy System 02 on a flat $600/mo retainer or as part of the full suite. 30-day money-back guarantee.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
              <Link
                href="/demo"
                className="inline-flex h-11 items-center gap-2 rounded-[8px] bg-white px-5 text-xs font-semibold text-ink hover:bg-white/90"
              >
                <span>Book a Lead Cadence Walkthrough</span>
                <ArrowRight size={13} />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex h-11 items-center rounded-[8px] border border-white/20 px-5 text-xs font-semibold text-white hover:bg-white/10"
              >
                <span>View Retainer Options</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
