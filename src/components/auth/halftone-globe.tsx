/**
 * A large halftone sphere in the botLane logo's colours: red-orange dots on
 * graphite, lit from the upper right, warming to near-white at the highlight.
 * Built once at render time as plain SVG circles, so it ships no script.
 */

const GRID = 44; // dots across the sphere's diameter
const VIEW = 1000;
const R = 470; // sphere radius in view units
const STEP = (R * 2) / GRID;
const MAX_DOT = STEP * 0.46;

// Same ramp as the logo's dots: deep red → Lane red → coral → white.
const RAMP: [number, [number, number, number]][] = [
  [0, [92, 26, 23]],
  [0.35, [224, 49, 43]],
  [0.7, [255, 138, 107]],
  [1, [255, 236, 228]],
];

function rampColor(t: number) {
  for (let i = 1; i < RAMP.length; i++) {
    const [p1, c1] = RAMP[i];
    const [p0, c0] = RAMP[i - 1];
    if (t <= p1) {
      const k = (t - p0) / (p1 - p0);
      const c = c0.map((v, j) => Math.round(v + (c1[j] - v) * k));
      return `rgb(${c[0]},${c[1]},${c[2]})`;
    }
  }
  return "rgb(255,236,228)";
}

type Dot = { x: number; y: number; r: number; band: number };

const BANDS = 14;

function buildDots(): Dot[] {
  const light = [0.42, -0.48, 0.77];
  const len = Math.hypot(...light);
  const [lx, ly, lz] = light.map((v) => v / len);
  const dots: Dot[] = [];
  for (let j = 0; j <= GRID; j++) {
    for (let i = 0; i <= GRID; i++) {
      const x = -R + i * STEP;
      const y = -R + j * STEP;
      const d = Math.hypot(x, y) / R;
      if (d > 1) continue;
      const nx = x / R;
      const ny = y / R;
      const nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny));
      const lit = Math.max(0, nx * lx + ny * ly + nz * lz);
      const t = Math.pow(lit, 2.6);
      const r = MAX_DOT * (0.14 + 0.86 * t) * (0.55 + 0.45 * nz);
      if (r < 0.9) continue;
      dots.push({
        x: +(VIEW / 2 + x).toFixed(1),
        y: +(VIEW / 2 + y).toFixed(1),
        r: +r.toFixed(2),
        // Colours are quantised into bands so each band shares one fill
        band: Math.min(BANDS - 1, Math.floor(t * BANDS)),
      });
    }
  }
  return dots;
}

const DOTS = buildDots();

export function HalftoneGlobe({ className }: { className?: string }) {
  return (
    <svg viewBox={`0 0 ${VIEW} ${VIEW}`} className={className} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="globe-glow" cx="0.62" cy="0.36" r="0.6">
          <stop offset="0" stopColor="#e0312b" stopOpacity="0.28" />
          <stop offset="1" stopColor="#e0312b" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={VIEW / 2} cy={VIEW / 2} r={VIEW / 2} fill="url(#globe-glow)" />
      {Array.from({ length: BANDS }, (_, band) => (
        <g key={band} fill={rampColor((band + 0.5) / BANDS)}>
          {DOTS.filter((d) => d.band === band).map((d) => (
            <circle key={`${d.x}-${d.y}`} cx={d.x} cy={d.y} r={d.r} />
          ))}
        </g>
      ))}
    </svg>
  );
}
