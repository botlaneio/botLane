"use client";

import { Dialog } from "@base-ui/react/dialog";
import { Check, X } from "lucide-react";
import { FunnelCard } from "./funnel";
import type { SystemDemoConfig } from "./types";

/**
 * The demo funnel as a popup: a centred panel on tablets and desktops, a full-screen sheet on
 * phones. Same steps and state as the page; the page stays the target for direct links.
 */
export function DemoFunnelDialog({
  config,
  open,
  onOpenChange,
}: {
  config: SystemDemoConfig;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-[#121214]/40 backdrop-blur-[2px] transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup className="fixed inset-0 z-50 flex h-dvh w-full flex-col bg-white text-ink outline-none transition-[opacity,translate,scale] duration-[260ms] ease-[cubic-bezier(0.16,1,0.3,1)] data-ending-style:translate-y-4 data-ending-style:opacity-0 data-starting-style:translate-y-4 data-starting-style:opacity-0 motion-reduce:transition-opacity sm:inset-auto sm:top-1/2 sm:left-1/2 sm:h-auto sm:max-h-[calc(100dvh-3rem)] sm:w-[44rem] sm:max-w-[calc(100vw-3rem)] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[1.25rem] sm:border sm:border-line sm:shadow-[0_2rem_4rem_-1rem_rgb(18_18_20/0.28)] sm:data-ending-style:translate-y-[-48%] sm:data-ending-style:scale-[0.98] sm:data-starting-style:translate-y-[-48%] sm:data-starting-style:scale-[0.98]">
          <header className="flex shrink-0 items-start justify-between gap-4 px-5 pt-[max(1.25rem,env(safe-area-inset-top))] pb-4 sm:px-8 sm:pt-7">
            <div className="min-w-0">
              <div className="flex items-center gap-2 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-muted">
                <span aria-hidden className="size-1.5 rounded-full bg-lane" />
                {config.context.eyebrow}
              </div>
              <Dialog.Title className="mt-2 text-[1.25rem] font-semibold leading-[1.2] tracking-[-0.025em] text-ink sm:text-[1.375rem]">
                {config.context.headline}
              </Dialog.Title>
              <ul className="mt-2.5 hidden flex-wrap gap-x-4 gap-y-1.5 sm:flex">
                {config.context.points.map((point) => (
                  <li key={point} className="flex items-center gap-1.5 text-[0.8125rem] text-muted">
                    <Check className="size-3.5 text-[var(--bl-green)]" strokeWidth={2.4} aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <Dialog.Close
              aria-label="Close"
              className="-mt-1 -mr-2 inline-flex size-10 shrink-0 items-center justify-center rounded-full text-muted transition-colors duration-150 hover:bg-surface hover:text-ink focus-visible:outline-2 focus-visible:outline-lane"
            >
              <X className="size-[1.125rem]" aria-hidden />
            </Dialog.Close>
          </header>
          <FunnelCard config={config} variant="dialog" />
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
