/**
 * Qualification module types. The module knows nothing about previews or booking: a system
 * supplies its questions, and the module hands back stable, machine-readable answer IDs.
 */

export type QuestionOption = {
  /** Stable identifier stored with the lead and used to personalise the preview. Never change once live. */
  id: string;
  label: string;
  /** Optional one-line clarification under the label. */
  detail?: string;
};

export type Question = {
  id: string;
  /** Short name for the progress indicator, e.g. "Clients". */
  shortLabel: string;
  prompt: string;
  hint?: string;
  options: QuestionOption[];
};

/** Answers keyed by question ID. A missing key means the visitor hasn't answered yet. */
export type Answers = Record<string, string>;
