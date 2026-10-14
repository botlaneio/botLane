"use client";

import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import * as React from "react";
import { cn } from "./cn";

export const Tabs = BaseTabs.Root;

/** Pill track with a sliding dark-grey indicator under the active tab. */
export function TabsList({ className, children, ...props }: React.ComponentProps<typeof BaseTabs.List> & { className?: string }) {
  return (
    <BaseTabs.List className={cn("relative z-0 inline-flex items-center gap-1 rounded-full bg-surface p-1", className)} {...props}>
      {children}
      <BaseTabs.Indicator className="absolute top-1/2 left-0 -z-1 h-(--active-tab-height) w-(--active-tab-width) translate-x-(--active-tab-left) -translate-y-1/2 rounded-full bg-btn shadow-[0_0.25rem_0.75rem_-0.25rem_rgb(18_18_20/0.4)] transition-[translate,width] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]" />
    </BaseTabs.List>
  );
}

export function TabsTab({ className, ...props }: React.ComponentProps<typeof BaseTabs.Tab> & { className?: string }) {
  return (
    <BaseTabs.Tab
      className={cn(
        "inline-flex h-8 select-none items-center justify-center gap-1.5 rounded-full px-3.5 text-[0.8125rem] font-medium whitespace-nowrap text-muted outline-none transition-colors duration-200 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lane data-active:text-white data-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export function TabsPanel({ className, ...props }: React.ComponentProps<typeof BaseTabs.Panel> & { className?: string }) {
  return <BaseTabs.Panel className={cn("mt-4 outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lane", className)} {...props} />;
}
