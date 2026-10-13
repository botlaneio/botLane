"use client";

import {
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";

/**
 * Adds `in-view` once, when the element has properly entered the viewport.
 *
 * Unlike Reveal this changes nothing visually on its own — it only flags that
 * the element has been seen, so a sequence can be gated on someone actually
 * looking at it. Reveal could not do this job here: both hero Reveals are
 * eager, firing on mount so the hero never flashes hidden, which is the right
 * call for the hero and useless as a trigger.
 *
 * Without this the console's run sequence started on page load and was over
 * after 7.6 seconds. The panel sits about 925px down the page, so on a 900px
 * laptop, a 768px laptop, or any phone it is below the fold — and a reader who
 * took more than seven seconds to scroll to it arrived to a finished run.
 */
export function InView({
  className,
  children,
  rootMargin = "0px 0px -15% 0px",
  ...rest
}: {
  className?: string;
  children: ReactNode;
  rootMargin?: string;
} & Omit<ComponentPropsWithoutRef<"div">, "className" | "children">) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // No observer, no gate: play rather than never play. Deferred a frame,
    // the way Reveal does it, rather than setting state inside the effect.
    if (typeof IntersectionObserver === "undefined") {
      const raf = requestAnimationFrame(() => setSeen(true));
      return () => cancelAnimationFrame(raf);
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setSeen(true);
        io.disconnect();
      },
      { rootMargin, threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <div
      ref={ref}
      className={`${className ?? ""}${seen ? " in-view" : ""}`}
      {...rest}
    >
      {children}
    </div>
  );
}
