import type { CSSProperties } from "react";
import "./halftone-mark.css";

/**
 * The Botlane mark as a live component: a sphere of halftone dots on a
 * 45° grid, built dot by dot so every dot can be animated.
 *
 * - `intro`: the dots fly in from a loose cloud and lock into the sphere
 *   once, on mount.
 * - `state`: "rest" (default), "active" (a purple arc sweeps around the
 *   sphere) or "thinking" (the dots pulse outward from the centre until
 *   the state changes).
 * - `tone`: "color" (blue to coral, the default), "dark" or "light".
 * - `detail`: "hd" (full detail) or "small" (fewer, bigger dots for 48px and
 *   below). "auto" picks from `size`.
 */

type Tone = "color" | "dark" | "light";
type Detail = "auto" | "hd" | "small";
export type HalftoneMarkState = "rest" | "active" | "thinking";

export interface HalftoneMarkProps {
  size?: number;
  tone?: Tone;
  detail?: Detail;
  state?: HalftoneMarkState;
  intro?: boolean;
  /** Seconds before the intro starts. */
  introDelay?: number;
  /** Multiplies every duration: 1 is the designed speed, 2 is half as fast. */
  pace?: number;
  className?: string;
  title?: string;
}

type Dot = { x: number; y: number; r: number; fill: string; sx: number; sy: number; delay: number; ring: number };

const STOPS: Record<Tone, [number, string][]> = {
  color: [[0, "#1822c9"], [0.4, "#5a2cb8"], [0.7, "#b5306c"], [1, "#f2444f"]],
  dark: [[0, "#0e0e10"], [0.5, "#1c1c20"], [1, "#36363c"]],
  light: [[0, "#f4f4f6"], [0.5, "#d6d6dc"], [1, "#a9a9b2"]],
};

const GRID: Record<"hd" | "small", { sp: number; rmax: number }> = {
  hd: { sp: 3.5, rmax: 1.95 },
  small: { sp: 7, rmax: 4.3 },
};

const CX = 100;
const CY = 100;
const R = 58;
/** Upper-right quarter circle around the sphere, from 12 o'clock to 3 o'clock. */
const ARC = "M101 35A67 67 0 0 1 168 102";

function hex(c: string) {
  return [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
}

function colourAt(stops: [number, string][], t: number) {
  const k = Math.max(0, Math.min(1, t));
  for (let i = 1; i < stops.length; i++) {
    const [o1, c1] = stops[i];
    if (k <= o1) {
      const [o0, c0] = stops[i - 1];
      const f = (k - o0) / (o1 - o0);
      const a = hex(c0);
      const b = hex(c1);
      return `rgb(${a.map((v, j) => Math.round(v + (b[j] - v) * f)).join(",")})`;
    }
  }
  return stops[stops.length - 1][1];
}

/** Small deterministic PRNG so server and client render identical dots. */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const cache = new Map<string, Dot[]>();

function buildDots(tone: Tone, detail: "hd" | "small"): Dot[] {
  const key = `${tone}:${detail}`;
  const hit = cache.get(key);
  if (hit) return hit;

  const { sp, rmax } = GRID[detail];
  const scale = sp / 4.4;
  const rand = rng(detail === "hd" ? 7 : 11);
  const dots: Dot[] = [];
  const n = Math.ceil(R / sp) + 3;

  for (let i = -n; i <= n; i++) {
    for (let j = -n; j <= n; j++) {
      const u = i * sp;
      const v = j * sp;
      const x = CX + (u - v) / Math.SQRT2;
      const y = CY + (u + v) / Math.SQRT2;
      const d = Math.hypot(x - CX, y - CY) / R;
      if (d > 1.01) continue;

      const edge = d < 0.66 ? 1 : Math.max(0, 1 - ((d - 0.66) / 0.35) ** 1.9);
      const dc = Math.hypot(x - (CX - 6), y - (CY + 8)) / R;
      const dip = 1 - 0.22 * Math.exp(-((dc / 0.3) ** 2));
      const r = rmax * edge * dip;
      if (r < 0.3 * scale) continue;

      const t = ((x - CX - (y - CY)) / (2 * R)) * 1.08 + 0.5;
      const ang = rand() * Math.PI * 2;
      const far = 40 + rand() * 60;
      dots.push({
        x,
        y,
        r,
        fill: colourAt(STOPS[tone], t),
        sx: Math.cos(ang) * far,
        sy: Math.sin(ang) * far,
        // Lower-left first, sweeping to the upper right.
        delay: ((x - (CX - R)) + ((CY + R) - y)) / (4 * R) + rand() * 0.12,
        ring: d,
      });
    }
  }
  cache.set(key, dots);
  return dots;
}

export function HalftoneMark({
  size = 40,
  tone = "color",
  detail = "auto",
  state = "rest",
  intro = false,
  introDelay = 0,
  pace = 1,
  className,
  title,
}: HalftoneMarkProps) {
  const level = detail === "auto" ? (size <= 48 ? "small" : "hd") : detail;
  const dots = buildDots(tone, level);
  const arcWidth = level === "small" ? 4 : 0.9;

  const rootStyle = {
    // rem, so the mark follows the site's 80% phone scale.
    width: `${size / 16}rem`,
    height: `${size / 16}rem`,
    "--hm-pace": pace,
    "--hm-intro-delay": `${introDelay}s`,
  } as CSSProperties;

  return (
    <svg
      viewBox="20 20 160 160"
      fill="none"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      data-state={state}
      className={`hm ${intro ? "hm-intro" : ""} ${className ?? ""}`}
      style={rootStyle}
    >
      {dots.map((d, i) => (
        // The cell carries the thinking pulse and the dot carries the intro,
        // so switching state never replays the intro.
        <g
          key={i}
          className="hm-cell"
          style={{ "--ring": d.ring.toFixed(3) } as CSSProperties}
        >
          <circle
            className="hm-dot"
            cx={d.x.toFixed(2)}
            cy={d.y.toFixed(2)}
            r={d.r.toFixed(2)}
            fill={d.fill}
            style={
              {
                "--sx": `${d.sx.toFixed(1)}px`,
                "--sy": `${d.sy.toFixed(1)}px`,
                "--d": d.delay.toFixed(3),
              } as CSSProperties
            }
          />
        </g>
      ))}
      <path
        className="hm-arc"
        d={ARC}
        fill="none"
        pathLength={1}
        stroke="#7b2cff"
        strokeWidth={arcWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}
