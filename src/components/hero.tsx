"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "motion/react";
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Check,
  Clock,
  ExternalLink,
  FileText,
  Mail,
  Receipt,
} from "lucide-react";
import { LaneMark } from "./lane-mark";
import { LaneMarkCycle } from "./lane-mark-cycle";
import { DemoModal } from "./demo-modal";
import {
  GoogleAdsLogo,
  MetaAdsLogo,
  GoogleAnalyticsLogo,
  HubSpotLogo,
  StripeLogo,
  GmailLogo,
  GoogleDriveLogo,
  TypeformLogo,
} from "./assemble/company-icons";

interface HeroProps {
  onOpenDemo?: () => void;
}

type SystemId = "reporting" | "nudge" | "invoice";

interface SystemData {
  id: SystemId;
  index: string;
  name: string;
  headline: string;
  cadence: string;
  icon: typeof FileText;
  intakeFeeds: {
    logo: React.ReactNode;
    name: string;
    detail: string;
    status: string;
  }[];
  draft: {
    badge: string;
    badgeColor: string;
    title: string;
    meta: string;
    previewType: "report" | "email" | "invoice";
    kpis?: { label: string; value: string; delta: string }[];
    bodyLines: string[];
    actionLabel: string;
    targetRecipient: string;
  };
  outputDestinations: {
    logo: React.ReactNode;
    title: string;
    destination: string;
    format: string;
  }[];
  auditMetrics: {
    label: string;
    val: string;
  }[];
}

const SYSTEMS_DATA: SystemData[] = [
  {
    id: "reporting",
    index: "01",
    name: "Lane 01 · Reporting",
    headline: "Weekly Executive Synthesis",
    cadence: "Every Monday · 08:30 AM",
    icon: FileText,
    intakeFeeds: [
      {
        logo: <GoogleAdsLogo size={18} />,
        name: "Google Ads",
        detail: "4,821 clicks · $3,450 spend",
        status: "Normalized",
      },
      {
        logo: <MetaAdsLogo size={18} />,
        name: "Meta Ads",
        detail: "142k impressions · $2,120 spend",
        status: "Normalized",
      },
      {
        logo: <GoogleAnalyticsLogo size={18} />,
        name: "Google Analytics 4",
        detail: "+18.4% WoW conversion volume",
        status: "Normalized",
      },
    ],
    draft: {
      badge: "Performance Digest",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200/60",
      title: "Acme Corp — Q4 Growth Synthesis",
      meta: "Generated for Board & Client Leadership",
      previewType: "report",
      kpis: [
        { label: "Blended ROAS", value: "4.21x", delta: "+0.6x" },
        { label: "Total Spend", value: "$5,570", delta: "On Budget" },
        { label: "Blended CAC", value: "$42.10", delta: "-14.2%" },
      ],
      bodyLines: [
        "Retargeting efficiency scaled sharply following creative fatigue refresh; CPA dropped from $49 to $42.10.",
        "Search brand defense maintained 91% impression share with zero budget spillover.",
        "All cross-channel assets reconciled into client executive deck ready for sign-off.",
      ],
      actionLabel: "Approve & Deliver to Client",
      targetRecipient: "sarah.chen@acmecorp.com + Google Drive",
    },
    outputDestinations: [
      {
        logo: <GoogleDriveLogo size={18} />,
        title: "Executive Deck",
        destination: "Acme Shared Drive / Weekly Reports",
        format: "Formatted PDF",
      },
      {
        logo: <GmailLogo size={18} />,
        title: "Client Stakeholders",
        destination: "sarah.chen@acmecorp.com",
        format: "Authenticated Dispatch",
      },
    ],
    auditMetrics: [
      { label: "Manual time saved", val: "3.5 hours" },
      { label: "Human review gate", val: "100% required" },
      { label: "Dispatch latency", val: "0.8 seconds" },
    ],
  },
  {
    id: "nudge",
    index: "02",
    name: "Lane 02 · Lead Intake",
    headline: "High-Intent Contextual Outreach",
    cadence: "Continuous SLA · 2h triggers",
    icon: Mail,
    intakeFeeds: [
      {
        logo: <HubSpotLogo size={18} />,
        name: "HubSpot CRM",
        detail: "Enterprise tier inbound · 48h idle",
        status: "Prioritized",
      },
      {
        logo: <TypeformLogo size={18} />,
        name: "Demo Form Submission",
        detail: "50-200 seats requested · $24k ARR",
        status: "Parsed",
      },
    ],
    draft: {
      badge: "Contextual Email Draft",
      badgeColor: "bg-purple-50 text-purple-700 border-purple-200/60",
      title: "Re: Multi-seat sync & API sandbox for Apex",
      meta: "From: your-name@agency.com → To: elena@apexgroup.io",
      previewType: "email",
      kpis: [
        { label: "Deal Potential", value: "$24,000", delta: "Tier 1" },
        { label: "Inbound Age", value: "48 hours", delta: "Follow-up due" },
        { label: "Personalization", value: "100%", delta: "Zero fluff" },
      ],
      bodyLines: [
        "Hi Elena, noticed your team was reviewing our multi-seat pipeline architecture.",
        "Given Apex's current volume on HubSpot, I’ve pre-provisioned a sandbox matching your field mappings.",
        "Would 20 minutes this Thursday at 11:00 AM work for a quick walk-through?",
      ],
      actionLabel: "Approve & Send via Gmail",
      targetRecipient: "elena@apexgroup.io (Direct Inbox)",
    },
    outputDestinations: [
      {
        logo: <GmailLogo size={18} />,
        title: "Personalized Email",
        destination: "elena@apexgroup.io",
        format: "Sent from your inbox",
      },
      {
        logo: <HubSpotLogo size={18} />,
        title: "Deal Stage Updated",
        destination: "Apex Group → 'Executive Demo Queued'",
        format: "CRM Synced",
      },
    ],
    auditMetrics: [
      { label: "Reply velocity", val: "4.2x higher" },
      { label: "Tone calibration", val: "Trained on your sent items" },
      { label: "Calendar alignment", val: "Instant sync" },
    ],
  },
  {
    id: "invoice",
    index: "03",
    name: "Lane 03 · AR Recovery",
    headline: "Diplomatic AR Reconciliation",
    cadence: "Bi-weekly trigger · 14d overdue",
    icon: Receipt,
    intakeFeeds: [
      {
        logo: <StripeLogo size={18} />,
        name: "Stripe Billing",
        detail: "Invoice #1094 · $8,950 overdue 14d",
        status: "Flagged",
      },
      {
        logo: <GmailLogo size={18} />,
        name: "Email History",
        detail: "Initial statement sent 14 days ago",
        status: "Verified",
      },
    ],
    draft: {
      badge: "Diplomatic Statement",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200/60",
      title: "Statement Update: Invoice #1094 ($8,950.00)",
      meta: "To: accounting@meridianlabs.io · Meridian Labs Q3 Sprint",
      previewType: "invoice",
      kpis: [
        { label: "Outstanding", value: "$8,950.00", delta: "14 days past" },
        { label: "Contract Terms", value: "Net 30", delta: "Approved" },
        { label: "Payment Method", value: "ACH / Card", delta: "0 fees" },
      ],
      bodyLines: [
        "Hi David, hope the week is going smoothly.",
        "Following up on invoice #1094 for the Q3 sprint deliverables ($8,950.00) due October 1st.",
        "You can securely settle via ACH or corporate card using the direct Stripe link below.",
      ],
      actionLabel: "Approve & Deliver Reminder",
      targetRecipient: "accounting@meridianlabs.io + Stripe Portal",
    },
    outputDestinations: [
      {
        logo: <StripeLogo size={18} />,
        title: "Stripe Payment Portal",
        destination: "Direct checkout session generated",
        format: "1-Click Pay Link",
      },
      {
        logo: <GmailLogo size={18} />,
        title: "Executive Accounting Note",
        destination: "accounting@meridianlabs.io",
        format: "Diplomatic Copy",
      },
    ],
    auditMetrics: [
      { label: "Average recovery time", val: "38 hours" },
      { label: "Relationship impact", val: "Polite & diplomatic" },
      { label: "Collection rate", val: "94.2%" },
    ],
  },
];

export function Hero({ onOpenDemo }: HeroProps) {
  const [demoOpen, setDemoOpen] = useState(false);
  const [activeSystemId, setActiveSystemId] = useState<SystemId>("reporting");
  const [isAutoCycling, setIsAutoCycling] = useState<boolean>(true);
  const [approvedState, setApprovedState] = useState<Record<SystemId, boolean>>({
    reporting: false,
    nudge: false,
    invoice: false,
  });
  const [lastDispatchedTime, setLastDispatchedTime] = useState<string | null>(null);

  const activeSystem = SYSTEMS_DATA.find((s) => s.id === activeSystemId) || SYSTEMS_DATA[0];

  const handleBookDemo = () => {
    if (onOpenDemo) {
      onOpenDemo();
    } else {
      setDemoOpen(true);
    }
  };

  // Auto-advance through the 3 systems every 7 seconds if user hasn't paused
  useEffect(() => {
    if (!isAutoCycling) return;
    const interval = setInterval(() => {
      setActiveSystemId((prev) => {
        if (prev === "reporting") return "nudge";
        if (prev === "nudge") return "invoice";
        return "reporting";
      });
    }, 7000);
    return () => clearInterval(interval);
  }, [isAutoCycling]);

  const handleTriggerApprove = useCallback(() => {
    setApprovedState((prev) => ({
      ...prev,
      [activeSystemId]: true,
    }));
    setLastDispatchedTime(
      new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );

    // Reset after 4 seconds to allow testing again
    setTimeout(() => {
      setApprovedState((prev) => ({
        ...prev,
        [activeSystemId]: false,
      }));
    }, 4500);
  }, [activeSystemId]);

  const isCurrentApproved = approvedState[activeSystemId];

  // Motion variants for subtle, sophisticated Apple-quiet entrance
  const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

  const entranceContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.08,
      },
    },
  };

  const headlineVariants: Variants = {
    hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.9,
        ease: EASING,
      },
    },
  };

  const subtextVariants: Variants = {
    hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.9,
        ease: EASING,
      },
    },
  };

  const actionsVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        ease: EASING,
      },
    },
  };

  const guaranteesVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: EASING,
      },
    },
  };

  const workspaceVariants: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.95,
        delay: 0.2,
        ease: EASING,
      },
    },
  };

  return (
    <>
      <section className="relative mx-auto flex max-w-[1280px] flex-col items-center px-4 pt-12 pb-16 sm:px-6 lg:px-8">
        {/* Single Centered Agent Lane Introduction Badge */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 flex justify-center"
        >
          <div className="flex items-center gap-2.5 rounded-full border border-line bg-white px-3.5 py-1 text-ink shadow-2xs font-mono text-[11px] uppercase tracking-[0.14em]">
            <LaneMarkCycle size={15} />
            <span className="font-medium tracking-wider text-[11px]">
              Agent Lane · Three operational lanes. Zero congestion.
            </span>
          </div>
        </motion.div>

        {/* Hero Headline & Value Proposition with Subtle Scroll-Triggered Entrance */}
        <motion.div
          variants={entranceContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
          className="relative text-center"
        >
          <motion.h1
            variants={headlineVariants}
            className="max-w-[880px] text-[clamp(44px,6.8vw,92px)] leading-[0.96] font-semibold tracking-[-0.05em] text-ink text-balance mx-auto"
          >
            Meet your newest hire.
          </motion.h1>

          <motion.p
            variants={subtextVariants}
            className="mt-5 max-w-[640px] mx-auto text-lg sm:text-xl leading-[1.48] tracking-[-0.015em] text-muted text-balance font-normal"
          >
            Agent Lane takes recurring operational traffic off your plate—drafting client reports,
            nudging leads, and collecting receivables.{" "}
            <span className="font-medium text-ink">Three dedicated lanes; you just approve.</span>
          </motion.p>

          {/* Primary Action Row */}
          <motion.div
            variants={actionsVariants}
            className="mt-7 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4"
          >
            <button
              type="button"
              onClick={handleBookDemo}
              className="group flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-lane-strong px-7 text-base font-medium text-white shadow-sm transition-all hover:bg-lane-ink hover:shadow active:scale-[0.98]"
            >
              <span>Book a demo</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>

            <button
              type="button"
              onClick={handleTriggerApprove}
              className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-line bg-white px-5 text-base font-medium text-ink shadow-2xs transition-all hover:bg-surface active:scale-[0.98]"
            >
              <Check className="h-4 w-4 text-lane" />
              <span>Try 1-Click Approve</span>
            </button>

            <Link
              href="#systems"
              className="flex h-12 items-center px-2 text-base font-medium text-muted hover:text-ink transition-colors"
            >
              See the 3 systems ↓
            </Link>
          </motion.div>

          {/* Symmetrical Guarantees */}
          <motion.div
            variants={guaranteesVariants}
            className="mt-6 flex flex-wrap items-center justify-center gap-5 font-mono text-[11px] uppercase tracking-[0.12em] text-faint"
          >
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-lane" />
              Zero Manual Spreadsheets
            </span>
            <span className="hidden sm:inline text-line">•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              100% Human Approval Gated
            </span>
            <span className="hidden sm:inline text-line">•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-muted" />
              Average SLA &lt; 1 Second
            </span>
          </motion.div>
        </motion.div>

        {/* 
          ========================================================================
          SOPHISTICATED, REALISTIC AUTONOMOUS WORKSPACE PREVIEW
          Clean Apple-quiet canvas · Crisp hairline borders · Symmetrical 3-column balance
          ========================================================================
        */}
        <motion.div
          variants={workspaceVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          className="relative mt-10 w-full max-w-[1140px]"
        >
          {/* Main Desktop Container */}
          <div className="relative overflow-hidden rounded-2xl border border-line bg-white shadow-[0_20px_50px_-15px_rgba(0,0,0,0.07)]">
            {/* Top Workspace Chrome / Bar */}
            <div className="flex flex-wrap items-center justify-between border-b border-line bg-surface/70 px-4 py-3 sm:px-6">
              {/* Window Controls */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
                </div>
                <span className="ml-2 font-mono text-[11px] text-faint hidden sm:inline">
                  workspace.lane.ai
                </span>
              </div>

              {/* Centered Segmented System Switcher (Quiet & Balanced) */}
              <div className="flex items-center rounded-lg border border-line bg-white p-0.5 shadow-2xs">
                {SYSTEMS_DATA.map((sys) => {
                  const isActive = activeSystemId === sys.id;
                  const Icon = sys.icon;
                  return (
                    <button
                      key={sys.id}
                      type="button"
                      onClick={() => {
                        setActiveSystemId(sys.id);
                        setIsAutoCycling(false);
                      }}
                      className={`relative flex cursor-pointer items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                        isActive
                          ? "bg-lane-strong text-white shadow-2xs"
                          : "text-muted hover:text-ink hover:bg-surface"
                      }`}
                    >
                      <Icon className={`h-3.5 w-3.5 ${isActive ? "text-white" : "text-faint"}`} />
                      <span className="hidden md:inline">{sys.name}</span>
                      <span className="md:hidden">{sys.index}</span>
                    </button>
                  );
                })}
              </div>

              {/* Right Cadence & Stream State */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsAutoCycling(!isAutoCycling)}
                  className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted hover:text-ink transition"
                  title="Toggle automatic system preview"
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isAutoCycling ? "bg-emerald-500 animate-pulse" : "bg-neutral-400"
                    }`}
                  />
                  <span>{isAutoCycling ? "Auto-Preview" : "Paused"}</span>
                </button>
              </div>
            </div>

            {/* 
              SYMMETRICAL THREE-COLUMN ENGINE:
              [ LEFT: 3 COLS - INTAKE FEEDS ]
              [ CENTER: 6 COLS - THE SYNTHESIZED WORK ("YOU JUST APPROVE") ]
              [ RIGHT: 3 COLS - DISPATCHED DESTINATIONS & AUDIT ]
            */}
            <div className="grid grid-cols-1 gap-6 p-5 sm:p-7 lg:grid-cols-12 lg:items-stretch">
              {/* 
                =======================================================
                COLUMN 1 (LEFT, 3 COLS): INTAKE SOURCES
                =======================================================
              */}
              <div className="lg:col-span-3 flex flex-col justify-between rounded-xl border border-line bg-surface/40 p-4">
                <div>
                  <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                    <span>Data Intake</span>
                    <span className="text-emerald-700 font-medium">Live sync</span>
                  </div>

                  <h3 className="mt-2 text-sm font-semibold text-ink">
                    Connected Signals
                  </h3>
                  <p className="mt-1 text-xs text-muted leading-relaxed">
                    Continuously parsed without manual exports or spreadsheet copy-paste.
                  </p>

                  {/* Connected Integrations List */}
                  <div className="mt-4 space-y-2">
                    {activeSystem.intakeFeeds.map((feed, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded-lg border border-line bg-white p-2.5 shadow-2xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-surface">
                            {feed.logo}
                          </div>
                          <div>
                            <div className="text-xs font-medium text-ink">{feed.name}</div>
                            <div className="text-[11px] text-muted">{feed.detail}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Left Cadence Footer */}
                <div className="mt-5 border-t border-line pt-3 font-mono text-[10px] text-faint">
                  <div className="flex items-center justify-between">
                    <span>Cadence</span>
                    <span className="font-semibold text-ink">{activeSystem.cadence}</span>
                  </div>
                </div>
              </div>

              {/* 
                =======================================================
                COLUMN 2 (CENTER, 6 COLS): THE APPROVAL GATEWAY
                Realistic, pristine deliverable preview with 1-click action
                =======================================================
              */}
              <div className="lg:col-span-6 flex flex-col justify-between rounded-xl border border-line bg-white p-5 shadow-xs">
                {/* Header of Review Gate */}
                <div>
                  <div className="flex items-center justify-between border-b border-line pb-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-0.5 font-mono text-[10px] font-medium text-ink">
                        System {activeSystem.index}
                      </span>
                      <span className="text-xs font-semibold text-ink">
                        {activeSystem.headline}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 font-mono text-[10px] text-faint">
                      <LaneMark size={14} />
                      <span>Synthesized by Agent Lane</span>
                    </div>
                  </div>

                  {/* The Realistic Document / Artifact Preview */}
                  <div className="mt-4">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeSystem.id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="rounded-lg border border-line bg-surface/50 p-4"
                      >
                        {/* Document Meta Row */}
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`inline-block rounded-md px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wide border ${activeSystem.draft.badgeColor}`}
                          >
                            {activeSystem.draft.badge}
                          </span>
                          <span className="text-[11px] text-faint font-mono">
                            {isCurrentApproved ? "Status: Dispatched" : "Status: Awaiting review"}
                          </span>
                        </div>

                        <h4 className="mt-2 text-sm font-semibold text-ink">
                          {activeSystem.draft.title}
                        </h4>
                        <div className="text-[11px] text-muted">
                          {activeSystem.draft.meta}
                        </div>

                        {/* Realistic Metrics Cards if available */}
                        {activeSystem.draft.kpis && (
                          <div className="mt-3 grid grid-cols-3 gap-2 border-y border-line py-2.5 text-center">
                            {activeSystem.draft.kpis.map((kpi, kIdx) => (
                              <div key={kIdx} className="rounded-md bg-white p-2 border border-line shadow-2xs">
                                <div className="text-[10px] uppercase font-mono text-faint">
                                  {kpi.label}
                                </div>
                                <div className="mt-0.5 font-mono text-sm font-semibold text-ink">
                                  {kpi.value}
                                </div>
                                <div className="mt-0.5 text-[10px] text-emerald-700 font-medium">
                                  {kpi.delta}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Realistic Text Synthesis */}
                        <div className="mt-3 space-y-1.5 text-xs text-muted leading-relaxed">
                          {activeSystem.draft.bodyLines.map((line, lIdx) => (
                            <div key={lIdx} className="flex items-start gap-2">
                              <span className="text-lane font-bold select-none">•</span>
                              <span className="text-ink-2">{line}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* The Tactile 1-Click Action */}
                <div className="mt-5 border-t border-line pt-4">
                  {isCurrentApproved ? (
                    <motion.div
                      initial={{ scale: 0.98, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex h-12 items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-4 text-emerald-800"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                        <span className="text-sm font-medium">
                          Approved & Dispatched {lastDispatchedTime ? `(${lastDispatchedTime})` : ""}
                        </span>
                      </div>
                      <span className="font-mono text-[11px] text-emerald-700">
                        Audit Log Recorded
                      </span>
                    </motion.div>
                  ) : (
                    <button
                      type="button"
                      onClick={handleTriggerApprove}
                      className="group flex h-12 w-full cursor-pointer items-center justify-between rounded-xl bg-lane px-5 text-sm font-medium text-white shadow-sm transition-all hover:bg-lane-strong active:scale-[0.99]"
                    >
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4" />
                        <span>{activeSystem.draft.actionLabel}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-white/90 font-mono">
                        <span>1-Click Sign-Off</span>
                        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </button>
                  )}

                  <div className="mt-2.5 flex items-center justify-between font-mono text-[10px] text-faint">
                    <span>Target: {activeSystem.draft.targetRecipient}</span>
                    <span>Zero automated dispatch without review</span>
                  </div>
                </div>
              </div>

              {/* 
                =======================================================
                COLUMN 3 (RIGHT, 3 COLS): DISPATCHED DESTINATIONS
                =======================================================
              */}
              <div className="lg:col-span-3 flex flex-col justify-between rounded-xl border border-line bg-surface/40 p-4">
                <div>
                  <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                    <span>Delivered Work</span>
                    <span className="text-emerald-700 font-medium">Ready</span>
                  </div>

                  <h3 className="mt-2 text-sm font-semibold text-ink">
                    Destination Ledger
                  </h3>
                  <p className="mt-1 text-xs text-muted leading-relaxed">
                    Polished artifacts pushed directly to existing work channels.
                  </p>

                  {/* Destination items */}
                  <div className="mt-4 space-y-2">
                    {activeSystem.outputDestinations.map((dest, dIdx) => (
                      <div
                        key={dIdx}
                        className="rounded-lg border border-line bg-white p-2.5 shadow-2xs"
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-surface">
                            {dest.logo}
                          </div>
                          <span className="text-xs font-medium text-ink">{dest.title}</span>
                        </div>
                        <div className="mt-1 text-[11px] text-muted truncate">
                          {dest.destination}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column Audit Trail */}
                <div className="mt-5 border-t border-line pt-3 font-mono text-[10px] space-y-1.5">
                  {activeSystem.auditMetrics.map((audit, aIdx) => (
                    <div key={aIdx} className="flex items-center justify-between text-muted">
                      <span>{audit.label}</span>
                      <span className="font-semibold text-ink">{audit.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Status Ribbon (Apple-quiet & calm) */}
            <div className="border-t border-line bg-surface/30 px-5 py-3 sm:px-6 flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-muted">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span>Agent Lane: All 3 lanes running smooth</span>
                </span>
                <span className="text-line">•</span>
                <span className="hidden sm:inline">Zero API latency bottlenecks</span>
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={handleBookDemo}
                  className="inline-flex items-center gap-1 font-medium text-ink hover:text-lane transition"
                >
                  <span>Book onboarding demo</span>
                  <ExternalLink className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Instant Demo Booking Modal */}
      <DemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
