import { Check, ShieldCheck } from "lucide-react";
import type { SystemDemoConfig } from "./types";

/** Eyebrow, headline and intro. Sits above the interactive card on phones, top-left on desktop. */
export function ContextIntro({ context }: { context: SystemDemoConfig["context"] }) {
  return (
    <div>
      <div className="inline-flex items-center gap-2 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-muted">
        <span aria-hidden className="size-1.5 rounded-full bg-lane" />
        {context.eyebrow}
      </div>
      <h1 className="mt-4 text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.04] tracking-[-0.045em] text-ink">
        {context.headline}
      </h1>
      <p className="mt-4 max-w-[34rem] text-base leading-relaxed text-muted sm:text-[1.0625rem]">{context.intro}</p>
    </div>
  );
}

/** Workflow highlights, reassurance points and the human-control note. Below the card on phones. */
export function ContextDetails({
  context,
  meeting,
}: {
  context: SystemDemoConfig["context"];
  meeting: SystemDemoConfig["meeting"];
}) {
  return (
    <div className="space-y-8">
      <ol className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 lg:gap-0">
        {context.highlights.map((item, i) => {
          const Icon = item.icon;
          return (
            <li
              key={item.title}
              className="flex gap-3.5 rounded-[0.875rem] border border-line bg-white p-4 lg:rounded-none lg:border-0 lg:border-t lg:bg-transparent lg:px-0 lg:py-4"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-[0.625rem] bg-[var(--bl-red-tint)] text-lane">
                <Icon className="size-[1.0625rem]" strokeWidth={1.9} />
              </span>
              <span className="min-w-0">
                <span className="flex items-baseline gap-2">
                  <span className="font-mono text-[0.6875rem] text-faint">0{i + 1}</span>
                  <span className="text-[0.9375rem] font-medium text-ink">{item.title}</span>
                </span>
                <span className="mt-0.5 block text-sm leading-relaxed text-muted">{item.text}</span>
              </span>
            </li>
          );
        })}
      </ol>

      <ul className="flex flex-wrap gap-x-5 gap-y-2.5">
        {context.points.map((point) => (
          <li key={point} className="flex items-center gap-2 text-sm text-ink-2">
            <Check className="size-4 text-[var(--bl-green)]" strokeWidth={2.4} aria-hidden />
            {point}
          </li>
        ))}
      </ul>

      <div className="flex gap-3 rounded-[0.875rem] border border-line bg-white p-4">
        <ShieldCheck className="mt-0.5 size-[1.125rem] shrink-0 text-ink" strokeWidth={1.9} aria-hidden />
        <div>
          <p className="text-sm leading-relaxed text-ink-2">{context.controlNote}</p>
          <p className="mt-2 text-[0.8125rem] text-muted">
            {meeting.minutes}-minute live demo · {meeting.agenda.map((a) => a.text.toLowerCase()).join(" · ")}
          </p>
        </div>
      </div>
    </div>
  );
}
