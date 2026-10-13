import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BarChart3, Box, Check, ChevronRight, FileText, Settings, UserRound } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { GoogleDriveLogo } from "@/components/assemble/company-icons";

export const metadata: Metadata = {
  title: "Pricing | BotLane",
  description: "Simple, transparent pricing. Start with one operational lane or run all three.",
};

const TIERS = [
  {
    name: "One Lane",
    price: "$600",
    features: [
      "Choose one lane: Client Reporting, Lead Intake or AR Recovery",
      "Integration with your existing tools",
      "Managed operation & monitoring",
      "Human approval on every output",
      "Email support",
    ],
    featured: false,
  },
  {
    name: "Two Lanes",
    price: "$1,100",
    features: [
      "Choose any two lanes",
      "Integration with your existing tools",
      "Managed operation & monitoring",
      "Human approval on every output",
      "Email support",
    ],
    featured: false,
  },
  {
    name: "Agent Lane",
    price: "$1,500",
    features: [
      "Client Reporting (Lane 01)",
      "Lead Intake (Lane 02)",
      "AR Recovery (Lane 03)",
      "Integration with your existing tools",
      "Managed operation & monitoring",
      "Human approval on every output",
      "Priority support",
    ],
    featured: true,
  },
];

const INCLUDED = [
  {
    title: "Client Reporting",
    text: "Generate and deliver weekly client reports.",
    href: "/systems/client-reporting",
    icon: <FileText className="size-5" />,
    tone: "bg-lane/10 text-lane",
  },
  {
    title: "Lead Intake",
    text: "Process and qualify new leads.",
    href: "/systems/lead-follow-up",
    icon: <BarChart3 className="size-5" />,
    tone: "bg-blue-500/10 text-blue-600",
  },
  {
    title: "AR Recovery",
    text: "Draft and send follow-ups for outstanding invoices.",
    href: "/systems/invoice-follow-up",
    icon: <Box className="size-5" />,
    tone: "bg-emerald-500/10 text-emerald-600",
  },
  {
    title: "Tool integrations",
    text: "Connect with Google Workspace, CRM, inbox, drive, and more.",
    href: "/how-it-works",
    icon: <GoogleDriveLogo size={22} />,
    tone: "border border-line bg-white",
  },
  {
    title: "Managed by BotLane",
    text: "We run, monitor, and continuously improve the systems for you.",
    href: "/company/about",
    icon: <Settings className="size-5" />,
    tone: "bg-orange-500/10 text-orange-500",
  },
  {
    title: "Human approval",
    text: "You approve the work. Always.",
    href: "/how-it-works",
    icon: <UserRound className="size-5" />,
    tone: "bg-lane/10 text-lane",
  },
];

export default function PricingPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen">
        <section className="mx-auto max-w-[1200px] px-6 pt-8 sm:pt-16">
          <div className="inline-flex rounded-[8px] bg-surface px-3 py-1.5 font-mono text-[12px] uppercase tracking-[0.14em] text-ink-2">
            Pricing
          </div>
          <h1 className="mt-5 text-[clamp(44px,6vw,80px)] font-bold leading-[0.95] tracking-[-0.05em] text-ink">
            Simple, transparent pricing.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted sm:text-2xl">
            Three operational lanes. Start with one, or run them all.
          </p>
        </section>

        {/* Tiers */}
        <section className="mx-auto grid max-w-[1200px] gap-5 px-6 pt-10 sm:pt-12 lg:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-[22px] border bg-white p-6 sm:p-8 ${
                tier.featured
                  ? "order-first border-ink/80 lg:order-none shadow-[0_30px_60px_-30px_rgba(20,20,40,0.35)]"
                  : "border-line shadow-[0_4px_24px_rgba(20,20,40,0.04)]"
              }`}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-8 rounded-full bg-lane px-3 py-1 text-[11px] font-medium text-white">
                  All three lanes
                </span>
              )}
              <h2 className="text-xl font-semibold tracking-[-0.02em] text-ink">{tier.name}</h2>
              <div className="mt-1 text-base text-muted">Starting at</div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-[44px] font-bold sm:text-5xl tracking-[-0.04em] text-ink">{tier.price}</span>
                <span className="text-xl text-muted">/ month</span>
              </div>
              <ul className="mt-6 flex-1 space-y-3 border-t border-line pt-6">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-[15px] leading-snug text-ink-2">
                    <Check className="mt-0.5 size-[18px] shrink-0 text-lane" strokeWidth={2.5} />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/company/contact"
                className={`group mt-8 flex h-13 items-center justify-center gap-2 rounded-[12px] text-base font-medium transition ${
                  tier.featured
                    ? "bg-ink text-white hover:bg-black"
                    : "border border-line bg-white text-ink hover:bg-surface"
                }`}
              >
                Contact us
                <ArrowRight className="size-[18px] transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          ))}
        </section>

        {/* What's included */}
        <section className="mx-auto max-w-[1200px] px-6 pt-5 pb-24">
          <div className="rounded-[22px] border border-line bg-white p-5 shadow-[0_4px_24px_rgba(20,20,40,0.04)] sm:p-8">
            <h2 className="text-xl font-semibold tracking-[-0.02em] text-ink">What&rsquo;s included</h2>
            <ul className="mt-4 grid gap-x-10 md:grid-cols-2">
              {INCLUDED.map((item) => (
                <li key={item.title} className="border-b border-line last:border-b-0 md:[&:nth-last-child(2)]:border-b-0">
                  <Link href={item.href} className="group flex items-center gap-4 py-3.5 sm:gap-5 sm:py-4">
                    <span className={`flex size-11 shrink-0 items-center justify-center rounded-[12px] sm:size-14 sm:rounded-[14px] ${item.tone}`}>
                      {item.icon}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15px] font-medium text-ink sm:text-base">{item.title}</span>
                      <span className="block text-[13px] leading-snug text-muted sm:text-sm">{item.text}</span>
                    </span>
                    <ChevronRight className="size-5 text-muted transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
