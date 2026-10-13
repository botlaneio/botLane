import type { FlowCard } from "@/content/systems";
import { LaneMark } from "./lane-mark";
import { ToolLogo } from "./tool-logo";
import "./system-flow.css";

// A system's workflow as four columns: Input → Automation → Approval → Output.
// With `tilt`, the board leans back in 3D and the cards rise into place on load
// (the Client Reporting hero). Without it, it sits flat as a "how it works" figure.

const card = "rounded-[18px] border border-line bg-white shadow-[0_10px_26px_rgba(20,20,40,0.07)]";

function Check() {
  return (
    <span className="flex size-[18px] flex-none items-center justify-center rounded-[5px] bg-ink">
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 12.5l4.5 4.5L19 7.5" />
      </svg>
    </span>
  );
}

function Column({ n, card: c }: { n: number; card: FlowCard }) {
  return (
    <div className="sf-col flex flex-col gap-4 rounded-[24px] border border-[#e7e8ed] bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(255,255,255,0.6))] p-4 shadow-[inset_0_1px_0_#fff,0_24px_60px_rgba(20,20,40,0.05)]">
      <div className="flex items-center gap-2.5 px-1 pt-1">
        <span className="flex size-7 flex-none items-center justify-center rounded-full border-[1.5px] border-[#d2d2d7] bg-white text-[13px] font-semibold">{n}</span>
        <span className="text-[17px] font-semibold tracking-[-0.01em]">{c.title}</span>
      </div>

      {c.kind === "sources" && (
        <div className="flex flex-col gap-2.5">
          {c.items.map((it) => (
            <div key={it.name} className={`sf-card ${card} flex items-center gap-3 px-3.5 py-3`}>
              <span className="flex size-9 flex-none items-center justify-center rounded-[10px] border border-line bg-white">
                <ToolLogo tool={it.tool} size={20} />
              </span>
              <div className="min-w-0">
                <div className="text-[14px] font-semibold">{it.name}</div>
                <div className="truncate text-xs text-muted">{it.meta}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {c.kind === "run" && (
        <div className={`sf-card ${card} p-4`}>
          <div className="flex items-center justify-between">
            <LaneMark size={40} state="working" />
            <span className="rounded-full bg-[#fdeceb] px-2.5 py-1 text-xs font-medium text-lane-ink">Working</span>
          </div>
          <div className="mt-4 font-mono text-xs text-muted">{c.run}</div>
          <div className="mt-1 text-[16px] leading-snug font-semibold tracking-[-0.01em]">{c.task}</div>
          <div className="mt-4 flex flex-col gap-2.5">
            {c.steps.map((s) => (
              <div key={s} className="flex items-center gap-2.5 text-[13px]">
                <Check />
                {s}
              </div>
            ))}
          </div>
        </div>
      )}

      {c.kind === "approve" && (
        <div className={`sf-card ${card} p-4`}>
          <div className="flex items-center gap-3">
            <span className="flex size-10 flex-none items-center justify-center rounded-full border border-[#e6e6ea] bg-[#f0f0f3]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1d1d1f" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                <path d="M12 4.9a3.6 3.6 0 1 1 0 7.2a3.6 3.6 0 1 1 0-7.2z M5 20c1-3.6 3.8-5.6 7-5.6s6 2 7 5.6" />
              </svg>
            </span>
            <div>
              <div className="text-[15px] font-semibold">You</div>
              <div className="text-[13px] font-medium text-lane-ink">Awaiting your OK</div>
            </div>
          </div>
          <div className="mt-4 text-[15px] leading-snug font-semibold">{c.question}</div>
          <div className="mt-3 flex items-center gap-2.5 rounded-xl border border-line px-3 py-2.5">
            <ToolLogo tool={c.tool} size={18} />
            <div className="min-w-0">
              <div className="truncate text-[13px] font-semibold">{c.doc}</div>
              <div className="text-xs text-muted">{c.meta}</div>
            </div>
          </div>
          <div className="mt-3 flex h-10 items-center justify-center rounded-[8px] bg-ink text-[13px] font-medium text-white">{c.button}</div>
        </div>
      )}

      {c.kind === "output" && (
        <div className={`sf-card ${card} p-4`}>
          <div className="flex items-center gap-2 text-[13px] font-medium text-ok">
            <span className="flex size-[18px] items-center justify-center rounded-full bg-[#e8f5ec]">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#1a7f37" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
            </span>
            {c.status}
          </div>
          <div className="mt-3 flex items-center gap-2.5">
            <span className="flex size-9 flex-none items-center justify-center rounded-[10px] border border-line bg-white">
              <ToolLogo tool={c.tool} size={18} />
            </span>
            <div className="min-w-0">
              <div className="truncate text-[14px] font-semibold">{c.doc}</div>
              <div className="text-xs text-muted">{c.meta}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function SystemFlow({ flow, tilt = false }: { flow: FlowCard[]; tilt?: boolean }) {
  return (
    <div className={tilt ? "sf-stage" : ""}>
      <div className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ${tilt ? "sf-board" : ""}`}>
        {flow.map((c, i) => (
          <Column key={c.title} n={i + 1} card={c} />
        ))}
      </div>
    </div>
  );
}
