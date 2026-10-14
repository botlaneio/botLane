"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Embeds the booking page lazily. If it hasn't loaded after 8 seconds (blocked or slow),
 * it shows a direct link instead so nobody is stuck on a blank box.
 */
export function Scheduler({ url }: { url: string }) {
  const [state, setState] = useState<"waiting" | "loading" | "ready" | "failed">("waiting");
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setState("loading");
        io.disconnect();
      }
    }, { rootMargin: "200px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (state !== "loading") return;
    const t = setTimeout(() => setState((s) => (s === "loading" ? "failed" : s)), 8000);
    return () => clearTimeout(t);
  }, [state]);

  return (
    <div ref={box} className="relative min-h-[680px] overflow-hidden rounded-[24px] bg-white shadow-float">
      {state !== "ready" && state !== "failed" && (
        <div className="absolute inset-0 grid place-items-center text-[15px] text-subtle" aria-live="polite">
          Loading the calendar…
        </div>
      )}
      {state === "failed" && (
        <div className="absolute inset-0 grid place-content-center gap-4 p-8 text-center" role="status">
          <p className="text-muted">The calendar is taking a while to load.</p>
          <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-primary mx-auto">
            Open the booking page
          </a>
        </div>
      )}
      {(state === "loading" || state === "ready") && (
        <iframe
          src={url}
          title="Book a discovery call with BotLane"
          className="relative h-[680px] w-full border-0"
          onLoad={() => setState("ready")}
        />
      )}
    </div>
  );
}
