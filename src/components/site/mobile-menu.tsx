"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { useState } from "react";
import { nav } from "@/content/site";
import { whatsappHref } from "@/lib/contact";
import { WhatsAppIcon } from "./icons";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const wa = whatsappHref();

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="btn btn-ghost btn-sm min-[960px]:hidden" aria-label="Open menu">
        <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M3 7h14M3 13h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-ink/20" />
        <Dialog.Content className="fixed inset-x-0 top-0 z-50 rounded-b-[24px] bg-white px-6 pt-[calc(20px+env(safe-area-inset-top))] pb-8 shadow-float">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-[21px] font-semibold tracking-[-0.035em]">botlane</Dialog.Title>
            <Dialog.Close className="btn btn-ghost btn-sm" aria-label="Close menu">
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                <path d="M4 4l10 10M14 4 4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">Site navigation</Dialog.Description>
          <nav aria-label="Mobile" className="mt-6 grid">
            {[...nav, { label: "Safeguards", href: "/safeguards" }].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-t border-line py-4 font-serif text-[28px] leading-tight no-underline first:border-t-0"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-6 grid gap-2">
            <Link href="/book" className="btn btn-primary">
              Book a discovery call
            </Link>
            <Link href="/assessment" className="btn btn-outline">
              Request an assessment
            </Link>
            {wa && (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <WhatsAppIcon size={18} /> Chat on WhatsApp
              </a>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
