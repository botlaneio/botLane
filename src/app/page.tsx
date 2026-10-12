import { AssembleController } from "@/components/assemble/assemble-controller";
import { AssembleScene } from "@/components/assemble/assemble-scene";
import "@/components/assemble/assemble.css";
import { Hero } from "@/components/hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThreeSystems } from "@/components/three-systems";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <AssembleController>
          <AssembleScene />
        </AssembleController>
        <ThreeSystems />
      </main>
      <SiteFooter />
    </>
  );
}
