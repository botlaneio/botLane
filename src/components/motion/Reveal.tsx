"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay after trigger (ms), applied as CSS transition-delay. */
  delayMs?: number;
  /** Animate on mount without waiting for scroll. */
  eager?: boolean;
  style?: CSSProperties;
  /** Element tag to render. Default div. */
  as?: "div" | "span" | "section" | "article" | "header" | "footer";
};

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isInViewport(el: Element): boolean {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  const vw = window.innerWidth || document.documentElement.clientWidth;
  // Generous: anything intersecting the viewport (including near edges)
  return (
    rect.bottom > 0 &&
    rect.right > 0 &&
    rect.top < vh &&
    rect.left < vw
  );
}

/** Enable hide-mode only after in-view reveals have been marked --in. */
let enableScheduled = false;
function scheduleEnableRevealMode() {
  if (typeof document === "undefined") return;
  if (document.documentElement.getAttribute("data-reveal") === "1") return;
  if (enableScheduled) return;
  enableScheduled = true;
  // Two frames: let React commit reveal--in classes first, then allow hiding.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.documentElement.setAttribute("data-reveal", "1");
    });
  });
}

/**
 * Soft fade/rise on enter. Respects prefers-reduced-motion.
 *
 * Critical: never set html[data-reveal="1"] until in-viewport (and eager)
 * nodes already have .reveal--in — otherwise the whole page blanks until
 * observers catch up (reported ~20s hang on mobile).
 */
export function Reveal({
  children,
  className = "",
  delayMs = 0,
  eager = false,
  style,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  // Eager starts visible so hero never flashes hidden on hydrate.
  const [visible, setVisible] = useState(eager);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rafId: number | null = null;

    if (prefersReducedMotion() || eager || isInViewport(el)) {
      scheduleEnableRevealMode();
      rafId = requestAnimationFrame(() => {
        setVisible(true);
      });
      return () => {
        if (rafId !== null) cancelAnimationFrame(rafId);
      };
    }

    scheduleEnableRevealMode();

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setVisible(true);
        io.disconnect();
      },
      // Pulling the bottom edge in means an element reveals once it is properly
      // on screen rather than the instant a pixel of it clears the fold. With a
      // zero margin the 480ms rise played out in the bottom sliver, in
      // peripheral vision, and was over before the reader scrolled it anywhere
      // legible — seventeen animations on this page that nobody saw.
      //
      // 12% is deliberately shallow. A deeper margin risks an element that sits
      // at the very bottom of the document never clearing the line, since there
      // is no scroll left to bring it up.
      { rootMargin: "0px 0px -12% 0px", threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delayMs, eager]);

  const mergedStyle: CSSProperties | undefined =
    delayMs > 0 && visible
      ? { ...style, transitionDelay: `${Math.min(delayMs, 200)}ms` }
      : style;

  const Comp = Tag as ElementType;

  return (
    <Comp
      ref={ref}
      className={`reveal${visible ? " reveal--in" : ""}${className ? ` ${className}` : ""}`}
      style={mergedStyle}
    >
      {children}
    </Comp>
  );
}
