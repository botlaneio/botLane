import type { AnimationParams, TargetsParam, Timeline } from "animejs";
import { PANEL, along, panelH, type LeadLayout } from "./layout";

type Anime = typeof import("animejs");

/**
 * The whole story is one timeline, 0 → END units, seeked by scroll progress through the
 * stage. Scrolling back plays it in reverse. Scene boundaries are listed in SCENES so the
 * captions and the progress rail stay in step with the visuals.
 */
export const END = 10000;
export const SCENES: [number, number][] = [
  [0, 1400], // 01 every enquiry starts a clock
  [1400, 2800], // 02 Lane picks it up
  [2800, 4600], // 03 research
  [4600, 6600], // 04 draft, approved by you
  [6600, 8400], // 05 the Line
  [8400, END], // 06 booked, sequence stops
];
/** The single stable frame shown when motion is reduced: the call booked, the rest cancelled. */
export const STILL_AT = END;

/** Largest single seek, in timeline units. Bigger jumps are split so every tween they cross is rendered. */
export const MAX_STEP = 200;

const INK = "#1d1d1f";
const LINE = "#ececef";
const BTN = "#2c2c30";
const OK = "#059669";
const LANE = "#e0312b";
const GREY = "#c7c7cc";

/** When the reply is approved; the response clock stops here. */
const APPROVED = 6080;
/** Illustrative response time shown on the clock at approval: 2m 14s. */
const REPLY_SECONDS = 134;

const clamp01 = (p: number) => Math.min(1, Math.max(0, p));

export function buildStory(root: HTMLElement, l: LeadLayout, A: Anime, still: boolean): Timeline {
  const $ = <T extends Element = HTMLElement>(s: string, el: ParentNode = root) => el.querySelector(s) as T;
  const $$ = <T extends Element = HTMLElement>(s: string, el: ParentNode = root) => Array.from(el.querySelectorAll(s)) as T[];
  const { set } = A.utils;

  const camera = $("[data-camera]");
  const captions = $$("[data-caption]");
  const rails = $$("[data-rail]");
  const ticks = $$("[data-tick]");
  const waitDot = $("[data-wait-dot]");
  const typical = $("[data-typical]");
  const laneMark = $("[data-lane-mark]");
  const clockWait = $("[data-clock-wait]");
  const clockLane = $("[data-clock-lane]");
  const lead = $("[data-lead]");
  const box = $("[data-lead-box]");
  const faceForm = $("[data-face-form]");
  const dot = $("[data-lead-dot]");
  const head = $("[data-lead-head]");
  const rows = $$("[data-lead-row]");
  const rowTicks = $$("[data-lead-tick]");
  const faceDraft = $("[data-face-draft]");
  const draftParts = $$("[data-draft-part]");
  const faceTouch = $("[data-face-touch]");
  const stations = $$("[data-station]");
  const touches = $$("[data-touch]");
  const bookMark = $("[data-book-mark]");
  const booked = $("[data-booked]");

  const line = A.svg.createDrawable($<SVGPathElement>("[data-line]"));
  const progress = A.svg.createDrawable($<SVGPathElement>("[data-progress]"));
  const stems = $$<SVGPathElement>("[data-stem]").flatMap((s) => A.svg.createDrawable(s));
  const bookStem = A.svg.createDrawable($<SVGPathElement>("[data-book-stem]"));

  /* ---------- starting state ---------- */
  set(lead, { translateX: l.lead.x, translateY: l.lead.y });
  const p0 = along(l, 0);
  const p1 = along(l, 1);
  set(waitDot, { translateX: p0.x, translateY: p0.y });
  set(captions.slice(1), { opacity: 0 });
  set(rails, { scaleX: 0 });
  set([...line, ...progress, ...stems, ...bookStem], { draw: "0 0" });

  // Text written from the playhead on every render, so it is right in either direction.
  const texts: { el: HTMLElement; render: (t: number) => string }[] = [
    {
      el: $("[data-clock-wait-value]"),
      render: (t) => {
        const mins = Math.round(240 * clamp01((t - 320) / 830));
        return `${Math.floor(mins / 60)}h ${String(mins % 60).padStart(2, "0")}m`;
      },
    },
    {
      el: $("[data-clock-lane-value]"),
      render: (t) => {
        if (t >= APPROVED) return "2:14 · sent";
        const s = Math.floor(REPLY_SECONDS * clamp01((t - 1700) / (APPROVED - 1700)));
        return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
      },
    },
    {
      el: $("[data-check-count]"),
      render: (t) => String(Math.min(5, Math.max(0, Math.floor((t - 3180) / 260) + 1))),
    },
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

  /* ---------- 01 every enquiry starts a clock: the lead waits and cools ---------- */
  add(clockWait, { opacity: [0, 1], duration: 240 }, 120);
  add(line, { draw: ["0 0", "0 1"], ease: "inOutSine", duration: 700 }, 100);
  add(ticks, { opacity: [0, 1], duration: 200, delay: A.stagger(120) }, 200);
  add(waitDot, { opacity: [0, 1], duration: 120 }, 300);
  add(waitDot, { translateX: [p0.x, p1.x], translateY: [p0.y, p1.y], ease: "linear", duration: 830 }, 320);
  add(faceForm, { opacity: [1, 0.45], ease: "linear", duration: 730 }, 420);
  add(typical, { opacity: [0, 1], translateY: [6, 0], duration: 200 }, 1050);

  /* ---------- 02 Lane picks it up: the enquiry becomes Lane's core ---------- */
  add([waitDot, typical, clockWait], { opacity: [1, 0], duration: 200 }, 1440);
  add(ticks, { opacity: [1, 0], duration: 180, delay: A.stagger(30) }, 1440);
  add(line, { opacity: [1, 0.35], duration: 300 }, 1460);
  add(faceForm, { opacity: [0.45, 1], duration: 240 }, 1480);
  add(laneMark, { opacity: [0, 1], duration: 160 }, 1600);
  add($("[data-lane-mark-dot]"), { scale: [0.3, 1], ease: "outBack", duration: 260 }, 1600);
  add(clockLane, { opacity: [0, 1], duration: 200 }, 1640);
  add(faceForm, { opacity: [1, 0], duration: 160 }, 1960);
  add(box, { width: [l.form.w, PANEL.dot], height: [l.form.h, PANEL.dot], borderRadius: [18, PANEL.dot / 2], ease: "inOutCubic", duration: 380 }, 2000);
  add(box, { backgroundColor: ["#ffffff", INK], borderColor: [LINE, INK], ease: "linear", duration: 300 }, 2040);
  add(dot, { opacity: [0, 1], scale: [0.3, 1], ease: "outBack", duration: 220 }, 2330);
  add(camera, { scale: [1, 1.16], ease: "inOutSine", duration: 1100 }, 2300);

  /* ---------- 03 researched before it's answered: one row per check ---------- */
  add(dot, { opacity: [1, 0], scale: [1, 0.4], duration: 140 }, 2860);
  add(box, { width: [PANEL.dot, PANEL.w], height: [PANEL.dot, panelH(0)], borderRadius: [PANEL.dot / 2, 18], ease: "inOutCubic", duration: 200 }, 2860);
  add(head, { opacity: [0, 1], duration: 180 }, 2960);
  rows.forEach((row, i) => {
    const r = 3180 + i * 260;
    add(box, { height: [panelH(i), panelH(i + 1)], ease: "outCubic", duration: 120 }, r - 60);
    add(row, { opacity: [0, 1], translateX: [-8, 0], ease: "outCubic", duration: 140 }, r - 20);
    add(rowTicks[i], { scale: [0.3, 1], ease: "outBack", duration: 160 }, r);
  });

  /* ---------- 04 drafted in your tone, approved by you ---------- */
  add(rows, { opacity: [1, 0], duration: 120, delay: A.stagger(25, { from: "last" }) }, 4600);
  add(head, { opacity: [1, 0], duration: 120 }, 4640);
  add(camera, { scale: [1.16, 1], ease: "inOutSine", duration: 600 }, 4620);
  add(box, { width: [PANEL.w, l.draft.w], height: [panelH(5), l.draft.h], borderRadius: [18, 20], ease: "inOutCubic", duration: 440 }, 4720);
  add(box, { backgroundColor: [INK, "#ffffff"], borderColor: [INK, LINE], ease: "linear", duration: 280 }, 4780);
  add(draftParts, { opacity: [0, 1], translateY: [8, 0], ease: "outCubic", duration: 260, delay: A.stagger(130) }, 5000);
  const approve = $("[data-approve]");
  add(approve, { scale: [1, 0.96], duration: 70 }, APPROVED - 80);
  add(approve, { scale: [0.96, 1], backgroundColor: [BTN, OK], duration: 160 }, APPROVED - 10);
  add($("[data-approve-idle]"), { opacity: [1, 0], duration: 120 }, APPROVED - 10);
  add($("[data-approve-done]"), { opacity: [0, 1], duration: 160 }, APPROVED + 20);

  /* ---------- 05 the Line: the reply becomes the first follow-up ---------- */
  const t0 = l.touches[0];
  add([clockLane, laneMark, faceDraft], { opacity: [1, 0], duration: 200 }, 6620);
  add(line, { opacity: [0.35, 1], duration: 300 }, 6640);
  add(lead, { translateX: [l.lead.x, t0.x], translateY: [l.lead.y, t0.y], ease: "inOutCubic", duration: 560 }, 6700);
  add(box, { width: [l.draft.w, t0.w], height: [l.draft.h, t0.h], borderRadius: [20, 18], ease: "inOutCubic", duration: 560 }, 6700);
  add(faceTouch, { opacity: [0, 1], duration: 220 }, 7140);
  stations.forEach((s, i) => {
    add(s, { opacity: [0, 1], duration: 160 }, 7000 + i * 180);
    add($("[data-station-dot]", s), { scale: [0.3, 1], ease: "outBack", duration: 240 }, 7000 + i * 180);
  });
  const [s0, s1] = l.stations;
  add(progress, { draw: ["0 0", `0 ${s0}`], duration: 200 }, 7060);
  if (stems[0]) add(stems[0], { draw: ["0 0", "0 1"], duration: 220 }, 7200);
  touches.forEach((t, j) => {
    add(t, { opacity: [0, 1], translateY: [14, 0], ease: "outCubic", duration: 380 }, 7400 + j * 200);
    if (stems[j + 1]) add(stems[j + 1], { draw: ["0 0", "0 1"], duration: 220 }, 7480 + j * 200);
  });

  /* ---------- 06 they book, Lane stops ---------- */
  add(progress, { draw: [`0 ${s0}`, `0 ${s1}`], ease: "inOutSine", duration: 520 }, 8440);
  add($("[data-touch-queued]", touches[0]), { opacity: [1, 0], duration: 140 }, 8980);
  add($("[data-touch-end]", touches[0]), { opacity: [0, 1], duration: 180 }, 9010);
  add(progress, { draw: [`0 ${s1}`, `0 ${l.bookedAt}`], ease: "inOutSine", duration: 320 }, 9200);
  add(bookMark, { opacity: [0, 1], duration: 120 }, 9500);
  add($("span", bookMark), { scale: [0.3, 1], ease: "outBack", duration: 240 }, 9500);
  add(bookStem, { draw: ["0 0", "0 1"], ease: "inOutSine", duration: 280 }, 9540);
  add(booked, { opacity: [0, 1], translateY: [12, 0], ease: "outCubic", duration: 300 }, 9600);
  add($$("[data-booked-row]"), { opacity: [0, 1], translateY: [6, 0], duration: 180, delay: A.stagger(90) }, 9760);
  add($("[data-touch-queued]", touches[1]), { opacity: [1, 0], duration: 140 }, 9780);
  add($("[data-touch-end]", touches[1]), { opacity: [0, 1], duration: 180 }, 9800);
  add(touches[1], { opacity: [1, 0.55], duration: 200 }, 9820);
  add($("[data-station-dot]", stations[2]), { backgroundColor: [LANE, GREY], duration: 200 }, 9820);
  tl.add({ end: 0 }, { end: 1, duration: 1 }, END - 1);

  if (still) {
    for (let t = MAX_STEP; t < STILL_AT; t += MAX_STEP) tl.seek(t);
    tl.seek(STILL_AT);
    set(captions, { opacity: 1, translateY: 0 });
  }
  renderTexts(tl.currentTime);
  return tl;
}
