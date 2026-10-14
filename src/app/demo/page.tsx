"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LaneMarkCycle } from "@/components/lane-mark-cycle";

const AVAILABLE_DAYS = [
  { day: "Thu", date: "Oct 15", full: "Thursday, October 15" },
  { day: "Fri", date: "Oct 16", full: "Friday, October 16" },
  { day: "Mon", date: "Oct 19", full: "Monday, October 19" },
  { day: "Tue", date: "Oct 20", full: "Tuesday, October 20" },
  { day: "Wed", date: "Oct 21", full: "Wednesday, October 21" },
];

const TIME_SLOTS = [
  "09:30 AM",
  "11:00 AM",
  "01:30 PM",
  "03:00 PM",
  "04:30 PM",
];

export default function DemoPage() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedTime, setSelectedTime] = useState<string>("11:00 AM");
  const [timezone, setTimezone] = useState("America/New_York (EST)");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [agency, setAgency] = useState("");
  const [clients, setClients] = useState("10-25 clients");
  const [primaryInterest, setPrimaryInterest] = useState("Full Suite (All 3 Systems)");
  const [isBooked, setIsBooked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim()) {
      setIsBooked(true);
    }
  };

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-bg">
        {/* Hero Section */}
        <section className="relative mx-auto max-w-[75rem] px-6 pt-16 pb-14 text-center sm:pt-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-lane">
            <LaneMarkCycle size={14} />
            <span>20-Minute Operational Walkthrough</span>
          </div>

          <h1 className="mt-5 text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[1.02] tracking-[-0.04em] text-ink">
            See Lane run on your agency&apos;s numbers.
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Pick a time that suits you. We will connect a test data stream, synthesize real client reports and invoice reminders,
            and demonstrate the 1-click human approval desk live.
          </p>
        </section>

        {/* Interactive Booking Container */}
        <section className="mx-auto max-w-[68.75rem] px-6 pb-24">
          <div className="overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-[0_1.25rem_3.75rem_rgba(20,20,40,0.06)]">
            {isBooked ? (
              /* Success / Confirmation State */
              <div className="p-8 text-center sm:p-16">
                <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                  <CheckCircle2 size={36} />
                </div>

                <h2 className="mt-6 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  You are scheduled with Lane Engineering!
                </h2>

                <p className="mx-auto mt-3 max-w-lg text-sm text-muted">
                  We sent a Google Meet calendar invitation to <strong className="text-ink">{email}</strong> for{" "}
                  <strong className="text-ink">{AVAILABLE_DAYS[selectedDay].full} at {selectedTime}</strong> ({timezone}).
                </p>

                <div className="mx-auto mt-8 max-w-md rounded-[1.125rem] border border-line bg-surface/60 p-5 text-left text-xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-muted">Host:</span>
                    <span className="font-semibold text-ink">Alex Vance (Head of Solutions)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted">Agency:</span>
                    <span className="font-semibold text-ink">{agency || "Your Agency"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted">Primary Focus:</span>
                    <span className="font-mono text-lane font-medium">{primaryInterest}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted">Location:</span>
                    <span className="flex items-center gap-1 text-emerald-700 font-medium">
                      <Video size={13} />
                      <span>Google Meet (Link included in invite)</span>
                    </span>
                  </div>
                </div>

                <div className="mt-8 flex justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => setIsBooked(false)}
                    className="rounded-[0.5rem] border border-line bg-white px-4 py-2 text-xs font-semibold text-ink hover:bg-surface"
                  >
                    Reschedule or change time
                  </button>
                  <Link
                    href="/systems"
                    className="inline-flex items-center gap-1.5 rounded-[0.5rem] bg-btn px-4 py-2 text-xs font-semibold text-white hover:bg-btn-hover"
                  >
                    <span>Explore Systems while you wait</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ) : (
              /* Two-Column Booking Schedule Form */
              <div className="grid lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-line">
                {/* Left Column: Calendar Date & Time Slot Picker */}
                <div className="p-6 sm:p-8 lg:col-span-7">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-muted">
                      <CalendarIcon size={14} className="text-lane" />
                      <span>Select Date & Time</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted">
                      <Clock size={13} />
                      <span>20 mins</span>
                    </div>
                  </div>

                  {/* Day Picker */}
                  <div className="mt-6">
                    <label className="text-xs font-medium text-ink">Available Days (This & Next Week)</label>
                    <div className="mt-2.5 grid grid-cols-5 gap-2">
                      {AVAILABLE_DAYS.map((d, idx) => (
                        <button
                          key={d.date}
                          type="button"
                          onClick={() => setSelectedDay(idx)}
                          className={`flex flex-col items-center rounded-[0.75rem] p-2.5 text-center transition border ${
                            selectedDay === idx
                              ? "border-lane bg-lane/5 text-lane font-semibold shadow-sm"
                              : "border-line bg-surface/50 text-muted hover:border-line hover:text-ink hover:bg-white"
                          }`}
                        >
                          <span className="font-mono text-[0.6875rem] uppercase">{d.day}</span>
                          <span className="mt-1 font-mono text-sm font-bold text-ink">{d.date.split(" ")[1]}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div className="mt-6">
                    <label className="text-xs font-medium text-ink">
                      Available Windows ({AVAILABLE_DAYS[selectedDay].full})
                    </label>
                    <div className="mt-2.5 grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTime(slot)}
                          className={`rounded-[0.625rem] py-2.5 px-3 text-xs font-mono font-medium transition border ${
                            selectedTime === slot
                              ? "border-btn bg-btn text-white"
                              : "border-line bg-white text-ink hover:bg-surface"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Timezone Selector */}
                  <div className="mt-6 border-t border-line/60 pt-4">
                    <label htmlFor="tz-select" className="text-xs text-muted">Timezone</label>
                    <select
                      id="tz-select"
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      className="mt-1.5 w-full rounded-[0.5rem] border border-line bg-surface/50 px-3 py-2 text-xs text-ink focus:outline-none focus:border-lane"
                    >
                      <option value="America/New_York (EST)">America/New York (EST / UTC-4)</option>
                      <option value="America/Chicago (CST)">America/Chicago (CST / UTC-5)</option>
                      <option value="America/Los_Angeles (PST)">America/Los Angeles (PST / UTC-7)</option>
                      <option value="Europe/London (GMT)">Europe/London (GMT / UTC+1)</option>
                      <option value="Asia/Dubai (GST)">Asia/Dubai (GST / UTC+4)</option>
                      <option value="Asia/Singapore (SGT)">Asia/Singapore (SGT / UTC+8)</option>
                    </select>
                  </div>

                  {/* Walkthrough Agenda */}
                  <div className="mt-8 rounded-[1rem] bg-surface/60 p-4.5 border border-line/60 text-xs text-muted space-y-2">
                    <div className="font-semibold text-ink text-[0.6875rem] uppercase font-mono">
                      What happens on this call:
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-lane">05m</span>
                      <span>Audit your current reporting and invoice follow-up hours.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-lane">10m</span>
                      <span>Live demonstration of Lane synthesizing ad metrics and drafts.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-lane">05m</span>
                      <span>Sandbox setup plan and pricing alignment for your roster.</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Intake Form */}
                <div className="p-6 sm:p-8 lg:col-span-5 flex flex-col justify-between">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="font-mono text-xs font-semibold uppercase tracking-wider text-muted">
                      Your Details
                    </div>

                    <div>
                      <label className="text-xs font-medium text-ink">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Alex Morgan"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1.5 w-full rounded-[0.5rem] border border-line bg-white px-3.5 py-2.5 text-xs text-ink placeholder:text-muted/60 focus:outline-none focus:border-lane"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-ink">Work Email</label>
                      <input
                        type="email"
                        required
                        placeholder="alex@acmemarketing.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1.5 w-full rounded-[0.5rem] border border-line bg-white px-3.5 py-2.5 text-xs text-ink placeholder:text-muted/60 focus:outline-none focus:border-lane"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-ink">Agency / Company Name</label>
                      <input
                        type="text"
                        placeholder="Acme Growth Agency"
                        value={agency}
                        onChange={(e) => setAgency(e.target.value)}
                        className="mt-1.5 w-full rounded-[0.5rem] border border-line bg-white px-3.5 py-2.5 text-xs text-ink placeholder:text-muted/60 focus:outline-none focus:border-lane"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-ink">Active Client Roster Size</label>
                      <select
                        value={clients}
                        onChange={(e) => setClients(e.target.value)}
                        className="mt-1.5 w-full rounded-[0.5rem] border border-line bg-white px-3 py-2.5 text-xs text-ink focus:outline-none focus:border-lane"
                      >
                        <option value="1-9 clients">1 – 9 clients (Boutique)</option>
                        <option value="10-25 clients">10 – 25 clients (Mid-Market)</option>
                        <option value="26-50 clients">26 – 50 clients (Growing Enterprise)</option>
                        <option value="50+ clients">50+ clients (Large Agency Roster)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-ink">Primary System of Interest</label>
                      <select
                        value={primaryInterest}
                        onChange={(e) => setPrimaryInterest(e.target.value)}
                        className="mt-1.5 w-full rounded-[0.5rem] border border-line bg-white px-3 py-2.5 text-xs text-ink focus:outline-none focus:border-lane"
                      >
                        <option value="Full Suite (All 3 Systems)">Full Suite (All 3 Systems)</option>
                        <option value="System 01: Client Reporting">System 01: Client Reporting</option>
                        <option value="System 02: Lead Follow-Up">System 02: Lead Follow-Up</option>
                        <option value="System 03: Invoice Follow-Up">System 03: Invoice Follow-Up</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-[0.5rem] bg-btn text-xs font-semibold text-white shadow-sm transition hover:bg-btn-hover"
                    >
                      <Sparkles size={14} className="text-lane" />
                      <span>Confirm Demo for {selectedTime}</span>
                    </button>
                  </form>

                  <div className="mt-6 border-t border-line/60 pt-4 flex items-center gap-2 text-[0.6875rem] text-muted">
                    <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
                    <span>Zero spam. No high-pressure sales pitch. Just honest software.</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
