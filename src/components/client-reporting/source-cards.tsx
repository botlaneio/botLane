import type { ReactNode } from "react";
import { CARD_IDS, type CardId, type StoryLayout } from "./layout";

/**
 * The five pieces of scattered information. Each card has two faces: the source as it
 * looks today (face a), and the place it takes in the finished report (face b). The
 * timeline moves the card, resizes it and cross-fades between the faces.
 */

const SOURCE_W = 236;
const SOURCE_H = 124;

const GAPS: Record<CardId, string> = {
  sheet: "2 cells empty",
  crm: "Updated 9 days ago",
  metric: "Different date range",
  project: "No status update",
  email: "Unanswered",
};

function SourceHead({ kind, title }: { kind: string; title: string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="truncate text-[12px] font-semibold text-ink">{title}</span>
      <span className="shrink-0 font-mono text-[9px] uppercase tracking-wider text-faint">{kind}</span>
    </div>
  );
}

const SOURCE_FACE: Record<CardId, ReactNode> = {
  sheet: (
    <>
      <SourceHead kind="Sheet" title="Q3_spend_tracker_v2.xlsx" />
      <div className="mt-2.5 grid grid-cols-4 gap-[3px] font-mono text-[9.5px] text-ink-2">
        {["Wk", "Google", "Meta", "Total", "39", "2,140", "1,980", "4,120", "40", "2,310", "", "", "41", "", "2,060", "4,300"].map(
          (v, i) => (
            <span
              key={i}
              className={`h-[17px] rounded-[3px] px-1 leading-[17px] ${
                i < 4 ? "bg-surface font-semibold text-muted" : v ? "bg-surface/60" : "border border-dashed border-amber-400/70"
              }`}
            >
              {v}
            </span>
          ),
        )}
      </div>
    </>
  ),
  crm: (
    <>
      <SourceHead kind="CRM" title="Meridian Health Group" />
      <dl className="mt-2.5 space-y-1.5 text-[11px]">
        <div className="flex justify-between">
          <dt className="text-muted">Deal stage</dt>
          <dd className="font-medium text-ink">Proposal</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">New leads</dt>
          <dd className="font-mono text-ink">?</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">Owner</dt>
          <dd className="text-faint">Unassigned</dd>
        </div>
      </dl>
    </>
  ),
  metric: (
    <>
      <SourceHead kind="Ads" title="Meta Ads · last 7 days" />
      <div className="mt-2 flex items-end justify-between">
        <div>
          <div className="font-mono text-[10px] uppercase text-muted">ROAS</div>
          <div className="font-mono text-[22px] font-semibold leading-none text-ink">3.1×</div>
        </div>
        <svg width="96" height="36" viewBox="0 0 96 36" aria-hidden>
          <path d="M2 30 L16 24 L30 27 L44 16 L58 19 L72 9 L94 12" fill="none" stroke="#9a9aa2" strokeWidth="1.6" />
        </svg>
      </div>
      <div className="mt-1.5 text-[10.5px] text-muted">Google Ads export: Mon–Sun</div>
    </>
  ),
  project: (
    <>
      <SourceHead kind="Project" title="Landing page refresh" />
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface">
        <div className="h-full w-[60%] rounded-full bg-ink-2/40" />
      </div>
      <div className="mt-2 flex justify-between text-[11px] text-muted">
        <span>60% complete</span>
        <span className="text-faint">Last note: Oct 2</span>
      </div>
    </>
  ),
  email: (
    <>
      <SourceHead kind="Email" title="Re: numbers for Monday?" />
      <p className="mt-2 text-[11px] leading-snug text-muted">
        &ldquo;Hi team, could you send where we landed last week before our call?&rdquo;
      </p>
      <div className="mt-1.5 text-[10.5px] text-faint">Sarah · Meridian Health</div>
    </>
  ),
};

/** Dashboard faces. Counters start at 0; the timeline counts them up. */
function Kpi({ label, count, prefix, decimals, sub, compact }: { label: string; count: number; prefix?: string; decimals?: number; sub: string; compact: boolean }) {
  return (
    <div className="flex h-full flex-col justify-center">
      <div className="font-mono text-[10px] uppercase tracking-wider text-muted">{label}</div>
      <div className={`mt-1 font-mono font-semibold leading-none text-ink ${compact ? "text-[17px]" : "text-[26px]"}`}>
        {prefix}
        <span data-count={count} data-decimals={decimals ?? 0}>
          0
        </span>
      </div>
      {!compact && <div className="mt-1.5 text-[11px] font-medium text-emerald-600">{sub}</div>}
    </div>
  );
}

function UpdateRow({ text, meta }: { text: string; meta: string }) {
  return (
    <div className="flex h-full items-center gap-3">
      <span className="size-2 shrink-0 rounded-full bg-lane" />
      <div className="min-w-0">
        <div className="truncate text-[12px] font-medium text-ink">{text}</div>
        <div className="truncate text-[10.5px] text-muted">{meta}</div>
      </div>
    </div>
  );
}

const tileFace = (id: CardId, compact: boolean): ReactNode =>
  ({
    sheet: <Kpi label="Ad spend" prefix="$" count={8420} sub="4.2% under target pacing" compact={compact} />,
    crm: <Kpi label="Leads" count={142} sub="+18.3% week on week" compact={compact} />,
    metric: <Kpi label="Blended CPA" prefix="$" count={59.29} decimals={2} sub="Target $65.00" compact={compact} />,
    project: <UpdateRow text="Landing page refresh shipped" meta="Oct 10 · from the project board" />,
    email: <UpdateRow text="Monday numbers, as Sarah asked" meta="Answered in this report" />,
  })[id];

export function SourceCards({ layout }: { layout: StoryLayout }) {
  const { w, h } = layout.card;
  const k = w / SOURCE_W;
  const compact = layout.key === "mobile";
  return (
    <>
      {CARD_IDS.map((id) => (
        <div
          key={id}
          data-card={id}
          className="absolute top-0 left-0"
          style={{ zIndex: 3, transform: `translate(${layout.scatter[id].x}px, ${layout.scatter[id].y}px)` }}
        >
          <div
            data-card-box
            className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[14px] border border-line bg-white shadow-[0_0.5rem_1.5rem_rgba(20,20,40,0.07)]"
            style={{ width: w, height: h, transform: `rotate(${layout.scatter[id].rotate}deg)` }}
          >
            <div
              data-face="a"
              className="absolute top-0 left-0 p-3.5"
              style={{ width: SOURCE_W, height: SOURCE_H, transform: k === 1 ? undefined : `scale(${k})`, transformOrigin: "0 0" }}
            >
              {SOURCE_FACE[id]}
            </div>
            <div data-face="b" className="absolute inset-0 px-4 py-2 opacity-0">
              {tileFace(id, compact)}
            </div>
          </div>
          <span
            data-gap
            className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-amber-300/80 bg-amber-50 px-2 py-0.5 font-mono text-[9.5px] font-medium text-amber-700 opacity-0"
            style={{ left: w / 2 - 34, top: -h / 2 }}
          >
            {GAPS[id]}
          </span>
        </div>
      ))}
    </>
  );
}
