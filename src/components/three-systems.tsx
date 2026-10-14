"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT, FadeUp } from "@/components/motion/fade-up";
import Link from "next/link";
import { ArrowRight, Layers, GitCommit, RotateCw } from "lucide-react";

const SYSTEMS = [
  {
    id: "client-reporting",
    num: "01",
    shape: "FUNNEL",
    href: "/systems/client-reporting",
    title: "Client reporting",
    body: "Lane pulls your Google Ads, Meta, and CRM numbers into one weekly client-ready report. You approve it with 1 click, and it delivers on time.",
    highlight: "Multi-channel synthesis",
    icon: Layers,
    stats: "3.5 hrs / client / mo saved",
  },
  {
    id: "lead-follow-up",
    num: "02",
    shape: "LINE",
    href: "/systems/lead-follow-up",
    title: "Lead follow-up",
    body: "Replies to inbound form leads in 180 seconds in your exact authentic voice, followed by calibrated nudges until the discovery meeting is booked.",
    highlight: "Sub-3-min response time",
    icon: GitCommit,
    stats: "+34% meeting booking rate",
  },
  {
    id: "invoice-follow-up",
    num: "03",
    shape: "LOOP",
    href: "/systems/invoice-follow-up",
    title: "Invoice follow-up",
    body: "Sends polite, graduated payment reminders that halt the instant funds clear in Stripe or QuickBooks. Zero awkward conversations with clients.",
    highlight: "Autonomous aging recovery",
    icon: RotateCw,
    stats: "18 days faster AR collection",
  },
];

export function ThreeSystems() {
  const reduce = useReducedMotion();
  return (
    <section id="systems" className="mx-auto max-w-[75rem] scroll-mt-24 px-6 pt-24 pb-32">
      <FadeUp className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <div className="font-mono text-xs font-semibold tracking-[0.08em] text-lane uppercase">
            THREE SYSTEMS ARCHITECTURE
          </div>
          <h2 className="mt-3 max-w-[47.5rem] text-[clamp(2.125rem,4.4vw,3.75rem)] leading-[1.05] font-semibold tracking-[-0.045em] text-ink">
            Client reporting, lead follow-up, and invoice follow-up.
          </h2>
          <p className="mt-3 max-w-xl text-base text-muted">
            Three dedicated operational engines built specifically for agencies and service businesses.
            Each one runs continuously and waits on your approval.
          </p>
        </div>

        <Link
          href="/systems"
          className="inline-flex items-center gap-2 rounded-[0.5rem] border border-line bg-white px-4 py-2.5 text-xs font-semibold text-ink shadow-sm transition hover:border-lane/30 hover:text-lane shrink-0"
        >
          <span>Compare all 3 systems</span>
          <ArrowRight size={13} />
        </Link>
      </FadeUp>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {SYSTEMS.map((s, idx) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.id}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -12% 0px" }}
              whileHover={{ y: -5, transition: { duration: 0.25, ease: EASE_OUT } }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: EASE_OUT }}
            >
              <Link
                href={s.href}
                className="group flex h-full flex-col justify-between rounded-[1.375rem] border border-line bg-white p-7 shadow-[0_0.75rem_2rem_rgba(20,20,40,0.04)] transition-[border-color,box-shadow] duration-300 hover:border-lane/30 hover:shadow-[0_1.25rem_2.8125rem_rgba(20,20,40,0.08)]"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-line/60 pb-4">
                    <div className="font-mono text-xs font-semibold tracking-[0.06em] text-lane">
                      {s.num} · {s.shape}
                    </div>
                    <span className="flex size-8 items-center justify-center rounded-[0.5rem] bg-surface text-ink transition-colors group-hover:bg-lane/10 group-hover:text-lane">
                      <Icon size={16} />
                    </span>
                  </div>

                  <h3 className="mt-5 text-2xl font-semibold tracking-[-0.025em] text-ink group-hover:text-lane">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{s.body}</p>
                </div>

                <div className="mt-8 border-t border-line/60 pt-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-[0.6875rem] text-emerald-600 font-medium">
                      {s.stats}
                    </span>
                    <span className="inline-flex items-center gap-1 font-medium text-ink group-hover:text-lane">
                      <span>Explore</span>
                      <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
