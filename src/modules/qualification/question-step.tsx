"use client";

import { forwardRef } from "react";
import { Check } from "lucide-react";
import type { Question } from "./types";

/**
 * One single-select question as a native radio group, so arrow keys, Tab and screen readers
 * behave as people expect. Each option is a large tap target with instant selected feedback.
 */
export const QuestionStep = forwardRef<
  HTMLHeadingElement,
  { question: Question; value: string | undefined; onChange: (optionId: string) => void }
>(function QuestionStep({ question, value, onChange }, headingRef) {
  const hintId = question.hint ? `${question.id}-hint` : undefined;
  return (
    <fieldset aria-describedby={hintId} className="min-w-0">
      <legend className="contents">
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="text-[1.375rem] font-semibold leading-[1.2] tracking-[-0.025em] text-ink outline-none sm:text-[1.625rem]"
        >
          {question.prompt}
        </h2>
      </legend>
      {question.hint && (
        <p id={hintId} className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
          {question.hint}
        </p>
      )}
      <div className="mt-6 grid gap-2.5 sm:gap-3">
        {question.options.map((option) => {
          const checked = value === option.id;
          return (
            <label
              key={option.id}
              className={`group relative flex min-h-[3.5rem] cursor-pointer items-center gap-4 rounded-[0.75rem] border bg-white px-4 py-3.5 transition-[border-color,box-shadow,background-color] duration-150 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-lane sm:px-5 ${
                checked
                  ? "border-ink shadow-[0_0_0_1px_var(--bl-ink)]"
                  : "border-line hover:border-[#d4d4d8] hover:bg-[#fcfcfb]"
              }`}
            >
              <input
                type="radio"
                name={question.id}
                value={option.id}
                checked={checked}
                onChange={() => onChange(option.id)}
                className="sr-only"
              />
              <span className="min-w-0 flex-1">
                <span className="block text-[0.9375rem] font-medium leading-snug text-ink sm:text-base">{option.label}</span>
                {option.detail && (
                  <span className="mt-0.5 block text-[0.8125rem] leading-snug text-muted">{option.detail}</span>
                )}
              </span>
              <span
                aria-hidden
                className={`flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors duration-150 ${
                  checked ? "border-lane bg-lane text-white" : "border-[#d4d4d8] bg-white text-transparent"
                }`}
              >
                <Check className="size-3" strokeWidth={3} />
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
});
