import { buildLane, type Box, type Pt, type Rect } from "@/components/release-standard/layout";

/**
 * Coordinates for the homepage story, in canvas units. The canvas is a fixed-size box scaled to
 * fit the sticky viewport. Inside it, the three systems sit on one tall "strip" as blocks that
 * zigzag down the page: each block is a panel with the system's shape (a funnel, a line, a loop)
 * on one side and its three cards (Lane works, you OK it, it goes out) on the other, and the
 * sides swap from system to system. The lane the work travels runs down the outer edge beside
 * the cards and crosses the page between systems. Scrolling down slides the strip up, so the
 * work travels downward with the visitor; a slower layer of numerals behind it gives the depth.
 */

export type { Box, Pt, Rect };
type Side = "left" | "right";

export type HomeLayout = {
  key: "desktop" | "mobile" | "landscape";
  /** Small type and controls (phones, upright or sideways). */
  compact: boolean;
  W: number;
  H: number;
  strip: { w: number; h: number };
  card: { w: number; h: number };
  /** Each card's top-left corner on the strip (three per system), and which side it sits on. */
  cards: Pt[];
  sides: Side[];
  /** One shape panel per system. */
  panels: Rect[];
  /** The finale: the three systems as tiles, side by side (stacked on upright phones). */
  tiles: Rect[];
  /** The lane, sampled as a polyline; cardStop[i] is where the work halts at card i. */
  rail: Pt[];
  cardStop: number[];
  endStop: number;
  ticks: [Pt, Pt][];
  /** The Lane card: large and alone at the start, then a bar across the top for the rest. */
  lane: { big: Box; bar: Box };
  /** Phones: panels stop at `pinTop` while their cards pass, then leave with their block. */
  pinTop: number | null;
  blocks: { top: number; bottom: number }[];
  /** Camera: the strip point held at canvas line `cy`. One stop per card, plus start and finish. */
  cy: number;
  camStart: number;
  camCard: number[];
  camFinal: number;
  depth: number;
  numerals: Pt[];
  numeralSize: number;
};

type Spec = {
  key: HomeLayout["key"];
  compact: boolean;
  /** The camera centres each card on `cy` (else it holds each system and drifts). */
  follow: boolean;
  W: number;
  H: number;
  barH: number;
  card: { w: number; h: number; gap: number };
  cardX: Record<Side, number>;
  laneX: Record<Side, number>;
  panel: Record<Side, { x: number; w: number }>;
  panelH: number;
  /** Panel above its cards (upright phones) or beside them. */
  stacked: boolean;
  phaseGap: number;
  radius: number;
  drift: number;
  cy?: number;
  pinTop?: number;
  /** Finale tiles: in a row, or one above the other. */
  tiles: { w: number; h: number; gap: number; stacked: boolean };
  lane: { big: Box; bar: Box };
  numeralSize: number;
};

function build(s: Spec): HomeLayout {
  const sideOf = (p: number): Side => (p % 2 === 0 ? "right" : "left");
  const cardsH = 3 * s.card.h + 2 * s.card.gap;
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
  const camCard: number[] = [];
  const runs: number[] = [];
  for (let p = 0; p < 3; p++) {
    const side = sideOf(p);
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
      camCard.push(s.follow ? mid : T + blockH / 2 + (j - 1) * s.drift);
      runs.push(T + blockH + s.phaseGap / 2);
    }
  }
  const endY = 40 + 3 * (blockH + s.phaseGap);
  const t = s.tiles;
  const tiles: Rect[] = [0, 1, 2].map((k) =>
    t.stacked
      ? { x: (s.W - t.w) / 2, y: endY + k * (t.h + t.gap), w: t.w, h: t.h }
      : { x: (s.W - (3 * t.w + 2 * t.gap)) / 2 + k * (t.w + t.gap), y: endY, w: t.w, h: t.h },
  );
  const tilesH = t.stacked ? 3 * t.h + 2 * t.gap : t.h;
  const lane = buildLane({ x: stops[0].x, y: 0 }, stops, runs, { x: s.W / 2, y: endY - 16 }, s.radius);
  const depth = 0.5;
  const numerals = [0, 1, 2].map((p) => ({ x: s.W / 2, y: (1 - depth) * cy + depth * (blocks[p].bottom + s.phaseGap / 2) }));
  return {
    key: s.key,
    compact: s.compact,
    W: s.W,
    H: s.H,
    strip: { w: s.W, h: endY + tilesH + 80 },
    card: { w: s.card.w, h: s.card.h },
    cards,
    sides,
    panels,
    tiles,
    rail: lane.rail,
    cardStop: lane.gateStop,
    endStop: lane.prodStop,
    ticks,
    lane: s.lane,
    pinTop: s.pinTop ?? null,
    blocks,
    cy,
    camStart: camCard[0],
    camCard,
    camFinal: endY + tilesH / 2 + (cy - view),
    depth,
    numerals,
    numeralSize: s.numeralSize,
  };
}

/*
 * Desktop: panel and cards side by side, swapping sides each system. The canvas is 1200 wide and
 * its height follows the space on screen (540 to 860), so a screen that is narrow for its height
 * fills with canvas instead of blank bands; the extra height goes to the camera's drift.
 */
export const DESKTOP_H = { min: 540, max: 860, step: 40 };

export function desktopLayout(H = DESKTOP_H.min): HomeLayout {
  const extra = H - DESKTOP_H.min;
  return build({
    key: "desktop",
    compact: false,
    follow: false,
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
    tiles: { w: 340, h: 250, gap: 30, stacked: false },
    lane: { big: { x: 600, y: H / 2 + 30, w: 560, h: 132 }, bar: { x: 600, y: 32, w: 1200, h: 64 } },
    numeralSize: 300 + Math.min(80, extra / 4),
  });
}

export const DESKTOP = desktopLayout();

/*
 * Phones and upright tablets: the panel sits above its cards in one column that swaps sides each
 * system. The camera centres one card at a time while the panel pins under the bar.
 */
export const MOBILE = build({
  key: "mobile",
  compact: true,
  follow: true,
  W: 380,
  H: 520,
  barH: 60,
  card: { w: 332, h: 128, gap: 10 },
  cardX: { right: 8, left: 40 },
  laneX: { right: 362, left: 18 },
  panel: { right: { x: 8, w: 332 }, left: { x: 40, w: 332 } },
  panelH: 196,
  stacked: true,
  phaseGap: 90,
  radius: 16,
  drift: 0,
  cy: 396,
  pinTop: 68,
  tiles: { w: 352, h: 112, gap: 12, stacked: true },
  lane: { big: { x: 190, y: 280, w: 350, h: 120 }, bar: { x: 190, y: 30, w: 380, h: 60 } },
  numeralSize: 220,
});

/*
 * Phones turned sideways: a wide, short canvas beside a caption column. Panel and cards side by
 * side, as on desktop; the camera centres one card at a time near the top while the panel pins.
 */
export const LANDSCAPE = build({
  key: "landscape",
  compact: true,
  follow: true,
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
  tiles: { w: 196, h: 200, gap: 12, stacked: false },
  lane: { big: { x: 320, y: 160, w: 420, h: 100 }, bar: { x: 320, y: 22, w: 640, h: 44 } },
  numeralSize: 180,
});
