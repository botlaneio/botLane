/**
 * Article bodies for /blog/[slug], keyed by the post slug in posts.ts.
 *
 * Paragraphs, list items and callouts accept two inline marks:
 *   **bold**            → <strong>
 *   [label](/path)      → a link (internal paths, or https:// for external)
 *
 * A post links from /blog only when it has an entry here (see posts.ts).
 */

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; title: string; text: string }
  | { type: "quote"; text: string };

export type Article = {
  /** Shown under the title on the article page. */
  dek: string;
  body: ArticleBlock[];
};

export const ARTICLES: Record<string, Article> = {
  "human-in-the-loop": {
    dek: "“Human-in-the-loop” can mean anything from a person who could step in to a person who signs off on every message. Here is what it means at BotLane, and why we chose the strictest version.",
    body: [
      {
        type: "p",
        text: "Almost every AI product now says it keeps a human in the loop. The phrase sounds reassuring, but it covers very different setups. In some, a person watches a dashboard and can pause things if something looks wrong. In others, a person only sees the cases the software decides to flag. In a few, nothing reaches the outside world until a person has looked at it and said yes.",
      },
      {
        type: "p",
        text: "Those are not small differences. They decide who is accountable when a report has the wrong number in it, or when a follow-up email goes to a client who already paid. So it is worth being precise about which one you are buying.",
      },
      { type: "h2", text: "Three versions of “human-in-the-loop”" },
      {
        type: "ol",
        items: [
          "**Monitoring.** The system acts on its own and a person keeps an eye on it. The human can intervene, but by the time they notice a problem the email has usually gone.",
          "**Exception review.** The system acts on its own unless it is unsure, and then it asks a person. This only works if the system is reliably right about when it is unsure, which is the hardest thing to get right.",
          "**Approval.** The system prepares the work and stops. A person reviews it, edits it if needed, and approves it. Nothing is sent until they do.",
        ],
      },
      {
        type: "p",
        text: "BotLane uses the third version for everything a client or prospect will see. Lane prepares; you approve. There is no autopilot mode, and it is not an option you can switch on later.",
      },
      { type: "h2", text: "What approval looks like in practice" },
      {
        type: "p",
        text: "Lane does the preparation: it pulls the numbers from your ad platforms, drafts the weekly report, writes the reply to a new enquiry, or lines up the reminder for an overdue invoice. Each draft lands in an approval queue for your team.",
      },
      {
        type: "p",
        text: "Every draft shows where its data came from, which signals it matched, and why Lane recommends the next step. When data is missing or looks wrong, Lane says so in the draft instead of filling the gap with a plausible number. Your reviewer can approve it, change it, or decline it. If they decline, nothing happens.",
      },
      {
        type: "callout",
        title: "The rule in one line",
        text: "Every report, reply and reminder waits for a person on your team to approve it. Approval is always required.",
      },
      { type: "h2", text: "Why we don’t offer an autopilot" },
      {
        type: "p",
        text: "An agency’s client relationships are its most valuable asset, and they are built on details: the right number in the right report, a reminder that is polite rather than pushy, a reply that sounds like your team. One wrong message can cost more goodwill than months of saved time are worth.",
      },
      {
        type: "p",
        text: "Approval also keeps accountability where it belongs. The account manager who owns the relationship decides what goes out under the agency’s name. That is true whether the draft was written by a junior team member or by Lane.",
      },
      {
        type: "p",
        text: "We think the honest version of AI operations is one where the software does the preparation and people keep the judgement. That is the version we built.",
      },
      { type: "h2", text: "Making review fast, not optional" },
      {
        type: "p",
        text: "The obvious objection is that approval adds a step. It does, and our job is to make that step short. A review should take a few minutes because the work has already been done: the data is pulled, the numbers are reconciled, the draft is written, and anything unusual is pointed out.",
      },
      {
        type: "ul",
        items: [
          "**Sources on every draft,** so a reviewer can check a number without opening five tabs.",
          "**Flags instead of guesses,** so missing or odd data is visible rather than hidden.",
          "**Edits before sending,** so a reviewer can fix the tone or a figure in place.",
          "**A written release standard for our own changes,** so updates to Lane are checked and signed off by a person before they reach production. You can read it on the [12-Gate Release Standard](/trust/release-standard) page.",
        ],
      },
      { type: "h2", text: "Questions to ask any AI vendor" },
      {
        type: "p",
        text: "If you are comparing tools, these questions get past the marketing quickly:",
      },
      {
        type: "ul",
        items: [
          "Can anything be sent to a client or prospect without a person approving it?",
          "Is there an autopilot or auto-send setting, and who can turn it on?",
          "When data is missing, does the system flag it or fill it in?",
          "Can a reviewer see where each number in a draft came from?",
          "Who is responsible for checking changes to the system before they go live?",
        ],
      },
      {
        type: "p",
        text: "Our answers are no, no, it flags it, yes, and a person on our side, every time. If you want to see the approval queue for yourself, [book a demo](/demo).",
      },
    ],
  },

  "operational-bottlenecks": {
    dek: "Agencies of 10 to 35 people tend to hit the same walls as they grow. None of them is about the campaigns. All of them take time away from the campaigns.",
    body: [
      {
        type: "p",
        text: "Growing agencies rarely slow down because the team runs out of ideas. They slow down because the work around the work grows faster than the team does. Every new retainer adds a report, a few more enquiries to answer, and another invoice to keep track of. Somewhere between ten and thirty-five people, that overhead starts landing on the people who should be doing strategy.",
      },
      {
        type: "p",
        text: "Here are five that come up again and again, and what removing each one actually takes.",
      },
      { type: "h2", text: "1. The reporting crunch" },
      {
        type: "p",
        text: "At the start of every week or month, someone senior disappears into exports. They pull numbers from Google Ads, Meta and GA4, paste them into a spreadsheet, reconcile conversions that don’t match, build the charts, and then write the commentary that clients actually read.",
      },
      {
        type: "p",
        text: "It gets worse with growth because reporting scales with the number of clients, not the size of the team. **Removing it** means taking the collection, reconciling and first draft off people’s plates, while keeping the commentary and the final check with the account lead.",
      },
      { type: "h2", text: "2. Slow first replies to new enquiries" },
      {
        type: "p",
        text: "A prospect fills in your form on a Tuesday afternoon. The team is busy delivering for existing clients, so the reply goes out on Thursday. By then the prospect has already spoken to two other agencies.",
      },
      {
        type: "p",
        text: "Speed matters most exactly when the team is busiest, which is why this one is so hard to fix by trying harder. **Removing it** means having a tailored, ready-to-send reply waiting for approval within minutes of the enquiry, so the only thing a person has to do is read it and say yes.",
      },
      { type: "h2", text: "3. Invoices nobody wants to chase" },
      {
        type: "p",
        text: "Chasing overdue invoices is awkward, so it slips. Account managers don’t want to strain a relationship, finance doesn’t want to step on the account manager, and the reminder goes out two weeks later than it should.",
      },
      {
        type: "p",
        text: "**Removing it** means a steady, polite sequence that starts before the due date, uses your wording, and stops the moment the client pays or replies. Each reminder still waits for approval, so nobody is surprised by what was sent.",
      },
      { type: "h2", text: "4. Process that lives in one person’s head" },
      {
        type: "p",
        text: "In most small agencies, the way a client’s report is built, or which contact gets the invoice, is known by one person. When they are on holiday or leave, the work stalls or gets done differently.",
      },
      {
        type: "p",
        text: "**Removing it** means writing the process down once, as a working system rather than a document nobody reads. When the steps are defined well enough for software to prepare the work, they are defined well enough for anyone on the team to review it.",
      },
      { type: "h2", text: "5. Copy and paste between tools" },
      {
        type: "p",
        text: "Ad platforms, analytics, the CRM, the billing software and the inbox each hold part of the picture. People become the integration layer, copying figures and names from one tab to another. It is slow, and it is where small errors creep in.",
      },
      {
        type: "p",
        text: "**Removing it** doesn’t require a new platform. It requires connecting the tools you already have so the data moves without someone retyping it. We wrote more about that in [The tools agencies already use](/blog/tools-agencies-use).",
      },
      { type: "h2", text: "Where to start" },
      {
        type: "p",
        text: "Don’t try to fix all five at once. Pick the one that costs your team the most hours, or the one that would hurt most if it went wrong, and start there. For most performance agencies that is reporting.",
      },
      {
        type: "callout",
        title: "What “managed” means here",
        text: "We set up, run and monitor the systems for you, so you don’t need to hire anyone to build or babysit automations. Your team reviews and approves the work. Approval is always required.",
      },
      {
        type: "p",
        text: "Each of BotLane’s lanes maps to one of these bottlenecks: [Client reporting](/systems/client-reporting), [Lead follow-up](/systems/lead-follow-up) and [Invoice follow-up](/systems/invoice-follow-up). You can start with one and add the others later. See [pricing](/pricing) for how that works.",
      },
    ],
  },

  "spreadsheets-to-automated-reports": {
    dek: "Most agency reports are still assembled by hand in a spreadsheet. Here is what changes when the report is prepared for you, and what should stay with your team.",
    body: [
      {
        type: "p",
        text: "If you run a performance agency, you probably know the routine. Export from Google Ads. Export from Meta. Open GA4 and check the conversions, which never quite match either platform. Paste it all into the client’s spreadsheet, fix the formulas that broke since last time, update the charts, and then write a few paragraphs explaining what happened and what you recommend.",
      },
      {
        type: "p",
        text: "Multiply that by every client on a weekly or monthly cadence and reporting becomes one of the biggest fixed costs in the agency. It is also some of the least rewarding work your senior people do.",
      },
      { type: "h2", text: "Where the time actually goes" },
      {
        type: "p",
        text: "When people describe their reporting process, the time usually splits into four parts:",
      },
      {
        type: "ol",
        items: [
          "**Collecting** the numbers from each platform.",
          "**Reconciling** them: removing duplicate conversions, lining up date ranges, matching spend to results and to CRM revenue.",
          "**Presenting** them: charts, tables, the client’s template.",
          "**Explaining** them: the commentary, the wins, the concerns and the next steps.",
        ],
      },
      {
        type: "p",
        text: "The first three are mechanical and follow the same steps every time. The fourth is where your expertise shows. A good reporting setup removes the first three and gives the fourth a head start.",
      },
      { type: "h2", text: "What a prepared report should do" },
      {
        type: "ul",
        items: [
          "Pull the data on a schedule, from the platforms you already use, without anyone exporting anything.",
          "Reconcile it the same way every time, so the numbers are consistent from week to week.",
          "Show where each number came from, so a reviewer can check it quickly.",
          "Flag data that is missing or looks wrong, rather than smoothing it over.",
          "Draft the commentary in your agency’s tone, as a starting point for the account lead.",
        ],
      },
      { type: "h2", text: "What it should not do" },
      {
        type: "p",
        text: "It should not send itself. A report is a conversation with your client, and the account lead knows things the data doesn’t: the budget conversation from last Tuesday, the product launch that was delayed, the stakeholder who only reads the first line. That context belongs in the final version, and only a person can add it.",
      },
      {
        type: "callout",
        title: "Prepared, then approved",
        text: "Lane prepares the report. A person on your team reviews it, edits it if needed, and approves it. Only then does it go to the client.",
      },
      { type: "h2", text: "How Client reporting works at BotLane" },
      {
        type: "p",
        text: "On the schedule you choose, Lane connects to Google Ads, Meta, GA4 and HubSpot and pulls the period’s performance data. It reconciles the numbers, including blended return on ad spend and conversions counted by more than one platform, and checks them against closed-won revenue in your CRM.",
      },
      {
        type: "p",
        text: "It then drafts the summary in your agency’s tone: top campaigns and creatives, budget pacing, and recommended next steps. The finished report, as a PDF and a shareable link, lands in your approval queue with a note in Slack or email. You review it, approve it, and it goes to your client. You can see the full flow on the [Client reporting](/systems/client-reporting) page.",
      },
      { type: "h2", text: "Making the switch without risk" },
      {
        type: "p",
        text: "Moving off spreadsheets doesn’t have to be a leap. A sensible way to do it:",
      },
      {
        type: "ol",
        items: [
          "**Start with one client** whose report you know well.",
          "**Run both side by side** for a few cycles: the spreadsheet as usual, and the prepared report in the approval queue.",
          "**Compare them line by line.** Where they differ, find out why. Often it is a reconciliation rule that was never written down.",
          "**Switch that client over** once you trust the prepared version, then add the next one.",
        ],
      },
      {
        type: "p",
        text: "Your team keeps doing the part clients pay for, the thinking. The spreadsheet work stops being anyone’s job. If you would like to see a prepared report for yourself, [book a demo](/demo).",
      },
    ],
  },

  "tools-agencies-use": {
    dek: "We don’t ask agencies to move to a new platform. Lane works inside the tools your team already uses, with the access you grant and nothing more.",
    body: [
      {
        type: "p",
        text: "Every new tool an agency adopts comes with a cost: logins, training, another place for information to live, and another thing that breaks when someone leaves. So we made a simple decision early on. BotLane should not be another tool your team has to learn. It should work in the ones they already use.",
      },
      { type: "h2", text: "The tools Lane works with" },
      {
        type: "p",
        text: "Each lane connects to the systems that hold its part of the work:",
      },
      {
        type: "ul",
        items: [
          "**Advertising:** Google Ads (Search, Performance Max, YouTube) and Meta (Facebook and Instagram).",
          "**Analytics:** Google Analytics 4.",
          "**CRM:** HubSpot, for deals, lifecycle stages and pipeline revenue.",
          "**Forms:** Typeform, Webflow and HubSpot forms, for new enquiries.",
          "**Billing:** Stripe, QuickBooks Online and Xero, for invoices and payment status.",
          "**Email:** your own mailboxes, so messages come from your team’s real addresses.",
          "**Team chat:** Slack, for approval alerts and notes.",
        ],
      },
      {
        type: "p",
        text: "Not every agency uses every tool on that list, and that is fine. A lane only needs the tools its work touches. Client reporting needs your ad platforms and analytics; Invoice follow-up needs your billing software and a mailbox.",
      },
      { type: "h2", text: "How we connect" },
      {
        type: "p",
        text: "We connect through each platform’s official sign-in and permissions, which you authorise.",
      },
      {
        type: "ul",
        items: [
          "**Your data stays yours.** Your data stays in your environment, and we don’t train on it.",
          "**Your voice, your addresses.** Replies and reminders go out from your team’s email, in your wording, after a person approves them.",
        ],
      },
      { type: "h2", text: "Why not build our own dashboard?" },
      {
        type: "p",
        text: "Plenty of products want to become the place where an agency lives. We think that is the wrong goal for operations software. Your account managers already live in their inbox, your finance lead lives in the billing software, and everyone lives in Slack. Asking them to check one more dashboard is how good systems end up ignored.",
      },
      {
        type: "p",
        text: "So Lane brings the work to where your team already is. A report waiting for approval shows up as a note in Slack or email. The reviewer opens it, checks it, and approves it. The client receives it the way they always have.",
      },
      {
        type: "callout",
        title: "Nothing goes out on its own",
        text: "Connecting a tool never gives Lane permission to send anything by itself. Every report, reply and reminder waits for a person on your team to approve it.",
      },
      { type: "h2", text: "When data doesn’t line up" },
      {
        type: "p",
        text: "Connected tools rarely agree perfectly. Google Ads and Meta both claim the same conversion, GA4 counts it differently again, and the CRM has the revenue a week later. Lane reconciles these the same way every time and shows its sources in the draft. When something is missing or doesn’t add up, it says so, instead of quietly picking a number.",
      },
      { type: "h2", text: "Using something that isn’t listed?" },
      {
        type: "p",
        text: "Tell us. If your agency relies on a tool we haven’t covered, we would rather hear about it before you change how you work. [Get in touch](/company/contact) or email [admin@botlane.io](mailto:admin@botlane.io).",
      },
    ],
  },

  "why-we-built-botlane": {
    dek: "The thinking behind BotLane: what problem we set out to solve, who we built it for, and the principles we decided not to compromise on.",
    body: [
      {
        type: "p",
        text: "Agencies are built on people who are good at marketing: planning campaigns, reading data, making creative calls, keeping clients happy. Yet a large share of an agency’s week goes to work that is none of those things. Pulling numbers into a report. Answering a new enquiry while three deadlines loom. Noticing an invoice is overdue and finding the nerve to chase it.",
      },
      {
        type: "p",
        text: "That work matters. Clients judge you by the report, prospects by how fast you reply, and cash flow depends on invoices being paid. It just doesn’t need your best people to do it from scratch every time. We built BotLane to take that preparation off their plates, without taking away their control.",
      },
      { type: "h2", text: "Who we built it for" },
      {
        type: "p",
        text: "We started with US performance-marketing agencies of roughly 10 to 35 people. Agencies that size are big enough that the overhead really hurts, and small enough that there is rarely an operations team to absorb it. The founder or an account lead usually ends up doing it at night.",
      },
      {
        type: "p",
        text: "That focus shapes what we build. Our three lanes, [Client reporting](/systems/client-reporting), [Lead follow-up](/systems/lead-follow-up) and [Invoice follow-up](/systems/invoice-follow-up), are the three jobs that come up again and again in agencies of that size.",
      },
      { type: "h2", text: "The principles we won’t trade away" },
      { type: "h3", text: "Lane prepares, you approve" },
      {
        type: "p",
        text: "Every report, reply and reminder waits for a person on your team to approve it. There is no autopilot mode. We wrote about why in [What “human-in-the-loop” really means](/blog/human-in-the-loop).",
      },
      { type: "h3", text: "Your tools, not ours" },
      {
        type: "p",
        text: "Lane connects to the ad platforms, inbox and billing software you already use. No new system for your team to learn. More in [The tools agencies already use](/blog/tools-agencies-use).",
      },
      { type: "h3", text: "Flag it, don’t fake it" },
      {
        type: "p",
        text: "When data is missing or looks wrong, Lane points it out in the draft instead of filling the gap with a plausible number. A report that admits a gap is more useful than one that hides it.",
      },
      { type: "h3", text: "Managed, not do-it-yourself" },
      {
        type: "p",
        text: "We set up, run and monitor the systems for you. Agencies shouldn’t need to hire someone to build automations and then babysit them when an API changes.",
      },
      { type: "h3", text: "Changes are checked before they ship" },
      {
        type: "p",
        text: "Changes to our own systems follow a written release standard, with a person signing off before anything reaches production. It is public: [the 12-Gate Release Standard](/trust/release-standard).",
      },
      { type: "h2", text: "What we won’t do on this blog" },
      {
        type: "p",
        text: "We are a young company. You won’t find invented case studies or borrowed statistics here. When we have results from real agencies, with their permission, we will share them. Until then, we will write about how we think, how the product works, and what we are learning.",
      },
      { type: "h2", text: "Who we are" },
      {
        type: "p",
        text: "BotLane is BotLane LLC, based in Sheridan, Wyoming. If you run an agency and any of this sounds familiar, we would like to hear from you. [Book a demo](/demo), [get in touch](/company/contact), or write to [admin@botlane.io](mailto:admin@botlane.io).",
      },
    ],
  },
};

/** Rough reading time at ~220 words a minute, never less than one minute. */
export function readingMinutes(article: Article): number {
  const text = article.body
    .map((b) => ("items" in b ? b.items.join(" ") : b.text))
    .join(" ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}
