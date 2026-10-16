"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { DESKTOP_H, LANDSCAPE, MOBILE, desktopLayout } from "./layout";
import { Numerals, ReleaseCard, Strip } from "./story-parts";

/**
 * The 12-Gate Release Standard, walked through. A tall section with a sticky stage; scrolling
 * through it seeks one anime.js timeline (see build-timeline.ts) across seven scenes:
 * a working demo meets the twelve gates → Source → Security → Recovery → a gate blocks on
 * missing evidence → Launch → production still waits for two human decisions.
 * The release shown is illustrative. With reduced motion the stage is a single, stable frame
 * and every caption is listed.
 */

const CAPTIONS = [
  {
    title: "A working demo isn't a release",
    text: "This update works in the demo. Before it can reach production, it has to clear twelve gates, in four phases, in order.",
  },
  {
    title: "Source: where it comes from",
    text: "Each gate asks for evidence, not assurances: a verified commit and dependencies, a build that installs the same way every time, a locked-down runtime.",
  },
  {
    title: "Security: what ships, what it sees",
    text: "The artifact is traced to its source and scanned, every setting is validated, and credentials are checked for exposure, without ever being revealed.",
  },
  {
    title: "Recovery: staying up, coming back",
    text: "Health checks must notice when something breaks. Backups are restored, not just taken. And there's a tested way back to the last good version.",
  },
  {
    title: "Missing means blocked",
    text: "The restore drill hasn't been run, so gate 08 blocks the release. Missing evidence never becomes a pass. It waits until the drill exists for this commit.",
  },
  {
    title: "Launch: hardened, accepted, owned",
    text: "Permissions and exposure are reviewed, tests prove no required sign-off can be bypassed, and runbooks name an owner who answers when something breaks.",
  },
  {
    title: "People authorize production",
    text: "Every gate holds evidence, and production still waits. Approving quality and authorizing deployment are two separate decisions, made by people.",
  },
];

// Phones, and tablets held upright: the tall layout fills a portrait screen far better than the wide one.
const MOBILE_QUERY = "(max-width: 767px), (max-width: 1199px) and (orientation: portrait)";
// Phones turned sideways: a wide, short canvas beside a caption column (see globals.css).
const SIDEWAYS_QUERY = "(orientation: landscape) and (max-height: 32rem)";
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

export function ReleaseStory() {
  const mobile = useMedia(MOBILE_QUERY);
  const sideways = useMedia(SIDEWAYS_QUERY);
  const still = useMedia(REDUCE_QUERY);
  // Desktop canvas height, in canvas units, chosen to fill the space under the captions.
  const [desktopH, setDesktopH] = useState(DESKTOP_H.min);
  const desktop = useMemo(() => desktopLayout(desktopH), [desktopH]);
  const layout = sideways ? LANDSCAPE : mobile ? MOBILE : desktop;

  const stageRef = useRef<HTMLElement>(null);
  const fitRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Scale the fixed-size canvas to fit the space under the captions.
  useEffect(() => {
    const fit = fitRef.current;
    const canvas = canvasRef.current;
    if (!fit || !canvas) return;
    const resize = () => {
      if (layout.key === "desktop" && !still) {
        // Fill the height the width leaves free, in steps so small resizes don't rebuild the story.
        const fitW = Math.min(fit.clientWidth / layout.W, 1);
        const want = Math.floor(fit.clientHeight / fitW / DESKTOP_H.step) * DESKTOP_H.step;
        const H = Math.min(DESKTOP_H.max, Math.max(DESKTOP_H.min, want));
        if (H !== layout.H) {
          setDesktopH(H);
          return;
        }
      }
      // The tall layout on a big upright tablet would otherwise blow up past its designed size.
      const s = Math.min(fit.clientWidth / layout.W, fit.clientHeight / layout.H, layout.key === "mobile" ? 1.35 : 1);
      canvas.style.transform = `translate(-50%, -50%) scale(${s})`;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(fit);
    return () => ro.disconnect();
  }, [layout, still]);

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

        // One-time entrance for the release card; scrolling takes over from here.
        A.animate(stage.querySelector("[data-release]")!, {
          opacity: [0, 1],
          translateY: [14, 0],
          duration: 600,
          delay: 150,
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
      aria-label="The 12-Gate Release Standard, step by step"
      className={`release-story relative border-t border-line ${still ? "" : layout.key === "desktop" ? "h-[980svh]" : "h-[760svh]"}`}
    >
      <div
        className={
          still
            ? "mx-auto flex max-w-[75rem] flex-col px-6 py-12"
            : "story-stage sticky top-16 mx-auto flex h-[calc(100svh-4rem)] max-w-[75rem] flex-col px-6 pt-6 pb-4 sm:pt-10"
        }
      >
        {/* Captions: one at a time while scrolling, all listed with reduced motion */}
        <div className="story-caption-col shrink-0">
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
            <div className="mt-3 grid grid-cols-7 gap-1.5" aria-hidden>
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
          className={still ? "relative mt-10 w-full" : "story-canvas relative mt-4 min-h-0 w-full flex-1 overflow-clip"}
          style={still ? { aspectRatio: `${layout.W} / ${layout.H}` } : undefined}
          aria-hidden
        >
          <div
            ref={canvasRef}
            className="absolute top-1/2 left-1/2 overflow-hidden"
            style={{ width: layout.W, height: layout.H, transform: "translate(-50%, -50%)", transformOrigin: "50% 50%" }}
          >
            <Numerals layout={layout} />
            <Strip layout={layout} />
            <ReleaseCard layout={layout} />
          </div>
        </div>
      </div>
    </section>
  );
}
