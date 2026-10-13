"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { LaneMarkCycle } from "./lane-mark-cycle";
import { DemoModal } from "./demo-modal";

interface HeroProps {
  onOpenDemo?: () => void;
}

const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

const entranceContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.08,
    },
  },
};

const headlineVariants: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: EASING,
    },
  },
};

const subtextVariants: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: EASING,
    },
  },
};

const actionsVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: EASING,
    },
  },
};

export function HeroClassic({ onOpenDemo }: HeroProps) {
  const [demoOpen, setDemoOpen] = useState(false);

  const handleBookDemo = () => {
    if (onOpenDemo) {
      onOpenDemo();
    } else {
      setDemoOpen(true);
    }
  };

  return (
    <>
      <section className="mx-auto flex max-w-[1200px] flex-col items-center px-6 pt-20 pb-10 text-center">
        <motion.div
          variants={entranceContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
          className="flex flex-col items-center"
        >
          <motion.div
            variants={headlineVariants}
            className="mb-6 flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.12em] text-muted"
          >
            <LaneMarkCycle size={16} />
            <span>Agent Lane · Three operational lanes. Zero congestion.</span>
          </motion.div>
          <motion.h1
            variants={headlineVariants}
            className="max-w-[900px] text-[clamp(48px,7.4vw,104px)] leading-[0.96] font-semibold tracking-[-0.05em] text-balance"
          >
            Meet your newest hire.
          </motion.h1>
          <motion.p
            variants={subtextVariants}
            className="mt-6 max-w-[640px] text-xl leading-[1.45] tracking-[-0.01em] text-muted text-balance"
          >
            Agent Lane takes recurring operational traffic off your plate: client reporting, lead
            follow-up, and invoice follow-up. You just approve.
          </motion.p>
          <motion.div
            variants={actionsVariants}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
          >
            <button
              type="button"
              onClick={handleBookDemo}
              className="flex h-12 cursor-pointer items-center justify-center rounded-[8px] bg-lane-strong px-6 text-base font-medium text-white shadow-sm transition-all hover:bg-lane-ink active:scale-[0.98]"
            >
              Book a demo
            </button>
            <Link href="#systems" className="flex h-12 items-center px-1 text-base font-medium hover:underline">
              See the three systems →
            </Link>
          </motion.div>
          <motion.div
            variants={actionsVariants}
            aria-hidden="true"
            className="mt-10 font-mono text-[11px] uppercase tracking-[0.12em] text-faint"
          >
            Scroll ↓
          </motion.div>
        </motion.div>
      </section>

      {/* Instant Demo Booking Modal */}
      <DemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
