import Link from "next/link";

export function Hero() {
  return (
    <section className="mx-auto flex max-w-[1200px] flex-col items-center px-6 pt-20 pb-10 text-center">
      <div className="mb-6 flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.12em] text-muted">
        <span className="size-[7px] rounded-full bg-lane" />
        <span>Lane — AI workforce</span>
      </div>
      <h1 className="max-w-[900px] text-[clamp(48px,7.4vw,104px)] leading-[0.96] font-semibold tracking-[-0.05em] text-balance">
        Meet your newest hire.
      </h1>
      <p className="mt-6 max-w-[620px] text-xl leading-[1.45] tracking-[-0.01em] text-muted text-balance">
        Lane takes the scattered pieces of your week and puts them together: client reporting, lead
        follow-up and invoice follow-up. You just approve.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
        <Link
          href="#demo"
          className="flex h-12 items-center rounded-lg bg-lane-strong px-6 text-base font-medium text-white hover:bg-lane-ink"
        >
          Book a demo
        </Link>
        <Link href="#systems" className="flex h-12 items-center px-1 text-base font-medium hover:underline">
          See the three systems →
        </Link>
      </div>
      <div aria-hidden="true" className="mt-10 font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
        Scroll ↓
      </div>
    </section>
  );
}
