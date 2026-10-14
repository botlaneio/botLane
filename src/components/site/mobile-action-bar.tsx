"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { whatsappHref } from "@/lib/contact";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "./icons";

// Phones and tablets: a "Book a call" bar appears once the visitor has scrolled past the first screen.
export function MobileActionBar() {
  const [shown, setShown] = useState(false);
  const wa = whatsappHref();

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 flex gap-2 bg-white/95 px-4 pt-2.5 pb-[calc(10px+env(safe-area-inset-bottom))] shadow-[0_-1px_0_var(--line)] backdrop-blur transition-transform duration-300 min-[960px]:hidden",
        shown ? "translate-y-0" : "translate-y-full",
      )}
      aria-hidden={!shown}
      inert={!shown}
    >
      <Link href="/book" className="btn btn-primary flex-1">
        Book a call
      </Link>
      {wa && (
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline w-[46px] px-0"
          aria-label="Chat with BotLane on WhatsApp"
        >
          <WhatsAppIcon />
        </a>
      )}
    </div>
  );
}
