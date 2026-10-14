import { Fragment } from "react";

/** Renders "Plain text *italic part*" with the starred part in <em>. A "\n" becomes a line break. */
export function Emph({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*[^*]+\*)/).map((part, i) => {
        const inner = part.startsWith("*") && part.endsWith("*") ? part.slice(1, -1) : null;
        const lines = (inner ?? part).split("\n");
        const content = lines.map((l, j) => (
          <Fragment key={j}>
            {j > 0 && <br />}
            {l}
          </Fragment>
        ));
        return inner !== null ? <em key={i}>{content}</em> : <Fragment key={i}>{content}</Fragment>;
      })}
    </>
  );
}
