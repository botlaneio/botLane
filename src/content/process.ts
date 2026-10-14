export const steps = [
  {
    title: "Intake",
    body: "We learn how the work runs today: your tools, the volume, and where time goes.",
    detail: "A discovery call, then an assessment of one workflow. You get a written recommendation, including if we think it isn't a good fit.",
  },
  {
    title: "Prepare",
    body: "We design the workflow and set it up inside the tools you already use.",
    detail: "Together we agree exactly what Lane will do, what needs your approval, and what it must never do. Then we connect your tools with only the access the workflow needs.",
  },
  {
    title: "Review",
    body: "You review and approve how the workflow behaves before it goes live.",
    detail: "We test on real examples from your business. You see the outputs, the data it uses and the approval rules, and sign off.",
  },
  {
    title: "Deploy",
    body: "We switch it on carefully and watch it closely.",
    detail: "Lane starts in a review-only mode, so everything waits for you. We adjust until the work is consistently right.",
  },
  {
    title: "Operate",
    body: "We keep it running, handle problems, and improve it over time.",
    detail: "We monitor every run, fix failures, update the workflow when your tools or process change, and report on what Lane did.",
  },
];

export const responsibilities: { task: string; botlane: boolean; you: boolean }[] = [
  { task: "Designing the workflow and its approval rules", botlane: true, you: true },
  { task: "Connecting and maintaining the integrations", botlane: true, you: false },
  { task: "Monitoring runs and fixing failures", botlane: true, you: false },
  { task: "Updating Lane when your tools or process change", botlane: true, you: false },
  { task: "Approving what goes out in your name", botlane: false, you: true },
  { task: "Telling us when the business changes", botlane: false, you: true },
  { task: "Reporting on what Lane did", botlane: true, you: false },
];

export const processFaq = [
  { q: "Do we need to change our tools?", a: "No. Lane works inside the tools you already use. There's no new platform for your team to learn." },
  { q: "How much of our time does it take?", a: "Some time during intake and review, so we get the workflow right. After that, mostly approving Lane's work." },
  { q: "Who looks after it once it's live?", a: "We do. Monitoring, fixes and updates are part of operating the workflow for you." },
  { q: "What happens if something goes wrong?", a: "Lane stops and flags it rather than guessing. We investigate and fix it, and you can pause everything at any time." },
];
