// "Human approval" card from mockup frame 04. Decorative illustration.
export function ApprovalCard() {
  return (
    <div className="pc w-full max-w-[400px] p-5 text-[13.5px]" aria-hidden="true">
      <div className="flex items-center justify-between">
        <span className="text-[15px] font-medium">Human approval</span>
        <span className="chip chip-wait">
          <i className="size-1.5 rounded-full bg-terra" /> Pending review
        </span>
      </div>
      <div className="mt-4 rounded-[12px] border border-line p-3.5">
        <p className="font-medium">Draft client report ready</p>
        <p className="text-[12.5px] text-subtle">Generated from Q3 data · 12 pages</p>
        <div className="mt-3 flex items-center gap-3 rounded-[10px] bg-fog px-3 py-2.5">
          <span className="grid h-8 w-7 place-items-center rounded-[4px] border border-line bg-white text-[9px] text-subtle">PDF</span>
          <span className="flex-1">
            <span className="block">Q3_Client_Report.pdf</span>
            <span className="text-[11.5px] text-subtle">Every figure linked to its source</span>
          </span>
          <span className="text-subtle">›</span>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <span className="grid h-9 place-items-center rounded-[8px] bg-ink text-white">Approve</span>
        <span className="grid h-9 place-items-center rounded-[8px] border border-line">Request changes</span>
      </div>
      <p className="mt-3 text-right text-[11px] text-subtle">Example</p>
    </div>
  );
}

const trail = [
  { label: "Data collected", meta: "2 mins ago", state: "done" },
  { label: "Report generated", meta: "1 min ago", state: "done" },
  { label: "Awaiting human review", meta: "Pending", state: "now" },
  { label: "Approved", meta: "–", state: "next" },
  { label: "Sent to client", meta: "–", state: "next" },
] as const;

export function AuditTrail() {
  return (
    <ol className="relative grid gap-5 text-[14px]" aria-label="Example audit trail">
      <span className="absolute top-2 bottom-2 left-[9px] border-l border-dashed border-[#d8b9a6]" aria-hidden="true" />
      {trail.map((t) => (
        <li key={t.label} className="relative grid grid-cols-[20px_1fr] gap-3">
          <span
            aria-hidden="true"
            className={
              t.state === "now"
                ? "mt-0.5 size-5 rounded-full border-2 border-terra bg-white shadow-[0_0_0_5px_rgba(251,225,209,.7)]"
                : "mt-0.5 size-5 rounded-full border border-ink/50 bg-white"
            }
          />
          <span>
            <span className={t.state === "now" ? "font-medium" : undefined}>{t.label}</span>
            <span className="block text-[12.5px] text-subtle">{t.meta}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}
