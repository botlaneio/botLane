import { About } from "@/components/about";
import { AssembleController } from "@/components/assemble/assemble-controller";
import { AssembleScene } from "@/components/assemble/assemble-scene";
import "@/components/assemble/assemble.css";
import { Hero } from "@/components/hero";
import { GettingStarted, PricingLink, WhatItSaves, WorksWithYourTools } from "@/components/home-sections";
import { FaqSection, HireLane, PageShell } from "@/components/page/parts";
import { Pricing } from "@/components/pricing";
import { ThreeSystems } from "@/components/three-systems";
import { HOME_FAQ } from "@/content/systems";

export default function Home() {
  return (
    <PageShell>
      <Hero />
      <AssembleController>
        <AssembleScene />
      </AssembleController>
      <ThreeSystems />
      <About />
      <WorksWithYourTools />
      <WhatItSaves />
      <GettingStarted />
      <Pricing />
      <PricingLink />
      <FaqSection items={HOME_FAQ} />
      <HireLane />
    </PageShell>
  );
}
