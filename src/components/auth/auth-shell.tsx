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
      <header className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-6 py-5">
        <Link href="/" aria-label="BotLane home" className="text-ink">
          <Wordmark className="text-[22px]" />
        </Link>
        <div className="text-[13px] text-muted">
          <span className="hidden sm:inline">{switchPrompt} </span>
          <Link href={switchHref} className="inline-flex items-center gap-1 font-medium text-lane hover:underline">
            {switchLabel}
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-[1200px] flex-1 content-start gap-12 px-6 pt-6 pb-20 landscape:content-center lg:content-stretch lg:grid-cols-[minmax(0,440px)_minmax(0,1fr)] lg:gap-16 lg:pt-8 lg:pb-10 xl:gap-20">
        <div className="self-start landscape:self-center">
          <h1 className="text-[clamp(34px,4vw,48px)] font-semibold leading-[1.02] tracking-[-0.045em] text-ink">{title}</h1>
          <p className="mt-3 max-w-[420px] text-base leading-[1.5] text-muted">{subtitle}</p>
          <div className="mt-7">{form}</div>
        </div>
        {/* A soft panel that runs the full height, so tall screens have no blank band. */}
        <div className="relative hidden overflow-hidden rounded-[28px] border border-line/70 bg-gradient-to-br from-surface to-white lg:flex lg:items-center lg:px-12 lg:py-16">
          {aside}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
