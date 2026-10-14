import Link from "next/link";
import { WhatsAppIcon } from "@/components/site/icons";
import { contactEmail, mailHref, whatsappHref } from "@/lib/contact";
import { cn } from "@/lib/utils";

export function ContactAlternatives({ className, showBook = true }: { className?: string; showBook?: boolean }) {
  const wa = whatsappHref();
  const email = contactEmail();
  if (!wa && !email && !showBook) return null;
  return (
    <div className={cn("grid gap-2 border-t border-line pt-6 text-[15.5px] text-muted", className)}>
      <p>Prefer another way?</p>
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-ink">
        {showBook && <Link href="/book">Book a discovery call</Link>}
        {wa && (
          <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5">
            <WhatsAppIcon size={16} /> WhatsApp
          </a>
        )}
        {email && <a href={mailHref()!}>{email}</a>}
      </div>
    </div>
  );
}
