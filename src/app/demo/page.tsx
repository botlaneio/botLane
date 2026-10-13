import type { Metadata } from "next";
import { Eyebrow, PageHero, PageShell } from "@/components/page/parts";

export const metadata: Metadata = {
  title: "Book a demo — BotLane",
  description: "See Lane run your client reporting, lead follow-up or invoice follow-up. Pick a time that suits you.",
};

// The booking calendar: set NEXT_PUBLIC_DEMO_CALENDAR_URL to your scheduling link's embed URL
// (Cal.com, Calendly, Google Calendar appointment page…). Until it is set, the page shows the phone line.
const CALENDAR_URL = process.env.NEXT_PUBLIC_DEMO_CALENDAR_URL;
const PHONE = { display: "+1 (307) 218-5175", tel: "+13072185175" };

const EXPECT = [
  { title: "A short video call", body: "No preparation needed." },
  { title: "About your week", body: "Which work eats your time, and which tools it lives in." },
  { title: "Lane on your work", body: "We show the system that fits, using examples like yours." },
  { title: "A clear next step", body: "What setup looks like, and what it would cost." },
];

export default function DemoPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Book a demo"
        title="See Lane do your work."
        lead="Pick a time that suits you. We’ll look at the work that eats your week and show you Lane doing it."
        actions={false}
      />
      <section className="mx-auto grid max-w-[1200px] gap-10 px-6 pb-24 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <Eyebrow>What to expect</Eyebrow>
          <ul className="mt-6 flex flex-col gap-6">
            {EXPECT.map((e) => (
              <li key={e.title} className="flex gap-4">
                <span className="mt-2 size-2 flex-none rounded-full bg-lane" />
                <div>
                  <div className="text-lg font-semibold tracking-[-0.01em]">{e.title}</div>
                  <div className="mt-1 text-[15px] leading-relaxed text-muted">{e.body}</div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-10 border-t border-line pt-6 text-[15px] text-muted">
            Rather talk now? Call{" "}
            <a href={`tel:${PHONE.tel}`} className="font-medium text-ink hover:underline">
              {PHONE.display}
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-[24px] border border-line bg-white shadow-[0_18px_40px_rgba(20,20,40,0.06)]">
          {CALENDAR_URL ? (
            <iframe title="Book a demo with BotLane" src={CALENDAR_URL} className="h-[720px] w-full border-0" loading="lazy" />
          ) : (
            <div className="flex h-full min-h-[480px] flex-col items-center justify-center gap-4 bg-[linear-gradient(#ffffff,#f5f5f7)] px-8 py-16 text-center">
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-faint">Calendar</span>
              <p className="max-w-[360px] text-lg leading-relaxed text-ink">Online booking opens soon.</p>
              <p className="max-w-[360px] text-[15px] leading-relaxed text-muted">
                In the meantime, call us and we’ll find a time together.
              </p>
              <a
                href={`tel:${PHONE.tel}`}
                className="mt-2 inline-flex h-12 items-center rounded-[8px] bg-lane-strong px-6 text-base font-medium text-white hover:bg-lane-ink"
              >
                Call {PHONE.display}
              </a>
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
