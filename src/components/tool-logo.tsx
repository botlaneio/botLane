import type { ToolId } from "@/content/systems";
import {
  GmailLogo,
  GoogleAdsLogo,
  GoogleAnalyticsLogo,
  GoogleCalendarLogo,
  GoogleDriveLogo,
  HubSpotLogo,
  MetaAdsLogo,
  PlaidLogo,
  QuickBooksLogo,
  StripeLogo,
  TypeformLogo,
} from "./assemble/company-icons";

// Placeholder drawings of each tool's mark. Swap for the official logo files before launch.
const LOGOS: Record<ToolId, (p: { size?: number }) => React.ReactNode> = {
  "google-ads": GoogleAdsLogo,
  "google-analytics": GoogleAnalyticsLogo,
  "meta-ads": MetaAdsLogo,
  hubspot: HubSpotLogo,
  "google-drive": GoogleDriveLogo,
  gmail: GmailLogo,
  "google-calendar": GoogleCalendarLogo,
  typeform: TypeformLogo,
  stripe: StripeLogo,
  quickbooks: QuickBooksLogo,
  plaid: PlaidLogo,
};

export const TOOL_NAMES: Record<ToolId, string> = {
  "google-ads": "Google Ads",
  "google-analytics": "Google Analytics",
  "meta-ads": "Meta Ads",
  hubspot: "HubSpot",
  "google-drive": "Google Drive",
  gmail: "Gmail",
  "google-calendar": "Google Calendar",
  typeform: "Typeform",
  stripe: "Stripe",
  quickbooks: "QuickBooks",
  plaid: "Plaid",
};

export function ToolLogo({ tool, size = 20 }: { tool: ToolId; size?: number }) {
  const Logo = LOGOS[tool];
  return <Logo size={size} />;
}

/** A tool as a small tile with its name, used in "Tools it connects" lists. */
export function ToolTile({ tool }: { tool: ToolId }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3.5 shadow-[0_2px_8px_rgba(20,20,40,0.04)]">
      <span className="flex size-9 flex-none items-center justify-center rounded-[10px] border border-line bg-white">
        <ToolLogo tool={tool} size={20} />
      </span>
      <span className="text-[15px] font-medium">{TOOL_NAMES[tool]}</span>
    </div>
  );
}
