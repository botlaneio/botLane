import { LaneMark } from "./lane-mark";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-6 py-10 text-sm text-muted">
        <div className="flex items-center gap-2.5 text-ink">
          <LaneMark size={20} />
          <span className="font-semibold tracking-[-0.03em]">botlane</span>
        </div>
        <span>© BotLane LLC</span>
      </div>
    </footer>
  );
}
