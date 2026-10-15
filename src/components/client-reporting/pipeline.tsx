import { Lock, UserRound } from "lucide-react";
import { STAGE_IDS, type StageId, type StoryLayout } from "./layout";

/** Scene 02 hub and Scene 03 stages. States are stacked and cross-faded by the timeline. */

const STAGES: Record<StageId, { name: string; pending: string; done: string }> = {
  collect: { name: "Collect", pending: "Waiting", done: "Data collected" },
  validate: { name: "Validate", pending: "Waiting", done: "Records consolidated" },
  structure: { name: "Structure", pending: "Waiting", done: "1 exception flagged" },
  review: { name: "Review", pending: "Waiting", done: "Approval requested" },
  deliver: { name: "Deliver", pending: "Waits for your approval", done: "Delivered" },
};

export function Hub({ layout }: { layout: StoryLayout }) {
  return (
    <div data-hub className="absolute top-0 left-0 opacity-0" style={{ transform: `translate(${layout.hub.x}px, ${layout.hub.y}px)`, zIndex: 2 }}>
      <div
        data-hub-box
        className="absolute top-0 left-0 flex size-[128px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[28px] bg-ink text-white shadow-[0_1rem_2.5rem_rgba(20,20,40,0.18)]"
      >
        <span className="flex items-center gap-1.5 text-[15px] font-semibold">
          <span className="size-2 rounded-full bg-lane" />
          Lane
        </span>
        <span className="mt-1 font-mono text-[11px] text-white/60">
          <span data-hub-count>0</span>/5 sources
        </span>
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
