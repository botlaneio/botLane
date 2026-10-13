// Copy for the three system pages, the home page cards and the Systems menu.
// Everything here is first-draft copy: edit it freely, the pages read from this file.

export type ToolId =
  | "google-ads"
  | "google-analytics"
  | "meta-ads"
  | "hubspot"
  | "google-drive"
  | "gmail"
  | "google-calendar"
  | "typeform"
  | "stripe"
  | "quickbooks"
  | "plaid";

export type Faq = { q: string; a: string };

export type FlowCard =
  | { kind: "sources"; title: string; items: { tool: ToolId; name: string; meta: string }[] }
  | { kind: "run"; title: string; run: string; task: string; steps: string[] }
  | { kind: "approve"; title: string; question: string; doc: string; meta: string; tool: ToolId; button: string }
  | { kind: "output"; title: string; status: string; doc: string; meta: string; tool: ToolId };

export type System = {
  slug: "client-reporting" | "lead-follow-up" | "invoice-follow-up";
  num: "01" | "02" | "03";
  shape: "Funnel" | "Line" | "Loop";
  title: string;
  tagline: string;
  summary: string;
  lead: string;
  steps: { title: string; body: string }[];
  tools: ToolId[];
  approve: { title: string; body: string }[];
  flow: [FlowCard, FlowCard, FlowCard, FlowCard];
  faq: Faq[];
};

export const SYSTEMS: System[] = [
  {
    slug: "client-reporting",
    num: "01",
    shape: "Funnel",
    title: "Client reporting",
    tagline: "Many in, one out.",
    summary:
      "Lane pulls your ad, analytics and CRM numbers into one weekly report per client. You approve it, and it goes out on time.",
    lead:
      "Every week, Lane gathers the numbers from the tools you already use, builds each client's report, writes the summary and puts it on your desk. You read it, approve it, and it goes out in your name.",
    steps: [
      { title: "Lane gathers the numbers", body: "The week's figures from your ad accounts, analytics and CRM, pulled for each client." },
      { title: "Lane builds the report", body: "Charts, comparisons with last period, and a plain-English summary of what changed." },
      { title: "You approve it", body: "Read the draft, change anything you like, then approve. Nothing goes out before you do." },
      { title: "It goes out on time", body: "Sent to your client from your account, and filed where your team can find it." },
    ],
    tools: ["google-ads", "google-analytics", "meta-ads", "hubspot", "google-drive", "gmail"],
    approve: [
      { title: "The report", body: "Every chart and figure, before a client sees it." },
      { title: "The summary", body: "The words that explain the numbers, in your voice." },
      { title: "Who gets it, and when", body: "The recipients and the send time for each client." },
    ],
    flow: [
      {
        kind: "sources",
        title: "Input",
        items: [
          { tool: "google-ads", name: "Google Ads", meta: "3 campaigns" },
          { tool: "google-analytics", name: "Analytics", meta: "2 properties" },
          { tool: "meta-ads", name: "Meta Ads", meta: "5 new leads" },
          { tool: "hubspot", name: "HubSpot", meta: "6 deals moved" },
        ],
      },
      { kind: "run", title: "Automation", run: "RUN-1842", task: "Weekly client report", steps: ["Pulled 4 sources", "Built the charts", "Wrote the summary"] },
      {
        kind: "approve",
        title: "Approval",
        question: "Send the weekly report to Acme?",
        doc: "Weekly client report",
        meta: "12 pages · PDF",
        tool: "google-drive",
        button: "Approve and send",
      },
      { kind: "output", title: "Output", status: "Sent to Acme", doc: "Weekly client report", meta: "Google Drive · Week 41", tool: "google-drive" },
    ],
    faq: [
      { q: "Does Lane send a report without my approval?", a: "No. Every report waits for your OK. You can edit it first, or send it back with a note." },
      { q: "Can the report match how we do it today?", a: "Yes. We set up the layout, the metrics and the tone with you during onboarding, so the report looks like yours." },
      { q: "Which tools can it pull from?", a: "Ad platforms, analytics and your CRM to start. See the tools listed on this page, and ask us about anything else you use." },
    ],
  },
  {
    slug: "lead-follow-up",
    num: "02",
    shape: "Line",
    title: "Lead follow-up",
    tagline: "One lead, a run of touches.",
    summary:
      "Every new enquiry gets a reply in your tone, then a nudge and a check-in, until the meeting is booked.",
    lead:
      "When a new enquiry comes in, Lane reads it, checks your calendar and drafts a reply in your tone, plus the follow-ups after it. You approve the run once, and Lane keeps it going until they book.",
    steps: [
      { title: "A lead comes in", body: "From your website form, an ad lead form or your inbox. Lane picks it up straight away." },
      { title: "Lane drafts the run", body: "A reply in your tone with times that suit your calendar, then a nudge and a check-in." },
      { title: "You approve it", body: "Read the messages, tweak them, approve the sequence. Nothing sends before you do." },
      { title: "Lane keeps it going", body: "Each touch goes out on schedule and the run stops as soon as they reply or book." },
    ],
    tools: ["typeform", "meta-ads", "gmail", "google-calendar", "hubspot"],
    approve: [
      { title: "The first reply", body: "What the lead hears from you first." },
      { title: "The follow-ups", body: "Each nudge and check-in, and when they go." },
      { title: "The times offered", body: "The meeting slots Lane suggests from your calendar." },
    ],
    flow: [
      {
        kind: "sources",
        title: "Input",
        items: [
          { tool: "typeform", name: "Website form", meta: "Sarah Chen · 2 min ago" },
          { tool: "meta-ads", name: "Meta lead form", meta: "1 new lead" },
          { tool: "gmail", name: "Inbox", meta: "2 enquiries" },
        ],
      },
      { kind: "run", title: "Automation", run: "RUN-1843", task: "Reply to Sarah Chen", steps: ["Read her enquiry", "Checked your calendar", "Drafted 3 messages"] },
      {
        kind: "approve",
        title: "Approval",
        question: "Reply to Sarah and start her follow-ups?",
        doc: "Reply + 2 follow-ups",
        meta: "Written in your tone",
        tool: "gmail",
        button: "Approve the sequence",
      },
      { kind: "output", title: "Output", status: "Meeting booked", doc: "Intro call · Sarah Chen", meta: "Google Calendar · Thu 10:30", tool: "google-calendar" },
    ],
    faq: [
      { q: "Will it sound like me?", a: "That is the point. Lane writes in your tone, and you approve every sequence before it starts." },
      { q: "What happens when the lead replies?", a: "The run stops, and the conversation is yours. Lane does not keep nudging someone who has answered." },
      { q: "Can I change the timing of the follow-ups?", a: "Yes. The default is a reply today, a nudge on day 2 and a check-in on day 5, and you can change it." },
    ],
  },
  {
    slug: "invoice-follow-up",
    num: "03",
    shape: "Loop",
    title: "Invoice follow-up",
    tagline: "It loops until it’s paid.",
    summary:
      "Overdue invoices get reminders that grow a little firmer each time, until the payment lands in your bank feed.",
    lead:
      "Lane watches your invoices and your bank feed. When something goes overdue, it drafts a reminder, a little firmer each time, and stops the moment the payment lands.",
    steps: [
      { title: "Lane watches what’s owed", body: "Open invoices, due dates and incoming payments, matched against each other." },
      { title: "Lane drafts the reminder", body: "Polite first, a little firmer each time, always with the invoice and a way to pay." },
      { title: "You approve it", body: "Read the reminder, adjust the tone, approve. Nothing sends before you do." },
      { title: "It stops when they pay", body: "Once the payment shows up in your bank feed, the loop closes on its own." },
    ],
    tools: ["stripe", "quickbooks", "plaid", "gmail"],
    approve: [
      { title: "Each reminder", body: "Every message before a client sees it." },
      { title: "The tone", body: "How firm it gets, and when." },
      { title: "When to stop", body: "Pause the loop for a client at any time." },
    ],
    flow: [
      {
        kind: "sources",
        title: "Input",
        items: [
          { tool: "stripe", name: "Stripe", meta: "INV-2041 · 14 days overdue" },
          { tool: "quickbooks", name: "QuickBooks", meta: "3 open invoices" },
          { tool: "plaid", name: "Bank feed", meta: "Payments matched" },
        ],
      },
      { kind: "run", title: "Automation", run: "RUN-1844", task: "INV-2041 · Acme Co", steps: ["Matched bank payments", "14 days still unpaid", "Drafted a firmer note"] },
      {
        kind: "approve",
        title: "Approval",
        question: "Send Acme the firmer reminder?",
        doc: "Reminder 2 · INV-2041",
        meta: "Firmer tone, pay link",
        tool: "stripe",
        button: "Approve and send",
      },
      { kind: "output", title: "Output", status: "Paid", doc: "INV-2041 · Acme Co", meta: "Bank feed · matched", tool: "plaid" },
    ],
    faq: [
      { q: "Will this upset my clients?", a: "Reminders start polite and only get firmer step by step, and you approve every one. You set how firm it ever gets." },
      { q: "How does Lane know they’ve paid?", a: "It matches payments in your bank feed and accounting tool against the open invoice, and stops the loop when they match." },
      { q: "Can I pause it for one client?", a: "Yes. Pause the loop for any client or invoice at any time." },
    ],
  },
];

export const systemBySlug = (slug: System["slug"]) => SYSTEMS.find((s) => s.slug === slug)!;

/** Questions for the home page. */
export const HOME_FAQ: Faq[] = [
  { q: "Does Lane send anything without my OK?", a: "No. Lane prepares the work and puts it on your desk. Nothing goes to a client or a lead until you approve it." },
  { q: "Do I need new software?", a: "No. Lane connects to the tools you already use, and works through your existing accounts." },
  { q: "Can I start with just one system?", a: "Yes. Most teams start with the system that costs them the most time, and add the others later." },
  { q: "What does it cost?", a: "A flat monthly retainer, not hourly billing. See the pricing page for what is included." },
  { q: "How do we get started?", a: "Book a demo. We look at how the work is done today, connect your tools and switch Lane on for one system first." },
];

/** Questions for the pricing page. */
export const PRICING_FAQ: Faq[] = [
  { q: "Is there a setup fee?", a: "Ask us on the demo call: it depends on how many tools and clients we connect." },
  { q: "Can I change plans later?", a: "Yes. Start with one system and add the others when you are ready." },
  { q: "Is there a contract?", a: "The retainer is monthly. We will walk you through the terms on the demo call." },
  { q: "What counts as a run?", a: "One piece of work Lane prepares for you: a report, a lead sequence or a reminder." },
];
