import Link from "next/link";
import { HomeHero } from "@/components/hero/home-hero";
import { SolutionArt } from "@/components/illustrations/solution-art";
import { ClosingCta } from "@/components/site/cta";
import { solutions } from "@/content/solutions";

const pillars = [
  {
    title: "Designed for your business",
    body: "We start from how the work runs today and agree exactly what Lane should and shouldn't do.",
  },
  {
    title: "Operated by us",
    body: "We monitor, fix and improve every workflow. There's no AI infrastructure for you to look after.",
  },
  {
    title: "Approved by you",
    body: "Reports, replies and reminders wait for your OK. Nothing goes out in your name without it.",
  },
];

const controls = [
  { title: "Approval before anything is sent", body: "Every report, reply and reminder waits for you until you say yes.", href: "/safeguards#approval" },
  { title: "Every figure shows its source", body: "See exactly which tool a number came from before you approve it.", href: "/safeguards#sources" },
  { title: "Pause everything in one click", body: "Stop outgoing work instantly, for one client or all of them.", href: "/safeguards#pause" },
  { title: "Your data stays yours", body: "It isn't used to train public AI models, and you can revoke access any time.", href: "/safeguards#data" },
];

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <section className="sec" aria-labelledby="partner-h">
        <div className="wrap rv flex flex-col items-center gap-6 text-center">
          <h2 id="partner-h">
            A managed partner,
            <br />
            <em>not another tool to manage.</em>
          </h2>
          <p className="lead max-w-[46ch]">
            We design the workflow, connect it to your tools, and run it for you. You make the calls that matter.
          </p>
          <div className="mt-[clamp(48px,7vw,104px)] grid gap-14 text-left md:grid-cols-3 md:gap-12">
            {pillars.map((p) => (
              <div key={p.title}>
                <h3>{p.title}</h3>
                <p className="mt-2.5 max-w-[34ch] text-muted">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec bg-fog" aria-labelledby="solutions-h">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Our solutions</p>
              <h2 id="solutions-h" className="mt-4">
                Workflows we
                <br />
                <em>run for you.</em>
              </h2>
            </div>
            <Link href="/solutions" className="arrow text-[16px]">
              Explore all solutions
            </Link>
          </div>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((s) => (
              <Link
                key={s.slug}
                href={`/solutions/${s.slug}`}
                className="rv group flex flex-col gap-3 rounded-[24px] bg-white p-6 no-underline shadow-[inset_0_0_0_1px_var(--line)] transition-[transform,box-shadow] duration-300 hover:-translate-y-[3px] hover:shadow-float"
              >
                <SolutionArt slug={s.slug} className="mb-3 shadow-[0_0_0_1px_var(--line)]" />
                <h3>{s.name}</h3>
                <p className="text-[16px] text-muted">{s.summary}</p>
                <span className="arrow mt-auto pt-2 text-[15.5px]">Learn more</span>
              </Link>
            ))}
            <Link
              href="/assessment"
              className="rv flex flex-col gap-3 rounded-[24px] bg-mist p-6 no-underline transition-[transform,box-shadow] duration-300 hover:-translate-y-[3px] hover:shadow-float"
            >
              <div className="mb-3 grid h-[132px] place-items-center rounded-[16px] bg-white text-[34px] font-light text-subtle" aria-hidden="true">
                +
              </div>
              <h3>Your workflow</h3>
              <p className="text-[16px] text-muted">Tell us what&apos;s repetitive. We&apos;ll say honestly whether it&apos;s a good fit.</p>
              <span className="arrow mt-auto pt-2 text-[15.5px]">Request an assessment</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="sec" aria-labelledby="control-h">
        <div className="wrap grid items-center gap-12 min-[960px]:grid-cols-2 min-[960px]:gap-24">
          <div>
            <h2 id="control-h">
              Built for control,
              <br />
              <em>not autonomy.</em>
            </h2>
            <p className="lead mt-5">
              The risk of automation is losing sight of what goes out in your name. Every part of Lane is designed around that.
            </p>
            <Link href="/safeguards" className="arrow mt-7 text-[16px]">
              See all safeguards
            </Link>
          </div>
          <div className="rv grid">
            {controls.map((c) => (
              <Link
                key={c.title}
                href={c.href}
                className="group grid grid-cols-[1fr_auto] items-center gap-4 border-t border-line py-6 no-underline last:border-b"
              >
                <span>
                  <h3>{c.title}</h3>
                  <span className="mt-1.5 block max-w-[44ch] text-[16px] text-muted">{c.body}</span>
                </span>
                <span className="text-[22px] transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-[clamp(88px,10vw,168px)]" aria-labelledby="principle-h">
        <div className="wrap">
          <div className="rv grid items-center gap-10 rounded-[28px] bg-peach p-[clamp(32px,5vw,72px)] text-sienna min-[900px]:grid-cols-[1.4fr_1fr]">
            <figure className="m-0">
              <blockquote>
                <h2 id="principle-h" className="text-[clamp(30px,1.6vw+24px,46px)] text-sienna">
                  &ldquo;Automation should take work off your plate, not take decisions out of your hands.&rdquo;
                </h2>
              </blockquote>
              <figcaption className="mt-5 text-[15px]">The BotLane approval principle</figcaption>
            </figure>
            <div className="flex flex-col gap-3.5 rounded-[20px] bg-white p-6 text-ink shadow-float">
              <h3>Scoped to your workflow</h3>
              <ul className="grid list-disc gap-1.5 pl-[18px] text-[16px] text-muted">
                <li>Start with an assessment of one process</li>
                <li>Get a written recommendation and a clear proposal</li>
                <li>We build it, run it and maintain it</li>
              </ul>
              <div className="mt-1.5 flex flex-wrap gap-2">
                <Link href="/assessment" className="btn btn-primary">
                  Request an assessment
                </Link>
                <Link href="/pricing" className="btn btn-ghost">
                  How pricing works
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
