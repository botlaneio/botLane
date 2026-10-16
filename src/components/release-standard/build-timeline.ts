import type { AnimationParams, TargetsParam, Timeline } from "animejs";
import { railFractions, type Box, type Cam, type StoryLayout } from "./layout";
import { BLOCKED_GATE, BLOCKED_ROW } from "./story-parts";

type Anime = typeof import("animejs");

/**
 * The whole story is one timeline, 0 → END units, seeked by scroll progress through the
 * stage. Scrolling back plays it in reverse. Seven scenes of equal length:
 * a demo arrives → Source → Security → Recovery → missing means blocked → Launch → people decide.
 */
const SCENE = 1800;
export const END = SCENE * 7;
export const SCENES: [number, number][] = Array.from({ length: 7 }, (_, i) => [i * SCENE, (i + 1) * SCENE]);
/** The single stable frame shown when motion is reduced: all evidence attached, both decisions waiting. */
export const STILL_AT = END;

/** Largest single seek, in timeline units. Bigger jumps are split so every tween they cross is rendered. */
export const MAX_STEP = 200;

const fade = (to: 0 | 1) => (to ? [0, 1] : [1, 0]);

export function buildStory(root: HTMLElement, l: StoryLayout, A: Anime, still: boolean): Timeline {
  const $ = <T extends Element = HTMLElement>(s: string, el: ParentNode = root) => el.querySelector(s) as T;
  const $$ = <T extends Element = HTMLElement>(s: string, el: ParentNode = root) => Array.from(el.querySelectorAll(s)) as T[];
  const { set } = A.utils;

  const captions = $$("[data-caption]");
  const rails = $$("[data-rail]");
  const release = $("[data-release]");
  const strip = $("[data-strip]");
  const phases = $$("[data-phase]");
  const gates = $$("[data-gate]");
  const prod = $("[data-prod]");
  const token = $("[data-token]");
  const barrier = $("[data-barrier]");
  const approvals = $("[data-approvals]");
  const head = (k: string) => $(`[data-h-${k}]`);
  const [railBase] = A.svg.createDrawable($<SVGPathElement>("[data-rail-base]"));
  const [railDone] = A.svg.createDrawable($<SVGPathElement>("[data-rail-done]"));

  /* ---------- camera ---------- */
  const cam: Cam = { ...l.cams.overview };
  const applyCam = () => {
    strip.style.transform = `translate(${cam.cx - cam.fx * cam.s}px, ${cam.cy - cam.fy * cam.s}px) scale(${cam.s})`;
  };

  /* ---------- starting state ---------- */
  const rect = (b: Box) => ({ left: b.x - b.w / 2, top: b.y - b.h / 2, width: b.w, height: b.h });
  set(release, { ...rect(l.release.big), borderRadius: "18px" });
  set(captions.slice(1), { opacity: 0 });
  set(rails, { scaleX: 0 });
  set([railBase, railDone], { draw: "0 0" });
  set(barrier, { scaleX: 0, scaleY: 0 });
  set($$("[data-approval]"), { opacity: 0 });
  set(token, { translateX: l.rail[0].x, translateY: l.rail[0].y });
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

  let camAt: Cam = l.cams.overview;
  const camTo = (to: Cam, at: number, duration: number) => {
    const f = camAt;
    add(
      cam,
      { fx: [f.fx, to.fx], fy: [f.fy, to.fy], cx: [f.cx, to.cx], cy: [f.cy, to.cy], s: [f.s, to.s], ease: "inOutCubic", duration },
      at,
    );
    camAt = to;
  };

  // The release travels the rail waypoint by waypoint; the red rail fills in behind it.
  const frac = railFractions(l.rail);
  let tokAt = 0;
  const tokenTo = (stop: number, at: number, duration: number) => {
    const span = frac[stop] - frac[tokAt];
    const single = stop - tokAt === 1;
    let t = at;
    for (let k = tokAt; k < stop; k++) {
      const d = span > 0 ? (duration * (frac[k + 1] - frac[k])) / span : duration;
      const a = l.rail[k];
      const b = l.rail[k + 1];
      add(token, { translateX: [a.x, b.x], translateY: [a.y, b.y], ease: single ? "inOutSine" : "linear", duration: d }, t);
      t += d;
    }
    add(railDone, { draw: [`0 ${frac[tokAt]}`, `0 ${frac[stop]}`], ease: single ? "inOutSine" : "linear", duration }, at);
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

  /**
   * One gate: the release arrives, the gate lights up, each piece of evidence is pinned to
   * this commit, and the gate settles at "attached · for review". Never "passed".
   */
  const visit = (g: number, arrive: number, move = 220, opts: { skipRow?: number; hold?: boolean } = {}) => {
    tokenTo(l.gateStop[g], arrive - move, move);
    ring(g, true, arrive - 40);
    [0, 1, 2].forEach((r) => r !== opts.skipRow && attachRow(g, r, arrive + 60 + r * 70));
    if (opts.hold) return;
    settle(g, arrive + 260);
    ring(g, false, arrive + 380);
  };

  /* ---------- captions and progress rail ---------- */
  SCENES.forEach(([s, e], i) => {
    if (i > 0) add(captions[i], { opacity: [0, 1], translateY: [12, 0], duration: 220 }, s);
    if (i < SCENES.length - 1) add(captions[i], { opacity: [1, 0], translateY: [0, -12], duration: 200 }, e - 200);
    add(rails[i], { scaleX: [0, 1], ease: "linear", duration: e - s }, s);
  });

  /* ---------- 01 a working demo arrives, and twelve gates stand before production ---------- */
  const big = rect(l.release.big);
  const bar = rect(l.release.bar);
  add(
    release,
    {
      left: [big.left, bar.left],
      top: [big.top, bar.top],
      width: [big.width, bar.width],
      height: [big.height, bar.height],
      borderRadius: ["18px", l.key === "desktop" ? "16px" : "14px"],
      ease: "inOutCubic",
      duration: 650,
    },
    450,
  );
  add(railBase, { draw: ["0 0", "0 1"], ease: "inOutSine", duration: 700 }, 820);
  phases.forEach((p, i) => add(p, { opacity: [0, 1], translateY: [24, 0], ease: "outCubic", duration: 300 }, 800 + i * 140));
  gates.forEach((g, i) => add(g, { opacity: [0, 1], translateY: [36, 0], ease: "outCubic", duration: 280 }, 880 + i * 50));
  add(prod, { opacity: [0, 1], translateY: [36, 0], ease: "outCubic", duration: 320 }, 1520);

  /* ---------- 02 Source: zoom into phase I and walk gates 01 to 03 ---------- */
  let S = SCENES[1][0];
  swap(head("demo"), head("collect"), S + 120);
  camTo(l.cams.phases[0], S + 60, 700);
  add(token, { opacity: [0, 1], duration: 160 }, S + 300);
  visit(0, S + 650, 260);
  visit(1, S + 990);
  visit(2, S + 1330);

  /* ---------- 03 Security: pan to phase II, gates 04 to 06 ---------- */
  S = SCENES[2][0];
  camTo(l.cams.phases[1], S + 60, 700);
  visit(3, S + 700, 560);
  visit(4, S + 1030);
  visit(5, S + 1360);

  /* ---------- 04 Recovery: gate 07, then 08 is missing its restore drill ---------- */
  S = SCENES[3][0];
  camTo(l.cams.phases[2], S + 60, 700);
  visit(6, S + 700, 560);
  visit(BLOCKED_GATE, S + 1100, 220, { skipRow: BLOCKED_ROW, hold: true });

  /* ---------- 05 missing means blocked, until the evidence exists for this exact version ---------- */
  S = SCENES[4][0];
  const missing = rowsOf(BLOCKED_GATE)[BLOCKED_ROW];
  swap($$("[data-r-req]", missing), $$("[data-r-miss]", missing), S + 150);
  swap($("[data-f-req]", gates[BLOCKED_GATE]), $("[data-f-block]", gates[BLOCKED_GATE]), S + 260);
  swap(head("collect"), head("block"), S + 260);
  add(barrier, { scaleX: [0, 1], scaleY: [0, 1], ease: "outBack", duration: 260 }, S + 300);
  add($("span", token), { scale: [1, 1.12], duration: 120 }, S + 420);
  add($("span", token), { scale: [1.12, 1], duration: 160 }, S + 540);
  // The restore drill is run for this commit: the evidence attaches and the bar lifts.
  attachRow(BLOCKED_GATE, BLOCKED_ROW, S + 950, "miss");
  settle(BLOCKED_GATE, S + 1060, "block");
  add(barrier, { scaleX: [1, 0], scaleY: [1, 0], ease: "inBack", duration: 220 }, S + 1080);
  swap(head("block"), head("collect"), S + 1100);
  ring(BLOCKED_GATE, false, S + 1150);
  visit(8, S + 1400);

  /* ---------- 06 Launch: pan to phase IV, gates 10 to 12 ---------- */
  S = SCENES[5][0];
  camTo(l.cams.phases[3], S + 60, 700);
  visit(9, S + 700, 560);
  visit(10, S + 1030);
  visit(11, S + 1360);

  /* ---------- 07 people authorize production: two decisions, both left waiting ---------- */
  S = SCENES[6][0];
  camTo(l.cams.final, S + 60, 760);
  tokenTo(l.prodStop, S + 300, 420);
  add($("[data-prod-ring]"), { opacity: [0, 1], duration: 200 }, S + 720);
  swap(head("collect"), head("wait"), S + 760);
  add(approvals, { opacity: [0, 1], translateY: [18, 0], ease: "outCubic", duration: 320 }, S + 860);
  add($$("[data-approval]"), { opacity: [0, 1], translateX: [-10, 0], ease: "outCubic", duration: 260, delay: A.stagger(130) }, S + 1000);

  tl.add({ end: 0 }, { end: 1, duration: 1 }, END - 1);

  if (still) {
    for (let t = MAX_STEP; t < STILL_AT; t += MAX_STEP) tl.seek(t);
    tl.seek(STILL_AT);
    set(captions, { opacity: 1, translateY: 0 });
  }
  return tl;
}
