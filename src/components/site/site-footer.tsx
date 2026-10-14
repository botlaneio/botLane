import Link from "next/link";
import { footerLinks, tagline } from "@/content/site";
import { contactEmail, mailHref, whatsappHref } from "@/lib/contact";

export function SiteFooter() {
  const wa = whatsappHref();
  const email = contactEmail();
  return (
    <footer className="border-t border-line pt-16 pb-32 text-[15px] text-muted min-[960px]:pb-16">
      <div className="wrap grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="grid content-start gap-3">
          <span className="text-[21px] font-semibold tracking-[-0.035em] text-ink">botlane</span>
          <p className="max-w-[32ch]">{tagline} Designed, run and maintained by BotLane.</p>
          {(wa || email) && (
            <p className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
              {wa && (
                <a href={wa} target="_blank" rel="noopener noreferrer" className="text-ink">
                  WhatsApp
                </a>
              )}
              {email && (
                <a href={mailHref()!} className="text-ink">
                  {email}
                </a>
              )}
            </p>
          )}
        </div>
        {footerLinks.map((group) => (
          <nav key={group.title} aria-label={group.title} className="grid content-start gap-2.5">
            <span className="text-[13px] tracking-[0.18em] text-subtle uppercase">{group.title}</span>
            {group.links.map((l) => (
              <Link key={l.href} href={l.href} className="no-underline hover:text-ink">
                {l.label}
              </Link>
            ))}
          </nav>
        ))}
      </div>
      <div className="wrap mt-14 text-[13.5px]">© {new Date().getFullYear()} BotLane LLC</div>
    </footer>
  );
}
