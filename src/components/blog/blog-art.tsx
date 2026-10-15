/**
 * Abstract artwork for blog covers: quiet architecture and light, drawn as SVG so it
 * stays sharp at any size and costs no image downloads. Each variant fills its box
 * (slice), so the parent sets the shape.
 */

export type BlogArtVariant = "corridor" | "skyline" | "horizon" | "gallery" | "folds" | "ribbons" | "ember";

export function BlogArt({ variant, className }: { variant: BlogArtVariant; className?: string }) {
  const id = `blog-art-${variant}`;
  return (
    <svg
      viewBox="0 0 400 240"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      focusable="false"
      className={`block h-full w-full ${className ?? ""}`}
    >
      {ART[variant](id)}
    </svg>
  );
}

const ART: Record<BlogArtVariant, (id: string) => React.ReactNode> = {
  // Curved gallery wall, a slit of light, a dark panel on the right.
  corridor: (id) => (
    <>
      <defs>
        <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8d8a86" />
          <stop offset="0.45" stopColor="#c9c6c1" />
          <stop offset="0.62" stopColor="#e4e1dc" />
        </linearGradient>
        <linearGradient id={`${id}-floor`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d9d6d1" />
          <stop offset="1" stopColor="#9d9a95" />
        </linearGradient>
        <radialGradient id={`${id}-pool`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#f6f4f0" stopOpacity="0.95" />
          <stop offset="1" stopColor="#f6f4f0" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-beam`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-panel`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1b1b1d" />
          <stop offset="1" stopColor="#0c0c0d" />
        </linearGradient>
        <filter id={`${id}-blur`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      <rect width="400" height="240" fill={`url(#${id}-wall)`} />
      {[70, 120, 165, 205].map((x) => (
        <line key={x} x1={x} y1="0" x2={x} y2="150" stroke="#000" strokeOpacity="0.06" />
      ))}
      <path d="M0 150 C 90 120 200 112 270 118 L 400 120 L 400 240 L 0 240 Z" fill={`url(#${id}-floor)`} />
      <path d="M0 150 C 90 120 200 112 270 118" fill="none" stroke="#000" strokeOpacity="0.25" />
      <ellipse cx="190" cy="168" rx="105" ry="30" fill={`url(#${id}-pool)`} filter={`url(#${id}-blur)`} />
      <rect x="208" y="0" width="16" height="120" fill={`url(#${id}-beam)`} filter={`url(#${id}-blur)`} opacity="0.9" />
      <rect x="214" y="0" width="3" height="118" fill="#fff" />
      <path d="M262 0 H400 V240 H290 C 285 160 272 80 262 0 Z" fill={`url(#${id}-panel)`} />
    </>
  ),

  // A sweeping white roofline against a pale blue sky.
  skyline: (id) => (
    <>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6f8aa6" />
          <stop offset="1" stopColor="#c9d3dc" />
        </linearGradient>
        <linearGradient id={`${id}-band`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f3f2ef" />
          <stop offset="1" stopColor="#bdbab4" />
        </linearGradient>
        <linearGradient id={`${id}-under`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7d7a75" />
          <stop offset="1" stopColor="#c8c5bf" />
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill={`url(#${id}-sky)`} />
      <path d="M0 40 C 120 60 250 120 400 240 L 400 140 C 280 70 140 20 0 0 Z" fill={`url(#${id}-band)`} />
      <path d="M0 40 C 120 60 250 120 400 240 L 330 240 C 230 150 120 90 0 80 Z" fill={`url(#${id}-under)`} />
      <path d="M220 240 L 300 150 L 400 120 L 400 240 Z" fill="#e6e4e0" />
      <path d="M220 240 L 300 150 L 320 240 Z" fill="#a9a6a0" />
    </>
  ),

  // A single red-orange horizon arc on black.
  horizon: (id) => (
    <>
      <defs>
        <radialGradient id={`${id}-bg`} cx="0.75" cy="0.1" r="0.9">
          <stop offset="0" stopColor="#2a1512" />
          <stop offset="0.5" stopColor="#0f0d0d" />
          <stop offset="1" stopColor="#060606" />
        </radialGradient>
        <filter id={`${id}-glow`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>
      <rect width="400" height="240" fill={`url(#${id}-bg)`} />
      <path d="M95 260 C 140 120 250 20 420 -10" fill="none" stroke="#ff4a3d" strokeWidth="10" opacity="0.55" filter={`url(#${id}-glow)`} />
      <path d="M95 260 C 140 120 250 20 420 -10" fill="none" stroke="#ff6a4d" strokeWidth="1.6" />
    </>
  ),

  // Warm wall panels with a soft diagonal fall of light.
  gallery: (id) => (
    <>
      <defs>
        <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c9c3ba" />
          <stop offset="0.35" stopColor="#efebe5" />
          <stop offset="1" stopColor="#b3ada4" />
        </linearGradient>
        <linearGradient id={`${id}-shade`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.28" />
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill={`url(#${id}-wall)`} />
      {[30, 62, 270, 345].map((x) => (
        <line key={x} x1={x} y1="0" x2={x} y2="240" stroke="#000" strokeOpacity="0.12" />
      ))}
      <rect x="40" y="0" width="12" height="240" fill="#fff" opacity="0.55" />
      <path d="M210 0 L 400 0 L 400 240 L 330 240 Z" fill={`url(#${id}-shade)`} />
    </>
  ),

  // Pale sculpted curves, like stacked plaster.
  folds: (id) => (
    <>
      <defs>
        <linearGradient id={`${id}-a`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f2f0ec" />
          <stop offset="1" stopColor="#a8a49e" />
        </linearGradient>
        <linearGradient id={`${id}-b`} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e9e6e1" />
          <stop offset="1" stopColor="#8f8b85" />
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill="#d6d3ce" />
      <path d="M-20 240 C 60 120 160 40 420 -20 L 420 240 Z" fill={`url(#${id}-a)`} />
      <path d="M80 240 C 150 150 250 90 420 60 L 420 240 Z" fill={`url(#${id}-b)`} />
      <path d="M200 240 C 250 190 320 160 420 150 L 420 240 Z" fill="#f4f2ee" opacity="0.85" />
    </>
  ),

  // Glossy black ribbons running on a diagonal.
  ribbons: (id) => (
    <>
      <defs>
        <linearGradient id={`${id}-r`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#050505" />
          <stop offset="0.5" stopColor="#3a3a3d" />
          <stop offset="1" stopColor="#050505" />
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill="#070707" />
      {[-120, -40, 40, 120, 200, 280].map((x) => (
        <path
          key={x}
          d={`M${x} 260 C ${x + 60} 160 ${x + 120} 80 ${x + 260} -20 L ${x + 300} -20 C ${x + 160} 80 ${x + 100} 160 ${x + 40} 260 Z`}
          fill={`url(#${id}-r)`}
          opacity="0.9"
        />
      ))}
    </>
  ),

  // Deep red-orange folds catching the light.
  ember: (id) => (
    <>
      <defs>
        <linearGradient id={`${id}-a`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff6a4d" />
          <stop offset="1" stopColor="#7a160f" />
        </linearGradient>
        <linearGradient id={`${id}-b`} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e0312b" />
          <stop offset="1" stopColor="#2a0806" />
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill="#1a0705" />
      <path d="M-20 240 C 80 160 140 60 200 -20 L 420 -20 L 420 240 Z" fill={`url(#${id}-b)`} />
      <path d="M120 240 C 200 160 250 80 300 -20 L 420 -20 L 420 240 Z" fill={`url(#${id}-a)`} />
      <path d="M260 240 C 310 180 350 110 420 60 L 420 240 Z" fill="#2a0806" opacity="0.55" />
    </>
  ),
};
