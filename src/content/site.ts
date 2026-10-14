export const nav = [
  { label: "Home", href: "/" },
  { label: "Solutions", href: "/solutions" },
  { label: "How it works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/pricing" },
] as const;

export const footerLinks = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "How it works", href: "/how-it-works" },
      { label: "Pricing", href: "/pricing" },
      { label: "Safeguards", href: "/safeguards" },
    ],
  },
  {
    title: "Get started",
    links: [
      { label: "Book a discovery call", href: "/book" },
      { label: "Request an assessment", href: "/assessment" },
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
    ],
  },
] as const;

export const siteUrl = "https://botlane.io";
export const tagline = "Managed AI workflows. Under your control.";
