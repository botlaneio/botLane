import Link from "next/link";
import { SYSTEMS } from "@/content/systems";
import { DemoButton, Section, SectionHeading } from "./page/parts";
import { ToolLogo, TOOL_NAMES } from "./tool-logo";

// Home page sections between the board and the pricing preview.

/** Works with your tools: every connected tool, grouped by system. */
export function WorksWithYourTools() {
  return (
    <Section id="tools" className="border-t border-line">
      <SectionHeading
        eyebrow="Works with your tools"
        title="No new software. Lane works in yours."
        lead="Lane connects to the accounts you already use, and works through them on your behalf."
      />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {SYSTEMS.map((s) => (
          <div key={s.slug} className="rounded-[20px] border border-line bg-white p-6">
            <div className="font-mono text-xs text-lane">
              {s.num} · {s.title.toUpperCase()}
            </div>
            <ul className="mt-5 flex flex-col gap-3">
              {s.tools.map((t) => (
                <li key={t} className="flex items-center gap-3 text-[15px]">
                  <span className="flex size-8 flex-none items-center justify-center rounded-[9px] border border-line bg-white">
                    <ToolLogo tool={t} size={18} />
                  </span>
                  {TOOL_NAMES[t]}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

const SAVES = [
  {
    system: "Client reporting",
    before: "Monday mornings copying numbers between tabs.",
    after: "Reports drafted, summarised and waiting for your OK.",
  },
  {
    system: "Lead follow-up",
    before: "Enquiries waiting hours, and follow-ups that never happen.",
    after: "Every lead answered fast, and followed up until they book.",
  },
  {
    system: "Invoice follow-up",
    before: "Awkward chasing, and invoices that slip for weeks.",
    after: "Polite, steady reminders that stop the moment they pay.",
  },
];

/** What it saves you: before and after, per system. */
export function WhatItSaves() {
  return (
    <Section id="saves" className="border-t border-line">
      <SectionHeading eyebrow="What it saves you" title="The work you dread, done before you get to it." />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {SAVES.map((s) => (
          <div key={s.system} className="flex flex-col rounded-[20px] border border-line bg-white p-6">
            <div className="text-lg font-semibold tracking-[-0.01em]">{s.system}</div>
            <div className="mt-5 text-xs font-medium tracking-[0.06em] text-faint uppercase">Before</div>
            <p className="mt-1 text-[15px] leading-relaxed text-muted line-through decoration-[#c7c7cc]">{s.before}</p>
            <div className="mt-4 text-xs font-medium tracking-[0.06em] text-lane uppercase">With Lane</div>
            <p className="mt-1 text-[15px] leading-relaxed text-ink">{s.after}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

const START = [
  { title: "Book a demo", body: "A short call about the work that eats your week, and which system would help most." },
  { title: "We map how you do it", body: "Your tools, your clients, your tone. We set Lane up to work the way you already do." },
  { title: "Connect your tools", body: "You connect your accounts. Lane only gets the access it needs for the system you chose." },
  { title: "Lane starts, you approve", body: "Lane begins on one system. You approve the first runs and add more when you’re ready." },
];

/** How getting started works. */
export function GettingStarted() {
  return (
    <Section id="getting-started" className="border-t border-line">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading eyebrow="How getting started works" title="From first call to first run." />
        <DemoButton />
      </div>
      <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {START.map((s, i) => (
          <li key={s.title} className="relative rounded-[20px] border border-line bg-white p-6">
            <span className="flex size-8 items-center justify-center rounded-full border-[1.5px] border-[#d2d2d7] text-sm font-semibold">{i + 1}</span>
            <h3 className="mt-4 text-lg font-semibold tracking-[-0.01em]">{s.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function PricingLink() {
  return (
    <div className="-mt-16 pb-12 text-center">
      <Link href="/pricing" className="text-base font-medium hover:underline">
        See full pricing →
      </Link>
    </div>
  );
}
