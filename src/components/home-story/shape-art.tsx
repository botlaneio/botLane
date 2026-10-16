import type { ReactNode } from "react";
import {
  GoogleAdsLogo,
  GoogleAnalyticsLogo,
  GoogleCalendarLogo,
  GoogleDriveLogo,
  HubSpotLogo,
  MetaAdsLogo,
  PlaidLogo,
  StripeLogo,
  TypeformLogo,
} from "@/components/assemble/company-icons";

/**
 * Each system's shape, in a 480 × 240 box: 01 a funnel (many in, one out), 02 a line (one lead,
 * a run of touches), 03 a loop (round again until it's paid). The timeline plays them in three
 * steps as the work moves down the cards: `data-g="0"` when Lane starts the work, `"1"` once you
 * give the OK, `"2"` when it goes out. In each step, `data-draw` strokes are drawn, `data-rise`
 * bars grow up from their base and `data-pop` parts scale in.
 */

const INK = "#1d1d1f";
const LINE = "#d4d4da";
const SOFT = "#f1f1f4";
const LANE = "#e0312b";
const OK = "#1a7f37";
const MUTED = "#8e8e93";

const popStyle = { transformBox: "fill-box", transformOrigin: "50% 50%" } as const;
const riseStyle = { transformBox: "fill-box", transformOrigin: "50% 100%" } as const;
const mono = { fontFamily: "var(--font-geist-mono), ui-monospace, monospace" } as const;

type G = 0 | 1 | 2;

function T({ x, y, children, fill = INK, size = 12, anchor = "middle", weight, sans }: {
  x: number;
  y: number;
  children: ReactNode;
  fill?: string;
  size?: number;
  anchor?: "start" | "middle" | "end";
  weight?: number;
  sans?: boolean;
}) {
  return (
    <text x={x} y={y} fill={fill} fontSize={size} textAnchor={anchor} fontWeight={weight} style={sans ? undefined : mono}>
      {children}
    </text>
  );
}

const Pop = ({ g, children }: { g: G; children: ReactNode }) => (
  <g data-pop data-g={g} style={popStyle}>
    {children}
  </g>
);
const Draw = ({ g, d, stroke = LINE, width = 2.5 }: { g: G; d: string; stroke?: string; width?: number }) => (
  <path data-draw data-g={g} d={d} stroke={stroke} strokeWidth={width} fill="none" strokeLinecap="round" />
);

/** A white tile with a company logo, centred on (x, y). */
function Logo({ x, y, children, s = 34 }: { x: number; y: number; children: ReactNode; s?: number }) {
  return (
    <g>
      <rect x={x - s / 2} y={y - s / 2} width={s} height={s} rx={9} fill="#fff" stroke="#e6e6ea" />
      <svg x={x - 10} y={y - 10} width={20} height={20} overflow="visible">
        {children}
      </svg>
    </g>
  );
}

/** Lane, the hire in the middle of every shape. */
function LaneNode({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x - 26} y={y - 26} width={52} height={52} rx={15} fill={INK} />
      <circle cx={x} cy={y} r={7} fill={LANE} />
      <T x={x} y={y + 44} size={11} fill={MUTED} weight={600}>LANE</T>
    </g>
  );
}

const SOURCES = [
  { y: 36, logo: <GoogleAdsLogo size={20} /> },
  { y: 92, logo: <GoogleAnalyticsLogo size={20} /> },
  { y: 148, logo: <MetaAdsLogo size={20} /> },
  { y: 204, logo: <HubSpotLogo size={20} /> },
];

const ARTS: ReactNode[] = [
  /* 01 Client reporting: four sources pour into Lane, one report comes out. */
  <>
    {SOURCES.map((s) => (
      <Draw key={s.y} g={0} d={`M62 ${s.y} C150 ${s.y} 150 120 210 120`} />
    ))}
    {SOURCES.map((s) => (
      <Pop key={s.y} g={0}>
        <Logo x={40} y={s.y}>{s.logo}</Logo>
      </Pop>
    ))}
    <LaneNode x={236} y={120} />
    <Draw g={1} d="M262 120 H330" stroke={LANE} width={3} />
    <rect x={334} y={42} width={124} height={156} rx={14} fill="#fff" stroke="#e6e6ea" />
    <rect x={350} y={58} width={58} height={6} rx={3} fill={INK} />
    <rect x={350} y={72} width={84} height={5} rx={2.5} fill={SOFT} />
    {[30, 44, 38, 56, 70].map((h, i) => (
      <rect
        key={i}
        data-rise
        data-g={0}
        x={352 + i * 20}
        y={180 - h}
        width={12}
        height={h}
        rx={2.5}
        fill={i === 4 ? LANE : i === 3 ? INK : "#dcdce2"}
        style={riseStyle}
      />
    ))}
    <Pop g={2}>
      <circle cx={452} cy={46} r={15} fill={OK} />
      <path d="M445 46 l5 5 l9 -10" stroke="#fff" strokeWidth={2.6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Pop>
    <Pop g={2}>
      <Logo x={396} y={222} s={30}>
        <GoogleDriveLogo size={20} />
      </Logo>
    </Pop>
  </>,

  /* 02 Lead follow-up: one lead, then a run of touches until the meeting is booked. */
  <>
    <Pop g={0}>
      <circle cx={40} cy={120} r={24} fill="#fdeceb" stroke="#f5c6c4" strokeWidth={1.5} />
      <T x={40} y={125} size={14} fill={LANE} weight={700} sans>Z</T>
      <T x={40} y={166} size={11} fill={MUTED}>NEW LEAD</T>
    </Pop>
    <Pop g={0}>
      <Logo x={40} y={44} s={30}>
        <TypeformLogo size={18} />
      </Logo>
    </Pop>
    <Draw g={0} d="M66 120 H108" />
    <LaneNode x={134} y={120} />
    <Draw g={0} d="M160 120 H418" />
    <Draw g={1} d="M160 120 H418" stroke={LANE} width={3} />
    {[
      { x: 206, when: "TODAY", what: "Reply" },
      { x: 290, when: "DAY 2", what: "Nudge" },
      { x: 374, when: "DAY 5", what: "Check-in" },
    ].map((t) => (
      <g key={t.when}>
        <Pop g={0}>
          <circle cx={t.x} cy={120} r={9} fill="#fff" stroke={INK} strokeWidth={2} />
          <T x={t.x} y={96} size={11} fill={MUTED}>{t.when}</T>
          <T x={t.x} y={152} size={13} weight={600} sans>{t.what}</T>
        </Pop>
        <Pop g={1}>
          <circle cx={t.x} cy={120} r={9} fill={LANE} />
        </Pop>
      </g>
    ))}
    <Pop g={2}>
      <rect x={420} y={88} width={52} height={64} rx={12} fill="#fff" stroke={OK} strokeWidth={2} />
      <svg x={436} y={98} width={20} height={20} overflow="visible">
        <GoogleCalendarLogo size={20} />
      </svg>
      <T x={446} y={140} size={10} fill={OK} weight={700}>BOOKED</T>
    </Pop>
  </>,

  /* 03 Invoice follow-up: reminders go round, a little firmer each time, until it's paid. */
  <>
    <Pop g={0}>
      <rect x={10} y={84} width={78} height={72} rx={12} fill="#fff" stroke="#e6e6ea" />
      <svg x={20} y={94} width={20} height={20} overflow="visible">
        <StripeLogo size={20} />
      </svg>
      <T x={20} y={132} size={10} fill={MUTED} anchor="start">INV-2041</T>
      <T x={20} y={147} size={12} weight={600} anchor="start">$4,200</T>
    </Pop>
    <Draw g={0} d="M88 120 H130" />
    <LaneNode x={156} y={120} />
    <Draw g={0} d="M182 120 H250" />
    <circle cx={330} cy={120} r={80} fill="none" stroke={SOFT} strokeWidth={10} />
    <Draw g={0} d="M250 120 A80 80 0 0 1 410 120" stroke={INK} width={3} />
    <Draw g={1} d="M410 120 A80 80 0 0 1 250 120" stroke={LANE} width={3} />
    <Pop g={0}>
      <circle cx={330} cy={40} r={13} fill="#fff" stroke={INK} strokeWidth={2} />
      <T x={330} y={44} size={11} weight={700}>R1</T>
    </Pop>
    <Pop g={1}>
      <circle cx={330} cy={200} r={13} fill={LANE} />
      <T x={330} y={204} size={11} weight={700} fill="#fff">R2</T>
    </Pop>
    <g>
      <T x={330} y={116} size={12} fill={MUTED}>14 days</T>
      <T x={330} y={132} size={12} fill={MUTED}>overdue</T>
    </g>
    <Pop g={2}>
      <circle cx={330} cy={120} r={42} fill="#fff" />
      <circle cx={330} cy={120} r={30} fill={OK} />
      <T x={330} y={127} size={20} weight={700} fill="#fff" sans>$</T>
    </Pop>
    <Pop g={2}>
      <rect x={418} y={176} width={58} height={48} rx={11} fill="#fff" stroke={OK} strokeWidth={2} />
      <svg x={437} y={182} width={20} height={20} overflow="visible">
        <PlaidLogo size={20} />
      </svg>
      <T x={447} y={216} size={9.5} fill={OK} weight={700}>PAID</T>
    </Pop>
  </>,
];

export function ShapeArt({ system, className }: { system: number; className?: string }) {
  return (
    <svg data-art viewBox="0 0 480 240" className={className} aria-hidden>
      <g data-art-body>{ARTS[system]}</g>
    </svg>
  );
}
