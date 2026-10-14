// Content for the scroll-to-assemble board.
// Tool names, people and amounts are placeholders: swap in real details here.

export const ICON = {
  target: "M12 3a9 9 0 1 1 0 18a9 9 0 1 1 0-18z M12 8a4 4 0 1 1 0 8a4 4 0 1 1 0-8z",
  bars: "M4 20V11 M10 20V5 M16 20v-7 M3 20h18",
  megaphone: "M3 10v4h4l6 4V6L7 10H3z M17 9a4 4 0 0 1 0 6",
  people:
    "M9 4.8a3.2 3.2 0 1 1 0 6.4a3.2 3.2 0 1 1 0-6.4z M3.5 19c.8-3.2 3-5 5.5-5s4.7 1.8 5.5 5 M17 6.6a2.4 2.4 0 1 1 0 4.8 M16 14.2c2.3.1 4 1.7 4.6 4.3",
  doc: "M7 3h7l5 5v13H7z M14 3v5h5M10 13h6M10 17h6",
  mail: "M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z M3 7l9 6 9-6",
  ledger: "M6 3h12v18l-3-2-3 2-3-2-3 2z M9 8h6 M9 12h6",
  calendar:
    "M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z M3 10h18 M8 3v4 M16 3v4 M9 15l2 2 4-4",
  bank: "M3 10l9-6 9 6 M5 10v8 M9 10v8 M15 10v8 M19 10v8 M3 20h18",
  person: "M12 4.9a3.6 3.6 0 1 1 0 7.2a3.6 3.6 0 1 1 0-7.2z M5 20c1-3.6 3.8-5.6 7-5.6s6 2 7 5.6",
} as const;

/** 01 · Client reporting — the four sources that funnel into Lane. */
export const SOURCES = [
  { name: "Google Ads", meta: "3 campaigns", icon: ICON.target, pill: "Synced" },
  { name: "Analytics", meta: "2 properties", icon: ICON.bars, pill: "Synced" },
  { name: "Meta Ads", meta: "5 new leads", icon: ICON.megaphone, pill: "New", hot: true },
  { name: "HubSpot", meta: "6 deals moved", icon: ICON.people, pill: "Ready" },
] as const;
export const SOURCE_TOP = 120;
export const SOURCE_STEP = 88;

/** What Lane works on for each system (the Automation card). */
export const RUNS = [
  { run: "RUN-1842", title: "Weekly client report", steps: ["Pulled 4 sources", "Built the charts", "Wrote the summary"] },
  { run: "RUN-1843", title: "Reply to Zuheb", steps: ["Read his enquiry", "Checked your calendar", "Drafted 3 messages"] },
  { run: "RUN-1844", title: "INV-2041 · Acme Co", steps: ["Matched bank payments", "14 days still unpaid", "Drafted a firmer note"] },
] as const;

/** What you are asked to approve for each system (the Approval card). */
export const APPROVALS = [
  {
    question: "Send the weekly report to Acme?",
    icon: ICON.doc,
    doc: "Weekly client report",
    meta: "12 pages · PDF",
    button: "Approve and send",
    done: "Approved · sending",
  },
  {
    question: "Reply to Zuheb and start his follow-ups?",
    icon: ICON.mail,
    doc: "Reply + 2 follow-ups",
    meta: "Written in your tone",
    button: "Approve the sequence",
    done: "Approved · running",
  },
  {
    question: "Send Acme the firmer reminder?",
    icon: ICON.ledger,
    doc: "Reminder 2 · INV-2041",
    meta: "Firmer tone, pay link",
    button: "Approve and send",
    done: "Approved · sent",
  },
] as const;

/** 02 · Lead follow-up — the stops on the line. */
export const TOUCHES = [
  { y: 150, when: "TODAY", what: "Reply sent" },
  { y: 236, when: "DAY 2", what: "Gentle nudge" },
  { y: 322, when: "DAY 5", what: "Check-in" },
] as const;

export const CAPTIONS = [
  { title: "Your work is in pieces.", sub: "Emails here, records there, numbers somewhere else." },
  { title: "Client reporting: many in, one out.", sub: "Lane pulls four sources into one report. You OK it, and it goes out." },
  {
    title: "Lead follow-up: one lead, a run of touches.",
    sub: "A reply today, a nudge on day 2, a check-in on day 5, until the meeting is booked.",
  },
  { title: "Invoice follow-up: it loops until it’s paid.", sub: "Each reminder a little firmer. You OK the firm ones." },
  { title: "Three systems. One hire. Your OK.", sub: "Lane handles the work. You handle the yes." },
] as const;

export const SYSTEM_LABELS = ["01 Client reporting", "02 Lead follow-up", "03 Invoice follow-up"] as const;

export const REPORT_BARS = [
  [38, "#e4e5ea"],
  [52, "#e4e5ea"],
  [46, "#e4e5ea"],
  [64, "#e4e5ea"],
  [58, "#e4e5ea"],
  [76, "#1d1d1f"],
  [92, "#5a2cb8"],
] as const;
