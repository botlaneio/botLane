import { Lock, UserRound } from "lucide-react";
import { LOGO_VARIANTS } from "../brand/logo-variants";
import { STAGE_IDS, type StageId, type StoryLayout } from "./layout";

/** Scene 02 hub and Scene 03 stages. States are stacked and cross-faded by the timeline. */

const STAGES: Record<StageId, { name: string; pending: string; done: string }> = {
  collect: { name: "Collect", pending: "Waiting", done: "Data collected" },
  validate: { name: "Validate", pending: "Waiting", done: "Records consolidated" },
  structure: { name: "Structure", pending: "Waiting", done: "1 exception flagged" },
  review: { name: "Review", pending: "Waiting", done: "Approval requested" },
  deliver: { name: "Deliver", pending: "Waits for your approval", done: "Delivered" },
};

// The hub's dots as they sit in the nav-bar logo (R4), and the spot they pour into:
// the red dot beside "Lane" once the logo has become the Lane tile.
const LOGO = LOGO_VARIANTS["graphite-red"];
/** Where the poured dots end up, in the logo's 22–178 viewBox units (the red dot of the label). */
export const HUB_DROP = { x: 74.4, y: 87.8 };
const BOX = 128;

/**
 * Scene 02 hub. It starts as the botLane logo; the cards pour into it, the dots melt into one
 * drop that becomes the red dot of the Lane tile, and later the tile flows back into the logo.
 * Two copies of the dots: a crisp one at rest and a gooey one (blur + alpha threshold) for the melt.
 */
export function Hub({ layout }: { layout: StoryLayout }) {
  const tile = LOGO.tile.kind === "radial" ? LOGO.tile : { from: "#2c2c30", to: "#0d0d10" };
  const toPx = (u: number) => ((u - 22) * BOX) / 156;
  return (
    <div data-hub className="pointer-events-none absolute top-0 left-0 opacity-0" style={{ transform: `translate(${layout.hub.x}px, ${layout.hub.y}px)`, zIndex: 4 }}>
      <div
        data-hub-box
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-[32.8px] shadow-[0_1rem_2.5rem_rgba(20,20,40,0.18)]"
        style={{ width: BOX, height: BOX }}
      >
        <svg className="absolute inset-0" width={BOX} height={BOX} viewBox="22 22 156 156" aria-hidden>
          <defs>
            <radialGradient id="lane-hub-tile" cx=".7" cy=".3" r=".9">
              <stop offset="0" stopColor={tile.from} />
              <stop offset="1" stopColor={tile.to} />
            </radialGradient>
            <filter id="lane-hub-goo" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
              <feGaussianBlur data-hub-blur in="SourceGraphic" stdDeviation="0.6" />
              <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 16 -6" />
            </filter>
          </defs>
          <rect x="22" y="22" width="156" height="156" rx="40" fill="url(#lane-hub-tile)" />
          <rect data-hub-ink x="22" y="22" width="156" height="156" rx="40" fill="#1d1d1f" opacity="0" />
          <g data-hub-crisp>
            {LOGO.paths.map((p, i) => (
              <path key={i} d={p.d} fill={p.fill} />
            ))}
          </g>
          <g filter="url(#lane-hub-goo)">
            <g data-hub-goo opacity="0" style={{ transformOrigin: `${HUB_DROP.x}px ${HUB_DROP.y}px` }}>
              {LOGO.paths.map((p, i) => (
                <path key={i} d={p.d} fill={p.fill} />
              ))}
            </g>
          </g>
        </svg>
        <div data-hub-label className="absolute inset-0 text-white opacity-0">
          <span
            className="absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lane"
            style={{ left: toPx(HUB_DROP.x), top: toPx(HUB_DROP.y) }}
          />
          <span className="absolute text-[15px] leading-none font-semibold" style={{ left: toPx(HUB_DROP.x) + 9, top: toPx(HUB_DROP.y) - 8 }}>
            Lane
          </span>
          <span className="absolute inset-x-0 text-center font-mono text-[11px] leading-none text-white/60" style={{ top: toPx(HUB_DROP.y) + 16 }}>
            <span data-hub-count>0</span>/5 sources
          </span>
        </div>
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
