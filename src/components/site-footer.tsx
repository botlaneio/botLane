import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { BotLaneLogo } from "./brand/botlane-logo";
import { SurfaceProvider } from "./brand/surface";
import {
  COMPANY_INFO,
  FOOTER_COLUMNS,
  FOOTER_LEGAL_LINKS,
  SOCIAL_LINKS,
  type FooterLink,
} from "./site-footer-links";

const HEADING = "font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-white/40";

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-[1.0625rem]">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} aria-hidden className="size-[1.1875rem]">
      <rect x="2.75" y="2.75" width="18.5" height="18.5" rx="5.25" />
      <circle cx="12" cy="12" r="4.25" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const SOCIALS: { key: keyof typeof SOCIAL_LINKS; name: string; icon: ReactNode }[] = [
  { key: "x", name: "X", icon: <XIcon /> },
  { key: "instagram", name: "Instagram", icon: <InstagramIcon /> },
];

function FooterNavLink({ link }: { link: FooterLink }) {
  if (!link.href) {
    // Planned page: shown so the structure is visible, but never a dead link.
    return (
      <span className="inline-flex items-center gap-2 text-sm text-white/35">
        <span>{link.label}</span>
        <span className="rounded-full px-1.5 py-px font-mono text-[0.625rem] text-white/40 ring-1 ring-white/15">Soon</span>
      </span>
    );
  }
  return (
    <Link href={link.href} className="group inline-flex items-center gap-2 text-sm text-white/75 transition hover:text-white">
      <span>{link.label}</span>
      {link.tag && (
        <span className="rounded-full bg-lane/15 px-1.5 py-px font-mono text-[0.625rem] text-lane ring-1 ring-lane/30 group-hover:ring-lane/60">
          <span className="text-lane-gradient">{link.tag}</span>
        </span>
      )}
    </Link>
  );
}

export function SiteFooter() {
  return (
    <footer
      data-surface="dark"
      className="relative overflow-hidden bg-[#000000] text-white"
      style={{ "--bl-gradient": "var(--bl-gradient-on-dark)" } as CSSProperties}
    >
      <SurfaceProvider surface="dark">
      <div className="mx-auto max-w-[75rem] px-6">
        {/* Closing line + demo */}
        <div className="flex flex-col gap-6 border-b border-white/10 py-14 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-[36rem]">
            <p className="text-[clamp(1.75rem,3.6vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-white">
              More clients shouldn&apos;t mean <span className="text-lane-gradient">more admin.</span>
            </p>
            <p className="mt-4 text-base leading-relaxed text-white/60">
              Put reporting, follow-ups, and collections in Lane&apos;s hands. Keep every final decision in yours.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/demo"
              className="group inline-flex h-11 items-center gap-2 rounded-[0.5rem] bg-lane-gradient px-5 text-sm font-semibold text-white shadow-sm transition hover:brightness-90"
            >
              <span>Book a demo</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex h-11 items-center rounded-[0.5rem] border border-white/15 bg-white/5 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              See pricing
            </Link>
          </div>
        </div>

        {/* Brand + link columns: stacked on phones, 2-up on tablets, five columns from xl */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-14 lg:grid-cols-4 xl:grid-cols-[minmax(0,1.55fr)_repeat(4,minmax(0,1fr))] xl:gap-x-10">
          <div className="col-span-2 lg:col-span-4 xl:col-span-1 xl:pr-6">
            <Link href="/" aria-label="BotLane home" className="inline-flex text-white">
              <BotLaneLogo variant="ember-glow" bare tint="#ffffff" animated="breathe" size={96} decorative />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              An AI coworker for agencies. Lane runs client reporting, lead follow-up and invoice
              follow-up, and nothing goes out without your OK.
            </p>

            <div className="mt-8 grid max-w-sm grid-cols-2 gap-6">
              <div>
                <div className={HEADING}>Contact</div>
                <ul className="mt-3 space-y-2 text-sm">
                  {COMPANY_INFO.email && (
                    <li>
                      <a href={`mailto:${COMPANY_INFO.email}`} className="text-white/75 transition hover:text-white">
                        {COMPANY_INFO.email}
                      </a>
                    </li>
                  )}
                  <li>
                    <Link href="/company/contact" className="group inline-flex items-center gap-1.5 text-white/75 transition hover:text-white">
                      <span>Contact us</span>
                      <ArrowRight size={12} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <div className={HEADING}>Registered office</div>
                <address className="mt-3 text-sm not-italic leading-relaxed text-white/60">
                  {COMPANY_INFO.legalName}
                  <Link href="/company/contact" className="block text-white/75 transition hover:text-white">
                    {COMPANY_INFO.registeredLocality}
                  </Link>
                </address>
              </div>
            </div>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <div className={HEADING}>{col.title}</div>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <FooterNavLink link={link} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-5 text-xs text-white/50 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-6">
          <span>© {new Date().getFullYear()} BotLane LLC</span>

          <nav aria-label="Legal" className="flex items-center gap-5">
            {FOOTER_LEGAL_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-white">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 lg:justify-end">
            <ul className="-ml-3 flex items-center lg:ml-0">
              {SOCIALS.map(({ key, name, icon }) => {
                const url = SOCIAL_LINKS[key];
                return (
                  <li key={key}>
                    {url ? (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`BotLane on ${name}`}
                        className="flex size-11 items-center justify-center rounded-[0.5rem] text-white/60 transition hover:text-white"
                      >
                        {icon}
                      </a>
                    ) : (
                      // No official profile yet: same icon, muted and not clickable.
                      <span
                        role="img"
                        aria-label={`BotLane on ${name} (coming soon)`}
                        title={`${name}: coming soon`}
                        className="flex size-11 items-center justify-center text-white/30"
                      >
                        {icon}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
            <span className="inline-flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-ok" />
              <span>Every send waits for your approval</span>
            </span>
          </div>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <div className="mx-auto max-w-[75rem] px-6">
          <div className="-mb-[0.22em] text-[clamp(6rem,22vw,18.75rem)] font-semibold leading-none tracking-[-0.06em] text-white/[0.05]">
            botlane
          </div>
        </div>
      </div>
      </SurfaceProvider>
    </footer>
  );
}
