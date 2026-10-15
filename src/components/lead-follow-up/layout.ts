/**
 * Coordinates for the Lead follow-up story, in canvas units. The canvas is a fixed-size box
 * scaled to fit the sticky viewport, so every position here is exact on any screen.
 * Points are element centres unless a field says otherwise.
 */

export type Pt = { x: number; y: number };
export type Size = { w: number; h: number };
export type Box = Pt & Size; // centre + size

export type LeadLayout = {
  key: "desktop" | "mobile";
  W: number;
  H: number;
  /** The Line: the time axis in scene 01, the follow-up cadence in scenes 05–06. */
  line: { a: Pt; b: Pt };
  /** Where the response clock sits. */
  clock: Pt;
  /** Scenes 01–04: where the lead sits, and the sizes its one shape takes on the way. */
  lead: Pt;
  form: Size;
  draft: Size;
  /** Scene 05: the follow-up cards, Minute 3 / Day 2 / Day 5, and where each sits on the Line. */
  touches: [Box, Box, Box];
  stations: [number, number, number];
  /** Whether each card is joined to its station by a short stem. */
  stems: boolean;
  /** Scene 06: where on the Line the call is booked, and the calendar card. */
  bookedAt: number;
  booked: Box;
};

/** A point a fraction of the way along the Line. */
export const along = (l: LeadLayout, f: number): Pt => ({
  x: l.line.a.x + (l.line.b.x - l.line.a.x) * f,
  y: l.line.a.y + (l.line.b.y - l.line.a.y) * f,
});

/** Fractions of the Line for the scene 01 hour ticks. */
export const TICKS: [number, string][] = [
  [0, "Enquiry"],
  [0.25, "1h"],
  [0.5, "2h"],
  [0.75, "3h"],
  [1, "4h+"],
];

/** The profile panel the lead opens into in scene 03 (one row per check). */
export const PANEL = { w: 260, head: 44, row: 30, pad: 12, dot: 64 };
export const panelH = (n: number) => PANEL.head + n * PANEL.row + (n ? PANEL.pad : 0);

/** SVG path data: the Line, the red progress over it, card stems and the booking stem. */
export function pathsFor(l: LeadLayout) {
  const { a, b } = l.line;
  const line = `M${a.x},${a.y} L${b.x},${b.y}`;
  const stems = l.touches.map((t, i) => {
    const s = along(l, l.stations[i]);
    return `M${t.x},${t.y + t.h / 2} L${s.x},${s.y}`;
  });
  // Drawn from the booking marker on the Line up to the calendar card.
  const m = along(l, l.bookedAt);
  const to = { x: l.booked.x, y: l.booked.y + l.booked.h / 2 };
  const bookStem = `M${m.x},${m.y} Q${m.x},${to.y + (m.y - to.y) * 0.25} ${to.x},${to.y}`;
  return { line, stems, bookStem };
}

export const DESKTOP: LeadLayout = {
  key: "desktop",
  W: 1200,
  H: 660,
  line: { a: { x: 150, y: 596 }, b: { x: 1050, y: 596 } },
  clock: { x: 600, y: 44 },
  lead: { x: 600, y: 304 },
  form: { w: 380, h: 208 },
  draft: { w: 560, h: 344 },
  touches: [
    { x: 222, y: 468, w: 264, h: 116 },
    { x: 600, y: 468, w: 264, h: 116 },
    { x: 978, y: 468, w: 264, h: 116 },
  ],
  stations: [0.08, 0.5, 0.92],
  stems: true,
  bookedAt: 0.72,
  booked: { x: 760, y: 236, w: 320, h: 176 },
};

export const MOBILE: LeadLayout = {
  key: "mobile",
  W: 380,
  H: 700,
  line: { a: { x: 34, y: 664 }, b: { x: 346, y: 664 } },
  clock: { x: 190, y: 34 },
  lead: { x: 190, y: 330 },
  form: { w: 340, h: 208 },
  draft: { w: 352, h: 420 },
  touches: [
    { x: 190, y: 302, w: 340, h: 104 },
    { x: 190, y: 420, w: 340, h: 104 },
    { x: 190, y: 538, w: 340, h: 104 },
  ],
  stations: [0.08, 0.5, 0.92],
  stems: false,
  bookedAt: 0.72,
  booked: { x: 190, y: 150, w: 320, h: 176 },
};
