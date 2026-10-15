import type { AnimationParams, TargetsParam, Timeline } from "animejs";
import { PANEL, PAID_AT, STATIONS, panelH, type LoopLayout } from "./layout";

type Anime = typeof import("animejs");

/**
 * The whole story is one timeline, 0 → END units, seeked by scroll progress through the
 * stage. Scrolling back plays it in reverse. Scene boundaries are listed in SCENES so the
 * captions and the progress rail stay in step with the visuals.
 */
export const END = 12400;
export const SCENES: [number, number][] = [
  [0, 1400], // 01 lost in the inbox
  [1400, 3400], // 02 Lane watches the ledger
  [3400, 5000], // 03 every invoice gets a loop
  [5000, 7000], // 04 a reminder you approve
  [7000, 8800], // 05 graduated, never awkward
  [8800, 10600], // 06 paid, the loop stops
  [10600, END], // 07 on record
];
/** The single stable frame shown when motion is reduced: paid, and the audit note posted. */
export const STILL_AT = END;

/** Largest single seek, in timeline units. Bigger jumps are split so every tween they cross is rendered. */
export const MAX_STEP = 200;

const INK = "#1d1d1f";
const LINE = "#ececef";
const BTN = "#2c2c30";
const OK = "#059669";
const LANE = "#e0312b";
const GREY = "#c7c7cc";

/** When the courtesy reminder is approved. */
const APPROVED = 6460;
const STATEMENT_SENT = 8330;
const PAID = 9300;

const clamp01 = (p: number) => Math.min(1, Math.max(0, p));

export function buildStory(root: HTMLElement, l: LoopLayout, A: Anime, still: boolean): Timeline {
  const $ = <T extends Element = HTMLElement>(s: string, el: ParentNode = root) => el.querySelector(s) as T;
  const $$ = <T extends Element = HTMLElement>(s: string, el: ParentNode = root) => Array.from(el.querySelectorAll(s)) as T[];
  const { set } = A.utils;

  const camera = $("[data-camera]");
  const captions = $$("[data-caption]");
  const rails = $$("[data-rail]");
  const pile = $$("[data-pile]");
  const pileBoxes = $$("[data-pile-box]");
  const chipWait = $("[data-chip-wait]");
  const chipLane = $("[data-chip-lane]");
  const inv = $("[data-inv]");
  const box = $("[data-inv-box]");
  const faceInvoice = $("[data-face-invoice]");
  const dot = $("[data-inv-dot]");
  const head = $("[data-inv-head]");
  const rows = $$("[data-inv-row]");
  const rowTicks = $$("[data-inv-tick]");
  const faceDraft = $("[data-face-draft]");
  const draftParts = $$("[data-draft-part]");
  const faceCard = $("[data-face-card]");
  const stations = $$("[data-station]");
  const stationDots = $$("[data-station-dot]");
  const cards = $$("[data-card]");
  const paidMark = $("[data-paid-mark]");
  const paid = $("[data-paid]");
  const paths = $("[data-paths]");

  const ring = A.svg.createDrawable($<SVGPathElement>("[data-ring]"));
  const progress = A.svg.createDrawable($<SVGPathElement>("[data-progress]"));
  const stems = $$<SVGPathElement>("[data-stem]").flatMap((s) => A.svg.createDrawable(s));
  const paidStem = $$<SVGPathElement>("[data-paid-stem]").flatMap((s) => A.svg.createDrawable(s));

  /* ---------- starting state ---------- */
  set(inv, { translateX: l.ring.x, translateY: l.ring.y });
  set(captions.slice(1), { opacity: 0 });
  set(rails, { scaleX: 0 });
  set([...ring, ...progress, ...stems, ...paidStem], { draw: "0 0" });

  // Text written from the playhead on every render, so it is right in either direction.
  const texts: { el: HTMLElement; render: (t: number) => string }[] = [
    { el: $("[data-chip-wait-value]"), render: (t) => String(Math.round(21 * clamp01((t - 300) / 900))) },
    {
      el: $("[data-chip-lane-value]"),
      render: (t) => {
        if (t >= PAID) return "Paid in full";
        if (t >= STATEMENT_SENT) return "Due +3 · statement sent";
        if (t >= APPROVED) return "T−3 days · courtesy note sent";
        if (t >= 3400) return "Due in 3 days";
        return "Open · watching";
      },
    },
    { el: $("[data-check-count]"), render: (t) => String(Math.min(4, Math.max(0, Math.floor((t - 2640) / 200) + 1))) },
  ];
  const renderTexts = (t: number) => {
    for (const x of texts) {
      const v = x.render(t);
      if (x.el.textContent !== v) x.el.textContent = v;
    }
  };

  const tl = A.createTimeline({
    defaults: { ease: "inOutQuad", duration: 300, composition: "none" },
    autoplay: false,
    onRender: (self) => renderTexts(self.currentTime),
  });
  const add = (targets: TargetsParam, params: AnimationParams, pos: number) => tl.add(targets, params, pos);

  /* ---------- captions and progress rail ---------- */
  SCENES.forEach(([s, e], i) => {
    if (i > 0) add(captions[i], { opacity: [0, 1], translateY: [12, 0], duration: 220 }, s);
    if (i < SCENES.length - 1) add(captions[i], { opacity: [1, 0], translateY: [0, -12], duration: 200 }, e - 200);
    add(rails[i], { scaleX: [0, 1], ease: "linear", duration: e - s }, s);
  });

  /* ---------- 01 lost in the inbox: everything else piles on top ---------- */
  add(chipWait, { opacity: [0, 1], duration: 240 }, 120);
  pile.forEach((p, i) => {
    const t = 250 + i * 160;
    add(p, { opacity: [0, 1], duration: 200 }, t);
    add(pileBoxes[i], { translateY: [-36, 0], ease: "outCubic", duration: 340 }, t);
  });
  add(faceInvoice, { opacity: [1, 0.5], ease: "linear", duration: 800 }, 400);

  /* ---------- 02 Lane watches the ledger: the invoice becomes Lane's core ---------- */
  add(chipWait, { opacity: [1, 0], duration: 200 }, 1440);
  pile.forEach((p, i) => {
    const t = 1460 + (pile.length - 1 - i) * 40;
    add(p, { opacity: [1, 0], duration: 240 }, t);
    add(pileBoxes[i], { translateY: [0, 28], ease: "inCubic", duration: 260 }, t);
  });
  add(faceInvoice, { opacity: [0.5, 1], duration: 240 }, 1520);
  add(chipLane, { opacity: [0, 1], duration: 200 }, 1640);
  add(faceInvoice, { opacity: [1, 0], duration: 160 }, 1800);
  add(box, { width: [l.invoice.w, PANEL.dot], height: [l.invoice.h, PANEL.dot], borderRadius: [18, PANEL.dot / 2], ease: "inOutCubic", duration: 380 }, 1840);
  add(box, { backgroundColor: ["#ffffff", INK], borderColor: [LINE, INK], ease: "linear", duration: 300 }, 1880);
  add(dot, { opacity: [0, 1], scale: [0.3, 1], ease: "outBack", duration: 200 }, 2170);
  add(camera, { scale: [1, 1.14], ease: "inOutSine", duration: 900 }, 1900);
  add(dot, { opacity: [1, 0], scale: [1, 0.4], duration: 140 }, 2380);
  add(box, { width: [PANEL.dot, PANEL.w], height: [PANEL.dot, panelH(0)], borderRadius: [PANEL.dot / 2, 18], ease: "inOutCubic", duration: 200 }, 2380);
  add(head, { opacity: [0, 1], duration: 180 }, 2480);
  rows.forEach((row, i) => {
    const r = 2640 + i * 200;
    add(box, { height: [panelH(i), panelH(i + 1)], ease: "outCubic", duration: 120 }, r - 60);
    add(row, { opacity: [0, 1], translateX: [-8, 0], ease: "outCubic", duration: 140 }, r - 20);
    add(rowTicks[i], { scale: [0.3, 1], ease: "outBack", duration: 160 }, r);
  });

  /* ---------- 03 every invoice gets a loop: the panel folds back and the Loop draws round it ---------- */
  add(rows, { opacity: [1, 0], duration: 120, delay: A.stagger(25, { from: "last" }) }, 3420);
  add(head, { opacity: [1, 0], duration: 120 }, 3460);
  add(camera, { scale: [1.14, 1], ease: "inOutSine", duration: 600 }, 3440);
  add(box, { width: [PANEL.w, PANEL.dot], height: [panelH(4), PANEL.dot], borderRadius: [18, PANEL.dot / 2], ease: "inOutCubic", duration: 360 }, 3520);
  add(dot, { opacity: [0, 1], scale: [0.4, 1], ease: "outBack", duration: 220 }, 3800);
  add(ring, { draw: ["0 0", "0 1"], ease: "inOutSine", duration: 700 }, 3700);
  stations.forEach((s, i) => {
    add(s, { opacity: [0, 1], duration: 160 }, 3900 + i * 220);
    add(stationDots[i], { scale: [0.3, 1], ease: "outBack", duration: 240 }, 3900 + i * 220);
  });

  /* ---------- 04 a reminder you approve ---------- */
  add(dot, { opacity: [1, 0], scale: [1, 0.4], duration: 140 }, 5020);
  add([paths, ...stations], { opacity: [1, 0.25], duration: 300 }, 5040);
  add(box, { width: [PANEL.dot, l.draft.w], height: [PANEL.dot, l.draft.h], borderRadius: [PANEL.dot / 2, 20], ease: "inOutCubic", duration: 440 }, 5060);
  add(box, { backgroundColor: [INK, "#ffffff"], borderColor: [INK, LINE], ease: "linear", duration: 280 }, 5120);
  add(draftParts, { opacity: [0, 1], translateY: [8, 0], ease: "outCubic", duration: 260, delay: A.stagger(130) }, 5400);
  const approve = $("[data-approve]");
  add(approve, { scale: [1, 0.96], duration: 70 }, APPROVED - 80);
  add(approve, { scale: [0.96, 1], backgroundColor: [BTN, OK], duration: 160 }, APPROVED - 10);
  add($("[data-approve-idle]"), { opacity: [1, 0], duration: 120 }, APPROVED - 10);
  add($("[data-approve-done]"), { opacity: [0, 1], duration: 160 }, APPROVED + 20);

  /* ---------- 05 graduated, never awkward: the reminder becomes the first card on the Loop ---------- */
  const c0 = l.cards[0];
  add(faceDraft, { opacity: [1, 0], duration: 200 }, 7020);
  add([paths, ...stations], { opacity: [0.25, 1], duration: 300 }, 7040);
  add(inv, { translateX: [l.ring.x, c0.x], translateY: [l.ring.y, c0.y], ease: "inOutCubic", duration: 560 }, 7100);
  add(box, { width: [l.draft.w, c0.w], height: [l.draft.h, c0.h], borderRadius: [20, 18], ease: "inOutCubic", duration: 560 }, 7100);
  add(faceCard, { opacity: [0, 1], duration: 220 }, 7540);
  if (stems[0]) add(stems[0], { draw: ["0 0", "0 1"], duration: 220 }, 7600);
  add(progress, { draw: ["0 0", `0 ${STATIONS[1]}`], ease: "inOutSine", duration: 600 }, 7760);
  cards.forEach((c, j) => {
    add(c, { opacity: [0, 1], translateY: [14, 0], ease: "outCubic", duration: 380 }, 8100 + j * 300);
    if (stems[j + 1]) add(stems[j + 1], { draw: ["0 0", "0 1"], duration: 220 }, 8180 + j * 300);
  });
  add($("[data-card-queued]", cards[0]), { opacity: [1, 0], duration: 140 }, STATEMENT_SENT - 30);
  add($("[data-card-end]", cards[0]), { opacity: [0, 1], duration: 180 }, STATEMENT_SENT);

  /* ---------- 06 paid, the loop stops ---------- */
  add(progress, { draw: [`0 ${STATIONS[1]}`, `0 ${PAID_AT}`], ease: "inOutSine", duration: 400 }, 8840);
  add(paidMark, { opacity: [0, 1], duration: 120 }, 9240);
  add($("span", paidMark), { scale: [0.3, 1], ease: "outBack", duration: 240 }, 9240);
  if (paidStem[0]) add(paidStem, { draw: ["0 0", "0 1"], duration: 240 }, 9280);
  add(paid, { opacity: [0, 1], translateY: [12, 0], ease: "outCubic", duration: 300 }, 9360);
  add($$("[data-paid-row]"), { opacity: [0, 1], translateY: [6, 0], duration: 180, delay: A.stagger(110) }, 9520);
  add($("[data-card-queued]", cards[1]), { opacity: [1, 0], duration: 140 }, 9740);
  add($("[data-card-end]", cards[1]), { opacity: [0, 1], duration: 180 }, 9760);
  add(cards[1], { opacity: [1, 0.55], duration: 200 }, 9780);
  add(stationDots[2], { backgroundColor: [LANE, GREY], duration: 200 }, 9780);

  /* ---------- 07 on record: the payment card grows into the audit note ---------- */
  const fade = 0.12;
  add([inv, cards[0], ...stations, paidMark, paths], { opacity: [1, fade], duration: 360 }, 10660);
  add(cards[1], { opacity: [0.55, fade], duration: 360 }, 10660);
  const p = l.paid;
  const a = l.audit;
  add(
    paid,
    {
      translateX: [0, a.x - a.w / 2 - (p.x - p.w / 2)],
      translateY: [0, a.y - a.h / 2 - (p.y - p.h / 2)],
      width: [p.w, a.w],
      height: [p.h, a.h],
      ease: "inOutCubic",
      duration: 620,
    },
    10780,
  );
  add($$("[data-audit-part]"), { opacity: [0, 1], translateY: [8, 0], ease: "outCubic", duration: 260, delay: A.stagger(160) }, 11300);
  add($("[data-audit-chip]"), { backgroundColor: ["#f5f5f7", "#ecfdf5"], color: ["#6e6e73", OK], duration: 220 }, 11800);
  tl.add({ end: 0 }, { end: 1, duration: 1 }, END - 1);

  if (still) {
    for (let t = MAX_STEP; t < STILL_AT; t += MAX_STEP) tl.seek(t);
    tl.seek(STILL_AT);
    set(captions, { opacity: 1, translateY: 0 });
  }
  renderTexts(tl.currentTime);
  return tl;
}
