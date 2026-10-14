import type { Metadata } from "next";
import Link from "next/link";
import { ContactAlternatives } from "@/components/forms/contact-alternatives";
import { Scheduler } from "@/components/forms/scheduler";
import { calendarUrl } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Book a discovery call",
  description: "A short call to learn how your work runs today and whether BotLane is a good fit. You leave with a clear next step.",
};

export default function BookPage() {
  const url = calendarUrl();
  return (
    <div className="wrap page-top grid gap-14 pb-[clamp(88px,10vw,160px)] min-[1000px]:grid-cols-[0.85fr_1.15fr] min-[1000px]:gap-20">
      <div>
        <p className="eyebrow">Discovery call</p>
        <h1 className="mt-5 text-[clamp(40px,3vw+22px,68px)]">
          Book a discovery <em>call.</em>
        </h1>
        <p className="lead mt-6">A conversation about one workflow, with the people who would build and run it.</p>
        <h2 className="mt-10 font-sans text-[17px] font-medium tracking-normal">On the call</h2>
        <ul className="mt-4 grid gap-3 text-[16px]">
          {[
            "We learn how the work runs today and where the time goes",
            "We tell you honestly whether it's a good fit",
            "You leave with a clear next step",
          ].map((x) => (
            <li key={x} className="flex gap-3">
              <span aria-hidden="true" className="text-terra">
                ✓
              </span>
              {x}
            </li>
          ))}
        </ul>
        <p className="mt-8 text-[16px] text-muted">
          Best for founders, owners and operations leads who know which work they&apos;d like off their plate.
        </p>
        <ContactAlternatives className="mt-10" showBook={false} />
      </div>
      {url ? (
        <Scheduler url={url} />
      ) : (
        <div className="grid content-start gap-5 rounded-[24px] bg-white p-[clamp(24px,4vw,48px)] shadow-float">
          <h2 className="text-[clamp(28px,1.5vw+20px,40px)]">
            Tell us a little first, <em>we&apos;ll set up the call.</em>
          </h2>
          <p className="text-muted">
            Send a short assessment request and we&apos;ll reply by email to arrange a time that suits you.
          </p>
          <Link href="/assessment" className="btn btn-primary w-fit">
            Request an assessment
          </Link>
        </div>
      )}
    </div>
  );
}
