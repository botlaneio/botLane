// Generic line icons, not the brands' official logos.
const icons: Record<string, React.ReactNode> = {
  Gmail: <path d="M2 4h12v8H2z M2 4l6 5 6-5" fill="none" stroke="currentColor" strokeWidth="1.4" />,
  WhatsApp: (
    <path d="M8 2a6 6 0 0 0-5.1 9.2L2 14l2.9-.8A6 6 0 1 0 8 2z" fill="none" stroke="currentColor" strokeWidth="1.4" />
  ),
  Slack: <path d="M6 2v12M10 2v12M2 6h12M2 10h12" stroke="currentColor" strokeWidth="1.4" />,
  Notion: (
    <>
      <rect x="2.5" y="2.5" width="11" height="11" rx="2" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6 11V5l4 6V5" fill="none" stroke="currentColor" strokeWidth="1.3" />
    </>
  ),
  "Google Drive": (
    <path d="M5.5 2h5l4 7-2.5 4.5h-8L1.5 9z" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
  ),
};

export function ToolIcon({ name }: { name: string }) {
  const icon = icons[name];
  if (!icon) return null;
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className="flex-none">
      {icon}
    </svg>
  );
}

export const heroTools = ["Gmail", "WhatsApp", "Slack", "Notion", "Google Drive"];
