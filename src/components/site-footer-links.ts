/**
 * Everything the site footer links to, in one place.
 *
 * A link with `href: null` is a planned page that does not exist yet. It renders
 * as muted, non-clickable text with a "Soon" tag (never a dead link); give it its
 * real `href` once the page ships. `proposedHref` records where it should live.
 */

export type FooterLink = {
  label: string;
  href: string | null;
  proposedHref?: string;
  tag?: string;
};

export type FooterColumn = { title: string; links: FooterLink[] };

export const FOOTER_COLUMNS: FooterColumn[] = [
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
      { label: "Contact", href: "/company/contact" },
    ],
  },
  {
    title: "Trust & Docs",
    links: [
      { label: "Trust Center", href: null, proposedHref: "/trust" },
      { label: "12-Gate Release Standard", href: "/trust/release-standard" },
      { label: "Governance & Human Approval", href: null, proposedHref: "/trust/governance" },
      { label: "Provenance", href: null, proposedHref: "/trust/provenance" },
      { label: "Security & Privacy", href: null, proposedHref: "/trust/security" },
      { label: "Documentation", href: null, proposedHref: "/docs" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog / Insights", href: "/blog" },
      { label: "FAQs", href: "/#faq" },
      { label: "Integrations", href: null, proposedHref: "/integrations" },
      { label: "Release Notes", href: null, proposedHref: "/changelog" },
      { label: "System Status", href: null, proposedHref: "/status" },
    ],
  },
];

export const FOOTER_LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Terms of Service", href: "/legal/terms" },
];

/**
 * Official BotLane profiles. Both accounts are pending; while a URL is null the
 * icon shows in a muted, non-clickable state. Paste the real profile URL to activate it.
 */
export const SOCIAL_LINKS: Record<"x" | "instagram", string | null> = {
  x: null, // TODO: add the official BotLane X URL
  instagram: null, // TODO: add the official BotLane Instagram URL
};

/** Company details shown in the footer. Only confirmed facts go here. */
export const COMPANY_INFO = {
  legalName: "BotLane LLC",
  /** Public contact email (confirmed by Solo, 15 Oct 2026). */
  email: "admin@botlane.io" as string | null,
  /** Registered office city/state; links to the contact page (full address isn't shown in the footer). */
  registeredLocality: "Sheridan, Wyoming",
};
