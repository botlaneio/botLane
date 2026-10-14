"use client";

import { Select as BaseSelect } from "@base-ui/react/select";
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";
import { cn } from "./cn";

export type SelectOption = { label: React.ReactNode; value: string; disabled?: boolean };

type SelectProps = {
  options: SelectOption[];
  label?: React.ReactNode;
  placeholder?: string;
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
};

export function Select({
  options,
  label,
  placeholder = "Select…",
  value,
  defaultValue,
  onValueChange,
  name,
  disabled,
  required,
  className,
}: SelectProps) {
  return (
    <div className={cn("flex flex-col items-start gap-1.5", className)}>
      <BaseSelect.Root<string>
        items={options}
        value={value}
        defaultValue={defaultValue}
        onValueChange={(v) => onValueChange?.(v)}
        name={name}
        disabled={disabled}
        required={required}
      >
        {label && <BaseSelect.Label className="text-[0.8125rem] font-medium text-ink-2">{label}</BaseSelect.Label>}
        <BaseSelect.Trigger className="flex h-10 w-full min-w-[12rem] select-none items-center justify-between gap-3 rounded-xl border border-line bg-white pr-2.5 pl-3.5 text-[0.875rem] text-ink transition-[border-color,box-shadow] hover:border-[#d9d9de] data-disabled:opacity-50 data-popup-open:border-lane/50 data-popup-open:shadow-[0_0_0_3px_var(--bl-red-tint)]">
          <BaseSelect.Value className="truncate data-placeholder:text-faint" placeholder={placeholder} />
          <BaseSelect.Icon className="text-faint">
            <ChevronsUpDown className="size-4" aria-hidden />
          </BaseSelect.Icon>
        </BaseSelect.Trigger>
        <BaseSelect.Portal>
          <BaseSelect.Positioner className="z-50 outline-none select-none" sideOffset={6} alignItemWithTrigger={false}>
            <BaseSelect.Popup className="min-w-(--anchor-width) origin-(--transform-origin) rounded-xl border border-line bg-white p-1 text-ink shadow-[0_1rem_2rem_-0.5rem_rgb(18_18_20/0.2)] outline-none transition-[scale,opacity] duration-150 data-ending-style:scale-[0.97] data-ending-style:opacity-0 data-starting-style:scale-[0.97] data-starting-style:opacity-0">
              <BaseSelect.List className="max-h-(--available-height) overflow-y-auto">
                {options.map((o) => (
                  <BaseSelect.Item
                    key={o.value}
                    value={o.value}
                    disabled={o.disabled}
                    className="grid cursor-default grid-cols-[1fr_1rem] items-center gap-3 rounded-lg py-2 pr-2.5 pl-3 text-[0.875rem] outline-none select-none data-disabled:opacity-40 data-highlighted:bg-surface data-selected:font-medium"
                  >
                    <BaseSelect.ItemText>{o.label}</BaseSelect.ItemText>
                    <BaseSelect.ItemIndicator className="text-lane">
                      <Check className="size-4" aria-hidden />
                    </BaseSelect.ItemIndicator>
                  </BaseSelect.Item>
                ))}
              </BaseSelect.List>
            </BaseSelect.Popup>
          </BaseSelect.Positioner>
        </BaseSelect.Portal>
      </BaseSelect.Root>
    </div>
  );
}
