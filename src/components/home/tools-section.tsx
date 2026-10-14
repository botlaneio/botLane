"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT, FadeUp } from "@/components/motion/fade-up";
import {
  GoogleAdsLogo,
  GoogleAnalyticsLogo,
  MetaAdsLogo,
  HubSpotLogo,
  StripeLogo,
  QuickBooksLogo,
  GoogleCalendarLogo,
  TypeformLogo,
  GmailLogo,
  PlaidLogo,
} from "@/components/assemble/company-icons";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface ToolItem {
  name: string;
  category: "Ads & Traffic" | "CRM & Pipeline" | "Billing & Banking" | "Scheduling & Email";
  system: "Client Reporting" | "Lead Follow-Up" | "Invoice Follow-Up";
  status: "Supported" | "Native API";
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const TOOLS: ToolItem[] = [
  {
    name: "Google Ads",
    category: "Ads & Traffic",
    system: "Client Reporting",
    status: "Native API",
    icon: GoogleAdsLogo,
  },
  {
    name: "Meta Ads",
    category: "Ads & Traffic",
    system: "Client Reporting",
    status: "Native API",
    icon: MetaAdsLogo,
  },
  {
    name: "Google Analytics 4",
    category: "Ads & Traffic",
    system: "Client Reporting",
    status: "Native API",
    icon: GoogleAnalyticsLogo,
  },
  {
    name: "HubSpot CRM",
    category: "CRM & Pipeline",
    system: "Lead Follow-Up",
    status: "Native API",
    icon: HubSpotLogo,
  },
  {
    name: "Typeform",
    category: "CRM & Pipeline",
    system: "Lead Follow-Up",
    status: "Supported",
    icon: TypeformLogo,
  },
  {
    name: "Google Calendar",
    category: "Scheduling & Email",
    system: "Lead Follow-Up",
    status: "Native API",
    icon: GoogleCalendarLogo,
  },
  {
    name: "Stripe",
    category: "Billing & Banking",
    system: "Invoice Follow-Up",
    status: "Native API",
    icon: StripeLogo,
  },
  {
    name: "QuickBooks Online",
    category: "Billing & Banking",
    system: "Invoice Follow-Up",
    status: "Native API",
    icon: QuickBooksLogo,
  },
  {
    name: "Plaid",
    category: "Billing & Banking",
    system: "Invoice Follow-Up",
    status: "Supported",
    icon: PlaidLogo,
  },
  {
    name: "Gmail / GSuite",
    category: "Scheduling & Email",
    system: "Lead Follow-Up",
    status: "Native API",
    icon: GmailLogo,
  },
];

export function ToolsSection() {
  const reduce = useReducedMotion();
  return (
    <section className="relative mx-auto max-w-[75rem] px-6 py-20 sm:py-28 border-t border-line">
      <FadeUp className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-lane">
            <span className="size-1.5 rounded-full bg-lane" />
            <span>Integrations Architecture</span>
          </div>
          <h2 className="mt-3 text-[clamp(1.875rem,4vw,3.125rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-ink">
            Works natively with your existing stack.
          </h2>
          <p className="mt-3 text-base text-muted sm:text-lg">
            No painful migration. Lane authenticates securely via OAuth with your primary ad platforms,
            financial ledgers, and communication channels.
          </p>
        </div>

        <Link
          href="/systems"
          className="inline-flex items-center gap-1.5 rounded-[0.5rem] border border-line bg-white px-4 py-2.5 text-xs font-semibold text-ink shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition hover:border-lane/40 hover:text-lane"
        >
          <span>See all 3 systems mapped</span>
          <ArrowRight size={13} />
        </Link>
      </FadeUp>

      <div className="mt-12 grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-5">
        {TOOLS.map((t, idx) => {
          const Icon = t.icon;
          return (
            <motion.div
              key={t.name}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              whileHover={{ y: -4, transition: { duration: 0.25, ease: EASE_OUT } }}
              transition={{ duration: 0.6, delay: idx * 0.05, ease: EASE_OUT }}
              className="group flex flex-col justify-between rounded-[1rem] border border-line bg-white p-4.5 transition-[border-color,box-shadow] duration-300 hover:border-lane/30 hover:shadow-[0_0.625rem_1.5rem_rgba(20,20,40,0.06)]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex size-10 items-center justify-center rounded-[0.625rem] border border-line/60 bg-surface/40 p-2 transition-transform duration-200 group-hover:scale-110">
                    <Icon size={24} />
                  </div>
                  <span className="inline-flex items-center gap-1 font-mono text-[0.625rem] font-medium text-emerald-600">
                    <CheckCircle2 size={11} />
                    <span>Live</span>
                  </span>
                </div>

                <div className="mt-4 font-medium text-ink tracking-tight text-sm">
                  {t.name}
                </div>
                <div className="mt-0.5 text-[0.6875rem] text-muted">
                  {t.category}
                </div>
              </div>

              <div className="mt-4 border-t border-line/50 pt-2 flex items-center justify-between text-[0.625rem] font-mono text-muted">
                <span className="truncate">{t.system}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-6 rounded-[0.875rem] bg-surface/60 py-3.5 px-6 border border-line/60 text-xs text-muted">
        <span className="font-medium text-ink">Zero custom code required.</span>
        <span>•</span>
        <span>15-minute standard onboarding</span>
        <span>•</span>
        <span>Read-only sync during sandbox phase</span>
        <span>•</span>
        <span>Bank-grade 256-bit OAuth tokens</span>
      </div>
    </section>
  );
}
