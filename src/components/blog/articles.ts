/**
 * Article bodies for /blog/[slug], keyed by the post slug in posts.ts.
 *
 * Paragraphs, list items, callouts and template lines accept two inline marks:
 *   **bold**            → <strong>
 *   [label](/path)      → a link (internal paths, or https:// for external)
 *
 * A post links from /blog only when it has an entry here (see posts.ts).
 * Topics and target searches follow the Blog SEO Strategy doc
 * (https://claude.ai/code/artifact/14af3212-1d06-4a78-b6f3-080f66380f64).
 */

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; title: string; text: string }
  | { type: "quote"; text: string }
  /** Copyable wording, e.g. an email or a report note. Shown as a framed block. */
  | { type: "template"; title: string; lines: string[] }
  /** A weak version next to a stronger one. */
  | { type: "compare"; before: string; after: string };

export type Article = {
  /** Page title for search results; keep it under ~60 characters. */
  seoTitle: string;
  /** Meta description and the dek under the title on the article page. */
  dek: string;
  body: ArticleBlock[];
};

export const ARTICLES: Record<string, Article> = {
  "ppc-report-commentary": {
    seoTitle: "PPC Report Commentary: How to Write It (With Examples)",
    dek: "Good PPC report commentary tells the client what changed, why it changed, what it means for their goal and what you’ll do next. Here is a simple structure, worked examples and a template you can copy.",
    body: [
      {
        type: "p",
        text: "Good PPC report commentary answers four questions for every number that matters: what happened, why it happened, what it means for the client’s goal, and what you will do next. Two or three sentences per point is usually enough. Clients rarely read the charts closely; they read the summary and the notes, and they judge your agency by them.",
      },
      {
        type: "p",
        text: "This guide covers the structure we recommend, before-and-after examples you can adapt, phrases to avoid, and a template for the summary at the top of the report.",
      },
      { type: "h2", text: "Why clients skip the numbers" },
      {
        type: "p",
        text: "Most clients don’t open a report to study click-through rates. They open it to find out three things: are we on track, is anything wrong, and what is the agency doing about it. A table of metrics answers none of those on its own. The commentary is where you answer them.",
      },
      {
        type: "p",
        text: "That is also why commentary takes the most time to write. Pulling the numbers is mechanical. Deciding which three of forty numbers matter this week, and explaining them in plain words, is judgement.",
      },
      { type: "h2", text: "The four-part note" },
      {
        type: "p",
        text: "Write every note in the same order. Clients learn where to look, and you stop staring at a blank box.",
      },
      {
        type: "ol",
        items: [
          "**What happened.** The change, with the number and the comparison period. “Cost per lead rose from $48 to $61 week over week.”",
          "**Why.** The cause, as far as you know it. If you don’t know yet, say what you are checking.",
          "**So what.** What it means for the client’s goal, not for the account. Are they still on track for the month?",
          "**Next.** The action you are taking, or the decision you need from them, with a date.",
        ],
      },
      {
        type: "p",
        text: "Keep one idea per note. If a paragraph covers spend, creative and tracking at once, split it into three notes and lead with the one that matters most.",
      },
      { type: "h2", text: "Examples: before and after" },
      {
        type: "p",
        text: "The figures below are made up to show the structure. Each “before” is the kind of line that appears in many reports; each “after” uses the four parts.",
      },
      { type: "h3", text: "When cost per lead goes up" },
      {
        type: "compare",
        before: "CPL increased this week due to increased competition.",
        after:
          "Cost per lead rose from $48 to $61 week over week. Two competitors started bidding on your brand terms on Tuesday, which raised brand CPCs by about a third. You are still on pace for 180 leads this month against a target of 170. We are adjusting brand bids and will review the impact on Friday.",
      },
      { type: "h3", text: "When spend is behind" },
      {
        type: "compare",
        before: "Spend pacing is slightly under target.",
        after:
          "Spend is at 41% of the monthly budget with 50% of the month gone. The new Performance Max campaign is still in its learning period and spending below its daily cap. If it hasn’t caught up by the 20th, we’ll move $1,500 to Search, where cost per lead is steadier. No action needed from you.",
      },
      { type: "h3", text: "When something worked" },
      {
        type: "compare",
        before: "The new creative performed well.",
        after:
          "The testimonial video launched on Meta on the 3rd now drives 38% of leads at a cost per lead 22% below the account average. We’ll give it a larger share of the budget next week and brief two more videos in the same style. Could you send over two or three customers who might be willing to record one?",
      },
      { type: "h3", text: "When the data looks wrong" },
      {
        type: "compare",
        before: "Conversions were down this period.",
        after:
          "Reported conversions dropped 60% on the 12th, but leads in your CRM didn’t. The site update that day removed the conversion tag from the thank-you page. We reinstalled it on the 14th; the two days in between are missing from Google Ads and are noted on the chart. Real lead volume was normal.",
      },
      {
        type: "p",
        text: "The last example matters most. A note that admits a gap protects your credibility. A report that silently shows a 60% drop gets you a worried phone call. If this happens often, our guide to [why Google Ads, Meta and GA4 never match](/blog/google-ads-meta-ga4-numbers-dont-match) covers the usual causes.",
      },
      { type: "h2", text: "How to write the summary at the top" },
      {
        type: "p",
        text: "The summary is the only part some clients read. Keep it to three lines: where they stand against the goal, the most important thing that happened, and the most important thing you are doing next.",
      },
      {
        type: "template",
        title: "Report summary template",
        lines: [
          "**Where you stand:** [Goal metric] is [number], [on track / ahead / behind] against the [period] target of [target].",
          "**What mattered most:** [One change, with its number and cause].",
          "**What we’re doing next:** [One action, with a date]. [Any decision we need from you.]",
        ],
      },
      { type: "h2", text: "Phrases to avoid in client reports" },
      {
        type: "ul",
        items: [
          "**“Performance was mixed.”** Say which parts went up, which went down, and which matters.",
          "**“Due to the algorithm.”** It explains nothing. Name the change you saw, or say you are still investigating.",
          "**Unexplained acronyms.** Write “cost per lead” the first time, even if the client has seen CPL before.",
          "**Passive voice for problems.** “The tag was removed” hides who fixes it. “We reinstalled the tag on the 14th” doesn’t.",
          "**A recommendation without a date.** “We’ll monitor” is not a next step. “We’ll review on Friday” is.",
        ],
      },
      { type: "h2", text: "A checklist before you send" },
      {
        type: "ul",
        items: [
          "Does the summary say whether the client is on track for their goal?",
          "Does every note have a number, a cause, a meaning and a next step?",
          "Are comparison periods stated (week over week, month over month, year over year)?",
          "Is any missing or odd data called out, not smoothed over?",
          "Would the client understand it without opening the account?",
          "Is there anything you need from the client, and is it obvious?",
        ],
      },
      { type: "h2", text: "Where AI helps, and where it shouldn’t decide" },
      {
        type: "p",
        text: "AI is good at the first draft: spotting which metrics moved most, describing the change in plain words, and checking that every note follows the same structure. It is bad at the context that makes commentary useful, such as last week’s budget conversation or the launch the client delayed. An AI-written report that goes out unread will eventually say something confidently wrong.",
      },
      {
        type: "p",
        text: "That is how BotLane’s [Client reporting](/systems/client-reporting) lane works. Lane pulls the numbers, reconciles them and drafts the commentary in your agency’s tone, flagging anything missing or odd. The account lead adds what only they know, then approves it. Nothing reaches the client until a person on your team says yes. For the wider process, see [automated client reporting for agencies](/blog/automated-client-reporting-for-agencies).",
      },
      { type: "h2", text: "Common questions" },
      { type: "h3", text: "How long should PPC report commentary be?" },
      {
        type: "p",
        text: "Long enough to cover the three to five changes that matter, at two or three sentences each, plus a three-line summary. If it runs past a page, you are probably describing metrics that didn’t change anything.",
      },
      { type: "h3", text: "Should weekly and monthly reports have the same commentary?" },
      {
        type: "p",
        text: "No. Weekly notes are short and operational: what moved and what you did. Monthly commentary steps back to trends, results against goals and the plan for next month.",
      },
      { type: "h3", text: "Should commentary include industry benchmarks?" },
      {
        type: "p",
        text: "Only when they help the client judge their own numbers, and only from a source you can name. A benchmark without a source invites the question “says who?”.",
      },
    ],
  },

  "google-ads-meta-ga4-numbers-dont-match": {
    seoTitle: "Why Google Ads, Meta and GA4 Conversions Don’t Match",
    dek: "Google Ads, Meta and GA4 count conversions differently, so their numbers rarely agree. Here are the common causes, which number to report, and how to explain the gap to a client.",
    body: [
      {
        type: "p",
        text: "Google Ads, Meta and GA4 almost never report the same number of conversions, and usually nothing is broken. Each platform decides differently what counts as a conversion, which day it belongs to, and which ad gets the credit. Ad platforms also include conversions they model rather than observe. Add the three together and you will usually count the same sale more than once.",
      },
      {
        type: "p",
        text: "For an agency, the technical answer is only half the job. The other half is choosing which number goes in the client report and explaining the gap before the client spots it. This guide covers both.",
      },
      { type: "h2", text: "Why don’t Google Ads and GA4 match?" },
      {
        type: "p",
        text: "These are the causes that come up most often. Several usually apply at once.",
      },
      {
        type: "ul",
        items: [
          "**Different dates.** Google Ads records a conversion on the date of the ad click. GA4 records it on the date the conversion happened. A click on the 30th that converts on the 2nd lands in different months.",
          "**Attribution models.** Each platform decides which touchpoint gets the credit. GA4 spreads credit across channels, so a sale Google Ads claims in full may be split with email or organic search in GA4.",
          "**Counting settings.** A Google Ads conversion action can count every conversion after a click or only one. Set to “every” for a lead form, it can count one person’s repeat submissions as several leads.",
          "**Modeled conversions.** When consent choices or browser limits hide some users, both platforms can estimate the conversions they can’t see. They model differently, so the estimates don’t line up.",
          "**Lookback windows.** Google Ads only credits conversions within the window set on the conversion action. A sale after the window closes can still show up in GA4 but not in Google Ads.",
          "**View-through conversions.** Google Ads can count conversions after someone saw an ad without clicking. GA4 doesn’t count those the same way by default.",
          "**Tagging gaps.** A missing tag on one page, a consent banner blocking a script, or two tags firing on the same thank-you page will each push the numbers apart.",
        ],
      },
      { type: "h2", text: "Why Meta and GA4 disagree even more" },
      {
        type: "p",
        text: "Meta adds two things that widen the gap. Its default attribution counts conversions within days of a click and also within a day of someone seeing an ad, so it credits sales that GA4 gives to another channel or doesn’t link to an ad at all. Meta also models conversions it can’t observe directly, especially on iOS devices.",
      },
      {
        type: "p",
        text: "The result is predictable: if a client runs Google and Meta, the two ad platforms will together claim more conversions than the business actually had. Neither is lying. Each is answering a different question: “how many conversions can this platform take some credit for?”",
      },
      { type: "h2", text: "Which number should go in the client report?" },
      {
        type: "p",
        text: "Pick one source of truth for the client’s goal, agree it with the client, and use it every time. For most performance agencies that means:",
      },
      {
        type: "ol",
        items: [
          "**The business’s own record for the headline number.** Leads in the CRM, orders in the store, revenue in the billing system. This is what the client already trusts.",
          "**Platform numbers for optimizing within a platform.** Google Ads and Meta conversions are the right figures for comparing campaigns, ads and audiences inside that platform.",
          "**GA4 for the cross-channel view.** Use it to show how channels work together, not to settle which ad platform deserves the credit.",
        ],
      },
      {
        type: "p",
        text: "If you report a blended figure, such as total revenue divided by total ad spend, say so and show how it is calculated. A blended number avoids double counting; adding the platforms’ own conversions together builds it in.",
      },
      { type: "h2", text: "How to explain the gap to a client" },
      {
        type: "p",
        text: "Explain it once, early, in writing, before the client compares dashboards on their own. Then point back to that explanation whenever the question comes up.",
      },
      {
        type: "template",
        title: "Note for the client",
        lines: [
          "You’ll notice Google Ads, Meta and Google Analytics show different conversion numbers. That’s expected: each one counts conversions on different dates and gives credit to different ads, and the ad platforms each claim some of the same sales.",
          "So that you always see one consistent figure, we report results against **[the CRM / your store / your billing system]**, which records each [lead / order] once.",
          "We use the platform numbers to decide which campaigns and ads to invest in. If the gap between them changes sharply, we’ll flag it in the report and explain why.",
        ],
      },
      { type: "h2", text: "A check to run before every report" },
      {
        type: "ul",
        items: [
          "Compare each platform’s conversions with the source of truth for the same dates. Is the gap roughly the same as last period?",
          "If the gap jumped, check for site changes, new consent settings, or a duplicated or missing tag around that date.",
          "Confirm the conversion actions counted in the report are the ones the client cares about, not micro-conversions like page views.",
          "Check that comparison periods line up and that time zones match across platforms.",
          "When a day of data is missing, mark it on the chart and say so in the commentary.",
        ],
      },
      {
        type: "p",
        text: "That last point is the one clients remember. Our guide to [PPC report commentary](/blog/ppc-report-commentary) has an example note for exactly that situation.",
      },
      { type: "h2", text: "How Lane handles mismatched numbers" },
      {
        type: "p",
        text: "BotLane’s [Client reporting](/systems/client-reporting) lane pulls data from Google Ads, Meta, GA4 and HubSpot, reconciles it the same way every time, and removes conversions counted by more than one platform. Each draft shows where its numbers came from. When the gap between sources changes sharply or data is missing, Lane flags it in the draft instead of picking a number. A person on your team reviews and approves every report before it reaches the client.",
      },
      { type: "h2", text: "Common questions" },
      { type: "h3", text: "Is a gap between Google Ads and GA4 a tracking error?" },
      {
        type: "p",
        text: "Usually not. A steady gap is normal. A sudden change in the gap is the warning sign, and that is when to check the tags.",
      },
      { type: "h3", text: "Can the numbers ever match exactly?" },
      {
        type: "p",
        text: "Not across platforms that use different dates, windows and attribution. You can bring them closer by aligning settings, but the goal is a consistent, explained gap, not a perfect match.",
      },
      { type: "h3", text: "Should I import GA4 conversions into Google Ads?" },
      {
        type: "p",
        text: "It can bring the two closer, because Google Ads then optimizes on GA4’s definition. Whether it is right depends on the account, so treat it as a decision for each client, not a fix for reporting.",
      },
    ],
  },

  "chase-overdue-retainer-invoice": {
    seoTitle: "How to Chase an Overdue Retainer Invoice (With Templates)",
    dek: "A polite, predictable reminder schedule gets agency retainers paid without straining the relationship. Here is the schedule, the wording for each step, and who should send what.",
    body: [
      {
        type: "p",
        text: "The best way to chase an overdue retainer invoice is to follow the same polite schedule for every client, starting before the due date: a courtesy note, a due-date reminder, two follow-ups after it passes, then a call. When chasing is routine, it stops feeling personal, and clients know what comes next.",
      },
      {
        type: "p",
        text: "Agencies find this harder than most businesses because the person who would chase is often the person who manages the account. Nobody wants to send a payment reminder the day before a strategy call. This guide gives you a schedule, wording for each step, and a way to keep the account relationship out of it.",
      },
      { type: "h2", text: "Why agencies put off chasing invoices" },
      {
        type: "ul",
        items: [
          "**It feels awkward.** Account managers worry a reminder will sour the relationship.",
          "**Nobody owns it.** Finance assumes the account manager will mention it; the account manager assumes finance has it.",
          "**The work keeps going.** A retainer means you’re delivering this month while last month’s invoice is still open, so the debt grows quietly.",
          "**Every reminder is written from scratch.** So each one takes thought, and it gets pushed to tomorrow.",
        ],
      },
      { type: "h2", text: "A reminder schedule that works" },
      {
        type: "p",
        text: "Adjust the days to your payment terms. The point is that every client gets the same steps, in the same order, so nobody has to decide when to chase.",
      },
      {
        type: "ol",
        items: [
          "**Three to five days before the due date:** a friendly heads-up with the invoice attached and a link to pay.",
          "**On the due date:** a short reminder that it’s due today.",
          "**Seven days overdue:** a follow-up asking whether anything is holding it up, such as a missing PO number or a new contact in accounts.",
          "**Fourteen days overdue:** a firmer note with a clear date and what happens next under your agreement.",
          "**After that:** a phone call from the agency owner or finance lead, not the account manager.",
        ],
      },
      { type: "h2", text: "Email templates for each step" },
      {
        type: "p",
        text: "Keep each message short, attach the invoice every time, and include a way to pay in one click if your billing system offers one.",
      },
      {
        type: "template",
        title: "1. Before the due date",
        lines: [
          "**Subject:** Invoice [number] for [month] is due on [date]",
          "Hi [name], a quick heads-up that invoice [number] for [amount] is due on [date]. It’s attached, and you can pay here: [link]. If anything needs to change on your side, such as a PO number or a new billing contact, just let me know.",
        ],
      },
      {
        type: "template",
        title: "2. On the due date",
        lines: [
          "**Subject:** Invoice [number] is due today",
          "Hi [name], just a reminder that invoice [number] for [amount] is due today. Here’s the link to pay: [link]. Thanks!",
        ],
      },
      {
        type: "template",
        title: "3. Seven days overdue",
        lines: [
          "**Subject:** Following up on invoice [number]",
          "Hi [name], invoice [number] for [amount] was due on [date] and still shows as open on our side. Is there anything holding it up, such as an approval or missing details? I’ve attached it again, and the payment link is here: [link].",
        ],
      },
      {
        type: "template",
        title: "4. Fourteen days overdue",
        lines: [
          "**Subject:** Invoice [number] is now 14 days overdue",
          "Hi [name], invoice [number] for [amount] is now 14 days past its due date of [date]. Could you let me know by [date] when we can expect payment? Under our agreement, [what happens next, e.g. a late fee or a pause on new work] applies after [date]. If there’s a problem, I’d rather hear about it now so we can sort it out together.",
        ],
      },
      {
        type: "p",
        text: "Only mention a consequence your contract actually includes, and only if you are prepared to apply it. An empty threat teaches the client that your deadlines move.",
      },
      { type: "h2", text: "Who should send the reminders" },
      {
        type: "p",
        text: "Send reminders from a billing address or the finance lead, not the account manager. It keeps the strategy relationship separate from the money conversation, and it signals that this is process, not a personal complaint. The account manager should still know where every invoice stands, so a payment issue never surprises them on a client call.",
      },
      { type: "h2", text: "Prevent overdue invoices in the first place" },
      {
        type: "ul",
        items: [
          "**Agree payment terms in writing** before work starts: due date, accepted payment methods, and what happens when an invoice is late.",
          "**Invoice on the same day each month** so clients can plan for it.",
          "**Confirm the billing contact** at onboarding, and ask again when a client restructures.",
          "**Make paying easy:** a payment link, card and bank transfer options, and the invoice attached as a PDF.",
          "**Bill retainers in advance** where you can, so the work isn’t already done when the invoice goes unpaid.",
        ],
      },
      { type: "h2", text: "When to pause work" },
      {
        type: "p",
        text: "Pausing work is a business decision, not a reminder step, and it should follow what your contract says. If you do it, say so in writing, give a date, and keep the tone factual. Steady, polite reminders mean it rarely has to come to that.",
      },
      { type: "h2", text: "How Lane runs the schedule for you" },
      {
        type: "p",
        text: "BotLane’s [Invoice follow-up](/systems/invoice-follow-up) lane watches open invoices in Stripe, QuickBooks Online or Xero. It prepares each reminder on schedule, in your wording, with the invoice and a payment link, and stops as soon as the client pays or replies. Every reminder waits in your approval queue, so a person on your team decides what is sent and when. Nothing goes out on its own.",
      },
      { type: "h2", text: "Common questions" },
      { type: "h3", text: "How soon should you follow up on an unpaid invoice?" },
      {
        type: "p",
        text: "Start before it is due with a courtesy note, then follow up on the due date and about a week after. Waiting a month before the first reminder makes the conversation harder, not easier.",
      },
      { type: "h3", text: "Is it rude to send a reminder before an invoice is due?" },
      {
        type: "p",
        text: "No. A short heads-up with the invoice attached is a service: it catches missing PO numbers and wrong contacts while there is still time to fix them.",
      },
      { type: "h3", text: "Should the account manager chase the invoice?" },
      {
        type: "p",
        text: "Ideally not. Keep them informed, but let billing or the finance lead send the reminders and make the calls.",
      },
    ],
  },

  "agency-lead-response-time": {
    seoTitle: "How Fast Should an Agency Reply to a New Lead?",
    dek: "Reply to a new enquiry within the same working hour, with a reply that shows you read it. Here’s how to set a response standard your agency can keep while the team is busy delivering.",
    body: [
      {
        type: "p",
        text: "An agency should reply to a new enquiry within the same working hour, and the reply should show that someone actually read it. Speed matters because a prospect who fills in your form is often contacting other agencies too, and the first thoughtful reply sets the terms of the conversation. But a fast, generic reply wastes the advantage. The goal is fast and specific.",
      },
      {
        type: "p",
        text: "The hard part isn’t knowing this. It is keeping to it when the people who should reply are busy delivering for existing clients. This guide covers how to set a standard, what a good first reply contains, and how to follow up without becoming a nuisance.",
      },
      { type: "h2", text: "Why agencies reply slowly" },
      {
        type: "ul",
        items: [
          "**New business has no owner.** Enquiries land in a shared inbox, and everyone assumes someone else has them.",
          "**The best person to reply is the busiest.** Founders and senior strategists write the best replies and have the least time.",
          "**Every reply starts from scratch.** Looking up the company, checking their ads and writing something specific takes real time, so it waits for a quiet moment that doesn’t come.",
          "**Enquiries arrive at bad times.** Evenings, weekends and the middle of a client deadline.",
        ],
      },
      { type: "h2", text: "Set a response standard your team can keep" },
      {
        type: "p",
        text: "Write it down and make one person accountable for it each day. A standard that depends on whoever notices first isn’t a standard.",
      },
      {
        type: "ol",
        items: [
          "**During working hours:** a specific first reply within the hour.",
          "**Outside working hours:** a reply by mid-morning on the next working day, before the prospect’s day fills up.",
          "**Every enquiry:** a named owner within minutes, even if the reply takes longer.",
          "**Every week:** a quick check of how long replies actually took, so the standard doesn’t drift.",
        ],
      },
      { type: "h2", text: "What a good first reply contains" },
      {
        type: "p",
        text: "A good first reply proves you listened, adds a small amount of value, and makes the next step easy. It doesn’t attach a capabilities deck or list every service you offer.",
      },
      {
        type: "ul",
        items: [
          "**Their words back to them.** Reference the specific problem they described.",
          "**One relevant observation.** Something you noticed from a quick look at their site or ads, framed as a question rather than a criticism.",
          "**A clear next step.** A link to book a call, with two or three suggested times.",
          "**A real sender.** A named person at the agency, not a no-reply address.",
        ],
      },
      {
        type: "template",
        title: "First reply to a new enquiry",
        lines: [
          "**Subject:** Re: [their enquiry subject]",
          "Hi [name], thanks for getting in touch about [their goal, in their words]. I had a quick look at [their site / their current ads] and [one specific observation, phrased as a question].",
          "It would help to hear more about [one question about their situation]. Would a 20-minute call on [day] or [day] work? You can also pick a time here: [booking link].",
          "[Your name], [role] at [agency]",
        ],
      },
      { type: "h2", text: "How to follow up without being pushy" },
      {
        type: "p",
        text: "Many prospects don’t reply to the first message because they are busy, not because they are uninterested. Two follow-ups are usually enough, and each should add something new rather than asking “just checking in?”.",
      },
      {
        type: "ol",
        items: [
          "**Two working days later:** a short note with one useful idea or a relevant example of your thinking.",
          "**A week after that:** a polite close: you’ll stop following up, and they can pick a time whenever it suits them.",
          "**The moment they reply or book:** stop the sequence. Nothing loses goodwill faster than an automated follow-up after someone has already answered.",
        ],
      },
      { type: "h2", text: "Speed without sending generic replies" },
      {
        type: "p",
        text: "The obvious fix is an instant auto-reply. It confirms receipt, but prospects can tell it isn’t a reply, and it doesn’t start the conversation. A better approach is to make the specific reply fast to produce: the research done and a draft written within minutes, so a person only has to read it, adjust it and send it.",
      },
      {
        type: "p",
        text: "That is how BotLane’s [Lead follow-up](/systems/lead-follow-up) lane works. When an enquiry arrives through Typeform, Webflow or HubSpot, Lane looks up the company, drafts a tailored reply with your booking link, and puts it in your approval queue. It prepares the follow-ups too, and stops as soon as the prospect replies or books. A person on your team approves every message before it is sent, from their own address.",
      },
      { type: "h2", text: "Common questions" },
      { type: "h3", text: "Is a same-day reply good enough?" },
      {
        type: "p",
        text: "It is better than a next-day reply, but a reply within the hour keeps you ahead of agencies that take longer. If same-day is all your team can keep, make it the standard and hold to it.",
      },
      { type: "h3", text: "Should the founder reply to every enquiry?" },
      {
        type: "p",
        text: "Not necessarily. The founder’s judgement matters most on the call. A well-prepared first reply from a named person on the team, with the founder on the call, often works better than a slow reply from the founder.",
      },
      { type: "h3", text: "How many follow-ups are too many?" },
      {
        type: "p",
        text: "For an inbound enquiry, two follow-ups after the first reply is a sensible limit. After that, leave the door open and stop.",
      },
    ],
  },

  "human-in-the-loop-ai-for-agencies": {
    seoTitle: "Human-in-the-Loop AI for Agencies: What Approval Means",
    dek: "“Human-in-the-loop” can mean a person who could step in, or a person who signs off on every message. For agencies, only the second protects client relationships. Here’s what to require.",
    body: [
      {
        type: "p",
        text: "For an agency, human-in-the-loop AI should mean one thing: nothing reaches a client or prospect until a person on your team has reviewed it and approved it. Many products use the phrase more loosely, for a person who watches a dashboard or only sees the cases the software flags. Those setups can work for internal tasks. They don’t work for reports, replies and reminders that go out under your agency’s name.",
      },
      {
        type: "p",
        text: "The difference decides who is accountable when a report has the wrong number in it, or a payment reminder goes to a client who already paid. So it is worth being precise about which version you are buying.",
      },
      { type: "h2", text: "Three versions of “human-in-the-loop”" },
      {
        type: "ol",
        items: [
          "**Monitoring.** The system acts on its own and a person keeps an eye on it. They can intervene, but by the time they notice a problem the email has usually gone.",
          "**Exception review.** The system acts on its own unless it is unsure, and then it asks a person. This only works if it is reliably right about when it is unsure, which is the hardest thing to get right.",
          "**Approval.** The system prepares the work and stops. A person reviews it, edits it if needed, and approves it. Nothing is sent until they do.",
        ],
      },
      {
        type: "p",
        text: "Only the third version keeps an agency in control of what its clients see. It is the one BotLane uses for everything client-facing. Lane prepares; you approve. There is no autopilot mode, and it is not an option you can switch on later.",
      },
      { type: "h2", text: "Why agencies need approval, not monitoring" },
      {
        type: "ul",
        items: [
          "**Client trust is the asset.** One wrong number in a report or one tone-deaf reminder can cost more goodwill than months of saved time are worth.",
          "**Your name is on it.** Clients don’t distinguish between work your team wrote and work software drafted. It all comes from the agency.",
          "**Context lives with people.** The account lead knows about last week’s budget conversation and the launch that slipped. The data doesn’t.",
          "**Accountability stays clear.** The person who owns the relationship decides what goes out, whoever drafted it.",
        ],
      },
      { type: "h2", text: "What a good approval step looks like" },
      {
        type: "p",
        text: "Approval only works if review is quick. If checking a draft takes as long as writing it, people start approving without reading, and you are back to autopilot in all but name. A good approval step gives the reviewer what they need in one place:",
      },
      {
        type: "ul",
        items: [
          "**Sources on every draft,** so a reviewer can check a number without opening five tabs.",
          "**Flags instead of guesses,** so missing or odd data is visible rather than filled in with a plausible number.",
          "**Edits before sending,** so a reviewer can fix a figure or the tone in place.",
          "**Delivery from your own accounts,** so approved messages go out from your team’s addresses as usual.",
        ],
      },
      {
        type: "callout",
        title: "The rule in one line",
        text: "Every report, reply and reminder waits for a person on your team to approve it. Approval is always required.",
      },
      { type: "h2", text: "How approval works with BotLane" },
      {
        type: "p",
        text: "Lane does the preparation in three lanes: [Client reporting](/systems/client-reporting), [Lead follow-up](/systems/lead-follow-up) and [Invoice follow-up](/systems/invoice-follow-up). It pulls the numbers, drafts the report, writes the reply to a new enquiry or lines up the reminder for an overdue invoice. Each draft lands in your approval queue with its sources and the reason for the recommended next step. Your reviewer approves it, changes it or declines it. If they decline, nothing happens.",
      },
      {
        type: "p",
        text: "The same principle applies to changes to Lane itself. Updates follow a written release standard, with a person signing off before anything reaches production. You can read it on the [12-Gate Release Standard](/trust/release-standard) page.",
      },
      { type: "h2", text: "Questions to ask any AI vendor" },
      {
        type: "ul",
        items: [
          "Can anything be sent to a client or prospect without a person approving it?",
          "Is there an autopilot or auto-send setting, and who can turn it on?",
          "When data is missing, does the system flag it or fill it in?",
          "Can a reviewer see where each number in a draft came from?",
          "Does the system send from our own email addresses?",
          "Who checks changes to the system before they go live?",
        ],
      },
      {
        type: "p",
        text: "Our answers: no; no; it flags it; yes; yes; and a person on our side, every time. If you want to see the approval queue for yourself, [book a demo](/demo).",
      },
      { type: "h2", text: "Common questions" },
      { type: "h3", text: "Doesn’t approval slow everything down?" },
      {
        type: "p",
        text: "It adds a step, and the job of a good system is to make that step short. When the data is pulled, reconciled and drafted, and anything unusual is flagged, a review takes minutes rather than the hours the work itself used to take.",
      },
      { type: "h3", text: "Can we turn approval off for low-risk messages later?" },
      {
        type: "p",
        text: "Not with BotLane. Approval is always required for anything that goes to a client or prospect. We think that line is worth holding even for messages that look routine.",
      },
    ],
  },

  "automated-client-reporting-for-agencies": {
    seoTitle: "Automated Client Reporting for Agencies: What to Automate",
    dek: "Automate the collecting, reconciling and formatting of client reports. Keep the judgement, the context and the final approval with your team. Here’s how to split the work and switch over safely.",
    body: [
      {
        type: "p",
        text: "Automated client reporting works best when it takes over the mechanical parts of the job and leaves the judgement to people. Collecting numbers from each platform, reconciling them and dropping them into the client’s template should happen without anyone exporting a spreadsheet. Deciding what the numbers mean, what to recommend and what to tell the client should stay with the account lead, who approves the report before it is sent.",
      },
      {
        type: "p",
        text: "This guide breaks the reporting process into its parts, shows which to automate and which to keep, and sets out a way to move off spreadsheets without risking a bad report reaching a client.",
      },
      { type: "h2", text: "The four parts of a client report" },
      {
        type: "ol",
        items: [
          "**Collecting** the numbers from Google Ads, Meta, GA4, the CRM and anywhere else the client’s results live.",
          "**Reconciling** them: lining up date ranges, removing conversions counted by more than one platform, and matching spend to results and revenue.",
          "**Presenting** them: charts, tables and the client’s template.",
          "**Explaining** them: the summary, the commentary and the recommendations.",
        ],
      },
      {
        type: "p",
        text: "The first three follow the same steps every time, which makes them ideal to automate. The fourth is where your expertise shows, and where clients decide whether your agency understands their business.",
      },
      { type: "h2", text: "What to automate" },
      {
        type: "ul",
        items: [
          "**Data collection on a schedule,** directly from each platform, so nobody exports anything.",
          "**Reconciliation rules written down once** and applied the same way every period, so numbers stay consistent from week to week.",
          "**The layout,** so every client’s report is built from their template without manual formatting.",
          "**Checks for missing or odd data,** so a broken tag is caught before the report goes out, not after the client asks.",
          "**A first draft of the commentary,** as a starting point the account lead edits rather than a blank page.",
        ],
      },
      { type: "h2", text: "What to keep human" },
      {
        type: "ul",
        items: [
          "**Context.** The budget conversation, the delayed launch, the stakeholder who only reads the first line.",
          "**Recommendations.** What to change next, and why it fits the client’s goals.",
          "**Tone.** How direct to be about bad news with this particular client.",
          "**The final approval.** A person on your team reads the report and decides it’s ready.",
        ],
      },
      {
        type: "callout",
        title: "Prepared, then approved",
        text: "Automation should prepare the report. A person on your team should review it, edit it if needed, and approve it before it reaches the client.",
      },
      { type: "h2", text: "Dashboards, BI tools or a prepared report?" },
      {
        type: "p",
        text: "Agencies usually choose between three approaches. Each has a place.",
      },
      {
        type: "ul",
        items: [
          "**Reporting dashboards** connect to your platforms and give clients a live view. They suit clients who like to check numbers themselves, but they show data, not explanations.",
          "**BI and spreadsheet connectors** pull data into tools like Looker Studio or Sheets. They are flexible, but someone has to build and maintain every report, and fix it when a platform changes.",
          "**Prepared reports** pull, reconcile and draft the report, including the commentary, and put it in front of a reviewer. They help most with the explaining, which is the part that takes judgement, as long as a person still approves the result.",
        ],
      },
      { type: "h2", text: "How to switch without risk" },
      {
        type: "ol",
        items: [
          "**Write down your reconciliation rules.** Which conversions count, which source is the headline number, how you handle platforms that disagree. Our guide to [why Google Ads, Meta and GA4 never match](/blog/google-ads-meta-ga4-numbers-dont-match) can help.",
          "**Start with one client** whose report you know well.",
          "**Run both side by side** for a few cycles: the spreadsheet as usual, and the automated version in review.",
          "**Compare them line by line.** Where they differ, find out why. Often it is a rule that was never written down.",
          "**Switch that client over** once you trust the new version, then add the next.",
        ],
      },
      { type: "h2", text: "Mistakes to avoid" },
      {
        type: "ul",
        items: [
          "**Sending reports nobody read.** Automatic delivery without review is how a broken tag becomes a client escalation.",
          "**Reporting every metric.** More numbers make a report look thorough and read worse. Pick the few that track the client’s goal.",
          "**Adding up platform conversions.** It counts the same sale more than once. Use one source of truth for the headline.",
          "**Generic commentary.** “Performance was strong” tells the client nothing. See our guide to [writing PPC report commentary](/blog/ppc-report-commentary) for a structure that does.",
        ],
      },
      { type: "h2", text: "How Client reporting works at BotLane" },
      {
        type: "p",
        text: "On the schedule you choose, Lane connects to Google Ads, Meta, GA4 and HubSpot and pulls the period’s performance data. It reconciles the numbers, including blended return on ad spend and conversions counted by more than one platform, and checks them against closed-won revenue in your CRM. It then drafts the summary in your agency’s tone: top campaigns and creatives, budget pacing and recommended next steps.",
      },
      {
        type: "p",
        text: "The finished report, as a PDF and a shareable link, lands in your approval queue with a note in Slack or email. You review it, edit it if needed, and approve it. Only then does it go to your client. See the full flow on the [Client reporting](/systems/client-reporting) page, or [book a demo](/demo) to see a prepared report.",
      },
      { type: "h2", text: "Common questions" },
      { type: "h3", text: "Can client reports be fully automated?" },
      {
        type: "p",
        text: "The data, the layout and a first draft can be. The judgement shouldn’t be. A report that goes out without anyone reading it will eventually say something confidently wrong to a client.",
      },
      { type: "h3", text: "How often should automated reports go out?" },
      {
        type: "p",
        text: "Whatever cadence the client agreed to. Automation makes weekly reports practical, but only send them weekly if the client will act on weekly information.",
      },
      { type: "h3", text: "Will automated reports look the same for every client?" },
      {
        type: "p",
        text: "They shouldn’t. The layout can follow a template, but the metrics, the headline number and the commentary should match each client’s goals.",
      },
    ],
  },

  "why-we-built-botlane": {
    seoTitle: "Why We Built BotLane",
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
        text: "Every report, reply and reminder waits for a person on your team to approve it. There is no autopilot mode. We wrote about why in [Human-in-the-loop AI for agencies](/blog/human-in-the-loop-ai-for-agencies).",
      },
      { type: "h3", text: "Your tools, not ours" },
      {
        type: "p",
        text: "Lane connects to the ad platforms, inbox and billing software you already use. No new system for your team to learn.",
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
    .map((b) => {
      switch (b.type) {
        case "ul":
        case "ol":
          return b.items.join(" ");
        case "template":
          return b.lines.join(" ");
        case "compare":
          return `${b.before} ${b.after}`;
        case "callout":
          return `${b.title} ${b.text}`;
        default:
          return b.text;
      }
    })
    .join(" ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}
