"use client";

import type { ReactNode } from "react";
import { BotLaneLogo } from "@/components/brand/botlane-logo";
import { LOGO_VARIANTS, LOGO_VARIANT_IDS } from "@/components/brand/logo-variants";
import { SURFACE_LOGO, SurfaceProvider, type Surface } from "@/components/brand/surface";

const SURFACE_BG: Record<Surface, { bg: string; text: string; name: string }> = {
  light: { bg: "#f8f8f6", text: "#1d1d1f", name: "Light canvas #F8F8F6" },
  dark: { bg: "#0b0d17", text: "#ffffff", name: "Near-black #0B0D17" },
  accent: { bg: "#e0312b", text: "#ffffff", name: "Red-orange #E0312B" },
};

const SIZES = ["xs", "sm", "md", "lg", "xl"] as const;

function Band({ surface, children }: { surface: Surface; children: ReactNode }) {
  const s = SURFACE_BG[surface];
  return (
    <section data-surface={surface} style={{ background: s.bg, color: s.text }} className="px-6 py-10">
      <SurfaceProvider surface={surface}>
        <div className="mx-auto max-w-[60rem]">{children}</div>
      </SurfaceProvider>
    </section>
  );
}

/** Hidden check page for the logo system: every surface, size, override and a sticky bar over mixed sections. */
export function LogoPreview() {
  return (
    <main className="min-h-screen bg-bg">
      {/* A transparent sticky bar: its tracking logo swaps as light, dark and red sections pass beneath. */}
      <div className="sticky top-0 z-10 px-6 py-3" data-testid="sticky-bar">
        <div className="mx-auto max-w-[60rem]">
          <BotLaneLogo size="md" track animated="intro" />
        </div>
      </div>

      {(["light", "dark", "accent"] as Surface[]).map((surface) => (
        <Band key={surface} surface={surface}>
          <h2 className="text-sm font-semibold uppercase tracking-[0.08em] opacity-70">
            {SURFACE_BG[surface].name} → {LOGO_VARIANTS[SURFACE_LOGO[surface]].label}
          </h2>
          <div className="mt-5 flex flex-wrap items-end gap-6" data-testid={`auto-${surface}`}>
            {SIZES.map((size) => (
              <BotLaneLogo key={size} size={size} />
            ))}
            <BotLaneLogo mode="full" size="md" animated="pulse" wordmarkClassName="text-xl" />
          </div>
          <div className="h-[40vh]" />
        </Band>
      ))}

      <Band surface="light">
        <h2 className="text-sm font-semibold uppercase tracking-[0.08em] opacity-70">Explicit overrides</h2>
        <div className="mt-5 flex flex-wrap gap-6">
          {LOGO_VARIANT_IDS.map((id) => (
            <div key={id} className="flex flex-col items-center gap-2 text-xs">
              <BotLaneLogo variant={id} size="xl" />
              <span>{LOGO_VARIANTS[id].label}</span>
            </div>
          ))}
        </div>
        <div className="mt-8 flex items-center gap-4 rounded-2xl p-6" style={{ background: "linear-gradient(110deg,#0b0d17,#e0312b)" }}>
          <BotLaneLogo variant="graphite-white" size="lg" />
          <span className="text-sm text-white">On a gradient, pick the variant explicitly.</span>
        </div>
      </Band>
    </main>
  );
}
