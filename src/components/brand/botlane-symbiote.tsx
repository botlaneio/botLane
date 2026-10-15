"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import "./botlane-symbiote.css";

/**
 * The living Symbiote mark: a white halftone dot sphere that breathes.
 * Motion from BotLaneSymbioteReact.zip; dot geometry matches the approved still image.
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

/**
 * The approved mark at rest, measured from Solo's reference render (15 Oct 2026):
 * a 45°-rotated square lattice of 185 dots. Each triple is lattice column, lattice row
 * and dot radius in thousandths of the lattice step. Interior dots overlap so only small
 * dark stars show between them; dots shrink toward the rim, and the slightly smaller
 * dots low-left of centre form the inner "eye".
 */
// prettier-ignore
const MARK = [
  -4, -10, 116, -2, -10, 339, 0, -10, 389, 2, -10, 339, 4, -10, 117, -5, -9, 292, -3, -9, 536, -1, -9, 638, 1, -9, 638, 3, -9, 537,
  5, -9, 293, -6, -8, 389, -4, -8, 661, -2, -8, 777, 0, -8, 807, 2, -8, 777, 4, -8, 662, 6, -8, 390, -7, -7, 420, -5, -7, 725,
  -3, -7, 834, -1, -7, 847, 1, -7, 848, 3, -7, 835, 5, -7, 726, 7, -7, 421, -8, -6, 388, -6, -6, 742, -4, -6, 844, -2, -6, 868,
  0, -6, 867, 2, -6, 845, 4, -6, 846, 6, -6, 743, 8, -6, 391, -9, -5, 291, -7, -5, 725, -5, -5, 867, -3, -5, 844, -1, -5, 866,
  1, -5, 846, 3, -5, 867, 5, -5, 847, 7, -5, 726, 9, -5, 293, -10, -4, 116, -8, -4, 661, -6, -4, 844, -4, -4, 842, -2, -4, 836,
  0, -4, 837, 2, -4, 842, 4, -4, 869, 6, -4, 847, 8, -4, 663, 10, -4, 118, -9, -3, 535, -7, -3, 856, -5, -3, 840, -3, -3, 849,
  -1, -3, 843, 1, -3, 830, 3, -3, 864, 5, -3, 869, 7, -3, 834, 9, -3, 536, -10, -2, 338, -8, -2, 777, -6, -2, 839, -4, -2, 820,
  -2, -2, 793, 0, -2, 795, 2, -2, 824, 4, -2, 842, 6, -2, 845, 8, -2, 777, 10, -2, 340, -9, -1, 637, -7, -1, 841, -5, -1, 820,
  -3, -1, 773, -1, -1, 768, 1, -1, 803, 3, -1, 825, 5, -1, 865, 7, -1, 848, 9, -1, 638, -10, 0, 405, -8, 0, 825, -6, 0, 830,
  -4, 0, 777, -2, 0, 711, 0, 0, 714, 2, 0, 787, 4, 0, 834, 6, 0, 843, 8, 0, 807, 10, 0, 391, -9, 1, 637, -7, 1, 860,
  -5, 1, 800, -3, 1, 714, -1, 1, 668, 1, 1, 728, 3, 1, 810, 5, 1, 863, 7, 1, 847, 9, 1, 638, -10, 2, 337, -8, 2, 775,
  -6, 2, 824, -4, 2, 759, -2, 2, 675, 0, 2, 685, 2, 2, 773, 4, 2, 831, 6, 2, 844, 8, 2, 777, 10, 2, 339, -9, 3, 535,
  -7, 3, 828, -5, 3, 808, -3, 3, 735, -1, 3, 691, 1, 3, 767, 3, 3, 815, 5, 3, 841, 7, 3, 835, 9, 3, 536, -10, 4, 116,
  -8, 4, 661, -6, 4, 856, -4, 4, 817, -2, 4, 745, 0, 4, 749, 2, 4, 802, 4, 4, 837, 6, 4, 867, 8, 4, 661, 10, 4, 117,
  -9, 5, 291, -7, 5, 723, -5, 5, 829, -3, 5, 798, -1, 5, 782, 1, 5, 804, 3, 5, 834, 5, 5, 843, 7, 5, 725, 9, 5, 291,
  -8, 6, 403, -6, 6, 739, -4, 6, 852, -2, 6, 817, 0, 6, 816, 2, 6, 855, 4, 6, 845, 6, 6, 741, 8, 6, 389, -7, 7, 419,
  -5, 7, 723, -3, 7, 825, -1, 7, 855, 1, 7, 836, 3, 7, 832, 5, 7, 724, 7, 7, 420, -6, 8, 402, -4, 8, 680, -2, 8, 797,
  0, 8, 801, 2, 8, 776, 4, 8, 662, 6, 8, 389, -5, 9, 290, -3, 9, 535, -1, 9, 637, 1, 9, 637, 3, 9, 535, 5, 9, 292,
  -4, 10, 116, -2, 10, 339, 0, 10, 403, 2, 10, 337, 4, 10, 116,
];

/** Lattice step in viewBox units: the outermost dots end just inside the -100..100 box. */
const STEP = 9;
const OUTER = 98;

/** Deterministic layout: no hydration mismatch or random jumps on rerender. */
function createDots(): Dot[] {
  const dots: Dot[] = [];
  for (let k = 0; k < MARK.length; k += 3) {
    const col = MARK[k];
    const row = MARK[k + 1];
    const x = col * STEP;
    const y = row * STEP;
    const radius = (MARK[k + 2] / 1000) * STEP;
    const distance = Math.hypot(x, y);
    const edgeFade = Math.max(0, Math.min(1, (OUTER - distance) / 18));
    const theta = Math.atan2(y, x);
    // Angular phase differences are intentional: the form never pulses rigidly in unison.
    const delay = -(distance * 0.062 + Math.sin(theta * 3) * 0.41 + (col * 7 + row * 13) * 0.019);
    const duration = 4.5 + ((Math.abs(row * 7 + col * 11) % 13) / 13) * 1.9;
    const dx = Math.cos(theta + Math.sin(distance / 16) * 0.5) * (0.45 + edgeFade * 0.3);
    const dy = Math.sin(theta + Math.cos(distance / 18) * 0.5) * (0.45 + edgeFade * 0.3);
    dots.push({ x, y, radius, delay, duration, dx, dy });
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
