"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { SYSTEMS } from "@/content/systems";

const MotionLink = motion.create(Link);

export function ThreeSystems() {
  return (
    <section id="systems" className="mx-auto max-w-[1200px] scroll-mt-24 px-6 pt-30 pb-24">
      <div className="font-mono text-xs tracking-[0.08em] text-lane">THREE SYSTEMS</div>
      <h2 className="mt-2.5 max-w-[760px] text-[clamp(36px,4.6vw,64px)] leading-none font-semibold tracking-[-0.045em]">
        Client reporting, lead follow-up and invoice follow-up.
      </h2>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {SYSTEMS.map((s) => (
          <MotionLink
            key={s.slug}
            id={s.slug}
            href={`/systems/${s.slug}`}
            whileHover={{ scale: 1.025, y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="group block scroll-mt-24 rounded-[20px] border border-line bg-white p-7 shadow-[0_18px_40px_rgba(20,20,40,0.06)] transition-colors hover:border-lane/20 hover:shadow-[0_24px_50px_rgba(20,20,40,0.10)]"
          >
            <div className="font-mono text-xs tracking-[0.06em] text-lane">
              {s.num} · {s.shape.toUpperCase()}
            </div>
            <h3 className="mt-2 text-2xl font-semibold tracking-[-0.02em]">{s.title}</h3>
            <p className="mt-3 text-base leading-relaxed text-muted">{s.summary}</p>
            <div className="mt-6 flex items-center justify-between text-sm font-medium text-ink-2">
              <span className="flex items-center gap-2">
                <span className="size-[7px] rounded-full bg-lane" />
                You approve every send
              </span>
              <span className="text-muted transition-colors group-hover:text-lane">Explore →</span>
            </div>
          </MotionLink>
        ))}
      </div>
    </section>
  );
}
