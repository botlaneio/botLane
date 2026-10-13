"use client";

import Link from "next/link";
import { Wordmark } from "./wordmark";
import { ArrowRight, ShieldCheck } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white/50">
      <div className="mx-auto max-w-[1200px] px-6 pt-16 pb-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 text-ink group">
              <Wordmark className="text-lg" />
            </Link>

            <p className="text-xs leading-relaxed text-muted max-w-sm">
              Not a chatbot. An autonomous operations coworker for agencies and service teams.
              Lane synthesizes your data, formats deliverables, and waits on your approval.
            </p>

            <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-600">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>All systems operational · Human-in-the-loop enforced</span>
            </div>
          </div>

          {/* Column: The 3 Systems */}
          <div className="space-y-3 text-xs">
            <div className="font-mono font-semibold uppercase tracking-wider text-ink text-[11px]">
              Workforce Systems
            </div>
            <ul className="space-y-2 text-muted">
              <li>
                <Link href="/systems" className="hover:text-ink transition">
                  Overview & Comparison
                </Link>
              </li>
              <li>
                <Link href="/systems/client-reporting" className="hover:text-ink transition flex items-center justify-between">
                  <span>01 · Client Reporting</span>
                  <span className="font-mono text-[9px] text-lane">FUNNEL</span>
                </Link>
              </li>
              <li>
                <Link href="/systems/lead-follow-up" className="hover:text-ink transition flex items-center justify-between">
                  <span>02 · Lead Follow-Up</span>
                  <span className="font-mono text-[9px] text-lane">LINE</span>
                </Link>
              </li>
              <li>
                <Link href="/systems/invoice-follow-up" className="hover:text-ink transition flex items-center justify-between">
                  <span>03 · Invoice Follow-Up</span>
                  <span className="font-mono text-[9px] text-lane">LOOP</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Solutions & Growth */}
          <div className="space-y-3 text-xs">
            <div className="font-mono font-semibold uppercase tracking-wider text-ink text-[11px]">
              Engage & Deploy
            </div>
            <ul className="space-y-2 text-muted">
              <li>
                <Link href="/pricing" className="hover:text-ink transition">
                  Retainer Pricing
                </Link>
              </li>
              <li>
                <Link href="/demo" className="hover:text-ink transition flex items-center gap-1 text-ink font-medium">
                  <span>Book a Demo</span>
                  <ArrowRight size={11} className="text-lane" />
                </Link>
              </li>
              <li>
                <Link href="/partners" className="hover:text-ink transition">
                  Partner Programme (20%)
                </Link>
              </li>
              <li>
                <Link href="/auth" className="hover:text-ink transition">
                  Sign In / Client Desk
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Governance & Trust */}
          <div className="space-y-3 text-xs">
            <div className="font-mono font-semibold uppercase tracking-wider text-ink text-[11px]">
              Legal & Security
            </div>
            <ul className="space-y-2 text-muted">
              <li>
                <Link href="/legal/privacy" className="hover:text-ink transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="hover:text-ink transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <span className="inline-flex items-center gap-1 text-[11px] text-muted">
                  <ShieldCheck size={12} className="text-emerald-600" />
                  <span>Zero LLM Data Training</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line/60 pt-8 text-[11px] text-muted font-mono">
          <div>
            © {new Date().getFullYear()} BotLane LLC. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/legal/privacy" className="hover:text-ink">Privacy</Link>
            <span>·</span>
            <Link href="/legal/terms" className="hover:text-ink">Terms</Link>
            <span>·</span>
            <Link href="/demo" className="text-lane hover:underline">Schedule Walkthrough</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
