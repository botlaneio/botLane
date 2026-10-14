"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Sections marked .rv ease in once as they scroll into view. Nothing moves under reduced motion,
// and without JS everything is simply visible.
export function Reveal() {
  const pathname = usePathname();
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -10% 0px" },
    );
    document.querySelectorAll(".rv:not(.in)").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight) return; // already on screen: leave it alone
      el.classList.add("pre");
      io.observe(el);
    });
    return () => io.disconnect();
  }, [pathname]);
  return null;
}
