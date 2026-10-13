import Link from "next/link";
import type { ReactNode } from "react";
import type { Faq } from "@/content/systems";
import { LaneMark } from "../lane-mark";
import { SiteFooter } from "../site-footer";
import { SiteHeader } from "../site-header";

// Shared building blocks for every page, so new pages look like the home page.

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`font-mono text-xs uppercase tracking-[0.08em] text-lane ${className}`}>{children}</div>;
}

const primary =
  "inline-flex h-12 items-center justify-center rounded-[8px] bg-lane-strong px-6 text-base font-medium text-white shadow-sm transition-all hover:bg-lane-ink active:scale-[0.98]";

export function DemoButton({ children = "Book a demo", className = "" }: { children?: ReactNode; className?: string }) {
  return (
    <Link href="/demo" className={`${primary} ${className}`}>
      {children}
    </Link>
  );
}

/** The opening block of an inner page. */
export function PageHero({
  eyebrow,
  title,
  lead,
  actions = true,
  secondary,
  center = false,
  children,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  actions?: boolean;
  secondary?: { href: string; label: string };
  center?: boolean;
  children?: ReactNode;
}) {
  return (
    <section className={`mx-auto max-w-[1200px] px-6 pt-20 pb-14 md:pt-24 ${center ? "text-center" : ""}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1
        className={`mt-3 max-w-[860px] text-[clamp(40px,6vw,80px)] leading-[0.98] font-semibold tracking-[-0.045em] text-balance ${center ? "mx-auto" : ""}`}
      >
        {title}
      </h1>
      {lead && (
        <p className={`mt-6 max-w-[640px] text-xl leading-[1.45] tracking-[-0.01em] text-muted text-pretty ${center ? "mx-auto" : ""}`}>
          {lead}
        </p>
      )}
      {actions && (
        <div className={`mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 ${center ? "justify-center" : ""}`}>
          <DemoButton />
          {secondary && (
            <Link href={secondary.href} className="flex h-12 items-center px-1 text-base font-medium hover:underline">
              {secondary.label} →
            </Link>
          )}
        </div>
      )}
      {children}
    </section>
  );
}

export function Section({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`mx-auto max-w-[1200px] scroll-mt-24 px-6 py-20 md:py-24 ${className}`}>
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  center = false,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-[760px]"}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-3 text-[clamp(32px,4.2vw,56px)] leading-[1.02] font-semibold tracking-[-0.04em] text-balance">{title}</h2>
      {lead && <p className="mt-4 text-lg leading-relaxed text-muted text-pretty">{lead}</p>}
    </div>
  );
}

/** Questions and answers. Uses <details>, so it works without JavaScript. */
export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="mt-10 divide-y divide-line border-y border-line">
      {items.map((f) => (
        <details key={f.q} className="group py-1">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-medium tracking-[-0.01em] [&::-webkit-details-marker]:hidden">
            {f.q}
            <span
              aria-hidden="true"
              className="relative size-5 flex-none before:absolute before:top-1/2 before:left-0 before:h-[1.5px] before:w-5 before:-translate-y-1/2 before:bg-ink after:absolute after:top-0 after:left-1/2 after:h-5 after:w-[1.5px] after:-translate-x-1/2 after:bg-ink after:transition-transform group-open:after:scale-y-0"
            />
          </summary>
          <p className="max-w-[720px] pb-6 text-base leading-relaxed text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function FaqSection({ items, title = "Questions, answered." }: { items: Faq[]; title?: string }) {
  return (
    <Section id="faq">
      <SectionHeading eyebrow="FAQ" title={title} />
      <FaqList items={items} />
    </Section>
  );
}

/** The closing call to action: "Hire Lane." */
export function HireLane({ title = "Hire Lane.", lead = "Tell us which work eats your week. We’ll show you Lane doing it." }: { title?: string; lead?: string }) {
  return (
    <section className="px-4 pb-20 md:px-6">
      <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[28px] bg-[#111113] px-8 py-16 text-center text-white md:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/2 size-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(224,49,43,0.28),transparent_65%)]" />
        <div className="relative flex justify-center">
          <LaneMark size={44} tone="light" />
        </div>
        <h2 className="relative mt-6 text-[clamp(44px,7vw,96px)] leading-[0.95] font-semibold tracking-[-0.05em]">{title}</h2>
        <p className="relative mx-auto mt-5 max-w-[520px] text-lg leading-relaxed text-white/70">{lead}</p>
        <div className="relative mt-9 flex justify-center">
          <DemoButton />
        </div>
      </div>
    </section>
  );
}

/** Marks a page whose wording is not final yet. */
export function DraftNote({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-[#f3d9a4] bg-[#fdf6e7] px-5 py-4 text-sm leading-relaxed text-[#7a5205]">
      <span aria-hidden="true" className="mt-1.5 size-2 flex-none rounded-full bg-[#f2a516]" />
      <div>{children}</div>
    </div>
  );
}
