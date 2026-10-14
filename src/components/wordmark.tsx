/** Plain text wordmark, used until the new logo is ready. */
export function Wordmark({ className }: { className?: string }) {
  return <span className={`font-semibold tracking-[-0.035em] ${className ?? ""}`}>botLane</span>;
}
