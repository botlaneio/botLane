import Link from "next/link";
import { SYSTEMS, type System } from "@/content/systems";
import { Eyebrow, FaqSection, HireLane, PageHero, PageShell, Section, SectionHeading } from "./page/parts";
import { SystemFlow } from "./system-flow";
import { ToolTile } from "./tool-logo";

// One template for all three system pages:
// hero · how it works · tools it connects · what you approve · example output · FAQ · CTA.

function Shape({ shape }: { shape: System["shape"] }) {
  const s = { fill: "none", stroke: "#1d1d1f", strokeWidth: 1.6, strokeLinecap: "round" as const };
  return (
    <svg width="120" height="52" viewBox="0 0 120 52" aria-hidden="true">
      {shape === "Funnel" && (
        <>
          {[8, 20, 32, 44].map((y) => <path key={y} d={`M6 ${y} C40 ${y}, 50 26, 72 26`} {...s} stroke="#c7c7cc" />)}
          <path d="M72 26H104" {...s} />
          <circle cx="110" cy="26" r="6" fill="#e0312b" />
        </>
      )}
      {shape === "Line" && (
        <>
          <path d="M8 26H112" {...s} stroke="#c7c7cc" />
          {[14, 46, 78].map((x) => <circle key={x} cx={x} cy="26" r="5" fill="#fff" stroke="#1d1d1f" strokeWidth="1.6" />)}
          <circle cx="108" cy="26" r="6" fill="#e0312b" />
        </>
      )}
      {shape === "Loop" && (
        <>
          <ellipse cx="54" cy="26" rx="40" ry="18" {...s} stroke="#c7c7cc" />
          <circle cx="94" cy="26" r="6" fill="#e0312b" />
          <circle cx="14" cy="26" r="5" fill="#fff" stroke="#1d1d1f" strokeWidth="1.6" />
        </>
      )}
    </svg>
  );
}

/** Example output, drawn as the thing your client or lead actually receives. */
function ExampleOutput({ system }: { system: System }) {
  if (system.slug === "client-reporting") {
    const bars = [38, 52, 46, 64, 58, 76, 92];
    return (
      <div className="rounded-[22px] border border-line bg-white p-7 shadow-[0_18px_40px_rgba(20,20,40,0.06)]">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-mono text-xs text-muted">ACME CO · WEEK 41</div>
            <div className="mt-1 text-xl font-semibold tracking-[-0.02em]">Weekly client report</div>
          </div>
          <span className="rounded-full bg-[#e8f5ec] px-3 py-1 text-xs font-medium text-ok">Approved</span>
        </div>
        <div className="mt-6 flex h-28 items-end gap-2 border-b border-line">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: i === 6 ? "#e0312b" : i === 5 ? "#1d1d1f" : "#e4e5ea" }} />
          ))}
        </div>
        <p className="mt-5 text-[15px] leading-relaxed text-ink-2">
          “Leads were up again this week, driven by the new search campaign. Cost per lead fell, and two deals moved to proposal in
          HubSpot. Next week we’ll shift budget toward the best-performing ad set.”
        </p>
        <div className="mt-4 text-xs text-faint">Example only: the numbers and wording come from your tools and your edits.</div>
      </div>
    );
  }
  if (system.slug === "lead-follow-up") {
    const msgs = [
      { when: "Today", text: "Hi Sarah, thanks for getting in touch. Happy to help with this. Would Thursday at 10:30 or Friday at 2:00 work for a quick call?" },
      { when: "Day 2", text: "Just bumping this up in case it got buried. Those times still work on my side." },
      { when: "Day 5", text: "Checking in one last time. If now isn’t the right moment, no problem at all." },
    ];
    return (
      <div className="rounded-[22px] border border-line bg-white p-7 shadow-[0_18px_40px_rgba(20,20,40,0.06)]">
        <div className="font-mono text-xs text-muted">TO SARAH CHEN · 3 MESSAGES</div>
        <div className="mt-5 flex flex-col gap-4">
          {msgs.map((m) => (
            <div key={m.when} className="flex gap-4">
              <span className="w-14 flex-none pt-0.5 font-mono text-xs text-lane">{m.when.toUpperCase()}</span>
              <p className="rounded-2xl rounded-tl-sm bg-surface px-4 py-3 text-[15px] leading-relaxed text-ink-2">{m.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 text-xs text-faint">Example only: Lane writes in your tone, and you approve the run first.</div>
      </div>
    );
  }
  const steps = [
    { when: "Day 1", tone: "Friendly", text: "A quick reminder that invoice INV-2041 is now due. Here’s the link to pay." },
    { when: "Day 7", tone: "Clear", text: "INV-2041 is now a week overdue. Could you let us know when we can expect payment?" },
    { when: "Day 14", tone: "Firm", text: "INV-2041 is two weeks overdue. Please settle it this week using the link below." },
  ];
  return (
    <div className="rounded-[22px] border border-line bg-white p-7 shadow-[0_18px_40px_rgba(20,20,40,0.06)]">
      <div className="flex items-center justify-between">
        <div className="font-mono text-xs text-muted">INV-2041 · ACME CO</div>
        <span className="rounded-full bg-[#e8f5ec] px-3 py-1 text-xs font-medium text-ok">Paid · loop closed</span>
      </div>
      <div className="mt-5 flex flex-col gap-3">
        {steps.map((s) => (
          <div key={s.when} className="flex items-start gap-4 rounded-2xl border border-line px-4 py-3">
            <span className="w-14 flex-none pt-0.5 font-mono text-xs text-lane">{s.when.toUpperCase()}</span>
            <div>
              <div className="text-xs font-medium text-muted">{s.tone}</div>
              <p className="mt-0.5 text-[15px] leading-relaxed text-ink-2">{s.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 text-xs text-faint">Example only: you approve each reminder and set how firm it gets.</div>
    </div>
  );
}

export function SystemPage({ system }: { system: System }) {
  const others = SYSTEMS.filter((s) => s.slug !== system.slug);
  const tilt = system.slug === "client-reporting";
  return (
    <PageShell>
      <PageHero
        eyebrow={`${system.num} · ${system.shape} · ${system.title}`}
        title={
          <>
            {system.title}: <span className="text-muted">{system.tagline.toLowerCase().replace(/\.$/, "")}.</span>
          </>
        }
        lead={system.lead}
        secondary={{ href: "#how-it-works", label: "See how it works" }}
      />

      {/* The workflow: 3D on Client Reporting, flat on the others */}
      <div className="mx-auto max-w-[1200px] px-6 pb-8">
        <SystemFlow flow={system.flow} tilt={tilt} />
      </div>

      <Section id="how-it-works">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="How it works" title="Lane does the work. You give the OK." />
          <Shape shape={system.shape} />
        </div>
        <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {system.steps.map((s, i) => (
            <li key={s.title} className="rounded-[20px] border border-line bg-white p-6">
              <span className="font-mono text-xs text-lane">0{i + 1}</span>
              <h3 className="mt-2 text-lg font-semibold tracking-[-0.01em]">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="tools" className="border-t border-line">
        <SectionHeading eyebrow="Tools it connects" title="Works with what you already use." lead="Lane works through your existing accounts. No new platform for you or your clients." />
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {system.tools.map((t) => (
            <ToolTile key={t} tool={t} />
          ))}
        </div>
      </Section>

      <Section id="approve" className="border-t border-line">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading eyebrow="What you approve" title="Nothing goes out without your OK." />
            <ul className="mt-10 flex flex-col gap-5">
              {system.approve.map((a) => (
                <li key={a.title} className="flex gap-4">
                  <span className="mt-2 size-2 flex-none rounded-full bg-lane" />
                  <div>
                    <div className="text-lg font-semibold tracking-[-0.01em]">{a.title}</div>
                    <div className="mt-1 text-[15px] leading-relaxed text-muted">{a.body}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div id="example">
            <Eyebrow className="mb-4">Example output</Eyebrow>
            <ExampleOutput system={system} />
          </div>
        </div>
      </Section>

      <FaqSection items={system.faq} />

      <Section className="border-t border-line">
        <Eyebrow>The other two systems</Eyebrow>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {others.map((o) => (
            <Link
              key={o.slug}
              href={`/systems/${o.slug}`}
              className="group rounded-[20px] border border-line bg-white p-7 transition-shadow hover:shadow-[0_18px_40px_rgba(20,20,40,0.08)]"
            >
              <div className="font-mono text-xs text-lane">
                {o.num} · {o.shape.toUpperCase()}
              </div>
              <div className="mt-2 text-2xl font-semibold tracking-[-0.02em]">{o.title}</div>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{o.summary}</p>
              <div className="mt-4 text-sm font-medium group-hover:underline">See {o.title.toLowerCase()} →</div>
            </Link>
          ))}
        </div>
      </Section>

      <HireLane />
    </PageShell>
  );
}
