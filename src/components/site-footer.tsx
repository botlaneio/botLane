import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Wordmark } from "./wordmark";

const COLUMNS = [
  {
    title: "Systems",
    links: [
      { label: "Overview", href: "/systems" },
      { label: "Client reporting", href: "/systems/client-reporting", tag: "01" },
      { label: "Lead follow-up", href: "/systems/lead-follow-up", tag: "02" },
      { label: "Invoice follow-up", href: "/systems/invoice-follow-up", tag: "03" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "How it works", href: "/how-it-works" },
      { label: "About", href: "/company/about" },
      { label: "Pricing", href: "/pricing" },
      { label: "Partners", href: "/partners", tag: "20%" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-surface/60">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Closing line + demo */}
        <div className="flex flex-col gap-6 border-b border-line py-14 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[clamp(28px,3.6vw,44px)] font-semibold leading-[1.05] tracking-[-0.04em] text-ink">
              Lane prepares.
              <br />
              <span className="text-muted">You approve.</span>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/demo"
              className="group inline-flex h-11 items-center gap-2 rounded-[8px] bg-ink px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-black"
            >
              <span>Book a demo</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex h-11 items-center rounded-[8px] border border-line bg-white px-5 text-sm font-semibold text-ink transition hover:border-ink/20"
            >
              See pricing
            </Link>
          </div>
        </div>

        {/* Links */}
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-6">
            <Link href="/" aria-label="BotLane home" className="text-ink">
              <Wordmark className="text-xl" />
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              An AI coworker for agencies. Lane runs client reporting, lead follow-up and invoice
              follow-up, and nothing goes out without your OK.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title} className="lg:col-span-2">
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-faint">
                {col.title}
              </div>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-sm text-ink-2 transition hover:text-ink"
                    >
                      <span>{link.label}</span>
                      {"tag" in link && link.tag && (
                        <span className="rounded-full bg-white px-1.5 py-px font-mono text-[10px] text-lane ring-1 ring-line group-hover:ring-lane/30">
                          {link.tag}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 border-t border-line py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} BotLane LLC</span>
          <span className="inline-flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-ok" />
            <span>Every send waits for your approval</span>
          </span>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="-mb-[0.22em] text-[clamp(96px,22vw,300px)] font-semibold leading-none tracking-[-0.06em] text-ink/[0.045]">
            botlane
          </div>
        </div>
      </div>
    </footer>
  );
}
