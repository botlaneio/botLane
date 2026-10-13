import type { Metadata } from "next";
import { Blocks, FileText, Waypoints } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact | BotLane",
  description: "Tell us what you'd like to automate. We'll get back to you within 1 business day.",
};

const NEXT = [
  {
    icon: FileText,
    title: "Understand your workflow",
    text: "We’ll learn about your current tools and processes.",
  },
  {
    icon: Waypoints,
    title: "Explore the right fit",
    text: "We’ll walk you through Agent Lane and the three operational lanes.",
  },
  {
    icon: Blocks,
    title: "Get a tailored plan",
    text: "Simple, transparent pricing based on your needs.",
  },
];

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen">
        <section className="mx-auto grid max-w-[1200px] gap-8 px-6 pt-8 pb-20 sm:gap-16 sm:pt-16 sm:pb-24 lg:grid-cols-[minmax(0,620px)_minmax(0,1fr)] lg:gap-24">
          <div>
            <div className="inline-flex rounded-[8px] bg-surface px-3 py-1.5 font-mono text-[12px] uppercase tracking-[0.14em] text-ink-2">
              Get in touch
            </div>
            <h1 className="mt-5 text-[clamp(48px,7vw,96px)] font-bold leading-[0.95] tracking-[-0.05em] text-ink">
              Let&rsquo;s talk.
            </h1>
            <p className="mt-5 max-w-[560px] text-lg leading-relaxed text-muted sm:text-xl">
              Tell us a bit about what you&rsquo;d like to automate. We&rsquo;ll get back to you within 1 business
              day.
            </p>

            <div className="mt-7 sm:mt-9">
              <ContactForm />
            </div>
          </div>

          <ol className="space-y-3 lg:space-y-12 lg:pt-[268px]">
            {NEXT.map((step) => {
              const Icon = step.icon;
              return (
                <li key={step.title} className="flex items-start gap-4 rounded-[16px] border border-line bg-white p-4 lg:gap-7 lg:border-0 lg:bg-transparent lg:p-0">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-[14px] bg-lane/10 text-lane lg:size-14">
                    <Icon className="size-5 lg:size-6" />
                  </span>
                  <div className="lg:border-l lg:border-line lg:pl-7">
                    <h2 className="text-base font-semibold lg:text-lg tracking-[-0.01em] text-ink">{step.title}</h2>
                    <p className="mt-1 max-w-[300px] text-sm leading-relaxed text-muted lg:mt-2 lg:text-[15px]">{step.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
