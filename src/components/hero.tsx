"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, MotionConfig, type Variants } from "motion/react";
import { ArrowRight, Plug, ShieldCheck, Wrench } from "lucide-react";
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
              Managed AI operations for agencies
            </span>
          </motion.div>

          <motion.h1
            variants={rise}
            className="mt-7 max-w-[62rem] text-[clamp(2.5rem,5.6vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-ink"
          >
            Your team runs the campaigns. Lane prepares the reporting<span className="text-lane">.</span>
          </motion.h1>

          <motion.p
            variants={rise}
            className="mt-6 max-w-[50rem] text-lg leading-[1.45] tracking-[-0.015em] text-muted sm:text-[1.375rem]"
          >
            BotLane connects your tools, assembles review-ready client deliverables and handles recurring follow-up,
            so your people can focus on client work. <span className="font-medium text-lane">You stay in control.</span>
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
              <Plug className="size-[1.125rem] text-ink-2" strokeWidth={1.5} />
              Works in the tools you use
            </li>
            <li className="hidden h-5 w-px bg-line sm:block" aria-hidden />
            <li className="flex items-center gap-2.5">
              <ShieldCheck className="size-[1.125rem] text-ink-2" strokeWidth={1.5} />
              Every send needs your approval
            </li>
            <li className="hidden h-5 w-px bg-line sm:block" aria-hidden />
            <li className="flex items-center gap-2.5">
              <Wrench className="size-[1.125rem] text-ink-2" strokeWidth={1.5} />
              Set up and run by BotLane
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
