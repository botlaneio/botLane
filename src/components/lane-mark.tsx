import "./lane-mark.css";

/**
 * The BotLane mark: Lane's dark tile with a white visor and red eye.
 * With `animated`, the eye glances along the visor, then turns into a green check:
 * Lane does the work, you OK it. CSS only; prefers-reduced-motion keeps it still.
 */
export function LaneMark({ size = 24, animated = false }: { size?: number; animated?: boolean }) {
  return (
    <svg className={animated ? "bl-lanemark is-live" : "bl-lanemark"} width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect x="1" y="1" width="30" height="30" rx="9" fill="#1d1d1f" />
      <rect x="6" y="12.5" width="20" height="7" rx="3.5" fill="#ffffff" />
      <g className="bl-lm-eye">
        <circle cx="16" cy="16" r="2.2" fill="#e0312b" />
      </g>
      <g className="bl-lm-ok">
        <circle cx="16" cy="16" r="5" fill="#1a7f37" />
        <path d="M13.6 16.1l1.7 1.7 3.2-3.3" fill="none" stroke="#ffffff" strokeWidth="1.6"
          strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
