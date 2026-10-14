import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Wordmark } from "../wordmark";
import { SiteFooter } from "../site-footer";

interface AuthShellProps {
  switchPrompt: string;
  switchLabel: string;
  switchHref: string;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  form: React.ReactNode;
  aside: React.ReactNode;
}

/** Shared frame for the sign-in and sign-up pages: slim header, form on the left, illustration on the right. */
export function AuthShell({ switchPrompt, switchLabel, switchHref, title, subtitle, form, aside }: AuthShellProps) {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-gradient-to-b from-white to-surface/70">
      <header className="mx-auto flex w-full max-w-[75rem] items-center justify-between px-6 py-5">
        <Link href="/" aria-label="BotLane home" className="text-ink">
          <Wordmark className="text-[1.375rem]" />
        </Link>
        <div className="text-[0.8125rem] text-muted">
          <span className="hidden sm:inline">{switchPrompt} </span>
          <Link href={switchHref} className="inline-flex items-center gap-1 font-medium text-lane hover:underline">
            {switchLabel}
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-[75rem] flex-1 content-start gap-12 px-6 pt-6 pb-20 landscape:content-center lg:content-stretch lg:grid-cols-[minmax(0,27.5rem)_minmax(0,1fr)] lg:gap-16 lg:pt-8 lg:pb-10 xl:gap-20">
        <div className="self-start landscape:self-center">
          <h1 className="text-[clamp(2.125rem,4vw,3rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-ink">{title}</h1>
          <p className="mt-3 max-w-[26.25rem] text-base leading-[1.5] text-muted">{subtitle}</p>
          <div className="mt-7">{form}</div>
        </div>
        {/* A soft panel that runs the full height, so tall screens have no blank band. */}
        <div className="relative hidden rounded-[1.75rem] border border-line/70 bg-gradient-to-br from-surface to-white lg:flex lg:items-center lg:justify-center lg:px-12 lg:py-16">
          {aside}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
