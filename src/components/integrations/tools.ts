import type { ComponentType } from "react";
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

/** The tools BotLane's three systems work with. Used by /integrations and each system page. */

export type SystemId = "01" | "02" | "03";

export const SYSTEMS: Record<SystemId, { title: string; href: string }> = {
  "01": { title: "Client reporting", href: "/systems/client-reporting" },
  "02": { title: "Lead follow-up", href: "/systems/lead-follow-up" },
  "03": { title: "Invoice follow-up", href: "/systems/invoice-follow-up" },
};

export type Tool = {
  name: string;
  /** What Lane does with the tool. */
  role: string;
  systems: SystemId[];
  /** Brand mark when the site already has one; otherwise a neutral monogram is shown. */
  icon?: ComponentType<{ size?: number; className?: string }>;
};

export type Group = { title: string; text: string; tools: Tool[] };

/**
 * Every tool here is one the site already names on /systems or a system page.
 * Keep it that way: add a tool only once a system actually works with it.
 */
export const GROUPS: Group[] = [
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

/** Every tool one system works with, in the order /integrations lists them. */
export const toolsFor = (id: SystemId) => GROUPS.flatMap((g) => g.tools).filter((t) => t.systems.includes(id));
