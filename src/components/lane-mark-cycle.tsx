import type { SVGProps } from "react";
import { LaneMark } from "./lane-mark";

export interface LaneMarkCycleProps extends SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

/**
 * Animated Lane mark where the eye cycles smoothly left, right, and center,
 * pulsing with Lane's signature red glow.
 */
export function LaneMarkCycle({ size = 26, className, ...props }: LaneMarkCycleProps) {
  return (
    <LaneMark
      size={size}
      animated={true}
      className={className}
      {...props}
    />
  );
}
