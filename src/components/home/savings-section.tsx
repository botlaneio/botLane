"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, DollarSign, TrendingUp, CheckCircle2 } from "lucide-react";
import { FadeUp } from "@/components/motion/fade-up";

export function SavingsSection() {
  const [clientCount, setClientCount] = useState<number>(15);
  const [hourlyRate, setHourlyRate] = useState<number>(175);

  // Dynamic calculations:
  // Reporting: ~3.5 hours per client per month spent pulling metrics & drafting summaries
  const reportingHours = Math.round(clientCount * 3.5);
  // Lead & Invoice triage: ~12 hours base + 0.5 hr per client per month
  const opsHours = Math.round(10 + clientCount * 0.6);
  const totalHoursSaved = reportingHours + opsHours;
  const billableValueSaved = totalHoursSaved * hourlyRate;

  // AR cashflow acceleration estimate (avg agency retainer $4,500/client)
  const monthlyRetainerRevenue = clientCount * 4500;
  const expeditedCashflow = Math.round(monthlyRetainerRevenue * 0.18);

  return (
    <section className="relative mx-auto max-w-[75rem] px-6 py-24 sm:py-32">
      <FadeUp className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-lane/20 bg-lane/5 px-3 py-1 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-lane">
          <span className="size-1.5 rounded-full bg-lane-gradient" />
          <span className="text-lane-gradient">Agency Return on Investment</span>
        </div>
        <h2 className="mt-4 text-[clamp(2rem,4.2vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-ink">
          What Lane saves you. <br />
          In unbilled hours and uncollected revenue.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          Junior account managers spend 40% of their week formatting CSVs and copying email drafts.
          See the direct business impact when Lane handles preparation.
        </p>
      </FadeUp>

      <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:items-center">
        {/* Left: Interactive Controls */}
        <FadeUp className="rounded-[1.5rem] border border-line bg-white p-7 shadow-[0_0.5rem_1.875rem_rgba(20,20,40,0.04)] lg:col-span-5">
          <div className="flex items-center justify-between border-b border-line pb-4">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted">
              Configure Your Agency
            </span>
            <span className="rounded-full bg-surface px-2.5 py-0.5 font-mono text-[0.6875rem] text-ink">
              Live Simulator
            </span>
          </div>

          <div className="mt-6 space-y-7">
            {/* Slider 1: Active Clients */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="client-slider" className="text-sm font-medium text-ink">
                  Active Retainer Clients
                </label>
                <span className="font-mono text-base font-semibold text-lane-gradient">
                  {clientCount} clients
                </span>
              </div>
              <input
                id="client-slider"
                type="range"
                min={4}
                max={45}
                step={1}
                value={clientCount}
                onChange={(e) => setClientCount(Number(e.target.value))}
                className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-surface accent-lane"
              />
              <div className="mt-1 flex justify-between font-mono text-[0.625rem] text-muted">
                <span>4 boutique</span>
                <span>20 mid-market</span>
                <span>45 enterprise</span>
              </div>
            </div>

            {/* Slider 2: Hourly Value */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="rate-slider" className="text-sm font-medium text-ink">
                  Internal Billable / Value Rate
                </label>
                <span className="font-mono text-base font-semibold text-ink">
                  ${hourlyRate}/hr
                </span>
              </div>
              <input
                id="rate-slider"
                type="range"
                min={90}
                max={300}
                step={10}
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-surface accent-lane"
              />
              <div className="mt-1 flex justify-between font-mono text-[0.625rem] text-muted">
                <span>$90/hr</span>
                <span>$175/hr (Industry Avg)</span>
                <span>$300/hr</span>
              </div>
            </div>
          </div>

          {/* Breakdown checklist */}
          <div className="mt-8 border-t border-line pt-6 space-y-3 text-xs text-ink-2">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Clock size={13} className="text-lane" />
                <span>Client reporting draft time:</span>
              </span>
              <span className="font-mono font-medium text-ink">
                ~{reportingHours} hrs / mo
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Clock size={13} className="text-lane" />
                <span>Inbound lead triage & follow-up:</span>
              </span>
              <span className="font-mono font-medium text-ink">
                ~{opsHours} hrs / mo
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <DollarSign size={13} className="text-ok" />
                <span>Overdue AR accelerated into bank:</span>
              </span>
              <span className="font-mono font-medium text-emerald-600">
                +${expeditedCashflow.toLocaleString()} / mo
              </span>
            </div>
          </div>
        </FadeUp>

        {/* Right: Big Impact Dossier */}
        <FadeUp delay={0.12} className="rounded-[1.5rem] border border-lane/20 bg-gradient-to-br from-white via-surface to-lane/[0.03] p-8 shadow-[0_1.25rem_3.125rem_rgba(20,20,40,0.06)] lg:col-span-7">
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Metric 1 */}
            <div className="rounded-[1.125rem] border border-line bg-white/90 p-6 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-lane/25 hover:shadow-[0_0.75rem_1.75rem_rgba(20,20,40,0.07)]">
              <div className="flex items-center gap-2 text-xs font-mono text-muted uppercase">
                <Clock size={14} className="text-lane" />
                <span>Labor Reclaimed</span>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-[clamp(2.25rem,3.8vw,3.25rem)] font-bold tracking-tight text-ink">
                  {totalHoursSaved}
                </span>
                <span className="font-mono text-sm text-muted">hrs / month</span>
              </div>
              <div className="mt-2 text-xs text-muted">
                Equal to <strong>{(totalHoursSaved / 4).toFixed(1)} hours every single week</strong> previously spent on copy-pasting numbers.
              </div>
            </div>

            {/* Metric 2 */}
            <div className="rounded-[1.125rem] border border-line bg-white/90 p-6 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-lane/25 hover:shadow-[0_0.75rem_1.75rem_rgba(20,20,40,0.07)]">
              <div className="flex items-center gap-2 text-xs font-mono text-muted uppercase">
                <TrendingUp size={14} className="text-emerald-600" />
                <span>Monthly Billable Value</span>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-[clamp(2.25rem,3.8vw,3.25rem)] font-bold tracking-tight text-emerald-600">
                  ${billableValueSaved.toLocaleString()}
                </span>
                <span className="font-mono text-sm text-muted">/ month</span>
              </div>
              <div className="mt-2 text-xs text-muted">
                Calculated at ${hourlyRate}/hr of strategic client strategy and creative execution.
              </div>
            </div>
          </div>

          {/* Hiring vs Lane Comparison */}
          <div className="mt-6 rounded-[1.125rem] border border-line bg-white p-5">
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-muted">
              Alternative Benchmark
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[0.75rem] bg-surface/80 p-3.5 border border-line/60">
                <div className="text-xs font-medium text-muted">Hiring an Ops Coordinator</div>
                <div className="mt-1 font-mono text-lg font-bold text-ink">$85,000 / yr</div>
                <div className="text-[0.6875rem] text-muted mt-1">+ 2 months training, benefits, turnover risk</div>
              </div>
              <div className="rounded-[0.75rem] bg-lane/5 p-3.5 border border-lane/20">
                <div className="text-xs font-medium text-lane"><span className="text-lane-gradient">BotLane Full Suite</span></div>
                <div className="mt-1 font-mono text-lg font-bold text-lane"><span className="text-lane-gradient">$1,500 / mo</span></div>
                <div className="text-[0.6875rem] text-muted mt-1">Live in 15 mins, zero payroll tax, 100% precision</div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-muted">
              <CheckCircle2 size={14} className="text-emerald-600" />
              <span>30-day no-risk trial on all retainers</span>
            </div>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-[0.5rem] bg-btn px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-btn-hover"
            >
              <span>Explore Retainer Details</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
