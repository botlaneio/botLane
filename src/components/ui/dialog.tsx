"use client";

import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import * as React from "react";
import { cn } from "./cn";

export const Dialog = BaseDialog.Root;
export const DialogTrigger = BaseDialog.Trigger;
export const DialogClose = BaseDialog.Close;

type ContentProps = React.ComponentProps<typeof BaseDialog.Popup> & {
  className?: string;
  /** Hide the round close button in the corner. */
  hideClose?: boolean;
};

/** Backdrop + centred panel. Put DialogTitle, DialogDescription and DialogFooter inside. */
export function DialogContent({ className, children, hideClose, ...props }: ContentProps) {
  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop className="fixed inset-0 z-50 min-h-dvh bg-[#121214]/40 backdrop-blur-[2px] transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-[-webkit-touch-callout:none]:absolute" />
      <BaseDialog.Popup
        className={cn(
          "fixed top-1/2 left-1/2 z-50 flex w-[28rem] max-w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 flex-col gap-5 rounded-[1.25rem] border border-line bg-white p-6 text-ink shadow-[0_1.5rem_3rem_-0.75rem_rgb(18_18_20/0.25),0_0_0_1px_rgb(18_18_20/0.02)] outline-none transition-[scale,opacity] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] data-ending-style:scale-[0.96] data-ending-style:opacity-0 data-starting-style:scale-[0.96] data-starting-style:opacity-0",
          className,
        )}
        {...props}
      >
        {children}
        {!hideClose && (
          <BaseDialog.Close
            aria-label="Close"
            className="absolute top-4 right-4 inline-flex size-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-ink"
          >
            <X className="size-4" aria-hidden />
          </BaseDialog.Close>
        )}
      </BaseDialog.Popup>
    </BaseDialog.Portal>
  );
}

export function DialogTitle({ className, ...props }: React.ComponentProps<typeof BaseDialog.Title> & { className?: string }) {
  return <BaseDialog.Title className={cn("pr-8 text-[1.125rem] font-semibold tracking-[-0.01em] text-ink", className)} {...props} />;
}

export function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof BaseDialog.Description> & { className?: string }) {
  return <BaseDialog.Description className={cn("-mt-3 text-[0.875rem] leading-relaxed text-muted", className)} {...props} />;
}

export function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mt-1 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)} {...props} />;
}
