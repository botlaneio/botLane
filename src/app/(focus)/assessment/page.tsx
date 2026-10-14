import type { Metadata } from "next";
import { AssessmentForm } from "@/components/forms/assessment-form";
import { ContactAlternatives } from "@/components/forms/contact-alternatives";
import { WORKFLOWS } from "@/lib/inquiry";

export const metadata: Metadata = {
  title: "Request a workflow assessment",
  description: "Tell us about one workflow. We'll look at how it runs today and send you a written recommendation.",
};

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function AssessmentPage({ searchParams }: Props) {
  const q = await searchParams;
  const workflow = typeof q.workflow === "string" && WORKFLOWS.includes(q.workflow) ? q.workflow : "";
  const process = typeof q.process === "string" ? q.process.slice(0, 1000) : "";

  return (
    <div className="wrap page-top grid gap-14 pb-[clamp(88px,10vw,160px)] min-[1000px]:grid-cols-[0.85fr_1.15fr] min-[1000px]:gap-20">
      <div className="min-[1000px]:sticky min-[1000px]:top-32 min-[1000px]:self-start">
        <p className="eyebrow">Workflow assessment</p>
        <h1 className="mt-5 text-[clamp(40px,3vw+22px,68px)]">
          Request a workflow <em>assessment.</em>
        </h1>
        <p className="lead mt-6">
          Tell us about one process that takes up your team&apos;s time. We&apos;ll look at how it runs today and send you a
          written recommendation, including whether we think it&apos;s a good fit.
        </p>
        <ul className="mt-8 grid gap-3 text-[16px]">
          {[
            "We review your answers and may ask a few follow-up questions",
            "You get a written recommendation by email",
            "If it's a fit, a clear proposal follows. No obligation",
          ].map((x) => (
            <li key={x} className="flex gap-3">
              <span aria-hidden="true" className="text-terra">
                ✓
              </span>
              {x}
            </li>
          ))}
        </ul>
        <ContactAlternatives className="mt-10" />
      </div>
      <AssessmentForm workflow={workflow} process={process} />
    </div>
  );
}
