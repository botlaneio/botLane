import type { SVGProps } from "react";
import {
  LAMP_RED,
  WORDMARK_GLYPHS,
  WORDMARK_W,
  WORDMARK_X,
} from "@/lib/brand-logo";

/**
 * The 'botLane' wordmark on its own, as outlines so no webfont has to load
 * before the logo is right. The outlines and their history live in
 * lib/brand-logo.ts; the full lockup with the mark is BotlaneLogo.
 *
 * The "o" is lit in the lamp's red, matching the dot in the mark. Every other
 * letter takes `currentColor`.
 *
 * Glyphs sit between y=15 and y=87, which is why rendering this at the mark's
 * pixel size gives the same optical weight as the lockup.
 */
export function BotlaneWordmark({
  size = 24,
  ...props
}: { size?: number } & Omit<SVGProps<SVGSVGElement>, "width" | "height">) {
  return (
    <svg
      viewBox={`${WORDMARK_X} 0 ${WORDMARK_W} 100`}
      height={size}
      width={(size * WORDMARK_W) / 100}
      fill="currentColor"
      role="img"
      aria-label="botLane"
      style={{ display: "block", flex: "none" }}
      {...props}
    >
      {WORDMARK_GLYPHS.map((glyph, i) => (
        <path
          key={`${glyph.char}-${i}`}
          d={glyph.d}
          transform={glyph.dx ? `translate(${glyph.dx} 0)` : undefined}
          fill={glyph.lamp ? LAMP_RED : undefined}
        />
      ))}
    </svg>
  );
}
