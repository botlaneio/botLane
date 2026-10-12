/** The BotLane mark: a dark tile with Lane's red eye. */
export function LaneMark({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 420 420" aria-hidden="true">
      <rect x="0" y="0" width="420" height="420" rx="104" fill="#1d1d1f" />
      <rect x="62" y="166" width="296" height="88" rx="44" fill="#3a3a3c" />
      <circle cx="250" cy="210" r="28" fill="#e0312b" />
    </svg>
  );
}
