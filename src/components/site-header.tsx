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
} from "lucide-react";
import { BotLaneLogo } from "./brand/botlane-logo";
import { accountCta, useAccountState } from "@/lib/account-state";
import { DemoModal } from "./demo-modal";
import { SystemsMegaMenu } from "./nav/systems-mega-menu";
import { MobileDrawer } from "./nav/mobile-drawer";

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

  // Keep the page still behind the open drawer.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = () => {
    setMegaMenuOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        // Once scrolled the bar paints its own white background, so it is the surface the logo sits on.
        data-surface={isScrolled ? "light" : undefined}
        className={`sticky top-0 z-40 w-full transition-all duration-300 ease-in-out ${
          isScrolled
            ? "border-b border-[#1d1d1f]/[0.08] bg-white/80 shadow-[0_0.25rem_1.5rem_rgba(0,0,0,0.03)] backdrop-blur-md supports-[backdrop-filter]:bg-white/75"
            : "border-b border-transparent bg-transparent shadow-none"
        }`}
      >
        <div className="relative mx-auto flex h-[4rem] max-w-[75rem] items-center justify-between px-6">
          {/* Zone 1: Brand Wordmark */}
          <Link
            href="/"
            aria-label="BotLane home"
            className="group flex items-center gap-0.5 transition-opacity hover:opacity-90 shrink-0"
          >
            {/* The Ember glow logo, always; gathers in once on load, then rests. */}
            <BotLaneLogo
              variant="ember-glow"
              mode="full"
              size={30}
              animated="intro"
              delay={0.15}
              symbolClassName="mr-1.5"
              wordmarkClassName="text-[1.3125rem] text-ink-soft"
            />
          </Link>

          {/* Zone 2: Navigation Links with Mega Menu */}
          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-1.5 self-stretch md:flex"
          >
            {/* Mega Menu Dropdown Trigger */}
            <div
              className="flex h-full items-center"
              onMouseEnter={() => setMegaMenuOpen(true)}
              onMouseLeave={() => setMegaMenuOpen(false)}
            >
              <button
                ref={triggerRef}
                type="button"
                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                aria-expanded={megaMenuOpen}
                aria-haspopup="true"
                className={`relative flex items-center gap-1 rounded-[0.5rem] px-3.5 py-1.5 text-[0.8125rem] font-medium tracking-[-0.01em] transition-all duration-150 ${
                  megaMenuOpen
                    ? "text-lane"
                    : "text-muted hover:bg-black/[0.04] hover:text-ink"
                }`}
              >
                <span>Systems</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    megaMenuOpen ? "rotate-180 text-lane" : "text-muted"
                  }`}
                />
                {megaMenuOpen && (
                  <span aria-hidden className="absolute inset-x-3.5 -bottom-[0.875rem] h-[0.125rem] rounded-full bg-lane" />
                )}
              </button>

              {/* Mega Menu Dropdown Panel */}
              {megaMenuOpen && <SystemsMegaMenu ref={megaMenuRef} onNavigate={handleLinkClick} />}
            </div>

            <Link
              href="/how-it-works"
              className="rounded-[0.5rem] px-3.5 py-1.5 text-[0.8125rem] font-medium tracking-[-0.01em] text-muted transition-all duration-150 hover:bg-black/[0.04] hover:text-ink whitespace-nowrap shrink-0"
            >
              How it works
            </Link>

            <Link
              href="/pricing"
              className="rounded-[0.5rem] px-3.5 py-1.5 text-[0.8125rem] font-medium tracking-[-0.01em] text-muted transition-all duration-150 hover:bg-black/[0.04] hover:text-ink whitespace-nowrap shrink-0"
            >
              Pricing
            </Link>

            <Link
              href="/company/about"
              className="rounded-[0.5rem] px-3.5 py-1.5 text-[0.8125rem] font-medium tracking-[-0.01em] text-muted transition-all duration-150 hover:bg-black/[0.04] hover:text-ink whitespace-nowrap shrink-0"
            >
              About
            </Link>
            <Link
              href="/blog"
              className="rounded-[0.5rem] px-3.5 py-1.5 text-[0.8125rem] font-medium tracking-[-0.01em] text-muted transition-all duration-150 hover:bg-black/[0.04] hover:text-ink whitespace-nowrap shrink-0"
            >
              Blog
            </Link>
          </nav>

          {/* Zone 3: Primary Action & Mobile Menu Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            {cta && (
              <Link
                href={cta.href}
                className="group relative hidden h-9 items-center gap-1.5 rounded-[0.5rem] bg-btn md:inline-flex px-4 text-[0.8125rem] font-medium text-white shadow-[0_1px_2px_rgba(0,0,0,0.08),0_0.25rem_0.75rem_rgba(0,0,0,0.08)] transition-all hover:bg-btn-hover active:scale-[0.98] whitespace-nowrap shrink-0"
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
              className="flex size-9 items-center justify-center rounded-[0.5rem] text-ink-2 transition-colors hover:bg-surface md:hidden"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

      </header>

      {/* Mobile drawer: slides in from the right over half the screen, with the desktop nav laid out vertically. */}
      <MobileDrawer open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} systems={SYSTEMS} cta={cta} />

      {/* Interactive Walkthrough Modal */}
      <DemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
