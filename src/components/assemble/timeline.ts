import type { AnimationParams, JSAnimation, Timeline } from "animejs";

type Anime = typeof import("animejs");
type El = HTMLElement | SVGElement;

// One timeline, 0 → TOTAL. Scroll position seeks it.
// Each system has its own shape: 01 funnel (many → one), 02 line (one → a run over time),
// 03 loop (until paid). Lane and You never move; the shapes change around them.
export const TOTAL = 2900;
export const STOP = [1000, 1600, 2250]; // the three approval moments
const AFTER = [200, 220, 280]; // how far an Approve click moves the story on

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
  const fit = () => {
    const w = fitEl.clientWidth || 1240;
    const h = fitEl.clientHeight || 600;
    const s = Math.max(0.2, Math.min(1, w / 1300, h / 700));
    const tf = `translate(-50%, -50%) scale(${s})`;
    scaler.style.transform = tf;
    trioScale.style.transform = tf;
  };
  fit();
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
  const s0 = qa("[data-s0]");
  const chips = qa("[data-chip]");
  const report = q("[data-report]");
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

  /* ---- the opening: pieces scattered in a seeded, repeatable way ---- */
  let seed = 7;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  const scatter = (el: Element) => {
    const cx = Number(el.getAttribute("data-cx"));
    const cy = Number(el.getAttribute("data-cy"));
    const dx = cx - 620;
    const dy = cy - 300;
    const len = Math.max(Math.hypot(dx, dy), 1);
    const dist = 120 + rnd() * 200;
    return {
      translateX: (dx / len) * dist + (rnd() - 0.5) * 160,
      translateY: (dy / len) * dist * (dy < 0 ? 0.25 : 0.7) + (rnd() - 0.3) * 120,
      translateZ: 40 + rnd() * 260,
      rotateX: (rnd() - 0.5) * 60,
      rotateY: (rnd() - 0.5) * 60,
      rotateZ: (rnd() - 0.5) * 50,
      scale: 0.8 + rnd() * 0.3,
      opacity: 0.92,
    };
  };
  const home = { translateX: 0, translateY: 0, translateZ: 0, rotateX: 0, rotateY: 0, rotateZ: 0, scale: 1, opacity: 1 };
  [...heads, lane, you, ...s0].forEach((el) => A.utils.set(el, scatter(el)));

  /* ---- starting state ---- */
  const set = A.utils.set;
  set(board, { rotateX: 34, rotateY: -20, rotateZ: -8, translateZ: 0 });
  set(floor, { opacity: 0, scale: 0.85 });
  set(bars, { scaleY: 0 });
  set([lead, inv, meet, bankc, av, coin, cntA, cntB, n2l, ring, odone, lpr], { opacity: 0 });
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
  const settle = (duration: number, stag: number): AnimationParams => ({ duration, delay: A.stagger(stag), ease: "inOutCubic", ...home });
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

  /* ---- 0 → 700 · pieces assemble ---- */
  add(board, { rotateX: 16, rotateY: -10, rotateZ: 1.5, duration: 700, ease: "inOutQuad" }, 0);
  add(floor, { opacity: 1, scale: 1, duration: 300, ease: "outQuad" }, 120);
  add(heads, settle(300, 40), 160);
  add(lane, settle(320, 0), 220);
  add(chips, settle(320, 45), 240);
  add(you, settle(320, 0), 300);
  add(report, settle(320, 0), 380);

  /* ---- 01 · Client reporting: a funnel ---- */
  drawIn(["f0", "f1", "f2", "f3"], 690, 140, 25);
  drawIn(["ly"], 760, 80);
  drawIn(["l0"], 780, 80);
  dots.forEach((d, i) => {
    const t0 = 740 + i * 28;
    travel(d, PATH[`f${i}`], t0, 130);
    fadeIn(d, t0, 15);
    fadeOut(d, t0 + 112, 20);
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
  let t = 0;
  const setT = (v: number) => {
    t = Math.max(0, Math.min(TOTAL, v));
    tl.seek(t);
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
  const scrollRange = () => stage.offsetHeight - window.innerHeight;
  const scrollT = () => {
    const total = scrollRange();
    return total > 0 ? (-stage.getBoundingClientRect().top / total) * TOTAL : 0;
  };

  let lastY = window.scrollY;
  let ticking = false;
  const onScroll = () => {
    if (Math.abs(window.scrollY - lastY) > 2) stopDemo();
    lastY = window.scrollY;
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      if (!demoOn) setT(scrollT());
    });
  };
  const onScrub = () => {
    stopDemo();
    setT((Number(scrub.value) / 1000) * TOTAL);
  };

  const proxy = { t: 0 };
  const glideTo = (target: number, duration: number) => {
    demoAnim?.pause();
    proxy.t = t;
    demoAnim = A.animate(proxy, { t: target, duration, ease: "inOutSine", onUpdate: () => setT(proxy.t) });
    return demoAnim;
  };

  // Approve moves the story on: scroll there if the page scrolls, otherwise glide.
  const onClick = (e: MouseEvent) => {
    const b = (e.target as Element).closest?.("[data-approve]");
    if (!b) return;
    const k = Number(b.getAttribute("data-approve"));
    const target = STOP[k] + AFTER[k];
    const range = scrollRange();
    demoOn = false;
    userTouched = true;
    if (range > 0 && window.scrollY > 0) {
      const top = stage.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + (target / TOTAL) * range, behavior: "smooth" });
    } else {
      glideTo(target, 1100);
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
    eyeAnim = A.animate(qa("[data-eye]"), { translateX: [-9, 9], duration: 1100, alternate: true, loop: true, ease: "inOutSine" });
    window.addEventListener("scroll", onScroll, { passive: true });
    // Only auto-play when the stage is already on screen and untouched.
    timers.push(
      setTimeout(() => {
        const r = stage.getBoundingClientRect();
        const onScreen = r.top < window.innerHeight && r.bottom > 0;
        if (alive && !userTouched && t === 0 && onScreen && window.scrollY === 0) void demo();
      }, 2200),
    );
  }
  scrub.addEventListener("input", onScrub);

  return () => {
    alive = false;
    stopDemo();
    timers.forEach(clearTimeout);
    ro.disconnect();
    eyeAnim?.revert();
    tl.revert();
    window.removeEventListener("scroll", onScroll);
    scrub.removeEventListener("input", onScrub);
    board.removeEventListener("click", onClick);
  };
}
