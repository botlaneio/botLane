/**
 * Coordinates for the Invoice follow-up story, in canvas units. The canvas is a fixed-size box
 * scaled to fit the sticky viewport, so every position here is exact on any screen.
 * Points are element centres unless a field says otherwise.
 */

export type Pt = { x: number; y: number };
export type Size = { w: number; h: number };
export type Box = Pt & Size; // centre + size

export type LoopLayout = {
  key: "desktop" | "mobile";
  W: number;
  H: number;
  /** The Loop: a ring around the invoice. Fractions run clockwise from the first reminder. */
  ring: Pt & { r: number };
  /** Where the status chip sits. */
  chip: Pt;
  /** Scenes 01–04: the invoice's one shape and the sizes it takes on the way. */
  invoice: Size;
  draft: Size;
  /** Scene 01: the inbox rows that bury the invoice (offset from the ring centre, tilt). */
  pile: { dx: number; dy: number; rotate: number }[];
  pileW: number;
  /** Scene 05: the reminder cards, T−3 / Due+3 / Due+14. */
  cards: [Box, Box, Box];
  /** Whether each card is joined to its point on the Loop by a short stem. */
  stems: boolean;
  /** Scene 06: the payment card; scene 07: the audit note it grows into. */
  paid: Box;
  audit: Box;
};

/** Where the three reminders and the payment sit on the Loop, as fractions of a turn. */
export const STATIONS: [number, number, number] = [0, 1 / 3, 2 / 3];
export const PAID_AT = 0.5;
/** The first reminder sits at 10 o'clock; the Loop runs clockwise from there. */
const START = 300;

/** A point a fraction of the way round the Loop. */
export const around = (l: LoopLayout, f: number): Pt => {
  const a = ((START + f * 360) * Math.PI) / 180;
  return { x: l.ring.x + l.ring.r * Math.sin(a), y: l.ring.y - l.ring.r * Math.cos(a) };
};

/** The ledger panel the invoice opens into in scene 02 (one row per check). */
export const PANEL = { w: 280, head: 44, row: 30, pad: 12, dot: 64 };
export const panelH = (n: number) => PANEL.head + n * PANEL.row + (n ? PANEL.pad : 0);

/** SVG path data: the Loop (as two arcs, so it starts at the first reminder), stems to the cards. */
export function pathsFor(l: LoopLayout) {
  const p0 = around(l, 0);
  const p1 = around(l, 0.5);
  const { r } = l.ring;
  const ring = `M${p0.x},${p0.y} A${r},${r} 0 0 1 ${p1.x},${p1.y} A${r},${r} 0 0 1 ${p0.x},${p0.y}`;
  const stems = l.cards.map((c, i) => {
    const s = around(l, STATIONS[i]);
    const edge = { x: c.x + (s.x > c.x ? c.w / 2 : -c.w / 2), y: c.y };
    return `M${s.x},${s.y} L${edge.x},${edge.y}`;
  });
  const m = around(l, PAID_AT);
  const paidStem = `M${m.x},${m.y} L${l.paid.x - l.paid.w / 2},${l.paid.y}`;
  return { ring, stems, paidStem };
}

export const DESKTOP: LoopLayout = {
  key: "desktop",
  W: 1200,
  H: 660,
  ring: { x: 600, y: 340, r: 210 },
  chip: { x: 600, y: 40 },
  invoice: { w: 380, h: 216 },
  draft: { w: 560, h: 352 },
  pile: [
    { dx: -26, dy: -96, rotate: -3 },
    { dx: 30, dy: -44, rotate: 2.5 },
    { dx: -34, dy: 6, rotate: -1.5 },
    { dx: 24, dy: 56, rotate: 3 },
    { dx: -10, dy: 104, rotate: -2 },
  ],
  pileW: 330,
  cards: [
    { x: 196, y: 196, w: 270, h: 116 },
    { x: 1004, y: 196, w: 270, h: 116 },
    { x: 280, y: 574, w: 270, h: 116 },
  ],
  stems: true,
  paid: { x: 980, y: 520, w: 300, h: 176 },
  audit: { x: 600, y: 340, w: 440, h: 404 },
};

export const MOBILE: LoopLayout = {
  key: "mobile",
  W: 380,
  H: 700,
  ring: { x: 190, y: 260, r: 116 },
  chip: { x: 190, y: 30 },
  invoice: { w: 340, h: 216 },
  draft: { w: 352, h: 420 },
  pile: [
    { dx: -14, dy: -96, rotate: -3 },
    { dx: 16, dy: -44, rotate: 2.5 },
    { dx: -18, dy: 6, rotate: -1.5 },
    { dx: 12, dy: 56, rotate: 3 },
    { dx: -6, dy: 104, rotate: -2 },
  ],
  pileW: 300,
  cards: [
    { x: 190, y: 446, w: 340, h: 80 },
    { x: 190, y: 532, w: 340, h: 80 },
    { x: 190, y: 618, w: 340, h: 80 },
  ],
  stems: false,
  paid: { x: 190, y: 260, w: 244, h: 170 },
  audit: { x: 190, y: 344, w: 344, h: 448 },
};
