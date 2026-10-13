"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ArrowRight,
  Menu,
  X,
  Layers,
  GitCommit,
  RotateCw,
  Sliders,
  CheckCircle2,
} from "lucide-react";
import { Wordmark } from "./wordmark";
import { accountCta, useAccountState } from "@/lib/account-state";
import { DemoModal } from "./demo-modal";

interface SystemItem {
  num: string;
  shape: string;
  title: string;
  description: string;
  highlight: string;
  href: string;
  icon: typeof Layers;
}

const SYSTEMS: SystemItem[] = [
  {
    num: "01",
    shape: "FUNNEL",
    title: "Client reporting",
    description: "Ingests Google Ads, Meta, and HubSpot into client-ready weekly PDFs.",
    highlight: "Many sources → 1 report",
    href: "/systems/client-reporting",
    icon: Layers,
  },
  {
    num: "02",
    shape: "LINE",
    title: "Lead follow-up",
    description: "Replies to form leads in minutes, then sends calibrated nudges until booked.",
    highlight: "Multi-touch cadence",
    href: "/systems/lead-follow-up",
    icon: GitCommit,
  },
  {
    num: "03",
    shape: "LOOP",
    title: "Invoice follow-up",
    description: "Sends polite, graduated payment reminders that halt as soon as funds clear.",
    highlight: "Loops until paid",
    href: "/systems/invoice-follow-up",
    icon: RotateCw,
  },
];

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSystemsOpen, setMobileSystemsOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const cta = accountCta(useAccountState());

  const megaMenuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Navigation is completely transparent at top (scrollY <= 15),
      // and transitions to semi-transparent frosted glass upon scrolling down.
      setIsScrolled(window.scrollY > 15);
    };

    const handleHash = () => {
      if (window.location.hash === "#demo") {
        setDemoOpen(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("hashchange", handleHash);

    // Initial check
    handleScroll();
    handleHash();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHash);
    };
  }, []);

  // Close mega menu when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        megaMenuOpen &&
        megaMenuRef.current &&
        !megaMenuRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setMegaMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMegaMenuOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [megaMenuOpen]);

  const handleLinkClick = () => {
    setMegaMenuOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ease-in-out ${
          isScrolled
            ? "border-b border-[#1d1d1f]/[0.08] bg-white/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] backdrop-blur-md supports-[backdrop-filter]:bg-white/75"
            : "border-b border-transparent bg-transparent shadow-none"
        }`}
      >
        <div className="mx-auto flex h-[64px] max-w-[1200px] items-center justify-between px-6">
          {/* Zone 1: Brand Wordmark */}
          <Link
            href="/"
            aria-label="BotLane home"
            className="group flex items-center gap-2.5 transition-opacity hover:opacity-90 shrink-0"
          >
            <Wordmark className="text-[19px] text-ink" />
          </Link>

          {/* Zone 2: Navigation Links with Mega Menu */}
          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-1.5 md:flex"
          >
            {/* Mega Menu Dropdown Trigger */}
            <div
              className="relative"
              onMouseEnter={() => setMegaMenuOpen(true)}
              onMouseLeave={() => setMegaMenuOpen(false)}
            >
              <button
                ref={triggerRef}
                type="button"
                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                aria-expanded={megaMenuOpen}
                aria-haspopup="true"
                className={`flex items-center gap-1 rounded-[8px] px-3.5 py-1.5 text-[13px] font-medium tracking-[-0.01em] transition-all duration-150 ${
                  megaMenuOpen
                    ? "bg-black/[0.05] text-ink"
                    : "text-muted hover:bg-black/[0.04] hover:text-ink"
                }`}
              >
                <span>Systems</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    megaMenuOpen ? "rotate-180 text-ink" : "text-muted"
                  }`}
                />
              </button>

              {/* Mega Menu Dropdown Panel */}
              {megaMenuOpen && (
                <div
                  ref={megaMenuRef}
                  role="menu"
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5"
                >
                  <div className="w-[740px] overflow-hidden rounded-[24px] border border-line bg-white/95 p-6 shadow-[0_24px_60px_rgba(20,20,40,0.14)] backdrop-blur-xl">
                    <div className="mb-4 flex items-center justify-between border-b border-line pb-3">
                      <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-lane">
                        <span>The Three Workforce Systems</span>
                      </div>
                      <span className="text-[11px] font-medium text-muted">
                        Automated work · Human approval
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3.5">
                      {SYSTEMS.map((item) => {
                        const Icon = item.icon;
                        return (
                          <a
                            key={item.title}
                            href={item.href}
                            onClick={handleLinkClick}
                            className="group flex flex-col justify-between rounded-[18px] border border-line/70 bg-surface/40 p-4 transition-all duration-150 hover:border-lane/30 hover:bg-white hover:shadow-[0_8px_24px_rgba(20,20,40,0.06)]"
                          >
                            <div>
                              <div className="flex items-center justify-between">
                                <span className="flex size-8 items-center justify-center rounded-[8px] border border-line bg-white text-ink transition-colors group-hover:border-lane/30 group-hover:text-lane">
                                  <Icon size={16} />
                                </span>
                                <span className="font-mono text-[10px] tracking-wider text-lane uppercase">
                                  {item.num} · {item.shape}
                                </span>
                              </div>

                              <h4 className="mt-3 text-sm font-semibold tracking-tight text-ink group-hover:text-lane-ink">
                                {item.title}
                              </h4>
                              <p className="mt-1 text-[12px] leading-snug text-muted">
                                {item.description}
                              </p>
                            </div>

                            <div className="mt-3 pt-2 border-t border-line/50 flex items-center justify-between text-[11px] font-medium text-ink-2">
                              <span>{item.highlight}</span>
                              <ArrowRight
                                size={12}
                                className="text-muted opacity-0 transition-all duration-150 group-hover:translate-x-0.5 group-hover:opacity-100 group-hover:text-lane"
                              />
                            </div>
                          </a>
                        );
                      })}
                    </div>

                    {/* Bottom Feature Strip */}
                    <div className="mt-4 flex items-center justify-between rounded-[8px] bg-surface/70 px-4 py-2.5 border border-line/60">
                      <div className="flex items-center gap-2 text-xs text-ink-2">
                        <CheckCircle2 size={14} className="text-ok" />
                        <span>
                          <strong className="font-semibold text-ink">Zero surprise sends:</strong>{" "}
                          You review every draft with a 1-click approval desk.
                        </span>
                      </div>
                      <Link
                        href="/systems"
                        onClick={handleLinkClick}
                        className="flex items-center gap-1 text-xs font-medium text-lane hover:underline whitespace-nowrap"
                      >
                        <span>Explore details</span>
                        <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/how-it-works"
              className="rounded-[8px] px-3.5 py-1.5 text-[13px] font-medium tracking-[-0.01em] text-muted transition-all duration-150 hover:bg-black/[0.04] hover:text-ink whitespace-nowrap shrink-0"
            >
              How it works
            </Link>

            <Link
              href="/pricing"
              className="rounded-[8px] px-3.5 py-1.5 text-[13px] font-medium tracking-[-0.01em] text-muted transition-all duration-150 hover:bg-black/[0.04] hover:text-ink whitespace-nowrap shrink-0"
            >
              Pricing
            </Link>

            <Link
              href="/company/about"
              className="rounded-[8px] px-3.5 py-1.5 text-[13px] font-medium tracking-[-0.01em] text-muted transition-all duration-150 hover:bg-black/[0.04] hover:text-ink whitespace-nowrap shrink-0"
            >
              About
            </Link>
          </nav>

          {/* Zone 3: Primary Action & Mobile Menu Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            {cta && (
              <Link
                href={cta.href}
                className="group relative inline-flex h-9 items-center gap-1.5 rounded-[8px] bg-ink px-4 text-[13px] font-medium text-white shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.08)] transition-all hover:bg-black active:scale-[0.98] whitespace-nowrap shrink-0"
              >
                <span>{cta.label}</span>
                <ArrowRight
                  size={13}
                  className="transition-transform duration-150 group-hover:translate-x-0.5"
                />
              </Link>
            )}

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              className="flex size-9 items-center justify-center rounded-[8px] text-ink-2 transition-colors hover:bg-surface md:hidden"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="border-t border-line bg-white/95 px-6 pt-4 pb-6 shadow-xl backdrop-blur-xl md:hidden">
            <nav className="flex flex-col space-y-1">
              {/* Accordion for Systems */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileSystemsOpen(!mobileSystemsOpen)}
                  className="flex w-full items-center justify-between rounded-[8px] px-3 py-2.5 text-sm font-medium text-ink-2 transition-colors hover:bg-surface hover:text-ink"
                >
                  <span className="flex items-center gap-2">
                    <Sliders size={16} />
                    <span>Systems</span>
                  </span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      mobileSystemsOpen ? "rotate-180 text-ink" : "text-muted"
                    }`}
                  />
                </button>

                {mobileSystemsOpen && (
                  <div className="my-1.5 ml-4 space-y-1.5 border-l-2 border-line pl-3">
                    {SYSTEMS.map((item) => (
                      <a
                        key={item.title}
                        href={item.href}
                        onClick={handleLinkClick}
                        className="block rounded-[8px] px-2.5 py-1.5 text-xs text-muted hover:bg-surface hover:text-ink"
                      >
                        <div className="font-semibold text-ink">{item.title}</div>
                        <div className="text-[11px] text-muted">{item.highlight}</div>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/systems"
                onClick={handleLinkClick}
                className="rounded-[8px] px-3 py-2.5 text-sm font-medium text-ink-2 transition-colors hover:bg-surface hover:text-ink"
              >
                All 3 Systems (Overview)
              </Link>

              <Link
                href="/how-it-works"
                onClick={handleLinkClick}
                className="rounded-[8px] px-3 py-2.5 text-sm font-medium text-ink-2 transition-colors hover:bg-surface hover:text-ink"
              >
                How it works
              </Link>

              <Link
                href="/pricing"
                onClick={handleLinkClick}
                className="rounded-[8px] px-3 py-2.5 text-sm font-medium text-ink-2 transition-colors hover:bg-surface hover:text-ink"
              >
                Pricing Retainer
              </Link>

              <Link
                href="/company/about"
                onClick={handleLinkClick}
                className="rounded-[8px] px-3 py-2.5 text-sm font-medium text-ink-2 transition-colors hover:bg-surface hover:text-ink"
              >
                About
              </Link>

              <Link
                href="/demo"
                onClick={handleLinkClick}
                className="rounded-[8px] px-3 py-2.5 text-sm font-medium text-lane transition-colors hover:bg-surface"
              >
                Book a 20-min Demo
              </Link>
            </nav>

            {cta && (
              <div className="mt-4 pt-4 border-t border-line/60">
                <Link
                  href={cta.href}
                  onClick={handleLinkClick}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-[8px] bg-ink text-sm font-medium text-white transition-all hover:bg-black shadow-sm"
                >
                  <span>{cta.label}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Interactive Walkthrough Modal */}
      <DemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
