import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronDown, FileCheck2, Info, ShieldCheck, UserCheck } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ReleaseStory } from "@/components/release-standard/release-story";
import { GATE_OUTCOMES, RELEASE_PHASES } from "@/components/trust/release-gates";

export const metadata: Metadata = {
  title: "12-Gate Release Standard | BotLane",
  description:
    "The twelve gates, in four phases, that a BotLane release must clear before it reaches production, and the evidence each gate expects.",
};

const PRINCIPLES = [
  {
    icon: FileCheck2,
    title: "Evidence, not assertions",
    text: "Every gate is judged on evidence tied to the exact repository, commit, artifact, environment and policy version being released.",
  },
  {
    icon: ShieldCheck,
    title: "Missing means blocked",
    text: "Missing, stale or failed evidence never quietly becomes a pass. A gate that doesn't apply needs a reviewed equivalent or an approved exception.",
  },
  {
    icon: UserCheck,
    title: "People authorize production",
    text: "Approving a release's quality and authorizing its deployment are separate human decisions. Irreversible steps always need a person's sign-off.",
  },
];

const OUTCOME_TONE: Record<string, string> = {
  ok: "border-ok/25 bg-ok/5 text-ok",
  lane: "border-lane/25 bg-lane/5 text-lane",
  neutral: "border-line bg-surface text-ink-2",
};

export default function ReleaseStandardPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-bg">
        {/* Intro */}
        <section className="mx-auto max-w-[75rem] px-6 pt-16 pb-14 sm:pt-24">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-1.5 font-mono text-xs text-muted transition hover:text-ink"
          >
            <ArrowLeft size={13} />
            <span>Back to BotLane home</span>
          </Link>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-lane">
              <span className="size-1.5 rounded-full bg-lane-gradient" />
              <span>Trust · Release Standard</span>
            </div>
            <h1 className="mt-4 text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-ink">
              The 12-Gate Release Standard
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
              A working demo is not a production release. This standard sets out twelve gates, grouped in
              four phases, that a BotLane release has to clear. Each gate says what it checks, what evidence
              it expects, and when it rejects a release.
            </p>
            <div className="mt-3 font-mono text-xs text-faint">Last updated October 15, 2026</div>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {PRINCIPLES.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-[1.25rem] border border-line bg-white p-6">
                <div className="flex size-10 items-center justify-center rounded-[0.625rem] border border-line bg-surface text-ink">
                  <Icon size={19} />
                </div>
                <h2 className="mt-5 text-lg font-semibold tracking-[-0.02em] text-ink">{title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The standard, walked through as a scroll story */}
        <ReleaseStory />

        {/* Full gate reference: the story shows the gates; this keeps the reject rules and platform notes */}
        <section aria-labelledby="gate-reference" className="mx-auto max-w-[75rem] border-t border-line px-6 py-14 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
            <div>
              <div className="font-mono text-xs font-semibold uppercase tracking-wider text-lane">Reference</div>
              <h2
                id="gate-reference"
                className="mt-2 text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-ink"
              >
                Full gate reference
              </h2>
              <p className="mt-2 text-sm text-muted">
                Open any gate for the evidence it expects and what gets a release rejected.
              </p>
            </div>

            <div className="space-y-6">
              {RELEASE_PHASES.map((phase) => (
                <div key={phase.name}>
                  <div className="mb-2 font-mono text-[0.6875rem] font-semibold uppercase tracking-wider text-faint">
                    Phase {phase.numeral} · <span className="text-ink-2">{phase.name}</span>
                  </div>
                  <div className="divide-y divide-line overflow-hidden rounded-[1rem] border border-line bg-white">
                    {phase.gates.map((gate) => (
                      <details key={gate.id} id={gate.id} className="group">
                        <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-3.5 [&::-webkit-details-marker]:hidden">
                          <span className="font-mono text-sm font-semibold text-lane">{gate.number}</span>
                          <span className="flex-1 text-[0.9375rem] font-semibold tracking-[-0.01em] text-ink">{gate.title}</span>
                          <ChevronDown
                            size={18}
                            aria-hidden
                            className="shrink-0 text-faint transition-transform group-open:rotate-180"
                          />
                        </summary>

                        <div className="grid gap-5 px-5 pt-1 pb-5 sm:grid-cols-2 sm:pl-[3.25rem]">
                          <p className="text-sm leading-relaxed text-muted sm:col-span-2">{gate.purpose}</p>
                          <div>
                            <div className="font-mono text-[0.6875rem] font-semibold uppercase tracking-wider text-ink">
                              Evidence expected
                            </div>
                            <ul className="mt-2.5 space-y-1.5">
                              {gate.evidence.map((item) => (
                                <li key={item} className="flex items-start gap-2 text-sm text-ink-2">
                                  <span className="mt-2 size-1 shrink-0 rounded-full bg-ink-2" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <div className="font-mono text-[0.6875rem] font-semibold uppercase tracking-wider text-lane">
                                Rejected if
                              </div>
                              <p className="mt-2.5 text-sm leading-relaxed text-ink-2">{gate.rejectIf}</p>
                            </div>
                            {gate.platformNote && (
                              <div className="rounded-[0.75rem] border border-line bg-surface/60 p-3.5 text-xs leading-relaxed text-muted">
                                <span className="font-semibold text-ink">Platform note: </span>
                                {gate.platformNote}
                              </div>
                            )}
                          </div>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Outcomes */}
        <section className="mx-auto max-w-[75rem] border-t border-line px-6 py-16 sm:py-20">
          <div className="max-w-2xl">
            <div className="font-mono text-xs font-semibold uppercase tracking-wider text-lane">Gate outcomes</div>
            <h2 className="mt-2 text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-ink">
              Every gate records one of six outcomes.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              Outcomes belong to one release: one commit, one artifact, one environment. A result from an
              earlier version never carries over.
            </p>
          </div>

          <dl className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {GATE_OUTCOMES.map((outcome) => (
              <div key={outcome.label} className="rounded-[1rem] border border-line bg-white p-5">
                <dt>
                  <span
                    className={`inline-block rounded-full border px-2.5 py-0.5 font-mono text-[0.625rem] font-semibold uppercase tracking-wider ${OUTCOME_TONE[outcome.tone]}`}
                  >
                    {outcome.label}
                  </span>
                </dt>
                <dd className="mt-3 text-sm leading-relaxed text-muted">{outcome.text}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex items-start gap-3 rounded-[1rem] border border-line bg-surface/50 p-5 text-sm text-ink-2">
            <Info size={18} className="mt-0.5 shrink-0 text-muted" />
            <p>
              <strong className="text-ink">What this page is.</strong> It describes the standard and the
              evidence each gate expects. It is not a report on any particular release, and nothing on it
              should be read as a pass result. Any illustration elsewhere on this site that shows gate
              results is labelled as illustrative.
            </p>
          </div>

          <div className="mt-8">
            <Link
              href="/company/contact"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-lane hover:underline"
            >
              <span>Questions about how we release? Get in touch</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
