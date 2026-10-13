import { Hero } from "@/components/hero";
import { AssembleController } from "@/components/assemble/assemble-controller";
import { AssembleScene } from "@/components/assemble/assemble-scene";
import "@/components/assemble/assemble.css";
import { ThreeSystems } from "@/components/three-systems";
import { ControlSection } from "@/components/home/control-section";
import { ToolsSection } from "@/components/home/tools-section";
import { SavingsSection } from "@/components/home/savings-section";
import { OnboardingSteps } from "@/components/home/onboarding-steps";
import { Pricing } from "@/components/pricing";
import { FaqSection } from "@/components/home/faq-section";
import { FinalCta } from "@/components/home/final-cta";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen">
        {/* 1. Hero: "Meet your newest hire." */}
        <Hero />

        {/* 2. Scroll board: funnel · line · loop */}
        <AssembleController>
          <AssembleScene />
        </AssembleController>

        {/* 3. Three systems: Client reporting · Lead follow-up · Invoice follow-up */}
        <ThreeSystems />

        {/* 4. You stay in control */}
        <ControlSection />

        {/* 5. Works with your tools */}
        <ToolsSection />

        {/* 6. What it saves you: Interactive agency ROI & hours calculator */}
        <SavingsSection />

        {/* 7. How getting started works: 3-step timeline */}
        <OnboardingSteps />

        {/* 8. Pricing preview */}
        <Pricing />

        {/* 9. FAQ */}
        <FaqSection />

        {/* 10. Final CTA: "Hire Lane." */}
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
