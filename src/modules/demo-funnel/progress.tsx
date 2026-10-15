/**
 * Step indicator: segment bar with labels. Screen readers get "Step 2 of 4: Challenge" through a
 * polite live region, and the list marks the current step with aria-current.
 */
export function FunnelProgress({ labels, current }: { labels: string[]; current: number }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
          Step {current + 1} of {labels.length}
        </span>
        <span className="text-[0.8125rem] font-medium text-ink">{labels[current]}</span>
      </div>
      <ol className="mt-3 grid gap-1.5" style={{ gridTemplateColumns: `repeat(${labels.length}, minmax(0, 1fr))` }}>
        {labels.map((label, i) => (
          <li key={label} aria-current={i === current ? "step" : undefined}>
            <span className="sr-only">
              {label}
              {i < current ? " (done)" : ""}
            </span>
            <span aria-hidden className="block h-1 overflow-hidden rounded-full bg-[#ebebe8]">
              <span
                className="block h-full origin-left rounded-full bg-ink transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
                style={{ transform: `scaleX(${i <= current ? 1 : 0})`, backgroundColor: i === current ? "var(--bl-red)" : undefined }}
              />
            </span>
          </li>
        ))}
      </ol>
      <p aria-live="polite" className="sr-only">
        Step {current + 1} of {labels.length}: {labels[current]}
      </p>
    </div>
  );
}
