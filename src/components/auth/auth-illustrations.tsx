import { Bell, FileText, LayoutGrid, Mail, BarChart3, UserPlus, Send, CheckCheck } from "lucide-react";

const windowClass =
  "relative overflow-hidden rounded-[22px] border border-line bg-white shadow-[0_40px_80px_-30px_rgba(20,20,40,0.25)]";

function Ghosts() {
  return (
    <>
      <div aria-hidden className="absolute inset-0 -translate-x-8 translate-y-8 rounded-[22px] border border-line/60 bg-white/50" />
      <div aria-hidden className="absolute inset-0 -translate-x-4 translate-y-4 rounded-[22px] border border-line/70 bg-white/70" />
      <div aria-hidden className="absolute inset-0 translate-x-4 -translate-y-4 rounded-[22px] border border-line/60 bg-white/60" />
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
          className={`flex size-9 items-center justify-center rounded-[10px] border ${
            i === active ? "border-lane bg-lane text-white" : "border-line bg-white text-muted"
          }`}
        >
          <Icon className="size-4" />
        </span>
      ))}
    </div>
  );
}

/** Sign-in illustration: the hero's workspace window, tilted and stacked, running off the right edge. */
export function SignInIllustration() {
  return (
    <div aria-hidden className="pointer-events-none select-none pt-6 [perspective:1600px]">
      <div className="relative w-[640px] origin-left [transform:rotateY(-22deg)_rotateX(8deg)_rotateZ(-7deg)] [transform-style:preserve-3d]">
        <Ghosts />
        <div className={windowClass}>
          <div className="flex items-center gap-4 border-b border-line bg-surface/60 px-5 py-3.5">
            <div className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-neutral-300" />
              <span className="size-2.5 rounded-full bg-neutral-300" />
              <span className="size-2.5 rounded-full bg-neutral-300" />
            </div>
            <span className="text-[13px] text-muted">workspace.lane.ai</span>
          </div>
          <div className="flex">
            <Rail active={0} />
            <div className="flex-1 p-5">
              <span className="inline-flex items-center gap-2 rounded-[10px] bg-lane px-3 py-1.5 text-xs font-medium text-white shadow-[0_6px_14px_-6px_rgba(224,49,43,0.7)]">
                <FileText className="size-3.5" />
                Lane 01 · Reporting
              </span>
              <div className="mt-4 rounded-[16px] border border-line p-4">
                <div className="text-sm font-semibold text-ink">Weekly Executive Synthesis</div>
                <div className="text-[11px] text-muted">Generated for Board & Client Leadership</div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[
                    ["4.21x", "ROAS", "+0.6x"],
                    ["$5,570", "Total spend", "On budget"],
                    ["$42.10", "CAC", "-14.2%"],
                  ].map(([value, label, delta]) => (
                    <div key={label} className="rounded-[12px] border border-line px-2 py-3 text-center">
                      <div className="text-lg font-semibold tracking-tight text-ink">{value}</div>
                      <div className="text-[11px] text-muted">{label}</div>
                      <div className="mt-1 text-[11px] font-medium text-ok">{delta}</div>
                    </div>
                  ))}
                </div>
                <ul className="mt-4 space-y-1.5 text-xs text-ink-2">
                  {[
                    "Retargeting efficiency scaled sharply after creative refresh.",
                    "Search brand defense maintained 91% impression share.",
                    "All assets reconciled and ready for sign-off.",
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-2">
                      <span className="mt-[7px] size-1 shrink-0 rounded-full bg-lane" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
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

/** Sign-up illustration: the three lanes, then a tilted Lead Intake card below them. */
export function SignUpIllustration() {
  return (
    <div className="select-none">
      <ul className="max-w-[340px] space-y-8 pt-2">
        {LANES.map((lane) => {
          const Icon = lane.icon;
          return (
            <li key={lane.num} className="flex items-start gap-5">
              <span className={`flex size-[52px] shrink-0 items-center justify-center rounded-[14px] ${lane.tone}`}>
                <Icon className="size-5" />
              </span>
              <div>
                <div className="text-xs text-muted">Lane {lane.num}</div>
                <div className="text-base font-semibold tracking-[-0.01em] text-ink">{lane.title}</div>
                <div className="mt-1 text-[13px] leading-snug text-muted">{lane.text}</div>
              </div>
            </li>
          );
        })}
      </ul>

      <div aria-hidden className="pointer-events-none mt-10 ml-6 [perspective:1400px]">
        <div className="relative w-[440px] origin-left [transform:rotateY(-24deg)_rotateX(10deg)_rotateZ(7deg)] [transform-style:preserve-3d]">
          <Ghosts />
          <div className={windowClass}>
            <div className="flex">
              <Rail active={1} />
              <div className="flex-1 p-4">
                <div className="text-sm font-semibold text-ink">Lane 02 · Lead Intake</div>
                <div className="mt-3 space-y-2">
                  {ACTIVITY.map((row) => {
                    const Icon = row.icon;
                    return (
                      <div key={row.title} className="flex items-center gap-3 rounded-[12px] border border-line p-3">
                        <span className="flex size-8 items-center justify-center rounded-full bg-surface text-ink">
                          <Icon className="size-4" />
                        </span>
                        <div>
                          <div className="text-xs font-medium text-ink">{row.title}</div>
                          <div className="text-[10px] text-muted">{row.who}</div>
                          <div className="text-[10px] text-faint">{row.when}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
