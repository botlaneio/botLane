/**
 * Coordinates for the Release Standard story, in canvas units. The canvas is a fixed-size box
 * scaled to fit the sticky viewport. Inside it, the four phases sit on one tall "strip" as
 * blocks that zigzag down the page: each block is an illustration panel of its three gates on
 * one side and the three gate cards on the other, and the sides swap from phase to phase. The
 * lane the release travels runs down the outer edge beside the cards and crosses the page
 * between phases. As the visitor scrolls down, a camera slides the strip up so the release
 * travels downward with them; a slower layer of phase numerals behind it gives the depth.
 */

export type Pt = { x: number; y: number };
/** A box by its centre. */
export type Box = Pt & { w: number; h: number };
/** A box by its top-left corner. */
export type Rect = Pt & { w: number; h: number };

export type StoryLayout = {
  key: "desktop" | "mobile" | "landscape";
  /** Small type and controls (phones, upright or sideways). */
  compact: boolean;
  /** How a panel lays out its three drawings: in rows beside their titles, or in three columns. */
  panelStyle: "rows" | "columns";
  W: number;
  H: number;
  strip: { w: number; h: number };
  /** Gate cards: size, each card's top-left corner on the strip, and which side of the page it sits on. */
  card: { w: number; h: number };
  cards: Pt[];
  sides: ("left" | "right")[];
  /** One illustration panel per phase. */
  panels: Rect[];
  /** The production endpoint and, below it, the two human decisions. */
  production: Rect;
  approvals: Rect;
  /** The lane, sampled as a polyline; gateStop[i] is where the release halts at gate i. */
  rail: Pt[];
  gateStop: number[];
  prodStop: number;
  /** Short connectors from the lane to each card's edge. */
  ticks: [Pt, Pt][];
  /** Where the blocking bar drops across the lane, just after gate 08. */
  barrier: Pt;
  /** The release card: large and alone in scene 01, then a bar across the top for the rest. */
  release: { big: Box; bar: Box };
  /**
   * Phones: each panel is "sticky". It stops at `pinTop` while its phase's cards pass, then is
   * pushed up by the end of its block. `blocks[p]` is each phase's top and bottom on the strip.
   */
  pinTop: number | null;
  blocks: { top: number; bottom: number }[];
  /** Camera: the strip point held at canvas line `cy`. One stop per gate, plus start and finish. */
  cy: number;
  camStart: number;
  camGate: number[];
  camFinal: number;
  /** Parallax layer: giant phase numerals moving at `depth` × the strip's speed. */
  depth: number;
  numerals: Pt[];
  numeralSize: number;
};

/* ---------- lane drawing: orthogonal legs with rounded corners, sampled to points ---------- */

function sampleLane(legs: Pt[][], radius: number) {
  const pts: Pt[] = [];
  const stops: number[] = [];
  const push = (p: Pt) => {
    const last = pts[pts.length - 1];
    if (!last || Math.hypot(last.x - p.x, last.y - p.y) > 0.01) pts.push(p);
  };
  for (const leg of legs) {
    push(leg[0]);
    for (let i = 1; i < leg.length - 1; i++) {
      const [a, b, c] = [leg[i - 1], leg[i], leg[i + 1]];
      const lin = Math.hypot(b.x - a.x, b.y - a.y);
      const lout = Math.hypot(c.x - b.x, c.y - b.y);
      const r = Math.min(radius, lin / 2, lout / 2);
      if (r < 0.5) {
        push(b);
        continue;
      }
      const p0 = { x: b.x - ((b.x - a.x) / lin) * r, y: b.y - ((b.y - a.y) / lin) * r };
      const p2 = { x: b.x + ((c.x - b.x) / lout) * r, y: b.y + ((c.y - b.y) / lout) * r };
      for (let k = 0; k <= 10; k++) {
        const t = k / 10;
        const u = 1 - t;
        push({ x: u * u * p0.x + 2 * u * t * b.x + t * t * p2.x, y: u * u * p0.y + 2 * u * t * b.y + t * t * p2.y });
      }
    }
    push(leg[leg.length - 1]);
    stops.push(pts.length - 1);
  }
  return { pts, stops };
}

/** Lane legs: start → gate 1 → … → gate 12 → production. A leg that changes side turns at `runs[i]`. */
export function buildLane(start: Pt, stops: Pt[], runs: number[], end: Pt, radius: number) {
  const legs: Pt[][] = [[start, stops[0]]];
  for (let i = 0; i < stops.length - 1; i++) {
    const a = stops[i];
    const b = stops[i + 1];
    legs.push(a.x === b.x ? [a, b] : [a, { x: a.x, y: runs[i] }, { x: b.x, y: runs[i] }, b]);
  }
  const last = stops[stops.length - 1];
  const runEnd = runs[stops.length - 1];
  legs.push([last, { x: last.x, y: runEnd }, { x: end.x, y: runEnd }, end]);
  const { pts, stops: idx } = sampleLane(legs, radius);
  return { rail: pts, gateStop: idx.slice(0, stops.length), prodStop: idx[idx.length - 1] };
}

export function railFractions(rail: Pt[]) {
  const cum = [0];
  for (let i = 1; i < rail.length; i++) cum.push(cum[i - 1] + Math.hypot(rail[i].x - rail[i - 1].x, rail[i].y - rail[i - 1].y));
  const total = cum[cum.length - 1];
  return cum.map((c) => c / total);
}

export const railPath = (rail: Pt[]) => rail.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

type Side = "left" | "right";
type Spec = {
  key: "desktop" | "mobile" | "landscape";
  compact: boolean;
  panelStyle: "rows" | "columns";
  /** The camera centres each card on `cy` (else it holds each phase and drifts). */
  follow: boolean;
  /** Production and the decisions: one above the other, or side by side. */
  finish: "stacked" | "side";
  W: number;
  H: number;
  barH: number;
  card: { w: number; h: number; gap: number };
  /** Card column x, lane x and panel for each side the cards can sit on. Phase I's cards sit on the right. */
  cardX: Record<Side, number>;
  laneX: Record<Side, number>;
  panel: Record<Side, { x: number; w: number }>;
  panelH: number;
  /** Desktop: panel beside the cards. Phones: panel above the cards, in the same column. */
  stacked: boolean;
  phaseGap: number;
  radius: number;
  /** Desktop: the camera holds each phase and drifts this far per gate. Phones: it centres each card on `cy`. */
  drift: number;
  cy?: number;
  pinTop?: number;
  production: { w: number; h: number };
  approvals: { w: number; h: number; gap: number };
  release: { big: Box; bar: Box };
  numeralSize: number;
};

function build(s: Spec): StoryLayout {
  const sideOfPhase = (p: number): Side => (p % 2 === 0 ? "right" : "left");
  const cardsH = 3 * s.card.h + 2 * s.card.gap;
  // A pinned side panel needs its block to run on below the last card, so it is still fully in
  // view while the camera is on that card.
  const blockH = s.stacked
    ? s.panelH + 10 + cardsH
    : s.follow
      ? Math.max(s.panelH, cardsH + s.panelH - s.card.h)
      : Math.max(s.panelH, cardsH);
  const view = (s.H + s.barH) / 2;
  const cy = s.cy ?? view;
  const cards: Pt[] = [];
  const sides: Side[] = [];
  const panels: Rect[] = [];
  const blocks: { top: number; bottom: number }[] = [];
  const stops: Pt[] = [];
  const ticks: [Pt, Pt][] = [];
  const camGate: number[] = [];
  const runs: number[] = [];
  for (let p = 0; p < 4; p++) {
    const side = sideOfPhase(p);
    const T = 40 + p * (blockH + s.phaseGap);
    blocks.push({ top: T, bottom: T + blockH });
    panels.push({ x: s.panel[side].x, y: s.stacked || s.follow ? T : T + (blockH - s.panelH) / 2, w: s.panel[side].w, h: s.panelH });
    const cardsTop = s.stacked ? T + s.panelH + 10 : s.follow ? T : T + (blockH - cardsH) / 2;
    for (let j = 0; j < 3; j++) {
      const c = { x: s.cardX[side], y: cardsTop + j * (s.card.h + s.card.gap) };
      cards.push(c);
      sides.push(side);
      const mid = c.y + s.card.h / 2;
      const lx = s.laneX[side];
      stops.push({ x: lx, y: mid });
      ticks.push([{ x: lx, y: mid }, { x: side === "right" ? c.x + s.card.w : c.x, y: mid }]);
      camGate.push(s.follow ? mid : T + blockH / 2 + (j - 1) * s.drift);
      runs.push(T + blockH + s.phaseGap / 2);
    }
  }
  const prodY = 40 + 4 * (blockH + s.phaseGap);
  const side = s.finish === "side";
  const rowW = s.production.w + s.approvals.gap + s.approvals.w;
  const production = side
    ? { x: (s.W - rowW) / 2, y: prodY + (s.approvals.h - s.production.h) / 2, ...s.production }
    : { x: (s.W - s.production.w) / 2, y: prodY, ...s.production };
  const approvals = side
    ? { x: (s.W - rowW) / 2 + s.production.w + s.approvals.gap, y: prodY, w: s.approvals.w, h: s.approvals.h }
    : { x: (s.W - s.approvals.w) / 2, y: prodY + s.production.h + s.approvals.gap, w: s.approvals.w, h: s.approvals.h };
  const end = side ? { x: production.x + production.w / 2, y: production.y - 14 } : { x: s.W / 2, y: prodY - 16 };
  const lane = buildLane({ x: stops[0].x, y: 0 }, stops, runs, end, s.radius);
  const depth = 0.5;
  // Each numeral crosses the camera line while the camera is in the gap after its phase.
  const numerals = [0, 1, 2, 3].map((p) => ({ x: s.W / 2, y: (1 - depth) * cy + depth * (blocks[p].bottom + s.phaseGap / 2) }));
  // The finish frames production and the decisions together in the space under the bar.
  const finishMid = side ? prodY + s.approvals.h / 2 : prodY + (s.production.h + s.approvals.gap + s.approvals.h) / 2;
  return {
    key: s.key,
    compact: s.compact,
    panelStyle: s.panelStyle,
    W: s.W,
    H: s.H,
    strip: { w: s.W, h: approvals.y + approvals.h + 80 },
    card: { w: s.card.w, h: s.card.h },
    cards,
    sides,
    panels,
    production,
    approvals,
    ...lane,
    ticks,
    barrier: { x: stops[7].x, y: stops[7].y + s.card.h / 2 + s.card.gap / 2 },
    release: s.release,
    pinTop: s.pinTop ?? null,
    blocks,
    cy,
    camStart: camGate[0],
    camGate,
    camFinal: finishMid + (cy - view),
    depth,
    numerals,
    numeralSize: s.numeralSize,
  };
}

/*
 * ---------- desktop: illustration panel and gate cards side by side, swapping sides each phase ----------
 * The canvas is 1200 wide; its height follows the space on screen (540 to 860), so a screen that is
 * narrow for its height (a tablet held sideways) fills with canvas instead of blank bands. The extra
 * height goes to the camera's drift: each phase travels further up the screen as its gates pass.
 */
export const DESKTOP_H = { min: 540, max: 860, step: 40 };

export function desktopLayout(H = DESKTOP_H.min): StoryLayout {
  const extra = H - DESKTOP_H.min;
  return build({
  key: "desktop",
  compact: false,
  panelStyle: "rows",
  follow: false,
  finish: "stacked",
  W: 1200,
  H,
  barH: 64,
  card: { w: 440, h: 136, gap: 12 },
  cardX: { right: 660, left: 100 },
  laneX: { right: 1140, left: 60 },
  panel: { right: { x: 100, w: 520 }, left: { x: 580, w: 520 } },
  panelH: 432,
  stacked: false,
  phaseGap: 170,
  radius: 40,
  drift: 20 + Math.min(100, extra / 3),
  production: { w: 300, h: 170 },
  approvals: { w: 640, h: 232, gap: 28 },
  release: { big: { x: 600, y: H / 2 + 30, w: 560, h: 132 }, bar: { x: 600, y: 32, w: 1200, h: 64 } },
  numeralSize: 300 + Math.min(80, extra / 4),
  });
}

export const DESKTOP = desktopLayout();

/*
 * Phones and upright tablets: the panel sits above its cards in one column that swaps sides each
 * phase. The canvas is short enough to stay legible on small phones, so the camera centres one card
 * at a time while the panel pins under the bar, keeping all three drawings in view.
 */
export const MOBILE = build({
  key: "mobile",
  compact: true,
  panelStyle: "columns",
  follow: true,
  finish: "stacked",
  W: 380,
  H: 520,
  barH: 60,
  card: { w: 332, h: 128, gap: 10 },
  cardX: { right: 8, left: 40 },
  laneX: { right: 362, left: 18 },
  panel: { right: { x: 8, w: 332 }, left: { x: 40, w: 332 } },
  panelH: 164,
  stacked: true,
  phaseGap: 90,
  radius: 16,
  drift: 0,
  cy: 376,
  pinTop: 68,
  production: { w: 340, h: 110 },
  approvals: { w: 364, h: 248, gap: 24 },
  release: { big: { x: 190, y: 280, w: 350, h: 120 }, bar: { x: 190, y: 30, w: 380, h: 60 } },
  numeralSize: 220,
});

/*
 * Phones turned sideways: a wide, short canvas beside a caption column. The panel and cards sit
 * side by side and swap sides each phase, as on desktop; the camera centres one card at a time
 * near the top while the panel pins beside it, and the finish puts production beside the decisions.
 */
export const LANDSCAPE = build({
  key: "landscape",
  compact: true,
  panelStyle: "rows",
  follow: true,
  finish: "side",
  W: 640,
  H: 300,
  barH: 44,
  card: { w: 300, h: 118, gap: 10 },
  cardX: { right: 310, left: 30 },
  laneX: { right: 626, left: 14 },
  panel: { right: { x: 14, w: 282 }, left: { x: 344, w: 282 } },
  panelH: 232,
  stacked: false,
  phaseGap: 70,
  radius: 14,
  drift: 0,
  cy: 111,
  pinTop: 52,
  production: { w: 200, h: 110 },
  approvals: { w: 364, h: 232, gap: 16 },
  release: { big: { x: 320, y: 160, w: 420, h: 100 }, bar: { x: 320, y: 22, w: 640, h: 44 } },
  numeralSize: 180,
});
