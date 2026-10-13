"use client";

import { useEffect, useState } from "react";
import { LaneMark, type LaneState } from "./lane-mark";

/** The story the header mark plays: ready, working, awaiting your OK, approved, and round again. */
const STORY: [LaneState, number][] = [
  ["ready", 1600],
  ["working", 3600],
  ["waiting", 2600],
  ["done", 2200],
];

/**
 * LaneMark that loops through Lane's states. Starts (and stays, for reduced-motion
 * users) on "working", the resting brand look, so server and client render the same.
 */
export function LaneMarkCycle(props: Omit<React.ComponentProps<typeof LaneMark>, "state">) {
  const [state, setState] = useState<LaneState>("working");

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    let i = 1; // "working" is already showing
    let timer: ReturnType<typeof setTimeout>;
    const next = () => {
      const [s, ms] = STORY[i % STORY.length];
      setState(s);
      i++;
      timer = setTimeout(next, ms);
    };
    timer = setTimeout(next, STORY[1][1]);
    return () => clearTimeout(timer);
  }, []);

  return <LaneMark {...props} state={state} />;
}
