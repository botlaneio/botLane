import {
  Activity,
  ArrowDown,
  ArrowUp,
  Circle,
  CircleCheck,
  Copy,
  Ellipsis,
  GitBranch,
  Inbox,
  LayoutGrid,
  Link2,
  Maximize2,
  Minus,
  Plug,
  Search,
  SquarePen,
  Star,
  X,
} from "lucide-react";
import { brandMarks } from "@/components/brand-marks";
import { BotlaneMark } from "@/components/BotlaneMark";
import { BotlaneWordmark } from "@/components/BotlaneWordmark";
import { InView } from "@/components/motion/InView";

export function HeroConsole() {
  const nav = [
    { Icon: Activity, label: "Pulse" },
    { Icon: Inbox, label: "Inbox" },
    { Icon: CircleCheck, label: "My approvals" },
    { Icon: GitBranch, label: "Runs" },
  ];

  const workspace = [
    { Icon: LayoutGrid, label: "Systems" },
    { Icon: Plug, label: "Connections" },
    { Icon: Ellipsis, label: "More" },
  ];

  const favorites = [
    { label: "Weekly client report", tone: "var(--color-ember)", active: true },
    { label: "Lead follow-up", tone: "var(--color-signal-teal)" },
    { label: "Invoice follow-up", tone: "var(--color-pulse-green)" },
  ];

  const connectors = ["gmail", "drive", "hubspot", "quickbooks"] as const;

  return (
    <div className="hero-console relative z-[1] overflow-hidden rounded-[0.625rem]">
      <div className="grid min-h-[26.25rem] md:grid-cols-[11.625rem_1fr]">
        {/* ---------------- Workspace rail ---------------- */}
        <aside
          className="hero-console__rail hidden flex-col p-2.5 md:flex"
        >
          <div className="mb-4 flex items-center gap-2 px-1.5 py-1">
            <BotlaneMark size={16} />
            <BotlaneWordmark size={13} className="text-paper" />
            <span className="ml-auto flex items-center gap-1.5 text-ash">
              <Search size={13} strokeWidth={1.5} />
              <SquarePen size={13} strokeWidth={1.5} />
            </span>
          </div>

          <div className="space-y-px">
            {nav.map(({ Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2.5 rounded-md px-1.5 py-1.5 text-[0.8125rem] text-fog"
              >
                <Icon size={14} strokeWidth={1.5} className="shrink-0 text-ash" />
                <span className="truncate">{label}</span>
              </div>
            ))}
          </div>

          <p className="mt-4 mb-1 px-1.5 text-[0.6875rem] text-ash" style={{ fontWeight: 510 }}>
            Workspace
          </p>
          <div className="space-y-px">
            {workspace.map(({ Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2.5 rounded-md px-1.5 py-1.5 text-[0.8125rem] text-fog"
              >
                <Icon size={14} strokeWidth={1.5} className="shrink-0 text-ash" />
                <span className="truncate">{label}</span>
              </div>
            ))}
          </div>

          <p className="mt-4 mb-1 px-1.5 text-[0.6875rem] text-ash" style={{ fontWeight: 510 }}>
            Favorites
          </p>
          <div className="space-y-px">
            {favorites.map((f) => (
              <div
                key={f.label}
                className={`flex items-center gap-2.5 rounded-md px-1.5 py-1.5 text-[0.8125rem] ${
                  f.active ? "row-live bg-white/[0.055] text-paper" : "text-fog"
                }`}
              >
                <Circle
                  size={10}
                  strokeWidth={2}
                  className="shrink-0"
                  style={{ color: f.tone }}
                />
                <span className="truncate">{f.label}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* ---------------- Record ---------------- */}
        <div className="relative min-w-0">
          <div
            className="flex items-center gap-2 px-4 py-2.5 md:px-6"
            style={{ borderBottom: "1px solid var(--glass-divider)" }}
          >
            <span className="live-dot shrink-0" style={{ color: "var(--color-ember)" }}>
              <Circle size={12} strokeWidth={2} />
            </span>
            <span className="mono shrink-0 text-[0.75rem] text-fog">OPS&#8209;1842</span>
            <span className="truncate text-[0.8125rem] text-mist">Weekly client report</span>
            <Star
              size={12}
              strokeWidth={1.5}
              className="shrink-0"
              style={{ color: "var(--color-amber)", fill: "var(--color-amber)" }}
            />
            <Ellipsis size={14} strokeWidth={1.5} className="shrink-0 text-ash" />
            <span className="mono ml-auto hidden shrink-0 items-center gap-1.5 text-[0.6875rem] text-ash sm:flex">
              <span>1 / 84</span>
              <ArrowUp size={12} strokeWidth={1.5} />
              <ArrowDown size={12} strokeWidth={1.5} />
            </span>
          </div>

          <div className="flex items-center justify-end gap-2.5 px-4 pt-3 text-ash md:px-6">
            <Link2 size={14} strokeWidth={1.5} />
            <Copy size={14} strokeWidth={1.5} />
            <GitBranch size={14} strokeWidth={1.5} />
          </div>

          <div className="px-4 pt-1 pb-5 md:px-6">
            <h3
              className="mb-2 text-[1.3125rem] tracking-[-0.014em] text-paper"
              style={{ fontWeight: 590, lineHeight: 1.25 }}
            >
              Weekly client report
            </h3>
            <p className="mb-4 max-w-[54ch] text-[0.8438rem] leading-[1.6] text-mist">
              Draft and route the summary once{" "}
              <code
                className="mono rounded-[0.25rem] px-1.5 py-0.5 text-[0.75rem] text-fog"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid var(--glass-divider)",
                }}
              >
                sources_ready
              </code>{" "}
              reports in, instead of blocking on the full month&#8209;end close.
            </p>

            {/* Connectors this run reads from */}
            <div className="mb-6 flex flex-wrap items-center gap-1.5">
              {connectors.map((key) => {
                const mark = brandMarks[key];
                return (
                  <span
                    key={key}
                    className="flex items-center gap-1.5 rounded-[0.3125rem] py-1 pr-2 pl-1.5 text-[0.7188rem] text-fog"
                    style={{ border: "1px solid var(--glass-divider)" }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="12"
                      height="12"
                      fill={mark.hex}
                      aria-hidden="true"
                      className="shrink-0"
                    >
                      <path d={mark.path} />
                    </svg>
                    {mark.title}
                  </span>
                );
              })}
            </div>

            <p
              className="mb-3 text-[0.9375rem] text-paper"
              style={{ fontWeight: 560, letterSpacing: "-0.008em" }}
            >
              Activity
            </p>

            <div className="mb-4 space-y-2">
              <div className="flex items-start gap-2 text-[0.7812rem] leading-[1.5] text-ash">
                <span className="mt-0.5 size-4 shrink-0 rounded-full bg-white/[0.12]" />
                <span>
                  <span className="text-fog">botLane</span> created the run via{" "}
                  <span className="text-fog">Schedule</span> on behalf of{" "}
                  <span className="text-fog">A. Chen</span> · 2min ago
                </span>
              </div>
              <div className="flex items-start gap-2 text-[0.7812rem] leading-[1.5] text-ash">
                <span className="mt-0.5 size-4 shrink-0 rounded-[0.25rem] bg-white/[0.08]" />
                <span>
                  <span className="text-fog">Triage</span> added the labels{" "}
                  <span className="text-fog">Reporting</span> and{" "}
                  <span className="text-fog">Client</span> · 2min ago
                </span>
              </div>
            </div>

            <div
              className="space-y-3 rounded-lg p-3"
              style={{ border: "1px solid var(--glass-divider)" }}
            >
              <div>
                <p className="mb-1 flex items-center gap-2 text-[0.7812rem] text-ash">
                  <span className="size-4 shrink-0 rounded-full bg-white/[0.12]" />
                  <span className="text-mist">a.chen</span> · 4 min ago
                </p>
                <p className="pl-6 text-[0.8125rem] leading-[1.55] text-mist">
                  The summary lands after the client call, so we look a week behind…
                </p>
              </div>
              <div style={{ borderTop: "1px solid var(--glass-divider)" }} className="pt-3">
                <p className="mb-1 flex items-center gap-2 text-[0.7812rem] text-ash">
                  <span className="size-4 shrink-0 rounded-full bg-white/[0.08]" />
                  <span className="text-mist">j.rivera</span> · just now
                </p>
                <p className="pl-6 text-[0.8125rem] leading-[1.55] text-mist">
                  <span style={{ color: "var(--color-signal-teal)" }}>@botLane</span> can
                  you take this one?
                </p>
              </div>
            </div>
          </div>

          <span className="hero-console__scrim hidden min-[1160px]:block" aria-hidden="true" />

          {/* ---------------- Agent panel ---------------- */}
          <div className="px-4 pb-5 min-[1160px]:absolute min-[1160px]:right-5 min-[1160px]:bottom-5 min-[1160px]:w-[18.25rem] min-[1160px]:px-0 min-[1160px]:pb-0">
            <p className="mb-2 hidden text-[0.75rem] text-ash min-[1160px]:block">Approvals</p>
            <div
              className="hero-console__panel rounded-lg p-3"
              style={{ border: "1px solid var(--glass-divider)" }}
            >
              <div className="mb-3 flex items-center gap-2">
                <BotlaneMark size={16} />
                <BotlaneWordmark size={12} className="text-paper" />
                <span className="badge shrink-0">Managed</span>
                <span className="ml-auto flex shrink-0 items-center gap-1.5 text-ash">
                  <Minus size={12} strokeWidth={1.5} />
                  <Maximize2 size={11} strokeWidth={1.5} />
                  <X size={12} strokeWidth={1.5} />
                </span>
              </div>

              <div className="mb-2 flex justify-end">
                <p
                  className="max-w-[92%] rounded-lg px-3 py-2 text-[0.7812rem] leading-[1.5] text-mist"
                  style={{ background: "rgba(255,255,255,0.055)" }}
                >
                  Draft the summary and route it to A. Chen for approval
                </p>
              </div>

              <p className="mb-2 flex items-center justify-end gap-1.5 text-[0.7188rem] text-ash">
                <Circle size={10} strokeWidth={2} className="shrink-0" />
                <span className="mono">SYS&#8209;01</span> added to context
              </p>

              {/* The run, playing out once: the product's actual promise —
                  botLane prepares, a named person decides, then it ships.
                  Finite, so it never joins the looping set. */}
              <InView className="console-seq mono text-[0.75rem]" aria-hidden="true">
                <p className="console-seq__step text-ash">
                  Working
                  <span className="working-dots">
                    <i />
                    <i />
                    <i />
                  </span>
                </p>
                <p className="console-seq__step text-ash">
                  Draft assembled · 4 sources
                </p>
                <p className="console-seq__step" style={{ color: "var(--lamp)" }}>
                  <span className="console-seq__pip" /> Awaiting A. Chen
                </p>
                <p
                  className="console-seq__step"
                  style={{ color: "var(--color-pulse-green)" }}
                >
                  <span className="console-seq__pip" /> A. Chen approved
                </p>
                <p className="console-seq__step text-fog">
                  Delivered · Friday 09:00
                </p>
              </InView>
              {/* the readable state for assistive tech and reduced motion */}
              <p className="sr-only">
                Run complete. Draft assembled, approved by A. Chen, delivered
                Friday 09:00.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
