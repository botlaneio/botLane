import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Wordmark } from "../wordmark";

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
      <header className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-6 py-6">
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

      <main className="mx-auto grid w-full max-w-[1200px] flex-1 items-start gap-12 px-6 pt-8 pb-16 lg:grid-cols-[minmax(0,460px)_minmax(0,1fr)] lg:gap-16 lg:pt-14">
        <div>
          <h1 className="text-[clamp(40px,5vw,60px)] font-semibold leading-[1] tracking-[-0.05em] text-ink">{title}</h1>
          <p className="mt-4 max-w-[440px] text-lg leading-[1.45] tracking-[-0.01em] text-muted">{subtitle}</p>
          <div className="mt-9">{form}</div>
        </div>
        <div className="relative hidden lg:block">{aside}</div>
      </main>

      <footer className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center justify-between gap-4 px-6 py-8 text-xs text-muted">
        <div className="flex items-center gap-5">
          <Wordmark className="text-lg text-ink" />
          <span>© {new Date().getFullYear()} BotLane. All rights reserved.</span>
        </div>
        <nav className="flex items-center gap-6">
          <Link href="/legal/terms" className="hover:text-ink">Terms</Link>
          <Link href="/legal/privacy" className="hover:text-ink">Privacy</Link>
          <Link href="/demo" className="hover:text-ink">Contact</Link>
        </nav>
      </footer>
    </div>
  );
}
