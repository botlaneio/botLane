import { Eye, History, PauseCircle, ShieldCheck } from "lucide-react";
import { LaneMarkCycle } from "./lane-mark-cycle";

// Home: "You stay in control."
const PRINCIPLES = [
  {
    icon: ShieldCheck,
    title: "Nothing sends without your OK",
    description: "Lane prepares the report, the reply or the reminder, and waits. You approve it, change it or send it back.",
  },
  {
    icon: Eye,
    title: "You can see why",
    description: "Every draft shows where its numbers came from and why Lane is suggesting the next step.",
  },
  {
    icon: PauseCircle,
    title: "Pause any time",
    description: "Stop a system, a client or a single run whenever you like. Lane picks up where you left off.",
  },
  {
    icon: History,
    title: "Every send on the record",
    description: "A clear history of what Lane prepared, what you approved and what went out.",
  },
];

export function About() {
  return (
    <section id="control" className="mx-auto max-w-[1200px] scroll-mt-24 px-6 pt-24 pb-20">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.08em] text-lane">
            <span className="size-[7px] rounded-full bg-lane" />
            <span>You stay in control</span>
          </div>

          <h2 className="mt-4 text-[clamp(32px,4vw,52px)] leading-[1.05] font-semibold tracking-[-0.04em] text-ink">
            Not a chatbot. <br />
            An AI coworker who prepares the work.
          </h2>

          <p className="mt-5 text-base leading-relaxed text-muted">
            Most AI tools hand you a blank prompt box. Lane does the opposite: it watches for the work, does it, and queues it
            on your desk for a yes.
          </p>

          <p className="mt-4 text-base leading-relaxed text-muted">
            You give the final OK and Lane delivers. You stay the person your clients know, without the busywork.
          </p>

          <div className="mt-8 flex items-center gap-4 border-t border-line pt-6">
            <LaneMarkCycle size={36} />
            <div>
              <div className="text-sm font-semibold text-ink">Built for lean teams</div>
              <div className="text-xs text-muted">Agencies, consultancies and service businesses</div>
            </div>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
          {PRINCIPLES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-[20px] border border-line bg-surface/40 p-6 transition-all hover:bg-white hover:shadow-[0_12px_32px_rgba(20,20,40,0.05)]"
              >
                <div className="flex size-10 items-center justify-center rounded-xl border border-line/60 bg-white text-ink shadow-sm">
                  <Icon size={20} className="text-lane" />
                </div>
                <h3 className="mt-4 text-base font-semibold tracking-tight text-ink">{item.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
