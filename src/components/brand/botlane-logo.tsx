"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { Wordmark } from "../wordmark";
import { LOGO_VARIANTS, LOGO_VARIANT_IDS, type LogoVariantId } from "./logo-variants";
import {
  FALLBACK_SURFACE,
  SURFACES,
  SURFACE_LOGO,
  isSurface,
  surfaceAtPoint,
  surfaceOfAncestors,
  useSurfaceContext,
  type Surface,
} from "./surface";
import "./botlane-logo.css";

const SIZES = { xs: 16, sm: 22, md: 30, lg: 44, xl: 64 } as const;

export type BotLaneLogoProps = {
  /**
   * "auto" (default) picks the approved logo for the surface behind it.
   * A surface name ("light" | "dark" | "accent") forces that surface's logo.
   * A variant id (e.g. "graphite-red") forces that exact approved logo, for
   * gradients, photos or anything that is not a declared surface.
   */
  variant?: "auto" | Surface | LogoVariantId;
  /** Symbol size: a preset or a number of CSS px at desktop scale (rendered in rem). */
  size?: keyof typeof SIZES | number;
  /** "symbol" (default), "full" (symbol + botLane wordmark) or "wordmark" (text only). */
  mode?: "symbol" | "full" | "wordmark";
  /** true or "intro": gathers in once on mount. "pulse": a slow travelling shimmer that loops. */
  animated?: boolean | "intro" | "pulse";
  /** Seconds before the intro starts. */
  delay?: number;
  /** Pulse speed multiplier (higher is slower). */
  pace?: number;
  /**
   * Follow the surface under the logo while scrolling (for sticky/fixed bars).
   * Without it, "auto" resolves once from where the logo is rendered.
   */
  track?: boolean;
  /** Pin the symbol to exact px instead of rem (for px-scaled scenes like the homepage board). */
  px?: boolean;
  /** Accessible name for the symbol-only mode. Ignored when decorative. */
  title?: string;
  /** Hide from assistive tech (when a parent link or text already names botLane). */
  decorative?: boolean;
  className?: string;
  symbolClassName?: string;
  wordmarkClassName?: string;
};

function variantFor(surface: Surface): LogoVariantId {
  return SURFACE_LOGO[surface];
}

function isVariantId(v: unknown): v is LogoVariantId {
  return (LOGO_VARIANT_IDS as readonly unknown[]).includes(v);
}

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * The one botLane logo. Every placement on the site renders through this
 * component so the approved artwork lives in one place (logo-variants.ts).
 *
 * Selection order for variant="auto":
 *   1. the surface under the logo, when `track` is on
 *   2. the nearest <SurfaceProvider> (known on the server, so SSR is right)
 *   3. the nearest [data-surface] ancestor, up to <html data-surface>
 *   4. FALLBACK_SURFACE
 */
export function BotLaneLogo({
  variant = "auto",
  size = "md",
  mode = "symbol",
  animated = false,
  delay = 0,
  pace = 1,
  track = false,
  px = false,
  title = "botLane",
  decorative = false,
  className,
  symbolClassName,
  wordmarkClassName,
}: BotLaneLogoProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const contextSurface = useSurfaceContext();

  const explicit: LogoVariantId | null = isVariantId(variant)
    ? variant
    : isSurface(variant)
      ? variantFor(variant)
      : null;

  // What the server (and the first client render) can know: explicit or context.
  const initial = explicit ?? variantFor(contextSurface ?? FALLBACK_SURFACE);
  const [domSurface, setDomSurface] = useState<Surface | null>(null);
  const [trackedSurface, setTrackedSurface] = useState<Surface | null>(null);
  const [ready, setReady] = useState(false);

  // One DOM read after mount for logos without a provider: picks up
  // data-surface on a section or on <html>. Runs before paint, so no flash.
  useIsoLayoutEffect(() => {
    if (explicit || contextSurface || !rootRef.current) return;
    setDomSurface(surfaceOfAncestors(rootRef.current));
  }, [explicit, contextSurface]);

  // Sticky logos: re-check the surface under the logo on scroll, resize and
  // whenever a data-surface attribute changes (e.g. the nav gains a background).
  useEffect(() => {
    if (explicit || !track) return;
    const el = rootRef.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      if (!r.width || r.bottom < 0 || r.top > window.innerHeight) return;
      const s = surfaceAtPoint(el, r.left + r.width / 2, r.top + r.height / 2);
      setTrackedSurface((prev) => (prev === s ? prev : s));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const mo = new MutationObserver(schedule);
    mo.observe(document.body, { subtree: true, attributes: true, attributeFilter: ["data-surface"] });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      mo.disconnect();
    };
  }, [explicit, track]);

  // Cross-fades between variants only after the first resolution has painted,
  // so a logo never visibly switches during load.
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const active: LogoVariantId =
    explicit ??
    variantFor(trackedSurface ?? contextSurface ?? domSurface ?? FALLBACK_SURFACE);

  // Which artworks are mounted. A tracking logo keeps every surface's artwork
  // mounted and cross-fades; others mount just the one they show.
  const mounted: LogoVariantId[] =
    track && !explicit ? Array.from(new Set(SURFACES.map(variantFor))) : [active];

  // Only artwork present on the first render plays the intro, so a later
  // switch never replays it.
  const [introSet] = useState<ReadonlySet<LogoVariantId>>(() => new Set(track && !explicit ? mounted : [initial]));

  const motion = animated === "pulse" ? "pulse" : animated ? "intro" : null;
  const sizePx = typeof size === "number" ? size : SIZES[size];
  const dim = px ? `${sizePx}px` : `${sizePx / 16}rem`;

  const symbol =
    mode === "wordmark" ? null : (
      <span
        className={`bl-logo__symbol ${symbolClassName ?? ""}`}
        style={{ width: dim, height: dim }}
        {...(mode === "symbol" && !decorative ? { role: "img", "aria-label": title } : { "aria-hidden": true })}
      >
        {mounted.map((id) => (
          <LogoArtwork
            key={id}
            id={id}
            uid={uid}
            active={id === active}
            intro={motion === "intro" && introSet.has(id)}
          />
        ))}
      </span>
    );

  return (
    <span
      ref={rootRef}
      className={`bl-logo ${motion ? `bl-logo--${motion}` : ""} ${className ?? ""}`}
      data-logo-variant={active}
      data-ready={ready ? "" : undefined}
      style={{ "--bl-delay": `${delay}s`, "--bl-pace": pace } as CSSProperties}
      aria-hidden={decorative ? true : undefined}
    >
      {symbol}
      {mode !== "symbol" && <Wordmark className={wordmarkClassName} />}
    </span>
  );
}

function LogoArtwork({ id, uid, active, intro }: { id: LogoVariantId; uid: string; active: boolean; intro: boolean }) {
  const def = LOGO_VARIANTS[id];
  const gid = `bl-${uid}-${id}`;
  const last = Math.max(1, def.bands - 1);
  return (
    <svg
      className={`bl-logo__svg ${intro ? "bl-logo__svg--intro" : ""}`}
      data-active={active ? "true" : "false"}
      viewBox="22 22 156 156"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {def.tile.kind === "radial" ? (
        <>
          <defs>
            <radialGradient id={gid} cx=".7" cy=".3" r=".9">
              <stop offset="0" stopColor={def.tile.from} />
              <stop offset="1" stopColor={def.tile.to} />
            </radialGradient>
          </defs>
          <rect className="bl-logo__tile" x="22" y="22" width="156" height="156" rx="40" fill={`url(#${gid})`} />
        </>
      ) : (
        <rect
          className="bl-logo__tile"
          x="22"
          y="22"
          width="156"
          height="156"
          rx="40"
          fill={def.tile.fill}
          stroke={def.tile.stroke}
          strokeWidth={def.tile.strokeWidth}
        />
      )}
      <g className="bl-logo__dots">
        {def.paths.map((p, i) => (
          <path key={i} d={p.d} fill={p.fill} style={{ "--b": p.band / last } as CSSProperties} />
        ))}
      </g>
    </svg>
  );
}
