import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Box,
  CalendarCheck,
  Check,
  ChevronDown,
  ChevronRight,
  FileText,
  Minus,
  RotateCcw,
  Settings,
  UserRound,
  Users,
} from "lucide-react";
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
      "Choose one lane: Client reporting, Lead follow-up or Invoice follow-up",
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
      "Client reporting (Lane 01)",
      "Lead follow-up (Lane 02)",
      "Invoice follow-up (Lane 03)",
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
    title: "Client reporting",
    text: "Generate and deliver weekly client reports.",
    href: "/systems/client-reporting",
    icon: <FileText className="size-5" />,
    tone: "bg-lane/10 text-lane",
  },
  {
    title: "Lead follow-up",
    text: "Process and qualify new leads.",
    href: "/systems/lead-follow-up",
    icon: <BarChart3 className="size-5" />,
    tone: "bg-blue-500/10 text-blue-600",
  },
  {
    title: "Invoice follow-up",
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

/** Billing facts, all from the Terms of Service (section 3). */
const BILLING_FACTS = [
  { icon: CalendarCheck, title: "Billed monthly", text: "One retainer, billed in advance each month." },
  { icon: Users, title: "Unlimited seats", text: "Bring your whole team at no extra cost." },
  { icon: RotateCcw, title: "30-day money-back", text: "A full refund of your first month if Lane isn't right for you." },
  { icon: Check, title: "Cancel anytime", text: "Stop at the end of any billing cycle." },
];

type Cell = boolean | string;

const COMPARISON: { label: string; values: [Cell, Cell, Cell] }[] = [
  { label: "Lanes included", values: ["1 of 3", "2 of 3", "All 3"] },
  { label: "Client reporting", values: ["Choose", "Choose", true] },
  { label: "Lead follow-up", values: ["Choose", "Choose", true] },
  { label: "Invoice follow-up", values: ["Choose", "Choose", true] },
  { label: "Integration with your existing tools", values: [true, true, true] },
  { label: "Managed operation & monitoring", values: [true, true, true] },
  { label: "Human approval on every output", values: [true, true, true] },
  { label: "Unlimited team seats", values: [true, true, true] },
  { label: "Support", values: ["Email", "Email", "Priority"] },
];

const STEPS = [
  {
    title: "Pick your lanes",
    text: "Start with the workflow that costs your team the most time. Most agencies begin with client reporting.",
  },
  {
    title: "Connect your tools",
    text: "Authorize your ad accounts, billing software and inbox with standard sign-ins. Nothing to install.",
  },
  {
    title: "Lane learns your style",
    text: "Lane studies your past reports and follow-ups so its drafts sound like your agency.",
  },
  {
    title: "You approve, Lane delivers",
    text: "Lane prepares the work and queues it for review. Nothing goes out until someone on your team approves it.",
  },
];

const PRICING_FAQS = [
  {
    q: "What does \u201cstarting at\u201d mean?",
    a: "The price shown is where each plan starts. Your exact price is confirmed with you before you're billed.",
  },
  {
    q: "How does billing work?",
    a: "BotLane is a monthly retainer, billed in advance. It covers unlimited automated runs and unlimited team seats for your plan.",
  },
  {
    q: "Can I cancel?",
    a: "Yes, at any time. Cancellation takes effect at the end of your current paid billing cycle.",
  },
  {
    q: "What if it isn't working for us?",
    a: "Email us within 30 days of your first payment and we'll refund your first monthly retainer in full.",
  },
  {
    q: "Can I add lanes later?",
    a: "Yes. Many teams start with one lane and move to Two Lanes or Agent Lane once the first is running. Contact us and we'll set it up.",
  },
  {
    q: "Does anything get sent without our approval?",
    a: "No. On every plan, Lane prepares the work and a person on your team approves it before anything reaches a client.",
  },
];

function CompareCell({ value }: { value: Cell }) {
  if (value === true) return <Check className="mx-auto size-[1.125rem] text-lane" strokeWidth={2.5} aria-label="Included" />;
  if (value === false) return <Minus className="mx-auto size-[1.125rem] text-muted" aria-label="Not included" />;
  return <span className="text-[0.8125rem] text-ink-2 sm:text-sm">{value}</span>;
}

export default function PricingPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen">
        <section className="mx-auto max-w-[75rem] px-6 pt-8 sm:pt-16">
          <div className="inline-flex rounded-[0.5rem] bg-surface px-3 py-1.5 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-ink-2">
            Pricing
          </div>
          <h1 className="mt-5 text-[clamp(2.75rem,6vw,5rem)] font-bold leading-[0.95] tracking-[-0.05em] text-ink">
            Simple, transparent pricing.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted sm:text-2xl">
            Three operational lanes. Start with one, or run them all.
          </p>
        </section>

        {/* Tiers */}
        <section className="mx-auto grid max-w-[75rem] gap-5 px-6 pt-10 sm:pt-12 lg:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-[1.375rem] border bg-white p-6 sm:p-8 ${
                tier.featured
                  ? "order-first border-ink/80 lg:order-none shadow-[0_1.875rem_3.75rem_-1.875rem_rgba(20,20,40,0.35)]"
                  : "border-line shadow-[0_0.25rem_1.5rem_rgba(20,20,40,0.04)]"
              }`}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-8 rounded-full bg-lane px-3 py-1 text-[0.6875rem] font-medium text-white">
                  All three lanes
                </span>
              )}
              <h2 className="text-xl font-semibold tracking-[-0.02em] text-ink">{tier.name}</h2>
              <div className="mt-1 text-base text-muted">Starting at</div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-[2.75rem] font-bold sm:text-5xl tracking-[-0.04em] text-ink">{tier.price}</span>
                <span className="text-xl text-muted">/ month</span>
              </div>
              <ul className="mt-6 flex-1 space-y-3 border-t border-line pt-6">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-[0.9375rem] leading-snug text-ink-2">
                    <Check className="mt-0.5 size-[1.125rem] shrink-0 text-lane" strokeWidth={2.5} />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/company/contact"
                className={`group mt-8 flex h-13 items-center justify-center gap-2 rounded-[0.75rem] text-base font-medium transition ${
                  tier.featured
                    ? "bg-btn text-white hover:bg-btn-hover"
                    : "border border-line bg-white text-ink hover:bg-surface"
                }`}
              >
                Contact us
                <ArrowRight className="size-[1.125rem] transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          ))}
        </section>

        {/* Billing facts */}
        <section className="mx-auto max-w-[75rem] px-6 pt-5">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {BILLING_FACTS.map((fact) => {
              const Icon = fact.icon;
              return (
                <li key={fact.title} className="flex items-start gap-3 rounded-[1rem] border border-line bg-white p-4">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-[0.625rem] bg-lane/10 text-lane">
                    <Icon className="size-[1.125rem]" />
                  </span>
                  <span>
                    <span className="block text-[0.9375rem] font-medium text-ink">{fact.title}</span>
                    <span className="mt-0.5 block text-[0.8125rem] leading-snug text-muted">{fact.text}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </section>

        {/* What's included */}
        <section className="mx-auto max-w-[75rem] px-6 pt-5">
          <div className="rounded-[1.375rem] border border-line bg-white p-5 shadow-[0_0.25rem_1.5rem_rgba(20,20,40,0.04)] sm:p-8">
            <h2 className="text-xl font-semibold tracking-[-0.02em] text-ink">What&rsquo;s included</h2>
            <ul className="mt-4 grid gap-x-10 md:grid-cols-2">
              {INCLUDED.map((item) => (
                <li key={item.title} className="border-b border-line last:border-b-0 md:[&:nth-last-child(2)]:border-b-0">
                  <Link href={item.href} className="group flex items-center gap-4 py-3.5 sm:gap-5 sm:py-4">
                    <span className={`flex size-11 shrink-0 items-center justify-center rounded-[0.75rem] sm:size-14 sm:rounded-[0.875rem] ${item.tone}`}>
                      {item.icon}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[0.9375rem] font-medium text-ink sm:text-base">{item.title}</span>
                      <span className="block text-[0.8125rem] leading-snug text-muted sm:text-sm">{item.text}</span>
                    </span>
                    <ChevronRight className="size-5 text-muted transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
        {/* Compare plans */}
        <section className="mx-auto max-w-[75rem] px-6 pt-20 sm:pt-28">
          <h2 className="text-[clamp(1.75rem,3.6vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-ink">
            Compare plans.
          </h2>
          <p className="mt-3 max-w-[36rem] text-base leading-relaxed text-muted sm:text-lg">
            Every plan is fully managed and approval-first. The difference is how many lanes Lane runs for you.
          </p>
          <div className="mt-8 -mx-6 overflow-x-auto px-6">
            <table className="w-full min-w-[34rem] border-separate border-spacing-0 overflow-hidden rounded-[1.375rem] border border-line bg-white text-left">
              <thead>
                <tr>
                  <th scope="col" className="w-[40%] border-b border-line p-4 text-sm font-medium text-muted sm:p-5">
                    <span className="sr-only">Feature</span>
                  </th>
                  {TIERS.map((tier) => (
                    <th
                      key={tier.name}
                      scope="col"
                      className={`border-b border-line p-4 text-center sm:p-5 ${tier.featured ? "bg-surface" : ""}`}
                    >
                      <span className="block text-[0.9375rem] font-semibold text-ink sm:text-base">{tier.name}</span>
                      <span className="mt-0.5 block text-[0.8125rem] font-normal text-muted">from {tier.price}/mo</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={row.label}>
                    <th
                      scope="row"
                      className={`p-4 text-[0.875rem] font-normal text-ink-2 sm:px-5 sm:text-[0.9375rem] ${i < COMPARISON.length - 1 ? "border-b border-line" : ""}`}
                    >
                      {row.label}
                    </th>
                    {row.values.map((value, j) => (
                      <td
                        key={j}
                        className={`p-4 text-center sm:px-5 ${TIERS[j].featured ? "bg-surface" : ""} ${i < COMPARISON.length - 1 ? "border-b border-line" : ""}`}
                      >
                        <CompareCell value={value} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Getting started */}
        <section className="mx-auto max-w-[75rem] px-6 pt-20 sm:pt-28">
          <h2 className="text-[clamp(1.75rem,3.6vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-ink">
            What happens after you sign up.
          </h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <li key={step.title} className="rounded-[1.125rem] border border-line bg-white p-5 sm:p-6">
                <span className="font-mono text-[0.75rem] font-semibold tracking-[0.12em] text-lane">0{i + 1}</span>
                <h3 className="mt-3 text-lg font-semibold tracking-[-0.02em] text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Pricing FAQ */}
        <section className="mx-auto grid max-w-[75rem] gap-8 px-6 pt-20 sm:pt-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
          <div>
            <h2 className="text-[clamp(1.75rem,3.6vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-ink">
              Pricing questions.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted">
              Something else on your mind? Email{" "}
              <a href="mailto:admin@botlane.io" className="text-ink underline underline-offset-4 hover:text-lane">
                admin@botlane.io
              </a>
              .
            </p>
          </div>
          <div className="divide-y divide-line rounded-[1.375rem] border border-line bg-white">
            {PRICING_FAQS.map((faq) => (
              <details key={faq.q} className="group px-5 sm:px-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[0.9375rem] font-medium text-ink sm:py-5 sm:text-base [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <ChevronDown className="size-5 shrink-0 text-muted transition-transform group-open:rotate-180" />
                </summary>
                <p className="pb-5 text-sm leading-relaxed text-muted sm:text-[0.9375rem]">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Closing */}
        <section className="mx-auto max-w-[75rem] px-6 pt-20 pb-24 sm:pt-28">
          <div className="flex flex-col items-start gap-6 rounded-[1.375rem] bg-ink px-6 py-8 sm:px-10 sm:py-12 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-white">
                Not sure which plan fits?
              </h2>
              <p className="mt-2 max-w-[32rem] text-base leading-relaxed text-white/70">
                Tell us where your team loses the most time and we&rsquo;ll recommend where to start.
              </p>
            </div>
            <Link
              href="/company/contact"
              className="group inline-flex h-12 shrink-0 items-center gap-2 rounded-[0.75rem] bg-white px-6 text-base font-medium text-ink transition hover:bg-white/90"
            >
              Contact us
              <ArrowRight className="size-[1.125rem] transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
