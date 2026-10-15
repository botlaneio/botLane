"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, CalendarClock, Sparkles } from "lucide-react";
import { EASE_OUT } from "@/components/motion/fade-up";
import { QuestionStep } from "@/modules/qualification/question-step";
import type { Answers } from "@/modules/qualification/types";
import { ContextDetails, ContextIntro } from "./context-panel";
import { FunnelProgress } from "./progress";
import type { SystemDemoConfig } from "./types";

/**
 * The demo funnel shell: context on the left, one interactive card on the right.
 * It composes the qualification questions, the preview and the scheduler for any system.
 *
 * Phase 02 (UI foundation): navigation, progress, transitions and focus handling are real.
 * The preview (Phase 04) and scheduler (Phase 05) are placeholders that never show sample
 * times as real availability.
 */
export function DemoFunnel({ config }: { config: SystemDemoConfig }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-10 xl:gap-x-24">
      <div className="lg:col-start-1 lg:row-start-1">
        <ContextIntro context={config.context} />
      </div>
      <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start">
        <FunnelCard config={config} variant="page" />
      </div>
      <div className="lg:col-start-1 lg:row-start-2">
        <ContextDetails context={config.context} meeting={config.meeting} />
      </div>
    </div>
  );
}

/**
 * The interactive card: progress, the current step and the actions. Shared by the page and the
 * popup. In the popup the body scrolls and the actions stay pinned to the bottom of the panel.
 */
export function FunnelCard({ config, variant }: { config: SystemDemoConfig; variant: "page" | "dialog" }) {
  const dialog = variant === "dialog";
  const steps = [...config.questions.map((q) => q.id), "preview", "schedule"];
  const labels = [...config.questions.map((q) => q.shortLabel), config.labels.preview, config.labels.schedule];

  const [history, setHistory] = useState<number[]>([0]);
  const [answers, setAnswers] = useState<Answers>({});
  const [showError, setShowError] = useState(false);
  const current = history[history.length - 1];
  const stepId = steps[current];
  const question = config.questions.find((q) => q.id === stepId);

  const reduce = useReducedMotion();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const focusOnEnter = useRef(false);

  function goTo(index: number) {
    focusOnEnter.current = true;
    setShowError(false);
    setHistory((h) => [...h, index]);
  }
  function back() {
    if (history.length < 2) return;
    focusOnEnter.current = true;
    setShowError(false);
    setHistory((h) => h.slice(0, -1));
  }
  function next() {
    if (question && !answers[question.id]) {
      setShowError(true);
      return;
    }
    goTo(current + 1);
  }
  const skipToTimes = () => goTo(steps.length - 1);

  return (
    // On the page: no overflow-hidden, so the phone action bar can stick to the screen.
    <section
      aria-label="Book a live demo"
      className={
        dialog
          ? "flex min-h-0 flex-1 flex-col"
          : "rounded-[1.25rem] border border-line bg-white shadow-[0_1.5rem_3rem_-1.5rem_rgba(29,29,31,0.14),0_0.25rem_0.75rem_-0.25rem_rgba(29,29,31,0.05)]"
      }
    >
      <div className={`border-b border-line px-5 sm:px-8 ${dialog ? "pt-1 pb-4 sm:pb-5" : "pt-5 pb-4 sm:pt-7 sm:pb-5"}`}>
        <FunnelProgress labels={labels} current={current} />
      </div>

      <div
        className={
          dialog
            ? "relative min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:min-h-[26rem] sm:px-8 sm:py-7"
            : "relative min-h-[27rem] px-5 py-6 sm:min-h-[29rem] sm:px-8 sm:py-8"
        }
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={stepId}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -4 }}
            transition={{ duration: reduce ? 0.12 : 0.26, ease: EASE_OUT }}
            onAnimationComplete={() => {
              if (focusOnEnter.current) {
                focusOnEnter.current = false;
                headingRef.current?.focus({ preventScroll: true });
              }
            }}
          >
            {question ? (
              <>
                <QuestionStep
                  ref={headingRef}
                  question={question}
                  value={answers[question.id]}
                  onChange={(id) => {
                    setAnswers((a) => ({ ...a, [question.id]: id }));
                    setShowError(false);
                  }}
                />
                {showError && (
                  <p role="alert" className="mt-3 text-sm font-medium text-lane-ink">
                    Choose one option to continue, or skip to available times.
                  </p>
                )}
                <SkipLink label={config.labels.skipToTimes} onClick={skipToTimes} />
              </>
            ) : stepId === "preview" ? (
              <PreviewPlaceholder headingRef={headingRef} onSkip={skipToTimes} skipLabel={config.labels.skipToTimes} />
            ) : (
              <SchedulePlaceholder headingRef={headingRef} meeting={config.meeting} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Actions. On the page they stick to the bottom of the screen on phones; in the popup they're pinned. */}
      <div
        className={`flex items-center justify-between gap-3 border-t border-line px-5 py-3.5 sm:px-8 sm:py-5 ${
          dialog
            ? "shrink-0 bg-white pb-[max(0.875rem,env(safe-area-inset-bottom))]"
            : "sticky bottom-0 rounded-b-[1.25rem] bg-white/95 backdrop-blur-sm sm:static"
        }`}
      >
        <button
          type="button"
          onClick={back}
          disabled={history.length < 2}
          className="inline-flex h-11 items-center gap-1.5 rounded-[0.5rem] px-3 text-sm font-medium text-ink-2 transition-colors duration-150 hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lane disabled:invisible"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Back
        </button>
        {stepId !== "schedule" && (
          <button
            type="button"
            onClick={next}
            className="group inline-flex h-11 min-w-0 items-center gap-2 rounded-[0.5rem] bg-btn px-5 text-sm font-semibold text-white shadow-sm transition-colors duration-150 hover:bg-btn-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lane"
          >
            {stepId === "preview" ? (
              <>
                <span className="truncate sm:hidden">See Lane with your process</span>
                <span className="hidden sm:inline">See Lane work with your reporting process</span>
              </>
            ) : (
              "Continue"
            )}
            <ArrowRight className="size-4 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden />
          </button>
        )}
      </div>
    </section>
  );
}

function SkipLink({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-6 inline-flex items-center gap-1.5 rounded-[0.375rem] text-sm font-medium text-muted underline-offset-4 transition-colors duration-150 hover:text-ink hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lane"
    >
      {label}
      <ArrowRight className="size-3.5" aria-hidden />
    </button>
  );
}

function PreviewPlaceholder({
  headingRef,
  onSkip,
  skipLabel,
}: {
  headingRef: React.Ref<HTMLHeadingElement>;
  onSkip: () => void;
  skipLabel: string;
}) {
  return (
    <div>
      <h2 ref={headingRef} tabIndex={-1} className="text-[1.375rem] font-semibold tracking-[-0.025em] text-ink outline-none sm:text-[1.625rem]">
        Your reporting workflow
      </h2>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">A sample of how Lane could organize reporting for your team.</p>
      <div className="mt-6 flex min-h-[13rem] flex-col items-center justify-center gap-3 rounded-[0.875rem] border border-dashed border-[#d4d4d8] bg-[#fafaf9] p-6 text-center">
        <Sparkles className="size-5 text-lane" aria-hidden />
        <p className="max-w-[22rem] text-sm leading-relaxed text-muted">
          The interactive sample report, shaped by your answers, is built in Phase 04.
        </p>
      </div>
      <SkipLink label={skipLabel} onClick={onSkip} />
    </div>
  );
}

function SchedulePlaceholder({
  headingRef,
  meeting,
}: {
  headingRef: React.Ref<HTMLHeadingElement>;
  meeting: SystemDemoConfig["meeting"];
}) {
  return (
    <div>
      <h2 ref={headingRef} tabIndex={-1} className="text-[1.375rem] font-semibold tracking-[-0.025em] text-ink outline-none sm:text-[1.625rem]">
        Pick a time
      </h2>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
        A {meeting.minutes}-minute live demo with the BotLane team.
      </p>
      <ol className="mt-5 divide-y divide-line rounded-[0.875rem] border border-line">
        {meeting.agenda.map((item) => (
          <li key={item.text} className="flex items-center gap-4 px-4 py-3 text-sm">
            <span className="w-14 shrink-0 font-mono text-[0.75rem] text-muted">{item.minutes} min</span>
            <span className="text-ink-2">{item.text}</span>
          </li>
        ))}
      </ol>
      <div className="mt-5 flex gap-3 rounded-[0.875rem] bg-surface p-4">
        <CalendarClock className="mt-0.5 size-[1.125rem] shrink-0 text-muted" aria-hidden />
        <p className="text-sm leading-relaxed text-muted">
          Live availability from the calendar is connected in Phase 05. Until then no times are shown, so nothing here
          can be mistaken for a real slot.
        </p>
      </div>
    </div>
  );
}
