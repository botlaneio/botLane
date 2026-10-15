"use client";

import { useState, type ComponentType, type Ref } from "react";
import Link from "next/link";
import { Activity, ArrowRight, Blocks, Box, ChevronRight, FileText, Layers, Mail, RotateCcw, ShieldCheck, UserRound, Zap, ClipboardList } from "lucide-react";
import {
  GoogleAdsLogo,
  GoogleAnalyticsLogo,
  GmailLogo,
  HubSpotLogo,
  MetaAdsLogo,
  QuickBooksLogo,
  StripeLogo,
  TypeformLogo,
} from "@/components/assemble/company-icons";
import "./systems-mega-menu.css";

/**
 * The Systems mega menu: a sidebar of systems, one animated card per system and a strip of
 * promises. It mounts when the menu opens, so every entrance and illustration plays fresh
 * each time. Motion is CSS only and stops with reduced motion.
 */

type Icon = ComponentType<{ size?: number; className?: string }>;

type System = {
  num: string;
  shape: string;
  title: string;
  text: string;
  href: string;
  icon: Icon;
  tools: Icon[];
  note: string;
  art: "funnel" | "line" | "loop";
};

const SYSTEMS: System[] = [
  {
    num: "01",
    shape: "Funnel",
    title: "Client reporting",
    text: "Multiple data sources into clear, client-ready reports.",
    href: "/systems/client-reporting",
    icon: Layers,
    tools: [GoogleAdsLogo, MetaAdsLogo, GoogleAnalyticsLogo],
    note: "Many sources → 1 report",
    art: "funnel",
  },
  {
    num: "02",
    shape: "Line",
    title: "Lead follow-up",
    text: "Fast, personal replies to new leads, then follow-ups until they book.",
    href: "/systems/lead-follow-up",
    icon: Activity,
    tools: [TypeformLogo, HubSpotLogo, GmailLogo],
    note: "Multi-touch cadence",
    art: "line",
  },
  {
    num: "03",
    shape: "Loop",
    title: "Invoice follow-up",
    text: "Track outstanding invoices and prepare payment reminders.",
    href: "/systems/invoice-follow-up",
    icon: RotateCcw,
    tools: [StripeLogo, QuickBooksLogo],
    note: "Loop until paid",
    art: "loop",
  },
];

const PROMISES = [
  { icon: Zap, title: "Zero surprise sends", text: "You approve every draft.", href: "/how-it-works" },
  { icon: ShieldCheck, title: "Access stays scoped", text: "Lane reads only what each system needs.", href: "/legal/privacy" },
  { icon: Blocks, title: "Works with your stack", text: "Integrates with the tools you already use.", href: "/integrations" },
];

/* ---------- The three illustrations ---------- */

function FunnelArt() {
  return (
    <div className="smm-art smm-funnel" aria-hidden>
      <div className="smm-funnel__stack">
        <span className="smm-funnel__ghost smm-funnel__ghost--2" />
        <span className="smm-funnel__ghost smm-funnel__ghost--1" />
        <div className="smm-funnel__card">
          <span className="smm-funnel__line smm-funnel__line--a" />
          <span className="smm-funnel__line smm-funnel__line--b" />
          <svg viewBox="0 0 160 70" className="smm-funnel__chart">
            <path className="smm-draw" pathLength={1} d="M6 56 L28 44 L44 50 L62 34 L80 40 L98 24 L112 30" />
            {[0, 1, 2, 3].map((i) => (
              <rect
                key={i}
                className="smm-bar"
                x={120 + i * 9}
                y={64 - (18 + i * 12)}
                width="5"
                height={18 + i * 12}
                rx="2"
                style={{ animationDelay: `${0.55 + i * 0.09}s` }}
              />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}

function LineArt() {
  const nodes = [
    { x: 92, y: 26, icon: Mail },
    { x: 54, y: 66, icon: ClipboardList },
    { x: 104, y: 108, icon: UserRound },
  ];
  const target = { x: 214, y: 66 };
  return (
    <div className="smm-art smm-line" aria-hidden>
      <svg viewBox="0 0 240 132" className="smm-line__svg">
        {nodes.map((n, i) => {
          const d = `M${n.x},${n.y} C${n.x + 60},${n.y} ${target.x - 70},${target.y} ${target.x},${target.y}`;
          return (
            <g key={i}>
              <path className="smm-line__wire smm-draw" pathLength={1} d={d} style={{ animationDelay: `${0.25 + i * 0.12}s` }} />
              <path className="smm-line__flow" d={d} pathLength={1} style={{ animationDelay: `${0.9 + i * 0.35}s` }} />
            </g>
          );
        })}
      </svg>
      {nodes.map(({ x, y, icon: I }, i) => (
        <span
          key={i}
          className="smm-line__node"
          style={{ left: `${(x / 240) * 100}%`, top: `${(y / 132) * 100}%`, animationDelay: `${0.1 + i * 0.1}s` }}
        >
          <I size={14} />
        </span>
      ))}
      <span className="smm-line__target" style={{ left: `${(target.x / 240) * 100}%`, top: `${(target.y / 132) * 100}%` }}>
        <span className="smm-line__ring" />
        <span className="smm-line__ring smm-line__ring--late" />
      </span>
    </div>
  );
}

function LoopArt() {
  // An arc a little over a third of the way round, from 12 o'clock clockwise.
  const r = 52;
  const end = (Math.PI * 2 * 0.4) - Math.PI / 2;
  const ex = 70 + r * Math.cos(end);
  const ey = 70 + r * Math.sin(end);
  const mid = (Math.PI * 2 * 0.17) - Math.PI / 2;
  return (
    <div className="smm-art smm-loop" aria-hidden>
      <svg viewBox="0 0 140 140" className="smm-loop__svg">
        <circle cx="70" cy="70" r={r} className="smm-loop__track" />
        <g className="smm-loop__spin">
          <path className="smm-loop__arc smm-draw" pathLength={1} d={`M70,${70 - r} A${r},${r} 0 0 1 ${ex},${ey}`} />
          <circle cx="70" cy={70 - r} r="3.2" className="smm-loop__head" />
          <circle cx={70 + r * Math.cos(mid)} cy={70 + r * Math.sin(mid)} r="4" className="smm-loop__stop" />
          <circle cx={ex} cy={ey} r="4" className="smm-loop__stop smm-loop__stop--late" />
        </g>
      </svg>
      <span className="smm-loop__doc">
        <FileText size={18} />
      </span>
    </div>
  );
}

const ART = { funnel: FunnelArt, line: LineArt, loop: LoopArt };

/* ---------- The menu ---------- */

export function SystemsMegaMenu({ ref, onNavigate }: { ref?: Ref<HTMLDivElement>; onNavigate: () => void }) {
  const [focus, setFocus] = useState<string | null>(null);

  const side = [
    { title: "All systems", href: "/systems", icon: Box, key: null as string | null },
    ...SYSTEMS.map((s) => ({ title: s.title, href: s.href, icon: s.icon, key: s.num })),
  ];

  return (
    <div ref={ref} className="smm absolute top-full right-6 left-6 pt-2.5">
      <div className="smm-panel grid grid-cols-[14.5rem_1fr] overflow-hidden rounded-[1.5rem] border border-line bg-white/95 shadow-[0_1.75rem_4rem_rgba(20,20,40,0.14)] backdrop-blur-xl">
        {/* Sidebar */}
        <div className="border-r border-line bg-[#fbfbfa] p-4">
          <div className="px-3 pt-2 pb-3 font-mono text-[0.625rem] font-semibold tracking-[0.16em] text-faint uppercase">Systems</div>
          <ul className="space-y-1">
            {side.map(({ title, href, icon: I, key }, i) => {
              const active = key === null ? focus === null : focus === key;
              return (
                <li key={title} className="smm-rise" style={{ animationDelay: `${0.04 + i * 0.04}s` }}>
                  <Link
                    href={href}
                    onClick={onNavigate}
                    onMouseEnter={() => setFocus(key)}
                    onFocus={() => setFocus(key)}
                    className={`group flex items-center gap-3 rounded-[0.75rem] px-3 py-2.5 text-[0.84375rem] font-medium transition-colors ${
                      active ? "bg-lane/[0.07] text-ink" : "text-ink-2 hover:bg-black/[0.03]"
                    }`}
                  >
                    <I size={17} className={active ? "text-lane" : "text-ink-2"} />
                    <span className="flex-1">{title}</span>
                    <ChevronRight
                      size={14}
                      className={`transition-transform group-hover:translate-x-0.5 ${active ? "text-lane" : "text-faint"}`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Cards */}
        <div className="p-6" onMouseLeave={() => setFocus(null)}>
          <div className="smm-rise flex items-center justify-between" style={{ animationDelay: "0.06s" }}>
            <span className="font-mono text-[0.625rem] font-semibold tracking-[0.16em] text-faint uppercase">The three core systems</span>
            <Link
              href="/how-it-works"
              onClick={onNavigate}
              className="group flex items-center gap-1.5 text-[0.75rem] text-muted transition-colors hover:text-ink"
            >
              Automated work. Human approval. Always.
              <ChevronRight size={13} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3.5">
            {SYSTEMS.map((s, i) => {
              const Art = ART[s.art];
              const dim = focus !== null && focus !== s.num;
              return (
                <Link
                  key={s.num}
                  href={s.href}
                  onClick={onNavigate}
                  onMouseEnter={() => setFocus(s.num)}
                  data-focus={focus === s.num ? "" : undefined}
                  className={`smm-card smm-rise group flex flex-col rounded-[1.125rem] border bg-[#fcfcfb] p-4 transition-[border-color,box-shadow,opacity] duration-200 ${
                    focus === s.num ? "border-lane/25 bg-white shadow-[0_0.75rem_2rem_rgba(20,20,40,0.08)]" : "border-line"
                  } ${dim ? "opacity-70" : ""}`}
                  style={{ animationDelay: `${0.1 + i * 0.07}s` }}
                >
                  <div className="font-mono text-[0.625rem] font-semibold tracking-[0.08em] uppercase">
                    <span className="text-ink-2">{s.num}</span>
                    <span className="text-faint"> · </span>
                    <span className="text-lane">{s.shape}</span>
                  </div>
                  <div className="mt-2 text-[1.125rem] font-semibold tracking-[-0.025em] text-ink">{s.title}</div>
                  <p className="mt-1 min-h-[2.4rem] text-[0.78125rem] leading-snug text-muted">{s.text}</p>
                  <span className="mt-3 flex size-8 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                    <ArrowRight size={14} />
                  </span>
                  <Art />
                  <div className="mt-auto flex items-center gap-2.5 border-t border-line/70 pt-3">
                    {s.tools.map((T, j) => (
                      <T key={j} size={15} />
                    ))}
                    <span className="ml-auto text-[0.6875rem] text-muted">{s.note}</span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3.5 border-t border-line pt-4">
            {PROMISES.map(({ icon: I, title, text, href }, i) => (
              <Link
                key={title}
                href={href}
                onClick={onNavigate}
                className="smm-rise group flex items-start gap-3 rounded-[0.75rem] px-2 py-1.5 transition-colors hover:bg-black/[0.03]"
                style={{ animationDelay: `${0.32 + i * 0.05}s` }}
              >
                <I size={18} className="mt-0.5 shrink-0 text-ink-2 transition-colors group-hover:text-lane" />
                <span>
                  <span className="block text-[0.8125rem] font-medium text-ink">{title}</span>
                  <span className="block text-[0.71875rem] text-muted">{text}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
