import { CircleAlert, GitCommitHorizontal, Lock, Paperclip, UserCheck } from "lucide-react";
import { RELEASE_PHASES } from "@/components/trust/release-gates";
import { railPath, type Box, type StoryLayout } from "./layout";

/**
 * The pieces of the Release Standard story. Every element is on screen as one element from
 * start to finish: the release card shrinks into a bar, the gate cards stay put on the strip
 * while the camera moves, and each status is a set of stacked states the timeline cross-fades.
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

/* ---------- release card / bar ---------- */

function Status({ compact }: { compact: boolean }) {
  const chip = `absolute inset-0 flex items-center gap-1.5 rounded-full border whitespace-nowrap font-medium ${
    compact ? "px-2 text-[11px]" : "px-2.5 text-[12px]"
  }`;
  return (
    <span className={`relative block shrink-0 ${compact ? "h-[22px] w-[146px]" : "h-[26px] w-[170px]"}`}>
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
  const compact = layout.key === "mobile";
  return (
    <div
      data-release
      className={`absolute flex items-center overflow-hidden rounded-[18px] border border-line bg-white shadow-[0_18px_40px_-24px_rgba(20,20,40,0.3)] ${
        compact ? "gap-3 px-4" : "gap-4 px-5"
      }`}
      style={{ ...boxStyle(layout.release.big), zIndex: 6 }}
    >
      <span
        className={`flex shrink-0 items-center justify-center rounded-[12px] bg-ink text-white ${compact ? "size-[38px]" : "size-[42px]"}`}
      >
        <GitCommitHorizontal size={compact ? 18 : 20} />
      </span>
      <div className="min-w-0 flex-1">
        <div className={`truncate font-semibold tracking-[-0.01em] text-ink ${compact ? "text-[15px]" : "text-[17px]"}`}>
          {RELEASE.name} <span className="font-mono text-muted">{RELEASE.version}</span>
        </div>
        <div className={`mt-0.5 flex items-center gap-2 font-mono text-faint ${compact ? "text-[10.5px]" : "text-[11.5px]"}`}>
          <span>commit {RELEASE.commit}</span>
          {compact && <span>· Illustrative</span>}
        </div>
        {compact && (
          <div className="mt-1.5">
            <Status compact />
          </div>
        )}
      </div>
      {!compact && <Status compact={false} />}
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
  const desktop = layout.key === "desktop";
  return (
    <svg
      className="absolute top-0 left-0 overflow-visible"
      width={layout.strip.w}
      height={layout.strip.h}
      viewBox={`0 0 ${layout.strip.w} ${layout.strip.h}`}
      aria-hidden
    >
      <path data-rail-base d={d} fill="none" stroke="#dcdce2" strokeWidth={desktop ? 2.5 : 2} strokeLinecap="round" strokeLinejoin="round" />
      <path data-rail-done d={d} fill="none" stroke="#e0312b" strokeWidth={desktop ? 3 : 2.5} strokeLinecap="round" strokeLinejoin="round" />
      <rect
        data-barrier
        x={desktop ? barrier.x - 4 : barrier.x - 20}
        y={desktop ? barrier.y - 24 : barrier.y - 4}
        width={desktop ? 8 : 40}
        height={desktop ? 48 : 8}
        rx={4}
        fill="#e0312b"
        style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
      />
    </svg>
  );
}

function PhaseHeadings({ layout }: { layout: StoryLayout }) {
  const desktop = layout.key === "desktop";
  return (
    <>
      {RELEASE_PHASES.map((phase, i) => (
        <div key={phase.name} data-phase className="absolute opacity-0" style={{ left: layout.phases[i].x, top: layout.phases[i].y }}>
          <div className={`font-mono font-semibold tracking-wider text-lane uppercase ${desktop ? "text-[16px]" : "text-[12px]"}`}>
            Phase {phase.numeral}
          </div>
          <div className={`font-semibold leading-none tracking-[-0.04em] text-ink ${desktop ? "mt-1 text-[46px]" : "mt-0.5 text-[30px]"}`}>
            {phase.name}
          </div>
        </div>
      ))}
    </>
  );
}

function EvidenceRow({ label, compact }: { label: string; compact: boolean }) {
  const icon = compact ? 11 : 12;
  return (
    <div data-row className={`flex items-center gap-2.5 ${compact ? "h-[25px] text-[12.5px]" : "h-[32px] text-[13px]"}`}>
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
  const { card } = layout;
  const compact = layout.key === "mobile";
  const footer = `absolute inset-0 flex items-center gap-1.5 whitespace-nowrap ${compact ? "text-[11.5px]" : "text-[12px]"}`;
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
              compact ? "rounded-[16px] px-4 pt-3" : "rounded-[20px] px-5 pt-5"
            }`}
          >
            <span data-gate-bar className="absolute inset-x-0 top-0 h-[5px] origin-left bg-ink" style={{ transform: "scaleX(0)" }} />
            {compact ? (
              <div className="flex items-baseline gap-2.5">
                <span className="font-mono text-[28px] leading-none font-semibold tracking-[-0.04em] text-lane">{gate.number}</span>
                <span className="truncate text-[16px] font-semibold tracking-[-0.01em] text-ink">{gate.title}</span>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[54px] leading-none font-semibold tracking-[-0.05em] text-lane">{gate.number}</span>
                  <span className="font-mono text-[11px] font-semibold tracking-wider text-faint uppercase">Gate</span>
                </div>
                <div className="mt-4 text-[20px] font-semibold tracking-[-0.02em] text-ink">{gate.title}</div>
                <p className="mt-1.5 h-[58px] overflow-hidden text-[13px] leading-[1.48] text-muted">{gate.purpose}</p>
              </>
            )}
            <div className={compact ? "mt-1.5" : "mt-3 border-t border-line/80 pt-2.5"}>
              {!compact && (
                <div className="mb-0.5 font-mono text-[10px] font-semibold tracking-wider text-faint uppercase">Evidence</div>
              )}
              {gate.short.map((label) => (
                <EvidenceRow key={label} label={label} compact={compact} />
              ))}
            </div>
            <div className={`relative mt-auto border-t border-line/80 ${compact ? "h-[30px]" : "h-[44px]"}`}>
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
              className={`pointer-events-none absolute inset-0 border-2 border-lane opacity-0 ${compact ? "rounded-[16px]" : "rounded-[20px]"}`}
            />
          </div>
        </div>
      ))}
    </>
  );
}

function Production({ layout }: { layout: StoryLayout }) {
  const p = layout.production;
  const compact = layout.key === "mobile";
  return (
    <div
      data-prod
      className={`absolute flex overflow-hidden bg-ink text-white opacity-0 shadow-[0_20px_44px_-24px_rgba(20,20,40,0.5)] ${
        compact ? "items-center gap-4 rounded-[18px] px-5" : "flex-col justify-between rounded-[22px] p-6"
      }`}
      style={{ left: p.x, top: p.y, width: p.w, height: p.h }}
    >
      <span className={`flex shrink-0 items-center justify-center rounded-full bg-white/10 ${compact ? "size-[48px]" : "size-[64px]"}`}>
        <Lock size={compact ? 20 : 26} />
      </span>
      <div>
        <div className={`font-semibold tracking-[-0.03em] ${compact ? "text-[22px]" : "text-[30px]"}`}>Production</div>
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
      {layout.key === "desktop" ? (
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
      style={{ width: layout.strip.w, height: layout.strip.h, transformOrigin: "0 0", zIndex: 2 }}
    >
      <Rail layout={layout} />
      <PhaseHeadings layout={layout} />
      <GateCards layout={layout} />
      <Production layout={layout} />
      <Token layout={layout} />
    </div>
  );
}

/* ---------- scene 07: the two human decisions ---------- */

const DECISIONS = [
  { title: "Quality approval", question: "Is this release good enough to ship?" },
  { title: "Deployment authorization", question: "Can it go to production now?" },
];

export function Approvals({ layout }: { layout: StoryLayout }) {
  const compact = layout.key === "mobile";
  return (
    <div
      data-approvals
      className={`absolute flex flex-col rounded-[22px] border border-line bg-[#fbfbfa] opacity-0 shadow-[0_24px_60px_-28px_rgba(20,20,40,0.28)] ${
        compact ? "p-4" : "p-5"
      }`}
      style={{ ...boxStyle(layout.approvals), zIndex: 5 }}
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
