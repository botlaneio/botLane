"use client";

import { useState } from "react";
import { HalftoneMark, type HalftoneMarkState } from "@/components/halftone-mark";

const STATES: HalftoneMarkState[] = ["rest", "active", "thinking"];

/** Internal page for trying the mark's animations. Not linked from the site. */
export function MarkPlayground() {
  const [run, setRun] = useState(0);
  const [state, setState] = useState<HalftoneMarkState>("rest");
  const [pace, setPace] = useState(1);
  const [dark, setDark] = useState(false);
  const [mono, setMono] = useState(false);

  const button = (on: boolean) =>
    `h-10 rounded-[0.625rem] border px-4 text-sm font-medium transition ${
      on ? "border-ink bg-ink text-white" : "border-line bg-white text-ink hover:border-ink/40"
    }`;

  return (
    <main
      className={`min-h-screen px-6 py-12 transition-colors ${dark ? "bg-[#101114] text-white" : "bg-[#F8F8F6] text-ink"}`}
    >
      <div className="mx-auto flex max-w-[60rem] flex-col gap-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold tracking-[-0.02em]">Mark playground</h1>
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" className={button(false)} onClick={() => setRun((n) => n + 1)}>
              Replay intro
            </button>
            {STATES.map((s) => (
              <button key={s} type="button" className={button(state === s)} onClick={() => setState(s)}>
                {s[0].toUpperCase() + s.slice(1)}
              </button>
            ))}
            <button type="button" className={button(mono)} onClick={() => setMono((m) => !m)}>
              Mono
            </button>
            <button type="button" className={button(dark)} onClick={() => setDark((d) => !d)}>
              Dark
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center py-6">
          <HalftoneMark key={run} size={420} tone={mono ? (dark ? "light" : "dark") : "color"} intro state={state} pace={pace} title="Botlane" />
        </div>

        <label className="flex items-center gap-4 text-sm">
          <span className="w-20">Pace {pace.toFixed(1)}×</span>
          <input
            type="range"
            min={0.4}
            max={2.5}
            step={0.1}
            value={pace}
            onChange={(e) => setPace(Number(e.target.value))}
            className="flex-1"
          />
        </label>

        <div className="flex flex-wrap items-end justify-between gap-6 border-t border-current/10 pt-8">
          {[128, 64, 48, 32, 24, 16].map((s) => (
            <div key={`${s}-${run}`} className="flex flex-col items-center gap-2">
              <HalftoneMark size={s} tone={mono ? (dark ? "light" : "dark") : "color"} intro state={state} pace={pace} />
              <span className="font-mono text-xs opacity-60">{s}px</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
