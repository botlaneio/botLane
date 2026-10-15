import type { ComponentType } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { SYSTEMS, toolsFor, type SystemId, type Tool } from "@/components/integrations/tools";

/**
 * The three sections every system page carries after its scroll story:
 * the controls you keep, the tools it works with, and what it costs.
 * Prices and plan facts match /pricing; tools come from the /integrations list.
 */

function Eyebrow({ children }: { children: string }) {
  return <div className="font-mono text-xs font-semibold uppercase tracking-wider text-lane">{children}</div>;
}

function Heading({ children }: { children: string }) {
  return (
    <h2 className="mt-2 text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-ink">{children}</h2>
  );
}

/* ---------- You stay in control ---------- */

export type Control = { icon: ComponentType<{ size?: number; className?: string }>; title: string; text: string };

export function SystemControls({ items }: { items: Control[] }) {
  return (
    <section className="mx-auto max-w-[75rem] border-t border-line px-6 py-16 sm:py-20">
      <div className="max-w-2xl">
        <Eyebrow>Your controls</Eyebrow>
        <Heading>You stay in control.</Heading>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {items.map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-[1.125rem] border border-line bg-white p-6">
            <span className="flex size-10 items-center justify-center rounded-[0.75rem] bg-lane/10 text-lane">
              <Icon size={18} />
            </span>
            <h3 className="mt-5 text-base font-semibold tracking-tight text-ink">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Works with ---------- */

function ToolMark({ tool }: { tool: Tool }) {
  const Icon = tool.icon;
  return (
    <div className="flex size-11 shrink-0 items-center justify-center rounded-[0.75rem] border border-line/60 bg-surface p-2.5">
      {Icon ? (
        <Icon size={24} />
      ) : (
        <span aria-hidden className="font-mono text-sm font-semibold text-ink-2">
          {tool.name.charAt(0)}
        </span>
      )}
    </div>
  );
}

export function SystemTools({ system }: { system: SystemId }) {
  const tools = toolsFor(system);
  return (
    <section className="mx-auto max-w-[75rem] border-t border-line px-6 py-16 sm:py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <Eyebrow>Works with</Eyebrow>
          <Heading>The tools you already use.</Heading>
        </div>
        <Link href="/integrations" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition hover:text-lane">
          All integrations
          <ArrowRight size={14} />
        </Link>
      </div>
      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <div key={tool.name} className="flex gap-4 rounded-[1rem] border border-line bg-white p-5">
            <ToolMark tool={tool} />
            <div className="min-w-0">
              <h3 className="text-sm font-semibold tracking-tight text-ink">{tool.name}</h3>
              <p className="mt-1 text-[0.8125rem] leading-snug text-muted">{tool.role}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-5 text-xs text-faint">
        A listed tool means Lane works with it, not a partnership with or endorsement by that company.
      </p>
    </section>
  );
}

/* ---------- Pricing ---------- */

const INCLUDED = [
  "Integration with your existing tools",
  "Managed operation & monitoring",
  "Human approval on every output",
  "Unlimited team seats",
];

const BUNDLES = [
  { name: "Two Lanes", price: "$1,100", text: "This system plus any one other." },
  { name: "Agent Lane", price: "$1,500", text: "All three systems, with priority support." },
];

export function SystemPricing({ system }: { system: SystemId }) {
  const { title } = SYSTEMS[system];
  return (
    <section className="mx-auto max-w-[75rem] border-t border-line px-6 py-16 sm:py-20">
      <div className="max-w-2xl">
        <Eyebrow>Pricing</Eyebrow>
        <Heading>One flat monthly retainer.</Heading>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Billed monthly in advance. Cancel at the end of any billing cycle, with a 30-day money-back guarantee on your first month.
        </p>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col rounded-[1.25rem] border border-ink bg-white p-7 shadow-[0_1rem_3rem_rgba(20,20,40,0.08)]">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-semibold text-ink">One Lane · {title}</span>
            <span className="rounded-full bg-lane/10 px-2.5 py-0.5 font-mono text-[0.6875rem] font-semibold text-lane">System {system}</span>
          </div>
          <div className="mt-5 flex items-baseline gap-1.5">
            <span className="text-[0.8125rem] text-muted">from</span>
            <span className="text-5xl font-semibold tracking-[-0.04em] text-ink">$600</span>
            <span className="text-sm text-muted">/mo</span>
          </div>
          <ul className="mt-6 grid gap-2.5 text-sm text-ink-2 sm:grid-cols-2">
            {INCLUDED.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <Check size={16} className="mt-0.5 shrink-0 text-emerald-600" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/demo"
              className="inline-flex h-11 items-center gap-2 rounded-[0.5rem] bg-btn px-5 text-sm font-semibold text-white transition hover:bg-btn-hover"
            >
              Book a demo
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex h-11 items-center rounded-[0.5rem] border border-line bg-white px-5 text-sm font-semibold text-ink transition hover:bg-surface"
            >
              Compare plans
            </Link>
          </div>
        </div>

        <div className="grid gap-4">
          {BUNDLES.map((b) => (
            <Link
              key={b.name}
              href="/pricing"
              className="group flex flex-col justify-between rounded-[1.25rem] border border-line bg-white p-6 transition hover:border-ink/30"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-ink">{b.name}</span>
                <ArrowRight size={14} className="text-faint transition group-hover:translate-x-0.5 group-hover:text-ink" />
              </div>
              <div className="mt-4 flex items-baseline gap-1.5">
                <span className="text-[0.8125rem] text-muted">from</span>
                <span className="text-3xl font-semibold tracking-[-0.035em] text-ink">{b.price}</span>
                <span className="text-sm text-muted">/mo</span>
              </div>
              <p className="mt-2 text-sm text-muted">{b.text}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
