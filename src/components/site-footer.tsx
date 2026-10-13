import Link from "next/link";
import { LaneMark } from "./lane-mark";

const LINKS = [
  { href: "/#client-reporting", label: "Client reporting" },
  { href: "/#lead-follow-up", label: "Lead follow-up" },
  { href: "/#invoice-follow-up", label: "Invoice follow-up" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-6 py-12 md:flex-row md:items-start md:justify-between">
        <div className="flex items-center gap-2.5 text-ink">
          <LaneMark size={20} />
          <span className="font-semibold tracking-[-0.03em]">botlane</span>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-ink">{l.label}</Link>
          ))}
          <Link href="/partners" scroll={false} className="inline-flex items-center gap-2 font-medium text-ink hover:underline">
            <span className="size-[7px] rounded-full bg-lane" />
            Partner programme
          </Link>
        </nav>
      </div>
      <div className="mx-auto max-w-[1200px] border-t border-line px-6 py-6 text-[13px] text-faint">© BotLane LLC</div>
    </footer>
  );
}
