"use client";

import { useEffect, useRef } from "react";

/**
 * A halftone orb that breathes: a grid of dots whose outline slowly morphs,
 * as if it were alive. Dots are full-size inside the shape and shrink to
 * nothing across its soft edge; colour runs diagonally from coral through
 * Lane red to deep wine and drifts slowly. Drawn on a canvas, paused while
 * off screen, and held still for visitors who prefer reduced motion.
 */

// Coral → Lane red → deep wine, lower left to upper right is wine → coral.
const STOPS: [number, [number, number, number]][] = [
  [0, [122, 26, 58]],
  [0.5, [224, 49, 43]],
  [1, [255, 138, 107]],
];

function mix(t: number) {
  const k = Math.min(1, Math.max(0, t));
  for (let i = 1; i < STOPS.length; i++) {
    const [p1, c1] = STOPS[i];
    const [p0, c0] = STOPS[i - 1];
    if (k <= p1) {
      const f = (k - p0) / (p1 - p0);
      return `rgb(${c0.map((v, j) => Math.round(v + (c1[j] - v) * f)).join(",")})`;
    }
  }
  return `rgb(${STOPS[STOPS.length - 1][1].join(",")})`;
}

// Gentle, incommensurate waves so the outline never visibly repeats.
const WAVES = [
  { k: 2, amp: 0.045, speed: 0.31, phase: 0.4 },
  { k: 3, amp: 0.03, speed: -0.23, phase: 1.9 },
  { k: 4, amp: 0.018, speed: 0.41, phase: 3.1 },
  { k: 5, amp: 0.01, speed: -0.53, phase: 0.7 },
];

const COLS = 26; // dots across the orb's resting diameter

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
      const R = size * 0.42; // resting radius; waves push the edge out to ~0.47
      const step = (R * 2) / COLS;
      const maxDot = step * 0.37;
      const feather = R * 0.34; // width of the soft halftone edge
      const breathe = 1 + 0.025 * Math.sin(t * 0.6);
      const drift = 0.08 * Math.sin(t * 0.17);

      // Diagonal grid like a printed halftone
      const half = Math.ceil(COLS * 0.75);
      for (let j = -half; j <= half; j++) {
        for (let i = -half; i <= half; i++) {
          const x = (i + (j % 2 ? 0.5 : 0)) * step;
          const y = j * step * 0.866;
          const dist = Math.hypot(x, y);
          const angle = Math.atan2(y, x);
          let edge = R * breathe;
          for (const w of WAVES) edge += R * w.amp * Math.sin(w.k * angle + w.speed * t + w.phase);
          const inside = (edge - dist) / feather; // >1 deep inside, 0 at the rim
          if (inside <= 0) continue;
          const s = inside >= 1 ? 1 : inside * inside * (3 - 2 * inside);
          const r = maxDot * (0.18 + 0.82 * s);
          if (r < 0.35) continue;
          // Colour along the lower-left → upper-right diagonal
          const g = 0.5 + (x - y) / (R * 2.6) + drift;
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
