import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CircleAlert,
  LockKeyhole,
  MonitorCog,
  Plug,
  ShieldCheck,
  UserRound,
  Wrench,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BlogArt } from "@/components/blog/blog-art";
import { COMPANY_INFO } from "@/components/site-footer-links";

export const metadata: Metadata = {
  title: "About | BotLane",
  description:
    "BotLane builds private, managed AI systems that handle real work inside your tools, under your control.",
};

const PILLARS = [
  {
    icon: LockKeyhole,
    title: "Private by design",
    text: "Your data stays in your environment. No training on your data.",
  },
  {
    icon: MonitorCog,
    title: "Managed in operation",
    text: "We run, monitor, and improve the systems for you.",
  },
  {
    icon: UserRound,
    title: "Human control",
    text: "You approve the work. Always.",
  },
];

const WORKLOAD = [
  { label: "Client reporting", text: "Pulling numbers from every ad account, building the deck, writing the summary." },
  { label: "Lead follow-up", text: "Answering new enquiries fast enough to win them, while the team is busy delivering." },
  { label: "Invoice follow-up", text: "Noticing what's overdue and chasing it politely, without straining the relationship." },
];

const AUDIENCE = [
  "Performance-marketing and paid-media agencies",
  "Full-service digital agencies",
  "B2B lead-generation agencies",
  "SEO and content agencies",
];

const BELIEFS = [
  {
    icon: UserRound,
    title: "Lane prepares. People decide.",
    text: "Every report, reply and reminder waits for a person on your team to approve it. There is no autopilot mode.",
  },
  {
    icon: Plug,
    title: "Work inside your tools",
    text: "Lane connects to the ad platforms, inbox and billing software you already use. No new system for your team to learn.",
  },
  {
    icon: CircleAlert,
    title: "Flag it, don't guess",
    text: "When data is missing or looks wrong, Lane points it out in the draft instead of filling the gap with a plausible number.",
  },
  {
    icon: Wrench,
    title: "Managed, not DIY",
    text: "We set up, run and monitor the systems for you. You don't need to hire anyone to build or babysit automations.",
  },
  {
    icon: ShieldCheck,
    title: "Evidence before release",
    text: "Changes to our systems follow a written release standard, with a person signing off before anything reaches production.",
    href: "/trust/release-standard",
    linkLabel: "Read the 12-Gate Release Standard",
  },
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="mx-auto grid max-w-[75rem] gap-6 px-6 pt-8 sm:gap-10 sm:pt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,27.5rem)] lg:items-end lg:gap-20">
          <div>
            <div className="inline-flex rounded-[0.5rem] bg-surface px-3 py-1.5 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-ink-2">
              About us
            </div>
            <h1 className="mt-5 text-[clamp(2.75rem,6vw,5rem)] font-bold leading-[0.95] tracking-[-0.05em] text-ink">
              Built for operational clarity.
            </h1>
            <p className="mt-5 max-w-[38.75rem] text-lg leading-relaxed text-muted sm:text-xl">
              BotLane builds private, managed AI systems that handle real work, inside your tools and under your
              control.
            </p>
          </div>
          <p className="text-base leading-relaxed text-muted sm:text-lg lg:pb-14">
            We started BotLane to help modern teams deal with operational overload. Our focus is simple: remove
            repetitive work, improve execution, and keep humans in control.
          </p>
        </section>

        {/* Pillars */}
        <section className="mx-auto grid max-w-[75rem] gap-3 px-6 py-8 sm:grid-cols-3 sm:gap-10 sm:py-20">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.title} className="flex items-start gap-4 rounded-[1rem] border border-line bg-white p-4 sm:block sm:border-0 sm:bg-transparent sm:p-0">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-[0.875rem] bg-lane/10 text-lane sm:size-16 sm:rounded-[1rem]">
                  <Icon className="size-5 sm:size-7" />
                </span>
                <h2 className="text-lg font-semibold sm:mt-6 sm:text-2xl tracking-[-0.02em] text-ink">{pillar.title}</h2>
                <p className="mt-1 max-w-[18.75rem] text-sm leading-relaxed text-muted sm:mt-3 sm:text-base">{pillar.text}</p>
              </div>
            );
          })}
        </section>

        {/* The problem */}
        <section className="border-t border-line">
          <div className="mx-auto grid max-w-[75rem] gap-10 px-6 py-16 sm:py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
            <div>
              <h2 className="text-[clamp(1.75rem,3.6vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-ink">
                More clients shouldn&rsquo;t mean more admin.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                Agencies grow by winning clients. Every new client also brings reports to build, leads to answer and
                invoices to chase. That work lands on the same people who should be running campaigns, and it grows
                faster than the team does.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                BotLane takes that work off their plate. Lane prepares it, your team approves it, and we keep the
                systems running behind the scenes.
              </p>
            </div>
            <div className="overflow-hidden rounded-[1.375rem] border border-line bg-white">
              <div className="aspect-[16/7]">
                <BlogArt variant="corridor" />
              </div>
              <ul className="divide-y divide-line">
                {WORKLOAD.map((item, i) => (
                  <li key={item.label} className="flex gap-4 p-5 sm:p-6">
                    <span className="font-mono text-[0.75rem] font-semibold tracking-[0.12em] text-lane">0{i + 1}</span>
                    <span>
                      <span className="block text-[0.9375rem] font-medium text-ink sm:text-base">{item.label}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-muted">{item.text}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Who we build for */}
        <section className="bg-surface/60">
          <div className="mx-auto grid max-w-[75rem] gap-8 px-6 py-16 sm:py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <div className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-ink-2">Who we build for</div>
              <h2 className="mt-4 text-[clamp(1.75rem,3.6vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-ink">
                Growing agencies, first.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                We built BotLane for agencies of roughly 10 to 35 people, running 10 to 30 retainer clients. Big enough
                that the admin hurts, small enough that every hour of senior time counts.
              </p>
            </div>
            <ul className="grid content-start gap-3 sm:grid-cols-2">
              {AUDIENCE.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-[1rem] border border-line bg-white p-4 text-[0.9375rem] leading-snug text-ink">
                  <span className="mt-1.5 size-2 shrink-0 rounded-full bg-lane" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* What we believe */}
        <section className="mx-auto max-w-[75rem] px-6 py-16 sm:py-24">
          <h2 className="text-[clamp(1.75rem,3.6vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-ink">
            What we believe.
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BELIEFS.map((belief) => {
              const Icon = belief.icon;
              return (
                <div key={belief.title} className="flex flex-col rounded-[1.125rem] border border-line bg-white p-5 sm:p-6">
                  <span className="flex size-10 items-center justify-center rounded-[0.75rem] bg-lane/10 text-lane">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold tracking-[-0.02em] text-ink">{belief.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{belief.text}</p>
                  {belief.href && (
                    <Link href={belief.href} className="group mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-lane">
                      {belief.linkLabel}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Company details */}
        <section className="mx-auto max-w-[75rem] px-6 pb-16 sm:pb-24">
          <div className="grid gap-6 rounded-[1.375rem] border border-line bg-white p-6 sm:grid-cols-3 sm:p-8">
            <div>
              <div className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">Company</div>
              <div className="mt-2 text-base font-medium text-ink">{COMPANY_INFO.legalName}</div>
            </div>
            <div>
              <div className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">Registered office</div>
              <div className="mt-2 text-base text-ink">
                30 N Gould St, Ste R
                <br />
                Sheridan, WY 82801
              </div>
            </div>
            <div>
              <div className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">Email</div>
              <a href={`mailto:${COMPANY_INFO.email}`} className="mt-2 block text-base text-ink underline underline-offset-4 hover:text-lane">
                {COMPANY_INFO.email}
              </a>
            </div>
          </div>
        </section>

        {/* Closing band */}
        <section className="mx-auto max-w-[83.75rem] px-6 pb-20 sm:pb-24">
          <div className="relative overflow-hidden rounded-[1.25rem] bg-[#0b0d17] px-6 py-8 sm:rounded-[1.75rem] sm:px-16 sm:py-14">
            {/* light streaks */}
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-40 -left-24 h-80 w-[60%] rounded-[50%] border-t-2 border-blue-500/60 blur-[2px]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -bottom-48 h-96 w-[70%] rotate-[-14deg] rounded-[50%] border-t-2 border-lane/60 blur-[2px]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_85%_110%,rgba(224,49,43,0.28),transparent_70%),radial-gradient(50%_70%_at_10%_120%,rgba(59,130,246,0.25),transparent_70%)]"
            />

            <div className="relative grid items-center gap-4 sm:gap-8 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-16">
              <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-white">
                Three systems.
                <br />
                Real outcomes.
              </h2>
              <p className="max-w-[29.375rem] text-[0.9375rem] leading-relaxed text-white/80 sm:text-lg">
                We&rsquo;re starting with three high-impact operational lanes: client reporting, lead follow-up, and
                invoice follow-up.
              </p>
              <Link
                href="/company/contact"
                className="group mt-1 inline-flex h-11 w-fit items-center gap-3 rounded-[0.625rem] bg-white px-6 text-sm sm:mt-0 sm:h-14 sm:rounded-[0.75rem] sm:px-8 sm:text-base font-medium text-ink transition hover:bg-white/90"
              >
                Contact us
                <ArrowRight className="size-[1.125rem] transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
