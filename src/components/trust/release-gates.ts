/**
 * BotLane's 12-Gate Release Standard: the four phases and twelve gates, in canonical order.
 *
 * Titles, order and objectives follow the original definitions in botlaneio/botsign
 * (src/data/releaseGates.ts). This file is copy for the website only. It describes the
 * policy and the evidence each gate expects. It holds no results: nothing here says that
 * any release passed, and no status should ever be hard-coded against these gates.
 */

export type ReleaseGate = {
  /** Two-digit sequence number, "01" to "12". */
  number: string;
  /** Stable id, matching the canonical gate id. */
  id: string;
  title: string;
  purpose: string;
  /** What a release must show for this gate. */
  evidence: string[];
  /** When the gate is rejected. */
  rejectIf: string;
  /** How the gate is handled where the original check does not fit the runtime. */
  platformNote?: string;
};

export type ReleasePhase = {
  numeral: string;
  name: string;
  summary: string;
  gates: ReleaseGate[];
};

export const RELEASE_PHASES: ReleasePhase[] = [
  {
    numeral: "I",
    name: "Source",
    summary: "Where it comes from and how it installs.",
    gates: [
      {
        number: "01",
        id: "provenance",
        title: "Provenance",
        purpose: "Confirm the source, ownership, version and dependencies of what is being released.",
        evidence: [
          "The exact commit, with its signature verified",
          "A pinned dependency lockfile and its hash",
          "An archived software bill of materials (SBOM)",
          "Who wrote and who reviewed the change",
        ],
        rejectIf:
          "The source can't be verified, dependencies float outside the approved policy, or the SBOM is missing.",
      },
      {
        number: "02",
        id: "repeatable-installation",
        title: "Repeatable Installation",
        purpose: "Show that it installs the same way every time, from documented steps.",
        evidence: [
          "Logs from a cold build in a clean environment",
          "Toolchain and environment versions",
          "Build output checksums across runs",
          "Install steps and their exit codes",
        ],
        rejectIf:
          "A clean install fails or the build isn't reproducible. Any platform-specific difference is recorded and justified, never papered over.",
      },
      {
        number: "03",
        id: "containerization",
        title: "Containerization",
        purpose: "Package the release into a controlled, portable runtime with minimal privileges.",
        evidence: [
          "The image or bundle identifier",
          "An inspection of what the runtime contains",
          "Runtime security settings: unprivileged, read-only where possible",
        ],
        rejectIf: "The runtime is unidentified, over-privileged, or not the one that was reviewed.",
        platformNote:
          "Some services don't run in containers. For those, the gate maps to a reviewed equivalent for that runtime's isolation and bundling. It is never reported as a container check that didn't happen.",
      },
    ],
  },
  {
    numeral: "II",
    name: "Security",
    summary: "What ships, how it is configured, and what it can see.",
    gates: [
      {
        number: "04",
        id: "oci-artifacts",
        title: "OCI Artifacts",
        purpose: "Produce versioned, traceable deployment artifacts that can be verified.",
        evidence: [
          "The artifact's immutable digest or version id",
          "A vulnerability scan with no open critical or high findings",
          "A signature and provenance attestation that verify",
        ],
        rejectIf: "The artifact can't be traced to its source, fails verification, or carries unresolved critical findings.",
        platformNote:
          "The original gate is written for OCI container images. Where a service ships as a different kind of bundle, that bundle and its deployment version are verified instead.",
      },
      {
        number: "05",
        id: "configuration-validation",
        title: "Configuration Validation",
        purpose: "Validate every setting and reject unsafe or incomplete configuration before it runs.",
        evidence: [
          "A schema validation report for each target environment, with private values redacted",
          "The version of the schema used",
          "Tests showing bad configuration is refused",
        ],
        rejectIf: "Required settings are missing or malformed, unsafe defaults apply, or unknown settings skip validation.",
      },
      {
        number: "06",
        id: "secrets-handling",
        title: "Secrets Handling",
        purpose: "Store, access and rotate credentials without ever exposing them.",
        evidence: [
          "A secrets scan of code, history and build output",
          "A review of who and what can read each secret",
          "How secrets are injected at runtime, redacted",
          "Rotation records",
        ],
        rejectIf: "A credential appears in plain text anywhere, access is broader than needed, or rotation is overdue.",
        platformNote: "Evidence describes how secrets are handled. It never contains a secret value.",
      },
    ],
  },
  {
    numeral: "III",
    name: "Recovery",
    summary: "Staying up, restoring, and upgrading safely.",
    gates: [
      {
        number: "07",
        id: "health-checks",
        title: "Health Checks",
        purpose: "Verify that the application and the services it depends on are healthy.",
        evidence: [
          "Health signals suited to the runtime",
          "Synthetic checks that exercise real paths",
          "Error and latency alerts, and proof they fire",
        ],
        rejectIf: "There is no reliable way to tell the service is unhealthy, or alerts aren't verified.",
        platformNote:
          "Where the runtime has no liveness probes or restart policies, the gate uses synthetic checks and alerting designed for that platform.",
      },
      {
        number: "08",
        id: "backup-restore",
        title: "Backup & Restore",
        purpose: "Prove the release can be recovered, not just that a backup exists.",
        evidence: [
          "The backup policy and where backups go",
          "Logs from a restore drill",
          "Integrity checks on restored data",
          "Measured recovery point and recovery time",
        ],
        rejectIf: "No restore has been tested, or restored data fails integrity checks.",
        platformNote:
          "What gets backed up depends on what holds state. For stateless services, the gate covers configuration, assets and deployment history.",
      },
      {
        number: "09",
        id: "upgrade-rollback",
        title: "Upgrade & Rollback",
        purpose: "Upgrade safely and return to a known-good version when something goes wrong.",
        evidence: [
          "The last known-good version",
          "A rollback rehearsal and its result",
          "Monitoring during rollout",
          "Compatibility results for any data migration",
        ],
        rejectIf: "There is no tested way back, or a migration can't be reversed safely.",
        platformNote: "Rollback uses the deployment and versioning tools of the platform the service runs on.",
      },
    ],
  },
  {
    numeral: "IV",
    name: "Launch",
    summary: "Hardened, accepted, and operated.",
    gates: [
      {
        number: "10",
        id: "security-hardening",
        title: "Security Hardening",
        purpose: "Review permissions, network exposure, dependencies and transport security.",
        evidence: [
          "A least-privilege review of every permission",
          "Dependency findings and how each was handled",
          "TLS and security header configuration",
          "Application security tests and an exposure review",
        ],
        rejectIf: "Permissions exceed what the release needs, exposure is unreviewed, or known findings are unaddressed.",
        platformNote: "Controls are chosen for the stack in use. A control is only listed when it is actually deployed.",
      },
      {
        number: "11",
        id: "acceptance-testing",
        title: "Acceptance Testing",
        purpose: "Verify functional, integration, safety and human sign-off criteria.",
        evidence: [
          "The test suite revision and its results",
          "The agreed acceptance scenarios",
          "Tests confirming that any step set to need human sign-off can't proceed without it",
          "Results for failure and fallback paths",
        ],
        rejectIf: "A required sign-off can be bypassed, or a critical end-to-end scenario fails.",
      },
      {
        number: "12",
        id: "documentation-runbooks",
        title: "Documentation & Runbooks",
        purpose: "Set out procedures, ownership, monitoring, incident response and recovery.",
        evidence: [
          "Reviewed runbooks",
          "A named owner and on-call escalation path",
          "A recovery drill record",
          "Audit trail retention settings",
        ],
        rejectIf: "There is no accountable owner, no recovery process, or the documents contradict how the system actually behaves.",
      },
    ],
  },
];

/** The outcomes a gate can record for a release. Only evidence moves a gate out of "pending". */
export const GATE_OUTCOMES = [
  { label: "Pending", tone: "neutral", text: "Evidence hasn't been collected yet." },
  { label: "Passed", tone: "ok", text: "Current evidence for this exact version meets the gate." },
  { label: "Failed", tone: "lane", text: "Evidence shows the gate isn't met." },
  { label: "Blocked", tone: "lane", text: "Evidence is missing or stale. This never becomes a pass." },
  {
    label: "Equivalent verified",
    tone: "ok",
    text: "The gate was met through a documented, reviewed equivalent for this runtime.",
  },
  {
    label: "Exception approved",
    tone: "neutral",
    text: "A time-limited, reviewed exception. It can't waive a required human sign-off.",
  },
] as const;
