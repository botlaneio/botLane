/**
 * Coordinates for the Release Standard story, in canvas units. The canvas is a fixed-size box
 * scaled to fit the sticky viewport. Inside it, the twelve gates sit on one long "strip" with
 * its own coordinates; a camera (scale plus the strip point held at a canvas point) moves over
 * that strip, so the story can zoom from all twelve gates down to one phase and back out.
 */

export type Pt = { x: number; y: number };
/** A box by its centre. */
export type Box = Pt & { w: number; h: number };
/** Strip point (fx, fy) shown at canvas point (cx, cy), at scale s. */
export type Cam = { fx: number; fy: number; cx: number; cy: number; s: number };

export type StoryLayout = {
  key: "desktop" | "mobile";
  W: number;
  H: number;
  strip: { w: number; h: number };
  /** Gate cards: size, and each card's top-left corner on the strip. */
  card: { w: number; h: number };
  cards: Pt[];
  /** Phase headings: top-left corner on the strip. */
  phases: Pt[];
  /** The production endpoint, top-left corner on the strip. */
  production: Pt & { w: number; h: number };
  /** The rail the release travels along, as waypoints; gateStop[i] is where it halts at gate i. */
  rail: Pt[];
  gateStop: number[];
  prodStop: number;
  /** Where the blocking bar drops across the rail, right after gate 08. */
  barrier: Pt;
  /** The release card: large and alone in scene 01, then a bar across the top for the rest. */
  release: { big: Box; bar: Box };
  /** Scene 07: the two human decisions, in canvas units. */
  approvals: Box;
  cams: { overview: Cam; phases: Cam[]; final: Cam };
};

/* ---------- desktop: twelve gates in one row, three per phase ---------- */
const D_CARD = { w: 330, h: 380 };
const D_PHASE_X = [0, 1200, 2400, 3600];
const D_RAIL_Y = 100;
const D_CARDS = D_PHASE_X.flatMap((px) => [0, 1, 2].map((j) => ({ x: px + j * 360, y: 130 })));
const D_PROD = { x: 4800, y: 130, w: 240, h: 380 };
const D_STRIP = { w: 5040, h: 510 };
const D_FIT = 1140 / D_STRIP.w;

export const DESKTOP: StoryLayout = {
  key: "desktop",
  W: 1200,
  H: 660,
  strip: D_STRIP,
  card: D_CARD,
  cards: D_CARDS,
  phases: D_PHASE_X.map((x) => ({ x, y: 0 })),
  production: D_PROD,
  rail: [
    { x: -60, y: D_RAIL_Y },
    ...D_CARDS.map((c) => ({ x: c.x + D_CARD.w / 2, y: D_RAIL_Y })),
    { x: D_PROD.x + D_PROD.w / 2, y: D_RAIL_Y },
  ],
  gateStop: D_CARDS.map((_, i) => i + 1),
  prodStop: D_CARDS.length + 1,
  barrier: { x: D_CARDS[7].x + D_CARD.w + 15, y: D_RAIL_Y },
  release: {
    big: { x: 600, y: 310, w: 560, h: 132 },
    bar: { x: 600, y: 32, w: 1200, h: 64 },
  },
  approvals: { x: 600, y: 452, w: 640, h: 248 },
  cams: {
    overview: { fx: D_STRIP.w / 2, fy: D_STRIP.h / 2, cx: 600, cy: 372, s: D_FIT },
    phases: D_PHASE_X.map((px) => ({ fx: px + 525, fy: D_STRIP.h / 2, cx: 600, cy: 372, s: 1 })),
    final: { fx: D_STRIP.w / 2, fy: D_STRIP.h / 2, cx: 600, cy: 196, s: D_FIT },
  },
};

/* ---------- phones and upright tablets: the four phases as a 2 × 2 grid, three gates stacked in each ---------- */
const M_CARD = { w: 332, h: 168 };
const M_BLOCKS: Pt[] = [
  { x: 0, y: 0 },
  { x: 420, y: 0 },
  { x: 0, y: 680 },
  { x: 420, y: 680 },
];
const M_RAIL_X = 10;
const M_CARD_Y = (j: number) => 70 + j * 180;
const M_CARDS = M_BLOCKS.flatMap((b) => [0, 1, 2].map((j) => ({ x: b.x + 28, y: b.y + M_CARD_Y(j) })));
const M_PROD = { x: 210, y: 1380, w: 360, h: 130 };
const M_STRIP = { w: 780, h: 1510 };

// Each block: in at the top of its rail, a stop beside every gate, out at the bottom.
const M_RAIL: Pt[] = [];
const M_STOPS: number[] = [];
for (const b of M_BLOCKS) {
  M_RAIL.push({ x: b.x + M_RAIL_X, y: b.y + 56 });
  for (let j = 0; j < 3; j++) {
    M_STOPS.push(M_RAIL.length);
    M_RAIL.push({ x: b.x + M_RAIL_X, y: b.y + M_CARD_Y(j) + M_CARD.h / 2 });
  }
  M_RAIL.push({ x: b.x + M_RAIL_X, y: b.y + 620 });
}
M_RAIL.push({ x: M_PROD.x + M_PROD.w / 2, y: M_PROD.y - 14 });

export const MOBILE: StoryLayout = {
  key: "mobile",
  W: 380,
  H: 700,
  strip: M_STRIP,
  card: M_CARD,
  cards: M_CARDS,
  phases: M_BLOCKS.map((b) => ({ x: b.x + 28, y: b.y + 4 })),
  production: M_PROD,
  rail: M_RAIL,
  gateStop: M_STOPS,
  prodStop: M_RAIL.length - 1,
  barrier: { x: M_BLOCKS[2].x + M_RAIL_X, y: M_CARDS[7].y + M_CARD.h + 6 },
  release: {
    big: { x: 190, y: 310, w: 350, h: 132 },
    bar: { x: 190, y: 42, w: 380, h: 84 },
  },
  approvals: { x: 190, y: 552, w: 364, h: 248 },
  cams: {
    overview: { fx: M_STRIP.w / 2, fy: M_STRIP.h / 2, cx: 190, cy: 398, s: 0.39 },
    phases: M_BLOCKS.map((b) => ({ fx: b.x + 182, fy: b.y + 300, cx: 190, cy: 398, s: 1 })),
    final: { fx: M_PROD.x + M_PROD.w / 2, fy: M_PROD.y + M_PROD.h / 2, cx: 190, cy: 300, s: 0.86 },
  },
};

/** Rail length up to each waypoint, as a fraction of the whole rail. */
export function railFractions(rail: Pt[]) {
  const cum = [0];
  for (let i = 1; i < rail.length; i++) cum.push(cum[i - 1] + Math.hypot(rail[i].x - rail[i - 1].x, rail[i].y - rail[i - 1].y));
  const total = cum[cum.length - 1];
  return cum.map((c) => c / total);
}

export const railPath = (rail: Pt[]) => rail.map((p, i) => `${i ? "L" : "M"}${p.x},${p.y}`).join(" ");
