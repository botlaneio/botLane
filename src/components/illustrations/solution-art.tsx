import { Check } from "@/components/site/icons";

// Small product snippets for each solution (mockup frame 02). Decorative: hidden from screen readers.

function Row({ label, meta, dot }: { label: string; meta?: React.ReactNode; dot?: "ok" | "terra" | "line" }) {
  return (
    <div className="flex items-center gap-2.5 border-t border-line py-2 first:border-t-0">
      <span
        className={
          dot === "ok"
            ? "ic ic-ok"
            : dot === "terra"
              ? "ic ic-terra"
              : "grid size-5 flex-none place-items-center rounded-full bg-mist"
        }
      >
        {dot === "ok" ? <Check size={9} /> : <i className="block size-1.5 rounded-full bg-current opacity-60" />}
      </span>
      <span className="min-w-0 flex-1 truncate">{label}</span>
      {meta && <span className="text-[11.5px] text-subtle">{meta}</span>}
    </div>
  );
}

function Bars() {
  const h = [30, 44, 40, 60, 74, 94];
  return (
    <svg viewBox="0 0 200 110" className="block w-full">
      {h.map((v, i) => (
        <rect key={i} x={8 + i * 32} y={100 - v} width="18" height={v} rx="3" fill={i % 2 ? "#e6cbb8" : "#f3e6dd"} />
      ))}
      <path d="M10 76 C 40 64, 60 82, 90 66 S 140 40, 192 14" fill="none" stroke="#9a5232" strokeWidth="1.8" />
    </svg>
  );
}

export function SolutionArt({ slug, className = "" }: { slug: string; className?: string }) {
  let body: React.ReactNode = null;
  switch (slug) {
    case "lead-follow-up":
      body = (
        <>
          <Row label="New lead from website" meta="2m" dot="terra" />
          <Row label="Reply drafted, waiting for you" meta="5m" dot="terra" />
          <Row label="Replied to email" meta="12m" dot="ok" />
          <Row label="Meeting booked" meta="1h" dot="ok" />
        </>
      );
      break;
    case "client-reporting":
      body = (
        <>
          <div className="mb-1 flex justify-between text-[11.5px] text-subtle">
            <span>Reports delivered</span>
            <span>Jan to Jun</span>
          </div>
          <Bars />
        </>
      );
      break;
    case "support-triage":
      body = (
        <>
          <Row label="New support ticket" meta="4m" dot="terra" />
          <Row label="Categorised as Billing" meta="5m" />
          <Row label="Draft reply ready" meta="6m" dot="ok" />
        </>
      );
      break;
    case "invoice-follow-up":
      body = (
        <>
          <Row label="Invoice #1042" meta={<span className="chip chip-red">Overdue</span>} />
          <Row label="Invoice #1041" meta={<span className="chip chip-wait">Reminder sent</span>} />
          <Row label="Invoice #1040" meta={<span className="chip chip-ok">Paid</span>} />
        </>
      );
      break;
    case "operations-intake":
      body = (
        <>
          <Row label="New request" meta="10m" />
          <Row label="Details completed" meta="12m" dot="terra" />
          <Row label="Assigned to team" meta="18m" dot="ok" />
        </>
      );
      break;
  }
  return (
    <div className={`pc text-[12.5px] ${className}`} aria-hidden="true">
      {body}
      <div className="mt-1.5 text-right text-[11px] text-subtle">Example</div>
    </div>
  );
}
