import type { Metadata } from "next";
import { PartnerProgram } from "@/components/partners/partner-program";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Partner programme — BotLane",
  description: "Refer clients to BotLane and earn 15% of their monthly retainer for the first 12 months.",
};

// Visiting /partners directly (a shared link, or a refresh) shows the programme as its own page.
export default function PartnersPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-[linear-gradient(#ffffff,#f3f4f7)] px-0 py-0 md:px-6 md:py-20">
        <div className="mx-auto max-w-[880px]">
          <PartnerProgram />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
