"use client";

import { useState } from "react";
import Link from "next/link";
import {
  RotateCw,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ChevronDown,
  RotateCcw,
  DollarSign,
  Receipt,
  ShieldCheck,
  CreditCard,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  StripeLogo,
  QuickBooksLogo,
  PlaidLogo,
  GmailLogo,
} from "@/components/assemble/company-icons";

export default function InvoiceFollowUpPage() {
  const [approved, setApproved] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeStage, setActiveStage] = useState<number>(1);

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const REMINDER_STAGES = [
    {
      stage: "T - 3 Days",
      label: "Courtesy Advance Notice",
      tone: "Warm & Helpful",
      subject: "Upcoming invoice #1084 for October retained services",
      body: "Hi Elena, just a quick courtesy note that invoice #1084 ($12,400) is scheduled for October 15th. You can review the itemized breakdown or remit via 1-click card/ACH link below.",
    },
    {
      stage: "Due Date + 3",
      label: "Gentle Ledger Statement",
      tone: "Polite & Professional",
      subject: "Statement reminder: Invoice #1084 due date passed",
      body: "Hi Elena, following up on invoice #1084 ($12,400). Wanted to check if you need any additional PO details or an updated PDF statement for your accounting department.",
    },
    {
      stage: "Due Date + 14",
      label: "Senior Executive Escalation",
      tone: "Firm & Clear",
      subject: "Action requested: Overdue account balance for Meridian",
      body: "Hi Elena, reaching out as invoice #1084 remains open past our standard 14-day grace window. Please let us know if there is an issue with the transfer so we can assist.",
    },
  ];

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-bg">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-[75rem] px-6 pt-10">
          <div className="flex items-center gap-2 text-xs font-mono text-muted">
            <Link href="/systems" className="hover:text-lane transition">
              Systems
            </Link>
            <span>/</span>
            <span className="text-ink font-semibold">03 · Invoice Follow-Up</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative mx-auto max-w-[75rem] px-6 pt-8 pb-16 text-center sm:pt-12 sm:pb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-lane/20 bg-lane/5 px-3 py-1 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-lane">
            <RotateCw size={13} />
            <span>System 03 · The Loop</span>
          </div>

          <h1 className="mt-5 text-[clamp(2.25rem,5vw,4.25rem)] font-bold leading-[1.02] tracking-[-0.04em] text-ink">
            Collect every dollar. <br />
            Without the awkward money chats.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Sends polite, graduated payment reminders that protect your client relationships and
            halt the exact millisecond funds clear in Stripe, QuickBooks, or your bank feed.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/demo"
              className="inline-flex h-11 items-center gap-2 rounded-[0.5rem] bg-btn px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-btn-hover"
            >
              <Sparkles size={15} className="text-lane" />
              <span>Book an Invoicing Demo</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex h-11 items-center rounded-[0.5rem] border border-line bg-white px-5 text-sm font-semibold text-ink shadow-sm transition hover:bg-surface"
            >
              <span>$600/mo Standalone Retainer</span>
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 border-y border-line py-5 text-xs text-muted">
            <div className="flex items-center gap-2">
              <DollarSign size={15} className="text-emerald-600" />
              <span><strong className="text-ink font-mono">18 days</strong> faster AR collection</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <RotateCw size={15} className="text-lane" />
              <span>Automatic bank reconciliation loop</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <ShieldCheck size={15} className="text-ink" />
              <span>Zero awkward chases for paid clients</span>
            </div>
          </div>
        </section>

        {/* How It Works (The Loop Pipeline) */}
        <section className="mx-auto max-w-[75rem] px-6 py-20 border-t border-line">
          <div className="max-w-xl">
            <div className="font-mono text-xs font-semibold uppercase tracking-wider text-lane">
              Loop Lifecycle
            </div>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              How the collection loop resolves AR.
            </h2>
            <p className="mt-2 text-sm text-muted">
              Most clients don&apos;t withhold payment intentionally—they just lose invoices in busy inboxes.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {[
              {
                step: "01",
                title: "Real-Time Ledger Sync",
                desc: "Connects to Stripe, QuickBooks Online, Xero, or bank feeds to monitor open invoices and aging buckets.",
              },
              {
                step: "02",
                title: "Calibrated Reminders",
                desc: "Starts with a warm courtesy note before the due date, followed by clear itemized statements.",
              },
              {
                step: "03",
                title: "Frictionless Payment Link",
                desc: "Every email embeds a secure 1-click credit card, Apple Pay, ACH, or wire link with verified PDF invoice attached.",
              },
              {
                step: "04",
                title: "Instant Cadence Halt",
                desc: "The second payment lands, the loop dissolves within 60 seconds. An audit note posts to your Slack ledger.",
              },
            ].map((col) => (
              <div key={col.step} className="rounded-[1.125rem] border border-line bg-white p-6 shadow-sm">
                <div className="font-mono text-2xl font-bold text-ink">{col.step}</div>
                <h3 className="mt-4 text-base font-semibold text-ink">{col.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted">{col.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tools It Connects */}
        <section className="mx-auto max-w-[75rem] px-6 py-16 border-t border-line">
          <div className="text-center max-w-2xl mx-auto">
            <div className="font-mono text-xs font-semibold uppercase tracking-wider text-lane">
              Financial Integrations
            </div>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink">
              Direct connection with your billing system.
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { name: "Stripe Billing", icon: StripeLogo, desc: "Monitors subscriptions, one-off invoices, payment intents" },
              { name: "QuickBooks Online", icon: QuickBooksLogo, desc: "Syncs accounts receivable aging, paid status, ledger sync" },
              { name: "Plaid Bank Feeds", icon: PlaidLogo, desc: "Verifies incoming wires and ACH transfers directly" },
              { name: "Gmail / GSuite", icon: GmailLogo, desc: "Sends from your billing desk (e.g. billing@youragency.com)" },
            ].map((tool) => {
              const Icon = tool.icon;
              return (
                <div key={tool.name} className="rounded-[1rem] border border-line bg-white p-5 text-center shadow-sm">
                  <div className="mx-auto flex size-12 items-center justify-center rounded-[0.75rem] bg-surface p-2.5">
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
        <section className="mx-auto max-w-[75rem] px-6 py-20 border-t border-line">
          <div className="max-w-xl">
            <div className="font-mono text-xs font-semibold uppercase tracking-wider text-lane">
              Aging Ledger & Approval Desk
            </div>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              What you approve.
            </h2>
            <p className="mt-2 text-sm text-muted">
              Inspect the aging invoice, review the drafted payment email, and tap Approve & Send.
            </p>
          </div>

          <div className="mt-10 rounded-[1.5rem] border border-line bg-white p-6 sm:p-8 shadow-[0_1rem_3.125rem_rgba(20,20,40,0.06)]">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-[0.5rem] bg-emerald-500/10 text-emerald-600">
                  <Receipt size={18} />
                </span>
                <div>
                  <div className="text-sm font-semibold text-ink">
                    Invoice #1084: $12,400.00 · Meridian Health
                  </div>
                  <div className="text-xs text-muted">
                    Due: 3 days ago · Aging Bucket: 1-15 days · Stripe Link Generated
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setApproved(!approved)}
                  className={`inline-flex items-center gap-2 rounded-[0.5rem] px-4 py-2 text-xs font-semibold transition ${
                    approved
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "bg-btn text-white hover:bg-btn-hover"
                  }`}
                >
                  {approved ? (
                    <>
                      <CheckCircle2 size={14} />
                      <span>Approved & Dispatched (Payment Link Live)</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={14} className="text-lane" />
                      <span>Approve & Dispatch Reminder</span>
                    </>
                  )}
                </button>

                {approved && (
                  <button
                    type="button"
                    onClick={() => setApproved(false)}
                    className="flex size-8 items-center justify-center rounded-[0.5rem] border border-line text-muted hover:text-ink"
                    title="Reset simulation"
                  >
                    <RotateCcw size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Stage Selector */}
            <div className="mt-6">
              <div className="flex items-center gap-2 border-b border-line pb-2">
                {REMINDER_STAGES.map((s, idx) => (
                  <button
                    key={s.stage}
                    type="button"
                    onClick={() => setActiveStage(idx)}
                    className={`rounded-[0.5rem] px-3 py-1.5 text-xs font-medium transition ${
                      activeStage === idx
                        ? "bg-btn text-white"
                        : "text-muted hover:text-ink hover:bg-surface"
                    }`}
                  >
                    {s.stage} ({s.label})
                  </button>
                ))}
              </div>

              <div className="mt-5 rounded-[1rem] border border-line/80 bg-surface/40 p-5">
                <div className="flex items-center justify-between text-xs font-mono text-muted border-b border-line/50 pb-2">
                  <span>Tone: {REMINDER_STAGES[activeStage].tone}</span>
                  <span className="text-emerald-700 font-semibold">1-Click Stripe Link Ready</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-ink font-serif italic">
                  &ldquo;{REMINDER_STAGES[activeStage].body}&rdquo;
                </p>
                <div className="mt-5 pt-3 border-t border-line/50 flex flex-wrap items-center justify-between gap-2 text-[0.6875rem] text-muted">
                  <span className="flex items-center gap-1.5">
                    <CreditCard size={13} className="text-emerald-600" />
                    <span>Includes direct Stripe checkout & ACH remittance details</span>
                  </span>
                  <span className="text-lane font-mono">Loop halts within 60s when payment clears</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Invoicing FAQ */}
        <section className="mx-auto max-w-[60rem] px-6 py-20 border-t border-line">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-ink">
              Invoice Follow-Up FAQ
            </h2>
          </div>

          <div className="mt-10 space-y-3">
            {[
              {
                q: "What if a client sends a check or wire outside of Stripe?",
                a: "If you mark the invoice paid in QuickBooks or Xero, or if Plaid detects the corresponding deposit in your bank feed, Lane immediately terminates the loop.",
              },
              {
                q: "Can I pause reminders for a client who requested an extension?",
                a: "Yes. With a single click in your Slack or web desk, you can pause reminders for 7, 14, or 30 days without breaking the rest of your system.",
              },
              {
                q: "Can I customize the wording of each reminder?",
                a: "Absolutely. All templates are completely customizable to your agency's tone and client relationship history.",
              },
            ].map((faq, idx) => (
              <div
                key={faq.q}
                className="rounded-[0.875rem] border border-line bg-white p-5 cursor-pointer"
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
        <section className="mx-auto max-w-[75rem] px-6 py-16">
          <div className="rounded-[1.5rem] border border-line bg-ink p-8 text-center text-white sm:p-14">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Accelerate your agency&apos;s cashflow today.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-white/70">
              Deploy System 03 on a flat $600/mo retainer or as part of the full suite. 30-day money-back guarantee.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
              <Link
                href="/demo"
                className="inline-flex h-11 items-center gap-2 rounded-[0.5rem] bg-white px-5 text-xs font-semibold text-ink hover:bg-white/90"
              >
                <span>Book an Invoicing Walkthrough</span>
                <ArrowRight size={13} />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex h-11 items-center rounded-[0.5rem] border border-white/20 px-5 text-xs font-semibold text-white hover:bg-white/10"
              >
                <span>Compare Pricing Tiers</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
