"use client";

import * as Accordion from "@radix-ui/react-accordion";

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <Accordion.Root type="single" collapsible className="border-b border-line">
      {items.map((it, i) => (
        <Accordion.Item key={it.q} value={`q${i}`} className="border-t border-line">
          <Accordion.Header asChild>
            <h3>
              <Accordion.Trigger className="group flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left text-[18px] font-medium tracking-[-0.01em]">
                {it.q}
                <span
                  aria-hidden="true"
                  className="grid size-8 flex-none place-items-center rounded-[8px] border border-line text-[18px] transition-transform duration-200 group-data-[state=open]:rotate-45"
                >
                  +
                </span>
              </Accordion.Trigger>
            </h3>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden pb-6 text-muted data-[state=closed]:hidden">
            <p className="max-w-[60ch]">{it.a}</p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
