"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FadeUp } from "@/components/motion/fade-up";

interface FaqItem {
  question: string;
  answer: string;
  category: "Safety & Approvals" | "Integrations" | "Workflow";
}

const FAQS: FaqItem[] = [
  {
    category: "Safety & Approvals",
    question: "Does Lane ever send an email or client report without my permission?",
    answer:
      "Never. That is the core architecture of BotLane. Lane is strictly configured as a preparer, not an unchecked autonomous sender. Every client performance report, new lead outreach, and invoice reminder is compiled into a 1-click preview desk. You can inspect the artifact, tweak any phrasing, or click 'Approve & Dispatch'. If you don't approve it, it never leaves your domain.",
  },
  {
    category: "Integrations",
    question: "How does Invoice Follow-Up know when a client has paid?",
    answer:
      "Lane continuously polls your Stripe, QuickBooks, Xero, or Plaid bank feeds. As soon as a transaction settles or an invoice is marked paid, the corresponding follow-up loop halts immediately within 60 seconds. You will never awkwardly chase a client who already paid.",
  },
  {
    category: "Workflow",
    question: "How does Lane match our agency's unique voice and reporting style?",
    answer:
      "During sandbox onboarding, Lane ingests your past 6 months of client communications and executive reports. Whether your agency speaks with crisp corporate clarity or warm boutique intimacy, Lane mirrors your formatting, vocabulary, sign-offs, and metric emphasis.",
  },
  {
    category: "Safety & Approvals",
    question: "Can I edit Lane's drafts before they are dispatched?",
    answer:
      "Yes. Every single item queued on your approval desk features an inline WYSIWYG editor. You can rewrite a sentence, add a personalized birthday greeting to a client, or swap a chart with one keystroke before clicking Approve.",
  },
  {
    category: "Integrations",
    question: "What happens if an ad account API has missing data or an anomaly?",
    answer:
      "Lane runs deterministic consistency checks across connected data sources. If Google Ads returns a partial data day, or if Meta's pixel dropped off, Lane highlights the anomaly with an amber alert in your draft rather than hallucinating plausible numbers.",
  },
  {
    category: "Workflow",
    question: "Can multiple team members review different clients?",
    answer:
      "Yes. BotLane includes unlimited seats. You can route SEO client approvals to your Organic Lead, Paid Media clients to your Ads Director, and overdue invoice approvals directly to the agency owner or finance lead.",
  },
  {
    category: "Safety & Approvals",
    question: "What is your 30-day risk-free guarantee?",
    answer:
      "If Lane isn't working for your agency, email us within 30 days of your first payment and we'll refund it in full. No questions asked.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative mx-auto max-w-[60rem] px-6 py-24 sm:py-32">
      <FadeUp className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-lane">
          <span className="size-1.5 rounded-full bg-lane-gradient" />
          <span>Clear Answers</span>
        </div>
        <h2 className="mt-4 text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-ink">
          Frequently asked questions.
        </h2>
        <p className="mt-3 text-base text-muted">
          Everything you need to know about permissions, data safety, and daily operations with Lane.
        </p>
      </FadeUp>

      <FadeUp delay={0.1} className="mt-14 space-y-3.5">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={faq.question}
              className={`overflow-hidden rounded-[1rem] border transition-all duration-200 ${
                isOpen
                  ? "border-lane/30 bg-white shadow-[0_0.5rem_1.5rem_rgba(20,20,40,0.04)]"
                  : "border-line bg-white/70 hover:border-line hover:bg-white"
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="flex w-full items-center justify-between p-5 text-left transition-colors"
                aria-expanded={isOpen}
              >
                <span className="text-base font-semibold tracking-[-0.01em] text-ink pr-4">
                  {faq.question}
                </span>
                <span
                  className={`flex size-7 shrink-0 items-center justify-center rounded-full border border-line bg-surface transition-transform duration-200 ${
                    isOpen ? "rotate-180 bg-lane/10 text-lane border-lane/30" : "text-muted"
                  }`}
                >
                  <ChevronDown size={15} />
                </span>
              </button>

              {isOpen && (
                <div className="border-t border-line/50 px-5 pt-3.5 pb-5 text-sm leading-relaxed text-muted animate-in fade-in duration-200">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </FadeUp>
    </section>
  );
}
