import type { Metadata } from "next";
import { FaqSection, HireLane, PageHero, PageShell, Section, SectionHeading } from "@/components/page/parts";
import { Pricing } from "@/components/pricing";
import { PRICING_FAQ } from "@/content/systems";

export const metadata: Metadata = {
  title: "Pricing — BotLane",
  description: "One flat monthly retainer for Lane. Start with one system, or run all three.",
};

const INCLUDED = [
  { title: "Setup with you", body: "We map how the work is done today and set Lane up to match." },
  { title: "Your tools, connected", body: "Lane works through the accounts you already have." },
  { title: "Your approval on every send", body: "Reports, replies and reminders wait for your OK." },
  { title: "A clear history", body: "See what Lane prepared, what you approved and what went out." },
  { title: "Changes as you grow", body: "Add clients, tools or systems without starting again." },
  { title: "A team behind Lane", body: "People you can reach when something needs a human." },
];

export default function PricingPage() {
  return (
    <PageShell>
      <PageHero
        center
        eyebrow="Pricing"
        title="One flat monthly fee. No hourly billing."
        lead="Start with the system that costs you the most time, or put Lane on all three."
        actions={false}
      />
      <Pricing heading={false} />
      <Section className="border-t border-line">
        <SectionHeading eyebrow="Every plan includes" title="Everything Lane needs to do the work." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {INCLUDED.map((i) => (
            <div key={i.title} className="rounded-[20px] border border-line bg-white p-6">
              <span className="block size-2 rounded-full bg-lane" />
              <h3 className="mt-4 text-lg font-semibold tracking-[-0.01em]">{i.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{i.body}</p>
            </div>
          ))}
        </div>
      </Section>
      <FaqSection items={PRICING_FAQ} title="Pricing questions." />
      <HireLane />
    </PageShell>
  );
}
