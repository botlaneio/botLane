import Link from "next/link";
import { LaneMark } from "./lane-mark";

const COLUMNS = [
  {
    title: "Systems",
    links: [
      { href: "/systems/client-reporting", label: "Client reporting" },
      { href: "/systems/lead-follow-up", label: "Lead follow-up" },
      { href: "/systems/invoice-follow-up", label: "Invoice follow-up" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/pricing", label: "Pricing" },
      { href: "/demo", label: "Book a demo" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/legal/privacy", label: "Privacy policy" },
      { href: "/legal/terms", label: "Terms of service" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-6 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5 text-ink">
            <LaneMark size={20} />
            <span className="font-semibold tracking-[-0.03em]">botlane</span>
          </Link>
          <p className="mt-4 max-w-[260px] text-sm leading-relaxed text-muted">
            Lane runs client reporting, lead follow-up and invoice follow-up. You just approve.
          </p>
          <Link href="/partners" scroll={false} className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-ink hover:underline">
            <span className="size-[7px] rounded-full bg-lane" />
            Partner programme
          </Link>
        </div>
        {COLUMNS.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <div className="font-mono text-xs uppercase tracking-[0.08em] text-faint">{c.title}</div>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-muted">
              {c.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="mx-auto flex max-w-[1200px] flex-wrap justify-between gap-3 border-t border-line px-6 py-6 text-[13px] text-faint">
        <span>© BotLane LLC</span>
        <span>Lane prepares. You approve.</span>
      </div>
    </footer>
  );
}
