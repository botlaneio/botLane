import type { Metadata } from "next";
import type { ComponentType } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Info, KeyRound, ScanEye, UserCheck } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  GmailLogo,
  GoogleAdsLogo,
  GoogleAnalyticsLogo,
  GoogleCalendarLogo,
  HubSpotLogo,
  MetaAdsLogo,
  PlaidLogo,
  QuickBooksLogo,
  StripeLogo,
  TypeformLogo,
} from "@/components/assemble/company-icons";

export const metadata: Metadata = {
  title: "Integrations | BotLane",
  description:
    "The ad platforms, CRMs, forms, calendars, inboxes and billing tools BotLane's three systems work with, and how a connection is set up.",
};

type SystemId = "01" | "02" | "03";

const SYSTEMS: Record<SystemId, { title: string; href: string }> = {
  "01": { title: "Client reporting", href: "/systems/client-reporting" },
  "02": { title: "Lead follow-up", href: "/systems/lead-follow-up" },
  "03": { title: "Invoice follow-up", href: "/systems/invoice-follow-up" },
};

type Tool = {
  name: string;
  /** What Lane does with the tool. */
  role: string;
  systems: SystemId[];
  /** Brand mark when the site already has one; otherwise a neutral monogram is shown. */
  icon?: ComponentType<{ size?: number; className?: string }>;
};

type Group = { title: string; text: string; tools: Tool[] };

/**
 * Every tool here is one the site already names on /systems or a system page.
 * Keep it that way: add a tool only once a system actually works with it.
 */
const GROUPS: Group[] = [
  {
    title: "Ads & analytics",
    text: "The numbers behind every client report.",
    tools: [
      {
        name: "Google Ads",
        role: "Search, PMax and YouTube spend and conversion tracking.",
        systems: ["01"],
        icon: GoogleAdsLogo,
      },
      {
        name: "Meta Ads",
        role: "Instagram and Facebook ad sets, CPM and blended ROAS.",
        systems: ["01"],
        icon: MetaAdsLogo,
      },
      {
        name: "Google Analytics 4",
        role: "Sessions, engaged users and key events.",
        systems: ["01"],
        icon: GoogleAnalyticsLogo,
      },
    ],
  },
  {
    title: "CRM & forms",
    text: "Where new leads arrive and deals move.",
    tools: [
      {
        name: "HubSpot CRM",
        role: "Deals, lifecycle stages and pipeline, for reports and for new-lead follow-up.",
        systems: ["01", "02"],
        icon: HubSpotLogo,
      },
      {
        name: "Typeform",
        role: "New form submissions start a lead follow-up.",
        systems: ["02"],
        icon: TypeformLogo,
      },
      {
        name: "Webflow forms",
        role: "Website form submissions start a lead follow-up.",
        systems: ["02"],
      },
    ],
  },
  {
    title: "Email & scheduling",
    text: "How prepared work reaches people, once you approve it.",
    tools: [
      {
        name: "Gmail / Google Workspace",
        role: "Approved emails go out from your own team or billing address.",
        systems: ["02", "03"],
        icon: GmailLogo,
      },
      {
        name: "Google Calendar",
        role: "Checks real availability so replies offer times that are actually free.",
        systems: ["02"],
        icon: GoogleCalendarLogo,
      },
      {
        name: "Calendly",
        role: "Adds your booking link to lead replies.",
        systems: ["02"],
      },
    ],
  },
  {
    title: "Billing & banking",
    text: "What's owed, and the moment it's paid.",
    tools: [
      {
        name: "Stripe",
        role: "Invoices, subscriptions and payment status.",
        systems: ["03"],
        icon: StripeLogo,
      },
      {
        name: "QuickBooks Online",
        role: "Receivables aging and paid status.",
        systems: ["03"],
        icon: QuickBooksLogo,
      },
      {
        name: "Xero",
        role: "Issued invoices and paid status.",
        systems: ["03"],
      },
      {
        name: "Plaid",
        role: "Confirms incoming wires and ACH transfers, so reminders stop once money lands.",
        systems: ["03"],
        icon: PlaidLogo,
      },
    ],
  },
  {
    title: "Team & data",
    text: "Where your team sees what Lane did.",
    tools: [
      {
        name: "Slack",
        role: "Report summaries for the account team and notes on the invoice ledger.",
        systems: ["01", "03"],
      },
      {
        name: "Google Sheets",
        role: "Extra report data your team already keeps in a sheet.",
        systems: ["01"],
      },
    ],
  },
];

const STEPS = [
  {
    icon: KeyRound,
    title: "You authorize each tool",
    text: "During setup you sign in to each tool and grant BotLane access through its own OAuth screen. No passwords are shared with us.",
  },
  {
    icon: ScanEye,
    title: "Access stays scoped",
    text: "Lane reads only what its systems need, such as spend, pipeline stages or invoice status. The privacy policy lists what we access from each kind of tool.",
  },
  {
    icon: UserCheck,
    title: "Nothing sends without you",
    text: "Lane prepares reports, replies and reminders. Every one waits for a person to approve it before it leaves your account.",
  },
];

function ToolMark({ tool }: { tool: Tool }) {
  const Icon = tool.icon;
  return (
    <div className="flex size-11 shrink-0 items-center justify-center rounded-[0.75rem] border border-line/60 bg-surface p-2.5">
      {Icon ? (
        <Icon size={24} />
      ) : (
        <span aria-hidden className="font-mono text-sm font-semibold text-ink-2">
          {tool.name.charAt(0)}
        </span>
      )}
    </div>
  );
}

export default function IntegrationsPage() {
  const toolCount = GROUPS.reduce((n, g) => n + g.tools.length, 0);

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-bg">
        {/* Intro */}
        <section className="mx-auto max-w-[75rem] px-6 pt-16 pb-14 sm:pt-24">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-1.5 font-mono text-xs text-muted transition hover:text-ink"
          >
            <ArrowLeft size={13} />
            <span>Back to BotLane home</span>
          </Link>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-lane">
              <span className="size-1.5 rounded-full bg-lane-gradient" />
              <span>Resources · Integrations</span>
            </div>
            <h1 className="mt-4 text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-ink">
              Lane works with the tools you already use.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
              There&apos;s nothing to migrate. Lane connects to your ad platforms, CRM, inbox and billing
              tools, prepares the work, and hands it to you for approval. These are the {toolCount} tools
              our three systems work with today.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {(Object.keys(SYSTEMS) as SystemId[]).map((id) => {
              const system = SYSTEMS[id];
              const tools = GROUPS.flatMap((g) => g.tools).filter((t) => t.systems.includes(id));
              return (
                <Link
                  key={id}
                  href={system.href}
                  className="group rounded-[1.25rem] border border-line bg-white p-6 transition-[border-color,box-shadow] duration-300 hover:border-lane/30 hover:shadow-[0_0.625rem_1.5rem_rgba(20,20,40,0.06)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-lane">{id}</span>
                    <ArrowRight size={15} className="text-muted transition group-hover:translate-x-0.5 group-hover:text-lane" />
                  </div>
                  <h2 className="mt-4 text-lg font-semibold tracking-[-0.02em] text-ink">{system.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{tools.map((t) => t.name).join(", ")}</p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Directory */}
        {GROUPS.map((group) => (
          <section key={group.title} className="mx-auto max-w-[75rem] border-t border-line px-6 py-14 sm:py-16">
            <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
              <div>
                <h2 className="text-[clamp(1.5rem,2.6vw,1.875rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-ink">
                  {group.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{group.text}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {group.tools.map((tool) => (
                  <div key={tool.name} className="flex gap-4 rounded-[1rem] border border-line bg-white p-5">
                    <ToolMark tool={tool} />
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold tracking-tight text-ink">{tool.name}</h3>
                      <p className="mt-1 text-[0.8125rem] leading-snug text-muted">{tool.role}</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {tool.systems.map((id) => (
                          <Link
                            key={id}
                            href={SYSTEMS[id].href}
                            className="inline-flex items-center gap-1 rounded-full border border-line bg-surface px-2 py-0.5 font-mono text-[0.625rem] font-medium text-ink-2 transition hover:border-lane/40 hover:text-lane"
                          >
                            <span className="text-lane">{id}</span>
                            <span>{SYSTEMS[id].title}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* How a connection works */}
        <section className="mx-auto max-w-[75rem] border-t border-line px-6 py-16 sm:py-20">
          <div className="max-w-2xl">
            <div className="font-mono text-xs font-semibold uppercase tracking-wider text-lane">How connecting works</div>
            <h2 className="mt-2 text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-ink">
              You stay in control of every connection.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {STEPS.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-[1.25rem] border border-line bg-white p-6">
                <div className="flex size-10 items-center justify-center rounded-[0.625rem] border border-line bg-surface text-ink">
                  <Icon size={19} />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-[-0.02em] text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link href="/legal/privacy" className="inline-flex items-center gap-1.5 font-semibold text-lane hover:underline">
              <span>What we access, in the privacy policy</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/trust/release-standard"
              className="inline-flex items-center gap-1.5 font-semibold text-lane hover:underline"
            >
              <span>How we release changes</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        {/* Not listed */}
        <section className="mx-auto max-w-[75rem] border-t border-line px-6 py-16 sm:py-20">
          <div className="flex flex-col items-start justify-between gap-8 rounded-[1.5rem] border border-line bg-white p-8 sm:p-10 md:flex-row md:items-center">
            <div className="max-w-xl">
              <h2 className="text-[clamp(1.5rem,3vw,2.125rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-ink">
                Use something that isn&apos;t listed?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                Tell us what your agency runs on. We&apos;ll tell you plainly whether Lane can work with it
                before you sign up.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/demo"
                className="inline-flex items-center gap-1.5 rounded-[0.5rem] bg-btn px-5 py-3 text-sm font-semibold text-white transition hover:bg-btn-hover"
              >
                <span>Book a demo</span>
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/company/contact"
                className="inline-flex items-center gap-1.5 rounded-[0.5rem] border border-line bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-lane/40 hover:text-lane"
              >
                <span>Contact us</span>
              </Link>
            </div>
          </div>

          <div className="mt-8 flex items-start gap-3 rounded-[1rem] border border-line bg-surface/50 p-5 text-sm text-ink-2">
            <Info size={18} className="mt-0.5 shrink-0 text-muted" />
            <p>
              Product names and logos belong to their owners. A tool appearing here means Lane can work with
              it; it does not mean a partnership with, or endorsement by, that company.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
