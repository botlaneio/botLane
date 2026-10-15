import type { AnimationParams, TargetsParam, Timeline } from "animejs";
import { CARD_IDS, STAGE_IDS, type StoryLayout } from "./layout";
import { BOX, LIST } from "./pipeline";

type Anime = typeof import("animejs");

/**
 * The whole story is one timeline, 0 → END units, seeked by scroll progress through the
 * stage. Scrolling back plays it in reverse. Scene boundaries are listed in SCENES so the
 * captions and the progress rail stay in step with the visuals.
 */
/** Scene 02 runs this much longer than the rest were laid out for: the logo, the push-in, the melt and the checklist. */
const D = 2600;
export const END = 10000 + D;
export const SCENES: [number, number][] = [
  [0, 1200], // 01 the problem
  [1200, 3000 + D], // 02 the connection
  [3000 + D, 5400 + D], // 03 the processing system
  [5400 + D, 7400 + D], // 04 the transformation
  [7400 + D, 8800 + D], // 05 human control
  [8800 + D, END], // 06 delivery
];
/** The single stable frame shown when motion is reduced: report approved, delivery started. */
export const STILL_AT = 8860 + D;

const LINE = "#ececef";
const SURFACE = "#f5f5f7";
const MUTED = "#6e6e73";
const LANE = "#e0312b";
const LANE_SOFT = "#f2a7a3";
const AMBER = "#fcd34d";
const AMBER_BG = "#fffbeb";
const GREEN = "#a7f3d0";
const GREEN_BG = "#ecfdf5";
const OK = "#059669";

// Scene 01 drift: each card wanders a little on its own, so the pile reads as unsorted.
const DRIFT: [number, number, number][] = [
  [-12, 8, -2],
  [10, -6, 2.5],
  [14, 10, -1.5],
  [-8, -10, 2],
  [12, -8, -2.5],
];

/** Largest single seek, in timeline units. Bigger jumps are split so every tween they cross is rendered. */
export const MAX_STEP = 200;

const outQuad = (p: number) => 1 - (1 - p) * (1 - p);
const clamp01 = (p: number) => Math.min(1, Math.max(0, p));

/**
 * Builds the paused timeline. The caller drives it (see reporting-story.tsx), seeking at most
 * MAX_STEP units at a time so scrolling back always restores the earlier states.
 */
export function buildStory(root: HTMLElement, l: StoryLayout, A: Anime, still: boolean): Timeline {
  const $ = <T extends Element = HTMLElement>(s: string, el: ParentNode = root) => el.querySelector(s) as T;
  const $$ = <T extends Element = HTMLElement>(s: string, el: ParentNode = root) => Array.from(el.querySelectorAll(s)) as T[];
  const { set } = A.utils;

  const points = CARD_IDS.map((id) => $(`[data-card="${id}"]`));
  const boxes = points.map((p) => $("[data-card-box]", p));
  const faceA = points.map((p) => $('[data-face="a"]', p));
  const faceB = points.map((p) => $('[data-face="b"]', p));
  const gaps = $$("[data-gap]");
  const hub = $("[data-hub]");
  const hubBox = $("[data-hub-box]");
  const hubCount = $("[data-hub-count]");
  const nodes = STAGE_IDS.map((id) => $(`[data-node="${id}"]`));
  const nodeBoxes = nodes.map((n) => $("[data-node-box]", n));
  const routes = CARD_IDS.map((id) => $<SVGPathElement>(`[data-route="${id}"]`));
  const connectors = $$<SVGPathElement>("[data-connector]");
  const packets = $$<SVGCircleElement>("[data-packet]");
  const group = $("[data-group]");
  const frame = $("[data-frame]");
  const parts = $$("[data-dash-part]");
  const status = (k: string) => $(`[data-status="${k}"]`);
  const review = $("[data-review]");
  const inbox = $("[data-inbox]");
  const thumb = $("[data-thumb]");
  const captions = $$("[data-caption]");
  const rails = $$("[data-rail]");

  /* ---------- starting state ---------- */
  CARD_IDS.forEach((id, i) => {
    set(points[i], { translateX: l.scatter[id].x, translateY: l.scatter[id].y });
    set(boxes[i], { rotate: l.scatter[id].rotate, width: l.card.w, height: l.card.h });
  });
  set(hubBox, { scale: 0.5 });
  set(nodes, { translateX: l.hub.x, translateY: l.hub.y });
  set(nodeBoxes, { scale: 0.7 });
  set(group, { transformOrigin: `${l.frame.x}px ${l.frame.y}px` });
  set(captions.slice(1), { opacity: 0 });
  set(rails, { scaleX: 0 });
  const routeLines = routes.flatMap((r) => A.svg.createDrawable(r));
  const connectorLines = connectors.flatMap((c) => A.svg.createDrawable(c));
  const chartLine = A.svg.createDrawable($<SVGPathElement>("[data-chart-line]"));
  set([...routeLines, ...connectorLines, ...chartLine], { draw: "0 0" });

  // Numbers are written from the playhead on every render, so they are right in either direction.
  const counters: { el: HTMLElement; start: number; duration: number; to: number; decimals: number; ease: (p: number) => number }[] = [];
  const renderCounters = (t: number) => {
    for (const c of counters) {
      const v = c.to * c.ease(clamp01((t - c.start) / c.duration));
      const text = v.toLocaleString("en-US", { minimumFractionDigits: c.decimals, maximumFractionDigits: c.decimals });
      if (c.el.textContent !== text) c.el.textContent = text;
    }
  };

  const tl = A.createTimeline({
    defaults: { ease: "inOutQuad", duration: 300, composition: "none" },
    autoplay: false,
    onRender: (self) => renderCounters(self.currentTime),
  });

  // Everything after scene 02 is laid out on the original clock; `at` moves it past the longer scene 02.
  const add = (targets: TargetsParam, params: AnimationParams, pos: number) => tl.add(targets, params, pos >= 3000 ? pos + D : pos);

  /* ---------- captions and progress rail ---------- */
  SCENES.forEach(([s, e], i) => {
    if (i > 0) tl.add(captions[i], { opacity: [0, 1], translateY: [12, 0], duration: 220 }, s);
    if (i < SCENES.length - 1) tl.add(captions[i], { opacity: [1, 0], translateY: [0, -12], duration: 200 }, e - 200);
    tl.add(rails[i], { scaleX: [0, 1], ease: "linear", duration: e - s }, s);
  });

  /* ---------- 01 the problem: scattered, misaligned, incomplete ---------- */
  tl.add(gaps, { opacity: [0, 1], scale: [0.85, 1], duration: 220, delay: A.stagger(110) }, 120);
  boxes.forEach((box, i) => {
    const [dx, dy, dr] = DRIFT[i];
    const r0 = l.scatter[CARD_IDS[i]].rotate;
    tl.add(box, { translateX: [0, dx], translateY: [0, dy], rotate: [r0, r0 + dr], ease: "inOutSine", duration: 1050 }, i * 45);
  });

  /* ---------- 02 the connection: paths link every source to Lane ---------- */
  // The hub starts as the botLane logo. The cards travel in and pour into it while the logo
  // grows and the camera pushes in; then the dots melt into one drop that becomes the red dot
  // of the Lane tile; then the camera eases out and the tile flows back into the logo.
  const camera = $("[data-camera]");
  const crisp = $("[data-hub-crisp]");
  const goo = $("[data-hub-goo]");
  const blur = $("[data-hub-blur]");
  const ink = $("[data-hub-ink]");
  const label = $("[data-hub-label]");
  tl.add(hub, { opacity: [0, 1], duration: 260 }, 1250);
  tl.add(hubBox, { scale: [0.5, 0.72], ease: "outCubic", duration: 360 }, 1250);
  tl.add(routeLines, { draw: ["0 0", "0 1"], duration: 520, delay: A.stagger(90) }, 1320);
  tl.add(gaps, { opacity: [1, 0], duration: 180, delay: A.stagger(40) }, 1560);
  boxes.forEach((box, i) => {
    const [dx, dy, dr] = DRIFT[i];
    const r0 = l.scatter[CARD_IDS[i]].rotate + dr;
    tl.add(box, { translateX: [dx, 0], translateY: [dy, 0], rotate: [r0, 0], scale: [1, 0.34], ease: "inOutCubic", duration: 420 }, 1720 + i * 60);
  });
  // Cards travel in and slip under the logo; each arrival makes the logo swell a little.
  const growth = [0.72, 0.78, 0.84, 0.9, 0.96, 1.02];
  points.forEach((p, i) => {
    const path = A.svg.createMotionPath(routes[i]);
    const t = 2080 + i * 130;
    tl.add(p, { translateX: path.translateX, translateY: path.translateY, ease: "inOutSine", duration: 680 }, t);
    tl.add(boxes[i], { opacity: [1, 0], scale: [0.34, 0.12], duration: 180 }, t + 560);
    tl.add(hubBox, { scale: [growth[i], growth[i + 1]], ease: "outBack", duration: 120 }, t + 600);
  });
  tl.add(routes, { opacity: [1, 0], duration: 260 }, 2900);
  tl.add(camera, { scale: [1, 1.32], ease: "inOutSine", duration: 1200 }, 2100);
  // The melt: dots go liquid, run together and pour into one drop.
  tl.add(crisp, { opacity: [1, 0], duration: 80 }, 3300);
  tl.add(goo, { opacity: [0, 1], duration: 80 }, 3300);
  tl.add(blur, { stdDeviation: [0.6, 3.2], ease: "inOutSine", duration: 360 }, 3310);
  tl.add(goo, { scale: [1, 0.07], ease: "inOutCubic", duration: 420 }, 3330);
  tl.add(hubBox, { scale: [1.02, 1], borderRadius: ["32.8px", "28px"], duration: 280 }, 3420);
  tl.add(ink, { opacity: [0, 1], duration: 260 }, 3420);
  tl.add(label, { opacity: [0, 1], duration: 180 }, 3700);
  tl.add(goo, { opacity: [1, 0], duration: 100 }, 3740);
  counters.push({ el: hubCount, start: 4240, duration: 460, to: 5, decimals: 0, ease: (p) => Math.floor(p * 5) / 5 });
  // The tile opens into a checklist of the five sources, ticks each one off, and closes again.
  const list = $("[data-hub-list]");
  const rows = $$("[data-hub-row]", list);
  tl.add(list, { opacity: [0, 1], duration: 60 }, 3820);
  tl.add(list, { scaleX: [BOX / LIST.w, 1], scaleY: [BOX / LIST.h, 1], ease: "inOutCubic", duration: 300 }, 3820);
  tl.add($("[data-hub-list-head]", list), { opacity: [0, 1], duration: 160 }, 4040);
  tl.add(rows, { opacity: [0, 1], translateY: [6, 0], duration: 160, delay: A.stagger(40) }, 4060);
  rows.forEach((row, i) => {
    const t = 4240 + i * 80;
    tl.add($("[data-row-pending]", row), { opacity: [1, 0], duration: 80 }, t);
    tl.add($("[data-row-done]", row), { opacity: [0, 1], scale: [0.4, 1], ease: "outBack", duration: 140 }, t);
  });
  tl.add([$("[data-hub-list-head]", list), ...rows], { opacity: [1, 0], duration: 120 }, 4720);
  tl.add(list, { scaleX: [1, BOX / LIST.w], scaleY: [1, BOX / LIST.h], ease: "inOutCubic", duration: 240 }, 4760);
  tl.add(list, { opacity: [1, 0], duration: 60 }, 4980);
  // Camera eases back out, and the tile flows back into the logo.
  tl.add(camera, { scale: [1.32, 1], ease: "inOutSine", duration: 440 }, 5000);
  tl.add(label, { opacity: [1, 0], duration: 140 }, 5160);
  tl.add(goo, { opacity: [0, 1], duration: 80 }, 5180);
  tl.add(goo, { scale: [0.07, 1], ease: "inOutCubic", duration: 380 }, 5190);
  tl.add(blur, { stdDeviation: [3.2, 0.6], ease: "inOutSine", duration: 340 }, 5240);
  tl.add(ink, { opacity: [1, 0], duration: 260 }, 5220);
  tl.add(hubBox, { borderRadius: ["28px", "32.8px"], duration: 260 }, 5220);
  tl.add(goo, { opacity: [1, 0], duration: 60 }, 5540);
  tl.add(crisp, { opacity: [0, 1], duration: 60 }, 5540);

  /* ---------- 03 the processing system: collect → validate → structure → review → deliver ---------- */
  add(hub, { opacity: [1, 0], duration: 240 }, 3180);
  add(hubBox, { scale: [1, 0.85], duration: 240 }, 3180);
  nodes.forEach((n, i) => {
    const s = l.stages[STAGE_IDS[i]];
    const t = 3200 + Math.abs(i - 2) * 80; // fan out from the centre
    add(n, { translateX: [l.hub.x, s.x], translateY: [l.hub.y, s.y], opacity: [0, 1], ease: "outCubic", duration: 520 }, t);
    add(nodeBoxes[i], { scale: [0.7, 1], ease: "outCubic", duration: 520 }, t);
  });
  const activate = (i: number, t: number) => {
    const n = nodes[i];
    add($("[data-node-badge]", n), { backgroundColor: [SURFACE, i === 3 ? "#f59e0b" : LANE], color: [MUTED, "#ffffff"], duration: 200 }, t);
    add(nodeBoxes[i], { borderColor: [LINE, i === 3 ? AMBER : LANE_SOFT], duration: 200 }, t);
    add($("[data-node-pending]", n), { opacity: [1, 0], duration: 160 }, t);
    add($("[data-node-done]", n), { opacity: [0, 1], translateY: [6, 0], duration: 220 }, t + 80);
  };
  activate(0, 3800);
  connectors.forEach((_, c) => {
    const t = 3960 + c * 380;
    add(connectorLines[c], { draw: ["0 0", "0 1"], ease: "inOutSine", duration: 300 }, t);
    if (c < 3) {
      const path = A.svg.createMotionPath(connectors[c]);
      add(packets[c], { translateX: path.translateX, translateY: path.translateY, ease: "inOutSine", duration: 300 }, t);
      add(packets[c], { opacity: [0, 1], duration: 50 }, t);
      add(packets[c], { opacity: [1, 0], duration: 60 }, t + 300);
      activate(c + 1, t + 300);
    }
  });

  /* ---------- 04 the transformation: the cards become a report ---------- */
  add([...connectors, ...packets], { opacity: 0, duration: 200 }, 5420);
  if (l.strip) {
    const { y, x0, x1, scale } = l.strip;
    nodes.forEach((n, i) => {
      const s = l.stages[STAGE_IDS[i]];
      add(n, { translateX: [s.x, x0 + (i * (x1 - x0)) / 4], translateY: [s.y, y], ease: "inOutCubic", duration: 520 }, 5440 + i * 40);
      add(nodeBoxes[i], { scale: [1, scale], ease: "inOutCubic", duration: 520 }, 5440 + i * 40);
    });
  } else {
    add(nodes, { opacity: [1, 0], duration: 260, delay: A.stagger(40) }, 5440);
  }
  add(frame, { opacity: [0, 1], scale: [0.97, 1], ease: "outCubic", duration: 420 }, 5640);
  CARD_IDS.forEach((id, i) => {
    const t = 5900 + i * 90;
    const tile = l.tiles[id];
    add(points[i], { translateX: [l.hub.x, tile.x], translateY: [l.hub.y, tile.y], ease: "inOutCubic", duration: 640 }, t);
    add(boxes[i], { opacity: [0, 1], duration: 180 }, t);
    add(boxes[i], { scale: [0.18, 1], width: [l.card.w, tile.w], height: [l.card.h, tile.h], ease: "inOutCubic", duration: 640 }, t);
    add(faceA[i], { opacity: [1, 0], duration: 200 }, t + 220);
    add(faceB[i], { opacity: [0, 1], duration: 260 }, t + 380);
  });
  add(parts, { opacity: [0, 1], translateY: [14, 0], ease: "outCubic", duration: 380, delay: A.stagger(110) }, 6180);
  add(chartLine, { draw: ["0 0", "0 1"], ease: "inOutSine", duration: 620 }, 6460);
  add($("[data-chart-area]"), { opacity: [0, 0.08], duration: 300 }, 6800);
  add($("[data-chart-dot]"), { opacity: [0, 1], scale: [0.4, 1], duration: 160 }, 7060);
  $$("[data-count]").forEach((el) => {
    const target = Number(el.dataset.count);
    const decimals = Number(el.dataset.decimals ?? 0);
    counters.push({ el, start: 6420 + D, duration: 620, to: target, decimals, ease: outQuad });
  });
  add(status("draft"), { opacity: [1, 0], duration: 160 }, 7120);
  add(status("awaiting"), { opacity: [0, 1], duration: 200 }, 7160);

  /* ---------- 05 human control: review, exception, resolve, approve ---------- */
  const aside = l.frameAside;
  if (l.strip) add(nodes, { opacity: [1, 0], duration: 240 }, 7400);
  add(group, { translateX: [0, aside.x], translateY: [0, aside.y], scale: [1, aside.scale], ease: "inOutCubic", duration: 520 }, 7420);
  const fromSide = l.key === "desktop" ? [48, 0, 0, 0] : [0, 0, 60, 0];
  add(review, { opacity: [0, 1], translateX: fromSide.slice(0, 2), translateY: fromSide.slice(2), ease: "outCubic", duration: 420 }, 7560);
  add($$("[data-review-row]"), { opacity: [0, 1], translateY: [8, 0], duration: 220, delay: A.stagger(90) }, 7820);
  const excRow = $("[data-review-exc]");
  const excTile = $("[data-exceptions]");
  add(excRow, { borderColor: ["rgba(0,0,0,0)", AMBER], backgroundColor: ["rgba(255,255,255,0)", AMBER_BG], duration: 200 }, 8060);
  add(excTile, { borderColor: [LINE, AMBER], backgroundColor: ["#ffffff", AMBER_BG], duration: 200 }, 8060);
  add($$("[data-exc-open]"), { opacity: [1, 0], duration: 180 }, 8300);
  add($$("[data-exc-closed]"), { opacity: [0, 1], duration: 220 }, 8340);
  add(excRow, { borderColor: [AMBER, GREEN], backgroundColor: [AMBER_BG, GREEN_BG], duration: 220 }, 8320);
  add(excTile, { borderColor: [AMBER, GREEN], backgroundColor: [AMBER_BG, GREEN_BG], duration: 220 }, 8320);
  const approve = $("[data-approve]");
  add(approve, { scale: [1, 0.96], duration: 70 }, 8520);
  add(approve, { scale: [0.96, 1], backgroundColor: ["#2c2c30", OK], duration: 160 }, 8590);
  add($("[data-approve-idle]"), { opacity: [1, 0], duration: 120 }, 8590);
  add($("[data-approve-done]"), { opacity: [0, 1], duration: 160 }, 8620);
  add(status("awaiting"), { opacity: [1, 0], duration: 140 }, 8640);
  add(status("approved"), { opacity: [0, 1], duration: 180 }, 8660);
  add($("[data-delivery-started]"), { opacity: [0, 1], translateY: [6, 0], duration: 160 }, 8700);

  /* ---------- 06 delivery: the report reaches the client ---------- */
  add(review, { opacity: [1, 0], duration: 220 }, 8860);
  add(inbox, { opacity: [0, 1], duration: 260 }, 8980);
  const route = A.svg.createMotionPath($<SVGPathElement>("[data-delivery-path]"));
  add(thumb, { opacity: [0, 1], scale: [0.7, 1], duration: 160 }, 9080);
  add(thumb, { translateX: route.translateX, translateY: route.translateY, ease: "inOutCubic", duration: 520 }, 9140);
  add(thumb, { opacity: [1, 0], scale: [1, 0.6], duration: 140 }, 9620);
  add($("[data-inbox-new]"), { opacity: [0, 1], translateY: [-10, 0], ease: "outCubic", duration: 240 }, 9620);
  add(status("approved"), { opacity: [1, 0], duration: 140 }, 9660);
  add(status("delivered"), { opacity: [0, 1], duration: 180 }, 9680);
  add($$("[data-inbox-row]"), { opacity: [0, 1], translateY: [6, 0], duration: 200, delay: A.stagger(70) }, 9760);
  tl.add({ end: 0 }, { end: 1, duration: 1 }, END - 1);

  if (still) {
    for (let t = MAX_STEP; t < STILL_AT; t += MAX_STEP) tl.seek(t);
    tl.seek(STILL_AT);
    set(captions, { opacity: 1, translateY: 0 });
  }
  renderCounters(tl.currentTime);
  return tl;
}
