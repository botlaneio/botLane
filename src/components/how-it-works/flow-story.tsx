"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { DESKTOP, MOBILE } from "./layout";
import { Cards, Core, Desk, Destinations, FlowPaths, Tools } from "./flow-parts";

/**
 * How BotLane works, demonstrated. A tall section with a sticky stage; scrolling through it
 * seeks one anime.js timeline (see build-timeline.ts) across six scenes:
 * work spread across tools → connected to Lane with scoped access → three drafts prepared →
 * the drafts wait on your approval desk → you approve each one → they are sent and logged.
 * With reduced motion the stage is a single, stable frame and every caption is listed.
 */

const CAPTIONS = [
  {
    title: "Your work is spread across tools",
    text: "Ad spend, new leads and unpaid invoices each live in a different app. Keeping up means checking all of them, every day.",
  },
  {
    title: "Connect once. Access stays scoped.",
    text: "During setup you sign in to each tool on its own screen. Lane reads only what its systems need, such as spend, pipeline stages or invoice status.",
  },
  {
    title: "Lane prepares the work",
    text: "Client reporting, lead follow-up and invoice follow-up each turn that data into a draft: a report, a reply, a reminder.",
  },
  {
    title: "Everything waits for you",
    text: "Every draft lands on your approval desk. Nothing is sent, and nothing changes in your tools, until a person approves it.",
  },
  {
    title: "You approve, one click each",
    text: "Read each draft, change anything you would word differently, then approve it. A draft you don't approve never leaves.",
  },
  {
    title: "Delivered, and on record",
    text: "Approved work goes out from your own accounts, and every item is logged with who approved it and when.",
  },
];

// Phones, and tablets held upright: the tall layout fills a portrait screen far better than the wide one.
const MOBILE_QUERY = "(max-width: 767px), (max-width: 1199px) and (orientation: portrait)";
const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";

function useMedia(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(query);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export function FlowStory() {
  const mobile = useMedia(MOBILE_QUERY);
  const still = useMedia(REDUCE_QUERY);
  const layout = mobile ? MOBILE : DESKTOP;

  const stageRef = useRef<HTMLElement>(null);
  const fitRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Scale the fixed-size canvas to fit the space under the captions.
  useEffect(() => {
    const fit = fitRef.current;
    const canvas = canvasRef.current;
    if (!fit || !canvas) return;
    const resize = () => {
      // The tall layout on a big upright tablet would otherwise blow up past its designed size.
      const s = Math.min(fit.clientWidth / layout.W, fit.clientHeight / layout.H, layout.key === "mobile" ? 1.35 : 1);
      canvas.style.transform = `translate(-50%, -50%) scale(${s})`;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(fit);
    return () => ro.disconnect();
  }, [layout]);

  // Build the timeline; rebuild when the layout or motion preference changes.
  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;
    let revert: (() => void) | undefined;
    let cancelled = false;
    void Promise.all([import("animejs"), import("./build-timeline")]).then(([A, { buildStory, END, MAX_STEP }]) => {
      if (cancelled) return;
      const scope = A.createScope({ root: stage }).add(() => {
        const tl = buildStory(stage, layout, A, still);
        if (still) return;

        // One-time entrance for the scattered tools; scrolling takes over from here.
        A.animate(stage.querySelectorAll("[data-tool] > div"), {
          opacity: [0, 1],
          scale: [0.9, 1],
          duration: 600,
          delay: A.stagger(70, { start: 150 }),
          ease: "outCubic",
        });

        // Scroll position → playhead. The playhead eases toward the target each frame and
        // never seeks more than MAX_STEP at once, so fast scrolling in either direction
        // still passes through, and restores, every state. Nothing runs while idle.
        let current = 0;
        let raf = 0;
        const progress = () => {
          const r = stage.getBoundingClientRect();
          const range = r.height - window.innerHeight;
          return range > 0 ? Math.min(1, Math.max(0, -r.top / range)) : 0;
        };
        const tick = () => {
          raf = 0;
          const target = progress() * END;
          const gap = target - current;
          const next = Math.abs(gap) < 2 ? target : current + gap * 0.16;
          const dir = Math.sign(next - current);
          let t = current;
          while (dir !== 0 && (next - t) * dir > 0) {
            t = dir > 0 ? Math.min(t + MAX_STEP, next) : Math.max(t - MAX_STEP, next);
            tl.seek(t);
          }
          current = next;
          if (current !== target) raf = requestAnimationFrame(tick);
        };
        const wake = () => {
          if (!raf) raf = requestAnimationFrame(tick);
        };
        window.addEventListener("scroll", wake, { passive: true });
        window.addEventListener("resize", wake);
        wake();
        return () => {
          cancelAnimationFrame(raf);
          window.removeEventListener("scroll", wake);
          window.removeEventListener("resize", wake);
        };
      });
      revert = () => scope.revert();
    });
    return () => {
      cancelled = true;
      revert?.();
    };
  }, [layout, still]);

  return (
    <section
      ref={stageRef}
      aria-label="How BotLane works, step by step"
      className={still ? "relative" : mobile ? "relative h-[600svh]" : "relative h-[860svh]"}
    >
      <div
        className={
          still
            ? "mx-auto flex max-w-[75rem] flex-col px-6 py-12"
            : "story-stage sticky top-16 mx-auto flex h-[calc(100svh-4rem)] max-w-[75rem] flex-col px-6 pt-6 pb-4 sm:pt-10"
        }
      >
        {/* Captions: one at a time while scrolling, all listed with reduced motion */}
        <div className="shrink-0">
          <ol className={still ? "grid gap-6 md:grid-cols-2" : "story-captions relative h-[11.5rem] sm:h-[8.5rem] md:h-[7.5rem]"}>
            {CAPTIONS.map((c, i) => (
              <li key={c.title} data-caption className={still ? "" : "absolute inset-x-0 top-0"}>
                <div className="font-mono text-xs font-semibold text-lane">
                  0{i + 1} <span className="text-faint">/ 0{CAPTIONS.length}</span>
                </div>
                <h2 className="mt-1.5 text-[clamp(1.375rem,2.6vw,2rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-ink">
                  {c.title}
                </h2>
                <p className="story-caption-text mt-2 max-w-2xl text-sm leading-relaxed text-muted">{c.text}</p>
              </li>
            ))}
          </ol>
          {!still && (
            <div className="mt-3 grid grid-cols-6 gap-1.5" aria-hidden>
              {CAPTIONS.map((c) => (
                <span key={c.title} className="h-[2px] overflow-hidden rounded-full bg-line">
                  <span data-rail className="block h-full origin-left bg-lane" />
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Canvas */}
        <div
          ref={fitRef}
          className={still ? "relative mt-10 w-full" : "relative mt-4 min-h-0 w-full flex-1 overflow-clip"}
          style={still ? { aspectRatio: `${layout.W} / ${layout.H}` } : undefined}
          aria-hidden
        >
          <div
            ref={canvasRef}
            className="absolute top-1/2 left-1/2"
            style={{ width: layout.W, height: layout.H, transform: "translate(-50%, -50%)", transformOrigin: "50% 50%" }}
          >
            <FlowPaths layout={layout} />
            <Desk layout={layout} />
            <Tools layout={layout} />
            <Core layout={layout} />
            <Cards layout={layout} />
            <Destinations layout={layout} />
          </div>
        </div>
      </div>
    </section>
  );
}
