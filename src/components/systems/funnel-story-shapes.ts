/**
 * Geometry for the Client reporting scroll story. Pure functions only, so the frames
 * can be rendered and checked outside the browser.
 *
 * Every formation has exactly N dots; dot i in one formation morphs into dot i in the next.
 */

export const N = 144;
export type Pt = { x: number; y: number };
export type Shape = { pts: Pt[]; r: number[]; colors: string[] };

export const LANE = "#e0312b";
const INK = "#2c2c30";
const SOFT = "#c9c9cf";
export const SOURCES = [
  { name: "Google Ads", color: "#4285F4", at: { x: -62, y: -58 } },
  { name: "Meta", color: "#0866FF", at: { x: 62, y: -58 } },
  { name: "GA4", color: "#F9AB00", at: { x: -62, y: 58 } },
  { name: "HubSpot", color: "#FF7A59", at: { x: 62, y: 58 } },
];

/** Points spaced evenly along a polyline. */
export function alongPath(points: Pt[], count: number): Pt[] {
  const segs = points.slice(1).map((p, i) => Math.hypot(p.x - points[i].x, p.y - points[i].y));
  const total = segs.reduce((a, b) => a + b, 0);
  return Array.from({ length: count }, (_, k) => {
    let d = count === 1 ? 0 : (k / (count - 1)) * total;
    let s = 0;
    while (s < segs.length - 1 && d > segs[s]) d -= segs[s++];
    const t = segs[s] ? Math.min(d / segs[s], 1) : 0;
    return { x: points[s].x + (points[s + 1].x - points[s].x) * t, y: points[s].y + (points[s + 1].y - points[s].y) * t };
  });
}

/** Points evenly around a closed polyline (last point not repeated). */
function aroundLoop(points: Pt[], count: number): Pt[] {
  return alongPath([...points, points[0]], count + 1).slice(0, count);
}

const row = (count: number, y: number, x0: number, x1: number): Pt[] =>
  Array.from({ length: count }, (_, k) => ({ x: count === 1 ? (x0 + x1) / 2 : x0 + ((x1 - x0) * k) / (count - 1), y }));

const fill = <T,>(n: number, v: T): T[] => Array(n).fill(v);

/** 01: four source discs (sunflower spirals), one per tool. */
function sources(): Shape {
  const per = N / 4;
  const pts: Pt[] = [];
  const r: number[] = [];
  const colors: string[] = [];
  SOURCES.forEach((src) => {
    for (let k = 0; k < per; k++) {
      const a = k * 2.39996;
      const d = 5.6 * Math.sqrt(k + 0.5);
      pts.push({ x: src.at.x + Math.cos(a) * d, y: src.at.y + Math.sin(a) * d });
      r.push(3.6 - (k / per) * 1.6); // halftone: bigger in the middle
      colors.push(src.color);
    }
  });
  return { pts, r, colors };
}

/** 02: a funnel, wide rows narrowing to a spout; colours turn to Lane red on the way down. */
function funnel(): Shape {
  const counts = [20, 18, 17, 15, 14, 12, 11, 10, 9, 8, 6, 4];
  const pts: Pt[] = [];
  const r: number[] = [];
  const colors: string[] = [];
  counts.forEach((n, rIdx) => {
    const half = 92 - rIdx * 7.4;
    row(n, -86 + rIdx * 15.5, -half, half).forEach((p, k) => {
      pts.push(p);
      r.push(3.3 - rIdx * 0.08);
      colors.push(rIdx < 4 ? SOURCES[k % 4].color : rIdx < 6 ? (k % 2 ? LANE : SOURCES[k % 4].color) : LANE);
    });
  });
  return { pts, r, colors };
}

/** 03: a report page: outline, red title, text lines and a small bar chart. */
function report(): Shape {
  const pts: Pt[] = [];
  const r: number[] = [];
  const colors: string[] = [];
  const add = (list: Pt[], radius: number, color: string) => {
    list.forEach((p) => {
      pts.push(p);
      r.push(radius);
      colors.push(color);
    });
  };
  add(
    aroundLoop(
      [
        { x: -70, y: -92 },
        { x: 70, y: -92 },
        { x: 70, y: 92 },
        { x: -70, y: 92 },
      ],
      34,
    ),
    1.9,
    SOFT,
  );
  add(row(10, -70, -52, 8), 3.4, LANE);
  [16, 14, 16, 12, 9].forEach((n, i) => add(row(n, -46 + i * 14, -52, -52 + (n - 1) * 6.9), 2.4, INK));
  [3, 5, 4, 7, 6, 8].forEach((h, b) => add(row(h, 0, 0, 0).map((_, k) => ({ x: -44 + b * 16, y: 78 - k * 6.6 })), 2.9, LANE));
  return { pts, r, colors };
}

/** 04: an approval tick inside a ring. */
function approved(): Shape {
  const ring = Array.from({ length: 84 }, (_, k) => {
    const a = (k / 84) * Math.PI * 2 - Math.PI / 2;
    return { x: Math.cos(a) * 86, y: Math.sin(a) * 86 };
  });
  const tick = alongPath(
    [
      { x: -44, y: 2 },
      { x: -12, y: 36 },
      { x: 48, y: -32 },
    ],
    60,
  );
  return {
    pts: [...ring, ...tick],
    r: [...fill(84, 2.4), ...fill(60, 3.6)],
    colors: [...ring.map((_, k) => (k % 3 ? LANE : "#f08a84")), ...fill(60, LANE)],
  };
}

/** 05: a paper plane, on its way out. */
function sent(): Shape {
  const outline = aroundLoop(
    [
      { x: -88, y: -4 },
      { x: 84, y: -70 },
      { x: 18, y: 72 },
      { x: -6, y: 22 },
    ],
    112,
  );
  const fold = alongPath(
    [
      { x: -6, y: 22 },
      { x: 84, y: -70 },
    ],
    32,
  );
  return {
    pts: [...outline, ...fold],
    r: [...fill(112, 2.7), ...fill(32, 2.2)],
    colors: [...fill(112, LANE), ...fill(32, INK)],
  };
}

export const SHAPES: Shape[] = [sources(), funnel(), report(), approved(), sent()];

const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
export const mixColor = (a: string, b: string, t: number) => {
  const [r1, g1, b1] = hex(a);
  const [r2, g2, b2] = hex(b);
  return `rgb(${Math.round(r1 + (r2 - r1) * t)},${Math.round(g1 + (g2 - g1) * t)},${Math.round(b1 + (b2 - b1) * t)})`;
};

const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Per-dot stagger: dots near the centre of the outgoing shape leave first, like a wave. */
const STAGGER = 0.45;
const delays = SHAPES.map((s) => {
  const d = s.pts.map((p) => Math.hypot(p.x, p.y));
  const max = Math.max(...d) || 1;
  return d.map((v) => (v / max) * STAGGER);
});

export type Dot = { x: number; y: number; r: number; color: string };

/**
 * One frame. `seg` is the step the dots are leaving, `t` (0-1) how far into the move,
 * `time` seconds for the idle ripple. `still` turns off ripple and swirl.
 */
export function frame(seg: number, t: number, time: number, still = false): Dot[] {
  const from = SHAPES[seg];
  const to = SHAPES[Math.min(seg + 1, SHAPES.length - 1)];
  const delay = delays[seg];
  return from.pts.map((p, i) => {
    const local = easeInOut(clamp01((t - delay[i]) / (1 - STAGGER)));
    let x = p.x + (to.pts[i].x - p.x) * local;
    let y = p.y + (to.pts[i].y - p.y) * local;
    if (!still) {
      // Swirl: dots arc around the centre mid-flight instead of travelling in straight lines.
      const swirl = Math.sin(local * Math.PI) * 0.9 * (i % 2 ? 1 : -1) * 0.35;
      const c = Math.cos(swirl);
      const s = Math.sin(swirl);
      [x, y] = [x * c - y * s, x * s + y * c];
    }
    const dist = Math.hypot(x, y);
    const ripple = still ? 1 : 1 + 0.22 * Math.sin(time * 2.4 - dist * 0.07);
    return {
      x,
      y,
      r: (from.r[i] + (to.r[i] - from.r[i]) * local) * ripple,
      color: mixColor(from.colors[i], to.colors[i], local),
    };
  });
}
