"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/** Rises into place once, the first time it is properly on screen. Never replays. */
export function FadeUp({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
