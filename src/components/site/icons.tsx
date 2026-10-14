export function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M10 2.5a7.5 7.5 0 0 0-6.4 11.4L2.7 17.3l3.5-.9A7.5 7.5 0 1 0 10 2.5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Arrow() {
  return (
    <span className="ar" aria-hidden="true">
      →
    </span>
  );
}

export function Check({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" aria-hidden="true">
      <path d="M2 5.2l2 1.9L8 3" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
