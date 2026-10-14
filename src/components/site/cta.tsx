import Link from "next/link";
import { whatsappHref } from "@/lib/contact";
import { cn } from "@/lib/utils";
import { Arrow } from "./icons";

export function CtaPair({
  className,
  assessmentHref = "/assessment",
  secondary = "assessment",
}: {
  className?: string;
  assessmentHref?: string;
  secondary?: "assessment" | "how";
}) {
  return (
    <div className={cn("pair", className)}>
      <Link href="/book" className="btn btn-primary">
        Book a discovery call <Arrow />
      </Link>
      {secondary === "how" ? (
        <Link href="/how-it-works" className="btn btn-outline">
          See how it works
        </Link>
      ) : (
        <Link href={assessmentHref} className="btn btn-outline">
          Request an assessment
        </Link>
      )}
    </div>
  );
}

export function ClosingCta({ assessmentHref }: { assessmentHref?: string }) {
  const wa = whatsappHref();
  return (
    <section className="sec bg-fog" aria-labelledby="closing-h">
      <div className="wrap rv flex flex-col items-center gap-6 text-center">
        <h2 id="closing-h" className="text-[clamp(44px,4vw+26px,84px)] leading-[1.04]">
          Lane prepares.
          <br />
          <em>You approve.</em>
        </h2>
        <p className="lead">Tell us about one workflow that eats your week. We&apos;ll tell you honestly whether it&apos;s a fit.</p>
        <CtaPair className="justify-center" assessmentHref={assessmentHref} />
        {wa && (
          <p className="text-[15px] text-muted">
            Prefer to message?{" "}
            <a href={wa} target="_blank" rel="noopener noreferrer" className="text-ink">
              Chat with us on WhatsApp
            </a>
          </p>
        )}
      </div>
    </section>
  );
}
