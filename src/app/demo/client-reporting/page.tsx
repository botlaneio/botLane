import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ClientReportingDemo } from "@/systems-demo/client-reporting/demo";

export const metadata: Metadata = {
  title: "Book a live Client Reporting demo | BotLane",
  description:
    "See how Lane turns scattered performance data into clear, client-ready reports, with your approval before delivery.",
  // Not linked from the site until the flow is finished and approved.
  robots: { index: false, follow: false },
};

export default function ClientReportingDemoPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#f8f8f6]">
        <div className="mx-auto max-w-[75rem] px-6 pt-8 pb-20 sm:pt-12 lg:pt-16 lg:pb-28">
          <ClientReportingDemo />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
