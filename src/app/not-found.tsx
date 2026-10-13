"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LaneMarkCycle } from "@/components/lane-mark-cycle";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-bg flex flex-col justify-center py-20 px-6">
        <div className="mx-auto max-w-[640px] text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-[14px] border border-line bg-white shadow-sm">
            <LaneMarkCycle size={32} />
          </div>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-lane">
            <span>HTTP 404 · Signal Disconnected</span>
          </div>

          <h1 className="mt-4 text-[clamp(36px,5vw,60px)] font-bold tracking-tight text-ink leading-tight">
            Lost in the lane.
          </h1>

          <p className="mt-3 text-base text-muted max-w-md mx-auto leading-relaxed">
            The page, route, or deliverable you are looking for does not exist or has been relocated to another workspace.
          </p>

          <div className="mt-8 flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-[8px] bg-ink px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-black"
            >
              <ArrowLeft size={13} />
              <span>Return to BotLane Home</span>
            </Link>
          </div>

          {/* Quick Helpful Links */}
          <div className="mt-14 border-t border-line/70 pt-8">
            <div className="font-mono text-xs uppercase tracking-wider text-muted font-semibold mb-4">
              Or jump directly to an active system:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
              <Link
                href="/systems"
                className="group rounded-[14px] border border-line bg-white p-4 transition hover:border-lane/30 hover:shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-lane font-semibold">01 / 02 / 03</span>
                  <ArrowRight size={12} className="text-muted transition-transform group-hover:translate-x-1" />
                </div>
                <div className="mt-2 text-xs font-semibold text-ink">Three Systems</div>
                <div className="text-[11px] text-muted">Compare all engines</div>
              </Link>

              <Link
                href="/pricing"
                className="group rounded-[14px] border border-line bg-white p-4 transition hover:border-lane/30 hover:shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-lane font-semibold">$490+</span>
                  <ArrowRight size={12} className="text-muted transition-transform group-hover:translate-x-1" />
                </div>
                <div className="mt-2 text-xs font-semibold text-ink">Pricing Retainer</div>
                <div className="text-[11px] text-muted">Zero per-seat markup</div>
              </Link>

              <Link
                href="/demo"
                className="group rounded-[14px] border border-line bg-white p-4 transition hover:border-lane/30 hover:shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-lane font-semibold">20 MINS</span>
                  <ArrowRight size={12} className="text-muted transition-transform group-hover:translate-x-1" />
                </div>
                <div className="mt-2 text-xs font-semibold text-ink">Book a Demo</div>
                <div className="text-[11px] text-muted">Live test run</div>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
