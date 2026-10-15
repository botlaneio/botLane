"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, MotionConfig, type Variants } from "motion/react";
import { ArrowRight, Database, ShieldCheck, Zap } from "lucide-react";
import { AgentDashboard } from "@/components/dashboard/agent-dashboard";

const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(5px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.85, ease: EASING } },
};

export function Hero() {
  return (
    <MotionConfig reducedMotion="user">
      {/* Pulled up under the sticky header so the background runs to the top of the page. */}
      <section className="relative -mt-16 overflow-hidden bg-[#f8f8f6] pt-16">
        <HeroBackdrop />

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="relative mx-auto flex max-w-[75rem] flex-col items-center px-6 pt-12 text-center sm:pt-16"
        >
          <motion.div variants={rise} className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
            <span className="flex items-center gap-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-ink-2">
              <span className="size-2 rounded-full bg-[#22a447]" />3 systems active
            </span>
            <span className="hidden h-5 w-px bg-line sm:block" />
            <span className="rounded-full bg-[var(--bl-red-tint)] px-4 py-1.5 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-lane-ink">
              Lane – AI workforce
            </span>
          </motion.div>

          <motion.h1
            variants={rise}
            className="mt-7 text-[clamp(3rem,8.2vw,6.75rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-ink"
          >
            Meet your newest hire<span className="text-lane">.</span>
          </motion.h1>

          <motion.p
            variants={rise}
            className="mt-6 max-w-[50rem] text-lg leading-[1.45] tracking-[-0.015em] text-muted sm:text-[1.375rem]"
          >
            Lane takes your scattered operational work — and turns it into client reporting, lead follow-up, and
            invoice follow-up. <span className="font-medium text-lane">You just approve.</span>
          </motion.p>

          <motion.div variants={rise} className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href="/demo"
              className="group inline-flex h-[3.25rem] min-w-[12.25rem] items-center justify-center gap-2.5 rounded-xl bg-lane px-7 text-base font-medium text-white shadow-[0_0.75rem_1.5rem_-0.75rem_rgba(224,49,43,0.7)] transition hover:bg-lane-strong active:scale-[0.98]"
            >
              Book a demo
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex h-[3.25rem] min-w-[12.25rem] items-center justify-center rounded-xl border border-[#dcdcde] bg-white/80 px-7 text-base font-medium text-ink backdrop-blur transition hover:bg-white active:scale-[0.98]"
            >
              See how it works
            </Link>
          </motion.div>

          <motion.ul
            variants={rise}
            className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-muted"
          >
            <li className="flex items-center gap-2.5">
              <Database className="size-[1.125rem] text-ink-2" strokeWidth={1.5} />
              Zero manual spreadsheets
            </li>
            <li className="hidden h-5 w-px bg-line sm:block" aria-hidden />
            <li className="flex items-center gap-2.5">
              <ShieldCheck className="size-[1.125rem] text-ink-2" strokeWidth={1.5} />
              100% human approval gated
            </li>
            <li className="hidden h-5 w-px bg-line sm:block" aria-hidden />
            <li className="flex items-center gap-2.5">
              <Zap className="size-[1.125rem] text-ink-2" strokeWidth={1.5} />
              Average SLA &lt; 1 second
            </li>
          </motion.ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45, ease: EASING }}
          className="relative mx-auto mt-14 max-w-[86rem] px-6 pb-20 sm:px-10"
        >
          <FitWidth>
            <AgentDashboard />
          </FitWidth>
        </motion.div>
      </section>
    </MotionConfig>
  );
}

/**
 * Lays the dashboard out at its full desktop width and scales it down to fit
 * narrower screens, so tablets and phones see the same picture, smaller.
 */
function FitWidth({ children }: { children: React.ReactNode }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState<{ scale: number; height: number } | null>(null);

  useLayoutEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;
    const measure = () => {
      const scale = Math.min(1, outer.clientWidth / inner.offsetWidth);
      setFit({ scale, height: inner.offsetHeight * scale });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(outer);
    ro.observe(inner);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={outerRef} className="relative w-full" style={{ height: fit ? fit.height : undefined }}>
      <div
        ref={innerRef}
        className="mx-auto w-[82rem] origin-top-left"
        style={{
          transform: fit && fit.scale < 1 ? `scale(${fit.scale})` : undefined,
          visibility: fit ? "visible" : "hidden",
          marginLeft: fit && fit.scale < 1 ? 0 : undefined,
        }}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * Soft white architectural backdrop: a lit back wall, a large sweeping curved
 * wall rising behind the dashboard, and a glossy Lane-red sphere riding a thin
 * orbit line on the right. Pure SVG, so it stays crisp and light.
 */
function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[62rem] sm:h-[66rem]">
      <svg
        className="absolute inset-0 size-full"
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMin slice"
        fill="none"
      >
        <defs>
          <radialGradient id="hero-light" cx="0.28" cy="0.08" r="0.9">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.55" stopColor="#f6f6f4" />
            <stop offset="1" stopColor="#ebebe8" />
          </radialGradient>
          <linearGradient id="hero-pillar" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="hero-wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.35" stopColor="#f3f3f1" />
            <stop offset="1" stopColor="#e4e4e1" />
          </linearGradient>
          <linearGradient id="hero-wall-edge" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.2" />
            <stop offset="0.5" stopColor="#ffffff" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="hero-orbit" x1="700" y1="0" x2="1600" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#e0312b" stopOpacity="0" />
            <stop offset="0.45" stopColor="#e0312b" stopOpacity="0.55" />
            <stop offset="1" stopColor="#e0312b" stopOpacity="0.8" />
          </linearGradient>
          <radialGradient id="hero-sphere" cx="0.36" cy="0.3" r="0.75">
            <stop offset="0" stopColor="#ff9a8c" />
            <stop offset="0.28" stopColor="#f2463a" />
            <stop offset="0.7" stopColor="#d1291f" />
            <stop offset="1" stopColor="#8f1712" />
          </radialGradient>
          <radialGradient id="hero-sphere-shine" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="hero-sphere-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#e0312b" stopOpacity="0.22" />
            <stop offset="1" stopColor="#e0312b" stopOpacity="0" />
          </radialGradient>
          <filter id="hero-soft" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <filter id="hero-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="22" />
          </filter>
        </defs>

        {/* Back wall, lit from the upper left */}
        <rect width="1600" height="1000" fill="url(#hero-light)" />

        {/* Tall soft pillars of light at the edges */}
        <rect x="40" y="0" width="150" height="1000" fill="url(#hero-pillar)" opacity="0.7" filter="url(#hero-soft)" />
        <rect x="1440" y="0" width="120" height="1000" fill="url(#hero-pillar)" opacity="0.6" filter="url(#hero-soft)" />

        {/* Sweeping curved wall: a shadow under it, the wall face, then its lit top edge */}
        <ellipse cx="800" cy="1420" rx="1180" ry="960" fill="#d9d9d5" opacity="0.5" filter="url(#hero-shadow)" />
        <ellipse cx="800" cy="1440" rx="1150" ry="960" fill="url(#hero-wall)" />
        <ellipse cx="800" cy="1440" rx="1150" ry="960" stroke="url(#hero-wall-edge)" strokeWidth="3" />
        <ellipse cx="800" cy="1500" rx="1020" ry="900" fill="#f1f1ef" opacity="0.55" />

        {/* Orbit and the glossy sphere riding it */}
        <ellipse
          cx="1130"
          cy="560"
          rx="520"
          ry="250"
          transform="rotate(18 1130 560)"
          stroke="url(#hero-orbit)"
          strokeWidth="1.6"
        />
        <g>
          <circle cx="1490" cy="408" r="120" fill="url(#hero-sphere-glow)" />
          <ellipse cx="1496" cy="482" rx="48" ry="10" fill="#7a2a24" opacity="0.18" filter="url(#hero-soft)" />
          <circle cx="1490" cy="408" r="52" fill="url(#hero-sphere)" />
          <ellipse cx="1472" cy="388" rx="18" ry="12" fill="url(#hero-sphere-shine)" />
          <circle cx="1490" cy="408" r="52" stroke="#ffffff" strokeOpacity="0.25" strokeWidth="1" />
        </g>
      </svg>

      {/* Fade the backdrop into the page below */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent to-[#f8f8f6]" />
    </div>
  );
}
