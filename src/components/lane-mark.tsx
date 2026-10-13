import type { SVGProps } from "react";
import "./lane-mark.css";

export interface LaneMarkProps extends SVGProps<SVGSVGElement> {
  size?: number;
  animated?: boolean;
}

/**
 * The official BotLane mark:
 * A precision dark rounded tile (#1d1d1f), recessed pill visor (#2c2c2e),
 * and Lane's signature red scanner eye (#ff453a) with glowing pulse.
 */
export function LaneMark({
  size = 24,
  animated = false,
  className,
  ...props
}: LaneMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 420 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`shrink-0 select-none ${className ?? ""}`}
      {...props}
    >
      <defs>
        <linearGradient id="lane-tile-gradient" x1="0" y1="0" x2="0" y2="420" gradientUnits="userSpaceOnUse">
          <stop stopColor="#242426" />
          <stop offset="1" stopColor="#161618" />
        </linearGradient>
        <filter id="lane-red-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 1  0 0 0 0 0.15  0 0 0 0 0.15  0 0 0 0.9 0"
            result="coloredBlur"
          />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer rounded squircle tile */}
      <rect x="0" y="0" width="420" height="420" rx="104" fill="url(#lane-tile-gradient)" />
      {/* Subtle top bevel stroke */}
      <rect x="1.5" y="1.5" width="417" height="417" rx="102.5" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />

      {/* Recessed horizontal visor slot */}
      <rect x="62" y="166" width="296" height="88" rx="44" fill="#2c2c2e" />
      <rect x="63" y="167" width="294" height="86" rx="43" stroke="rgba(0,0,0,0.5)" strokeWidth="2" />

      {/* Lane's signature red scanner eye */}
      <circle
        data-eye=""
        cx="210"
        cy="210"
        r="28"
        fill="#ff453a"
        filter="url(#lane-red-glow)"
        className={animated ? "lane-eye-animated lane-eye-glow" : undefined}
        style={{ transformOrigin: "210px 210px" }}
      >
        {animated && (
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0; -92 0; 92 0; -36 0; 54 0; 0 0"
            keyTimes="0; 0.22; 0.48; 0.72; 0.86; 1"
            dur="4.2s"
            repeatCount="indefinite"
          />
        )}
      </circle>
    </svg>
  );
}
