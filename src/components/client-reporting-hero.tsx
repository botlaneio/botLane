"use client";

import { useEffect, useRef, useState } from "react";
import type { ToolId } from "@/content/systems";
import { LaneMark, type LaneState } from "./lane-mark";
import { DemoButton } from "./page/parts";
import { ToolLogo } from "./tool-logo";
import "./client-reporting-hero.css";

// Client Reporting landing hero: centred copy over a level, tilted 3D board that plays
// one report from start to finish on a loop.
//
//   steps 1–4   each source syncs and sends its numbers to Lane
//   steps 5–7   Lane ticks off its checklist
//   steps 8–9   the report waits for your OK
//   step  10    you approve
//   steps 11–15 the report builds and goes out, then it all starts again

const STEP_MS = 650;
const STEPS = 17;
const FINAL = 13; // the frame shown to reduced-motion users

const SOURCES: { tool: ToolId; name: string; meta: string }[] = [
  { tool: "google-ads", name: "Google Ads", meta: "3 campaigns" },
  { tool: "google-analytics", name: "Analytics", meta: "2 properties" },
  { tool: "meta-ads", name: "Meta Ads", meta: "5 new leads" },
  { tool: "hubspot", name: "HubSpot", meta: "6 deals moved" },
];
const CHECKS = ["Pulled 4 sources", "Built the charts", "Wrote the summary"];
const BARS = [38, 52, 46, 64, 58, 76, 92];

// Board geometry (desktop): four 230px columns, 66px gaps, sources stacked on the left.
const COL = [0, 296, 592, 888];
const W = 230;
const CHIP_Y = (i: number) => 70 + i * 84; // chip top
const MID = 245; // where the lines meet the middle cards
const sourcePath = (i: number) => {
  const y = CHIP_Y(i) + 34;
  return `M${W} ${y} C${W + 40} ${y}, ${COL[1] - 40} ${MID}, ${COL[1]} ${MID}`;
};

function useLoop() {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      // no loop: show the finished report
      const raf = requestAnimationFrame(() => setStep(FINAL));
      return () => cancelAnimationFrame(raf);
    }
    let timer: ReturnType<typeof setInterval> | undefined;
    // only play while the hero is on screen
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !timer) timer = setInterval(() => setStep((s) => (s + 1) % STEPS), STEP_MS);
      if (!e.isIntersecting && timer) {
        clearInterval(timer);
        timer = undefined;
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer) clearInterval(timer);
    };
  }, []);
  return { ref, step };
}

// Scale the fixed 1118px board to the width it is given (never above 0.9, so it fits above the fold).
function useFit() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => el.style.setProperty("--crh-s", String(Math.min(0.9, el.clientWidth / 1118)));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return ref;
}

function laneState(step: number): LaneState {
  if (step === 0) return "ready";
  if (step <= 7) return "working";
  if (step <= 9) return "waiting";
  return "done";
}

/* ---------- the cards (shared by the desktop board and the phone stack) ---------- */

function SourceChip({ s, i, step }: { s: (typeof SOURCES)[number]; i: number; step: number }) {
  const on = step >= i + 1 && step < 16;
  return (
    <div className="crh-card flex h-[68px] items-center gap-3 px-3.5" data-on={on}>
      <span className="flex size-9 flex-none items-center justify-center rounded-[10px] border border-line bg-white">
        <ToolLogo tool={s.tool} size={20} />
      </span>
      <div className="min-w-0 flex-auto">
        <div className="text-[14px] font-semibold">{s.name}</div>
        <div className="truncate text-xs text-muted">{s.meta}</div>
      </div>
      <span className="crh-pill" data-on={on}>{on ? "Synced" : "Waiting"}</span>
    </div>
  );
}

function LaneCard({ step }: { step: number }) {
  const ls = laneState(step);
  const label = { ready: "Ready", working: "Working", waiting: "Needs your OK", done: "Done", paused: "Paused", issue: "Issue" }[ls];
  return (
    <div className="crh-card p-4" data-on={step >= 1 && step < 16}>
      <div className="flex items-center justify-between">
        <LaneMark size={42} state={ls} />
        <span className="crh-state" data-state={ls}>{label}</span>
      </div>
      <div className="mt-4 font-mono text-xs text-muted">RUN-1842</div>
      <div className="mt-1 text-[16px] font-semibold tracking-[-0.01em]">Weekly client report</div>
      <div className="mt-4 flex flex-col gap-2.5">
        {CHECKS.map((c, k) => {
          const done = step >= 5 + k && step < 16;
          return (
            <div key={c} className="flex items-center gap-2.5 text-[13px]">
              <span className="crh-box" data-on={done}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
              </span>
              <span className={done ? "text-ink" : "text-muted"}>{c}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ApprovalCard({ step }: { step: number }) {
  const waiting = step >= 8 && step <= 9;
  const approved = step >= 10 && step < 16;
  return (
    <div className="crh-card relative p-4" data-on={step >= 8 && step < 16}>
      <div className="crh-ring" data-on={waiting} aria-hidden="true" />
      <div className="flex items-center gap-3">
        <span className="flex size-10 flex-none items-center justify-center rounded-full border border-[#e6e6ea] bg-[#f0f0f3]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1d1d1f" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <path d="M12 4.9a3.6 3.6 0 1 1 0 7.2a3.6 3.6 0 1 1 0-7.2z M5 20c1-3.6 3.8-5.6 7-5.6s6 2 7 5.6" />
          </svg>
        </span>
        <div>
          <div className="text-[15px] font-semibold">You</div>
          <div className={`text-[13px] font-medium ${approved ? "text-ok" : step >= 8 && step < 16 ? "text-lane-ink" : "text-muted"}`}>
            {approved ? "Approved · sending" : step >= 8 && step < 16 ? "Awaiting your OK" : "Nothing to review"}
          </div>
        </div>
      </div>
      <div className="mt-4 text-[15px] leading-snug font-semibold">Send the weekly report to Acme?</div>
      <div className="mt-3 flex items-center gap-2.5 rounded-xl border border-line px-3 py-2.5">
        <ToolLogo tool="google-drive" size={18} />
        <div>
          <div className="text-[13px] font-semibold">Weekly client report</div>
          <div className="text-xs text-muted">12 pages · PDF</div>
        </div>
      </div>
      <div className="crh-btn mt-3" data-pressed={step === 10} data-done={approved}>
        {approved ? "Approved" : "Approve and send"}
      </div>
    </div>
  );
}

function OutputCard({ step }: { step: number }) {
  const building = step >= 11 && step < 16;
  const sent = step >= 12 && step < 16;
  return (
    <div className="crh-card p-4" data-on={building}>
      <div className={`flex items-center gap-2 text-[13px] font-medium ${sent ? "text-ok" : "text-muted"}`}>
        <span className={`flex size-[18px] items-center justify-center rounded-full ${sent ? "bg-[#e8f5ec]" : "border border-dashed border-[#c7c7cc]"}`}>
          {sent && (
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#1a7f37" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12.5l4.5 4.5L19 7.5" />
            </svg>
          )}
        </span>
        {sent ? "Sent to Acme" : "Waiting for your OK"}
      </div>
      <div className="mt-3 flex items-center gap-2.5 border-t border-line pt-3">
        <span className="flex size-9 flex-none items-center justify-center rounded-[10px] border border-line bg-white">
          <ToolLogo tool="google-drive" size={18} />
        </span>
        <div>
          <div className="text-[14px] font-semibold">Weekly client report</div>
          <div className="text-xs text-muted">Acme Co · Week 41</div>
        </div>
      </div>
      <div className="mt-4 flex h-24 items-end gap-1.5 border-b border-line">
        {BARS.map((h, k) => (
          <div
            key={k}
            className="crh-bar flex-1 rounded-t"
            data-on={building}
            style={{
              height: `${h}%`,
              background: k === 6 ? "#e0312b" : k === 5 ? "#1d1d1f" : "#e4e5ea",
              transitionDelay: building ? `${k * 60}ms` : "0ms",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function ColumnHead({ n, title }: { n: number; title: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex size-7 items-center justify-center rounded-full border-[1.5px] border-[#d2d2d7] bg-white text-[13px] font-semibold">{n}</span>
      <span className="text-[17px] font-semibold tracking-[-0.01em]">{title}</span>
    </div>
  );
}

/* ---------- the hero ---------- */

export function ClientReportingHero() {
  const { ref, step } = useLoop();
  const fitRef = useFit();
  const flowing = (i: number) => step === i + 1;
  const toApproval = step === 8;
  const toOutput = step === 11;

  return (
    <section ref={ref} className="crh relative overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-6 pt-14 text-center md:pt-12">
        <div className="font-mono text-xs uppercase tracking-[0.08em] text-lane">01 · Client reporting</div>
        <h1 className="mx-auto mt-3 max-w-[900px] text-[clamp(40px,5.6vw,72px)] leading-[0.98] font-semibold tracking-[-0.05em] text-balance">
          Every client report, ready for your OK.
        </h1>
        <p className="mx-auto mt-5 max-w-[560px] text-lg leading-[1.5] tracking-[-0.01em] text-muted text-pretty md:text-xl">
          Lane pulls the numbers, builds each client’s report and writes the summary. You approve it, and it goes out on time.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <DemoButton />
          <a href="#how-it-works" className="flex h-12 items-center px-1 text-base font-medium hover:underline">
            See how it works →
          </a>
        </div>
      </div>

      {/* Desktop: the level, tilted board */}
      <div className="crh-stage mx-auto hidden max-w-[1200px] px-6 pt-12 pb-6 md:block" aria-hidden="true">
        <div ref={fitRef} className="crh-fit">
          <div className="crh-board">
            {/* floor shadow */}
            <div className="crh-floor" />

            {[
              "Input",
              "Automation",
              "Approval",
              "Output",
            ].map((t, k) => (
              <div key={t} className="crh-head" style={{ left: COL[k] }}>
                <ColumnHead n={k + 1} title={t} />
              </div>
            ))}

            {/* connectors */}
            <svg className="crh-lines" width="1118" height="460" viewBox="0 0 1118 460">
              {SOURCES.map((_, i) => (
                <path key={i} d={sourcePath(i)} className="crh-line" data-on={step >= i + 1 && step < 16} />
              ))}
              <path d={`M${COL[1] + W} ${MID} H${COL[2]}`} className="crh-line" data-on={step >= 8 && step < 16} />
              <path d={`M${COL[2] + W} ${MID} H${COL[3]}`} className="crh-line" data-on={step >= 11 && step < 16} />
            </svg>
            {SOURCES.map((_, i) => (
              <span key={i} className="crh-dot" data-go={flowing(i)} style={{ offsetPath: `path("${sourcePath(i)}")` }} />
            ))}
            <span className="crh-dot" data-go={toApproval} style={{ offsetPath: `path("M${COL[1] + W} ${MID} H${COL[2]}")` }} />
            <span className="crh-dot crh-dot-red" data-go={toOutput} style={{ offsetPath: `path("M${COL[2] + W} ${MID} H${COL[3]}")` }} />

            {SOURCES.map((s, i) => (
              <div key={s.tool} className="crh-slot" style={{ left: 0, top: CHIP_Y(i), width: W }}>
                <SourceChip s={s} i={i} step={step} />
              </div>
            ))}
            <div className="crh-slot" style={{ left: COL[1], top: 92, width: W }}>
              <LaneCard step={step} />
            </div>
            <div className="crh-slot" style={{ left: COL[2], top: 78, width: W }}>
              <ApprovalCard step={step} />
            </div>
            <div className="crh-slot" style={{ left: COL[3], top: 70, width: W }}>
              <OutputCard step={step} />
            </div>
          </div>
        </div>
      </div>

      {/* Phones: the same story, stacked */}
      <div className="mx-auto flex max-w-[420px] flex-col gap-3 px-5 pt-12 pb-12 md:hidden" aria-hidden="true">
        <div className="grid grid-cols-1 gap-2.5">
          {SOURCES.map((s, i) => (
            <SourceChip key={s.tool} s={s} i={i} step={step} />
          ))}
        </div>
        <span className="crh-arrow" data-on={step >= 5 && step < 16} />
        <LaneCard step={step} />
        <span className="crh-arrow" data-on={step >= 8 && step < 16} />
        <ApprovalCard step={step} />
        <span className="crh-arrow" data-on={step >= 11 && step < 16} />
        <OutputCard step={step} />
      </div>
    </section>
  );
}
