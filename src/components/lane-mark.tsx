import type { SVGProps } from "react";
import "./lane-mark.css";

/** What Lane is doing. The lens's iris changes colour and shape with each one. */
export type LaneState = "ready" | "working" | "waiting" | "done" | "paused" | "issue";

export const LANE_STATES: { id: LaneState; label: string; color: string }[] = [
  { id: "ready", label: "Ready", color: "#a1a1a8" },
  { id: "working", label: "Working", color: "#e0312b" },
  { id: "waiting", label: "Awaiting your OK", color: "#f2a516" },
  { id: "done", label: "Approved", color: "#1a7f37" },
  { id: "paused", label: "Paused", color: "#a1a1a8" },
  { id: "issue", label: "Needs attention", color: "#e0312b" },
];

type LaneMarkProps = {
  /** Rendered width and height in px. */
  size?: number;
  /** Which state the iris shows. Defaults to "working", the brand's resting look. */
  state?: LaneState;
  /** "dark" = dark tile, white lens (on light backgrounds). "light" = the inverse, for dark backgrounds. */
  tone?: "dark" | "light";
  /** Accessible name. Omit for decorative use (next to the wordmark). */
  title?: string;
} & Omit<SVGProps<SVGSVGElement>, "children">;

/**
 * The BotLane mark: Lane's tile with a single lens. The tile and lens never change;
 * the iris inside shows Lane's state. Pure SVG + CSS, so it renders on the server;
 * use <LaneMarkCycle> to play the states on a loop.
 */
export function LaneMark({ size = 24, state = "working", tone = "dark", title, className, ...rest }: LaneMarkProps) {
  const tile = tone === "dark" ? "#1d1d1f" : "#ffffff";
  const lens = tone === "dark" ? "#ffffff" : "#1d1d1f";
  const faint = tone === "dark" ? "#1d1d1f" : "#ffffff";
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      data-state={state}
      className={className ? `bl-lm ${className}` : "bl-lm"}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      {...rest}
    >
      <rect x="2" y="2" width="28" height="28" rx="10" fill={tile} />
      <circle cx="16" cy="16" r="8.2" fill={lens} />
      <g className="bl-lm-breath">
        <circle className="bl-lm-ring" cx="16" cy="16" r="5.4" fill="none" stroke={faint} strokeOpacity={0.14} strokeWidth={1.2} />
      </g>

      <g className="bl-lm-g bl-lm-ready">
        <circle cx="16" cy="16" r="2.2" fill="#a1a1a8" />
      </g>
      <g className="bl-lm-g bl-lm-working">
        <g className="bl-lm-orbit">
          <circle cx="16" cy="16" r="5.4" fill="none" stroke={faint} strokeOpacity={0.55} strokeWidth={1.4}
            strokeLinecap="round" strokeDasharray="5 29" />
        </g>
        <circle className="bl-lm-pupil" cx="16" cy="16" r="2.9" fill="#e0312b" />
      </g>
      <g className="bl-lm-g bl-lm-waiting">
        <circle cx="16" cy="16" r="2.9" fill="#f2a516" />
      </g>
      <g className="bl-lm-g bl-lm-done">
        <g className="bl-lm-pop">
          <circle cx="16" cy="16" r="4" fill="#1a7f37" />
          <path d="M14.2 16.1l1.3 1.3 2.5-2.6" fill="none" stroke="#ffffff" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
      <g className="bl-lm-g bl-lm-paused">
        <rect x="14.3" y="13.8" width="1.3" height="4.4" rx="0.6" fill="#8e8e93" />
        <rect x="16.4" y="13.8" width="1.3" height="4.4" rx="0.6" fill="#8e8e93" />
      </g>
      <g className="bl-lm-g bl-lm-issue">
        <circle cx="16" cy="16" r="3.2" fill="#e0312b" />
        <rect x="15.5" y="14.2" width="1" height="2.3" rx="0.5" fill="#ffffff" />
        <circle cx="16" cy="17.6" r="0.55" fill="#ffffff" />
      </g>
    </svg>
  );
}
