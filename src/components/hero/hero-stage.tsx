"use client";

import { useEffect } from "react";

const W = 1200;
const H = 900;
const gutter = () => Math.min(Math.max(24, window.innerWidth * 0.05), 80);

/**
 * Drives the home hero. Desktop (≥1024px, motion allowed): pins the hero and scrubs a GSAP timeline
 * that flies the four cards from their scattered start into the window. Otherwise: scales the
 * assembled window to the page width. GSAP loads only when it will be used.
 */
export function HeroStage() {
  useEffect(() => {
    const hero = document.getElementById("hero");
    const stage = document.getElementById("stage");
    if (!hero || !stage) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let S = 1;
    let cleanupTl: (() => void) | null = null;
    let disposed = false;
    let mode: "anim" | "static" | null = null;

    const wantsAnim = () => window.innerWidth >= 1024 && !reduce.matches;

    const layout = () => {
      if (mode === "anim") {
        S = Math.min((window.innerWidth - 2 * gutter()) / W, (window.innerHeight - 24) / H, 1);
        stage.style.transformOrigin = "center center";
        stage.style.transform = `translate(-50%,-50%) scale(${S})`;
      } else {
        const avail = Math.min(document.documentElement.clientWidth - 2 * gutter(), 1100);
        const s = avail / W;
        stage.style.transformOrigin = "top center";
        stage.style.transform = `translateX(-50%) scale(${s})`;
        (stage.parentElement as HTMLElement).style.setProperty("--sh", `${Math.round(H * s)}px`);
      }
    };

    const setup = async () => {
      cleanupTl?.();
      cleanupTl = null;
      if (!wantsAnim()) {
        mode = "static";
        hero.classList.remove("anim");
        layout();
        return;
      }
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (disposed || !wantsAnim()) return;
      gsap.registerPlugin(ScrollTrigger);
      mode = "anim";
      hero.classList.add("anim");
      layout();

      const sx = (vx: number) => W / 2 + (vx - window.innerWidth / 2) / S;
      const sy = (vy: number) => H / 2 + (vy - window.innerHeight / 2) / S;
      const vw = () => window.innerWidth;
      const vh = () => window.innerHeight;
      const G = gutter;
      const fly = { x: 0, y: 0, rotation: 0, scale: 1, boxShadow: "var(--flat)", duration: 0.55, ease: "power2.inOut" };
      const from = (x: () => number, y: () => number, rotation: number) => ({
        x,
        y,
        rotation,
        scale: 0.82,
        transformOrigin: "0 0",
        boxShadow: "var(--float)",
      });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: hero, start: "top top", end: "bottom bottom", scrub: 0.8, invalidateOnRefresh: true },
      });
      tl.fromTo(
        ["#heroCopy", "#toolsRow", "#links", ".hero .node"],
        { opacity: 1, y: 0 },
        { opacity: 0, y: -80, duration: 0.3, ease: "power1.in" },
        0.02,
      )
        .fromTo("#win", { y: 640, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: "power2.out" }, 0.1)
        .fromTo("#cLead", from(() => sx(G()) - 300, () => sy(vh() * 0.15) - 190, -1.5), fly, 0.12)
        .fromTo("#cReport", from(() => sx(vw() - G() - 390 * S * 0.82) - 690, () => sy(vh() * 0.15) - 190, 1.5), fly, 0.15)
        .fromTo("#cDraft", from(() => sx(G() + vw() * 0.01) - 300, () => sy(vh() * 0.52) - 460, 1), fly, 0.18)
        .fromTo("#cInvoice", from(() => sx(vw() - G() - 390 * S * 0.82 - vw() * 0.02) - 690, () => sy(vh() * 0.56) - 460, -1), fly, 0.21)
        .fromTo("#sent", { opacity: 0 }, { opacity: 1, duration: 0.05 }, 0.86)
        .fromTo("#waitTxt", { opacity: 1 }, { opacity: 0, duration: 0.05 }, 0.86);

      cleanupTl = () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        gsap.set(["#heroCopy", "#toolsRow", "#links", ".hero .node", "#win", ".hc", "#sent", "#waitTxt"], { clearProps: "all" });
        hero.classList.remove("anim");
      };
      document.fonts?.ready.then(() => !disposed && ScrollTrigger.refresh());
    };

    let t: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(async () => {
        if (wantsAnim() !== (mode === "anim")) await setup();
        else {
          layout();
          if (mode === "anim") (await import("gsap/ScrollTrigger")).ScrollTrigger.refresh();
        }
      }, 150);
    };

    setup();
    window.addEventListener("resize", onResize);
    reduce.addEventListener("change", setup);
    return () => {
      disposed = true;
      clearTimeout(t);
      window.removeEventListener("resize", onResize);
      reduce.removeEventListener("change", setup);
      cleanupTl?.();
    };
  }, []);

  return null;
}
