"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT, FadeUp } from "@/components/motion/fade-up";
import { ShieldCheck, Eye, Lock, AlertTriangle, ArrowRight } from "lucide-react";
import Link from "next/link";

const GUARDRAILS = [
  {
    icon: ShieldCheck,
    title: "Zero surprise sends",
    description:
      "Lane prepares drafts to 100% completion, but every external email, client report, or payment reminder stays queued on your approval desk until you click dispatch.",
    stat: "100%",
    statLabel: "Human-in-the-loop",
  },
  {
    icon: Eye,
    title: "Glass-box rationale",
    description:
      "Every generated metric, recommendation, or follow-up note cites its exact underlying source in Google Ads, Stripe, or HubSpot. No mysterious calculations.",
    stat: "Full audit",
    statLabel: "Verifiable sources",
  },
  {
    icon: Lock,
    title: "Zero training on your data",
    description:
      "Your client numbers, financial records, and email archives are processed ephemerally in isolated secure memory and never fed into public LLM training sets.",
    stat: "SOC2 ready",
    statLabel: "Isolated data tenancy",
  },
  {
    icon: AlertTriangle,
    title: "Instant kill-switch & pause",
    description:
      "Need to step away or pause an invoice sequence while renegotiating a contract? One click halts all outgoing cadence immediately.",
    stat: "< 1s",
    statLabel: "Cadence halt latency",
  },
];

export function ControlSection() {
  const reduce = useReducedMotion();
  return (
    <section className="relative mx-auto max-w-[75rem] px-6 py-24 sm:py-32">
      <FadeUp className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-lane/20 bg-lane/5 px-3 py-1 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-lane">
          <span className="size-1.5 rounded-full bg-lane" />
          <span>Sovereignty & Governance</span>
        </div>
        <h2 className="mt-4 text-[clamp(2rem,4.2vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-ink">
          You stay in total control. <br />
          Lane does the labor. You give the word.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          Most automated tools make agencies nervous because they operate in the dark.
          Lane was engineered from day one with strict human-in-the-loop bilateral boundaries.
        </p>
      </FadeUp>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {GUARDRAILS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -12% 0px" }}
              whileHover={{ y: -4, transition: { duration: 0.25, ease: EASE_OUT } }}
              transition={{ duration: 0.7, delay: idx * 0.08, ease: EASE_OUT }}
              className="group relative flex flex-col justify-between rounded-[1.25rem] border border-line bg-white p-6 shadow-[0_0.25rem_1.25rem_rgba(20,20,40,0.03)] transition-[border-color,box-shadow] duration-300 hover:border-lane/25 hover:shadow-[0_1rem_2.25rem_rgba(20,20,40,0.08)]"
            >
              <div>
                <div className="flex size-10 items-center justify-center rounded-[0.625rem] border border-line bg-surface text-ink transition-colors group-hover:border-lane/30 group-hover:bg-lane/5 group-hover:text-lane">
                  <Icon size={19} />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-[-0.02em] text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 border-t border-line/60 pt-4">
                <div className="font-mono text-sm font-semibold tracking-tight text-ink">
                  {item.stat}
                </div>
                <div className="font-mono text-[0.625rem] uppercase tracking-wider text-muted">
                  {item.statLabel}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Trust banner */}
      <div className="mt-10 rounded-[1.125rem] border border-line/80 bg-surface/50 p-6 sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
            <ShieldCheck size={18} />
          </div>
          <div>
            <div className="text-sm font-medium text-ink">
              Agency Guarantee: Nothing leaves your outbox until you tap Approve.
            </div>
            <div className="text-xs text-muted">
              Every draft includes full preview, editable copy, and transparent source calculations.
            </div>
          </div>
        </div>
        <div className="mt-4 shrink-0 sm:mt-0">
          <Link
            href="/legal/privacy"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-lane hover:underline"
          >
            <span>Read security & privacy architecture</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}
