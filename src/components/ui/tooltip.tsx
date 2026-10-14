"use client";

import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import * as React from "react";
import { cn } from "./cn";

/** Optional: wrap a group of tooltips so moving between them opens the next one instantly. */
export const TooltipProvider = BaseTooltip.Provider;

type TooltipProps = {
  /** What appears in the bubble. */
  content: React.ReactNode;
  /** The element that shows the tooltip on hover/focus. Must accept a ref (a button, link, etc.). */
  children: React.ReactElement;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
  delay?: number;
};

export function Tooltip({ content, children, side = "top", className, delay = 300 }: TooltipProps) {
  return (
    <BaseTooltip.Root>
      <BaseTooltip.Trigger delay={delay} render={children} />
      <BaseTooltip.Portal>
        <BaseTooltip.Positioner side={side} sideOffset={8} className="z-50">
          <BaseTooltip.Popup
            className={cn(
              "origin-(--transform-origin) rounded-lg bg-btn px-2.5 py-1.5 text-[0.75rem] font-medium text-white shadow-[0_0.5rem_1.25rem_-0.25rem_rgb(18_18_20/0.35)] transition-[scale,opacity] duration-150 data-ending-style:scale-95 data-ending-style:opacity-0 data-instant:transition-none data-starting-style:scale-95 data-starting-style:opacity-0",
              className,
            )}
          >
            {content}
          </BaseTooltip.Popup>
        </BaseTooltip.Positioner>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
  );
}
