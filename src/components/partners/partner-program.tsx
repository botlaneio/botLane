import { LaneMark } from "../lane-mark";
import { PartnerForm } from "./partner-form";

const STEPS = [
  { n: "01", title: "Introduce a client", body: "Send us a business drowning in reporting or follow-ups." },
  { n: "02", title: "We onboard them", body: "We connect their tools and Lane starts work. You stay their go-to." },
  { n: "03", title: "You get paid monthly", body: "15% of their retainer lands with you every month for a year." },
];

const FOR = ["Marketing agencies", "Bookkeepers", "Consultants", "Fractional ops"];

/** The partner programme pitch + application form. Used in the modal and on /partners. */
export function PartnerProgram({ titleId = "partner-title" }: { titleId?: string }) {
  return (
    <div className="grid overflow-hidden bg-white md:grid-cols-[1.05fr_1fr] md:rounded-[28px] md:shadow-[0_40px_100px_rgba(10,10,20,0.35)]">
      {/* the offer — dark panel */}
      <div className="relative overflow-hidden bg-[#111113] px-7 pt-8 pb-9 text-white md:px-9 md:pt-9">
        <div aria-hidden="true" className="pointer-events-none absolute -top-32 -right-24 size-80 rounded-full bg-[radial-gradient(circle,rgba(224,49,43,0.35),transparent_65%)]" />
        <div className="relative flex items-center gap-2.5">
          <LaneMark size={26} />
          <span className="font-mono text-[11px] tracking-[0.14em] text-white/60 uppercase">Partner programme</span>
        </div>

        <h2 id={titleId} className="relative mt-7 text-[clamp(28px,4vw,36px)] leading-[1.05] font-semibold tracking-[-0.035em] text-balance">
          Refer clients. Earn while Lane works.
        </h2>

        <div className="relative mt-7 flex items-end gap-4">
          <span className="text-[88px] leading-[0.8] font-semibold tracking-[-0.06em] text-lane md:text-[104px]">15%</span>
          <span className="pb-1 text-[15px] leading-snug text-white/75">
            of the monthly retainer,
            <br />
            for the first 12 months,
            <br />
            for every client you refer.
          </span>
        </div>

        <ol className="relative mt-9 flex flex-col gap-5">
          {STEPS.map((s) => (
            <li key={s.n} className="flex gap-4">
              <span className="font-mono text-xs leading-6 text-lane">{s.n}</span>
              <div>
                <div className="text-[15px] font-semibold">{s.title}</div>
                <div className="mt-0.5 text-sm leading-relaxed text-white/60">{s.body}</div>
              </div>
            </li>
          ))}
        </ol>

        <div className="relative mt-9 border-t border-white/10 pt-6">
          <div className="font-mono text-[11px] tracking-[0.12em] text-white/50 uppercase">Built for</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {FOR.map((f) => (
              <span key={f} className="rounded-full border border-white/15 px-3 py-1 text-[13px] text-white/80">{f}</span>
            ))}
          </div>
        </div>
      </div>

      {/* the application */}
      <div className="px-7 pt-8 pb-8 md:px-9 md:pt-9">
        <div className="font-mono text-[11px] tracking-[0.12em] text-lane uppercase">Apply</div>
        <h3 className="mt-2 text-2xl font-semibold tracking-[-0.02em]">Become a partner</h3>
        <p className="mt-1.5 mb-6 text-[15px] leading-relaxed text-muted">Two minutes. We reply within two working days.</p>
        <PartnerForm />
      </div>
    </div>
  );
}
