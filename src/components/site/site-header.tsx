"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/content/site";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./mobile-menu";
import { Wordmark } from "./wordmark";

export function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-30 pt-[env(safe-area-inset-top)] transition-[background,box-shadow] duration-300",
        scrolled && "bg-white/85 shadow-[0_1px_0_var(--line)] backdrop-blur-md backdrop-saturate-150",
      )}
    >
      <div className="wrap flex items-center justify-between gap-4 py-5" style={{ maxWidth: "none" }}>
        <Wordmark />
        <nav aria-label="Primary" className="hidden gap-8 text-[15.5px] min-[960px]:flex">
          {nav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative py-1 no-underline transition-opacity hover:opacity-60",
                  active && "after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:bg-terra",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/book" className="btn btn-primary btn-sm">
            Book a call
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
