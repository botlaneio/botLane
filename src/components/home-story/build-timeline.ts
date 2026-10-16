import type { AnimationParams, TargetsParam, Timeline } from "animejs";
import { railFractions } from "@/components/release-standard/layout";
import type { Box, HomeLayout } from "./layout";
import { piecePoint } from "./story-parts";

type Anime = typeof import("animejs");

/**
 * The whole story is one timeline, 0 → END units, seeked by scroll progress through the stage.
 * Scrolling back plays it in reverse. Five scenes of equal length: your work is in pieces →
 * client reporting → lead follow-up → invoice follow-up → three systems, one hire.
 * The camera only ever moves down the lane with the work, never sideways or in and out.
 */
const SCENE = 1800;
export const END = SCENE * 5;
export const SCENES: [number, number][] = Array.from({ length: 5 }, (_, i) => [i * SCENE, (i + 1) * SCENE]);

/** Largest single seek, in timeline units. Bigger jumps are split so every tween they cross is rendered. */
export const MAX_STEP = 200;

const fade = (to: 0 | 1) => (to ? [0, 1] : [1, 0]);
/** Inverse of inOutSine: the time fraction at which an eased move has covered fraction u of its distance. */
const easeInv = (u: number) => Math.acos(1 - 2 * Math.min(1, Math.max(0, u))) / Math.PI;

export function buildStory(root: HTMLElement, l: HomeLayout, A: Anime, still: boolean): Timeline {
  const $ = <T extends Element = HTMLElement>(s: string, el: ParentNode = root) => el.querySelector(s) as T;
  const $$ = <T extends Element = HTMLElement>(s: string, el: ParentNode = root) => Array.from(el.querySelectorAll(s)) as T[];
  const { set } = A.utils;

  const captions = $$("[data-caption]");
  const rails = $$("[data-rail]");
  const lane = $("[data-lane]");
  const pieces = $$("[data-piece]");
  const strip = $("[data-strip]");
  const parallax = $("[data-parallax]");
  const numerals = $$("[data-numeral]");
  const panels = $$("[data-panel]");
  const pins = $$("[data-panel-pin]");
  const arts = $$<SVGSVGElement>("[data-art]", strip).filter((a) => a.closest("[data-panel]"));
  const cards = $$("[data-card]");
  const ticks = $$("[data-tick]");
  const tiles = $$("[data-tile]");
  const token = $("[data-token]");
  const head = (k: number) => $(`[data-h-${k}]`);
  const [railDone] = A.svg.createDrawable($<SVGPathElement>("[data-rail-done]"));

  /* ---------- camera: the strip slides up, the numerals behind it at half the speed ---------- */
  const cam = { fy: l.camStart };
  const applyCam = () => {
    const dy = l.cy - cam.fy;
    strip.style.transform = `translateY(${dy}px)`;
    parallax.style.transform = `translateY(${dy * l.depth}px)`;
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
  set(lane, { ...rect(l.lane.big), borderRadius: "18px" });
  set(captions.slice(1), { opacity: 0 });
  set(rails, { scaleX: 0 });
  set(railDone, { draw: "0 0" });
  set(token, { translateX: l.rail[0].x, translateY: l.rail[0].y });
  set(pieces, { translateX: 0, translateY: 0, scale: 1 });
  // Every shape waits, faded, until the work reaches its system.
  const drawables = new Map<Element, ReturnType<typeof A.svg.createDrawable>[number]>();
  for (const art of arts) {
    set($("[data-art-body]", art), { opacity: 0.3 });
    for (const el of $$<SVGGeometryElement>("[data-draw]", art)) {
      const [d] = A.svg.createDrawable(el);
      drawables.set(el, d);
      set(d, { draw: "0 0" });
    }
    for (const el of $$("[data-rise]", art)) set(el, { scaleY: 0 });
    for (const el of $$("[data-pop]", art)) set(el, { scale: 0.3, opacity: 0 });
  }
  applyCam();

  const tl = A.createTimeline({
    defaults: { ease: "inOutQuad", duration: 300, composition: "none" },
    autoplay: false,
    onRender: applyCam,
  });
  const add = (targets: TargetsParam, params: AnimationParams, pos: number) => tl.add(targets, params, pos);

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

  // The work travels the lane point by point, eased as one move; the red lane fills in behind it.
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

  /** One step of a system's shape: strokes draw, bars rise, parts pop in. */
  const playArt = (p: number, g: number, at: number) => {
    const art = arts[p];
    const pick = (sel: string) => $$(`${sel}[data-g="${g}"]`, art);
    if (g === 0) add($("[data-art-body]", art), { opacity: [0.3, 1], duration: 200 }, at);
    pick("[data-draw]").forEach((el, i) => add(drawables.get(el)!, { draw: ["0 0", "0 1"], ease: "inOutSine", duration: 320 }, at + 40 + i * 50));
    pick("[data-rise]").forEach((el, i) => add(el, { scaleY: [0, 1], ease: "outCubic", duration: 260 }, at + 160 + i * 50));
    pick("[data-pop]").forEach((el, i) => add(el, { scale: [0.3, 1], opacity: [0, 1], ease: "outBack", duration: 240 }, at + 60 + i * 55));
  };

  /** A card rises into its place on the lane, tilted slightly away, before the work reaches it. */
  const rise = (i: number, at: number) => {
    const tilt = l.sides[i] === "left" ? -3 : 3;
    add(cards[i], { opacity: [0, 1], translateY: [70, 0], rotate: [tilt, 0], ease: "outCubic", duration: 340 }, at);
  };

  /**
   * One card: the camera and the work move down together, the card lights up and does its job
   * (Lane ticks off the steps; you press Approve; the result goes out), then it settles.
   */
  const visit = (i: number, arrive: number, move = 280) => {
    const card = cards[i];
    const p = Math.floor(i / 3);
    const kind = card.getAttribute("data-card");
    const leave = arrive - move;
    camTo(l.camCard[i], leave - 40, move + 120);
    tokenTo(l.cardStop[i], leave, move);
    add(ticks[i], { opacity: [0, 1], duration: 120 }, arrive - 30);
    add($("[data-card-ring]", card), { opacity: fade(1), duration: 150 }, arrive - 40);
    let done = arrive + 160;
    if (kind === "work") {
      playArt(p, 0, arrive - 20);
      add($$("[data-step]", card), { opacity: [0, 1], scale: [0.5, 1], ease: "outBack", duration: 160, delay: A.stagger(90) }, arrive + 60);
      done = arrive + 300;
    } else if (kind === "ok") {
      add($("[data-btn]", card), { scale: [1, 0.94], duration: 90 }, arrive + 60);
      add($("[data-btn]", card), { scale: [0.94, 1], duration: 110 }, arrive + 150);
      playArt(p, 1, arrive + 160);
      done = arrive + 180;
    } else {
      playArt(p, 2, arrive + 40);
      done = arrive + 120;
    }
    swap($$("[data-a]", card), $$("[data-b]", card), done);
    add($("[data-card-bar]", card), { scaleX: [0, 1], ease: "outCubic", duration: 220 }, done + 40);
    add($("[data-card-ring]", card), { opacity: fade(0), duration: 150 }, done + 160);
  };

  /** A system comes into view: its panel slides in from its own side, its numeral fades up, its first card rises. */
  const enterSystem = (p: number, at: number, firstArrive: number) => {
    const dx = l.sides[p * 3] === "right" ? -60 : 60;
    add(panels[p], { opacity: [0, 1], translateX: [dx, 0], translateY: [40, 0], ease: "outCubic", duration: 420 }, at);
    add(numerals[p], { opacity: [0, 1], duration: 400 }, at);
    rise(p * 3, firstArrive - 420);
  };

  /** One system's three cards, in turn. */
  const runSystem = (p: number, S: number) => {
    swap(head(p), head(p + 1), S + 120);
    visit(p * 3, S + 500, p === 0 ? 320 : 400);
    rise(p * 3 + 1, S + 520);
    visit(p * 3 + 1, S + 900);
    rise(p * 3 + 2, S + 920);
    visit(p * 3 + 2, S + 1300);
  };

  /* ---------- captions and progress rail ---------- */
  SCENES.forEach(([s, e], i) => {
    if (i > 0) add(captions[i], { opacity: [0, 1], translateY: [12, 0], duration: 220 }, s);
    if (i < SCENES.length - 1) add(captions[i], { opacity: [1, 0], translateY: [0, -12], duration: 200 }, e - 200);
    add(rails[i], { scaleX: [0, 1], ease: "linear", duration: e - s }, s);
  });

  /* ---------- 01 your work is in pieces; Lane pulls them in and takes its place at the top ---------- */
  const big = rect(l.lane.big);
  const bar = rect(l.lane.bar);
  pieces.forEach((el, i) => {
    const pt = piecePoint(l, i);
    // Each piece drifts a little, then is pulled into Lane.
    add(el, { translateX: [0, 0], translateY: [0, (i % 2 ? 1 : -1) * 10], ease: "inOutSine", duration: 300 }, 0);
    add(
      el,
      {
        translateX: [0, l.lane.big.x - pt.x],
        translateY: [(i % 2 ? 1 : -1) * 10, l.lane.big.y - pt.y],
        scale: [1, 0.4],
        opacity: [1, 0],
        ease: "inCubic",
        duration: 380,
      },
      320 + i * 45,
    );
  });
  add($("[data-lane-ring]"), { opacity: [0, 1], duration: 120 }, 700);
  add($("[data-lane-ring]"), { opacity: [1, 0], duration: 200 }, 860);
  add(
    lane,
    {
      left: [big.left, bar.left],
      top: [big.top, bar.top],
      width: [big.width, bar.width],
      height: [big.height, bar.height],
      borderRadius: ["18px", l.compact ? "14px" : "16px"],
      ease: "inOutCubic",
      duration: 650,
    },
    950,
  );
  add(token, { opacity: [0, 1], duration: 200 }, 1450);
  enterSystem(0, 1350, 1900);

  /* ---------- 02 to 04: the three systems ---------- */
  runSystem(0, SCENES[1][0]);
  enterSystem(1, SCENES[2][0] + 60, SCENES[2][0] + 500);
  runSystem(1, SCENES[2][0]);
  enterSystem(2, SCENES[3][0] + 60, SCENES[3][0] + 500);
  runSystem(2, SCENES[3][0]);

  /* ---------- 05 three systems, one hire, your OK ---------- */
  const S = SCENES[4][0];
  camTo(l.camFinal, S + 160, 760);
  tokenTo(l.endStop, S + 220, 520);
  swap(head(3), head(4), S + 600);
  add(tiles, { opacity: [0, 1], translateY: [40, 0], ease: "outCubic", duration: 360, delay: A.stagger(120) }, S + 560);
  add(token, { opacity: [1, 0], duration: 200 }, S + 760);

  tl.add({ end: 0 }, { end: 1, duration: 1 }, END - 1);

  if (still) {
    for (let t = MAX_STEP; t < END; t += MAX_STEP) tl.seek(t);
    tl.seek(END);
    set(captions, { opacity: 1, translateY: 0 });
  }
  return tl;
}
