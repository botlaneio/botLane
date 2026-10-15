"use client";

import { useEffect, useRef } from "react";

/**
 * A perfectly round halftone orb that feels alive: a dense diagonal grid of
 * dots with a crisp circular edge that gently breathes, and a slow ripple
 * travelling through the dot sizes. Colours come only from the approved logo
 * palette and run diagonally across the orb, turning slowly. Drawn on a
 * canvas with no tile or background, paused while off screen, and held still
 * for visitors who prefer reduced motion.
 */

// Palettes taken verbatim from the "botLane Red Logo" file.
export type OrbStops = readonly (readonly [number, string])[];

/** Sign-in: lilac through Lane red to coral. */
export const ORB_EMBER: OrbStops = [
  [0, "#907adb"],
  [0.22, "#9a86e0"],
  [0.45, "#be2921"],
  [0.62, "#e0312b"],
  [0.8, "#f56c56"],
  [1, "#ff8a6b"],
];

/** Sign-up: deep lilac up to near-white. */
export const ORB_LILAC: OrbStops = [
  [0, "#907adb"],
  [0.3, "#a592e5"],
  [0.55, "#bfb1f0"],
  [0.8, "#dbd3f8"],
  [1, "#f6f4fd"],
];

function makeMix(stops: OrbStops) {
  const rgb = stops.map(([p, hex]) => [p, [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))] as const);
  return (t: number) => {
    const k = Math.min(1, Math.max(0, t));
    for (let i = 1; i < rgb.length; i++) {
      const [p1, c1] = rgb[i];
      const [p0, c0] = rgb[i - 1];
      if (k <= p1) {
        const f = (k - p0) / (p1 - p0);
        return `rgb(${c0.map((v, j) => Math.round(v + (c1[j] - v) * f)).join(",")})`;
      }
    }
    return `rgb(${rgb[rgb.length - 1][1].join(",")})`;
  };
}

const COLS = 52; // grid lines across the orb's diameter

export function LivingOrb({ className, stops = ORB_EMBER }: { className?: string; stops?: OrbStops }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const mix = makeMix(stops);

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
      // Dots shrink in proportion to their distance from the circle over ~3 rows,
      // so the silhouette is drawn by dot size and reads as a true circle
      const feather = step * 3.2;
      const edge = R * (1 + 0.015 * Math.sin(t * 0.55)); // breathes, stays a circle
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
          const inside = (edge - dist) / feather; // >1 inside, 0 at the rim
          if (inside <= 0) continue;
          const rim = Math.min(1, inside);
          // A slow ripple travelling outward through the dot sizes
          const ripple = 0.9 + 0.1 * Math.cos((dist / R) * Math.PI * 1.6 - t * 0.9);
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
  }, [stops]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
