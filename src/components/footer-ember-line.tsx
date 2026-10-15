import { InView } from "@/components/motion/InView";
import "./footer-ember-line.css";

/** The footer's divider: a full-width red-orange line that draws itself once it scrolls into view. */
export function FooterEmberLine() {
  return (
    <InView aria-hidden className="ember-line relative left-1/2 w-screen -translate-x-1/2">
      <span className="ember-line__bar" />
      <span className="ember-line__head" />
    </InView>
  );
}
