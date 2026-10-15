"use client";

import { useState } from "react";
import Link from "next/link";
import {
  GitCommit,
  ArrowRight,
  Clock,
  Sparkles,
  ChevronDown,
  Zap,
  UserCheck,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LeadStory } from "@/components/lead-follow-up/lead-story";

export default function LeadFollowUpPage() {
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
            <span className="text-ink font-semibold">02 · Lead Follow-Up</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative mx-auto max-w-[75rem] px-6 pt-8 pb-16 text-center sm:pt-12 sm:pb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-lane/20 bg-lane/5 px-3 py-1 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-lane">
            <GitCommit size={13} />
            <span>System 02 · The Line</span>
          </div>

          <h1 className="mt-5 text-[clamp(2.25rem,5vw,4.25rem)] font-bold leading-[1.02] tracking-[-0.04em] text-ink">
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
              className="inline-flex h-11 items-center gap-2 rounded-[0.5rem] bg-btn px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-btn-hover"
            >
              <Sparkles size={15} className="text-lane" />
              <span>Book a Lead Cadence Demo</span>
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

        <LeadStory />

        {/* Closing */}
        <section className="mx-auto max-w-[75rem] px-6 pt-20 pb-20 text-center sm:pt-28">
          <h2 className="text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-ink">
            Every lead, followed up.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            From form fill to booked call, with every reply approved by you. Built, managed, and overseen by Botlane.
          </p>
        </section>

        {/* Lead FAQ */}
        <section className="mx-auto max-w-[60rem] px-6 py-20 border-t border-line">
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
              Turn your inbound leads into booked meetings.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-white/70">
              Deploy System 02 on a flat $600/mo retainer or as part of the full suite. 30-day money-back guarantee.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
              <Link
                href="/demo"
                className="inline-flex h-11 items-center gap-2 rounded-[0.5rem] bg-white px-5 text-xs font-semibold text-ink hover:bg-white/90"
              >
                <span>Book a Lead Cadence Walkthrough</span>
                <ArrowRight size={13} />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex h-11 items-center rounded-[0.5rem] border border-white/20 px-5 text-xs font-semibold text-white hover:bg-white/10"
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
