"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { FadeUp } from "@/components/motion/fade-up";
import { BotLaneLogo } from "@/components/brand/botlane-logo";

export function FinalCta() {
  return (
    <section className="relative mx-auto max-w-[75rem] px-6 py-24 sm:py-32">
      <FadeUp className="relative overflow-hidden rounded-[2rem] border border-line bg-gradient-to-b from-white to-surface p-8 text-center shadow-[0_1.5rem_4.375rem_rgba(20,20,40,0.08)] sm:p-16 md:p-20">
        {/* Subtle lane background decoration */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 opacity-20">
          <div className="size-[31.25rem] rounded-full bg-radial from-lane/30 via-transparent to-transparent blur-3xl" />
        </div>

        <div className="phone-left relative z-10 mx-auto max-w-2xl">
          <div className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-line bg-white px-3 py-1 text-xs text-muted shadow-sm">
            <BotLaneLogo size={16} decorative />
            <span className="font-semibold text-ink">Hire Lane today</span>
            <span>·</span>
            <span className="text-lane-gradient font-mono font-medium">
              <span className="sm:hidden">Reclaim your Fridays</span>
              <span className="hidden sm:inline">Reclaim your agency&apos;s Fridays</span>
            </span>
          </div>

          <h2 className="mt-6 text-[clamp(2.5rem,5.2vw,4.5rem)] font-bold leading-[0.98] tracking-[-0.045em] text-ink">
            Meet your newest hire.
          </h2>

          <p className="mt-5 text-base leading-relaxed text-muted sm:text-xl">
            Lane monitors your incoming client data, prepares flawless deliverables, and waits on your approval.
            Stop drowning in admin work. Start leading your agency.
          </p>

          <div className="cta-pair mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
            <Link
              href="/demo"
              className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-[0.625rem] bg-btn px-6 text-sm font-semibold text-white shadow-lg shadow-black/10 transition-all hover:bg-btn-hover active:scale-[0.99] sm:w-auto"
            >
              <Sparkles size={16} className="text-lane" />
              <span className="sm:hidden">Book a demo</span>
              <span className="hidden sm:inline">Book a 20-Minute Demo</span>
              <ArrowRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/pricing"
              className="inline-flex h-12 w-full items-center justify-center rounded-[0.625rem] border border-line bg-white px-6 text-sm font-semibold text-ink shadow-sm transition hover:border-lane/30 hover:bg-surface sm:w-auto"
            >
              <span className="sm:hidden">See pricing</span>
              <span className="hidden sm:inline">View Flat Retainer Pricing</span>
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 border-t border-line/60 pt-8 text-xs text-muted">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-600" />
              <span>Zero client emails sent without 1-click approval</span>
            </span>
            <span>•</span>
            <span>15-minute standard setup</span>
            <span>•</span>
            <span>30-day money-back guarantee</span>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
