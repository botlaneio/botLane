"use client";

import { motion, useReducedMotion, type Transition } from "motion/react";
import { Bell, FileText, LayoutGrid, Mail, BarChart3, UserPlus, Send, CheckCheck } from "lucide-react";

const windowClass =
  "relative overflow-hidden rounded-[1.375rem] border border-line bg-white shadow-[0_2.5rem_5rem_-1.875rem_rgba(20,20,40,0.25)]";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Plays once on load; with reduced motion everything starts in place. */
function useEntrance() {
  const reduce = useReducedMotion();
  return (from: Record<string, number>, delay: number, duration = 0.7) => ({
    initial: reduce ? false : from,
    animate: { opacity: 1, x: 0, y: 0, scale: 1 },
    transition: { duration, delay, ease: EASE } satisfies Transition,
  });
}

const GHOSTS = [
  { x: -24, y: 24, className: "border-line/60 bg-white/50" },
  { x: -12, y: 12, className: "border-line/70 bg-white/70" },
  { x: 12, y: -12, className: "border-line/60 bg-white/60" },
];

/** The stacked copies behind a window fan out once the window has landed. */
function Ghosts({ delay }: { delay: number }) {
  const reduce = useReducedMotion();
  return (
    <>
      {GHOSTS.map((g, i) => (
        <motion.div
          key={i}
          aria-hidden
          className={`absolute inset-0 rounded-[1.375rem] border ${g.className}`}
          initial={reduce ? false : { x: 0, y: 0, opacity: 0 }}
          animate={{ x: g.x, y: g.y, opacity: 1 }}
          transition={{ duration: 0.8, delay: delay + i * 0.08, ease: EASE }}
        />
      ))}
    </>
  );
}

function Rail({ active }: { active: number }) {
  const icons = [FileText, Mail, LayoutGrid];
  return (
    <div className="flex flex-col items-center gap-3 border-r border-line px-3 py-5">
      <Bell className="size-4 text-faint" />
      {icons.map((Icon, i) => (
        <span
          key={i}
          className={`flex size-9 items-center justify-center rounded-[0.625rem] border ${
            i === active ? "border-lane bg-lane text-white" : "border-line bg-white text-muted"
          }`}
        >
          <Icon className="size-4" />
        </span>
      ))}
    </div>
  );
}

/** Sign-in illustration: the hero's workspace window, tilted and stacked, sized to stay inside its panel. */
export function SignInIllustration() {
  const enter = useEntrance();
  return (
    <div aria-hidden className="pointer-events-none w-full max-w-[33.75rem] select-none py-8 [perspective:100rem]">
      <motion.div {...enter({ opacity: 0, y: 40 }, 0.1, 0.9)}>
        <div className="relative [transform:rotateY(-14deg)_rotateX(6deg)_rotateZ(-4deg)] [transform-style:preserve-3d]">
          <Ghosts delay={0.6} />
          <div className={windowClass}>
            <div className="flex items-center gap-4 border-b border-line bg-surface/60 px-5 py-3.5">
              <div className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-neutral-300" />
                <span className="size-2.5 rounded-full bg-neutral-300" />
                <span className="size-2.5 rounded-full bg-neutral-300" />
              </div>
              <span className="text-[0.8125rem] text-muted">workspace.lane.ai</span>
            </div>
            <div className="flex">
              <Rail active={0} />
              <div className="min-w-0 flex-1 p-5">
                <motion.span
                  {...enter({ opacity: 0, x: -12 }, 0.5)}
                  className="inline-flex items-center gap-2 rounded-[0.625rem] bg-lane px-3 py-1.5 text-xs font-medium text-white shadow-[0_0.375rem_0.875rem_-0.375rem_rgba(90,44,184,0.7)]"
                >
                  <FileText className="size-3.5" />
                  Lane 01 · Reporting
                </motion.span>
                <motion.div {...enter({ opacity: 0, y: 12 }, 0.6)} className="mt-4 rounded-[1rem] border border-line p-4">
                  <div className="text-sm font-semibold text-ink">Weekly Executive Synthesis</div>
                  <div className="text-[0.6875rem] text-muted">Generated for Board & Client Leadership</div>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {[
                      ["4.21x", "ROAS", "+0.6x"],
                      ["$5,570", "Total spend", "On budget"],
                      ["$42.10", "CAC", "-14.2%"],
                    ].map(([value, label, delta], i) => (
                      <motion.div
                        key={label}
                        {...enter({ opacity: 0, y: 10, scale: 0.96 }, 0.8 + i * 0.1, 0.5)}
                        className="rounded-[0.75rem] border border-line px-2 py-3 text-center"
                      >
                        <div className="text-lg font-semibold tracking-tight text-ink">{value}</div>
                        <div className="text-[0.6875rem] text-muted">{label}</div>
                        <div className="mt-1 text-[0.6875rem] font-medium text-ok">{delta}</div>
                      </motion.div>
                    ))}
                  </div>
                  <ul className="mt-4 space-y-1.5 text-xs text-ink-2">
                    {[
                      "Retargeting efficiency scaled sharply after creative refresh.",
                      "Search brand defense maintained 91% impression share.",
                      "All assets reconciled and ready for sign-off.",
                    ].map((line, i) => (
                      <motion.li key={line} {...enter({ opacity: 0, x: -8 }, 1.1 + i * 0.1, 0.5)} className="flex items-start gap-2">
                        <span className="mt-[0.4375rem] size-1 shrink-0 rounded-full bg-lane" />
                        {line}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const LANES = [
  {
    num: "01",
    title: "Client Reporting",
    text: "Automated reports, insights and stakeholder updates.",
    icon: FileText,
    tone: "bg-lane/10 text-lane",
  },
  {
    num: "02",
    title: "Lead Intake",
    text: "Capture, qualify and route leads automatically.",
    icon: Mail,
    tone: "bg-surface text-ink-2",
  },
  {
    num: "03",
    title: "AR Recovery",
    text: "Follow up on invoices and collect receivables.",
    icon: BarChart3,
    tone: "bg-surface text-ink-2",
  },
];

const ACTIVITY = [
  { icon: UserPlus, title: "New lead from website", who: "Acme Corp", when: "2 min ago" },
  { icon: Send, title: "Follow-up email sent", who: "Beta Systems", when: "12 min ago" },
  { icon: CheckCheck, title: "Qualified and routed", who: "Orbit Retail", when: "28 min ago" },
];

/** Sign-up illustration: the three lanes, then a tilted Lead Intake card that stays inside its panel. */
export function SignUpIllustration() {
  const enter = useEntrance();
  return (
    <div className="w-full max-w-[28.75rem] select-none">
      <ul className="space-y-6">
        {LANES.map((lane, i) => {
          const Icon = lane.icon;
          return (
            <motion.li key={lane.num} {...enter({ opacity: 0, x: -16 }, 0.1 + i * 0.12, 0.6)} className="flex items-start gap-5">
              <span className={`flex size-12 shrink-0 items-center justify-center rounded-[0.875rem] ${lane.tone}`}>
                <Icon className="size-5" />
              </span>
              <div>
                <div className="text-xs text-muted">Lane {lane.num}</div>
                <div className="text-base font-semibold tracking-[-0.01em] text-ink">{lane.title}</div>
                <div className="mt-1 text-[0.8125rem] leading-snug text-muted">{lane.text}</div>
              </div>
            </motion.li>
          );
        })}
      </ul>

      <div aria-hidden className="pointer-events-none mt-12 pr-6 pb-8 pl-8 [perspective:87.5rem]">
        <motion.div {...enter({ opacity: 0, y: 40 }, 0.5, 0.9)}>
          <div className="relative [transform:rotateY(-14deg)_rotateX(6deg)_rotateZ(4deg)] [transform-style:preserve-3d]">
            <Ghosts delay={1} />
            <div className={windowClass}>
              <div className="flex">
                <Rail active={1} />
                <div className="min-w-0 flex-1 p-4">
                  <div className="text-sm font-semibold text-ink">Lane 02 · Lead Intake</div>
                  <div className="mt-3 space-y-2">
                    {ACTIVITY.map((row, i) => {
                      const Icon = row.icon;
                      return (
                        <motion.div
                          key={row.title}
                          {...enter({ opacity: 0, y: 10 }, 0.9 + i * 0.12, 0.5)}
                          className="flex items-center gap-3 rounded-[0.75rem] border border-line p-3"
                        >
                          <span className="flex size-8 items-center justify-center rounded-full bg-surface text-ink">
                            <Icon className="size-4" />
                          </span>
                          <div>
                            <div className="text-xs font-medium text-ink">{row.title}</div>
                            <div className="text-[0.625rem] text-muted">{row.who}</div>
                            <div className="text-[0.625rem] text-faint">{row.when}</div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
