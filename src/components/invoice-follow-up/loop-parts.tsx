import { Check, Clock, CreditCard, FileText, Hash, Sparkles } from "lucide-react";
import { PANEL, PAID_AT, STATIONS, around, type Box, type LoopLayout } from "./layout";

/**
 * The pieces of the Invoice follow-up story. The invoice itself is one shape (Invoice) that
 * never swaps out: it is the invoice, then Lane's dark core, then the ledger panel, then the
 * reminder draft, then the first card on the Loop. Its faces are stacked and cross-faded.
 */

const at = (b: Box) => ({ left: b.x - b.w / 2, top: b.y - b.h / 2, width: b.w, height: b.h });

function Tick({ dark = false }: { dark?: boolean }) {
  return (
    <span
      className={`flex size-[16px] shrink-0 items-center justify-center rounded-full ${dark ? "bg-lane text-white" : "bg-emerald-50 text-emerald-600"}`}
    >
      <Check size={10} strokeWidth={3.5} />
    </span>
  );
}

export const CHECKS = ["Stripe · invoice #1084 open", "QuickBooks · aging tracked", "Bank feed · watching deposits", "Reminder plan ready"];
export const REMINDERS = [
  { when: "T−3 days", title: "Courtesy note", tone: "Warm" },
  { when: "Due +3", title: "Statement reminder", tone: "Polite" },
  { when: "Due +14", title: "Escalation", tone: "Firm" },
] as const;

/* ---------- Scene 01: the inbox that buries the invoice ---------- */

const PILE = [
  ["Q4 planning: agenda", "Mon"],
  ["Re: creative feedback round 3", "Mon"],
  ["Your weekly analytics digest", "Sun"],
  ["Contract renewal, please sign", "Sat"],
  ["Team offsite: who's in?", "Fri"],
];

export function InboxPile({ layout }: { layout: LoopLayout }) {
  return (
    <>
      {layout.pile.map((p, i) => (
        <div
          key={PILE[i][0]}
          data-pile
          className="absolute top-0 left-0 opacity-0"
          style={{ transform: `translate(${layout.ring.x + p.dx}px, ${layout.ring.y + p.dy}px)`, zIndex: 5 }}
        >
          <div
            data-pile-box
            className="absolute top-0 left-0 flex h-[46px] -translate-x-1/2 -translate-y-1/2 items-center gap-3 rounded-[12px] border border-line bg-white px-4 text-[12px] shadow-[0_0.5rem_1.5rem_rgba(20,20,40,0.08)]"
            style={{ width: layout.pileW, rotate: `${p.rotate}deg` }}
          >
            <span className="size-2 shrink-0 rounded-full bg-[#d4d4da]" />
            <span className="truncate font-medium text-ink-2">{PILE[i][0]}</span>
            <span className="ml-auto font-mono text-[10.5px] text-faint">{PILE[i][1]}</span>
          </div>
        </div>
      ))}
    </>
  );
}

/* ---------- The status chip ---------- */

export function StatusChip({ layout }: { layout: LoopLayout }) {
  const { x, y } = layout.chip;
  return (
    <div className="absolute top-0 left-0" style={{ transform: `translate(${x}px, ${y}px)`, zIndex: 6 }}>
      <div
        data-chip-wait
        className="absolute top-0 left-0 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-[12px] whitespace-nowrap text-muted opacity-0 shadow-sm"
      >
        <Clock size={13} className="text-faint" />
        No reminder sent
        <span className="font-mono font-semibold text-ink">
          <span data-chip-wait-value>0</span> days overdue
        </span>
      </div>
      <div
        data-chip-lane
        className="absolute top-0 left-0 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-ink px-3.5 py-1.5 text-[12px] whitespace-nowrap text-white/70 opacity-0 shadow-sm"
      >
        <span className="size-2 rounded-full bg-lane" />
        Invoice #1084
        <span data-chip-lane-value className="font-semibold text-white">
          Watching
        </span>
      </div>
    </div>
  );
}

/* ---------- The Loop: stations, the payment marker ---------- */

export function LoopMarks({ layout }: { layout: LoopLayout }) {
  const { ring } = layout;
  const outward = (f: number, d: number) => {
    const p = around(layout, f);
    const len = Math.hypot(p.x - ring.x, p.y - ring.y);
    return { x: p.x + ((p.x - ring.x) / len) * d, y: p.y + ((p.y - ring.y) / len) * d };
  };
  const paid = around(layout, PAID_AT);
  return (
    <>
      {REMINDERS.map((r, i) => {
        const p = around(layout, STATIONS[i]);
        const label = outward(STATIONS[i], 26);
        return (
          <div key={r.when} data-station className="absolute top-0 left-0 opacity-0" style={{ zIndex: 2 }}>
            <span
              data-station-dot
              className="absolute top-0 left-0 size-[14px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white bg-lane shadow-sm"
              style={{ left: p.x, top: p.y }}
            />
            <span
              className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white px-2 py-0.5 font-mono text-[10.5px] font-semibold whitespace-nowrap text-ink shadow-sm"
              style={{ left: label.x, top: label.y }}
            >
              {r.when}
            </span>
          </div>
        );
      })}
      <div data-paid-mark className="absolute top-0 left-0 opacity-0" style={{ transform: `translate(${paid.x}px, ${paid.y}px)`, zIndex: 2 }}>
        <span className="absolute top-0 left-0 flex size-[24px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-emerald-600 text-white shadow-sm">
          <Check size={13} strokeWidth={3.5} />
        </span>
      </div>
    </>
  );
}

function CardFace({ i, compact }: { i: number; compact: boolean }) {
  const r = REMINDERS[i];
  return (
    <div className={`absolute inset-x-0 top-0 ${compact ? "px-4 pt-3" : "p-4"}`}>
      <div className="flex items-center justify-between font-mono text-[10.5px] font-semibold tracking-wide uppercase">
        <span className="text-lane">{r.when}</span>
        <span className="text-faint">{r.tone}</span>
      </div>
      <div className="mt-1 text-[13.5px] font-semibold text-ink">{r.title}</div>
    </div>
  );
}

/* ---------- The invoice: one shape, five faces ---------- */

export function Invoice({ layout }: { layout: LoopLayout }) {
  const { invoice, draft } = layout;
  const c0 = layout.cards[0];
  const compact = layout.key === "mobile";
  const status = compact ? "bottom-3 left-4" : "bottom-4 left-4";
  return (
    <div data-inv className="pointer-events-none absolute top-0 left-0" style={{ zIndex: 4 }}>
      <div
        data-inv-box
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 overflow-hidden border bg-white shadow-[0_1rem_2.5rem_rgba(20,20,40,0.12)]"
        style={{ width: invoice.w, height: invoice.h, borderRadius: 18, borderColor: "#ececef" }}
      >
        {/* 1 · the invoice */}
        <div data-face-invoice className="absolute top-0 left-0 flex flex-col p-5" style={{ width: invoice.w, height: invoice.h }}>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-[13px] font-semibold text-ink">
              <FileText size={15} className="text-faint" />
              Invoice #1084
            </span>
            <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-semibold text-amber-700">Open</span>
          </div>
          <div className="mt-3 text-[12px] text-muted">Meridian Health · October retained services</div>
          <div className="mt-2 font-mono text-[30px] font-semibold tracking-[-0.03em] text-ink">$12,400.00</div>
          <div className="mt-auto flex items-center justify-between border-t border-line pt-3 text-[11px]">
            <span className="text-ink-2">
              Due <span className="font-semibold">Oct 15</span>
            </span>
            <span className="text-faint">Illustrative example</span>
          </div>
        </div>

        {/* 2 · Lane's dark core */}
        <span data-inv-dot className="absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lane opacity-0" />

        {/* 3 · the ledger panel, one row per check */}
        <div data-inv-head className="absolute top-0 left-0 flex items-center gap-1.5 px-4 text-[13px] font-semibold text-white opacity-0" style={{ width: PANEL.w, height: PANEL.head }}>
          <span className="size-2 rounded-full bg-lane" />
          Watching the ledger
          <span className="ml-auto font-mono text-[10px] font-normal text-white/55">
            <span data-check-count>0</span>/4
          </span>
        </div>
        {CHECKS.map((name, i) => (
          <div
            key={name}
            data-inv-row
            className="absolute left-0 flex items-center gap-2.5 px-4 text-[12px] text-white/85 opacity-0"
            style={{ top: PANEL.head + i * PANEL.row, width: PANEL.w, height: PANEL.row }}
          >
            <span data-inv-tick className="flex">
              <Tick dark />
            </span>
            {name}
          </div>
        ))}

        {/* 4 · the courtesy reminder, waiting for you */}
        <div data-face-draft className="absolute top-0 left-0 flex flex-col p-5" style={{ width: draft.w, height: draft.h }}>
          <div data-draft-part className="flex items-center justify-between opacity-0">
            <span className="text-[14px] font-semibold text-ink">Reminder · T−3 days</span>
            <span className="flex items-center gap-1.5 rounded-full bg-lane/10 px-2.5 py-0.5 text-[11px] font-semibold text-lane">
              <Sparkles size={11} />
              Warm &amp; helpful
            </span>
          </div>
          <div data-draft-part className="mt-3 space-y-1 border-y border-line py-2.5 text-[11.5px] opacity-0">
            <div className="flex gap-3">
              <span className="w-12 shrink-0 text-faint">From</span>
              <span className="truncate text-ink-2">billing@youragency.com</span>
            </div>
            <div className="flex gap-3">
              <span className="w-12 shrink-0 text-faint">To</span>
              <span className="truncate text-ink-2">Elena · Meridian Health</span>
            </div>
            <div className="flex gap-3">
              <span className="w-12 shrink-0 text-faint">Subject</span>
              <span className="truncate font-medium text-ink">Upcoming invoice #1084 for October retained services</span>
            </div>
          </div>
          <div className="mt-3 space-y-2 text-[12.5px] leading-snug text-ink-2">
            <p data-draft-part className="opacity-0">Hi Elena,</p>
            <p data-draft-part className="opacity-0">
              Just a quick courtesy note that invoice #1084 ($12,400) is scheduled for October 15th. You can review the itemized
              breakdown or remit via the 1-click card/ACH link below.
            </p>
            <div data-draft-part className="flex flex-wrap items-center gap-2 opacity-0">
              <span className="inline-flex items-center gap-1.5 rounded-[6px] bg-ink px-2.5 py-1 text-[11.5px] font-semibold text-white">
                <CreditCard size={12} className="text-lane" />
                Pay $12,400
              </span>
              <span className="text-[11px] text-muted">Card · ACH · Apple Pay</span>
              <span className="inline-flex items-center gap-1 rounded-[6px] border border-line bg-surface px-2 py-0.5 text-[11px] text-ink-2">
                <FileText size={11} />
                Invoice PDF
              </span>
            </div>
          </div>
          <div data-draft-part className="mt-auto flex items-center justify-between gap-3 opacity-0">
            <span className="text-[11.5px] text-muted">Lane drafted it. You decide.</span>
            <div data-approve className="relative h-[38px] w-[140px] shrink-0 overflow-hidden rounded-[8px] bg-btn text-[12.5px] font-semibold text-white">
              <span data-approve-idle className="absolute inset-0 flex items-center justify-center">
                Approve &amp; send
              </span>
              <span data-approve-done className="absolute inset-0 flex items-center justify-center gap-1.5 opacity-0">
                <Check size={14} strokeWidth={3} />
                Approved, sent
              </span>
            </div>
          </div>
        </div>

        {/* 5 · the first card on the Loop */}
        <div data-face-card className="absolute top-0 left-0 opacity-0" style={{ width: c0.w, height: c0.h }}>
          <CardFace i={0} compact={compact} />
          <span className={`absolute ${status} flex items-center gap-1.5 text-[11.5px] font-medium text-emerald-600`}>
            <Check size={13} strokeWidth={3} />
            Sent · approved by you
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Reminders 2 and 3 ---------- */

export function Reminders({ layout }: { layout: LoopLayout }) {
  const compact = layout.key === "mobile";
  const status = compact ? "bottom-3 left-4" : "bottom-4 left-4";
  const ends = [
    { text: "Sent · approved by you", tone: "text-emerald-600", tick: true },
    { text: "Cancelled · invoice paid", tone: "text-faint line-through", tick: false },
  ];
  return (
    <>
      {[1, 2].map((i) => (
        <div
          key={i}
          data-card
          className="absolute rounded-[18px] border border-line bg-white opacity-0 shadow-[0_0.75rem_2rem_rgba(20,20,40,0.08)]"
          style={{ ...at(layout.cards[i]), zIndex: 3 }}
        >
          <CardFace i={i} compact={compact} />
          <span data-card-queued className={`absolute ${status} flex items-center gap-1.5 text-[11.5px] font-medium text-amber-600`}>
            <Clock size={13} />
            Queued · needs your approval
          </span>
          <span data-card-end className={`absolute ${status} flex items-center gap-1.5 text-[11.5px] font-medium opacity-0 ${ends[i - 1].tone}`}>
            {ends[i - 1].tick && <Check size={13} strokeWidth={3} />}
            {ends[i - 1].text}
          </span>
        </div>
      ))}
    </>
  );
}

/* ---------- Scene 06: the payment; scene 07: the audit note it grows into ---------- */

export function Paid({ layout }: { layout: LoopLayout }) {
  return (
    <div
      data-paid
      className="absolute flex flex-col overflow-hidden rounded-[18px] border border-line bg-white p-4 opacity-0 shadow-[0_1.25rem_3rem_rgba(20,20,40,0.12)]"
      style={{ ...at(layout.paid), zIndex: 5 }}
    >
      <div className="flex items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
          <Check size={19} strokeWidth={3} />
        </span>
        <div className="min-w-0">
          <div className="font-mono text-[15px] font-semibold text-ink">$12,400 received</div>
          <div className="text-[11.5px] text-muted">Meridian Health · cleared in Stripe</div>
        </div>
      </div>
      <ul className="mt-3 space-y-2 border-t border-line pt-3 text-[11.5px] text-ink-2">
        <li data-paid-row className="flex items-center gap-2 opacity-0">
          <Tick />
          Invoice #1084 marked paid
        </li>
        <li data-paid-row className="flex items-center gap-2 opacity-0">
          <Tick />
          Escalation reminder cancelled
        </li>
        <li data-paid-row className="flex items-center gap-2 opacity-0">
          <Tick />
          Loop closed within 60 seconds
        </li>
      </ul>

      {/* Scene 07: revealed as the card grows into the audit note */}
      <div className="mt-4 border-t border-line pt-4">
        <div data-audit-part className="flex items-center gap-1.5 font-mono text-[10.5px] font-semibold tracking-wide text-lane uppercase opacity-0">
          Audit note posted
        </div>
        <div data-audit-part className="mt-3 rounded-[12px] border border-line p-3 opacity-0">
          <div className="flex items-center gap-1 text-[11.5px] font-semibold text-ink">
            <Hash size={12} className="text-faint" />
            billing-ledger
            <span className="ml-auto text-[10.5px] font-normal text-faint">Slack</span>
          </div>
          <div className="mt-2.5 flex gap-2.5">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-[8px] bg-ink">
              <span className="size-2 rounded-full bg-lane" />
            </span>
            <div className="min-w-0 text-[11.5px] leading-snug text-ink-2">
              <div className="font-semibold text-ink">Lane</div>
              Invoice #1084 paid in full: $12,400 from Meridian Health. 2 reminders sent, both approved by you. Escalation cancelled.
            </div>
          </div>
        </div>
        <div data-audit-part className="mt-3 flex flex-wrap items-center gap-2 text-[11px] opacity-0">
          <span data-audit-chip className="rounded-full bg-surface px-2.5 py-1 font-medium text-muted">
            Reconciled in QuickBooks
          </span>
          <span className="rounded-full bg-surface px-2.5 py-1 font-medium text-muted">Status: Paid</span>
        </div>
      </div>
    </div>
  );
}
