import type { ReactNode } from "react";

/**
 * One small drawing per gate, in a 160 × 120 box. Each shows the kind of evidence its gate asks
 * for, never a result. The timeline animates them by attribute when the release reaches the gate:
 * `data-draw` strokes are drawn, `data-grow` bars grow from the left, `data-pop` parts scale in,
 * `data-slide` parts move by `data-dx`. In gate 08, `data-late` parts wait for the blocked step,
 * and `data-missing` shows the evidence that isn't there yet.
 */

const INK = "#1d1d1f";
const LINE = "#d4d4da";
const SOFT = "#f1f1f4";
const LANE = "#e0312b";

const pop = { transformBox: "fill-box", transformOrigin: "50% 50%" } as const;
const grow = { transformBox: "fill-box", transformOrigin: "0% 50%" } as const;
const mono = { fontFamily: "var(--font-geist-mono), ui-monospace, monospace" } as const;

function T({ x, y, children, fill = INK, size = 7, anchor = "middle", weight }: {
  x: number;
  y: number;
  children: ReactNode;
  fill?: string;
  size?: number;
  anchor?: "start" | "middle" | "end";
  weight?: number;
}) {
  return (
    <text x={x} y={y} fill={fill} fontSize={size} textAnchor={anchor} fontWeight={weight} style={mono}>
      {children}
    </text>
  );
}

const Pop = ({ children, late }: { children: ReactNode; late?: boolean }) => (
  <g data-pop data-late={late ? "" : undefined} style={pop}>
    {children}
  </g>
);

const ARTS: Record<string, ReactNode> = {
  provenance: (
    <>
      <path data-draw d="M14 38 H146" stroke={LINE} strokeWidth={2} fill="none" strokeLinecap="round" />
      <path data-draw d="M34 38 C46 38 46 18 58 18 H82 C94 18 94 38 106 38" stroke={LINE} strokeWidth={2} fill="none" />
      <Pop><circle cx={34} cy={38} r={5} fill="#fff" stroke={INK} strokeWidth={1.6} /></Pop>
      <Pop><circle cx={70} cy={18} r={4} fill="#fff" stroke={INK} strokeWidth={1.4} /></Pop>
      <Pop><circle cx={106} cy={38} r={7} fill={LANE} /></Pop>
      <Pop><T x={106} y={58}>9f3c2a1</T></Pop>
      <Pop>
        <circle cx={136} cy={38} r={9} fill="#fff" stroke={LANE} strokeWidth={1.4} />
        <T x={136} y={40.5} fill={LANE} size={6} weight={700}>SIG</T>
      </Pop>
      <rect x={30} y={72} width={100} height={36} rx={6} fill={SOFT} />
      <rect data-grow x={38} y={80} width={58} height={3.5} rx={1.75} fill={INK} style={grow} />
      <rect data-grow x={38} y={88} width={72} height={3.5} rx={1.75} fill={INK} style={grow} />
      <rect data-grow x={38} y={96} width={44} height={3.5} rx={1.75} fill={INK} style={grow} />
      <T x={124} y={103} fill="#8e8e93" size={6.5} anchor="end">SBOM</T>
    </>
  ),
  "repeatable-installation": (
    <>
      {[30, 56].map((y, i) => (
        <g key={y}>
          <T x={14} y={y + 2.5} fill="#8e8e93" size={6.5} anchor="start">{`run ${i + 1}`}</T>
          <rect x={40} y={y - 3.5} width={64} height={7} rx={3.5} fill={SOFT} />
          <rect data-grow x={40} y={y - 3.5} width={64} height={7} rx={3.5} fill={INK} style={grow} />
          <Pop><T x={110} y={y + 2.5} anchor="start">4be1c0</T></Pop>
        </g>
      ))}
      <path data-draw d="M140 28 h5 v30 h-5" stroke={LANE} strokeWidth={1.5} fill="none" />
      <Pop>
        <rect x={42} y={82} width={76} height={16} rx={8} fill={SOFT} />
        <T x={80} y={92.5} size={6.5}>same build, every time</T>
      </Pop>
    </>
  ),
  containerization: (
    <>
      <rect x={46} y={44} width={60} height={46} rx={5} fill="#fff" stroke={INK} strokeWidth={1.6} />
      <path data-draw d="M46 44 L62 28 H122 L106 44" stroke={INK} strokeWidth={1.6} fill="none" strokeLinejoin="round" />
      <path data-draw d="M106 90 L122 74 V28" stroke={INK} strokeWidth={1.6} fill="none" strokeLinejoin="round" />
      {[54, 68, 82].map((x) => (
        <Pop key={x}><rect x={x} y={56} width={10} height={13} rx={2} fill={SOFT} stroke={LINE} /></Pop>
      ))}
      <Pop>
        <rect x={18} y={98} width={56} height={14} rx={7} fill={SOFT} />
        <T x={46} y={107.5} size={6.5}>non-root</T>
      </Pop>
      <Pop>
        <rect x={86} y={98} width={56} height={14} rx={7} fill={SOFT} />
        <T x={114} y={107.5} size={6.5}>read-only</T>
      </Pop>
    </>
  ),
  "oci-artifacts": (
    <>
      <path data-draw d="M58 28 L80 17 L102 28 V54 L80 65 L58 54 Z" stroke={INK} strokeWidth={1.6} fill="none" strokeLinejoin="round" />
      <path data-draw d="M58 28 L80 39 L102 28 M80 39 V65" stroke={INK} strokeWidth={1.6} fill="none" strokeLinejoin="round" />
      <Pop>
        <circle cx={116} cy={22} r={9} fill={LANE} />
        <T x={116} y={24.5} fill="#fff" size={5.5} weight={700}>SIG</T>
      </Pop>
      <Pop><T x={80} y={80}>sha256:7c2e…</T></Pop>
      <rect x={30} y={90} width={100} height={18} rx={5} fill={SOFT} />
      <T x={80} y={101.5} fill="#8e8e93" size={6.5}>vulnerability scan</T>
      <rect data-slide data-dx="96" x={31} y={90} width={3} height={18} rx={1.5} fill={LANE} />
    </>
  ),
  "configuration-validation": (
    <>
      <rect x={24} y={14} width={112} height={74} rx={6} fill="#fff" stroke={LINE} strokeWidth={1.4} />
      <T x={34} y={32} anchor="start">region: eu-west</T>
      <T x={34} y={48} anchor="start">timeout: 30s</T>
      <T x={34} y={64} anchor="start" fill={LANE}>debug: true</T>
      <path data-draw d="M32 61.5 H84" stroke={LANE} strokeWidth={1.4} />
      <Pop>
        <rect x={90} y={56} width={36} height={13} rx={6.5} fill={LANE} />
        <T x={108} y={64.8} fill="#fff" size={6}>refused</T>
      </Pop>
      <Pop>
        <rect x={46} y={96} width={68} height={14} rx={7} fill={SOFT} />
        <T x={80} y={105.5} size={6.5}>schema v3</T>
      </Pop>
    </>
  ),
  "secrets-handling": (
    <>
      <rect x={16} y={24} width={128} height={26} rx={6} fill="#fff" stroke={LINE} strokeWidth={1.4} />
      <T x={24} y={39.5} anchor="start">API_KEY =</T>
      <T x={76} y={39.5} anchor="start" fill="#8e8e93">sk_live_93f…</T>
      <rect data-grow x={74} y={31} width={62} height={12} rx={3} fill={INK} style={grow} />
      <Pop>
        <path d="M52 78 v-5 a7 7 0 0 1 14 0 v5" stroke={INK} strokeWidth={1.6} fill="none" />
        <rect x={48} y={78} width={22} height={17} rx={3.5} fill={INK} />
      </Pop>
      <path data-draw d="M112 64 a14 14 0 1 1 -12 7" stroke={LANE} strokeWidth={1.6} fill="none" strokeLinecap="round" />
      <Pop><path d="M97 66 l3 6 l5 -4" stroke={LANE} strokeWidth={1.6} fill="none" strokeLinecap="round" strokeLinejoin="round" /></Pop>
      <Pop><T x={110} y={108} fill="#8e8e93" size={6.5}>rotated</T></Pop>
    </>
  ),
  "health-checks": (
    <>
      <rect x={14} y={18} width={132} height={62} rx={6} fill={SOFT} />
      <path
        data-draw
        d="M20 52 H48 L54 40 L60 64 L66 30 L72 52 H94 L98 46 L102 58 L106 52 H140"
        stroke={LANE}
        strokeWidth={1.7}
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <Pop><circle cx={20} cy={98} r={3} fill={LANE} /></Pop>
      <Pop><T x={28} y={100.5} anchor="start">synthetic checks</T></Pop>
      <Pop>
        <path d="M126 104 h14 l-2.5 -3 v-6 a4.5 4.5 0 0 0 -9 0 v6 z" fill={INK} />
        <circle cx={133} cy={106.5} r={1.8} fill={INK} />
      </Pop>
    </>
  ),
  "backup-restore": (
    <>
      <path d="M22 32 V70 a18 6 0 0 0 36 0 V32" fill="#fff" stroke={INK} strokeWidth={1.6} />
      <ellipse cx={40} cy={32} rx={18} ry={6} fill="#fff" stroke={INK} strokeWidth={1.6} />
      <path d="M102 32 V70 a18 6 0 0 0 36 0 V32" fill={SOFT} stroke={INK} strokeWidth={1.6} strokeDasharray="3 2.5" />
      <ellipse cx={120} cy={32} rx={18} ry={6} fill={SOFT} stroke={INK} strokeWidth={1.6} strokeDasharray="3 2.5" />
      <path data-draw d="M62 42 H96 M91 37.5 L96 42 L91 46.5" stroke={INK} strokeWidth={1.6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <Pop><T x={79} y={35} fill="#8e8e93" size={6.5}>backup</T></Pop>
      <g data-missing opacity={0}>
        <path d="M98 64 H62" stroke={LANE} strokeWidth={1.6} strokeDasharray="3 3" />
        <circle cx={80} cy={64} r={7} fill={LANE} />
        <T x={80} y={67} fill="#fff" size={8} weight={700}>?</T>
      </g>
      <path data-draw data-late d="M98 64 H64 M69 59.5 L64 64 L69 68.5" stroke={LANE} strokeWidth={1.6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <Pop late><T x={80} y={80} fill={LANE} size={6.5}>restore drill</T></Pop>
      <Pop late>
        <rect x={34} y={94} width={92} height={14} rx={7} fill={SOFT} />
        <T x={80} y={103.5} size={6.5}>recovery time measured</T>
      </Pop>
    </>
  ),
  "upgrade-rollback": (
    <>
      <path data-draw d="M18 70 H142" stroke={LINE} strokeWidth={2} fill="none" strokeLinecap="round" />
      <Pop><circle cx={50} cy={70} r={6} fill="#fff" stroke={INK} strokeWidth={1.6} /></Pop>
      <Pop><circle cx={110} cy={70} r={6} fill={LANE} /></Pop>
      <Pop><T x={50} y={88}>v2.13.2</T></Pop>
      <Pop><T x={110} y={88}>v2.14.0</T></Pop>
      <path data-draw d="M108 60 C102 30 58 30 52 60 M47 55 L52 61 L57 55.5" stroke={INK} strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <Pop><T x={80} y={24} fill="#8e8e93" size={6.5}>rollback rehearsed</T></Pop>
      <Pop><T x={50} y={102} fill={LANE} size={6}>known-good</T></Pop>
    </>
  ),
  "security-hardening": (
    <>
      <path data-draw d="M24 26 L46 18 L68 26 V50 C68 64 58 72 46 78 C34 72 24 64 24 50 Z" stroke={INK} strokeWidth={1.6} fill="none" strokeLinejoin="round" />
      {[
        ["write", 28],
        ["public", 46],
        ["debug", 64],
      ].map(([label, y]) => (
        <g key={label}>
          <T x={84} y={(y as number) + 2.5} anchor="start" size={6.5}>{label}</T>
          <rect x={116} y={(y as number) - 5} width={24} height={10} rx={5} fill={SOFT} stroke={LINE} />
          <circle data-slide data-dx="-13" cx={134} cy={y as number} r={3.6} fill={INK} />
        </g>
      ))}
      <Pop>
        <rect x={24} y={92} width={52} height={14} rx={7} fill={SOFT} />
        <T x={50} y={101.5} size={6.5}>TLS</T>
      </Pop>
      <Pop>
        <rect x={84} y={92} width={56} height={14} rx={7} fill={SOFT} />
        <T x={112} y={101.5} size={6.5}>headers</T>
      </Pop>
    </>
  ),
  "acceptance-testing": (
    <>
      {[26, 40, 54].map((y) => (
        <g key={y}>
          <Pop><circle cx={22} cy={y} r={2.6} fill={INK} /></Pop>
          <rect data-grow x={30} y={y - 2} width={52} height={4} rx={2} fill={INK} style={grow} />
        </g>
      ))}
      <Pop><rect x={112} y={20} width={7} height={62} rx={3.5} fill={LANE} /></Pop>
      <path data-draw d="M30 76 C70 76 88 70 106 54" stroke={INK} strokeWidth={1.4} fill="none" strokeDasharray="3 2.5" />
      <path data-draw d="M100 46 l7 7 m0 -7 l-7 7" stroke={LANE} strokeWidth={1.6} strokeLinecap="round" />
      <Pop><T x={115.5} y={94} fill={LANE} size={6.5}>sign-off</T></Pop>
      <Pop><T x={80} y={110} size={6.5}>can&apos;t be bypassed</T></Pop>
    </>
  ),
  "documentation-runbooks": (
    <>
      <rect x={20} y={20} width={48} height={60} rx={4} fill="#fff" stroke={INK} strokeWidth={1.6} />
      <path d="M28 20 V80" stroke={INK} strokeWidth={1.6} />
      {[32, 42, 52].map((y) => (
        <rect key={y} data-grow x={34} y={y} width={26} height={3} rx={1.5} fill={INK} style={grow} />
      ))}
      <path data-draw d="M70 46 H90" stroke={LANE} strokeWidth={1.5} strokeDasharray="2 2" />
      <Pop>
        <circle cx={104} cy={44} r={13} fill={SOFT} stroke={INK} strokeWidth={1.4} />
        <circle cx={104} cy={40} r={4} fill={INK} />
        <path d="M96 52 a8 6 0 0 1 16 0" fill={INK} />
      </Pop>
      <Pop><T x={104} y={70}>owner</T></Pop>
      <Pop>
        <rect x={128} y={36} width={12} height={18} rx={3} fill={INK} />
        <circle cx={134} cy={50} r={1.4} fill="#fff" />
      </Pop>
      <Pop>
        <rect x={20} y={94} width={74} height={14} rx={7} fill={SOFT} />
        <T x={57} y={103.5} size={6.5}>drill record</T>
      </Pop>
    </>
  ),
};

export function GateArt({ id, className }: { id: string; className?: string }) {
  return (
    <svg data-art viewBox="0 0 160 120" className={className} aria-hidden>
      <g data-art-body>{ARTS[id]}</g>
    </svg>
  );
}
