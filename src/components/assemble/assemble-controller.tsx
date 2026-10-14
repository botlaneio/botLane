"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * The tall scroll stage. Renders the server-built scene as children and, once the
 * stage is near the viewport, loads anime.js and wires the timeline to scroll.
 */
export function AssembleController({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    let cleanup: (() => void) | undefined;
    let cancelled = false;

    const start = async () => {
      const [anime, { mountAssemble }] = await Promise.all([import("animejs"), import("./timeline")]);
      if (!cancelled) cleanup = mountAssemble(root, anime);
    };

    // Load the animation code only when the stage is about to be seen.
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          void start();
        }
      },
      { rootMargin: "100% 0px" },
    );
    io.observe(root);

    return () => {
      cancelled = true;
      io.disconnect();
      cleanup?.();
    };
  }, []);

  return (
    <section ref={ref} className="bl-stage" aria-label="How Lane runs your three systems">
      {children}
    </section>
  );
}
