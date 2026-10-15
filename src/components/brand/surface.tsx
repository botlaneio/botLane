"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { LogoVariantId } from "./logo-variants";

/**
 * The kinds of background a section can declare. Declare a surface two ways:
 *  - wrap content in <SurfaceProvider surface="dark"> (known at render time, so
 *    server-rendered logos are right from the first paint), and/or
 *  - put data-surface="dark" on the section element (read in the browser, and
 *    what a sticky logo looks up as it scrolls over sections).
 */
export type Surface = "light" | "dark" | "accent";

export const SURFACES: readonly Surface[] = ["light", "dark", "accent"];

/**
 * Which approved logo goes on which surface. Change a surface's logo here and
 * every auto-selecting logo on the site follows. Each logo is one solid
 * colour that contrasts with its background:
 *  - light:  the #F8F8F6 canvas and white sections → R2 black (graphite tile, white dots)
 *  - dark:   near-black sections like the footer   → R3 orange (red-orange tile)
 *  - accent: red-orange brand sections              → R5 white (light tile)
 */
export const SURFACE_LOGO: Record<Surface, LogoVariantId> = {
  light: "graphite-white",
  dark: "red-tile",
  accent: "light-tile",
};

/** Used when nothing is declared anywhere above the logo. */
export const FALLBACK_SURFACE: Surface = "light";

export function isSurface(value: unknown): value is Surface {
  return value === "light" || value === "dark" || value === "accent";
}

const SurfaceContext = createContext<Surface | null>(null);

export function SurfaceProvider({ surface, children }: { surface: Surface; children: ReactNode }) {
  return <SurfaceContext.Provider value={surface}>{children}</SurfaceContext.Provider>;
}

/** The nearest surface declared with <SurfaceProvider>, or null. */
export function useSurfaceContext(): Surface | null {
  return useContext(SurfaceContext);
}

/**
 * The declared surface at a point on screen, ignoring the logo itself.
 * Walks the element stack under the point: an ancestor of the logo counts only
 * if it declares a surface itself (e.g. a nav bar once it paints a background);
 * the first element that is not an ancestor resolves through its nearest
 * [data-surface] ancestor. No pixel or colour sampling is involved.
 */
export function surfaceAtPoint(self: Element, x: number, y: number): Surface | null {
  if (typeof document === "undefined" || !document.elementsFromPoint) return null;
  for (const el of document.elementsFromPoint(x, y)) {
    if (self.contains(el)) continue;
    if (el.contains(self)) {
      const own = el.getAttribute("data-surface");
      if (isSurface(own)) return own;
      continue;
    }
    const declared = el.closest("[data-surface]")?.getAttribute("data-surface");
    return isSurface(declared) ? declared : null;
  }
  return null;
}

/** The nearest [data-surface] ancestor of an element, including <html>. */
export function surfaceOfAncestors(self: Element): Surface | null {
  const declared = self.parentElement?.closest("[data-surface]")?.getAttribute("data-surface");
  return isSurface(declared) ? declared : null;
}
