"use client";

import { useEffect, useRef } from "react";
import { frame, N, SHAPES, SOURCES } from "./funnel-story-shapes";

/**
 * Client reporting, told top to bottom. A field of 144 dots travels down the page as
 * the visitor scrolls and reassembles at each step: four source clusters, a funnel, a
 * report, an approval tick, a paper plane. Dots leave in a wave from the centre and
 * swirl between shapes; a gentle ripple keeps them alive while the section is on screen.
 * Scroll position drives the story; nothing advances on its own.
 */

const STEPS = [
  {
    num: "01",
    title: "Your sources",
    text: "Every Monday morning, Lane connects to Google Ads, Meta, GA4 and HubSpot and pulls the last 7 days of performance data.",
  },
  {
    num: "02",
    title: "Blended into one view",
    text: "It calculates blended ROAS, removes conversions counted twice across platforms, and matches closed-won revenue from your CRM.",
  },
  {
    num: "03",
    title: "Written up as a report",
    text: "Lane writes the commentary in your agency's tone: top creatives, campaign wins, budget pacing and recommendations.",
  },
  {
    num: "04",
    title: "You approve it",
    text: "The report waits on your approval desk. Read it, change anything, then click Approve. Nothing is sent before that.",
  },
  {
    num: "05",
    title: "Delivered to your client",
    text: "Once approved, the PDF and interactive link go straight to your client's inbox.",
  },
] as const;

const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);

export function FunnelScrollStory() {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const travellerRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const labelsRef = useRef<SVGGElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    const traveller = travellerRef.current;
    if (!root || !track || !traveller) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let visible = false;
    let lastActive = -1;
    const t0 = performance.now();

    const render = () => {
      raf = 0;
      const trackTop = track.getBoundingClientRect().top;
      const centres = stepRefs.current.map((el) => {
        if (!el) return 0;
        const r = el.getBoundingClientRect();
        return r.top - trackTop + r.height / 2;
      });
      const focus = window.innerHeight * 0.5 - trackTop;
      const y = Math.min(Math.max(focus, centres[0]), centres[centres.length - 1]);

      let seg = 0;
      while (seg < centres.length - 2 && y > centres[seg + 1]) seg++;
      const raw = clamp01((y - centres[seg]) / (centres[seg + 1] - centres[seg] || 1));
      // Hold each shape around its step; morph in the middle of the gap.
      const t = clamp01((raw - 0.15) / 0.7);

      traveller.style.transform = `translate(-50%, calc(${y}px - 50%))`;
      if (fillRef.current) fillRef.current.style.height = `${y}px`;
      if (labelsRef.current) labelsRef.current.style.opacity = seg === 0 ? String(1 - clamp01(t * 3)) : "0";

      const dots = frame(seg, t, (performance.now() - t0) / 1000, still);
      for (let i = 0; i < N; i++) {
        const el = dotRefs.current[i];
        if (!el) continue;
        const d = dots[i];
        el.setAttribute("cx", d.x.toFixed(2));
        el.setAttribute("cy", d.y.toFixed(2));
        el.setAttribute("r", d.r.toFixed(2));
        el.style.fill = d.color;
      }

      const active = raw < 0.5 ? seg : seg + 1;
      if (active !== lastActive) {
        lastActive = active;
        stepRefs.current.forEach((el, i) => el?.toggleAttribute("data-active", i === active));
        if (counterRef.current) counterRef.current.textContent = STEPS[active].num;
      }

      // Keep the ripple running while the story is on screen.
      if (visible && !still) raf = requestAnimationFrame(render);
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) schedule();
    });
    io.observe(root);
    render();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const first = SHAPES[0];

  return (
    <div ref={rootRef} className="relative grid grid-cols-[7rem_1fr] gap-x-5 md:grid-cols-[1fr_1fr] md:gap-x-12">
      {/* Track: the lane the dots travel down, filling red behind them */}
      <div ref={trackRef} className="relative md:order-2" aria-hidden>
        <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-line" />
        <div ref={fillRef} className="absolute top-0 left-1/2 h-0 w-px -translate-x-1/2 bg-lane" />
        <div
          ref={travellerRef}
          className="absolute top-0 left-1/2 size-[7rem] overflow-hidden rounded-[1.25rem] border border-line bg-white shadow-[0_1.25rem_3rem_rgba(20,20,40,0.10)] will-change-transform md:size-[24rem] md:rounded-[2.25rem]"
          style={{
            transform: "translate(-50%, -50%)",
            backgroundImage: "radial-gradient(circle, rgb(20 20 40 / 0.07) 1px, transparent 1.2px)",
            backgroundSize: "0.875rem 0.875rem",
          }}
        >
          <span className="absolute top-3 left-4 hidden font-mono text-[0.6875rem] font-semibold text-lane md:block">
            <span ref={counterRef}>01</span>
            <span className="text-faint"> / 05</span>
          </span>
          <svg viewBox="-120 -120 240 240" className="size-full">
            <g ref={labelsRef} className="hidden font-mono md:block" style={{ fontSize: 8.5 }}>
              {SOURCES.map((s) => (
                <text
                  key={s.name}
                  x={s.at.x}
                  y={s.at.y + (s.at.y < 0 ? -40 : 46)}
                  textAnchor="middle"
                  fill="#6b6b73"
                >
                  {s.name}
                </text>
              ))}
            </g>
            {first.pts.map((p, i) => (
              <circle
                key={i}
                ref={(el) => {
                  dotRefs.current[i] = el;
                }}
                cx={p.x}
                cy={p.y}
                r={first.r[i]}
                style={{ fill: first.colors[i] }}
              />
            ))}
          </svg>
        </div>
      </div>

      {/* Steps: words rise in one after another when a step becomes active */}
      <div className="md:order-1">
        {STEPS.map((step, i) => (
          <div
            key={step.num}
            ref={(el) => {
              stepRefs.current[i] = el;
            }}
            data-active={i === 0 ? "" : undefined}
            className="group flex min-h-[75vh] flex-col justify-center py-10 md:min-h-[90vh]"
          >
            <div className="font-mono text-xs font-semibold text-lane opacity-40 transition-opacity duration-500 group-data-[active]:opacity-100">
              {step.num}
            </div>
            <h3 className="mt-3 text-[clamp(1.5rem,3.2vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-ink">
              {step.title.split(" ").map((word, w) => (
                <span key={w} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <span
                    className="inline-block translate-y-[0.6em] opacity-20 transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[active]:translate-y-0 group-data-[active]:opacity-100 motion-reduce:transition-none"
                    style={{ transitionDelay: `${w * 60}ms` }}
                  >
                    {word}
                    {" "}
                  </span>
                </span>
              ))}
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted opacity-30 transition-opacity duration-700 group-data-[active]:opacity-100 sm:text-base">
              {step.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
