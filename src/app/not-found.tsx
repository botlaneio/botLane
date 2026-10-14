import Link from "next/link";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="wrap page-top flex min-h-[70vh] flex-col items-center gap-6 pb-32 text-center">
        <p className="eyebrow">Page not found</p>
        <h1>
          This lane is <em>empty.</em>
        </h1>
        <p className="lead">The page you were looking for has moved or never existed.</p>
        <div className="pair justify-center">
          <Link href="/" className="btn btn-primary">
            Back to home
          </Link>
          <Link href="/book" className="btn btn-outline">
            Book a discovery call
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
