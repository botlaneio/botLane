import Link from "next/link";
import { LaneMarkCycle } from "./lane-mark-cycle";

const NAV = [
  { href: "#client-reporting", label: "Client reporting" },
  { href: "#lead-follow-up", label: "Lead follow-up" },
  { href: "#invoice-follow-up", label: "Invoice follow-up" },
  { href: "#pricing", label: "Pricing" },
];

export function SiteHeader() {
  return (
    <header className="w-full border-b border-line bg-bg">
      <nav
        aria-label="Main"
        className="mx-auto flex h-[68px] max-w-[1200px] items-center justify-between gap-6 px-6"
      >
        <Link href="/" aria-label="BotLane home" className="flex items-center gap-2.5 py-2.5">
          <LaneMarkCycle size={30} />
          <span className="text-lg font-semibold tracking-[-0.03em]">botlane</span>
        </Link>
        <div className="hidden items-center gap-8 font-mono text-xs uppercase tracking-[0.08em] md:flex">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="py-3.5 text-muted hover:text-ink">
              {item.label}
            </Link>
          ))}
        </div>
        <Link
          href="#demo"
          className="rounded-lg bg-ink px-5 py-3 text-sm font-medium text-white hover:bg-black"
        >
          Book a demo
        </Link>
      </nav>
    </header>
  );
}
