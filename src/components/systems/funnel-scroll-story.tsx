"use client";

import { useEffect, useRef } from "react";

/**
 * Client reporting, told top to bottom. A cluster of dots travels down the page as
 * the visitor scrolls and reshapes itself at each step: scattered sources, a funnel,
 * a report, an approval tick, a delivery arrow. Scroll position drives everything;
 * nothing plays on its own.
 */

const N = 30;
type Pt = { x: number; y: number };

const STEPS = [
  {
    num: "01",
    title: "Your sources",
    text: "Every Monday morning, Lane connects to Google Ads, Meta, GA4 and HubSpot and pulls the last 7 days of performance data.",
  },
  {
    num: "02",
    title: "Blended into one view",
    text: "It calculates blended ROAS, removes conversions counted twice across platforms, and matches closed-won revenue from your CRM.",
  },
  {
    num: "03",
    title: "Written up as a report",
    text: "Lane writes the commentary in your agency's tone: top creatives, campaign wins, budget pacing and recommendations.",
  },
  {
    num: "04",
    title: "You approve it",
    text: "The report waits on your approval desk. Read it, change anything, then click Approve. Nothing is sent before that.",
  },
  {
    num: "05",
    title: "Delivered to your client",
    text: "Once approved, the PDF and interactive link go straight to your client's inbox.",
  },
] as const;

// Deterministic jitter so server and client render the same first frame.
const jitter = (i: number, salt: number) => {
  const s = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return s - Math.floor(s) - 0.5;
};

/** Points spaced evenly along a polyline. */
function alongPath(points: Pt[], count: number): Pt[] {
  const segs = points.slice(1).map((p, i) => Math.hypot(p.x - points[i].x, p.y - points[i].y));
  const total = segs.reduce((a, b) => a + b, 0);
  return Array.from({ length: count }, (_, k) => {
    let d = (k / (count - 1)) * total;
    let s = 0;
    while (s < segs.length - 1 && d > segs[s]) d -= segs[s++];
    const t = segs[s] ? d / segs[s] : 0;
    return { x: points[s].x + (points[s + 1].x - points[s].x) * t, y: points[s].y + (points[s + 1].y - points[s].y) * t };
  });
}

const SOURCE_COLORS = ["#4285F4", "#0866FF", "#F9AB00", "#FF7A59"];
const LANE = "#e0312b";
const INK = "#2c2c30";

type Shape = { pts: Pt[]; r: number; colors: string[] };

const SHAPES: Shape[] = [
  // 01 scattered: four source clusters
  (() => {
    const centres = [
      { x: -58, y: -52 },
      { x: 58, y: -48 },
      { x: -52, y: 56 },
      { x: 60, y: 52 },
    ];
    const pts = Array.from({ length: N }, (_, i) => {
      const c = centres[i % 4];
      return { x: c.x + jitter(i, 1) * 52, y: c.y + jitter(i, 2) * 52 };
    });
    return { pts, r: 6.5, colors: pts.map((_, i) => SOURCE_COLORS[i % 4]) };
  })(),
  // 02 funnel: rows narrowing to a spout
  (() => {
    const rows = [8, 7, 6, 4, 3, 2];
    const pts: Pt[] = [];
    rows.forEach((n, r) => {
      const width = 150 - r * 26;
      for (let k = 0; k < n; k++) {
        pts.push({ x: n === 1 ? 0 : -width / 2 + (width * k) / (n - 1), y: -78 + r * 31 });
      }
    });
    return { pts, r: 6, colors: pts.map((_, i) => (i < 15 ? SOURCE_COLORS[i % 4] : LANE)) };
  })(),
  // 03 report: a page of text lines
  (() => {
    const pts = Array.from({ length: N }, (_, i) => {
      const row = Math.floor(i / 5);
      const col = i % 5;
      const short = row === 0 || row === 5 ? 0.6 : 1; // title and sign-off lines are shorter
      return { x: -52 + col * 26 * short, y: -72 + row * 29 };
    });
    return { pts, r: 5.5, colors: pts.map((_, i) => (i < 5 ? LANE : INK)) };
  })(),
  // 04 approval tick
  {
    pts: alongPath(
      [
        { x: -72, y: 2 },
        { x: -22, y: 52 },
        { x: 76, y: -58 },
      ],
      N,
    ),
    r: 6.5,
    colors: Array(N).fill(LANE),
  },
  // 05 delivery arrow
  {
    pts: [
      ...alongPath(
        [
          { x: -78, y: 0 },
          { x: 70, y: 0 },
        ],
        16,
      ),
      ...alongPath(
        [
          { x: 22, y: -48 },
          { x: 70, y: 0 },
          { x: 22, y: 48 },
        ],
        14,
      ),
    ],
    r: 6.5,
    colors: Array(N).fill(LANE),
  },
];

const hexToRgb = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mix = (a: string, b: string, t: number) => {
  const [r1, g1, b1] = hexToRgb(a);
  const [r2, g2, b2] = hexToRgb(b);
  return `rgb(${Math.round(r1 + (r2 - r1) * t)},${Math.round(g1 + (g2 - g1) * t)},${Math.round(b1 + (b2 - b1) * t)})`;
};
const ease = (t: number) => t * t * (3 - 2 * t);

export function FunnelScrollStory() {
  const trackRef = useRef<HTMLDivElement>(null);
  const travellerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);

  useEffect(() => {
    const track = trackRef.current;
    const traveller = travellerRef.current;
    if (!track || !traveller) return;
    let frame = 0;
    let lastActive = -1;

    const render = () => {
      frame = 0;
      const trackTop = track.getBoundingClientRect().top;
      const centres = stepRefs.current.map((el) => {
        if (!el) return 0;
        const r = el.getBoundingClientRect();
        return r.top - trackTop + r.height / 2;
      });
      const focus = window.innerHeight * 0.55 - trackTop;
      const y = Math.min(Math.max(focus, centres[0]), centres[centres.length - 1]);

      // Which two steps the dots are between, and how far along.
      let seg = 0;
      while (seg < centres.length - 2 && y > centres[seg + 1]) seg++;
      const span = centres[seg + 1] - centres[seg] || 1;
      // Hold each shape near its step, morph in the gap between steps.
      const raw = Math.min(Math.max((y - centres[seg]) / span, 0), 1);
      const t = ease(Math.min(Math.max((raw - 0.2) / 0.6, 0), 1));
      const from = SHAPES[seg];
      const to = SHAPES[seg + 1];

      traveller.style.transform = `translate(-50%, calc(${y}px - 50%))`;
      dotRefs.current.forEach((dot, i) => {
        if (!dot) return;
        dot.setAttribute("cx", (from.pts[i].x + (to.pts[i].x - from.pts[i].x) * t).toFixed(2));
        dot.setAttribute("cy", (from.pts[i].y + (to.pts[i].y - from.pts[i].y) * t).toFixed(2));
        dot.setAttribute("r", (from.r + (to.r - from.r) * t).toFixed(2));
        dot.style.fill = mix(from.colors[i], to.colors[i], t);
      });

      const active = raw < 0.5 ? seg : seg + 1;
      if (active !== lastActive) {
        lastActive = active;
        stepRefs.current.forEach((el, i) => el?.toggleAttribute("data-active", i === active));
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    render();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const first = SHAPES[0];

  return (
    <div className="relative grid grid-cols-[5.5rem_1fr] gap-x-5 md:grid-cols-[1fr_1fr] md:gap-x-12">
      {/* Track: a faint lane the shape travels down */}
      <div ref={trackRef} className="relative md:order-2" aria-hidden>
        <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-line to-transparent" />
        <div
          ref={travellerRef}
          className="absolute left-1/2 top-0 size-[5.5rem] rounded-[1.25rem] border border-line bg-white shadow-[0_1rem_2.5rem_rgba(20,20,40,0.08)] will-change-transform md:size-[15rem] md:rounded-[2rem]"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <svg viewBox="-110 -110 220 220" className="size-full">
            {first.pts.map((p, i) => (
              <circle
                key={i}
                ref={(el) => {
                  dotRefs.current[i] = el;
                }}
                cx={p.x}
                cy={p.y}
                r={first.r}
                style={{ fill: first.colors[i] }}
              />
            ))}
          </svg>
        </div>
      </div>

      {/* Steps */}
      <div className="md:order-1">
        {STEPS.map((step, i) => (
          <div
            key={step.num}
            ref={(el) => {
              stepRefs.current[i] = el;
            }}
            data-active={i === 0 ? "" : undefined}
            className="flex min-h-[70vh] flex-col justify-center py-10 opacity-35 transition-opacity duration-300 data-[active]:opacity-100 md:min-h-[80vh]"
          >
            <div className="font-mono text-xs font-semibold text-lane">{step.num}</div>
            <h3 className="mt-3 text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-ink">
              {step.title}
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted sm:text-base">{step.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
