import { Check, Lock, UserRound } from "lucide-react";
import { STAGE_IDS, type StageId, type StoryLayout } from "./layout";

/** Scene 02 hub and Scene 03 stages. States are stacked and cross-faded by the timeline. */

const STAGES: Record<StageId, { name: string; pending: string; done: string }> = {
  collect: { name: "Collect", pending: "Waiting", done: "Data collected" },
  validate: { name: "Validate", pending: "Waiting", done: "Records consolidated" },
  structure: { name: "Structure", pending: "Waiting", done: "1 exception flagged" },
  review: { name: "Review", pending: "Waiting", done: "Approval requested" },
  deliver: { name: "Deliver", pending: "Waits for your approval", done: "Delivered" },
};

/** The hub's shapes: a small core, the panel the cards land in (one row each), the node it becomes. */
export const CORE = { start: 64, w: 224, head: 44, row: 30, pad: 12 };
export const SOURCES = ["Spend spreadsheet", "CRM", "Ad platforms", "Project board", "Client inbox"];

/**
 * Scene 02 hub: one dark shape that never swaps out. It starts as a small core with Lane's red
 * dot; as each card arrives the core opens into a panel and the card becomes a ticked row; then
 * the panel folds down to the size of a pipeline step and hands over to the Structure step.
 */
export function Hub({ layout }: { layout: StoryLayout }) {
  return (
    <div data-hub className="pointer-events-none absolute top-0 left-0 opacity-0" style={{ transform: `translate(${layout.hub.x}px, ${layout.hub.y}px)`, zIndex: 4 }}>
      <div
        data-core
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-ink text-white shadow-[0_1rem_2.5rem_rgba(20,20,40,0.18)]"
        style={{ width: CORE.start, height: CORE.start, borderRadius: CORE.start / 2 }}
      >
        <span data-core-dot className="absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lane" />
        <div data-core-head className="absolute top-0 left-0 flex items-center gap-1.5 px-4 text-[13px] font-semibold opacity-0" style={{ width: CORE.w, height: CORE.head }}>
          <span className="size-2 rounded-full bg-lane" />
          Lane
          <span className="ml-auto font-mono text-[10px] font-normal text-white/55">
            <span data-hub-count>0</span>/5 sources
          </span>
        </div>
        {SOURCES.map((name, i) => (
          <div
            key={name}
            data-core-row
            className="absolute left-0 flex items-center gap-2.5 px-4 text-[12px] text-white/85 opacity-0"
            style={{ top: CORE.head + i * CORE.row, width: CORE.w, height: CORE.row }}
          >
            <span data-core-tick className="flex size-[16px] shrink-0 items-center justify-center rounded-full bg-lane">
              <Check size={10} strokeWidth={3.5} />
            </span>
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Pipeline({ layout }: { layout: StoryLayout }) {
  const { w, h } = layout.node;
  return (
    <>
      {STAGE_IDS.map((id, i) => {
        const s = STAGES[id];
        return (
          <div key={id} data-node={id} className="absolute top-0 left-0 opacity-0" style={{ zIndex: 2 }}>
            <div
              data-node-box
              className="absolute top-0 left-0 flex -translate-x-1/2 -translate-y-1/2 flex-col justify-between rounded-[16px] border border-line bg-white p-3.5"
              style={{ width: w, height: h }}
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span
                    data-node-badge
                    className="flex size-[22px] items-center justify-center rounded-full bg-surface font-mono text-[10px] font-semibold text-muted"
                  >
                    0{i + 1}
                  </span>
                  <span className="text-[14px] font-semibold text-ink">{s.name}</span>
                </span>
                {id === "review" && <UserRound size={15} className="text-muted" aria-label="You" />}
                {id === "deliver" && <Lock size={14} className="text-faint" />}
              </div>
              <div className="relative h-[16px] text-[11.5px]">
                <span data-node-pending className="absolute inset-0 truncate text-faint">
                  {s.pending}
                </span>
                <span
                  data-node-done
                  className={`absolute inset-0 truncate font-medium opacity-0 ${id === "review" || id === "structure" ? "text-amber-600" : "text-emerald-600"}`}
                >
                  {s.done}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
