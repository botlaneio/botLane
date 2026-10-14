// The five workflows BotLane designs, runs and maintains. All copy for /solutions and
// /solutions/[slug] lives here. No customer numbers or results: illustrations say "Example".

export type Solution = {
  slug: string;
  name: string;
  /** One line for cards. */
  summary: string;
  /** Detail page headline, with one italic phrase wrapped in *asterisks*. */
  headline: string;
  lead: string;
  before: string[];
  withLane: string[];
  steps: { title: string; body: string }[];
  youApprove: string[];
  never: string[];
  tools: string[];
  faq: { q: string; a: string }[];
};

export const solutions: Solution[] = [
  {
    slug: "lead-follow-up",
    name: "Lead follow-up",
    summary: "Never miss a lead again. Fast, personal replies and follow-ups until a meeting is booked.",
    headline: "Every lead answered. *Every time.*",
    lead: "Lane replies to new enquiries in your tone, follows up when they go quiet, and books the meeting. You approve every message before it goes out.",
    before: [
      "Enquiries sit in an inbox or form tool until someone has a spare moment.",
      "Follow-ups depend on memory, so promising leads go cold.",
      "Nobody can say at a glance which leads were contacted and which weren't.",
    ],
    withLane: [
      "Each new enquiry gets a drafted, personal reply in your voice.",
      "Quiet leads get polite follow-ups on a schedule you set.",
      "You see every lead's status in one place, from new to booked.",
    ],
    steps: [
      { title: "A lead arrives", body: "From your website form, inbox, ads or CRM. Lane picks it up and reads what they asked for." },
      { title: "Lane drafts the reply", body: "A personal answer in your tone, with the details they need and times to talk." },
      { title: "You approve", body: "Edit it, approve it, or reject it. Nothing is sent until you say so." },
      { title: "Follow-ups until booked", body: "If they go quiet, Lane drafts the next nudge. It stops the moment they reply or book." },
    ],
    youApprove: ["First replies to new leads", "Each follow-up message", "Any meeting invitation"],
    never: [
      "Sends a message without your approval",
      "Makes promises about price, scope or timelines on your behalf",
      "Keeps chasing someone who has replied or asked to stop",
    ],
    tools: ["Gmail", "HubSpot", "Typeform", "Google Calendar", "WhatsApp"],
    faq: [
      { q: "Will replies sound like us?", a: "We set up Lane with your tone, your usual answers and examples of messages you've sent before. You can edit any draft before approving it." },
      { q: "Can we approve in bulk?", a: "Yes. Once you trust a type of message you can approve several at once, but each one is still shown to you first." },
      { q: "What if a lead asks something unusual?", a: "Lane flags it for you instead of guessing. You answer it yourself or tell Lane how to handle it next time." },
    ],
  },
  {
    slug: "client-reporting",
    name: "Client reporting",
    summary: "Accurate reports built from your tools and tailored to each client, ready for your review.",
    headline: "Client reports, *ready for your review.*",
    lead: "Lane pulls the numbers from your ad, analytics and CRM tools, writes the commentary, and prepares each client's report. You check it and send it.",
    before: [
      "Someone exports numbers from several tools and pastes them into slides.",
      "Commentary is rushed because the copying took all the time.",
      "Errors slip in because nobody can check where each figure came from.",
    ],
    withLane: [
      "Numbers are pulled from the source tools on schedule.",
      "Each report gets a draft summary of what changed and why it matters.",
      "Every figure links back to where it came from, so checking is quick.",
    ],
    steps: [
      { title: "Data is collected", body: "From the tools you already use for each client, on the schedule you choose." },
      { title: "Lane builds the report", body: "Your template, the client's numbers, and a short written summary." },
      { title: "You review", body: "Every figure shows its source. Change anything, then approve." },
      { title: "Delivered", body: "Sent to the client the way you normally share reports, or saved for you to send." },
    ],
    youApprove: ["Every report before a client sees it", "The written summary and recommendations"],
    never: [
      "Sends a report to a client without your approval",
      "Shows a figure without saying where it came from",
      "Changes the numbers to make results look better",
    ],
    tools: ["Google Ads", "Meta Ads", "GA4", "HubSpot", "Google Drive"],
    faq: [
      { q: "Can it use our existing report template?", a: "Yes. We build Lane around the format your clients already know." },
      { q: "What if a data source is missing or late?", a: "Lane tells you which numbers are missing instead of filling the gap, and the report waits for you." },
      { q: "How do we check the numbers?", a: "Each figure carries a note of the tool and date range it came from, so you can spot-check in seconds." },
    ],
  },
  {
    slug: "support-triage",
    name: "Support triage",
    summary: "Route, prioritise and draft replies to customer questions, so your team answers faster with AI.",
    headline: "Support that sorts *itself first.*",
    lead: "Lane reads incoming customer messages, tags and routes them, and drafts a reply for the simple ones. Your team approves and handles the rest.",
    before: [
      "Every message lands in one queue, urgent and routine mixed together.",
      "The same questions get answered from scratch every day.",
      "Customers wait while someone works out who should reply.",
    ],
    withLane: [
      "Messages are categorised and sent to the right person.",
      "Common questions arrive with a drafted answer to approve.",
      "Urgent or unhappy customers are flagged to the top.",
    ],
    steps: [
      { title: "A message arrives", body: "From your help inbox, chat, or support tool." },
      { title: "Lane sorts it", body: "Category, priority and the right owner, based on rules you agree with us." },
      { title: "A reply is drafted", body: "For routine questions, using your help content and past answers." },
      { title: "Your team approves", body: "They edit or approve the draft, or take over the conversation." },
    ],
    youApprove: ["Every reply sent to a customer", "Changes to routing rules"],
    never: [
      "Replies to a customer without a person approving it",
      "Issues refunds, credits or account changes",
      "Closes a conversation on its own",
    ],
    tools: ["Gmail", "Slack", "Notion", "WhatsApp"],
    faq: [
      { q: "Does this replace our support team?", a: "No. It takes the sorting and first drafts off their plate so they can spend time on the conversations that need a person." },
      { q: "Where do answers come from?", a: "From your help articles, saved replies and the examples you give us. If Lane isn't sure, it says so and leaves the reply to your team." },
    ],
  },
  {
    slug: "invoice-follow-up",
    name: "Invoice follow-up",
    summary: "Polite, gradually firmer reminders that stop the moment payment clears.",
    headline: "Get paid *without the awkward chasing.*",
    lead: "Lane watches for overdue invoices, drafts polite reminders that get gradually firmer, and stops the moment payment clears. You approve each one.",
    before: [
      "Overdue invoices are noticed late, or not at all.",
      "Chasing feels awkward, so it gets put off.",
      "Reminders are inconsistent from one client to the next.",
    ],
    withLane: [
      "Overdue invoices are spotted as soon as they're due.",
      "Reminders follow a schedule and tone you agree in advance.",
      "Reminders stop automatically when payment arrives.",
    ],
    steps: [
      { title: "An invoice goes overdue", body: "Lane checks your accounting or payment tool every day." },
      { title: "A reminder is drafted", body: "Friendly first, firmer later, always in your voice." },
      { title: "You approve", body: "Approve, edit, or hold it for a client you'd rather call yourself." },
      { title: "It stops when paid", body: "As soon as payment clears, the sequence ends and you see it marked paid." },
    ],
    youApprove: ["Each reminder before it is sent", "Any change to the reminder schedule"],
    never: [
      "Sends a reminder without your approval",
      "Threatens late fees or legal action you haven't agreed",
      "Contacts anyone other than the invoice contact",
    ],
    tools: ["QuickBooks", "Stripe", "Gmail"],
    faq: [
      { q: "Can we pause reminders for a client?", a: "Yes, for one client or everyone, at any time." },
      { q: "Does Lane take payments?", a: "No. Reminders link to the invoice or payment page you already use." },
    ],
  },
  {
    slug: "operations-intake",
    name: "Operations intake",
    summary: "Turn scattered requests into structured, trackable work your team can act on.",
    headline: "Scattered requests, *one clear queue.*",
    lead: "Lane collects requests from email, forms and chat, fills in the missing details, and turns them into structured tasks for the right person.",
    before: [
      "Requests arrive by email, chat, forms and hallway conversations.",
      "Key details are missing, so the first reply is always a question.",
      "Nobody has a clear view of what was asked and who's on it.",
    ],
    withLane: [
      "Every request becomes a structured task in your tracker.",
      "Missing details are requested before the work starts.",
      "Each task has an owner and a status you can see.",
    ],
    steps: [
      { title: "A request comes in", body: "From email, a form, Slack, WhatsApp, or wherever your team receives them." },
      { title: "Lane structures it", body: "It pulls out what's needed, and drafts a question back if something is missing." },
      { title: "You check the routing", body: "Approve who it goes to, or let agreed rules handle routine requests." },
      { title: "Tracked to done", body: "The task lives in your tracker with its history, so nothing is lost." },
    ],
    youApprove: ["Messages sent back to requesters", "Routing for anything outside the agreed rules"],
    never: [
      "Promises delivery dates on your team's behalf",
      "Deletes or overwrites existing tasks",
      "Shares a request outside the people it's meant for",
    ],
    tools: ["Gmail", "Slack", "Notion", "Typeform", "WhatsApp"],
    faq: [
      { q: "Do we need a new project tool?", a: "No. Lane works with the tracker you already use." },
      { q: "Can it handle different request types?", a: "Yes. We agree the request types and what each one needs during the design step." },
    ],
  },
];

export function getSolution(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}

export const solutionSlugs = solutions.map((s) => s.slug);
