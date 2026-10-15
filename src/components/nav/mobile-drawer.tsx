"use client";

import { useState, type ComponentType } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ArrowUpRight, ChevronDown, ShieldCheck, X } from "lucide-react";
import { BotLaneLogo } from "@/components/brand/botlane-logo";
import "./mobile-drawer.css";

/**
 * The phone menu: slides in from the right over half the screen. It carries the desktop nav
 * vertically, with Systems opening into one card per system. The panel draws a red edge as it
 * opens and its rows rise in one after another; reduced motion keeps only the slide.
 */

export type DrawerSystem = {
  num: string;
  shape: string;
  title: string;
  highlight: string;
  href: string;
  icon: ComponentType<{ size?: number; className?: string }>;
};

const LINKS = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/company/about", label: "About" },
  { href: "/blog", label: "Blog" },
];

export function MobileDrawer({
  open,
  onClose,
  systems,
  cta,
}: {
  open: boolean;
  onClose: () => void;
  systems: DrawerSystem[];
  cta: { href: string; label: string } | null;
}) {
  const [systemsOpen, setSystemsOpen] = useState(false);
  const pathname = usePathname() ?? "";
  const onSystems = pathname.startsWith("/systems");
  const rise = (i: number) => ({ "--d": `${0.08 + i * 0.045}s` }) as React.CSSProperties;

  return (
    <div className="md:hidden" inert={!open}>
      <div
        aria-hidden
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-ink/30 backdrop-blur-[3px] transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        data-open={open ? "" : undefined}
        className={`mdr fixed top-0 right-0 bottom-0 z-50 flex w-1/2 min-w-[18rem] max-w-[24rem] flex-col bg-[#fbfbfa] shadow-[-1.5rem_0_4rem_rgba(20,20,40,0.16)] transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Top: Lane's mark, a live status line, close */}
        <div className="flex h-[4rem] shrink-0 items-center justify-between border-b border-line/70 pr-3 pl-5">
          <span className="mdr-rise flex items-center gap-2.5" style={rise(0)}>
            <BotLaneLogo variant="ember-glow" size={26} decorative />
            <span className="flex items-center gap-1.5 font-mono text-[0.625rem] tracking-[0.16em] text-ink-2 uppercase">
              <span className="mdr-pulse size-1.5 rounded-full bg-[#22a447]" />3 systems active
            </span>
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex size-9 items-center justify-center rounded-full border border-line bg-white text-ink-2 transition-colors hover:border-ink/30 hover:text-ink"
          >
            <X size={17} />
          </button>
        </div>

        <nav aria-label="Mobile navigation" className="flex-1 overflow-y-auto px-5 pt-3 pb-6">
          {/* Systems, nested */}
          <div className="mdr-rise border-b border-line/70" style={rise(1)}>
            <button
              type="button"
              onClick={() => setSystemsOpen(!systemsOpen)}
              aria-expanded={systemsOpen}
              className="group flex w-full items-center gap-3 py-3.5 text-left"
            >
              <span className={`w-5 font-mono text-[0.6875rem] ${onSystems || systemsOpen ? "text-lane" : "text-faint"}`}>01</span>
              <span className={`flex-1 text-[1.3125rem] font-semibold tracking-[-0.03em] ${systemsOpen ? "text-lane" : "text-ink"}`}>
                Systems
              </span>
              <span
                className={`flex size-7 items-center justify-center rounded-full transition-colors ${
                  systemsOpen ? "bg-lane text-white" : "bg-surface text-ink-2"
                }`}
              >
                <ChevronDown size={15} className={`transition-transform duration-300 ${systemsOpen ? "rotate-180" : ""}`} />
              </span>
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-[380ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                systemsOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div data-systems-open={systemsOpen ? "" : undefined} className="space-y-2 pb-4 pl-8">
                  {systems.map(({ num, shape, title, highlight, href, icon: Icon }, i) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={onClose}
                      className="mdr-card group flex items-start gap-3 rounded-[0.875rem] border border-line bg-white p-3 transition-[border-color,box-shadow] hover:border-lane/30 hover:shadow-[0_0.5rem_1.25rem_rgba(20,20,40,0.06)]"
                      style={{ "--d": `${0.04 + i * 0.06}s` } as React.CSSProperties}
                    >
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-[0.5rem] bg-lane/10 text-lane">
                        <Icon size={15} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-mono text-[0.5625rem] font-semibold tracking-[0.1em] text-lane uppercase">
                          {num} · {shape}
                        </span>
                        <span className={`block text-[0.875rem] font-semibold ${pathname === href ? "text-lane" : "text-ink"}`}>{title}</span>
                        <span className="block text-[0.6875rem] text-muted">{highlight}</span>
                      </span>
                    </Link>
                  ))}
                  <Link
                    href="/systems"
                    onClick={onClose}
                    className="mdr-card flex items-center gap-1.5 px-1 pt-1 text-[0.8125rem] font-medium text-ink-2 hover:text-lane"
                    style={{ "--d": `${0.04 + systems.length * 0.06}s` } as React.CSSProperties}
                  >
                    Compare all systems
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {LINKS.map(({ href, label }, i) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className="mdr-rise group flex items-center gap-3 border-b border-line/70 py-3.5"
                style={rise(i + 2)}
              >
                <span className={`w-5 font-mono text-[0.6875rem] ${active ? "text-lane" : "text-faint"}`}>0{i + 2}</span>
                <span className={`flex-1 text-[1.3125rem] font-semibold tracking-[-0.03em] ${active ? "text-lane" : "text-ink"}`}>
                  {label}
                </span>
                <ArrowUpRight
                  size={17}
                  className="text-faint transition-[color,transform] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-lane"
                />
              </Link>
            );
          })}
        </nav>

        {/* Bottom: the promise, then the two ways in */}
        <div className="mdr-rise shrink-0 border-t border-line/70 bg-white p-4" style={rise(LINKS.length + 2)}>
          <p className="mb-3 flex items-center gap-2 text-[0.75rem] text-muted">
            <ShieldCheck size={14} className="shrink-0 text-lane" />
            Nothing is sent without your approval.
          </p>
          <div className="grid gap-2">
            <Link
              href="/demo"
              onClick={onClose}
              className="flex h-11 items-center justify-center gap-2 rounded-[0.5rem] bg-lane text-sm font-semibold text-white shadow-[0_0.5rem_1.25rem_-0.5rem_rgba(224,49,43,0.6)] transition hover:bg-lane-strong"
            >
              Book a demo
              <ArrowRight size={14} />
            </Link>
            {cta && (
              <Link
                href={cta.href}
                onClick={onClose}
                className="flex h-11 items-center justify-center rounded-[0.5rem] border border-line bg-white text-sm font-semibold text-ink transition hover:border-ink/30"
              >
                {cta.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
