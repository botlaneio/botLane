"use client";

import { useState } from "react";
import Link from "next/link";
import {
  RotateCw,
  ArrowRight,
  Sparkles,
  ChevronDown,
  DollarSign,
  ShieldCheck,
  UserCheck,
  Pause,
  PenLine,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SystemControls, SystemPricing, SystemTools } from "@/components/systems/system-extras";
import { InvoiceStory } from "@/components/invoice-follow-up/invoice-story";

export default function InvoiceFollowUpPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

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

          <div className="cta-pair mt-8 flex flex-wrap items-center justify-center gap-4">
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

        <InvoiceStory />

        {/* Closing */}
        <section className="mx-auto max-w-[75rem] px-6 pt-20 pb-20 text-center sm:pt-28">
          <h2 className="text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-ink">
            Every invoice, followed up.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            From open invoice to reconciled payment, with every reminder approved by you. Built, managed, and overseen by Botlane.
          </p>
        </section>

        <SystemControls
          items={[
            { icon: UserCheck, title: "You approve every reminder", text: "Lane drafts each reminder with the payment link attached. Nothing is sent until you approve it." },
            { icon: Pause, title: "Pause for an extension", text: "Pause a client's reminders for 7, 14 or 30 days from Slack or the web desk, without touching the rest." },
            { icon: PenLine, title: "Your wording", text: "Every reminder template can be edited to match your tone and your history with each client." },
          ]}
        />
        <SystemTools system="03" />
        <SystemPricing system="03" />

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
            <div className="cta-pair mt-7 flex flex-wrap items-center justify-center gap-3.5">
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
