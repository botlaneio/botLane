import type { AnimationParams, TargetsParam, Timeline } from "animejs";
import { railFractions, type Box, type StoryLayout } from "./layout";
import { BLOCKED_GATE, BLOCKED_ROW } from "./story-parts";

type Anime = typeof import("animejs");

/**
 * The whole story is one timeline, 0 → END units, seeked by scroll progress through the
 * stage. Scrolling back plays it in reverse. Seven scenes of equal length:
 * a demo arrives → Source → Security → Recovery → missing means blocked → Launch → people decide.
 * The camera only ever moves down the lane with the release, never sideways or in and out.
 */
const SCENE = 1800;
export const END = SCENE * 7;
export const SCENES: [number, number][] = Array.from({ length: 7 }, (_, i) => [i * SCENE, (i + 1) * SCENE]);
/** The single stable frame shown when motion is reduced: all evidence attached, both decisions waiting. */
export const STILL_AT = END;

/** Largest single seek, in timeline units. Bigger jumps are split so every tween they cross is rendered. */
export const MAX_STEP = 200;

const fade = (to: 0 | 1) => (to ? [0, 1] : [1, 0]);
/** Inverse of inOutSine: the time fraction at which an eased move has covered fraction u of its distance. */
const easeInv = (u: number) => Math.acos(1 - 2 * Math.min(1, Math.max(0, u))) / Math.PI;

export function buildStory(root: HTMLElement, l: StoryLayout, A: Anime, still: boolean): Timeline {
  const $ = <T extends Element = HTMLElement>(s: string, el: ParentNode = root) => el.querySelector(s) as T;
  const $$ = <T extends Element = HTMLElement>(s: string, el: ParentNode = root) => Array.from(el.querySelectorAll(s)) as T[];
  const { set } = A.utils;

  const captions = $$("[data-caption]");
  const rails = $$("[data-rail]");
  const release = $("[data-release]");
  const strip = $("[data-strip]");
  const parallax = $("[data-parallax]");
  const numerals = $$("[data-numeral]");
  const panels = $$("[data-panel]");
  const pins = $$("[data-panel-pin]");
  const arts = $$<SVGSVGElement>("[data-art]");
  const gates = $$("[data-gate]");
  const ticks = $$("[data-tick]");
  const prod = $("[data-prod]");
  const token = $("[data-token]");
  const barrier = $("[data-barrier]");
  const approvals = $("[data-approvals]");
  const head = (k: string) => $(`[data-h-${k}]`);
  const [railDone] = A.svg.createDrawable($<SVGPathElement>("[data-rail-done]"));

  /* ---------- camera: the strip slides up, the numerals behind it at half the speed ---------- */
  const cam = { fy: l.camStart };
  const applyCam = () => {
    const dy = l.cy - cam.fy;
    strip.style.transform = `translateY(${dy}px)`;
    parallax.style.transform = `translateY(${dy * l.depth}px)`;
    // Phones: each panel stops under the bar while its cards pass, then leaves with its block.
    const { pinTop } = l;
    if (pinTop === null) return;
    pins.forEach((pin, p) => {
      const natural = l.panels[p].y + dy;
      const limit = l.blocks[p].bottom + dy - l.panels[p].h;
      const offset = Math.max(0, Math.min(pinTop, limit) - natural);
      pin.style.transform = offset ? `translateY(${offset}px)` : "";
    });
  };

  /* ---------- starting state ---------- */
  const rect = (b: Box) => ({ left: b.x - b.w / 2, top: b.y - b.h / 2, width: b.w, height: b.h });
  set(release, { ...rect(l.release.big), borderRadius: "18px" });
  set(captions.slice(1), { opacity: 0 });
  set(rails, { scaleX: 0 });
  set(railDone, { draw: "0 0" });
  set(barrier, { scaleX: 0, scaleY: 0 });
  set($$("[data-approval]"), { opacity: 0 });
  set(token, { translateX: l.rail[0].x, translateY: l.rail[0].y });
  // Each gate's drawing waits, faded, until the release reaches the gate.
  const drawables = new Map<Element, ReturnType<typeof A.svg.createDrawable>[number]>();
  for (const art of arts) {
    set($("[data-art-body]", art), { opacity: 0.3 });
    for (const el of $$<SVGGeometryElement>("[data-draw]", art)) {
      const [d] = A.svg.createDrawable(el);
      drawables.set(el, d);
      set(d, { draw: "0 0" });
    }
    for (const el of $$("[data-grow]", art)) set(el, { scaleX: 0 });
    for (const el of $$("[data-pop]", art)) set(el, { scale: 0.3, opacity: 0 });
  }
  applyCam();

  const tl = A.createTimeline({
    defaults: { ease: "inOutQuad", duration: 300, composition: "none" },
    autoplay: false,
    onRender: applyCam,
  });
  const add = (targets: TargetsParam, params: AnimationParams, pos: number) => tl.add(targets, params, pos);

  /** Cross-fade between two stacked states. */
  const swap = (from: TargetsParam, to: TargetsParam, at: number, d = 180) => {
    add(from, { opacity: fade(0), duration: d * 0.8 }, at);
    add(to, { opacity: fade(1), duration: d }, at + d * 0.25);
  };

  let camAt = l.camStart;
  const camTo = (fy: number, at: number, duration: number) => {
    if (fy === camAt) return;
    add(cam, { fy: [camAt, fy], ease: "inOutSine", duration }, at);
    camAt = fy;
  };

  // The release travels the lane point by point, eased as one move; the red lane fills in behind it.
  const frac = railFractions(l.rail);
  let tokAt = 0;
  const tokenTo = (stop: number, at: number, duration: number) => {
    const f0 = frac[tokAt];
    const span = frac[stop] - f0;
    for (let k = tokAt; k < stop; k++) {
      const t0 = at + duration * easeInv((frac[k] - f0) / span);
      const t1 = at + duration * easeInv((frac[k + 1] - f0) / span);
      if (t1 - t0 < 0.01) continue;
      const a = l.rail[k];
      const b = l.rail[k + 1];
      add(token, { translateX: [a.x, b.x], translateY: [a.y, b.y], ease: "linear", duration: t1 - t0 }, t0);
    }
    add(railDone, { draw: [`0 ${f0}`, `0 ${frac[stop]}`], ease: "inOutSine", duration }, at);
    tokAt = stop;
  };

  const rowsOf = (g: number) => $$("[data-row]", gates[g]);
  const ring = (g: number, on: boolean, at: number) => add($("[data-gate-ring]", gates[g]), { opacity: fade(on ? 1 : 0), duration: 150 }, at);
  const attachRow = (g: number, r: number, at: number, from = "req") =>
    swap($$(`[data-r-${from}]`, rowsOf(g)[r]), $$("[data-r-att]", rowsOf(g)[r]), at, 160);
  const settle = (g: number, at: number, from = "req") => {
    add($("[data-gate-bar]", gates[g]), { scaleX: [0, 1], ease: "outCubic", duration: 220 }, at);
    swap($(`[data-f-${from}]`, gates[g]), $("[data-f-att]", gates[g]), at + 20);
  };
  /** A card rises into its place on the lane, tilted slightly away, before the release reaches it. */
  const rise = (g: number, at: number) => {
    const tilt = l.sides[g] === "left" ? -3 : 3;
    add(gates[g], { opacity: [0, 1], translateY: [70, 0], rotate: [tilt, 0], ease: "outCubic", duration: 340 }, at);
  };

  /** A gate's drawing comes to life: strokes draw, bars grow, parts pop in, sliders move. */
  const playArt = (g: number, at: number, late = false) => {
    const art = arts[g];
    const pick = (sel: string) => $$(sel, art).filter((el) => el.hasAttribute("data-late") === late);
    if (!late) add($("[data-art-body]", art), { opacity: [0.3, 1], duration: 200 }, at);
    pick("[data-draw]").forEach((el, i) => add(drawables.get(el)!, { draw: ["0 0", "0 1"], ease: "inOutSine", duration: 300 }, at + 40 + i * 70));
    pick("[data-grow]").forEach((el, i) => add(el, { scaleX: [0, 1], ease: "outCubic", duration: 260 }, at + 100 + i * 60));
    pick("[data-pop]").forEach((el, i) => add(el, { scale: [0.3, 1], opacity: [0, 1], ease: "outBack", duration: 240 }, at + 140 + i * 45));
    pick("[data-slide]").forEach((el) => add(el, { translateX: [0, Number(el.getAttribute("data-dx"))], ease: "inOutCubic", duration: 420 }, at + 160));
  };

  /**
   * One gate: the camera and the release move down together, the gate lights up, each piece of
   * evidence is pinned to this commit, and the gate settles at "attached · for review". Never "passed".
   */
  const visit = (g: number, arrive: number, move = 280, opts: { skipRow?: number; hold?: boolean } = {}) => {
    const leave = arrive - move;
    camTo(l.camGate[g], leave - 40, move + 120);
    tokenTo(l.gateStop[g], leave, move);
    add(ticks[g], { opacity: [0, 1], duration: 120 }, arrive - 30);
    ring(g, true, arrive - 40);
    playArt(g, arrive - 20);
    [0, 1, 2].forEach((r) => r !== opts.skipRow && attachRow(g, r, arrive + 60 + r * 70));
    if (opts.hold) return;
    settle(g, arrive + 260);
    ring(g, false, arrive + 380);
  };
  /** A phase comes into view: its panel slides in from its own side, its numeral fades up, its first card rises. */
  const enterPhase = (p: number, at: number, firstArrive: number) => {
    const dx = l.sides[p * 3] === "right" ? -60 : 60;
    add(panels[p], { opacity: [0, 1], translateX: [dx, 0], translateY: [40, 0], ease: "outCubic", duration: 420 }, at);
    add(numerals[p], { opacity: [0, 1], duration: 400 }, at);
    rise(p * 3, firstArrive - 420);
  };

  /* ---------- captions and progress rail ---------- */
  SCENES.forEach(([s, e], i) => {
    if (i > 0) add(captions[i], { opacity: [0, 1], translateY: [12, 0], duration: 220 }, s);
    if (i < SCENES.length - 1) add(captions[i], { opacity: [1, 0], translateY: [0, -12], duration: 200 }, e - 200);
    add(rails[i], { scaleX: [0, 1], ease: "linear", duration: e - s }, s);
  });

  /* ---------- 01 a working demo arrives; the lane and Phase I appear below it ---------- */
  const big = rect(l.release.big);
  const bar = rect(l.release.bar);
  add(
    release,
    {
      left: [big.left, bar.left],
      top: [big.top, bar.top],
      width: [big.width, bar.width],
      height: [big.height, bar.height],
      borderRadius: ["18px", l.compact ? "14px" : "16px"],
      ease: "inOutCubic",
      duration: 650,
    },
    450,
  );
  add(token, { opacity: [0, 1], duration: 200 }, 1000);
  enterPhase(0, 950, 1500);
  rise(1, 1250);

  /* ---------- 02 Source: gates 01 to 03 ---------- */
  let S = SCENES[1][0];
  swap(head("demo"), head("collect"), S + 120);
  visit(0, S + 450, 320);
  rise(2, S + 500);
  visit(1, S + 850);
  visit(2, S + 1250);

  /* ---------- 03 Security: gates 04 to 06 ---------- */
  S = SCENES[2][0];
  enterPhase(1, S + 60, S + 500);
  visit(3, S + 500, 400);
  rise(4, S + 520);
  visit(4, S + 900);
  rise(5, S + 920);
  visit(5, S + 1300);

  /* ---------- 04 Recovery: gate 07, then 08 is missing its restore drill ---------- */
  S = SCENES[3][0];
  enterPhase(2, S + 60, S + 500);
  visit(6, S + 500, 400);
  rise(7, S + 520);
  visit(BLOCKED_GATE, S + 1000, 300, { skipRow: BLOCKED_ROW, hold: true });

  /* ---------- 05 missing means blocked, until the evidence exists for this exact version ---------- */
  S = SCENES[4][0];
  const missing = rowsOf(BLOCKED_GATE)[BLOCKED_ROW];
  swap($$("[data-r-req]", missing), $$("[data-r-miss]", missing), S + 150);
  add($("[data-missing]", arts[BLOCKED_GATE]), { opacity: [0, 1], duration: 200 }, S + 200);
  swap($("[data-f-req]", gates[BLOCKED_GATE]), $("[data-f-block]", gates[BLOCKED_GATE]), S + 260);
  swap(head("collect"), head("block"), S + 260);
  add(barrier, { scaleX: [0, 1], scaleY: [0, 1], ease: "outBack", duration: 260 }, S + 300);
  add($("span", token), { scale: [1, 1.15], duration: 120 }, S + 420);
  add($("span", token), { scale: [1.15, 1], duration: 160 }, S + 540);
  // The restore drill is run for this commit: the evidence attaches and the bar lifts.
  attachRow(BLOCKED_GATE, BLOCKED_ROW, S + 950, "miss");
  add($("[data-missing]", arts[BLOCKED_GATE]), { opacity: [1, 0], duration: 160 }, S + 900);
  playArt(BLOCKED_GATE, S + 900, true);
  settle(BLOCKED_GATE, S + 1060, "block");
  add(barrier, { scaleX: [1, 0], scaleY: [1, 0], ease: "inBack", duration: 220 }, S + 1080);
  swap(head("block"), head("collect"), S + 1100);
  ring(BLOCKED_GATE, false, S + 1150);
  rise(8, S + 1050);
  visit(8, S + 1420);

  /* ---------- 06 Launch: gates 10 to 12 ---------- */
  S = SCENES[5][0];
  enterPhase(3, S + 60, S + 500);
  visit(9, S + 500, 400);
  rise(10, S + 520);
  visit(10, S + 900);
  rise(11, S + 920);
  visit(11, S + 1300);

  /* ---------- 07 people authorize production: two decisions, both left waiting ---------- */
  S = SCENES[6][0];
  add(prod, { opacity: [0, 1], translateY: [50, 0], ease: "outCubic", duration: 340 }, S + 100);
  camTo(l.camFinal, S + 160, 760);
  tokenTo(l.prodStop, S + 260, 480);
  add($("[data-prod-ring]"), { opacity: [0, 1], duration: 200 }, S + 740);
  swap(head("collect"), head("wait"), S + 780);
  add(approvals, { opacity: [0, 1], translateY: [24, 0], ease: "outCubic", duration: 340 }, S + 820);
  add($$("[data-approval]"), { opacity: [0, 1], translateX: [-10, 0], ease: "outCubic", duration: 260, delay: A.stagger(130) }, S + 980);

  tl.add({ end: 0 }, { end: 1, duration: 1 }, END - 1);

  if (still) {
    for (let t = MAX_STEP; t < STILL_AT; t += MAX_STEP) tl.seek(t);
    tl.seek(STILL_AT);
    set(captions, { opacity: 1, translateY: 0 });
  }
  return tl;
}
