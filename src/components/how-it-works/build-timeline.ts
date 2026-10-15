import type { AnimationParams, TargetsParam, Timeline } from "animejs";
import type { FlowLayout } from "./layout";

type Anime = typeof import("animejs");

/**
 * The whole story is one timeline, 0 → END units, seeked by scroll progress through the
 * stage. Scrolling back plays it in reverse. Scene boundaries are listed in SCENES so the
 * captions and the progress rail stay in step with the visuals.
 */
export const END = 10800;
export const SCENES: [number, number][] = [
  [0, 1800], // 01 work is spread across tools
  [1800, 3600], // 02 connect once, scoped access
  [3600, 5400], // 03 Lane prepares the drafts
  [5400, 7200], // 04 everything waits on the approval desk
  [7200, 9000], // 05 you approve, one at a time
  [9000, END], // 06 delivered and on record
];
/** The single stable frame shown when motion is reduced: everything approved and sent. */
export const STILL_AT = END;

/** Largest single seek, in timeline units. Bigger jumps are split so every tween they cross is rendered. */
export const MAX_STEP = 200;

const BTN = "#2c2c30";
const OK = "#059669";
const SURFACE = "#f5f5f7";
const OK_TINT = "#e7f6f0";

/** When each draft is approved in scene 05. */
const APPROVE = [7500, 7950, 8400];
/** When each approved item starts travelling to its destination in scene 06. */
const SEND = [9250, 9500, 9750];
const TRAVEL = 380;

export function buildStory(root: HTMLElement, l: FlowLayout, A: Anime, still: boolean): Timeline {
  const $ = <T extends Element = HTMLElement>(s: string, el: ParentNode = root) => el.querySelector(s) as T;
  const $$ = <T extends Element = HTMLElement>(s: string, el: ParentNode = root) => Array.from(el.querySelectorAll(s)) as T[];
  const { set } = A.utils;

  const captions = $$("[data-caption]");
  const rails = $$("[data-rail]");
  const tools = $$("[data-tool]");
  const badges = $$("[data-tool-badge]");
  const coreGroup = $("[data-core-group]");
  const core = $("[data-core]");
  const scope = $("[data-scope]");
  const toolWireGroup = $("[data-tool-wires]");
  const laneWireGroup = $("[data-lane-wires]");
  const desk = $("[data-desk]");
  const cards = $$("[data-card]");
  const dests = $$("[data-dest]");
  const dots = $$("[data-send-dot]");

  const toolWires = $$<SVGPathElement>("[data-tool-wire]").flatMap((p) => A.svg.createDrawable(p));
  const laneWires = $$<SVGPathElement>("[data-lane-wire]").flatMap((p) => A.svg.createDrawable(p));
  const sendWires = $$<SVGPathElement>("[data-send-wire]").flatMap((p) => A.svg.createDrawable(p));

  /* ---------- starting state ---------- */
  tools.forEach((t, i) => set(t, { translateX: l.scatter[i].x, translateY: l.scatter[i].y, rotate: l.scatter[i].rotate }));
  cards.forEach((c, i) => set(c, { translateX: l.drafts[i].x, translateY: l.drafts[i].y }));
  dots.forEach((d, i) => set(d, { translateX: l.sendFrom[i].x - 5, translateY: l.sendFrom[i].y - 5 }));
  set(captions.slice(1), { opacity: 0 });
  set(rails, { scaleX: 0 });
  set([...toolWires, ...laneWires, ...sendWires], { draw: "0 0" });

  // The desk's counter is written from the playhead, so it is right in either direction.
  const count = $("[data-desk-count]");
  const renderCount = (t: number) => {
    const sent = SEND.filter((s) => t >= s + TRAVEL).length;
    const waiting = APPROVE.filter((a) => t < a).length;
    const v = sent > 0 ? `${sent} sent · on record` : waiting > 0 ? `${waiting} waiting` : "All approved";
    if (count.textContent !== v) count.textContent = v;
  };

  const tl = A.createTimeline({
    defaults: { ease: "inOutQuad", duration: 300, composition: "none" },
    autoplay: false,
    onRender: (self) => renderCount(self.currentTime),
  });
  const add = (targets: TargetsParam, params: AnimationParams, pos: number) => tl.add(targets, params, pos);

  /* ---------- captions and progress rail ---------- */
  SCENES.forEach(([s, e], i) => {
    if (i > 0) add(captions[i], { opacity: [0, 1], translateY: [12, 0], duration: 220 }, s);
    if (i < SCENES.length - 1) add(captions[i], { opacity: [1, 0], translateY: [0, -12], duration: 200 }, e - 200);
    add(rails[i], { scaleX: [0, 1], ease: "linear", duration: e - s }, s);
  });

  /* ---------- 01 work is spread across tools: every app has something waiting ---------- */
  badges.forEach((b, i) => add(b, { opacity: [0, 1], scale: [0.4, 1], ease: "outBack", duration: 240 }, 250 + i * 150));

  /* ---------- 02 connect once: the tools line up and wire into Lane ---------- */
  add(badges, { opacity: [1, 0], duration: 180 }, 1820);
  tools.forEach((t, i) => {
    const a = l.scatter[i];
    const b = l.lined[i];
    add(
      t,
      { translateX: [a.x, b.x], translateY: [a.y, b.y], rotate: [a.rotate, 0], ease: "inOutCubic", duration: 620 },
      1900 + i * 60,
    );
  });
  add(coreGroup, { opacity: [0, 1], duration: 200 }, 2350);
  add(core, { scale: [0.4, 1], ease: "outBack", duration: 320 }, 2350);
  toolWires.forEach((w, i) => add(w, { draw: ["0 0", "0 1"], ease: "inOutSine", duration: 420 }, 2650 + i * 70));
  add(scope, { opacity: [0, 1], translateY: [8, 0], ease: "outCubic", duration: 280 }, 3150);

  /* ---------- 03 Lane prepares the work: one draft per system ---------- */
  laneWires.forEach((w, i) => add(w, { draw: ["0 0", "0 1"], ease: "inOutSine", duration: 420 }, 3700 + i * 140));
  cards.forEach((c, i) => {
    const box = $("[data-card-box]", c);
    add(box, { opacity: [0, 1], translateX: [-14, 0], ease: "outCubic", duration: 320 }, 4050 + i * 160);
    add($("[data-s-draft]", c), { opacity: [1, 0], duration: 160 }, 4750 + i * 160);
    add($("[data-s-ready]", c), { opacity: [0, 1], duration: 200 }, 4800 + i * 160);
  });

  /* ---------- 04 everything waits for you: the drafts move onto the approval desk ---------- */
  add(tools, { opacity: [1, 0], duration: 320, delay: A.stagger(30) }, 5450);
  add([coreGroup, toolWireGroup, laneWireGroup], { opacity: [1, 0], duration: 320 }, 5480);
  add(desk, { opacity: [0, 1], scale: [0.96, 1], ease: "outCubic", duration: 380 }, 5650);
  cards.forEach((c, i) => {
    const a = l.drafts[i];
    const b = l.slots[i];
    add(c, { translateX: [a.x, b.x], translateY: [a.y, b.y], ease: "inOutCubic", duration: 600 }, 5700 + i * 90);
    add($("[data-approve]", c), { opacity: [0, 1], duration: 220 }, 6400 + i * 110);
  });

  /* ---------- 05 you approve: each button turns to a tick ---------- */
  cards.forEach((c, i) => {
    const at = APPROVE[i];
    const btn = $("[data-approve]", c);
    add(btn, { scale: [1, 0.94], duration: 80 }, at - 90);
    add(btn, { scale: [0.94, 1], backgroundColor: [BTN, OK], duration: 180 }, at - 10);
    add($("[data-approve-idle]", c), { opacity: [1, 0], duration: 120 }, at - 10);
    add($("[data-approve-done]", c), { opacity: [0, 1], duration: 160 }, at + 30);
  });

  /* ---------- 06 delivered and on record: each item travels out and is logged ---------- */
  add(dests, { opacity: [0, 1], translateY: [8, 0], ease: "outCubic", duration: 300, delay: A.stagger(110) }, 9050);
  SEND.forEach((s, i) => {
    const a = l.sendFrom[i];
    const b = l.sendTo[i];
    const c = cards[i];
    add(sendWires[i], { draw: ["0 0", "0 1"], ease: "linear", duration: TRAVEL }, s);
    add(dots[i], { opacity: [0, 1], duration: 60 }, s);
    add(dots[i], { translateX: [a.x - 5, b.x - 5], translateY: [a.y - 5, b.y - 5], ease: "linear", duration: TRAVEL }, s);
    add(dots[i], { opacity: [1, 0], duration: 100 }, s + TRAVEL);
    add($("[data-dest-icon]", dests[i]), { backgroundColor: [SURFACE, OK_TINT], color: ["#3a3a3c", OK], duration: 200 }, s + TRAVEL);
    add($("[data-dest-done]", dests[i]), { opacity: [0, 1], duration: 200 }, s + TRAVEL + 20);
    add($("[data-s-ready]", c), { opacity: [1, 0], duration: 160 }, s + 120);
    add($("[data-s-sent]", c), { opacity: [0, 1], duration: 200 }, s + 200);
  });
  tl.add({ end: 0 }, { end: 1, duration: 1 }, END - 1);

  if (still) {
    for (let t = MAX_STEP; t < STILL_AT; t += MAX_STEP) tl.seek(t);
    tl.seek(STILL_AT);
    set(captions, { opacity: 1, translateY: 0 });
  }
  renderCount(tl.currentTime);
  return tl;
}
