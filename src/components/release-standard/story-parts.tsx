import { CircleAlert, GitCommitHorizontal, Lock, Paperclip, UserCheck } from "lucide-react";
import { RELEASE_PHASES } from "@/components/trust/release-gates";
import { GateArt } from "./gate-art";
import { railPath, type Box, type Rect, type StoryLayout } from "./layout";

/**
 * The pieces of the Release Standard story. Every element is one element from start to finish:
 * the release card shrinks into a bar, each phase's illustration panel and gate cards rise into
 * place on the strip and stay there while the camera slides down, and each status is a set of
 * stacked states the timeline cross-fades.
 * Nothing here is a record of a real release: the canvas is labelled illustrative, evidence is
 * only ever "attached for review", and both approvals are left waiting for a person.
 */

/** The illustrative release the story follows. */
export const RELEASE = { name: "Client reporting", version: "v2.14.0", commit: "9f3c2a1" };

/** Short labels for the evidence each gate asks for, condensed from release-gates.ts. */
const EVIDENCE: Record<string, [string, string, string]> = {
  provenance: ["Signed commit", "Pinned lockfile and hash", "Archived SBOM"],
  "repeatable-installation": ["Clean-room build logs", "Toolchain versions", "Checksums across runs"],
  containerization: ["Image or bundle id", "Runtime inspection", "Least-privilege settings"],
  "oci-artifacts": ["Immutable digest", "Vulnerability scan", "Signature and attestation"],
  "configuration-validation": ["Schema report per environment", "Schema version", "Bad-config refusal tests"],
  "secrets-handling": ["Secrets scan", "Access review", "Rotation records"],
  "health-checks": ["Health signals", "Synthetic checks", "Alerts proven to fire"],
  "backup-restore": ["Backup policy", "Restore drill logs", "Measured recovery times"],
  "upgrade-rollback": ["Last known-good version", "Rollback rehearsal", "Migration compatibility"],
  "security-hardening": ["Least-privilege review", "Dependency findings", "TLS and headers"],
  "acceptance-testing": ["Suite revision and results", "Acceptance scenarios", "Sign-off can't be bypassed"],
  "documentation-runbooks": ["Reviewed runbooks", "Named owner and on-call", "Recovery drill record"],
};

export const GATES = RELEASE_PHASES.flatMap((p) => p.gates).map((g) => ({ ...g, short: EVIDENCE[g.id] }));

/** Gate 08's restore drill is the evidence that goes missing in the blocked example. */
export const BLOCKED_GATE = 7;
export const BLOCKED_ROW = 1;

const boxStyle = (b: Box) => ({ left: b.x - b.w / 2, top: b.y - b.h / 2, width: b.w, height: b.h });
const rectStyle = (r: Rect) => ({ left: r.x, top: r.y, width: r.w, height: r.h });

/* ---------- release card / bar ---------- */

function Status({ compact }: { compact: boolean }) {
  const chip = `absolute inset-0 flex items-center gap-1.5 rounded-full border whitespace-nowrap font-medium ${
    compact ? "px-2 text-[10.5px]" : "px-2.5 text-[12px]"
  }`;
  return (
    <span className={`relative block shrink-0 ${compact ? "h-[22px] w-[136px]" : "h-[26px] w-[170px]"}`}>
      <span data-h-demo className={`${chip} border-line bg-surface text-ink-2`}>
        <span className="size-1.5 rounded-full bg-[#a1a1aa]" />
        Works in the demo
      </span>
      <span data-h-collect className={`${chip} border-ink/15 bg-white text-ink opacity-0`}>
        <span className="size-1.5 rounded-full bg-ink" />
        Collecting evidence
      </span>
      <span data-h-block className={`${chip} border-lane/30 bg-lane/5 text-lane opacity-0`}>
        <span className="size-1.5 rounded-full bg-lane" />
        Blocked at gate 08
      </span>
      <span data-h-wait className={`${chip} border-amber-500/30 bg-amber-50 text-amber-700 opacity-0`}>
        <span className="size-1.5 rounded-full bg-amber-500" />
        Waiting for people
      </span>
    </span>
  );
}

export function ReleaseCard({ layout }: { layout: StoryLayout }) {
  const { compact } = layout;
  return (
    <div
      data-release
      className={`absolute flex items-center overflow-hidden rounded-[18px] border border-line bg-white shadow-[0_18px_40px_-24px_rgba(20,20,40,0.3)] ${
        compact ? "gap-2.5 px-3" : "gap-4 px-5"
      }`}
      style={{ ...boxStyle(layout.release.big), zIndex: 6 }}
    >
      <span
        className={`flex shrink-0 items-center justify-center rounded-[11px] bg-ink text-white ${compact ? "size-[34px]" : "size-[42px]"}`}
      >
        <GitCommitHorizontal size={compact ? 18 : 20} />
      </span>
      <div className="min-w-0 flex-1">
        <div className={`truncate font-semibold tracking-[-0.01em] text-ink ${compact ? "text-[14.5px]" : "text-[17px]"}`}>
          {RELEASE.name} {!compact && <span className="font-mono text-muted">{RELEASE.version}</span>}
        </div>
        <div className={`mt-0.5 truncate font-mono text-faint ${compact ? "text-[10.5px]" : "text-[11.5px]"}`}>
          {compact ? `${RELEASE.commit} · Illustrative` : `commit ${RELEASE.commit}`}
        </div>
      </div>
      <Status compact={compact} />
      {!compact && (
        <span className="shrink-0 font-mono text-[10px] font-semibold tracking-wider text-faint uppercase">Illustrative</span>
      )}
    </div>
  );
}

/* ---------- the strip: rail, phase headings, gate cards, production ---------- */

function Rail({ layout }: { layout: StoryLayout }) {
  const d = railPath(layout.rail);
  const { barrier } = layout;
  const desktop = !layout.compact;
  const w = desktop ? 3 : 2.5;
  return (
    <svg
      className="absolute top-0 left-0 overflow-visible"
      width={layout.strip.w}
      height={layout.strip.h}
      viewBox={`0 0 ${layout.strip.w} ${layout.strip.h}`}
      aria-hidden
    >
      <path data-rail-base d={d} fill="none" stroke="#dcdce2" strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
      <path data-rail-done d={d} fill="none" stroke="#e0312b" strokeWidth={w + 0.5} strokeLinecap="round" strokeLinejoin="round" />
      {layout.ticks.map(([a, b], i) => (
        <g key={i}>
          <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#dcdce2" strokeWidth={w} strokeLinecap="round" strokeDasharray="1 6" />
          <line data-tick x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#e0312b" strokeWidth={w} strokeLinecap="round" opacity={0} />
        </g>
      ))}
      <rect
        data-barrier
        x={barrier.x - (desktop ? 26 : 22)}
        y={barrier.y - 4}
        width={desktop ? 52 : 44}
        height={8}
        rx={4}
        fill="#e0312b"
        style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
      />
    </svg>
  );
}

/** One panel per phase: its heading and a drawing for each of its three gates. */
function Panels({ layout }: { layout: StoryLayout }) {
  const rows = layout.panelStyle === "rows";
  const desktop = !layout.compact;
  return (
    <>
      {RELEASE_PHASES.map((phase, p) => {
        const r = layout.panels[p];
        const range = `gates ${phase.gates[0].number}–${phase.gates[2].number}`;
        return (
          // The outer box carries the phones' pinning offset; the inner one its own entrance.
          <div key={phase.name} data-panel-pin className="absolute" style={{ ...rectStyle(r), zIndex: 4 }}>
          <div
            data-panel
            className={`flex h-full flex-col overflow-hidden border border-line bg-white opacity-0 shadow-[0_24px_60px_-34px_rgba(20,20,40,0.35)] ${
              desktop ? "rounded-[26px] px-6 py-5" : "rounded-[18px] px-3 pt-2.5 pb-2"
            }`}
          >
            {desktop ? (
              <div>
                <div className="font-mono text-[13px] font-semibold tracking-wider text-lane uppercase">
                  Phase {phase.numeral} <span className="text-faint">· {range}</span>
                </div>
                <div className="mt-1.5 flex items-baseline gap-3">
                  <span className="text-[36px] leading-none font-semibold tracking-[-0.045em] text-ink">{phase.name}</span>
                  <span className="truncate text-[14px] text-muted">{phase.summary}</span>
                </div>
              </div>
            ) : (
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-[10.5px] font-semibold tracking-wider text-lane uppercase">Phase {phase.numeral}</span>
                <span className="text-[19px] leading-none font-semibold tracking-[-0.035em] text-ink">{phase.name}</span>
                <span className="ml-auto font-mono text-[10px] text-faint">{range}</span>
              </div>
            )}
            <div className={rows ? `flex flex-1 flex-col justify-between ${desktop ? "mt-4" : "mt-2"}` : "mt-2 grid flex-1 grid-cols-3 gap-2"}>
              {phase.gates.map((gate) =>
                rows ? (
                  <div key={gate.id} className={`flex items-center ${desktop ? "gap-5" : "gap-2.5"}`}>
                    <div
                      className={`shrink-0 bg-[#f8f8f9] ${desktop ? "h-[94px] w-[126px] rounded-[15px] p-1" : "h-[54px] w-[72px] rounded-[10px]"}`}
                    >
                      <GateArt id={gate.id} className="h-full w-full" />
                    </div>
                    {desktop ? (
                      <div className="min-w-0">
                        <div className="font-mono text-[12px] font-semibold text-lane">{gate.number}</div>
                        <div className="text-[16px] font-semibold tracking-[-0.015em] text-ink">{gate.title}</div>
                        <p className="mt-0.5 text-[14px] leading-[1.4] text-muted">{gate.purpose}</p>
                      </div>
                    ) : (
                      <div className="min-w-0">
                        <div className="truncate text-[12.5px] font-semibold text-ink">
                          <span className="font-mono text-lane">{gate.number}</span> {gate.title}
                        </div>
                        <p className="line-clamp-2 text-[11px] leading-[1.3] text-muted">{gate.purpose}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div key={gate.id} className="flex min-w-0 flex-col">
                    <div className="aspect-[4/3] w-full rounded-[11px] bg-[#f8f8f9]">
                      <GateArt id={gate.id} className="h-full w-full" />
                    </div>
                    <div className="mt-1 text-[11.5px] leading-[1.2] font-semibold text-ink">
                      <span className="font-mono text-lane">{gate.number}</span> {gate.title}
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
          </div>
        );
      })}
    </>
  );
}

/** Giant outlined phase numerals on a slower layer behind the lane. */
export function Numerals({ layout }: { layout: StoryLayout }) {
  return (
    <div data-parallax className="absolute top-0 left-0" style={{ width: layout.W, height: 0, zIndex: 0 }} aria-hidden>
      {RELEASE_PHASES.map((phase, i) => (
        <span
          key={phase.name}
          data-numeral
          className="absolute font-semibold leading-none tracking-[-0.06em] whitespace-nowrap text-transparent opacity-0 select-none"
          style={{
            left: layout.numerals[i].x,
            top: layout.numerals[i].y,
            fontSize: layout.numeralSize,
            transform: "translate(-50%, -50%)",
            WebkitTextStroke: "1.5px #e4e4e9",
          }}
        >
          {phase.numeral}
        </span>
      ))}
    </div>
  );
}

function EvidenceRow({ label, compact }: { label: string; compact: boolean }) {
  const icon = compact ? 11 : 12;
  return (
    <div data-row className={`flex items-center gap-2.5 ${compact ? "h-[21px] text-[13px]" : "h-[22px] text-[14px]"}`}>
      <span className="relative size-[18px] shrink-0">
        <span data-r-req className="absolute inset-[3px] rounded-full border-[1.5px] border-[#c7c7cc]" />
        <span data-r-att className="absolute inset-0 flex items-center justify-center rounded-full bg-ink text-white opacity-0">
          <Paperclip size={icon} strokeWidth={2.5} />
        </span>
        <span data-r-miss className="absolute inset-0 flex items-center justify-center rounded-full bg-lane text-white opacity-0">
          <CircleAlert size={icon} strokeWidth={2.5} />
        </span>
      </span>
      <span className="min-w-0 flex-1 truncate text-ink-2">{label}</span>
      <span className={`relative h-[16px] shrink-0 font-mono ${compact ? "w-[60px] text-[10.5px]" : "w-[66px] text-[11px]"}`}>
        <span data-r-req className="absolute inset-0 text-right text-faint">Required</span>
        <span data-r-att className="absolute inset-0 text-right text-ink opacity-0">{RELEASE.commit}</span>
        <span data-r-miss className="absolute inset-0 text-right font-semibold text-lane opacity-0">Missing</span>
      </span>
    </div>
  );
}

function GateCards({ layout }: { layout: StoryLayout }) {
  const { card, compact } = layout;
  const footer = `absolute inset-0 flex items-center gap-1.5 whitespace-nowrap ${compact ? "text-[12px]" : "text-[13.5px]"}`;
  return (
    <>
      {GATES.map((gate, i) => (
        <div
          key={gate.id}
          data-gate
          className="absolute opacity-0"
          style={{ left: layout.cards[i].x, top: layout.cards[i].y, width: card.w, height: card.h }}
        >
          <div
            className={`relative flex h-full flex-col overflow-hidden border border-line bg-white shadow-[0_14px_34px_-22px_rgba(20,20,40,0.32)] ${
              compact ? "rounded-[15px] px-3.5 pt-2.5" : "rounded-[18px] px-5 pt-3"
            }`}
          >
            <span data-gate-bar className="absolute inset-x-0 top-0 h-[4px] origin-left bg-ink" style={{ transform: "scaleX(0)" }} />
            <div className="flex items-baseline gap-2.5">
              <span className={`font-mono leading-none font-semibold tracking-[-0.04em] text-lane ${compact ? "text-[22px]" : "text-[26px]"}`}>
                {gate.number}
              </span>
              <span className={`truncate font-semibold tracking-[-0.015em] text-ink ${compact ? "text-[15px]" : "text-[18px]"}`}>{gate.title}</span>
              {!compact && (
                <span className="ml-auto font-mono text-[10px] font-semibold tracking-wider text-faint uppercase">Evidence</span>
              )}
            </div>
            <div className={compact ? "mt-1" : "mt-1.5"}>
              {gate.short.map((label) => (
                <EvidenceRow key={label} label={label} compact={compact} />
              ))}
            </div>
            <div className={`relative mt-auto border-t border-line/80 ${compact ? "h-[26px]" : "h-[28px]"}`}>
              <span data-f-req className={`${footer} text-faint`}>
                <span className="size-1.5 rounded-full bg-[#c7c7cc]" />
                Evidence required
              </span>
              <span data-f-att className={`${footer} font-medium text-ink opacity-0`}>
                <span className="size-1.5 rounded-full bg-ink" />
                Evidence attached · for review
              </span>
              <span data-f-block className={`${footer} font-semibold text-lane opacity-0`}>
                <span className="size-1.5 rounded-full bg-lane" />
                Blocked · evidence missing
              </span>
            </div>
            <span
              data-gate-ring
              className={`pointer-events-none absolute inset-0 border-2 border-lane opacity-0 ${compact ? "rounded-[15px]" : "rounded-[18px]"}`}
            />
          </div>
        </div>
      ))}
    </>
  );
}

function Production({ layout }: { layout: StoryLayout }) {
  const p = layout.production;
  const { compact } = layout;
  return (
    <div
      data-prod
      className={`absolute flex overflow-hidden bg-ink text-white opacity-0 shadow-[0_20px_44px_-24px_rgba(20,20,40,0.5)] ${
        compact ? "items-center gap-3 rounded-[18px] px-4" : "flex-col justify-between rounded-[22px] p-5"
      }`}
      style={rectStyle(p)}
    >
      <span className={`flex shrink-0 items-center justify-center rounded-full bg-white/10 ${compact ? "size-[42px]" : "size-[52px]"}`}>
        <Lock size={compact ? 18 : 26} />
      </span>
      <div>
        <div className={`font-semibold tracking-[-0.03em] ${compact ? "text-[20px]" : "text-[28px]"}`}>Production</div>
        <div className={`mt-1 leading-snug text-white/60 ${compact ? "text-[12.5px]" : "text-[13px]"}`}>
          Locked until people decide
        </div>
      </div>
      <span
        data-prod-ring
        className={`pointer-events-none absolute inset-0 border-2 border-lane opacity-0 ${compact ? "rounded-[18px]" : "rounded-[22px]"}`}
      />
    </div>
  );
}

function Token({ layout }: { layout: StoryLayout }) {
  const p = layout.rail[0];
  return (
    <div data-token className="absolute top-0 left-0 opacity-0" style={{ transform: `translate(${p.x}px, ${p.y}px)` }}>
      {!layout.compact ? (
        <span className="absolute top-0 left-0 flex h-[28px] -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full bg-lane px-3 font-mono text-[12px] font-semibold whitespace-nowrap text-white shadow-[0_0_0_5px_rgba(224,49,43,0.16)]">
          <span className="size-1.5 rounded-full bg-white" />
          {RELEASE.version}
        </span>
      ) : (
        <span className="absolute top-0 left-0 size-[18px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white bg-lane shadow-[0_0_0_4px_rgba(224,49,43,0.2)]" />
      )}
    </div>
  );
}

export function Strip({ layout }: { layout: StoryLayout }) {
  return (
    <div
      data-strip
      className="absolute top-0 left-0"
      style={{ width: layout.strip.w, height: layout.strip.h, zIndex: 2 }}
    >
      <Rail layout={layout} />
      <Panels layout={layout} />
      <GateCards layout={layout} />
      <Production layout={layout} />
      <Approvals layout={layout} />
      <Token layout={layout} />
    </div>
  );
}

/* ---------- scene 07: the two human decisions ---------- */

const DECISIONS = [
  { title: "Quality approval", question: "Is this release good enough to ship?" },
  { title: "Deployment authorization", question: "Can it go to production now?" },
];

function Approvals({ layout }: { layout: StoryLayout }) {
  const { compact } = layout;
  return (
    <div
      data-approvals
      className={`absolute flex flex-col rounded-[22px] border border-line bg-[#fbfbfa] opacity-0 shadow-[0_24px_60px_-28px_rgba(20,20,40,0.28)] ${
        compact ? "p-4" : "p-5"
      }`}
      style={rectStyle(layout.approvals)}
    >
      <div className="flex items-center justify-between gap-3">
        <span className={`flex items-center gap-2 font-semibold text-ink ${compact ? "text-[14px]" : "text-[15px]"}`}>
          <span className="size-2 rounded-full bg-lane" />
          Before production
        </span>
        <span className="font-mono text-[10.5px] text-muted">Two people, two decisions</span>
      </div>
      <div className={`flex flex-1 flex-col justify-center ${compact ? "gap-2.5" : "gap-3"}`}>
        {DECISIONS.map((d) => (
          <div
            key={d.title}
            data-approval
            className={`flex items-center gap-3 rounded-[14px] border border-line bg-white ${compact ? "px-3 py-2.5" : "px-4 py-3"}`}
          >
            <span className="flex size-[36px] shrink-0 items-center justify-center rounded-full bg-surface text-ink-2">
              <UserCheck size={17} />
            </span>
            <div className="min-w-0 flex-1">
              <div className={`truncate font-semibold text-ink ${compact ? "text-[13.5px]" : "text-[14px]"}`}>{d.title}</div>
              <div className={`truncate text-muted ${compact ? "text-[11.5px]" : "text-[12px]"}`}>{d.question}</div>
            </div>
            <span
              className={`flex shrink-0 items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-50 font-medium whitespace-nowrap text-amber-700 ${
                compact ? "px-2 py-0.5 text-[10.5px]" : "px-2.5 py-1 text-[11.5px]"
              }`}
            >
              <span className="size-1.5 rounded-full bg-amber-500" />
              {compact ? "Waiting" : "Waiting for a person"}
            </span>
          </div>
        ))}
      </div>
      <div className={`border-t border-line/80 pt-2.5 text-muted ${compact ? "text-[11.5px]" : "text-[12px]"}`}>
        Neither step can be skipped. Nothing deploys on its own.
      </div>
    </div>
  );
}
