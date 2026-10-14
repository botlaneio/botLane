"use client";

import { Bell, Download, Settings } from "lucide-react";
import { Button, buttonClass } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select } from "@/components/ui/select";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs";
import { toast, Toaster } from "@/components/ui/toast";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[1.25rem] border border-line bg-white p-6 sm:p-8">
      <h2 className="mb-5 text-[0.75rem] font-medium tracking-[0.08em] text-faint uppercase">{title}</h2>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </section>
  );
}

export function UiPreview() {
  return (
    <Toaster>
      <main className="min-h-dvh bg-surface px-4 py-16 sm:px-8">
        <div className="mx-auto flex max-w-3xl flex-col gap-6">
          <header className="mb-4">
            <h1 className="text-[2rem] font-semibold tracking-[-0.02em] text-ink">BotLane UI</h1>
            <p className="mt-2 text-[0.9375rem] text-muted">
              Built on Base UI (MIT). Look inspired by{" "}
              <a className="text-lane-gradient underline underline-offset-2" href="https://github.com/dqnamo/Chord">
                Chord by dqnamo
              </a>
              .
            </p>
          </header>

          <Section title="Button">
            <Button>Primary</Button>
            <Button variant="lane">Lane</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button size="sm">Small</Button>
            <Button disabled>Disabled</Button>
          </Section>

          <Section title="Dialog">
            <Dialog>
              <DialogTrigger className={buttonClass()}>Open dialog</DialogTrigger>
              <DialogContent>
                <DialogTitle>Approve this report?</DialogTitle>
                <DialogDescription>Lane drafted the October report for Acme. It goes out as soon as you approve.</DialogDescription>
                <DialogFooter>
                  <DialogClose className={buttonClass("secondary")}>Not yet</DialogClose>
                  <DialogClose className={buttonClass("primary")}>Approve</DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </Section>

          <Section title="Toast">
            <Button variant="secondary" onClick={() => toast.add({ title: "Report sent", description: "Acme got the October report.", type: "success" })}>
              Success
            </Button>
            <Button variant="secondary" onClick={() => toast.add({ title: "Invoice reminder failed", description: "The email bounced. Check the address.", type: "error" })}>
              Error
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                const id = toast.add({ title: "Lead followed up", description: "Lane sent a reply to Jordan.", actionProps: { children: "Undo", onClick: () => toast.close(id) } });
              }}
            >
              With action
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                toast.promise(new Promise((r) => setTimeout(r, 1800)), {
                  loading: "Syncing invoices…",
                  success: "Invoices synced",
                  error: "Sync failed",
                })
              }
            >
              Loading
            </Button>
          </Section>

          <Section title="Select">
            <Select
              label="Lane"
              placeholder="Choose a lane"
              className="w-64"
              options={[
                { label: "Client Reporting", value: "reporting" },
                { label: "Lead Follow-up", value: "leads" },
                { label: "Invoice Follow-up", value: "invoices" },
                { label: "Agent Lane (all three)", value: "agent", disabled: true },
              ]}
            />
          </Section>

          <Section title="Tooltip">
            <TooltipProvider>
              {[
                { icon: Bell, label: "Notifications" },
                { icon: Download, label: "Download report" },
                { icon: Settings, label: "Settings" },
              ].map(({ icon: Icon, label }) => (
                <Tooltip key={label} content={label}>
                  <button aria-label={label} className={buttonClass("secondary", "md", "size-10 px-0")}>
                    <Icon className="size-4" aria-hidden />
                  </button>
                </Tooltip>
              ))}
            </TooltipProvider>
          </Section>

          <Section title="Tabs">
            <Tabs defaultValue="reporting" className="w-full">
              <TabsList>
                <TabsTab value="reporting">Reporting</TabsTab>
                <TabsTab value="leads">Leads</TabsTab>
                <TabsTab value="invoices">Invoices</TabsTab>
              </TabsList>
              <TabsPanel value="reporting" className="text-[0.875rem] text-muted">Monthly client reports, drafted and ready to approve.</TabsPanel>
              <TabsPanel value="leads" className="text-[0.875rem] text-muted">New leads get a reply within minutes.</TabsPanel>
              <TabsPanel value="invoices" className="text-[0.875rem] text-muted">Polite reminders until the invoice is paid.</TabsPanel>
            </Tabs>
          </Section>
        </div>
      </main>
    </Toaster>
  );
}
