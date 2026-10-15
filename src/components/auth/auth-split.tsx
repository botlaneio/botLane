import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BotLaneLogo } from "../brand/botlane-logo";
import { LivingOrb, type OrbStops } from "./living-orb";

interface AuthSplitProps {
  /** Which side the dark orb panel sits on; the form takes the other half. */
  panelSide: "left" | "right";
  title: string;
  form: React.ReactNode;
  /** The other auth page, e.g. Sign up from sign-in. */
  switchLink: { label: string; href: string };
  panel: {
    eyebrow: string;
    eyebrowClassName: string;
    heading: string;
    body: string;
    cta: { label: string; href: string };
    orbStops: OrbStops;
  };
}

/**
 * Shared frame for /signin and /signup: a white form half and a graphite brand
 * half with the living halftone orb, centred between its top bar and its copy.
 * Below lg only the form half shows.
 */
export function AuthSplit({ panelSide, title, form, switchLink, panel }: AuthSplitProps) {
  const panelLeft = panelSide === "left";

  const logo = (surface: "light" | "dark") => (
    <Link href="/" aria-label="botLane home">
      <BotLaneLogo mode="full" size={30} variant={surface} decorative symbolClassName="mr-1.5" wordmarkClassName="text-[1.3125rem]" />
    </Link>
  );

  const switchButton = (
    <Link
      href={switchLink.href}
      className="inline-flex h-11 items-center rounded-xl bg-white px-5 text-[0.9375rem] font-medium text-ink shadow-sm transition hover:bg-white/90"
    >
      {switchLink.label}
    </Link>
  );

  return (
    <div className="grid min-h-dvh bg-white lg:grid-cols-2">
      {/* Form half */}
      <div className={`flex flex-col px-6 py-6 sm:px-8 ${panelLeft ? "lg:order-2" : ""}`}>
        <header className={`flex items-center justify-between text-ink ${panelLeft ? "lg:hidden" : ""}`}>
          {logo("light")}
          <Link href={switchLink.href} className="text-sm font-medium text-lane hover:underline lg:hidden">
            {switchLink.label}
          </Link>
        </header>

        <main className={`mx-auto w-full max-w-[27.5rem] flex-1 pt-14 pb-10 sm:pt-20 ${panelLeft ? "lg:pt-[5.75rem]" : ""}`}>
          <h1 className="text-center text-[1.875rem] font-semibold tracking-[-0.035em] text-ink">{title}</h1>
          <div className="mt-9">{form}</div>
        </main>
      </div>

      {/* Brand half */}
      <aside
        data-surface="dark"
        className={`relative hidden overflow-hidden text-white lg:flex lg:flex-col ${
          panelLeft
            ? "lg:order-1 bg-[radial-gradient(120%_90%_at_30%_30%,#2c2c30_0%,#141416_55%,#0d0d10_100%)]"
            : "bg-[radial-gradient(120%_90%_at_70%_30%,#2c2c30_0%,#141416_55%,#0d0d10_100%)]"
        }`}
      >
        <div className={`relative flex items-center p-6 sm:p-8 ${panelLeft ? "justify-between" : "justify-end"}`}>
          {panelLeft && logo("dark")}
          {switchButton}
        </div>

        {/* Centred in the space between the top bar and the text, so it never overlaps the copy */}
        <div className="pointer-events-none relative flex min-h-0 flex-1 items-center justify-center px-10 [container-type:size]">
          <LivingOrb stops={panel.orbStops} className="aspect-square w-[min(80cqw,92cqh)]" />
        </div>

        <div className="relative max-w-[30rem] px-10 pb-16 xl:px-14 xl:pb-20">
          <span className={`font-mono text-[0.75rem] uppercase tracking-[0.2em] ${panel.eyebrowClassName}`}>
            {panel.eyebrow}
          </span>
          <p className="mt-4 text-[clamp(2rem,3vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.04em]">
            {panel.heading}
            <span className="text-lane">.</span>
          </p>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-white/65">{panel.body}</p>
          <Link
            href={panel.cta.href}
            className="group mt-7 inline-flex h-11 items-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-5 text-[0.9375rem] font-medium text-white backdrop-blur transition hover:bg-white/[0.12]"
          >
            {panel.cta.label}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </aside>
    </div>
  );
}
