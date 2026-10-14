"use client";

import { Toast } from "@base-ui/react/toast";
import { CircleAlert, CircleCheck, LoaderCircle, X } from "lucide-react";
import { cn } from "./cn";

/**
 * Global toast manager. Render <Toaster /> once (e.g. in a layout), then call
 * `toast.add({ title, description, type })` from anywhere on the client.
 * type: "success" | "error" | "loading" | undefined.
 */
export const toast = Toast.createToastManager();

export function Toaster({ children }: { children?: React.ReactNode }) {
  return (
    <Toast.Provider toastManager={toast}>
      {children}
      <Toast.Portal>
        <Toast.Viewport className="fixed right-4 bottom-4 z-50 w-[calc(100vw-2rem)] sm:right-6 sm:bottom-6 sm:w-[22rem]">
          <ToastList />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  );
}

const icons: Record<string, React.ReactNode> = {
  success: <CircleCheck className="size-[1.125rem] text-ok" aria-hidden />,
  error: <CircleAlert className="size-[1.125rem] text-[#d93025]" aria-hidden />,
  loading: <LoaderCircle className="size-[1.125rem] animate-spin text-lane" aria-hidden />,
};

// Stacking/swipe transforms follow the Base UI toast docs; colours and shape are ours.
const rootClass = cn(
  "[--gap:0.75rem] [--peek:0.625rem] [--scale:calc(max(0,1-(var(--toast-index)*0.08)))] [--shrink:calc(1-var(--scale))] [--height:var(--toast-frontmost-height,var(--toast-height))] [--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))]",
  "absolute right-0 bottom-0 z-[calc(1000-var(--toast-index))] w-full origin-bottom select-none rounded-2xl border border-line bg-white text-ink shadow-[0_0.75rem_2rem_-0.5rem_rgb(18_18_20/0.22)]",
  "h-(--height) data-expanded:h-(--toast-height) [transition:transform_0.5s_cubic-bezier(0.22,1,0.36,1),opacity_0.5s,height_0.15s]",
  "[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))]",
  "data-expanded:[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--offset-y)))]",
  "after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']",
  "data-limited:opacity-0 data-ending-style:opacity-0 data-starting-style:[transform:translateY(150%)]",
  "[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(150%)]",
  "data-ending-style:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]",
  "data-ending-style:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]",
  "data-ending-style:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]",
  "data-ending-style:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]",
);

function ToastList() {
  const { toasts } = Toast.useToastManager();
  return toasts.map((t) => (
    <Toast.Root key={t.id} toast={t} swipeDirection={["right", "down"]} className={rootClass}>
      <Toast.Content className="flex items-start gap-3 overflow-hidden p-4 transition-opacity duration-250 data-behind:opacity-0 data-expanded:opacity-100">
        {t.type && icons[t.type] && <span className="mt-px shrink-0">{icons[t.type]}</span>}
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <Toast.Title className="text-[0.875rem] font-semibold" />
          <Toast.Description className="text-[0.8125rem] leading-snug text-muted" />
          <Toast.Action className="mt-2 self-start rounded-full bg-btn px-3 py-1 text-[0.75rem] font-medium text-white hover:bg-btn-hover" />
        </div>
        <Toast.Close
          aria-label="Dismiss"
          className="-mt-1 -mr-1 inline-flex size-7 shrink-0 items-center justify-center rounded-full text-faint transition-colors hover:bg-surface hover:text-ink"
        >
          <X className="size-3.5" aria-hidden />
        </Toast.Close>
      </Toast.Content>
    </Toast.Root>
  ));
}
