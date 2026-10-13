"use client";

import { useId } from "react";
import { LAMP_RED } from "@/lib/brand-logo";

/**
 * botLane mark — a lit plate with a channel milled across it and a lamp in the
 * channel.
 *
 * The geometry is the one already shipping as `public/favicon.svg`: a 62-unit
 * rounded square, a 40×14 slot, and a 5-unit dot parked left of centre. That
 * file stays flat on purpose — gradients and blur are wasted at 16px and some
 * renderers handle SVG filters badly — so this component adds the depth and
 * the favicon keeps the same silhouette without it.
 *
 * Depth comes from three things, in order of how much they do:
 *   1. the slot is darkest at its top lip and catches light along the bottom,
 *      so it reads as cut into the plate rather than punched through it;
 *   2. the plate has a top-down gradient and a rim, making it a surface;
 *   3. the dot carries a hotspot and spills light into the channel.
 *
 * The dot keeps Signal Red, and so does the "o" of the wordmark: the two are
 * the brand's lamp, and LAMP_RED (lib/brand-logo.ts) is the one value both
 * read from.
 *
 * Motion is rare by design. The site never renders this above about 24px, so
 * holding it still would have meant it never moved at all; instead the blink
 * and the scan are slow and far apart, and reduced-motion stops both.
 *
 * The artwork lives in MarkArt so the full lockup (BotlaneLogo) can draw the
 * very same mark inside its own SVG.
 */
export type BotlaneMarkProps = {
  /** Rendered size in px. The mark is square. */
  size?: number;
  /** Blink and scan. Default true; reduced-motion overrides it regardless. */
  animate?: boolean;
  className?: string;
};


/**
 * Blink and scan. The `.bll-*` wrappers are hooks for the lockup's entrance
 * (globals.css); they sit around these groups rather than on them, so the
 * entrance never fights the blink or the scan for the same transform.
 */
export const MARK_CSS = `.blm .blm-eye,.blm .blm-dot{transform-box:fill-box;transform-origin:center}
.blm-anim .blm-eye{animation:blm-blink 7.2s ease-in-out 1.4s infinite}
.blm-anim .blm-dot{animation:blm-scan 11s cubic-bezier(.45,0,.55,1) 2.6s infinite}
@keyframes blm-blink{0%,92%,96.5%,100%{transform:scaleY(1)}94.2%{transform:scaleY(.09)}}
@keyframes blm-scan{0%,14%{transform:translateX(0)}46%,54%{transform:translateX(24px)}86%,100%{transform:translateX(0)}}
@media (prefers-reduced-motion:reduce){.blm *{animation:none!important}}`;

/** Gradients and glow, with ids suffixed by `uid` so several marks can share a page. */
export function MarkDefs({ uid }: { uid: string }) {
  return (
    <>
      <linearGradient
        id={`plate${uid}`}
        x1="32"
        y1="1"
        x2="32"
        y2="63"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#FFFFFF" />
        <stop offset="0.55" stopColor="#EFEEE9" />
        <stop offset="1" stopColor="#CFCEC8" />
      </linearGradient>
      <linearGradient
        id={`slot${uid}`}
        x1="32"
        y1="25"
        x2="32"
        y2="39"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#08090A" />
        <stop offset="0.62" stopColor="#15181C" />
        <stop offset="1" stopColor="#2A2F36" />
      </linearGradient>
      <radialGradient id={`lamp${uid}`} cx="0.34" cy="0.3" r="0.72">
        <stop offset="0" stopColor="#FFD8CF" />
        <stop offset="0.42" stopColor={LAMP_RED} />
        <stop offset="1" stopColor="#C9402F" />
      </radialGradient>
      <filter id={`glow${uid}`} x="-160%" y="-160%" width="420%" height="420%">
        <feGaussianBlur stdDeviation="3.1" />
      </filter>
    </>
  );
}

/** The mark itself, drawn in a 64-unit box. */
export function MarkArt({ uid }: { uid: string }) {
  return (
    <g className="bll-in-plate">
      {/* plate */}
      <rect x="1" y="1" width="62" height="62" rx="17" fill={`url(#plate${uid})`} />
      {/* rim: an inner highlight and an outer edge, so it has a thickness */}
      <rect
        x="1.75"
        y="1.75"
        width="60.5"
        height="60.5"
        rx="16.3"
        fill="none"
        stroke="#FFFFFF"
        strokeOpacity="0.85"
        strokeWidth="1.5"
      />
      <rect
        x="1"
        y="1"
        width="62"
        height="62"
        rx="17"
        fill="none"
        stroke="#A9A8A2"
        strokeOpacity="0.55"
        strokeWidth="1"
      />

      {/* the eye: slot, its lit bottom lip, and the lamp inside it */}
      <g className="blm-eye">
        <g className="bll-in-eye">
          <rect x="12" y="25" width="40" height="14" rx="7" fill={`url(#slot${uid})`} />
          <path
            d="M19 38.4h26"
            stroke="#FFFFFF"
            strokeOpacity="0.16"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
          <g className="blm-dot">
            <g className="bll-in-lamp">
              <circle
                cx="21"
                cy="32"
                r="5.4"
                fill={LAMP_RED}
                opacity="0.85"
                filter={`url(#glow${uid})`}
              />
              <circle cx="21" cy="32" r="5" fill={`url(#lamp${uid})`} />
              <circle cx="19.5" cy="30.4" r="1.5" fill="#FFF1EC" opacity="0.75" />
            </g>
          </g>
        </g>
      </g>
    </g>
  );
}

/** Several marks can share a page (nav, footer, auth); keep their ids unique. */
export function useSvgUid() {
  return useId().replace(/[^a-zA-Z0-9]/g, "");
}

export function BotlaneMark({
  size = 24,
  animate = true,
  className,
}: BotlaneMarkProps) {
  const uid = useSvgUid();

  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      role="img"
      aria-label="botLane"
      className={["blm", animate && "blm-anim", className]
        .filter(Boolean)
        .join(" ")}
      style={{ display: "block", flex: "none" }}
    >
      <style>{MARK_CSS}</style>
      <defs>
        <MarkDefs uid={uid} />
      </defs>
      <MarkArt uid={uid} />
    </svg>
  );
}

export default BotlaneMark;
