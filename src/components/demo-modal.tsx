"use client";

import { useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X, Check, Calendar, Clock, ArrowRight } from "lucide-react";
import { LaneMarkCycle } from "./lane-mark-cycle";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SYSTEMS = [
  "All 3 systems",
  "Client reporting (Funnel)",
  "Lead follow-up (Line)",
  "Invoice follow-up (Loop)",
];

const TIME_SLOTS = [
  "Tomorrow at 10:00 AM",
  "Tomorrow at 2:00 PM",
  "Thursday at 11:30 AM",
  "Friday at 3:00 PM",
];

export function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [system, setSystem] = useState(SYSTEMS[0]);
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[0]);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    setEmail("");
    setCompany("");
    onClose();
  };

  return (
    // Base UI dialog: focus trap, Escape and outside-click to close, scroll lock.
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
          <DialogContent
            hideClose
            className="block! max-h-[calc(100dvh-2rem)]! w-[31.25rem]! overflow-y-auto! rounded-[1.5rem]! p-7! shadow-[0_1.5rem_3.125rem_rgba(20,20,40,0.14)]!"
          >
            <DialogClose
              aria-label="Close dialog"
              className="absolute top-5 right-5 flex size-8 items-center justify-center rounded-[0.5rem] text-muted transition-colors hover:bg-surface hover:text-ink"
            >
              <X size={18} />
            </DialogClose>

            {submitted ? (
              <div className="py-6 text-center">
                <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-ok/10 text-ok">
                  <Check size={28} strokeWidth={2.5} />
                </div>
                <DialogTitle className="pr-0! text-2xl! font-semibold! tracking-[-0.03em]! text-ink!">
                  Demo confirmed
                </DialogTitle>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  We reserved your 15-minute walkthrough for{" "}
                  <span className="font-semibold text-ink">{timeSlot}</span>. An invitation has been sent to{" "}
                  <span className="font-semibold text-ink">{email}</span>.
                </p>
                <div className="mt-6 rounded-xl border border-line bg-surface p-4 text-left text-xs text-muted">
                  <div className="font-medium text-ink">What to expect:</div>
                  <div className="mt-1">
                    Live walkthrough of {system}. You will see real approval cards and output triggers.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-6 inline-flex h-11 items-center justify-center rounded-[0.5rem] bg-btn px-6 text-sm font-medium text-white transition-colors hover:bg-btn-hover"
                >
                  Done
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2.5">
                  <LaneMarkCycle size={26} />
                  <span className="font-mono text-xs uppercase tracking-[0.1em] text-lane">
                    Live Walkthrough
                  </span>
                </div>

                <DialogTitle className="mt-3! text-2xl! font-semibold! tracking-[-0.03em]! text-ink!">
                  Book a 15-minute demo
                </DialogTitle>
                <p className="mt-1.5 text-[0.875rem] leading-relaxed text-muted">
                  See how Lane handles the busywork while keeping you in complete control of every approval.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="demo-email" className="block text-xs font-medium text-ink-2">
                      Work Email
                    </label>
                    <input
                      id="demo-email"
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-line bg-surface/50 px-3.5 py-2.5 text-sm text-ink transition-colors placeholder:text-faint focus:border-lane focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="demo-company" className="block text-xs font-medium text-ink-2">
                      Company Name (Optional)
                    </label>
                    <input
                      id="demo-company"
                      type="text"
                      placeholder="Acme Studio"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-line bg-surface/50 px-3.5 py-2.5 text-sm text-ink transition-colors placeholder:text-faint focus:border-lane focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-ink-2">
                      System of Interest
                    </label>
                    <div className="mt-1.5 grid grid-cols-2 gap-2">
                      {SYSTEMS.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSystem(s)}
                          className={`rounded-[0.5rem] border px-2.5 py-2 text-left text-xs transition-colors ${
                            system === s
                              ? "border-lane bg-red-50/60 font-medium text-lane-ink"
                              : "border-line bg-white text-muted hover:border-muted/50 hover:text-ink"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-ink-2">
                      Select Preferred Slot
                    </label>
                    <div className="mt-1.5 flex flex-col gap-1.5">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setTimeSlot(slot)}
                          className={`flex items-center justify-between rounded-[0.5rem] border px-3 py-2 text-xs transition-colors ${
                            timeSlot === slot
                              ? "border-btn bg-btn text-white"
                              : "border-line bg-surface/30 text-muted hover:border-muted/50 hover:text-ink"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <Calendar size={13} />
                            {slot}
                          </span>
                          <Clock size={13} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !email}
                    className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-[0.5rem] bg-lane-strong text-sm font-medium text-white transition-all hover:bg-lane-ink disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      "Scheduling..."
                    ) : (
                      <>
                        <span>Confirm Walkthrough</span>
                        <ArrowRight size={15} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </DialogContent>
    </Dialog>
  );
}
