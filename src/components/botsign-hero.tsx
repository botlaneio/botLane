import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { HeroConsole } from "@/components/HeroConsole";
import "./botsign-hero.css";
export function Hero() {
  return (
    <section className="botsign-hero page-hero relative overflow-hidden pb-20 md:pb-24">
      <div className="atmos" aria-hidden="true"><div className="atmos-glow-cool atmos-glow-cool--subtle" /><div className="atmos-grid opacity-35" /><div className="hero-floor opacity-10" /></div>
      <div className="container-page relative z-10">
        <Reveal eager className="mb-14 flex max-w-3xl flex-col sm:mb-20 md:mb-24 lg:mb-28">
          <p className="pill mb-7 w-fit">Private, managed AI systems</p>
          <h1 className="text-hero hero-title mb-6">The managed lane through<br />operational complexity.</h1>
          <p className="text-body mb-10 max-w-xl">botLane handles the systems behind reporting, follow-up, support, invoicing, and intake so your team can focus on decisions rather than upkeep.</p>
          <div className="hero-actions">
            <Link href="#pricing" className="btn-primary no-underline">Get started <span aria-hidden="true">→</span></Link>
            <Link href="#systems" className="btn-secondary no-underline">Browse systems <span className="arrow" aria-hidden="true">→</span></Link>
          </div>
        </Reveal>
        <Reveal eager delayMs={140} className="relative mt-4 sm:mt-6 md:mt-8">
          <div className="hero-console-depth" aria-hidden="true"><div className="hero-console-depth__grid" /><div className="hero-console-depth__glow-primary" /><div className="hero-console-depth__glow-accent" /><div className="hero-console-depth__horizon" /></div>
          <div className="hero-console-tilt"><div className="glass-shell glass-shell--product hero-shell--beam relative p-1.5 md:p-2 breathe"><span className="hero-console__beam hero-shell__beam" aria-hidden="true" /><HeroConsole /></div></div>
        </Reveal>
      </div>
    </section>
  );
}
