import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BotLaneLogo } from "@/components/brand/botlane-logo";
import { SignInForm } from "@/components/auth/auth-forms";
import { LivingOrb } from "@/components/auth/living-orb";

export const metadata: Metadata = {
  title: "Sign In | BotLane",
  description: "Sign in to your BotLane workspace.",
};

/** Split sign-in: the form on a white half, a graphite brand panel with a living halftone orb on the other. */
export default function SignInPage() {
  return (
    <div className="grid min-h-dvh bg-white lg:grid-cols-2">
      {/* Form half */}
      <div className="flex flex-col px-6 py-6 sm:px-8">
        <header className="flex items-center justify-between">
          <Link href="/" aria-label="botLane home">
            <BotLaneLogo mode="full" size={30} variant="light" decorative symbolClassName="mr-1.5" wordmarkClassName="text-[1.3125rem] text-ink" />
          </Link>
          <Link href="/signup" className="text-sm font-medium text-lane hover:underline lg:hidden">
            Sign up
          </Link>
        </header>

        <main className="mx-auto w-full max-w-[27.5rem] flex-1 pt-14 pb-10 sm:pt-20">
          <h1 className="text-center text-[1.875rem] font-semibold tracking-[-0.035em] text-ink">Sign in to botLane</h1>
          <div className="mt-9">
            <SignInForm />
          </div>
        </main>
      </div>

      {/* Brand half */}
      <aside
        data-surface="dark"
        className="relative hidden overflow-hidden bg-[radial-gradient(120%_90%_at_70%_30%,#2c2c30_0%,#141416_55%,#0d0d10_100%)] text-white lg:flex lg:flex-col"
      >
        {/* Centred in the panel, both ways */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <LivingOrb className="aspect-square w-[min(72%,62vh)]" />
        </div>

        <div className="relative flex justify-end p-6 sm:p-8">
          <Link
            href="/signup"
            className="inline-flex h-11 items-center rounded-xl bg-white px-5 text-[0.9375rem] font-medium text-ink shadow-sm transition hover:bg-white/90"
          >
            Sign up
          </Link>
        </div>

        <div className="relative mt-auto max-w-[30rem] px-10 pb-16 xl:px-14 xl:pb-20">
          <span className="font-mono text-[0.75rem] uppercase tracking-[0.2em] text-[#ff8a6b]">Agent Lane</span>
          <p className="mt-4 text-[clamp(2rem,3vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.04em]">
            Your newest hire is already at work<span className="text-lane">.</span>
          </p>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-white/65">
            Client reporting, lead follow-up and invoice follow-up, drafted by Lane. You just approve.
          </p>
          <Link
            href="/demo"
            className="group mt-7 inline-flex h-11 items-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-5 text-[0.9375rem] font-medium text-white backdrop-blur transition hover:bg-white/[0.12]"
          >
            Book a demo
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </aside>
    </div>
  );
}
