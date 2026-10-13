"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "motion/react";
import {
  ArrowRight,
  Bell,
  Check,
  CheckCircle2,
  Clock,
  FileText,
  LayoutGrid,
  Mail,
  Play,
  Receipt,
  ShieldCheck,
} from "lucide-react";
import { LaneMarkCycle } from "./lane-mark-cycle";
import {
  GoogleAdsLogo,
  MetaAdsLogo,
  GoogleAnalyticsLogo,
  HubSpotLogo,
  StripeLogo,
  GmailLogo,
  TypeformLogo,
} from "./assemble/company-icons";

type SystemId = "reporting" | "leads" | "invoices";

interface SystemData {
  id: SystemId;
  index: string;
  tab: string;
  icon: typeof FileText;
  title: string;
  meta: string;
  kpis: { label: string; value: string; delta: string; tone: "ok" | "neutral" }[];
  lines: string[];
  intake: { logo: React.ReactNode; name: string; detail: string }[];
  action: string;
}

const SYSTEMS: SystemData[] = [
  {
    id: "reporting",
    index: "01",
    tab: "Reporting",
    icon: FileText,
    title: "Weekly Executive Synthesis",
    meta: "Generated for Board & Client Leadership",
    kpis: [
      { label: "ROAS", value: "4.21x", delta: "+0.6x", tone: "ok" },
      { label: "Total spend", value: "$5,570", delta: "On budget", tone: "ok" },
      { label: "CAC", value: "$42.10", delta: "-14.2%", tone: "ok" },
    ],
    lines: [
      "Retargeting efficiency scaled sharply after creative refresh.",
      "Search brand defense maintained 91% impression share.",
      "All assets reconciled and ready for sign-off.",
    ],
    intake: [
      { logo: <GoogleAdsLogo size={18} />, name: "Google Ads", detail: "4,821 clicks · $3,450 spend" },
      { logo: <MetaAdsLogo size={18} />, name: "Meta Ads", detail: "142k impressions · $2,120 spend" },
      { logo: <GoogleAnalyticsLogo size={18} />, name: "Google Analytics 4", detail: "+18.4% WoW conversion volume" },
    ],
    action: "Approve & Deliver",
  },
  {
    id: "leads",
    index: "02",
    tab: "Lead Intake",
    icon: Mail,
    title: "Reply to a new inquiry",
    meta: "Drafted from your form and CRM history",
    kpis: [
      { label: "Deal size", value: "$24,000", delta: "Tier 1", tone: "neutral" },
      { label: "Inbound age", value: "4 min", delta: "Reply due", tone: "ok" },
      { label: "Touches", value: "1 of 3", delta: "Day 2 next", tone: "neutral" },
    ],
    lines: [
      "Personal reply written in your tone, citing their request.",
      "Proposes two times that are free on your calendar.",
      "Day 2 and day 5 nudges queued, stop when they reply.",
    ],
    intake: [
      { logo: <TypeformLogo size={18} />, name: "Website form", detail: "New inquiry · 50–200 seats" },
      { logo: <HubSpotLogo size={18} />, name: "HubSpot", detail: "Contact created · no owner yet" },
      { logo: <GmailLogo size={18} />, name: "Gmail", detail: "No previous thread found" },
    ],
    action: "Approve & Send",
  },
  {
    id: "invoices",
    index: "03",
    tab: "AR Recovery",
    icon: Receipt,
    title: "Invoice reminder, second notice",
    meta: "Polite follow-up with a pay link",
    kpis: [
      { label: "Outstanding", value: "$8,950", delta: "14 days late", tone: "neutral" },
      { label: "Terms", value: "Net 30", delta: "Per contract", tone: "neutral" },
      { label: "Reminder", value: "2 of 3", delta: "Firmer tone", tone: "neutral" },
    ],
    lines: [
      "References the invoice, amount and original due date.",
      "Includes a one-click Stripe payment link.",
      "Sequence stops automatically once it's paid.",
    ],
    intake: [
      { logo: <StripeLogo size={18} />, name: "Stripe", detail: "Invoice #1094 · overdue 14 days" },
      { logo: <GmailLogo size={18} />, name: "Gmail", detail: "First reminder sent 7 days ago" },
    ],
    action: "Approve & Send",
  },
];

const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(5px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.85, ease: EASING } },
};

// One-time intro timeline (ms from page load). It plays once on Lane 01, then stops.
const INTRO = {
  syncStart: 500,
  syncStep: 350,
  countStart: 1500,
  countLength: 900,
  typeStart: 2500,
  msPerChar: 16,
  cursorMove: 900,
  clickHold: 100,
  cursorFade: 500,
};

const INTRO_LANE = SYSTEMS[0];
const TOTAL_CHARS = INTRO_LANE.lines.reduce((sum, line) => sum + line.length, 0);
const CURSOR_START = INTRO.typeStart + TOTAL_CHARS * INTRO.msPerChar + 250;
const CLICK_AT = CURSOR_START + INTRO.cursorMove;
const INTRO_END = CLICK_AT + INTRO.clickHold + INTRO.cursorFade;

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const easeOut = (p: number) => 1 - Math.pow(1 - p, 3);

/** Counts "$5,570" or "4.21x" up from zero, keeping its prefix, suffix and decimals. */
function countUp(value: string, progress: number) {
  const match = value.match(/^([^\d-]*)(-?[\d,]*\.?\d+)(.*)$/);
  if (!match || progress >= 1) return value;
  const [, prefix, num, suffix] = match;
  const target = parseFloat(num.replace(/,/g, ""));
  const decimals = num.includes(".") ? num.split(".")[1].length : 0;
  const current = (target * easeOut(progress)).toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${prefix}${num.includes(",") ? current : current.replace(/,/g, "")}${suffix}`;
}

/** Splits a running character budget across the bullet lines, in order. */
function typedLines(lines: string[], chars: number) {
  let left = chars;
  return lines.map((line) => {
    const shown = line.slice(0, Math.max(0, left));
    left -= line.length;
    return shown;
  });
}

export function Hero() {
  const [activeId, setActiveId] = useState<SystemId>("reporting");
  const [manualApproved, setManualApproved] = useState(false);
  // Milliseconds into the intro; INTRO_END means it has finished (or was skipped)
  const [t, setT] = useState(0);

  const active = SYSTEMS.find((s) => s.id === activeId) ?? SYSTEMS[0];

  // Play the intro once per page load. Reduced-motion visitors see the final frame.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => setT(INTRO_END));
      return () => cancelAnimationFrame(id);
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = Math.min(INTRO_END, now - start);
      setT(elapsed);
      if (elapsed < INTRO_END) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const introRunning = t < INTRO_END;
  const inIntro = activeId === INTRO_LANE.id;
  // Outside the intro lane, everything shows in its finished state
  const at = inIntro ? t : INTRO_END;

  const syncedCount = Math.floor((at - INTRO.syncStart) / INTRO.syncStep) + 1;
  const countProgress = clamp01((at - INTRO.countStart) / INTRO.countLength);
  const lines = inIntro
    ? typedLines(active.lines, Math.floor((at - INTRO.typeStart) / INTRO.msPerChar))
    : active.lines;
  const typingLine = inIntro && introRunning ? lines.findIndex((l, i) => l.length < active.lines[i].length) : -1;
  const cursorVisible = inIntro && t >= CURSOR_START && t < INTRO_END;
  const cursorPressed = t >= CLICK_AT;
  const approved = manualApproved || (inIntro && t >= CLICK_AT + INTRO.clickHold);

  const pick = (id: SystemId) => {
    setActiveId(id);
    setManualApproved(false);
    setT(INTRO_END);
  };

  const approve = useCallback(() => {
    setManualApproved(true);
    setT(INTRO_END);
  }, []);

  return (
    <section className="relative mx-auto grid max-w-[1200px] items-center gap-14 px-6 pt-14 pb-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10 lg:pt-20 lg:pb-24">
      {/* Left: copy */}
      <motion.div variants={stagger} initial="hidden" animate="visible">
        <motion.div
          variants={rise}
          className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-ink shadow-2xs"
        >
          <LaneMarkCycle size={15} />
          <span>Agent Lane · Three operational lanes</span>
        </motion.div>

        <motion.h1
          variants={rise}
          className="mt-6 text-[clamp(48px,6.4vw,84px)] font-semibold leading-[0.95] tracking-[-0.055em] text-ink"
        >
          Meet your
          <br />
          newest hire.
        </motion.h1>

        <motion.p
          variants={rise}
          className="mt-6 max-w-[480px] text-lg leading-[1.5] tracking-[-0.015em] text-muted sm:text-xl"
        >
          Agent Lane takes recurring operational traffic off your plate—drafting client reports,
          nudging leads, and collecting receivables. Three dedicated lanes;{" "}
          <span className="text-ink">you just approve.</span>
        </motion.p>

        <motion.div variants={rise} className="mt-8 flex flex-wrap items-center gap-3.5">
          <Link
            href="/demo"
            className="group inline-flex h-[52px] min-w-[200px] items-center justify-center gap-2.5 rounded-xl bg-ink px-7 text-base font-medium text-white shadow-[0_8px_20px_-8px_rgba(0,0,0,0.45)] transition hover:bg-black active:scale-[0.98]"
          >
            <span>Book a demo</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/how-it-works"
            className="inline-flex h-[52px] items-center justify-center gap-2.5 rounded-xl border border-line bg-white px-6 text-base font-medium text-ink shadow-2xs transition hover:bg-surface active:scale-[0.98]"
          >
            <Play className="h-3.5 w-3.5 fill-ink" />
            <span>See how it works</span>
          </Link>
        </motion.div>

        <motion.div
          variants={rise}
          className="mt-9 grid max-w-[520px] grid-cols-3 gap-4 text-[13px] leading-snug text-muted sm:text-sm"
        >
          <div className="flex items-start gap-2.5">
            <span className="mt-1.5 size-2 shrink-0 rounded-full bg-lane" />
            <span>Zero manual spreadsheets</span>
          </div>
          <div className="flex items-start gap-2.5">
            <ShieldCheck className="mt-0.5 size-[18px] shrink-0 text-ok" />
            <span>100% human approval gated</span>
          </div>
          <div className="flex items-start gap-2.5">
            <Clock className="mt-0.5 size-[18px] shrink-0 text-muted" />
            <span>Average SLA &lt; 1 second</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Right: stacked workspace preview */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.95, delay: 0.25, ease: EASING }}
        className="relative lg:[perspective:1800px]"
      >
        <div className="relative lg:[transform:rotateY(-7deg)_rotateX(3deg)] lg:[transform-style:preserve-3d]">
          {/* Ghost windows behind */}
          <div
            aria-hidden
            className="absolute inset-0 -translate-x-6 translate-y-5 rounded-[22px] border border-line/70 bg-white/60 shadow-[0_20px_50px_-20px_rgba(20,20,40,0.12)]"
          />
          <div
            aria-hidden
            className="absolute inset-0 -translate-x-3 translate-y-2.5 rounded-[22px] border border-line/80 bg-white/80"
          />

          {/* Main window */}
          <div className="relative overflow-hidden rounded-[22px] border border-line bg-white shadow-[0_40px_80px_-30px_rgba(20,20,40,0.22)]">
            {/* Chrome */}
            <div className="flex items-center justify-between border-b border-line bg-surface/60 px-5 py-3.5">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-neutral-300" />
                  <span className="size-2.5 rounded-full bg-neutral-300" />
                  <span className="size-2.5 rounded-full bg-neutral-300" />
                </div>
                <span className="text-[13px] text-muted">workspace.lane.ai</span>
              </div>
              <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted">
                <span className="size-2 rounded-full bg-emerald-500" />
                <span>Auto-preview</span>
              </span>
            </div>

            <div className="flex">
              {/* Icon rail */}
              <div className="hidden flex-col items-center gap-3 border-r border-line px-3 py-5 sm:flex">
                <span className="flex size-9 items-center justify-center rounded-[10px] text-faint">
                  <Bell className="size-4" />
                </span>
                {SYSTEMS.map((sys) => {
                  const Icon = sys.icon;
                  const isActive = sys.id === activeId;
                  return (
                    <button
                      key={sys.id}
                      type="button"
                      onClick={() => pick(sys.id)}
                      aria-label={sys.tab}
                      className={`flex size-9 items-center justify-center rounded-[10px] border transition ${
                        isActive
                          ? "border-lane bg-lane text-white shadow-[0_6px_14px_-6px_rgba(224,49,43,0.7)]"
                          : "border-line bg-white text-muted hover:text-ink"
                      }`}
                    >
                      <Icon className="size-4" />
                    </button>
                  );
                })}
                <span className="flex size-9 items-center justify-center rounded-[10px] border border-line bg-white text-faint">
                  <LayoutGrid className="size-4" />
                </span>
              </div>

              <div className="min-w-0 flex-1 p-4 sm:p-5">
                {/* Lane tabs */}
                <div className="flex flex-wrap gap-2">
                  {SYSTEMS.map((sys) => {
                    const Icon = sys.icon;
                    const isActive = sys.id === activeId;
                    return (
                      <button
                        key={sys.id}
                        type="button"
                        onClick={() => pick(sys.id)}
                        className={`inline-flex items-center gap-2 rounded-[10px] border px-3 py-1.5 text-xs font-medium transition ${
                          isActive
                            ? "border-lane bg-lane text-white shadow-[0_6px_14px_-6px_rgba(224,49,43,0.7)]"
                            : "border-line bg-white text-muted hover:text-ink"
                        }`}
                      >
                        <Icon className="size-3.5" />
                        <span>
                          Lane {sys.index}
                          <span className="hidden sm:inline"> · {sys.tab}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-[minmax(0,1fr)_200px]">
                  {/* Draft card */}
                  <div className="rounded-[16px] border border-line bg-white p-4 shadow-2xs">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={active.id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.22 }}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <span className="mt-0.5 shrink-0 rounded-md bg-surface px-2 py-1 font-mono text-[10px] text-ink">
                              System {active.index}
                            </span>
                            <div>
                              <div className="text-sm font-semibold text-ink">{active.title}</div>
                              <div className="text-[11px] text-muted">{active.meta}</div>
                            </div>
                          </div>
                          <span className="flex shrink-0 items-center gap-1.5 font-mono text-[10px] text-ok">
                            <span className="size-1.5 rounded-full bg-ok" />
                            {approved ? "SENT" : "LIVE"}
                          </span>
                        </div>

                        <div className="mt-4 grid grid-cols-3 gap-2">
                          {active.kpis.map((kpi) => (
                            <div
                              key={kpi.label}
                              className="rounded-[12px] border border-line bg-white px-2 py-3 text-center"
                            >
                              <div className="text-base font-semibold tracking-tight text-ink tabular-nums sm:text-lg">
                                {countUp(kpi.value, countProgress)}
                              </div>
                              <div className="text-[10px] text-muted sm:text-[11px]">{kpi.label}</div>
                              <div
                                className={`mt-1 text-[10px] font-medium transition-opacity duration-300 sm:text-[11px] ${
                                  kpi.tone === "ok" ? "text-ok" : "text-ink-2"
                                } ${countProgress < 1 ? "opacity-0" : "opacity-100"}`}
                              >
                                {kpi.delta}
                              </div>
                            </div>
                          ))}
                        </div>

                        <ul className="mt-4 space-y-1.5 text-xs leading-relaxed text-ink-2">
                          {active.lines.map((line, i) => (
                            <li key={line} className="relative flex items-start gap-2">
                              <span
                                className={`mt-[7px] size-1 shrink-0 rounded-full bg-lane transition-opacity ${
                                  lines[i].length ? "opacity-100" : "opacity-0"
                                }`}
                              />
                              {/* Full line keeps the height steady while the typed copy sits on top */}
                              <span className="invisible">{line}</span>
                              <span className="absolute left-3 top-0">
                                {lines[i]}
                                {typingLine === i && (
                                  <span className="ml-px inline-block h-3 w-px translate-y-0.5 bg-ink" />
                                )}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Intake + approve */}
                  <div className="flex flex-col gap-3">
                    <div className="flex-1 rounded-[16px] border border-line bg-surface/50 p-3">
                      <div className="flex items-center justify-between px-1">
                        <span className="text-xs font-semibold text-ink">Data intake</span>
                        <span
                          className={`size-1.5 rounded-full transition-colors ${
                            syncedCount >= active.intake.length ? "bg-ok" : "bg-amber-400"
                          }`}
                        />
                      </div>
                      <div className="mt-2.5 space-y-2">
                        {active.intake.map((feed, i) => {
                          const synced = i < syncedCount;
                          return (
                            <div
                              key={feed.name}
                              className={`flex items-center gap-2.5 rounded-[10px] border border-line bg-white p-2 transition-all duration-300 ${
                                synced ? "opacity-100" : "translate-y-1 opacity-40"
                              }`}
                            >
                              <span className="flex size-7 shrink-0 items-center justify-center">{feed.logo}</span>
                              <div className="min-w-0 flex-1">
                                <div className="truncate text-[11px] font-medium text-ink">{feed.name}</div>
                                <div className="truncate text-[10px] text-muted">{feed.detail}</div>
                              </div>
                              <Check
                                className={`size-3 shrink-0 text-ok transition-all duration-300 ${
                                  synced ? "scale-100 opacity-100" : "scale-50 opacity-0"
                                }`}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="relative">
                      {approved ? (
                        <div className="flex h-11 items-center justify-center gap-2 rounded-[12px] border border-emerald-200 bg-emerald-50 text-xs font-medium text-emerald-800">
                          <CheckCircle2 className="size-4 text-emerald-600" />
                          <span>Approved & sent</span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={approve}
                          className={`group flex h-11 w-full items-center justify-center gap-2 rounded-[12px] bg-ink text-xs font-medium text-white shadow-sm transition hover:bg-black active:scale-[0.98] ${
                            cursorPressed && inIntro && introRunning ? "scale-[0.97] bg-black" : ""
                          }`}
                        >
                          <Check className="size-3.5" />
                          <span>{active.action}</span>
                          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                        </button>
                      )}

                      {/* Pointer that clicks Approve once, at the end of the intro */}
                      {cursorVisible && (
                        <motion.svg
                          aria-hidden
                          width="18"
                          height="22"
                          viewBox="0 0 18 22"
                          className="pointer-events-none absolute left-1/2 top-1/2 drop-shadow-[0_2px_3px_rgba(0,0,0,0.25)]"
                          initial={{ x: 90, y: 80, opacity: 0 }}
                          animate={{
                            x: 4,
                            y: 2,
                            opacity: t >= CLICK_AT + INTRO.clickHold ? 0 : 1,
                            scale: cursorPressed ? 0.85 : 1,
                          }}
                          transition={{
                            x: { duration: INTRO.cursorMove / 1000, ease: EASING },
                            y: { duration: INTRO.cursorMove / 1000, ease: EASING },
                            opacity: { duration: 0.3 },
                            scale: { duration: 0.1 },
                          }}
                        >
                          <path
                            d="M1 1l15 9.5-6.6 1.4 3.9 7.6-2.8 1.4-3.9-7.6L1 18z"
                            fill="#1d1d1f"
                            stroke="#fff"
                            strokeWidth="1.4"
                            strokeLinejoin="round"
                          />
                        </motion.svg>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
