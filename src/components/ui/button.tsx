"use client";

import { Button as BaseButton } from "@base-ui/react/button";
import * as React from "react";
import { cn } from "./cn";

type Variant = "primary" | "secondary" | "ghost" | "lane";
type Size = "sm" | "md";

const variants: Record<Variant, string> = {
  primary: "bg-btn text-white hover:bg-btn-hover",
  secondary: "border border-line bg-white text-ink hover:bg-surface",
  ghost: "text-ink-2 hover:bg-surface hover:text-ink",
  lane: "bg-lane-gradient text-white hover:brightness-110",
};

const sizes: Record<Size, string> = {
  sm: "h-8 gap-1.5 px-3 text-[0.8125rem]",
  md: "h-10 gap-2 px-4 text-[0.875rem]",
};

/** Shared look for anything that should read as a button (triggers, close buttons). */
export function buttonClass(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(
    "inline-flex select-none items-center justify-center whitespace-nowrap rounded-full font-medium transition-[background-color,color,filter,scale] duration-150 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );
}

export type ButtonProps = React.ComponentProps<typeof BaseButton> & {
  variant?: Variant;
  size?: Size;
  className?: string;
};

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return <BaseButton className={buttonClass(variant, size, className)} {...props} />;
}
