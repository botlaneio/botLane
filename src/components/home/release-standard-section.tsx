"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { EASE_OUT, FadeUp } from "@/components/motion/fade-up";
import { RELEASE_PHASES } from "@/components/trust/release-gates";

/** How a gate is decided. A rule, not a result: no release is shown as passing. */
const DECISION_RULE = [
  { when: "Current evidence for this exact version", then: "Can pass", tone: "ok" },
  { when: "Evidence missing or stale", then: "Blocked", tone: "lane" },
  { when: "Gate doesn't fit the runtime", then: "Needs a reviewed equivalent", tone: "neutral" },
] as const;

const TONE: Record<"ok" | "lane" | "neutral", string> = {
  ok: "border-ok/25 bg-ok/5 text-ok",
  lane: "border-lane/25 bg-lane/5 text-lane",
  neutral: "border-line bg-surface text-ink-2",
};

export function ReleaseStandardSection() {
  const reduce = useReducedMotion();
  return (
    <section className="relative mx-auto max-w-[75rem] border-t border-line px-6 py-20 sm:py-28">
      <FadeUp className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-lane">
            <span className="size-1.5 rounded-full bg-lane-gradient" />
            <span>Release Standard</span>
          </div>
          <h2 className="mt-3 text-[clamp(1.875rem,4vw,3.125rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-ink">
            A working demo isn&apos;t a release.
          </h2>
          <p className="mt-3 text-base text-muted sm:text-lg">
            BotLane&apos;s release standard sets twelve gates across four phases. A gate only passes with
            evidence tied to the exact version being released. Missing evidence never counts as a pass.
          </p>
        </div>

        <Link
          href="/trust/release-standard"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-[0.5rem] border border-line bg-white px-4 py-2.5 text-xs font-semibold text-ink shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition hover:border-lane/40 hover:text-lane"
        >
          <span>Read the release standard</span>
          <ArrowRight size={13} />
        </Link>
      </FadeUp>

      <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {RELEASE_PHASES.map((phase, idx) => (
          <motion.li
            key={phase.name}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{ duration: 0.6, delay: idx * 0.06, ease: EASE_OUT }}
            className="rounded-[1.125rem] border border-line bg-white p-5"
          >
            <div className="font-mono text-[0.625rem] font-semibold uppercase tracking-wider text-lane">
              Phase {phase.numeral}
            </div>
            <h3 className="mt-1 text-lg font-semibold tracking-[-0.02em] text-ink">{phase.name}</h3>
            <p className="mt-1 text-xs leading-relaxed text-muted">{phase.summary}</p>
            <ul className="mt-4 space-y-2 border-t border-line/60 pt-4">
              {phase.gates.map((gate) => (
                <li key={gate.id} className="flex items-baseline gap-2.5 text-sm text-ink-2">
                  <span className="font-mono text-[0.6875rem] text-faint">{gate.number}</span>
                  <span>{gate.title}</span>
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ol>

      {/* The decision rule, shown as an illustration of how gates are judged */}
      <FadeUp className="mt-6 rounded-[1.125rem] border border-line/80 bg-surface/50 p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm font-medium text-ink">How each gate is decided</div>
          <span className="font-mono text-[0.625rem] uppercase tracking-wider text-faint">
            Illustrative, not a release record
          </span>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {DECISION_RULE.map((rule) => (
            <div
              key={rule.when}
              className="flex items-center justify-between gap-3 rounded-[0.75rem] border border-line bg-white px-4 py-3"
            >
              <span className="text-xs text-muted">{rule.when}</span>
              <span
                className={`shrink-0 rounded-full border px-2.5 py-0.5 font-mono text-[0.625rem] font-semibold uppercase tracking-wider ${TONE[rule.tone]}`}
              >
                {rule.then}
              </span>
            </div>
          ))}
        </div>
      </FadeUp>
    </section>
  );
}
