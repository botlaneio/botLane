import type { Box, StoryLayout } from "./layout";

/** Scene 04 dashboard: the frame and the parts that are not former source cards. */

const at = (b: Box) => ({ left: b.x - b.w / 2, top: b.y - b.h / 2, width: b.w, height: b.h });

// Illustrative weekly leads, eight weeks, ending at the 142 shown in the Leads tile.
const SERIES = [88, 97, 92, 104, 111, 108, 120, 142];

function chartPaths(w: number, h: number) {
  const pad = { l: 8, r: 8, t: 14, b: 10 };
  const max = 150;
  const min = 70;
  const pts = SERIES.map((v, i) => ({
    x: pad.l + (i * (w - pad.l - pad.r)) / (SERIES.length - 1),
    y: pad.t + (1 - (v - min) / (max - min)) * (h - pad.t - pad.b),
  }));
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const area = `${line} L${pts[pts.length - 1].x},${h} L${pts[0].x},${h} Z`;
  return { line, area, end: pts[pts.length - 1] };
}

const STATUS = [
  { key: "draft", text: "Drafting", cls: "border-line bg-surface text-muted" },
  { key: "awaiting", text: "Awaiting your approval", cls: "border-amber-300 bg-amber-50 text-amber-700" },
  { key: "approved", text: "Approved by you", cls: "border-emerald-300 bg-emerald-50 text-emerald-700" },
  { key: "delivered", text: "Delivered", cls: "border-emerald-300 bg-emerald-50 text-emerald-700" },
];

export function Dashboard({ layout }: { layout: StoryLayout }) {
  const compact = layout.key === "mobile";
  const f = layout.frame;
  const chartInner = { w: layout.chart.w - 32, h: layout.chart.h - (compact ? 52 : 64) };
  const { line, area, end } = chartPaths(chartInner.w, chartInner.h);

  return (
    <>
      <div
        data-frame
        className="absolute rounded-[22px] border border-line bg-white opacity-0 shadow-[0_1.5rem_4rem_rgba(20,20,40,0.08)]"
        style={{ ...at(f), zIndex: 1 }}
      >
        <div className={`flex border-b border-line ${compact ? "flex-col gap-1.5 px-4 py-3" : "items-center justify-between px-6 py-4"}`}>
          <div data-dash-head>
            <div className="text-[15px] font-semibold tracking-[-0.01em] text-ink">Weekly performance report</div>
            <div className="text-[11.5px] text-muted">Meridian Health Group · Oct 6 – Oct 13, 2026</div>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-[6px] border border-line px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-wider text-faint">
              Illustrative example
            </span>
            <span className="relative inline-block h-[22px] w-[168px]">
              {STATUS.map((s, i) => (
                <span
                  key={s.key}
                  data-status={s.key}
                  className={`absolute inset-y-0 right-0 inline-flex items-center rounded-full border px-2.5 text-[10.5px] font-semibold whitespace-nowrap ${s.cls} ${i ? "opacity-0" : ""}`}
                >
                  {s.text}
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>

      {/* Trend chart */}
      <div
        data-dash-part
        className="absolute rounded-[16px] border border-line/80 bg-white p-4 opacity-0 transition-colors hover:border-lane/30"
        style={{ ...at(layout.chart), zIndex: 2 }}
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted">Leads · last 8 weeks</span>
          <span className="font-mono text-[10px] text-faint">Blended</span>
        </div>
        <svg className="mt-3 block" width={chartInner.w} height={chartInner.h} aria-hidden>
          {[0.25, 0.5, 0.75].map((g) => (
            <line key={g} x1="0" x2={chartInner.w} y1={chartInner.h * g} y2={chartInner.h * g} stroke="#ececf0" strokeDasharray="3 4" />
          ))}
          <path data-chart-area d={area} fill="#e0312b" opacity="0" />
          <path data-chart-line d={line} fill="none" stroke="#e0312b" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
          <circle data-chart-dot cx={end.x} cy={end.y} r="4" fill="#fff" stroke="#e0312b" strokeWidth="2" opacity="0" />
        </svg>
      </div>

      {/* Client updates: the project and email cards land inside this panel */}
      <div
        data-dash-part
        className="absolute rounded-[16px] border border-line/80 bg-surface/50 px-4 py-3 opacity-0"
        style={{ ...at(layout.updates), zIndex: 2 }}
      >
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted">Client updates</span>
      </div>

      {/* Exceptions */}
      <div
        data-dash-part
        data-exceptions
        className="absolute rounded-[16px] border border-line/80 bg-white px-4 py-3 opacity-0"
        style={{ ...at(layout.exceptions), zIndex: 2 }}
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted">Exceptions</span>
          <span className="relative h-[14px] w-[64px] font-mono text-[10px]">
            <span data-exc-open className="absolute inset-0 text-right text-amber-600">1 open</span>
            <span data-exc-closed className="absolute inset-0 text-right text-emerald-600 opacity-0">0 open</span>
          </span>
        </div>
        <div className="relative mt-2.5 h-[34px] text-[12px]">
          <div data-exc-open className="absolute inset-0 flex items-start gap-2">
            <span className="mt-1 size-2 shrink-0 rounded-full bg-amber-500" />
            <span className="text-ink-2">GA4 sessions missing for Oct 9</span>
          </div>
          <div data-exc-closed className="absolute inset-0 flex items-start gap-2 opacity-0">
            <span className="mt-1 size-2 shrink-0 rounded-full bg-emerald-500" />
            <span className="text-ink-2">Backfilled from GA4 and checked by you</span>
          </div>
        </div>
      </div>
    </>
  );
}
