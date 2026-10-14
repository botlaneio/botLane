import { Check } from "@/components/site/icons";

// Small cards under each step on /how-it-works (mockup frame 03). Decorative.
export function StepArt({ step }: { step: number }) {
  const rows = (items: [string, string?][]) =>
    items.map(([label, meta]) => (
      <div key={label} className="flex items-center gap-2 border-t border-line py-1.5 first:border-t-0">
        <span className="ic ic-ok">
          <Check size={8} />
        </span>
        <span className="flex-1">{label}</span>
        {meta && <span className="text-[11px] text-subtle">{meta}</span>}
      </div>
    ));
  let body: React.ReactNode;
  switch (step) {
    case 0:
      body = (
        <>
          <p className="mb-2 font-medium">Submit a request</p>
          <div className="flex items-center gap-2 rounded-[8px] border border-line px-2.5 py-2 text-subtle">
            <span className="flex-1">Describe the work you want to automate…</span>
            <span className="grid size-5 place-items-center rounded-full bg-ink text-[10px] text-white">→</span>
          </div>
        </>
      );
      break;
    case 1:
      body = (
        <>
          <p className="mb-1.5 font-medium">Connecting to your tools</p>
          {rows([["Gmail", "Connected"], ["Slack", "Connected"], ["Notion", "Connected"]])}
        </>
      );
      break;
    case 2:
      body = (
        <>
          <p className="mb-1.5 font-medium">Workflow ready for review</p>
          {rows([["Logic and outputs"], ["Data access"], ["Human approval rules"]])}
        </>
      );
      break;
    case 3:
      body = (
        <>
          <p className="flex items-center gap-2 font-medium">
            <span className="ic ic-ok">
              <Check size={8} />
            </span>
            Live
          </p>
          <p className="mt-1 text-subtle">Running in review-only mode first</p>
          <p className="mt-3 border-t border-line pt-2 text-subtle">Monitored by BotLane</p>
        </>
      );
      break;
    default:
      body = (
        <>
          <p className="font-medium">This week</p>
          <svg viewBox="0 0 160 46" className="mt-2 block w-full">
            <path d="M2 34 C 22 30, 30 40, 50 30 S 84 14, 100 22 S 130 10, 158 6" fill="none" stroke="#9a5232" strokeWidth="1.6" />
          </svg>
          <p className="mt-1 text-subtle">Runs reviewed and delivered</p>
        </>
      );
  }
  return (
    <div className="pc text-[12px]" aria-hidden="true">
      {body}
    </div>
  );
}
