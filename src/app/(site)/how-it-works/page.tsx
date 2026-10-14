import type { Metadata } from "next";
import { StepArt } from "@/components/illustrations/step-art";
import { ClosingCta, CtaPair } from "@/components/site/cta";
import { Faq } from "@/components/site/faq";
import { processFaq, responsibilities, steps } from "@/content/process";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "From busywork to done: we design, implement and operate AI workflows around your existing tools, with human oversight at every step.",
};

function Mark({ on }: { on: boolean }) {
  return on ? (
    <span className="chip chip-ok">
      <span aria-hidden="true">✓</span> Yes
    </span>
  ) : (
    <span className="text-subtle">
      <span aria-hidden="true">–</span>
      <span className="sr-only">No</span>
    </span>
  );
}

export default function HowItWorksPage() {
  return (
    <>
      <section className="page-top relative overflow-hidden bg-[linear-gradient(to_bottom,#f8f6f3,#fff)] pb-[clamp(88px,10vw,160px)]" aria-labelledby="how-h">
        <div className="wrap relative flex flex-col items-center gap-6 text-center">
          <p className="eyebrow">A simple, controlled process</p>
          <h1 id="how-h">
            From busywork
            <br />
            to <em>done.</em>
          </h1>
          <p className="lead max-w-[48ch] text-ink/80">
            We design, implement and operate AI workflows around your existing tools, with human oversight at every step.
          </p>
          <p
            className="pointer-events-none absolute top-6 right-[max(var(--gutter),4%)] hidden -rotate-6 font-serif text-[22px] leading-tight text-subtle italic min-[1100px]:block"
            aria-hidden="true"
          >
            Same tools.
            <br />
            No stack migration.
          </p>
        </div>

        <ol className="wrap relative mt-[clamp(56px,7vw,96px)] grid gap-4 md:grid-cols-2 min-[1100px]:grid-cols-5">
          <svg
            className="pointer-events-none absolute inset-x-[var(--gutter)] top-0 hidden h-6 w-[calc(100%-2*var(--gutter))] min-[1100px]:block"
            viewBox="0 0 100 10"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M2 8 C 12 -2, 18 -2, 22 8 S 32 -2, 42 8 S 52 -2, 62 8 S 72 -2, 82 8 S 92 -2, 98 8" fill="none" stroke="#d8b9a6" strokeWidth="1" strokeDasharray="2 3" vectorEffect="non-scaling-stroke" />
          </svg>
          {steps.map((s, i) => (
            <li key={s.title} className="rv relative mt-3 flex flex-col gap-3 rounded-[20px] bg-white p-5 shadow-[0_0_0_1px_var(--line)]">
              <span className="text-[13px] text-subtle tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="font-sans text-[21px] font-medium tracking-[-0.01em]">{s.title}</h2>
              <p className="text-[15.5px] text-muted">{s.body}</p>
              <div className="mt-auto pt-3">
                <StepArt step={i} />
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="sec bg-fog" aria-labelledby="detail-h">
        <div className="wrap grid gap-12 min-[960px]:grid-cols-[0.8fr_1.2fr] min-[960px]:gap-24">
          <div>
            <h2 id="detail-h">
              What happens
              <br />
              <em>at each step.</em>
            </h2>
            <p className="lead mt-5">No step is skipped, and nothing goes live until you&apos;ve seen how it behaves.</p>
          </div>
          <ol className="grid">
            {steps.map((s, i) => (
              <li key={s.title} className="rv grid grid-cols-[48px_1fr] gap-4 border-t border-line py-7 last:border-b">
                <span className="font-serif text-[28px] leading-none text-terra">{i + 1}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p className="mt-2 max-w-[56ch] text-muted">{s.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sec" aria-labelledby="who-h">
        <div className="wrap">
          <h2 id="who-h" className="max-w-[16ch]">
            Who&apos;s responsible <em>for what.</em>
          </h2>
          <p className="lead mt-5">A managed partner means clear ownership. Here&apos;s the split.</p>
          <div className="rv mt-12 overflow-hidden rounded-[24px] shadow-[0_0_0_1px_var(--line)]">
            <table className="w-full border-collapse text-left text-[16px]">
              <thead className="bg-mist text-[14px] text-muted">
                <tr>
                  <th scope="col" className="px-6 py-4 font-medium">
                    Responsibility
                  </th>
                  <th scope="col" className="w-[22%] px-4 py-4 font-medium">
                    BotLane
                  </th>
                  <th scope="col" className="w-[22%] px-4 py-4 font-medium">
                    You
                  </th>
                </tr>
              </thead>
              <tbody>
                {responsibilities.map((r) => (
                  <tr key={r.task} className="border-t border-line">
                    <th scope="row" className="px-6 py-4 font-normal">
                      {r.task}
                    </th>
                    <td className="px-4 py-4">
                      <Mark on={r.botlane} />
                    </td>
                    <td className="px-4 py-4">
                      <Mark on={r.you} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <CtaPair className="mt-12" />
        </div>
      </section>

      <section className="sec bg-fog" aria-labelledby="faq-h">
        <div className="wrap grid gap-10 min-[960px]:grid-cols-[0.8fr_1.2fr] min-[960px]:gap-24">
          <h2 id="faq-h">Questions</h2>
          <Faq items={processFaq} />
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
