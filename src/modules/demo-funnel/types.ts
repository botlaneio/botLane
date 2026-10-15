import type { LucideIcon } from "lucide-react";
import type { Question } from "@/modules/qualification/types";

/**
 * Everything a system (Client Reporting, Lead Follow-up, ...) supplies to reuse the demo funnel.
 * The funnel composes qualification → preview → scheduling from this; no system logic lives in it.
 */
export type SystemDemoConfig = {
  /** Stable system key, carried into the lead record and analytics. */
  system: string;
  context: {
    eyebrow: string;
    headline: string;
    intro: string;
    /** Three compact workflow highlights. */
    highlights: { icon: LucideIcon; title: string; text: string }[];
    /** Short reassurance points. */
    points: string[];
    /** Human-control reassurance line. */
    controlNote: string;
  };
  meeting: { title: string; minutes: number; agenda: { minutes: number; text: string }[] };
  questions: Question[];
  labels: { preview: string; schedule: string; skipToTimes: string };
};
