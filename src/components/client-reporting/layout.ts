/**
 * Coordinates for the Client reporting story, in canvas units. The canvas is a fixed-size
 * box scaled to fit the sticky viewport, so every position here is exact on any screen.
 * Points are element centres unless a field says otherwise.
 */

export type Pt = { x: number; y: number };
export type Box = { x: number; y: number; w: number; h: number }; // centre + size

export type CardId = "sheet" | "crm" | "metric" | "project" | "email";
export const CARD_IDS: CardId[] = ["sheet", "crm", "metric", "project", "email"];
export const STAGE_IDS = ["collect", "validate", "structure", "review", "deliver"] as const;
export type StageId = (typeof STAGE_IDS)[number];

export type StoryLayout = {
  key: "desktop" | "mobile";
  W: number;
  H: number;
  card: { w: number; h: number };
  /** Scene 01: where each card sits, and its tilt. */
  scatter: Record<CardId, Pt & { rotate: number }>;
  /** Scene 02: the hub every card travels into. */
  hub: Pt;
  /** Scene 03: pipeline node centres and size. */
  node: { w: number; h: number };
  stages: Record<StageId, Pt>;
  /** Scene 04: where the pipeline condenses to (null = it fades out instead). */
  strip: { y: number; x0: number; x1: number; scale: number } | null;
  frame: Box;
  /** Scene 04: where each card lands in the dashboard (centre + final size). */
  tiles: Record<CardId, Box>;
  chart: Box;
  updates: Box;
  exceptions: Box;
  /** Scene 05: how the dashboard moves aside, and where the side panel sits. */
  frameAside: { x: number; y: number; scale: number };
  panel: Box;
  /** Scene 06: the report thumbnail's start and where it lands in the inbox. */
  thumbFrom: Pt;
  thumbTo: Pt;
};

const curve = (a: Pt, b: Pt, bend: number) => {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return `M${a.x},${a.y} Q${mx - dy * bend},${my + dx * bend} ${b.x},${b.y}`;
};

/** SVG path data derived from a layout: card → hub routes, stage connectors, delivery route. */
export function pathsFor(l: StoryLayout) {
  const bends: Record<CardId, number> = { sheet: 0.18, crm: -0.2, metric: 0.22, project: -0.16, email: 0.2 };
  const routes = Object.fromEntries(
    CARD_IDS.map((id) => [id, curve(l.scatter[id], l.hub, bends[id])]),
  ) as Record<CardId, string>;
  const connectors = STAGE_IDS.slice(0, -1).map((id, i) => {
    const a = l.stages[id];
    const b = l.stages[STAGE_IDS[i + 1]];
    const horizontal = Math.abs(b.x - a.x) > Math.abs(b.y - a.y);
    const from = horizontal ? { x: a.x + l.node.w / 2, y: a.y } : { x: a.x, y: a.y + l.node.h / 2 };
    const to = horizontal ? { x: b.x - l.node.w / 2, y: b.y } : { x: b.x, y: b.y - l.node.h / 2 };
    return `M${from.x},${from.y} L${to.x},${to.y}`;
  });
  const delivery = curve(l.thumbFrom, l.thumbTo, -0.25);
  return { routes, connectors, delivery };
}

export const DESKTOP: StoryLayout = {
  key: "desktop",
  W: 1200,
  H: 660,
  card: { w: 236, h: 124 },
  scatter: {
    sheet: { x: 200, y: 150, rotate: -4 },
    crm: { x: 590, y: 112, rotate: 2.5 },
    metric: { x: 990, y: 180, rotate: -2 },
    project: { x: 330, y: 470, rotate: 3 },
    email: { x: 850, y: 500, rotate: -3.5 },
  },
  hub: { x: 600, y: 330 },
  node: { w: 168, h: 104 },
  stages: {
    collect: { x: 160, y: 330 },
    validate: { x: 380, y: 330 },
    structure: { x: 600, y: 330 },
    review: { x: 820, y: 330 },
    deliver: { x: 1040, y: 330 },
  },
  strip: { y: 40, x0: 390, x1: 810, scale: 0.42 },
  frame: { x: 600, y: 368, w: 1000, h: 560 },
  tiles: {
    sheet: { x: 274, y: 210, w: 300, h: 100 },
    crm: { x: 594, y: 210, w: 300, h: 100 },
    metric: { x: 914, y: 210, w: 300, h: 100 },
    project: { x: 900, y: 360, w: 320, h: 56 },
    email: { x: 900, y: 424, w: 320, h: 56 },
  },
  chart: { x: 414, y: 450, w: 580, h: 300 },
  updates: { x: 900, y: 386, w: 352, h: 160 },
  exceptions: { x: 900, y: 538, w: 352, h: 124 },
  frameAside: { x: -160, y: 0, scale: 0.84 },
  panel: { x: 1010, y: 360, w: 300, h: 500 },
  thumbFrom: { x: 420, y: 380 },
  thumbTo: { x: 1010, y: 205 },
};

export const MOBILE: StoryLayout = {
  key: "mobile",
  W: 380,
  H: 700,
  card: { w: 196, h: 110 },
  scatter: {
    sheet: { x: 118, y: 98, rotate: -4 },
    crm: { x: 262, y: 206, rotate: 3 },
    metric: { x: 116, y: 330, rotate: -2.5 },
    project: { x: 264, y: 452, rotate: 2.5 },
    email: { x: 130, y: 584, rotate: -3 },
  },
  hub: { x: 190, y: 350 },
  node: { w: 260, h: 84 },
  stages: {
    collect: { x: 190, y: 90 },
    validate: { x: 190, y: 220 },
    structure: { x: 190, y: 350 },
    review: { x: 190, y: 480 },
    deliver: { x: 190, y: 610 },
  },
  strip: null,
  frame: { x: 190, y: 350, w: 368, h: 680 },
  tiles: {
    sheet: { x: 72, y: 128, w: 106, h: 86 },
    crm: { x: 190, y: 128, w: 106, h: 86 },
    metric: { x: 308, y: 128, w: 106, h: 86 },
    project: { x: 190, y: 478, w: 324, h: 50 },
    email: { x: 190, y: 534, w: 324, h: 50 },
  },
  chart: { x: 190, y: 290, w: 340, h: 200 },
  updates: { x: 190, y: 498, w: 344, h: 136 },
  exceptions: { x: 190, y: 626, w: 344, h: 92 },
  frameAside: { x: 0, y: -40, scale: 0.9 },
  panel: { x: 190, y: 520, w: 348, h: 340 },
  thumbFrom: { x: 190, y: 250 },
  thumbTo: { x: 190, y: 418 },
};
