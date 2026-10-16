import type { ReactNode } from "react";
import { Check } from "lucide-react";
import {
  GmailLogo,
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
import { APPROVALS, RUNS } from "@/components/assemble/data";
import { railPath } from "@/components/release-standard/layout";
import { ShapeArt } from "./shape-art";
import type { Box, HomeLayout, Rect } from "./layout";

/**
 * The pieces of the homepage story. Every element is one element from start to finish: the Lane
 * card shrinks into a bar, each system's shape panel and cards rise into place on the strip and
 * stay there while the camera slides down, and each status is a set of stacked states the
 * timeline cross-fades. Names, people and amounts are placeholders, as on the board before it.
 */

export const SYSTEMS = [
  {
    numeral: "01",
    name: "Client reporting",
    shape: "Many in, one out.",
    approvalLogo: <GoogleDriveLogo size={18} />,
    out: { done: "Delivered · Fri 09:00", item: "Weekly client report", meta: "Google Drive · Week 41", logo: <GoogleDriveLogo size={20} /> },
  },
  {
    numeral: "02",
    name: "Lead follow-up",
    shape: "One lead, a run of touches.",
    approvalLogo: <GmailLogo size={18} />,
    out: { done: "Meeting booked", item: "Call with Zuheb", meta: "Thu 2:00 pm · Google Calendar", logo: <GoogleCalendarLogo size={20} /> },
  },
  {
    numeral: "03",
    name: "Invoice follow-up",
    shape: "It loops until it’s paid.",
    approvalLogo: <StripeLogo size={18} />,
    out: { done: "Paid · $4,200", item: "+$4,200 received", meta: "Plaid bank feed · today", logo: <PlaidLogo size={20} /> },
  },
] as const;

/** The tools the opening scatters around Lane, before it pulls the work together. */
export const PIECES = [
  { name: "Google Ads", logo: <GoogleAdsLogo size={16} />, at: [0.13, 0.2] },
  { name: "Gmail", logo: <GmailLogo size={16} />, at: [0.4, 0.12] },
  { name: "HubSpot", logo: <HubSpotLogo size={16} />, at: [0.66, 0.16] },
  { name: "Stripe", logo: <StripeLogo size={16} />, at: [0.88, 0.25] },
  { name: "Analytics", logo: <GoogleAnalyticsLogo size={16} />, at: [0.1, 0.8] },
  { name: "Typeform", logo: <TypeformLogo size={16} />, at: [0.36, 0.9] },
  { name: "Meta Ads", logo: <MetaAdsLogo size={16} />, at: [0.63, 0.86] },
  { name: "Calendar", logo: <GoogleCalendarLogo size={16} />, at: [0.9, 0.78] },
] as const;
const PIECE_W = { full: 132, compact: 104 };

export const piecePoint = (l: HomeLayout, i: number) => {
  const w = l.compact ? PIECE_W.compact : PIECE_W.full;
  const [fx, fy] = PIECES[i].at;
  const x = Math.min(l.W - w / 2 - 6, Math.max(w / 2 + 6, fx * l.W));
  return { x, y: fy * l.H };
};

const boxStyle = (b: Box) => ({ left: b.x - b.w / 2, top: b.y - b.h / 2, width: b.w, height: b.h });
const rectStyle = (r: Rect) => ({ left: r.x, top: r.y, width: r.w, height: r.h });

/** A small status chip; several stack in one slot and the timeline cross-fades them. */
function Chip({ attr, tone, children, hidden, compact }: { attr: string; tone: "red" | "ink" | "amber" | "ok" | "faint"; children: ReactNode; hidden?: boolean; compact: boolean }) {
  const tones = {
    red: "border-lane/30 bg-lane/5 text-lane",
    ink: "border-ink/15 bg-white text-ink",
    amber: "border-amber-500/30 bg-amber-50 text-amber-700",
    ok: "border-ok/30 bg-ok/5 text-ok",
    faint: "border-line bg-surface text-muted",
  };
  const dot = { red: "bg-lane", ink: "bg-ink", amber: "bg-amber-500", ok: "bg-ok", faint: "bg-[#a1a1aa]" };
  return (
    <span
      {...{ [attr]: "" }}
      className={`absolute inset-y-0 right-0 flex items-center gap-1.5 rounded-full border font-medium whitespace-nowrap ${tones[tone]} ${
        compact ? "px-2 text-[10.5px]" : "px-2.5 text-[11.5px]"
      } ${hidden ? "opacity-0" : ""}`}
    >
      <span className={`size-1.5 rounded-full ${dot[tone]}`} />
      {children}
    </span>
  );
}

/* ---------- the Lane card / bar ---------- */

const HEAD = [
  { attr: "data-h-0", text: "Your work, in pieces", tone: "faint" },
  { attr: "data-h-1", text: "Running client reporting", tone: "red" },
  { attr: "data-h-2", text: "Running lead follow-up", tone: "red" },
  { attr: "data-h-3", text: "Running invoice follow-up", tone: "red" },
  { attr: "data-h-4", text: "3 systems running", tone: "ink" },
] as const;

export function LaneCard({ layout }: { layout: HomeLayout }) {
  const { compact } = layout;
  return (
    <div
      data-lane
      className={`absolute flex items-center overflow-hidden rounded-[18px] border border-line bg-white shadow-[0_18px_40px_-24px_rgba(20,20,40,0.3)] ${
        compact ? "gap-2.5 px-3" : "gap-4 px-5"
      }`}
      style={{ ...boxStyle(layout.lane.big), zIndex: 6 }}
    >
      <span className={`relative flex shrink-0 items-center justify-center rounded-[11px] bg-ink ${compact ? "size-[34px]" : "size-[42px]"}`}>
        <span className="size-2.5 rounded-full bg-lane" />
        <span data-lane-ring className="absolute inset-[-4px] rounded-[14px] border-2 border-lane opacity-0" />
      </span>
      <div className="min-w-0 flex-1">
        <div className={`truncate font-semibold tracking-[-0.01em] text-ink ${compact ? "text-[14.5px]" : "text-[17px]"}`}>Lane</div>
        <div className={`mt-0.5 truncate text-muted ${compact ? "text-[11px]" : "text-[12.5px]"}`}>
          Your AI hire{compact ? "" : " · does the work, asks for your OK"}
        </div>
      </div>
      <span className={`relative block shrink-0 ${compact ? "h-[22px] w-[168px]" : "h-[26px] w-[204px]"}`}>
        {HEAD.map((h, i) => (
          <Chip key={h.attr} attr={h.attr} tone={h.tone} hidden={i > 0} compact={compact}>
            {h.text}
          </Chip>
        ))}
      </span>
    </div>
  );
}

/** The opening: the tools your work is scattered across, floating around Lane. */
export function Pieces({ layout }: { layout: HomeLayout }) {
  const w = layout.compact ? PIECE_W.compact : PIECE_W.full;
  return (
    <div className="absolute top-0 left-0" style={{ width: layout.W, height: layout.H, zIndex: 5 }} aria-hidden>
      {PIECES.map((p, i) => {
        const pt = piecePoint(layout, i);
        return (
          <div
            key={p.name}
            data-piece
            className={`absolute flex items-center gap-2 rounded-[12px] border border-line bg-white shadow-[0_10px_24px_-16px_rgba(20,20,40,0.35)] ${
              layout.compact ? "h-[32px] px-2 text-[11.5px]" : "h-[38px] px-2.5 text-[13px]"
            }`}
            style={{ left: pt.x - w / 2, top: pt.y - (layout.compact ? 16 : 19), width: w }}
          >
            <span className="flex shrink-0">{p.logo}</span>
            <span className="truncate font-medium text-ink-2">{p.name}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- the strip ---------- */

function Rail({ layout }: { layout: HomeLayout }) {
  const d = railPath(layout.rail);
  const w = layout.compact ? 2.5 : 3;
  return (
    <svg
      className="absolute top-0 left-0 overflow-visible"
      width={layout.strip.w}
      height={layout.strip.h}
      viewBox={`0 0 ${layout.strip.w} ${layout.strip.h}`}
      aria-hidden
    >
      <path d={d} fill="none" stroke="#dcdce2" strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
      <path data-rail-done d={d} fill="none" stroke="#e0312b" strokeWidth={w + 0.5} strokeLinecap="round" strokeLinejoin="round" />
      {layout.ticks.map(([a, b], i) => (
        <g key={i}>
          <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#dcdce2" strokeWidth={w} strokeLinecap="round" strokeDasharray="1 6" />
          <line data-tick x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#e0312b" strokeWidth={w} strokeLinecap="round" opacity={0} />
        </g>
      ))}
    </svg>
  );
}

/** One panel per system: its name and its shape. */
function Panels({ layout }: { layout: HomeLayout }) {
  const desktop = !layout.compact;
  return (
    <>
      {SYSTEMS.map((s, p) => (
        <div key={s.name} data-panel-pin className="absolute" style={{ ...rectStyle(layout.panels[p]), zIndex: 4 }}>
          <div
            data-panel
            className={`flex h-full flex-col overflow-hidden border border-line bg-white opacity-0 shadow-[0_24px_60px_-34px_rgba(20,20,40,0.35)] ${
              desktop ? "rounded-[26px] px-6 py-5" : "rounded-[18px] px-3 pt-2.5 pb-2"
            }`}
          >
            {desktop ? (
              <div>
                <div className="font-mono text-[13px] font-semibold tracking-wider text-lane uppercase">
                  System {s.numeral}
                </div>
                <div className="mt-1.5 flex items-baseline gap-3">
                  <span className="text-[34px] leading-none font-semibold tracking-[-0.045em] text-ink">{s.name}</span>
                </div>
                <div className="mt-2 text-[15px] text-muted">{s.shape}</div>
              </div>
            ) : (
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-[10.5px] font-semibold tracking-wider text-lane">{s.numeral}</span>
                <span className="text-[17px] leading-none font-semibold tracking-[-0.035em] text-ink">{s.name}</span>
                <span className="ml-auto truncate text-[11px] text-muted">{s.shape}</span>
              </div>
            )}
            <div className={`min-h-0 flex-1 ${desktop ? "mt-4" : "mt-1.5"}`}>
              <ShapeArt system={p} className="h-full w-full" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

/** Giant outlined system numerals on a slower layer behind the lane. */
export function Numerals({ layout }: { layout: HomeLayout }) {
  return (
    <div data-parallax className="absolute top-0 left-0" style={{ width: layout.W, height: 0, zIndex: 0 }} aria-hidden>
      {SYSTEMS.map((s, i) => (
        <span
          key={s.name}
          data-numeral
          className="absolute font-semibold leading-none tracking-[-0.06em] whitespace-nowrap text-transparent opacity-0 select-none"
          style={{
            left: layout.numerals[i].x,
            top: layout.numerals[i].y,
            fontSize: layout.numeralSize,
            transform: "translate(-50%, -50%)",
            WebkitTextStroke: "1.5px #e4e4e9",
          }}
        >
          {s.numeral}
        </span>
      ))}
    </div>
  );
}

function CardShell({ layout, i, kind, label, status, children }: {
  layout: HomeLayout;
  i: number;
  kind: string;
  label: ReactNode;
  status: ReactNode;
  children: ReactNode;
}) {
  const { card, compact } = layout;
  return (
    <div
      data-card={kind}
      className="absolute opacity-0"
      style={{ left: layout.cards[i].x, top: layout.cards[i].y, width: card.w, height: card.h }}
    >
      <div
        className={`relative flex h-full flex-col overflow-hidden border border-line bg-white shadow-[0_14px_34px_-22px_rgba(20,20,40,0.32)] ${
          compact ? "rounded-[15px] px-3.5 pt-2.5 pb-2.5" : "rounded-[18px] px-5 pt-3 pb-3"
        }`}
      >
        <span data-card-bar className="absolute inset-x-0 top-0 h-[4px] origin-left bg-ink" style={{ transform: "scaleX(0)" }} />
        <div className={`relative flex items-center ${compact ? "h-[22px]" : "h-[24px]"}`}>
          <span className={`font-mono font-semibold tracking-wider text-faint uppercase ${compact ? "text-[10px]" : "text-[10.5px]"}`}>{label}</span>
          {status}
        </div>
        {children}
        <span
          data-card-ring
          className={`pointer-events-none absolute inset-0 border-2 border-lane opacity-0 ${compact ? "rounded-[15px]" : "rounded-[18px]"}`}
        />
      </div>
    </div>
  );
}

function Cards({ layout }: { layout: HomeLayout }) {
  const { compact } = layout;
  const title = `truncate font-semibold tracking-[-0.015em] text-ink ${compact ? "text-[14.5px]" : "text-[17px]"}`;
  const chips = (a: ReactNode, b: ReactNode) => (
    <>
      {a}
      {b}
    </>
  );
  return (
    <>
      {SYSTEMS.map((s, p) => {
        const run = RUNS[p];
        const ok = APPROVALS[p];
        const base = p * 3;
        return [
          /* Lane does the work */
          <CardShell
            key={`${p}w`}
            layout={layout}
            i={base}
            kind="work"
            label={`Lane · ${run.run}`}
            status={chips(
              <Chip attr="data-a" tone="red" compact={compact}>Working</Chip>,
              <Chip attr="data-b" tone="ink" hidden compact={compact}>Ready for you</Chip>,
            )}
          >
            <div className={`${title} ${compact ? "mt-0.5" : "mt-1"}`}>{run.title}</div>
            <div className={compact ? "mt-1" : "mt-1.5"}>
              {run.steps.map((step) => (
                <div key={step} className={`flex items-center gap-2 text-ink-2 ${compact ? "h-[17px] text-[12px]" : "h-[20px] text-[13.5px]"}`}>
                  <span className="relative size-[14px] shrink-0 rounded-[4px] border-[1.5px] border-[#c7c7cc]">
                    <span data-step className="absolute inset-[-1.5px] flex items-center justify-center rounded-[4px] bg-ink text-white opacity-0">
                      <Check size={10} strokeWidth={3} />
                    </span>
                  </span>
                  <span className="truncate">{step}</span>
                </div>
              ))}
            </div>
          </CardShell>,

          /* You give the OK */
          <CardShell key={`${p}o`} layout={layout} i={base + 1} kind="ok" label="You · your OK"
            status={chips(
              <Chip attr="data-a" tone="amber" compact={compact}>Waiting for you</Chip>,
              <Chip attr="data-b" tone="ok" hidden compact={compact}>Approved</Chip>,
            )}
          >
            <div
              className={
                compact
                  ? "mt-0.5 line-clamp-2 text-[13.5px] leading-[1.25] font-semibold tracking-[-0.015em] text-ink"
                  : `${title} mt-1`
              }
            >
              {ok.question}
            </div>
            <div className={`mt-auto flex items-center ${compact ? "gap-2" : "gap-3"}`}>
              <span className={`flex shrink-0 items-center justify-center rounded-[9px] border border-line bg-white ${compact ? "size-[30px]" : "size-[34px]"}`}>
                {s.approvalLogo}
              </span>
              <div className="min-w-0 flex-1">
                <div className={`truncate font-semibold text-ink ${compact ? "text-[12px]" : "text-[13px]"}`}>{ok.doc}</div>
                <div className={`truncate text-muted ${compact ? "text-[10.5px]" : "text-[11.5px]"}`}>{ok.meta}</div>
              </div>
              <span className={`relative shrink-0 ${compact ? "h-[30px] w-[96px]" : "h-[34px] w-[160px]"}`}>
                <span
                  data-btn
                  data-a
                  className={`absolute inset-0 flex items-center justify-center rounded-[10px] bg-ink font-semibold whitespace-nowrap text-white ${
                    compact ? "text-[11.5px]" : "text-[13px]"
                  }`}
                >
                  {compact ? "Approve" : ok.button}
                </span>
                <span
                  data-b
                  className={`absolute inset-0 flex items-center justify-center gap-1.5 rounded-[10px] bg-ok/10 font-semibold whitespace-nowrap text-ok opacity-0 ${
                    compact ? "text-[11px]" : "text-[12.5px]"
                  }`}
                >
                  <Check size={13} strokeWidth={3} />
                  {compact ? "Approved" : ok.done}
                </span>
              </span>
            </div>
          </CardShell>,

          /* It goes out */
          <CardShell key={`${p}d`} layout={layout} i={base + 2} kind="out" label="Out to the client"
            status={chips(
              <Chip attr="data-a" tone="faint" compact={compact}>Waiting for your OK</Chip>,
              <Chip attr="data-b" tone="ok" hidden compact={compact}>{s.out.done}</Chip>,
            )}
          >
            <div className={`mt-auto flex items-center ${compact ? "gap-2.5" : "gap-3"}`}>
              <span className={`flex shrink-0 items-center justify-center rounded-[11px] border border-line bg-white ${compact ? "size-[38px]" : "size-[46px]"}`}>
                {s.out.logo}
              </span>
              <div className="min-w-0">
                <div className={title}>{s.out.item}</div>
                <div className={`truncate text-muted ${compact ? "text-[11.5px]" : "text-[13px]"}`}>{s.out.meta}</div>
              </div>
            </div>
          </CardShell>,
        ];
      })}
    </>
  );
}

/** The finale: the three systems side by side, each with its shape. */
function Tiles({ layout }: { layout: HomeLayout }) {
  const { compact } = layout;
  const row = layout.key === "mobile";
  return (
    <>
      {SYSTEMS.map((s, p) => (
        <div
          key={s.name}
          data-tile
          className={`absolute flex overflow-hidden border border-line bg-white opacity-0 shadow-[0_18px_40px_-26px_rgba(20,20,40,0.3)] ${
            row ? "items-center gap-3 rounded-[18px] px-3" : `flex-col ${compact ? "rounded-[16px] p-3" : "rounded-[22px] p-5"}`
          }`}
          style={rectStyle(layout.tiles[p])}
        >
          <div className={`shrink-0 rounded-[12px] bg-[#f8f8f9] ${row ? "h-[86px] w-[150px]" : "min-h-0 w-full flex-1"}`}>
            <ShapeArt system={p} className="h-full w-full" />
          </div>
          <div className={row ? "min-w-0" : compact ? "mt-2" : "mt-4"}>
            <div className={`font-mono font-semibold text-lane ${compact ? "text-[10.5px]" : "text-[12px]"}`}>{s.numeral}</div>
            <div className={`font-semibold tracking-[-0.02em] text-ink ${compact ? "text-[14px]" : "text-[19px]"}`}>{s.name}</div>
            <div className={`text-muted ${compact ? "text-[11px]" : "text-[13.5px]"}`}>{s.shape}</div>
          </div>
        </div>
      ))}
    </>
  );
}

function Token({ layout }: { layout: HomeLayout }) {
  const p = layout.rail[0];
  return (
    <div data-token className="absolute top-0 left-0 opacity-0" style={{ transform: `translate(${p.x}px, ${p.y}px)` }}>
      <span className="absolute top-0 left-0 size-[18px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white bg-lane shadow-[0_0_0_4px_rgba(224,49,43,0.2)]" />
    </div>
  );
}

export function Strip({ layout }: { layout: HomeLayout }) {
  return (
    <div data-strip className="absolute top-0 left-0" style={{ width: layout.strip.w, height: layout.strip.h, zIndex: 2 }}>
      <Rail layout={layout} />
      <Panels layout={layout} />
      <Cards layout={layout} />
      <Tiles layout={layout} />
      <Token layout={layout} />
    </div>
  );
}
