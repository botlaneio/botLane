import type { AnimationParams, TargetsParam, Timeline } from "animejs";
import { CARD_IDS, STAGE_IDS, type StoryLayout } from "./layout";
import { CORE } from "./pipeline";

type Anime = typeof import("animejs");

/**
 * The whole story is one timeline, 0 → END units, seeked by scroll progress through the
 * stage. Scrolling back plays it in reverse. Scene boundaries are listed in SCENES so the
 * captions and the progress rail stay in step with the visuals.
 */
/** Scene 02 runs this much longer than the rest were laid out for: the cards land in Lane one row at a time. */
const D = 700;
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
  set(nodes, { translateX: l.hub.x, translateY: l.hub.y });
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

  /* ---------- 02 the connection: every source lands in Lane ---------- */
  // One dark shape carries the whole scene. It appears as a small core; as the cards travel in
  // it opens into a panel and each card becomes a ticked row; then it folds down to the size of
  // a pipeline step, turns white and hands over to the Structure step, which the others fan out of.
  const camera = $("[data-camera]");
  const core = $("[data-core]");
  const coreDot = $("[data-core-dot]");
  const coreHead = $("[data-core-head]");
  const coreRows = $$("[data-core-row]");
  const coreTicks = $$("[data-core-tick]");
  const node = l.node;
  const panelH = (n: number) => CORE.head + n * CORE.row + (n ? CORE.pad : 0);

  tl.add(hub, { opacity: [0, 1], duration: 260 }, 1250);
  tl.add(core, { scale: [0.4, 1], ease: "outBack", duration: 360 }, 1250);
  tl.add(routeLines, { draw: ["0 0", "0 1"], duration: 520, delay: A.stagger(90) }, 1320);
  tl.add(gaps, { opacity: [1, 0], duration: 180, delay: A.stagger(40) }, 1560);
  boxes.forEach((box, i) => {
    const [dx, dy, dr] = DRIFT[i];
    const r0 = l.scatter[CARD_IDS[i]].rotate + dr;
    tl.add(box, { translateX: [dx, 0], translateY: [dy, 0], rotate: [r0, 0], scale: [1, 0.34], ease: "inOutCubic", duration: 420 }, 1720 + i * 60);
  });
  tl.add(camera, { scale: [1, 1.22], ease: "inOutSine", duration: 1300 }, 2000);

  // The core opens just before the first card lands.
  tl.add(coreDot, { opacity: [1, 0], scale: [1, 0.4], duration: 140 }, 2520);
  tl.add(core, { width: [CORE.start, CORE.w], height: [CORE.start, panelH(0)], borderRadius: [CORE.start / 2, 18], ease: "inOutCubic", duration: 180 }, 2520);
  tl.add(coreHead, { opacity: [0, 1], duration: 160 }, 2620);

  // Each card travels in, slips into the panel and becomes its row.
  points.forEach((p, i) => {
    const path = A.svg.createMotionPath(routes[i]);
    const t = 2080 + i * 130;
    const land = t + 680;
    tl.add(p, { translateX: path.translateX, translateY: path.translateY, ease: "inOutSine", duration: 680 }, t);
    tl.add(boxes[i], { opacity: [1, 0], scale: [0.34, 0.12], duration: 160 }, land - 140);
    tl.add(core, { height: [panelH(i), panelH(i + 1)], ease: "outCubic", duration: 120 }, land - 60);
    tl.add(coreRows[i], { opacity: [0, 1], translateX: [-8, 0], ease: "outCubic", duration: 140 }, land - 20);
    tl.add(coreTicks[i], { scale: [0.3, 1], ease: "outBack", duration: 160 }, land);
  });
  counters.push({ el: hubCount, start: 2630, duration: 650, to: 5, decimals: 0, ease: (p) => Math.floor(p * 5) / 5 });
  tl.add(routes, { opacity: [1, 0], duration: 240 }, 3220);

  // Fold down to a pipeline step and hand over to Structure.
  tl.add(coreRows, { opacity: [1, 0], duration: 120, delay: A.stagger(25, { from: "last" }) }, 3460);
  tl.add(core, { width: [CORE.w, node.w], height: [panelH(5), node.h], borderRadius: [18, 16], ease: "inOutCubic", duration: 300 }, 3520);
  tl.add(coreHead, { opacity: [1, 0], duration: 120 }, 3600);
  tl.add(core, { backgroundColor: ["#1d1d1f", "#ffffff"], ease: "linear", duration: 200 }, 3640);
  tl.add(camera, { scale: [1.22, 1], ease: "inOutSine", duration: 520 }, 3480);
  tl.add(nodes[2], { opacity: [0, 1], duration: 100 }, 3820);
  tl.add(hub, { opacity: [1, 0], duration: 60 }, 3900);

  /* ---------- 03 the processing system: collect → validate → structure → review → deliver ---------- */
  nodes.forEach((n, i) => {
    if (i === 2) return;
    const s = l.stages[STAGE_IDS[i]];
    const t = 3240 + Math.abs(i - 2) * 70; // fan out of the Structure step
    add(n, { translateX: [l.hub.x, s.x], translateY: [l.hub.y, s.y], ease: "outCubic", duration: 520 }, t);
    add(n, { opacity: [0, 1], duration: 160 }, t);
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
