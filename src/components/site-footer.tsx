import Link from "next/link";
import { Wordmark } from "./wordmark";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-6 py-10 text-sm text-muted">
        <Wordmark className="text-ink" />
        <div className="flex items-center gap-6">
          <Link href="/partners" scroll={false} className="hover:text-ink">
            Partner programme
          </Link>
          <span>© BotLane LLC</span>
        </div>
      </div>
    </footer>
  );
}
