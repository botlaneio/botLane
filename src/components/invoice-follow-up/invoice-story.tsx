"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { DESKTOP, MOBILE, pathsFor, type LoopLayout } from "./layout";
import { InboxPile, Invoice, LoopMarks, Paid, Reminders, StatusChip } from "./loop-parts";

/**
 * Invoice follow-up, demonstrated. A tall section with a sticky stage; scrolling through it
 * seeks one anime.js timeline (see build-timeline.ts) across seven scenes:
 * the buried invoice → Lane watches the ledger → the Loop → the reminder you approve →
 * graduated reminders → payment clears and the Loop stops → the audit note.
 * With reduced motion the stage is a single, stable frame and every caption is listed.
 */

const CAPTIONS = [
  {
    title: "Invoices get lost in busy inboxes",
    text: "Most clients don't hold back payment on purpose. The invoice just sinks under everything else, and nobody on your team wants to send the awkward chase.",
  },
  {
    title: "Lane watches the ledger",
    text: "Lane connects to Stripe, QuickBooks or Xero and your bank feed, and keeps track of every open invoice and how long it has been outstanding.",
  },
  {
    title: "Every invoice gets a loop",
    text: "A graduated plan: a warm courtesy note before the due date, a clear statement after it, and a firm escalation only if it is still open after 14 days.",
  },
  {
    title: "A reminder you approve",
    text: "Lane drafts each reminder in your tone, with the invoice PDF and a 1-click card or ACH payment link. Nothing is sent until you approve it.",
  },
  {
    title: "Graduated, never awkward",
    text: "If the invoice stays open, the next reminder follows on schedule from your billing address. Each one waits for your approval.",
  },
  {
    title: "Paid. The loop stops.",
    text: "The moment the payment clears in Stripe, QuickBooks or your bank feed, the remaining reminders are cancelled. No chasing a client who has already paid.",
  },
  {
    title: "On record",
    text: "An audit note posts to your Slack ledger and the invoice is reconciled, so everyone can see what was sent, what you approved and when it was paid.",
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

function StoryPaths({ layout }: { layout: LoopLayout }) {
  const { ring, stems, paidStem } = pathsFor(layout);
  return (
    <svg
      data-paths
      className="absolute top-0 left-0 overflow-visible"
      width={layout.W}
      height={layout.H}
      viewBox={`0 0 ${layout.W} ${layout.H}`}
      style={{ zIndex: 1 }}
      aria-hidden
    >
      <path data-ring d={ring} fill="none" stroke="#d4d4da" strokeWidth="2" strokeLinecap="round" />
      <path data-progress d={ring} fill="none" stroke="#e0312b" strokeWidth="3" strokeLinecap="round" />
      {layout.stems && (
        <>
          {stems.map((d, i) => (
            <path key={i} data-stem d={d} fill="none" stroke="#d4d4da" strokeWidth="1.4" strokeDasharray="3 4" />
          ))}
          <path data-paid-stem d={paidStem} fill="none" stroke="#059669" strokeWidth="1.6" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

export function InvoiceStory() {
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

        // One-time entrance for the opening invoice; scrolling takes over from here.
        A.animate(stage.querySelector("[data-inv-box]")!, {
          opacity: [0, 1],
          scale: [0.94, 1],
          duration: 700,
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
      aria-label="How Invoice follow-up works"
      className={still ? "relative" : mobile ? "relative h-[720vh]" : "relative h-[1000vh]"}
    >
      <div
        className={
          still
            ? "mx-auto flex max-w-[75rem] flex-col px-6 py-12"
            : "story-stage sticky top-16 mx-auto flex h-[calc(100vh-4rem)] h-[calc(100svh-4rem)] max-w-[75rem] flex-col px-6 pt-6 pb-4 sm:pt-10"
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
          className={still ? "relative mt-10 w-full" : "relative mt-4 min-h-0 w-full flex-1 overflow-clip"}
          style={still ? { aspectRatio: `${layout.W} / ${layout.H}` } : undefined}
          aria-hidden
        >
          <div
            ref={canvasRef}
            className="absolute top-1/2 left-1/2"
            style={{ width: layout.W, height: layout.H, transform: "translate(-50%, -50%)", transformOrigin: "50% 50%" }}
          >
            {/* The camera: pushes in while Lane reads the ledger */}
            <div data-camera className="absolute inset-0" style={{ transformOrigin: `${layout.ring.x}px ${layout.ring.y}px` }}>
              <StoryPaths layout={layout} />
              <LoopMarks layout={layout} />
              <Reminders layout={layout} />
              <Invoice layout={layout} />
              <InboxPile layout={layout} />
              <Paid layout={layout} />
            </div>
            <StatusChip layout={layout} />
          </div>
        </div>
      </div>
    </section>
  );
}
