// Statements carried over from the previous site. Solo to confirm before launch (see PR).
export const laneDoes = [
  "Prepares reports, replies, reminders and tasks from your connected tools",
  "Shows where every figure and statement came from",
  "Waits for your approval before anything goes out",
  "Flags anything unusual instead of guessing",
  "Records every action in an activity log",
];

export const laneNever = [
  "Sends anything in your name without approval",
  "Makes commitments on price, scope or deadlines for you",
  "Moves money, issues refunds or changes accounts",
  "Uses your data to train public AI models",
  "Accesses more of your tools than the workflow needs",
];

export const safeguardSections = [
  {
    id: "approval",
    title: "Approval before anything is sent",
    body: "Every report, reply and reminder lands in an approval queue. You can approve it, edit it, ask for changes or reject it. Nothing leaves your business until a person says yes.",
  },
  {
    id: "sources",
    title: "Every figure shows its source",
    body: "When Lane uses a number or a fact, it notes which tool and which date range it came from. Checking a report takes seconds, not a second round of copy and paste.",
  },
  {
    id: "pause",
    title: "Pause everything in one click",
    body: "You can pause one workflow, one client, or everything at once. Paused work waits safely until you resume it.",
  },
  {
    id: "data",
    title: "Your data stays yours",
    body: "Lane only connects to what a workflow needs. Your data isn't used to train public AI models, and you can revoke any connection at any time from the tool itself.",
  },
  {
    id: "issues",
    title: "When something goes wrong",
    body: "If a tool is down, data is missing or something looks off, Lane stops and flags it. We're alerted, we investigate and fix it, and you see what happened in the activity log.",
  },
];
