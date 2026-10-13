import type { Metadata } from "next";
import Link from "next/link";
import { LaneMark } from "@/components/lane-mark";
import { PageShell } from "@/components/page/parts";

export const metadata: Metadata = { title: "Page not found — BotLane" };

const PLACES = [
  { href: "/systems/client-reporting", label: "Client reporting" },
  { href: "/systems/lead-follow-up", label: "Lead follow-up" },
  { href: "/systems/invoice-follow-up", label: "Invoice follow-up" },
  { href: "/pricing", label: "Pricing" },
];

export default function NotFound() {
  return (
    <PageShell>
      <section className="mx-auto flex max-w-[1200px] flex-col items-center px-6 pt-24 pb-28 text-center md:pt-32">
        <LaneMark size={64} state="issue" title="Lane couldn’t find this page" />
        <div className="mt-8 font-mono text-xs uppercase tracking-[0.12em] text-lane">404 · Page not found</div>
        <h1 className="mt-3 max-w-[760px] text-[clamp(40px,6vw,80px)] leading-[0.98] font-semibold tracking-[-0.045em] text-balance">
          Lane looked everywhere.
        </h1>
        <p className="mt-5 max-w-[520px] text-xl leading-[1.45] text-muted">
          This page doesn’t exist, or it has moved. Here are a few places to pick up from.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link href="/" className="inline-flex h-12 items-center rounded-[8px] bg-ink px-6 text-base font-medium text-white hover:bg-black">
            Back to home
          </Link>
          {PLACES.map((p) => (
            <Link key={p.href} href={p.href} className="inline-flex h-12 items-center rounded-[8px] border border-line bg-white px-5 text-base font-medium hover:border-[#d2d2d7]">
              {p.label}
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
