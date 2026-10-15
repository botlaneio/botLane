"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import "./botlane-symbiote.css";

/**
 * The living Symbiote mark: a white halftone dot sphere that breathes.
 * Supplied in BotLaneSymbioteReact.zip; geometry and motion are unchanged.
 * Motion is pure CSS (no animation loop, no per-frame React state) and pauses
 * while the mark is offscreen or when the viewer prefers reduced motion.
 */

type SymbioteProps = {
  /** Width in CSS pixels or any CSS length (use rem so it scales on phones). The SVG is square. */
  size?: number | string;
  /** White by default; currentColor lets it inherit a parent text color. */
  color?: string;
  /** Set false to pause the breathing/metamorphosis. */
  animated?: boolean;
  /** 0.5 (calm) to 2 (intense). */
  intensity?: number;
  className?: string;
  /** Decorative marks should not be announced by screen readers. */
  decorative?: boolean;
};

type Dot = {
  x: number;
  y: number;
  radius: number;
  delay: number;
  duration: number;
  dx: number;
  dy: number;
};

/** Deterministic layout: no hydration mismatch or random jumps on rerender. */
function createDots(): Dot[] {
  const dots: Dot[] = [];
  const step = 9.1;
  const outside = 85;
  for (let row = -11; row <= 11; row++) {
    for (let col = -11; col <= 11; col++) {
      const x = col * step;
      const y = row * step;
      const distance = Math.hypot(x, y);
      if (distance > outside + 3) continue;
      // The original emblem has a slight internal orbital hollow, low-left of center.
      const holeDist = Math.hypot(x + 11, y - 12);
      if (holeDist > 13 && holeDist < 24) continue;
      const edgeFade = Math.max(0, Math.min(1, (outside + 3 - distance) / 18));
      const radius = (3.9 * edgeFade + 0.35) * (holeDist < 13 ? 0.91 : 1);
      if (radius < 0.48) continue;
      const theta = Math.atan2(y, x);
      // Angular phase differences are intentional: the form never pulses rigidly in unison.
      const delay = -(distance * 0.062 + Math.sin(theta * 3) * 0.41 + (col * 7 + row * 13) * 0.019);
      const duration = 4.5 + ((Math.abs(row * 7 + col * 11) % 13) / 13) * 1.9;
      const dx = Math.cos(theta + Math.sin(distance / 16) * 0.5) * (0.45 + edgeFade * 0.3);
      const dy = Math.sin(theta + Math.cos(distance / 18) * 0.5) * (0.45 + edgeFade * 0.3);
      dots.push({ x, y, radius, delay, duration, dx, dy });
    }
  }
  return dots;
}

const DOTS = createDots();

export function BotLaneSymbiote({
  size = 40,
  color = "#FFFFFF",
  animated = true,
  intensity = 1,
  className = "",
  decorative = true,
}: SymbioteProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const safeIntensity = Math.max(0.5, Math.min(2, intensity));
  const rootStyle = {
    width: size,
    height: size,
    color,
    "--sym-intensity": safeIntensity,
  } as CSSProperties;

  // Pause offscreen by toggling an attribute directly: no React re-render.
  useEffect(() => {
    const el = ref.current;
    if (!el || !animated || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => {
      el.toggleAttribute("data-offscreen", !entry.isIntersecting);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      el.removeAttribute("data-offscreen");
    };
  }, [animated]);

  return (
    <span
      ref={ref}
      className={`botlane-symbiote ${animated ? "is-animated" : "is-still"} ${className}`.trim()}
      style={rootStyle}
      aria-hidden={decorative ? true : undefined}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : "BotLane symbiote mark"}
    >
      <svg viewBox="-100 -100 200 200" xmlns="http://www.w3.org/2000/svg" fill="currentColor" focusable="false">
        <g className="botlane-symbiote__body">
          {DOTS.map((dot, index) => (
            <circle
              className="botlane-symbiote__dot"
              key={index}
              cx={dot.x}
              cy={dot.y}
              r={dot.radius}
              style={
                {
                  "--phase": `${dot.delay}s`,
                  "--period": `${dot.duration}s`,
                  "--dx": `${dot.dx.toFixed(3)}px`,
                  "--dy": `${dot.dy.toFixed(3)}px`,
                } as CSSProperties
              }
            />
          ))}
        </g>
      </svg>
    </span>
  );
}
