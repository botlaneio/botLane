import { Check, FileText, Send } from "lucide-react";
import type { Box, StoryLayout } from "./layout";

/** Scene 05 review panel, Scene 06 client inbox, and the report thumbnail that travels between them. */

const at = (b: Box) => ({ left: b.x - b.w / 2, top: b.y - b.h / 2, width: b.w, height: b.h });

function Tick() {
  return (
    <span className="flex size-[18px] shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
      <Check size={11} strokeWidth={3} />
    </span>
  );
}

export function ReviewPanel({ layout }: { layout: StoryLayout }) {
  return (
    <div
      data-review
      className="absolute flex flex-col rounded-[20px] border border-line bg-white p-5 opacity-0 shadow-[0_1.5rem_4rem_rgba(20,20,40,0.12)]"
      style={{ ...at(layout.panel), zIndex: 5 }}
    >
      <div className="font-mono text-[10px] uppercase tracking-wider text-lane">Review</div>
      <div className="mt-1 text-[15px] font-semibold text-ink">Weekly report, Meridian Health</div>
      <div className="text-[11.5px] text-muted">Prepared by Lane · waiting for you</div>

      <ul className="mt-4 space-y-2.5 text-[12px]">
        <li data-review-row className="flex items-center gap-2.5 text-ink-2 opacity-0">
          <Tick />
          Numbers reconciled across 5 sources
        </li>
        <li data-review-row data-review-exc className="relative -mx-2 h-[34px] rounded-[10px] border border-transparent px-2 opacity-0">
          <span data-exc-open className="absolute inset-0 flex items-center gap-2.5 px-2 text-amber-700">
            <span className="flex size-[18px] shrink-0 items-center justify-center rounded-full bg-amber-100 font-bold text-[11px]">!</span>
            1 exception: GA4 data missing Oct 9
          </span>
          <span data-exc-closed className="absolute inset-0 flex items-center gap-2.5 px-2 text-ink-2 opacity-0">
            <Tick />
            Exception resolved and checked
          </span>
        </li>
        <li data-review-row className="flex items-center gap-2.5 text-ink-2 opacity-0">
          <Tick />
          Commentary drafted in your tone
        </li>
      </ul>

      <div className="mt-auto">
        <div data-approve className="relative h-[42px] w-full overflow-hidden rounded-[8px] bg-btn text-[13px] font-semibold text-white">
          <span data-approve-idle className="absolute inset-0 flex items-center justify-center">
            Approve &amp; send
          </span>
          <span data-approve-done className="absolute inset-0 flex items-center justify-center gap-2 opacity-0">
            <Check size={15} strokeWidth={3} />
            Approved
          </span>
        </div>
        <div data-delivery-started className="mt-3 flex items-center gap-2 text-[11.5px] text-muted opacity-0">
          <Send size={13} className="text-lane" />
          Delivery started · PDF and web link
        </div>
      </div>
    </div>
  );
}

const HISTORY = [
  { title: "Weekly report", date: "Oct 6" },
  { title: "Monthly summary", date: "Sep 30" },
  { title: "Weekly report", date: "Sep 29" },
  { title: "Weekly report", date: "Sep 22" },
];

export function InboxPanel({ layout }: { layout: StoryLayout }) {
  const compact = layout.key === "mobile";
  return (
    <div
      data-inbox
      className="absolute flex flex-col rounded-[20px] border border-line bg-white p-5 opacity-0 shadow-[0_1.5rem_4rem_rgba(20,20,40,0.12)]"
      style={{ ...at(layout.panel), zIndex: 5 }}
    >
      <div className="font-mono text-[10px] uppercase tracking-wider text-lane">Client inbox</div>
      <div className="mt-1 text-[15px] font-semibold text-ink">sarah@meridianhealth.com</div>

      <div data-inbox-new className="mt-4 flex h-[46px] items-center gap-3 rounded-[12px] border border-emerald-200 bg-emerald-50/60 px-3 opacity-0">
        <FileText size={16} className="shrink-0 text-lane" />
        <div className="min-w-0 flex-1">
          <div className="truncate text-[12px] font-semibold text-ink">Weekly performance report</div>
          <div className="text-[10.5px] text-muted">Oct 13 · PDF + web link</div>
        </div>
        <span className="flex items-center gap-1 text-[10.5px] font-semibold text-emerald-700">
          <Check size={12} strokeWidth={3} />
          Delivered
        </span>
      </div>

      <div className="mt-4 font-mono text-[10px] uppercase tracking-wider text-muted">Reporting history</div>
      <ul className="mt-2 divide-y divide-line text-[11.5px]">
        {HISTORY.slice(0, compact ? 3 : 4).map((h) => (
          <li key={h.title + h.date} data-inbox-row className="flex items-center justify-between py-2 opacity-0">
            <span className="text-ink-2">{h.title}</span>
            <span className="flex items-center gap-1.5 text-muted">
              {h.date}
              <Check size={12} className="text-emerald-600" />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ReportThumb({ layout }: { layout: StoryLayout }) {
  return (
    <div data-thumb className="absolute top-0 left-0 opacity-0" style={{ transform: `translate(${layout.thumbFrom.x}px, ${layout.thumbFrom.y}px)`, zIndex: 6 }}>
      <div className="absolute top-0 left-0 w-[84px] -translate-x-1/2 -translate-y-1/2 rounded-[10px] border border-line bg-white p-2 shadow-[0_0.75rem_2rem_rgba(20,20,40,0.16)]">
        <div className="h-1.5 w-8 rounded-full bg-lane" />
        <div className="mt-2 space-y-1">
          <div className="h-1 rounded-full bg-line" />
          <div className="h-1 w-4/5 rounded-full bg-line" />
          <div className="h-1 w-3/5 rounded-full bg-line" />
        </div>
        <svg className="mt-2" width="66" height="22" viewBox="0 0 66 22" aria-hidden>
          <path d="M1 19 L12 15 L22 17 L33 10 L44 12 L55 5 L65 2" fill="none" stroke="#e0312b" strokeWidth="1.6" />
        </svg>
      </div>
    </div>
  );
}
