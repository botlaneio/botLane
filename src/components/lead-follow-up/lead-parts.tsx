import { CalendarCheck, Check, Clock, Sparkles } from "lucide-react";
import { PANEL, TICKS, along, type Box, type LeadLayout } from "./layout";

/**
 * The pieces of the Lead follow-up story. The lead itself is one shape (Lead) that never
 * swaps out: it is the enquiry, then Lane's dark core, then the research panel, then the
 * draft reply, then the first card on the Line. Its faces are stacked and cross-faded.
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

export const CHECKS = [
  "Company site reviewed",
  "Headcount verified",
  "Tech stack detected",
  "Budget meets your threshold",
  "Angle: conversion tracking",
];

/* ---------- The Line: hour ticks, the waiting dot, Lane's marker, stations, booking marker ---------- */

export function LineMarks({ layout }: { layout: LeadLayout }) {
  const end = along(layout, 1);
  const start = along(layout, 0);
  const booked = along(layout, layout.bookedAt);
  return (
    <>
      {TICKS.map(([f, label]) => {
        const p = along(layout, f);
        return (
          <div key={label} data-tick className="absolute top-0 left-0 opacity-0" style={{ transform: `translate(${p.x}px, ${p.y}px)`, zIndex: 2 }}>
            <span className="absolute top-0 left-0 size-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#cfcfd6]" />
            <span className="absolute top-[12px] left-0 -translate-x-1/2 font-mono text-[11px] whitespace-nowrap text-faint">{label}</span>
          </div>
        );
      })}

      {/* Scene 01: the enquiry waits; the dot crawls along the hours */}
      <div data-wait-dot className="absolute top-0 left-0 opacity-0" style={{ zIndex: 2 }}>
        <span className="absolute top-0 left-0 size-[13px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#a1a1aa] shadow-sm" />
      </div>
      <div
        data-typical
        className="absolute top-0 left-0 opacity-0"
        style={{ transform: `translate(${end.x}px, ${end.y - 30}px)`, zIndex: 2 }}
      >
        <span className="absolute right-[-8px] bottom-0 flex items-center gap-1.5 rounded-[8px] border border-line bg-white px-2.5 py-1 text-[11.5px] whitespace-nowrap text-muted">
          Typical reply: 4+ hours
        </span>
      </div>

      {/* Scene 02: Lane's reply lands at the start of the Line */}
      <div data-lane-mark className="absolute top-0 left-0 opacity-0" style={{ transform: `translate(${start.x}px, ${start.y}px)`, zIndex: 2 }}>
        <span data-lane-mark-dot className="absolute top-0 left-0 size-[15px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white bg-lane shadow-sm" />
        <span className="absolute bottom-[16px] left-[-10px] rounded-[8px] bg-ink px-2.5 py-1 text-[11.5px] font-semibold whitespace-nowrap text-white">
          Lane: under 3 minutes
        </span>
      </div>

      {/* Scene 05: the cadence stations */}
      {(["Minute 3", "Day 2", "Day 5"] as const).map((label, i) => {
        const p = along(layout, layout.stations[i]);
        return (
          <div key={label} data-station className="absolute top-0 left-0 opacity-0" style={{ transform: `translate(${p.x}px, ${p.y}px)`, zIndex: 2 }}>
            <span data-station-dot className="absolute top-0 left-0 size-[13px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white bg-lane shadow-sm" />
            <span className="absolute top-[12px] left-0 -translate-x-1/2 font-mono text-[11px] font-semibold whitespace-nowrap text-ink">{label}</span>
          </div>
        );
      })}

      {/* Scene 06: where the call was booked */}
      <div data-book-mark className="absolute top-0 left-0 opacity-0" style={{ transform: `translate(${booked.x}px, ${booked.y}px)`, zIndex: 2 }}>
        <span className="absolute top-0 left-0 flex size-[22px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-emerald-600 text-white shadow-sm">
          <Check size={12} strokeWidth={3.5} />
        </span>
      </div>
    </>
  );
}

/* ---------- The response clock ---------- */

export function ResponseClock({ layout }: { layout: LeadLayout }) {
  const { x, y } = layout.clock;
  return (
    <div className="absolute top-0 left-0" style={{ transform: `translate(${x}px, ${y}px)`, zIndex: 5 }}>
      <div
        data-clock-wait
        className="absolute top-0 left-0 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-[12px] whitespace-nowrap text-muted opacity-0 shadow-sm"
      >
        <Clock size={13} className="text-faint" />
        No reply yet
        <span data-clock-wait-value className="font-mono font-semibold text-ink">
          0h 00m
        </span>
      </div>
      <div
        data-clock-lane
        className="absolute top-0 left-0 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-ink px-3.5 py-1.5 text-[12px] whitespace-nowrap text-white/70 opacity-0 shadow-sm"
      >
        <span className="size-2 rounded-full bg-lane" />
        Response clock
        <span data-clock-lane-value className="font-mono font-semibold text-white">
          0:00
        </span>
      </div>
    </div>
  );
}

/* ---------- The lead: one shape, five faces ---------- */

export function Lead({ layout }: { layout: LeadLayout }) {
  const { form, draft } = layout;
  const t0 = layout.touches[0];
  return (
    <div data-lead className="pointer-events-none absolute top-0 left-0" style={{ zIndex: 4 }}>
      <div
        data-lead-box
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 overflow-hidden border bg-white shadow-[0_1rem_2.5rem_rgba(20,20,40,0.12)]"
        style={{ width: form.w, height: form.h, borderRadius: 18, borderColor: "#ececef" }}
      >
        {/* 1 · the enquiry as it arrives */}
        <div data-face-form className="absolute top-0 left-0 flex flex-col p-5" style={{ width: form.w, height: form.h }}>
          <div className="flex items-center justify-between text-[11.5px] text-muted">
            <span className="flex items-center gap-2 font-semibold text-ink">
              <span className="size-2 rounded-full bg-lane" />
              New enquiry · Website form
            </span>
            <span className="font-mono">09:41</span>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-surface text-[12px] font-semibold text-ink">MC</span>
            <div className="min-w-0">
              <div className="text-[14px] font-semibold text-ink">Marcus Chen</div>
              <div className="text-[12px] text-muted">VP Growth · Acme SaaS</div>
            </div>
          </div>
          <p className="mt-3 text-[12.5px] leading-snug text-ink-2">
            &ldquo;We&rsquo;re scaling paid acquisition for our Q4 launch and need help with conversion tracking.&rdquo;
          </p>
          <div className="mt-auto flex items-center justify-between text-[11px]">
            <span className="rounded-[6px] bg-surface px-2 py-0.5 font-medium text-ink-2">Budget $25k+/mo</span>
            <span className="text-faint">Illustrative example</span>
          </div>
        </div>

        {/* 2 · caught: Lane's dark core */}
        <span data-lead-dot className="absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lane opacity-0" />

        {/* 3 · the research panel, one row per check */}
        <div data-lead-head className="absolute top-0 left-0 flex items-center gap-1.5 px-4 text-[13px] font-semibold text-white opacity-0" style={{ width: PANEL.w, height: PANEL.head }}>
          <span className="size-2 rounded-full bg-lane" />
          Researching Acme
          <span className="ml-auto font-mono text-[10px] font-normal text-white/55">
            <span data-check-count>0</span>/5 checks
          </span>
        </div>
        {CHECKS.map((name, i) => (
          <div
            key={name}
            data-lead-row
            className="absolute left-0 flex items-center gap-2.5 px-4 text-[12px] text-white/85 opacity-0"
            style={{ top: PANEL.head + i * PANEL.row, width: PANEL.w, height: PANEL.row }}
          >
            <span data-lead-tick className="flex">
              <Tick dark />
            </span>
            {name}
          </div>
        ))}

        {/* 4 · the draft reply, waiting for you */}
        <div data-face-draft className="absolute top-0 left-0 flex flex-col p-5" style={{ width: draft.w, height: draft.h }}>
          <div data-draft-part className="flex items-center justify-between opacity-0">
            <span className="text-[14px] font-semibold text-ink">Draft reply · Touch 1</span>
            <span className="flex items-center gap-1.5 rounded-full bg-lane/10 px-2.5 py-0.5 text-[11px] font-semibold text-lane">
              <Sparkles size={11} />
              In your tone
            </span>
          </div>
          <div data-draft-part className="mt-3 space-y-1 border-y border-line py-2.5 text-[11.5px] opacity-0">
            <div className="flex gap-3">
              <span className="w-12 shrink-0 text-faint">From</span>
              <span className="truncate text-ink-2">hello@youragency.com</span>
            </div>
            <div className="flex gap-3">
              <span className="w-12 shrink-0 text-faint">To</span>
              <span className="truncate text-ink-2">Marcus Chen · Acme SaaS</span>
            </div>
            <div className="flex gap-3">
              <span className="w-12 shrink-0 text-faint">Subject</span>
              <span className="truncate font-medium text-ink">Re: Partnership inquiry from Acme Corp</span>
            </div>
          </div>
          <div className="mt-3 space-y-2 text-[12.5px] leading-snug text-ink-2">
            <p data-draft-part className="opacity-0">Hi Marcus,</p>
            <p data-draft-part className="opacity-0">
              Saw your note on scaling paid acquisition for Acme&rsquo;s Q4 launch. Took a quick look at your current Meta library and
              spotted two quick wins on conversion tracking.
            </p>
            <p data-draft-part className="opacity-0">Do you have 15 minutes this Thursday to compare notes?</p>
            <p data-draft-part className="opacity-0">
              <span className="inline-flex items-center gap-1.5 rounded-[6px] border border-line bg-surface px-2 py-0.5 text-[11.5px] font-medium text-ink">
                <CalendarCheck size={12} className="text-lane" />
                Your calendar link
              </span>
            </p>
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

        {/* 5 · the first card on the Line */}
        <div data-face-touch className="absolute top-0 left-0 opacity-0" style={{ width: t0.w, height: t0.h }}>
          <TouchFace when="Minute 3" title="Touch 1 · Tailored reply" />
          <span className="absolute bottom-4 left-4 flex items-center gap-1.5 text-[11.5px] font-medium text-emerald-600">
            <Check size={13} strokeWidth={3} />
            Sent · approved by you
          </span>
        </div>
      </div>
    </div>
  );
}

function TouchFace({ when, title }: { when: string; title: string }) {
  return (
    <div className="absolute inset-x-0 top-0 p-4">
      <div className="font-mono text-[10.5px] font-semibold tracking-wide text-lane uppercase">{when}</div>
      <div className="mt-1 text-[13.5px] font-semibold text-ink">{title}</div>
    </div>
  );
}

/* ---------- Touches 2 and 3 ---------- */

export function Touches({ layout }: { layout: LeadLayout }) {
  const cards = [
    { when: "Day 2", title: "Touch 2 · Value nudge", end: "Sent · approved by you", endTone: "text-emerald-600" },
    { when: "Day 5", title: "Touch 3 · Polite check-in", end: "Cancelled · call booked", endTone: "text-faint line-through" },
  ];
  return (
    <>
      {cards.map((c, i) => (
        <div
          key={c.when}
          data-touch
          className="absolute rounded-[18px] border border-line bg-white opacity-0 shadow-[0_0.75rem_2rem_rgba(20,20,40,0.08)]"
          style={{ ...at(layout.touches[i + 1]), zIndex: 3 }}
        >
          <TouchFace when={c.when} title={c.title} />
          <span data-touch-queued className="absolute bottom-4 left-4 flex items-center gap-1.5 text-[11.5px] font-medium text-amber-600">
            <Clock size={13} />
            Queued · needs your approval
          </span>
          <span data-touch-end className={`absolute bottom-4 left-4 flex items-center gap-1.5 text-[11.5px] font-medium opacity-0 ${c.endTone}`}>
            {i === 0 && <Check size={13} strokeWidth={3} />}
            {c.end}
          </span>
        </div>
      ))}
    </>
  );
}

/* ---------- Scene 06: the booked call ---------- */

export function Booked({ layout }: { layout: LeadLayout }) {
  return (
    <div
      data-booked
      className="absolute flex flex-col rounded-[18px] border border-line bg-white p-4 opacity-0 shadow-[0_1.25rem_3rem_rgba(20,20,40,0.12)]"
      style={{ ...at(layout.booked), zIndex: 5 }}
    >
      <div className="flex items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-lane text-white">
          <CalendarCheck size={19} />
        </span>
        <div className="min-w-0">
          <div className="text-[14px] font-semibold text-ink">Discovery call booked</div>
          <div className="text-[11.5px] text-muted">Marcus Chen · Thursday, 10:00</div>
        </div>
      </div>
      <ul className="mt-3 space-y-2 border-t border-line pt-3 text-[11.5px] text-ink-2">
        <li data-booked-row className="flex items-center gap-2 opacity-0">
          <Tick />
          On your calendar
        </li>
        <li data-booked-row className="flex items-center gap-2 opacity-0">
          <Tick />
          HubSpot deal moved to Discovery booked
        </li>
        <li data-booked-row className="flex items-center gap-2 opacity-0">
          <Tick />
          Remaining follow-ups cancelled
        </li>
      </ul>
    </div>
  );
}
