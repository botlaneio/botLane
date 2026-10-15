"use client";

import { useEffect, useRef } from "react";

/**
 * A round halftone orb that feels alive: a dense diagonal grid of dots whose
 * outline gently morphs and breathes, with a slow ripple travelling through
 * the dot sizes. Colours come only from the approved logo palette and run
 * diagonally from lilac through Lane red to coral, turning slowly. Drawn on a
 * canvas with no tile or background, paused while off screen, and held still
 * for visitors who prefer reduced motion.
 */

// Palette taken verbatim from the "botLane Red Logo" file.
const STOPS: [number, string][] = [
  [0, "#907adb"],
  [0.22, "#9a86e0"],
  [0.45, "#be2921"],
  [0.62, "#e0312b"],
  [0.8, "#f56c56"],
  [1, "#ff8a6b"],
];

const RGB = STOPS.map(([p, hex]) => [p, [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))] as const);

function mix(t: number) {
  const k = Math.min(1, Math.max(0, t));
  for (let i = 1; i < RGB.length; i++) {
    const [p1, c1] = RGB[i];
    const [p0, c0] = RGB[i - 1];
    if (k <= p1) {
      const f = (k - p0) / (p1 - p0);
      return `rgb(${c0.map((v, j) => Math.round(v + (c1[j] - v) * f)).join(",")})`;
    }
  }
  return `rgb(${RGB[RGB.length - 1][1].join(",")})`;
}

// Small, incommensurate waves: the outline stays round but never sits still.
const WAVES = [
  { k: 2, amp: 0.022, speed: 0.29, phase: 0.4 },
  { k: 3, amp: 0.016, speed: -0.21, phase: 1.9 },
  { k: 5, amp: 0.008, speed: 0.37, phase: 3.1 },
];

const COLS = 40; // grid lines across the orb's diameter

export function LivingOrb({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let size = 0;
    let raf = 0;
    let visible = true;
    const start = performance.now();

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      size = canvas.clientWidth;
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      const t = reduce ? 0 : (now - start) / 1000;
      ctx.clearRect(0, 0, size, size);
      // Fades in once over the first second
      ctx.globalAlpha = reduce ? 1 : Math.min(1, t / 1.1);

      const c = size / 2;
      const R = size * 0.46;
      const step = (R * 2) / COLS;
      const maxDot = step * 0.62; // diagonal neighbours sit step·√2 apart
      const feather = R * 0.2; // width of the soft halftone rim
      const breathe = 1 + 0.018 * Math.sin(t * 0.55);
      // The colour axis turns slowly around the orb
      const turn = -Math.PI / 4 + 0.35 * Math.sin(t * 0.12);
      const ax = Math.cos(turn);
      const ay = Math.sin(turn);

      const half = Math.ceil(COLS * 0.56);
      for (let j = -half; j <= half; j++) {
        for (let i = -half; i <= half; i++) {
          // Checkerboard of a square grid = the 45° screen of a printed halftone
          if ((i + j) & 1) continue;
          const x = i * step;
          const y = j * step;
          const dist = Math.hypot(x, y);
          const angle = Math.atan2(y, x);
          let edge = R * breathe;
          for (const w of WAVES) edge += R * w.amp * Math.sin(w.k * angle + w.speed * t + w.phase);
          const inside = (edge - dist) / feather; // >1 inside, 0 at the rim
          if (inside <= 0) continue;
          const rim = inside >= 1 ? 1 : inside * inside * (3 - 2 * inside);
          // A slow ripple travelling outward through the dot sizes
          const ripple = 0.84 + 0.16 * Math.cos((dist / R) * Math.PI * 2.2 - t * 0.9);
          const r = maxDot * rim * ripple;
          if (r < 0.35) continue;
          const g = 0.5 + (x * ax + y * ay) / (R * 2.1);
          ctx.fillStyle = mix(g);
          ctx.beginPath();
          ctx.arc(c + x, c + y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const loop = (now: number) => {
      draw(now);
      raf = visible ? requestAnimationFrame(loop) : 0;
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    ro.observe(canvas);

    if (reduce) {
      draw(start);
      return () => ro.disconnect();
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && !document.hidden;
      if (visible && !raf) raf = requestAnimationFrame(loop);
    });
    io.observe(canvas);
    const onVisibility = () => {
      visible = !document.hidden;
      if (visible && !raf) raf = requestAnimationFrame(loop);
    };
    document.addEventListener("visibilitychange", onVisibility);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
