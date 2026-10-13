import type { AnimationParams, JSAnimation, Timeline } from "animejs";

type Anime = typeof import("animejs");
type El = HTMLElement | SVGElement;

// One timeline, 0 → TOTAL. Scroll position seeks it.
// Each system has its own shape: 01 funnel (many → one), 02 line (one → a run over time),
// 03 loop (until paid). Lane and You never move; the shapes change around them.
export const TOTAL = 2900;
export const STOP = [1000, 1600, 2250]; // the three approval moments
const AFTER = [200, 220, 280]; // how far an Approve click moves the story on

// Phone camera: [time, board x to centre on, zoom 0 = whole board … 1 = close-up].
// Columns: Input ≈ 144, Lane ≈ 470, You ≈ 750, Output ≈ 1096.
const SHOTS: [number, number, number][] = [
  [0, 620, 0], [640, 620, 0],
  [760, 300, 1], [900, 560, 1], [990, 750, 1], [1090, 1000, 1], [1180, 1000, 1], // 01 funnel
  [1280, 300, 1], [1500, 560, 1], [1590, 750, 1], [1700, 1000, 1], [1820, 1000, 1], // 02 line
  [1920, 300, 1], [2150, 560, 1], [2240, 750, 1], [2340, 1060, 1], [2600, 1060, 1], // 03 loop
  [2700, 620, 0], [TOTAL, 620, 0],
];
const smooth = (x: number) => x * x * (3 - 2 * x);
function shotAt(time: number): [number, number] {
  for (let i = 1; i < SHOTS.length; i++) {
    const [t1, x1, m1] = SHOTS[i];
    if (time <= t1) {
      const [t0, x0, m0] = SHOTS[i - 1];
      const k = smooth(Math.min(1, Math.max(0, (time - t0) / Math.max(1, t1 - t0))));
      return [x0 + (x1 - x0) * k, m0 + (m1 - m0) * k];
    }
  }
  return [620, 0];
}

/**
 * Wires the board inside `root` (markup from <AssembleScene>) to scroll, the scrubber,
 * Approve clicks and an idle demo. Returns a cleanup function.
 */
export function mountAssemble(root: HTMLElement, A: Anime): () => void {
  const q = <T extends Element = HTMLElement>(s: string) => root.querySelector(s) as T;
  const qa = <T extends Element = HTMLElement>(s: string) => Array.from(root.querySelectorAll(s)) as T[];
  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

  const stage = root;
  const fitEl = q("[data-fit]");
  const scaler = q("[data-scaler]");
  const board = q("[data-board]");
  const trioScale = q("[data-trioscale]");
  const scrub = q<HTMLInputElement>("[data-scrub]");
  const floor = q("[data-floor]");
  const caps = qa("[data-cap]");
  const sysLabels = qa("[data-sys]");

  /* ---- fit the 1240 × 600 board to the viewport ---- */
  // Wide screens see the whole board. Narrow screens get a camera that zooms in
  // and pans across the board, following the work from Input to Output.
  // VIEW is the board-space area always kept on screen: the tilted board leans right
  // and up, so it reaches past the 1240 × 600 box. The scattered opening stays inside it.
  const VIEW = { left: -10, top: -40, right: 1310, bottom: 650 };
  const VW = VIEW.right - VIEW.left;
  const VH = VIEW.bottom - VIEW.top;
  const VCX = (VIEW.left + VIEW.right) / 2;
  const VCY = (VIEW.top + VIEW.bottom) / 2;
  let t = 0;
  let view = { w: 1240, h: 600, whole: 1, close: 1, mobile: false };
  const fit = () => {
    const w = fitEl.clientWidth || 1240;
    const h = fitEl.clientHeight || 600;
    const whole = Math.max(0.2, Math.min(1, w / VW, h / VH));
    const mobile = w < 760;
    const close = mobile ? Math.min(1, w / 470, h / 640) : whole;
    view = { w, h, whole, close, mobile };
    trioScale.style.transform = `translate(-50%, -50%) scale(${whole})`;
    camera(t);
  };
  const camera = (time: number) => {
    const { w, whole, close, mobile } = view;
    if (!mobile) {
      scaler.style.transform = `translate(-50%, -50%) translate(${(620 - VCX) * whole}px, ${(300 - VCY) * whole}px) scale(${whole})`;
      return;
    }
    const [fx, m] = shotAt(time);
    const s = whole + (close - whole) * m;
    // keep the visible window on the board
    const half = w / (2 * s);
    const lo = -30 + half;
    const hi = 1270 - half;
    const x = lo < hi ? Math.min(hi, Math.max(lo, 620 + (fx - 620) * m)) : VCX;
    scaler.style.transform = `translate(-50%, -50%) translate(${-(x - 620) * s}px, ${(300 - VCY) * s}px) scale(${s})`;
  };
  const ro = new ResizeObserver(fit);
  ro.observe(fitEl);

  /* ---- elements ---- */
  const PATH: Record<string, SVGPathElement> = {};
  const D: Record<string, ReturnType<Anime["svg"]["createDrawable"]>> = {};
  qa<SVGPathElement>("[data-path]").forEach((p) => {
    const n = p.getAttribute("data-path")!;
    PATH[n] = p;
    D[n] = A.svg.createDrawable(p);
    A.utils.set(D[n], { draw: "0 0" });
  });
  const drs = (names: string[]) => names.flatMap((n) => D[n]);

  const heads = qa('[data-fx="head"]');
  const lane = q('[data-fx="lane"]');
  const you = q('[data-fx="you"]');
  const chips = qa("[data-chip]");
  const beams = qa("[data-beam]");
  const report = q("[data-report]");
  const chipLusters = qa("[data-chip-luster]");
  const laneLuster = q("[data-lane-luster]");
  const youLuster = q("[data-you-luster]");
  const reportLuster = q("[data-report-luster]");
  const bars = qa("[data-bar]");
  const owait = q("[data-owait]");
  const odone = q("[data-odone]");
  const dots = qa("[data-dot]");
  const lead = q("[data-lead]");
  const av = q("[data-av]");
  const meet = q("[data-meet]");
  const n1 = qa<SVGGElement>("[data-n1]");
  const n1d = qa<SVGGElement>("[data-n1d]");
  const n1l = qa("[data-n1l]");
  const inv = q("[data-inv]");
  const coin = q("[data-coin]");
  const bankc = q("[data-bankc]");
  const n2 = qa<SVGGElement>("[data-n2]");
  const n2d = qa<SVGGElement>("[data-n2d]");
  const n2l = q<SVGGElement>("[data-n2l]");
  const cntA = q('[data-cnt="a"]');
  const cntB = q('[data-cnt="b"]');
  const ls = qa("[data-ls]");
  const yl = qa("[data-yl]");
  const lpw = q("[data-lpw]");
  const lpr = q("[data-lpr]");
  const cks = [0, 1, 2].map((k) => qa(`[data-ck="${k}"]`));
  const waits = qa("[data-wait]");
  const dones = qa("[data-done]");
  const btns = qa<HTMLButtonElement>("[data-approve]");
  const ring = q("[data-ring]");
  const tcs = qa("[data-tc]");

  /* ---- the opening: pieces scattered across the board in a balanced, evenly distributed composition ---- */
  const home = { translateX: 0, translateY: 0, translateZ: 0, rotateX: 0, rotateY: 0, rotateZ: 0, scale: 1, opacity: 1 };

  // Explicit, artfully directed scattered transforms for each piece.
  // Perfectly balanced across the 1240 × 600 canvas with zero collisions,
  // comfortable breathing room, and a natural floating 3D paper/card aesthetic.
  const slabScatter = [
    // 01: Input slab (left: 0, w: 288) -> subtle architectural drift in background
    { translateX: -12, translateY: 14, translateZ: -20, rotateX: 2.2, rotateY: -1.8, rotateZ: -1.0, scale: 0.985, opacity: 0.76 },
    // 02: Automation slab (left: 344, w: 252)
    { translateX: 8, translateY: -10, translateZ: -16, rotateX: 1.8, rotateY: 1.4, rotateZ: 0.8, scale: 0.985, opacity: 0.76 },
    // 03: Approval slab (left: 616, w: 268)
    { translateX: -8, translateY: 12, translateZ: -22, rotateX: -1.6, rotateY: -1.2, rotateZ: -0.8, scale: 0.985, opacity: 0.76 },
    // 04: Output slab (left: 936, w: 320)
    { translateX: 12, translateY: -12, translateZ: -18, rotateX: 2.0, rotateY: 1.6, rotateZ: 1.0, scale: 0.985, opacity: 0.76 },
  ];

  const chipScatter = [
    // 0: Google Ads (home: x=24, y=120) -> Upper-left floating card with gentle tilt
    { translateX: 34, translateY: -36, translateZ: 65, rotateX: 3.5, rotateY: -3.5, rotateZ: -5.5, scale: 0.96, opacity: 0.98 },
    // 1: Analytics (home: x=24, y=208) -> Upper-mid-left, staggered right to fill the column gap
    { translateX: 124, translateY: 6, translateZ: 95, rotateX: -3.0, rotateY: 4.5, rotateZ: 4.8, scale: 0.96, opacity: 0.98 },
    // 2: Meta Ads (home: x=24, y=296) -> Lower-left floating card
    { translateX: 20, translateY: 74, translateZ: 50, rotateX: 4.0, rotateY: -4.0, rotateZ: -4.0, scale: 0.96, opacity: 0.98 },
    // 3: HubSpot (home: x=24, y=384) -> Lower-mid-left, staggered right into lower gap
    { translateX: 180, translateY: 56, translateZ: 105, rotateX: -3.5, rotateY: 3.5, rotateZ: 5.8, scale: 0.96, opacity: 0.98 },
  ];

  const laneScatter = {
    // Lane card (home: x=372, y=150) -> Center-left anchor, lifted higher & forward
    translateX: -18,
    translateY: -38,
    translateZ: 115,
    rotateX: 4.0,
    rotateY: -3.0,
    rotateZ: -3.0,
    scale: 0.97,
    opacity: 0.98,
  };

  const youScatter = {
    // You card (home: x=640, y=140) -> Center-right anchor, positioned with breathing room from Lane
    translateX: 28,
    translateY: 34,
    translateZ: 95,
    rotateX: -3.5,
    rotateY: 4.0,
    rotateZ: 3.8,
    scale: 0.97,
    opacity: 0.98,
  };

  const reportScatter = {
    // Report card (home: x=960, y=130) -> Upper-right anchor, comfortably framed within canvas bounds
    translateX: -22,
    translateY: -22,
    translateZ: 75,
    rotateX: 3.5,
    rotateY: -3.0,
    rotateZ: -4.2,
    scale: 0.96,
    opacity: 0.98,
  };

  const scattered = new Map<Element, typeof home>();
  heads.forEach((h, i) => scattered.set(h, slabScatter[i] ?? slabScatter[0]));
  chips.forEach((c, i) => scattered.set(c, chipScatter[i] ?? chipScatter[0]));
  scattered.set(lane, laneScatter);
  scattered.set(you, youScatter);
  scattered.set(report, reportScatter);

  const pieces = [...heads, lane, you, ...chips, report];
  pieces.forEach((el) => A.utils.set(el, scattered.get(el)!));

  /* ---- starting state ---- */
  const set = A.utils.set;
  // Set back a little and gently tilted; it comes forward as the pieces land.
  set(board, { rotateX: 20, rotateY: -8, rotateZ: -2, translateZ: -120 });
  set(floor, { opacity: 0, scale: 0.85 });
  set(bars, { scaleY: 0 });
  set([lead, inv, meet, bankc, av, coin, cntA, cntB, n2l, ring, odone, lpr], { opacity: 0 });
  set(beams, { opacity: 0 });
  set(dots, { opacity: 0 });
  set([...n1, ...n1d, ...n1l, ...n2, ...n2d], { opacity: 0 });
  set(cks.flat(), { opacity: 0, scale: 0.5 });
  // only the first system's layers start visible
  [ls, yl, waits].forEach((list) => list.forEach((el, i) => set(el, { opacity: i === 0 ? 1 : 0 })));
  set(dones, { opacity: 0 });
  set(tcs, { opacity: 0, translateY: 24 });
  caps.forEach((c, i) => i > 0 && set(c, { opacity: 0, translateY: 12 }));
  set(sysLabels, { opacity: 0.35, color: "#6e6e73" });

  const tl: Timeline = A.createTimeline({ autoplay: false });
  const add = (targets: unknown, params: AnimationParams, at: number) =>
    tl.add(targets as El | El[], params, at);

  /* ---- helpers ---- */
  // A traveller follows a path: sample it into evenly spaced keyframes.
  const travel = (el: El, path: SVGPathElement, at: number, dur: number) => {
    const L = path.getTotalLength();
    const n = 28;
    const xs: { to: number }[] = [];
    const ys: { to: number }[] = [];
    for (let i = 0; i <= n; i++) {
      const p = path.getPointAtLength((L * i) / n);
      xs.push({ to: p.x });
      ys.push({ to: p.y });
    }
    add(el, { translateX: xs[0].to, translateY: ys[0].to, duration: 1 }, at - 2);
    add(el, { translateX: xs, translateY: ys, duration: dur, ease: "linear" } as AnimationParams, at);
  };
  // Where along a path a point is first reached (for timing the stops).
  const fracAt = (path: SVGPathElement, test: (p: DOMPoint) => boolean) => {
    const L = path.getTotalLength();
    for (let i = 0; i <= 200; i++) if (test(path.getPointAtLength((L * i) / 200))) return i / 200;
    return 1;
  };
  const settle = (duration: number, stag: number): AnimationParams => ({ duration, delay: A.stagger(stag), ease: "inOutSine", ...home });
  const flipSettle = (duration: number, stag = 0): AnimationParams =>
    ({
      duration,
      delay: stag ? A.stagger(stag) : 0,
      ease: "inOutSine",
      translateX: 0,
      translateY: 0,
      translateZ: [
        { to: 140, duration: duration * 0.45, ease: "outQuad" },
        { to: 0, duration: duration * 0.55, ease: "inQuad" },
      ],
      rotateX: [
        { to: 10, duration: duration * 0.4, ease: "outSine" },
        { to: 0, duration: duration * 0.6, ease: "inSine" },
      ],
      rotateY: 360,
      rotateZ: 0,
      scale: 1,
      opacity: 1,
    } as unknown as AnimationParams);
  /* Dynamic metallic luster sweep across card back during 180° rotation (Detail #6) */
  const lusterSweep = (duration = 310, stag = 0): AnimationParams =>
    ({
      translateX: [0, 480],
      duration,
      delay: stag ? A.stagger(stag) : 0,
      ease: "easeInOutSine",
    } as unknown as AnimationParams);
  const drawIn = (names: string[], at: number, duration: number, stag = 0) =>
    add(drs(names), { draw: ["0 0", "0 1"], duration, delay: A.stagger(stag), ease: "outQuad" }, at);
  const drawOut = (names: string[], at: number, duration: number) =>
    add(drs(names), { draw: ["0 1", "1 1"], duration, ease: "inQuad" }, at);
  const comet = (name: string, at: number) =>
    add(D[name], { draw: [{ to: "0 0.5", duration: 30 }, { to: "0.5 1", duration: 30 }, { to: "1 1", duration: 20 }] } as AnimationParams, at);
  const fadeIn = (el: unknown, at: number, duration = 40) => add(el, { opacity: [0, 1], duration }, at);
  const fadeOut = (el: unknown, at: number, duration = 40) => add(el, { opacity: 0, duration }, at);
  const swap = (list: El[], k: number, at: number) => {
    add(list[k - 1], { opacity: 0, translateY: [0, -6], duration: 40 }, at);
    add(list[k], { opacity: [0, 1], translateY: [6, 0], duration: 40 }, at + 20);
  };
  const approval = (k: number) => {
    const at = STOP[k];
    add(ring, { opacity: [0, 1], duration: 50 }, at - 60);
    add(waits[k], { opacity: 0, duration: 40 }, at);
    add(dones[k], { opacity: [0, 1], duration: 40 }, at);
    add(ring, { opacity: 0, duration: 60 }, at + 40);
  };
  // Lane ticks off its checklist, then flips to Ready.
  const work = (k: number, at: number, dur: number) => {
    add(cks[k], { opacity: [0, 1], scale: [0.5, 1], duration: 24, delay: A.stagger(dur / 3), ease: "outBack" }, at);
    add(lpw, { opacity: 0, duration: 30 }, at + dur);
    add(lpr, { opacity: [0, 1], duration: 30 }, at + dur);
  };
  const nextSystem = (k: number, at: number) => {
    add(lpr, { opacity: 0, duration: 30 }, at + 20);
    add(lpw, { opacity: [0, 1], duration: 30 }, at + 20);
    swap(ls, k, at + 40);
    swap(yl, k, at + 40);
    add(dones[k - 1], { opacity: 0, duration: 40 }, at + 40);
    add(waits[k], { opacity: [0, 1], duration: 40 }, at + 60);
  };

  /* ---- 0 → 690 · pieces assemble ---- */
  // Long, overlapping, sine-eased moves: every piece is drifting home at once,
  // with foreground cards performing a stunning 3D flip-and-dock into their slots.
  add(board, { rotateX: 16, rotateY: -10, rotateZ: 1.5, translateZ: 0, duration: 690, ease: "inOutSine" }, 0);
  add(floor, { opacity: 1, scale: 1, duration: 420, ease: "inOutSine" }, 40);
  add(heads, settle(520, 35), 20);
  add(chips, flipSettle(500, 35), 70);
  add(chipLusters, lusterSweep(300, 35), 160);
  add(lane, flipSettle(510, 0), 100);
  add(laneLuster, lusterSweep(310), 190);
  add(you, flipSettle(510, 0), 140);
  add(youLuster, lusterSweep(310), 230);
  add(report, flipSettle(510, 0), 180);
  add(reportLuster, lusterSweep(310), 270);

  /* ---- 01 · Client reporting: a funnel ---- */
  drawIn(["f0", "f1", "f2", "f3"], 690, 140, 25);
  drawIn(["ly"], 760, 80);
  drawIn(["l0"], 780, 80);
  dots.forEach((d, i) => {
    const t0 = 740 + i * 28;
    travel(d, PATH[`f${i}`], t0, 130);
    fadeIn(d, t0, 15);
    fadeOut(d, t0 + 112, 20);

    // Active source card subtle hover-lift & radiant border beam
    add(chips[i], { translateY: [0, -5], translateZ: [0, 16], duration: 40, ease: "outQuad" }, t0 - 15);
    add(beams[i], { opacity: [0, 1], duration: 35 }, t0 - 15);
    add(chips[i], { translateY: 0, translateZ: 0, duration: 50, ease: "inOutQuad" }, t0 + 105);
    add(beams[i], { opacity: 0, duration: 45 }, t0 + 110);
  });
  work(0, 740, 190);
  add(bars, { scaleY: [0, 1], duration: 100, delay: A.stagger(10), ease: "outQuad" }, 860);
  comet("c0", 900);
  approval(0);
  comet("s0", 1030);
  fadeOut(owait, 1110);
  fadeIn(odone, 1110);

  /* ---- morph → 02 · Lead follow-up: a line ---- */
  const T1 = 1200;
  add(chips, {
    // the four sources fold into one
    translateY: (el: El) => 290 - Number(el.getAttribute("data-cy")),
    scale: 0.6,
    opacity: 0,
    duration: 120,
    delay: A.stagger(15),
    ease: "inCubic",
  } as AnimationParams, T1);
  drawOut(["f0", "f1", "f2", "f3", "l0"], T1, 100);
  add(report, { scale: 0.7, translateX: 30, opacity: 0, duration: 120, ease: "inCubic" }, T1);
  nextSystem(1, T1);
  add(lead, { scale: [0.6, 1], opacity: [0, 1], duration: 120, ease: "outCubic" }, T1 + 90);
  drawIn(["tb"], T1 + 120, 130);
  drawIn(["l1"], T1 + 140, 60);
  add(n1, { opacity: [0, 1], scale: [0.4, 1], duration: 40, delay: A.stagger(20) }, T1 + 190);
  add(n1l, { opacity: [0, 0.4], duration: 40, delay: A.stagger(20) }, T1 + 200);
  fadeIn(av, T1 + 210, 15);
  travel(av, PATH.l1, T1 + 210, 70);
  fadeOut(av, T1 + 272, 20);
  work(1, T1 + 210, 140);
  comet("c1", 1500);
  approval(1);
  // approved: Sarah moves down the line, stop by stop
  const TP = STOP[1] + 30;
  const TPD = 170;
  add(D.tp, { draw: ["0 0", "0 1"], duration: TPD, ease: "linear" }, TP);
  fadeIn(av, TP - 5, 15);
  travel(av, PATH.tp, TP, TPD);
  [150, 236, 322].forEach((y, i) => {
    const at = TP + fracAt(PATH.tp, (p) => p.x > 983 && p.y >= y - 0.5) * TPD;
    add(n1d[i], { opacity: [0, 1], scale: [0.4, 1], duration: 24, ease: "outBack" }, at);
    add(n1l[i], { opacity: 1, duration: 24 }, at);
  });
  fadeOut(av, TP + TPD - 4, 20);
  add(meet, { opacity: [0, 1], scale: [0.85, 1], translateY: [10, 0], duration: 60, ease: "outBack" }, TP + TPD - 10);

  /* ---- morph → 03 · Invoice follow-up: a loop ---- */
  const T2 = 1840;
  add(lead, { rotateX: [0, 90], opacity: 0, duration: 100, ease: "inCubic" }, T2);
  drawOut(["l1"], T2, 80);
  add(drs(["tb", "tp"]), { draw: ["0 1", "0 0"], duration: 110, ease: "inQuad" }, T2);
  add([...n1, ...n1d, ...n1l], { opacity: 0, duration: 50 }, T2);
  add(meet, { opacity: 0, scale: 0.85, translateY: -10, duration: 70, ease: "inCubic" }, T2);
  nextSystem(2, T2);
  add(inv, { rotateX: [-90, 0], opacity: [0, 1], duration: 110, ease: "outCubic" }, T2 + 90);
  drawIn(["l2"], T2 + 150, 60);
  drawIn(["e2"], T2 + 160, 50);
  drawIn(["loop"], T2 + 170, 140);
  add(n2, { opacity: [0, 1], scale: [0.4, 1], duration: 40, delay: A.stagger(25) }, T2 + 240);
  fadeIn(n2l, T2 + 250, 50);
  add(n2d[0], { opacity: [0, 1], scale: [0.4, 1], duration: 30, ease: "outBack" }, T2 + 270);
  fadeIn(cntA, T2 + 270, 50);
  fadeIn(coin, T2 + 210, 15);
  travel(coin, PATH.l2, T2 + 210, 70);
  fadeOut(coin, T2 + 272, 20);
  work(2, T2 + 210, 140);
  comet("c2", 2160);
  approval(2);
  // approved: the firmer reminder goes round, then the money comes in
  const TC = STOP[2] + 20;
  fadeIn(coin, TC - 4, 15);
  travel(coin, PATH.e2, TC, 30);
  add(D.p1, { draw: ["0 0", "0 1"], duration: 110, ease: "linear" }, TC + 30);
  travel(coin, PATH.p1, TC + 30, 110);
  add(n2d[1], { opacity: [0, 1], scale: [0.4, 1], duration: 30, ease: "outBack" }, TC + 138);
  fadeOut(cntA, TC + 140, 30);
  fadeIn(cntB, TC + 155, 40);
  add(coin, {
    backgroundColor: ["#ffffff", "#1a7f37"],
    borderColor: ["#1d1d1f", "#1a7f37"],
    color: ["#1d1d1f", "#ffffff"],
    duration: 30,
  }, TC + 140);
  add(D.p2, { draw: ["0 0", "0 1"], duration: 80, ease: "linear" }, TC + 160);
  travel(coin, PATH.p2, TC + 160, 80);
  add(bankc, { opacity: [0, 1], scale: [0.85, 1], translateY: [10, 0], duration: 60, ease: "outBack" }, TC + 225);
  fadeOut(coin, TC + 240, 25);

  /* ---- finale · the three shapes side by side ---- */
  const TF = 2640;
  add(board, { translateZ: [0, -160], duration: 200, ease: "inOutQuad" }, TF);
  add(scaler, { opacity: [1, 0.12], duration: 200, ease: "inOutQuad" }, TF);
  add(tcs, { opacity: [0, 1], translateY: [24, 0], duration: 140, delay: A.stagger(40), ease: "outCubic" }, TF + 60);

  /* ---- captions + system label ---- */
  const capOut = (i: number, at: number) => add(caps[i], { opacity: 0, translateY: -12, duration: 60 }, at);
  const capIn = (i: number, at: number) => add(caps[i], { opacity: [0, 1], translateY: [12, 0], duration: 60 }, at);
  const sysOn = (k: number, at: number) => add(sysLabels[k], { opacity: 1, color: "#e0312b", duration: 60 }, at);
  const sysOff = (k: number, at: number) => add(sysLabels[k], { opacity: 0.35, color: "#6e6e73", duration: 60 }, at);
  capOut(0, 280); capIn(1, 340);
  capOut(1, T1); capIn(2, T1 + 60);
  capOut(2, T2); capIn(3, T2 + 60);
  capOut(3, TF); capIn(4, TF + 60);
  sysOn(0, 320); sysOff(0, T1 + 20);
  sysOn(1, T1 + 40); sysOff(1, T2 + 20);
  sysOn(2, T2 + 40);
  sysOn(0, TF + 60); sysOn(1, TF + 60);
  add({}, { duration: 1 }, TOTAL - 1);

  /* ---- progress: scroll, scrubber, Approve, idle demo ---- */
  fit();
  const setT = (v: number) => {
    t = Math.max(0, Math.min(TOTAL, v));
    tl.seek(t);
    camera(t);
    scrub.value = String(Math.round((t / TOTAL) * 1000));
    btns.forEach((b, k) => {
      const active = t >= STOP[k] - 150 && t < STOP[k];
      b.style.pointerEvents = active ? "auto" : "none";
      b.style.opacity = active ? "1" : "0.55";
      b.tabIndex = active ? 0 : -1;
    });
  };

  let alive = true;
  let demoOn = false;
  let userTouched = false;
  let demoAnim: JSAnimation | null = null;
  const timers: ReturnType<typeof setTimeout>[] = [];
  const wait = (ms: number) => new Promise<void>((r) => timers.push(setTimeout(r, ms)));
  const stopDemo = () => {
    demoOn = false;
    userTouched = true;
    demoAnim?.pause();
    demoAnim = null;
  };
  const NAV_OFFSET = 64;
  const scrollRange = () => stage.offsetHeight - window.innerHeight;
  const scrollT = () => {
    const total = scrollRange();
    return total > 0 ? ((-stage.getBoundingClientRect().top + NAV_OFFSET) / total) * TOTAL : 0;
  };

  // Scroll sets a target; the story eases toward it each frame, so wheel steps glide
  // instead of jumping.
  let target = 0;
  let raf = 0;
  let lastFrame = 0;
  const follow = (now: number) => {
    const dt = Math.min(64, now - lastFrame || 16);
    lastFrame = now;
    const next = t + (target - t) * (1 - Math.exp(-dt / 160));
    if (Math.abs(target - next) < 0.5) {
      setT(target);
      raf = 0;
      return;
    }
    setT(next);
    raf = requestAnimationFrame(follow);
  };
  const followTo = (v: number) => {
    target = Math.max(0, Math.min(TOTAL, v));
    if (raf) return;
    lastFrame = performance.now();
    raf = requestAnimationFrame(follow);
  };
  const stopFollow = () => {
    cancelAnimationFrame(raf);
    raf = 0;
  };

  let lastY = window.scrollY;
  const onScroll = () => {
    if (Math.abs(window.scrollY - lastY) > 2) stopDemo();
    lastY = window.scrollY;
    if (!demoOn) followTo(scrollT());
  };
  const onScrub = () => {
    stopDemo();
    stopFollow();
    setT((Number(scrub.value) / 1000) * TOTAL);
    target = t;
  };

  const proxy = { t: 0 };
  const glideTo = (to: number, duration: number) => {
    stopFollow();
    demoAnim?.pause();
    proxy.t = t;
    demoAnim = A.animate(proxy, { t: to, duration, ease: "inOutSine", onUpdate: () => setT(proxy.t) });
    return demoAnim;
  };

  // Approve moves the story on: scroll there if the page scrolls, otherwise glide.
  const onClick = (e: MouseEvent) => {
    const b = (e.target as Element).closest?.("[data-approve]");
    if (!b) return;
    const k = Number(b.getAttribute("data-approve"));
    const goal = STOP[k] + AFTER[k];
    const range = scrollRange();
    demoOn = false;
    userTouched = true;
    if (range > 0 && window.scrollY > 0) {
      const top = stage.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
      window.scrollTo({ top: top + (goal / TOTAL) * range, behavior: "smooth" });
    } else {
      glideTo(goal, 1100);
    }
  };
  board.addEventListener("click", onClick);

  // If nobody scrolls, play the story on its own (useful when the stage is the first thing seen).
  const demo = async () => {
    demoOn = true;
    const beats: [number, number][] = [
      [STOP[0] - 20, 4600], [STOP[0] + AFTER[0], 1000],
      [STOP[1] - 20, 2800], [STOP[1] + AFTER[1], 1400],
      [STOP[2] - 20, 2800], [STOP[2] + AFTER[2], 1600],
      [TOTAL, 2000],
    ];
    while (alive && demoOn) {
      setT(0);
      await wait(900);
      for (let i = 0; i < beats.length && demoOn; i++) {
        await glideTo(beats[i][0], beats[i][1]);
        if (!demoOn) return;
        await wait(i % 2 === 0 ? 1400 : 800);
      }
      if (!demoOn) return;
      await wait(2400);
      if (!demoOn) return;
      await glideTo(0, 3000);
    }
  };

  let eyeAnim: JSAnimation | null = null;
  if (reduce) {
    setT(TOTAL);
  } else {
    setT(scrollT());
    target = t;
    eyeAnim = A.animate(qa("[data-eye]"), { translateX: [-9, 9], duration: 1100, alternate: true, loop: true, ease: "inOutSine" });
    window.addEventListener("scroll", onScroll, { passive: true });
    // Only auto-play when the stage fills the screen untouched (it's the first thing seen).
    // Below the hero, scrolling drives it: an auto-played board would snap back to the
    // scattered start as soon as the visitor scrolled.
    timers.push(
      setTimeout(() => {
        const atTop = stage.getBoundingClientRect().top <= NAV_OFFSET;
        if (alive && !userTouched && t === 0 && atTop && window.scrollY === 0) void demo();
      }, 2200),
    );
  }
  scrub.addEventListener("input", onScrub);

  return () => {
    alive = false;
    stopDemo();
    stopFollow();
    timers.forEach(clearTimeout);
    ro.disconnect();
    eyeAnim?.revert();
    tl.revert();
    window.removeEventListener("scroll", onScroll);
    scrub.removeEventListener("input", onScrub);
    board.removeEventListener("click", onClick);
  };
}
