import Link from "next/link";
import { Reveal } from "@/components/site/reveal";
import { SiteFooter } from "@/components/site/site-footer";
import { Wordmark } from "@/components/site/wordmark";

// Conversion pages: no main nav or action bar, just a way back.
export default function FocusLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="absolute inset-x-0 top-0 z-30 pt-[env(safe-area-inset-top)]">
        <div className="wrap flex items-center justify-between py-5" style={{ maxWidth: "none" }}>
          <Wordmark />
          <Link href="/" className="arrow text-[15px] text-muted hover:text-ink">
            Back to site
          </Link>
        </div>
      </header>
      <main id="main" className="bg-[linear-gradient(to_bottom,#f8f6f3,#fff_520px)]">
        {children}
      </main>
      <SiteFooter />
      <Reveal />
    </>
  );
}
