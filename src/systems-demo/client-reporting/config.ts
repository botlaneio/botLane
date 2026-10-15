import { CheckCircle2, FileText, Layers } from "lucide-react";
import type { SystemDemoConfig } from "@/modules/demo-funnel/types";

export const clientReportingDemo: SystemDemoConfig = {
  system: "client-reporting",
  context: {
    eyebrow: "Client Reporting / Live demo",
    headline: "See your reporting workflow, reimagined.",
    intro:
      "Discover how Lane turns scattered performance data into clear, client-ready reports, with your approval before delivery.",
    highlights: [
      { icon: Layers, title: "Consolidate", text: "Performance data from your ad platforms and CRM in one place." },
      { icon: FileText, title: "Prepare", text: "A client-ready report with clear commentary, in your format." },
      { icon: CheckCircle2, title: "Approve", text: "You review it. Nothing is delivered until you say so." },
    ],
    points: ["Built around your existing workflow", "No account required to book", "Your team retains control"],
    controlNote: "Lane prepares every report. A person on your team approves it before any client sees it.",
  },
  meeting: {
    title: "BotLane — Client Reporting Live Demo",
    minutes: 20,
    agenda: [
      { minutes: 5, text: "Your current reporting process" },
      { minutes: 10, text: "Lane's reporting workflow, live" },
      { minutes: 5, text: "Fit and next steps" },
    ],
  },
  questions: [
    {
      id: "client_range",
      shortLabel: "Clients",
      prompt: "How many clients do you report to regularly?",
      hint: "A rough number is fine.",
      options: [
        { id: "1_5", label: "1–5 clients" },
        { id: "6_20", label: "6–20 clients" },
        { id: "21_50", label: "21–50 clients" },
        { id: "50_plus", label: "50+ clients" },
      ],
    },
    {
      id: "primary_challenge",
      shortLabel: "Challenge",
      prompt: "What’s your biggest reporting challenge?",
      hint: "Pick the one that costs your team the most.",
      options: [
        { id: "manual_prep", label: "Preparing reports takes too much time" },
        { id: "scattered_data", label: "Data is scattered across different tools" },
        { id: "insights", label: "Turning metrics into meaningful insights is difficult" },
        { id: "review_delivery", label: "Reviewing and delivering reports is inefficient" },
      ],
    },
  ],
  labels: { preview: "Preview", schedule: "Book", skipToTimes: "Skip to available times" },
};
