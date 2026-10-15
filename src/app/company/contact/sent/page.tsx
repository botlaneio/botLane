import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Message sent | BotLane",
  robots: { index: false },
};

export default function ContactSentPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-6 py-24">
        <div className="text-center">
          <span className="mx-auto flex size-28 sm:size-36 items-center justify-center rounded-full bg-lane/[0.07] shadow-[0_0_3.75rem_rgba(224,49,43,0.12)]">
            <Check className="size-12 text-lane sm:size-16" strokeWidth={3} />
          </span>
          <h1 className="mt-8 text-[clamp(2.5rem,5vw,4rem)] sm:mt-10 font-bold leading-none tracking-[-0.045em] text-ink">
            Message sent!
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted sm:mt-6 sm:text-xl">
            Thanks for reaching out.
            <br />
            We&rsquo;ll get back to you within 1 business day.
          </p>
          <Link
            href="/"
            className="group mt-10 inline-flex h-14 items-center gap-3 rounded-[0.75rem] bg-btn px-16 text-base font-medium text-white transition hover:bg-btn-hover"
          >
            Back to home
            <ArrowRight className="size-[1.125rem] transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
