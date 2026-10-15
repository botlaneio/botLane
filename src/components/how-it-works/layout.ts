/**
 * Coordinates for the How it works story, in canvas units. The canvas is a fixed-size box
 * scaled to fit the sticky viewport, so every position here is exact on any screen.
 * Points are element centres unless a field says otherwise.
 */

export type Pt = { x: number; y: number };

export type FlowLayout = {
  key: "desktop" | "mobile";
  W: number;
  H: number;
  /** Tool tiles: size, where each is scattered in scene 01 (with tilt), and where it lines up in scene 02. */
  tile: number;
  scatter: (Pt & { rotate: number })[];
  lined: Pt[];
  /** Lane's core and its scoped-access note. */
  core: Pt;
  coreSize: number;
  scope: Pt;
  /** The three drafts: their size, where they appear (scene 03) and their slot on the approval desk (scene 04). */
  card: { w: number; h: number };
  drafts: Pt[];
  slots: Pt[];
  desk: Pt & { w: number; h: number };
  /** Scene 06: where approved work goes, and the straight wire each item travels along. */
  dest: { w: number; h: number };
  dests: Pt[];
  sendFrom: Pt[];
  sendTo: Pt[];
};

const curve = (a: Pt, b: Pt, horizontal: boolean) => {
  if (horizontal) {
    const mx = (a.x + b.x) / 2;
    return `M${a.x},${a.y} C${mx},${a.y} ${mx},${b.y} ${b.x},${b.y}`;
  }
  const my = (a.y + b.y) / 2;
  return `M${a.x},${a.y} C${a.x},${my} ${b.x},${my} ${b.x},${b.y}`;
};

/** SVG path data derived from a layout: tools → core, core → drafts, desk → destinations. */
export function pathsFor(l: FlowLayout) {
  const r = l.coreSize / 2;
  const desktop = l.key === "desktop";
  const toolWires = l.lined.map((p) =>
    desktop
      ? curve({ x: p.x + l.tile / 2, y: p.y }, { x: l.core.x - r, y: l.core.y }, true)
      : curve({ x: p.x, y: p.y + l.tile / 2 }, { x: l.core.x, y: l.core.y - r }, false),
  );
  const laneWires = l.drafts.map((p) =>
    desktop
      ? curve({ x: l.core.x + r, y: l.core.y }, { x: p.x - l.card.w / 2, y: p.y }, true)
      : `M${l.core.x - r * 0.7},${l.core.y + r * 0.7} C${p.x - l.card.w / 2 - 18},${l.core.y + 40} ${p.x - l.card.w / 2 - 18},${p.y} ${p.x - l.card.w / 2},${p.y}`,
  );
  const sendWires = l.sendFrom.map((a, i) => `M${a.x},${a.y} L${l.sendTo[i].x},${l.sendTo[i].y}`);
  return { toolWires, laneWires, sendWires };
}

const DESK_D = { x: 600, y: 345, w: 380, h: 400 };
const SLOT_Y = [250, 350, 450];
const DEST_X = 1050;

export const DESKTOP: FlowLayout = {
  key: "desktop",
  W: 1200,
  H: 660,
  tile: 64,
  scatter: [
    { x: 190, y: 150, rotate: -8 },
    { x: 430, y: 90, rotate: 6 },
    { x: 770, y: 130, rotate: -5 },
    { x: 1010, y: 210, rotate: 7 },
    { x: 310, y: 500, rotate: 5 },
    { x: 900, y: 520, rotate: -6 },
  ],
  lined: [120, 204, 288, 372, 456, 540].map((y) => ({ x: 150, y })),
  core: { x: 470, y: 330 },
  coreSize: 76,
  scope: { x: 470, y: 412 },
  card: { w: 300, h: 84 },
  drafts: SLOT_Y.map((y) => ({ x: 880, y })),
  slots: SLOT_Y.map((y) => ({ x: DESK_D.x, y })),
  desk: DESK_D,
  dest: { w: 170, h: 52 },
  dests: SLOT_Y.map((y) => ({ x: DEST_X, y })),
  sendFrom: SLOT_Y.map((y) => ({ x: DESK_D.x + 150, y })),
  sendTo: SLOT_Y.map((y) => ({ x: DEST_X - 85, y })),
};

const DESK_M = { x: 190, y: 436, w: 352, h: 330 };
const SLOT_M = [348, 436, 524];
const DEST_M = [70, 190, 310];

export const MOBILE: FlowLayout = {
  key: "mobile",
  W: 380,
  H: 700,
  tile: 48,
  scatter: [
    { x: 80, y: 150, rotate: -8 },
    { x: 280, y: 110, rotate: 6 },
    { x: 150, y: 300, rotate: -5 },
    { x: 300, y: 390, rotate: 7 },
    { x: 90, y: 520, rotate: 5 },
    { x: 260, y: 610, rotate: -6 },
  ],
  lined: [45, 103, 161, 219, 277, 335].map((x) => ({ x, y: 64 })),
  core: { x: 190, y: 186 },
  coreSize: 64,
  scope: { x: 190, y: 246 },
  card: { w: 300, h: 76 },
  drafts: SLOT_M.map((y) => ({ x: 204, y })),
  slots: SLOT_M.map((y) => ({ x: 190, y })),
  desk: DESK_M,
  dest: { w: 108, h: 44 },
  dests: DEST_M.map((x) => ({ x, y: 660 })),
  sendFrom: DEST_M.map(() => ({ x: 190, y: DESK_M.y + DESK_M.h / 2 })),
  sendTo: DEST_M.map((x) => ({ x, y: 638 })),
};
