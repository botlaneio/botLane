const SYSTEMS = [
  {
    id: "client-reporting",
    num: "01",
    shape: "Funnel",
    title: "Client reporting",
    body: "Lane pulls your ad, analytics and CRM numbers into one weekly report per client. You approve it, and it goes out on time.",
  },
  {
    id: "lead-follow-up",
    num: "02",
    shape: "Line",
    title: "Lead follow-up",
    body: "Every new enquiry gets a reply in your tone, then a nudge and a check-in, until the meeting is booked.",
  },
  {
    id: "invoice-follow-up",
    num: "03",
    shape: "Loop",
    title: "Invoice follow-up",
    body: "Overdue invoices get reminders that grow a little firmer each time, until the payment lands in your bank feed.",
  },
];

export function ThreeSystems() {
  return (
    <section id="systems" className="mx-auto max-w-[1200px] px-6 pt-30 pb-36">
      <div className="font-mono text-xs tracking-[0.08em] text-lane">THREE SYSTEMS</div>
      <h2 className="mt-2.5 max-w-[760px] text-[clamp(36px,4.6vw,64px)] leading-none font-semibold tracking-[-0.045em]">
        Client reporting, lead follow-up and invoice follow-up.
      </h2>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {SYSTEMS.map((s) => (
          <article
            key={s.id}
            id={s.id}
            className="scroll-mt-24 rounded-[20px] border border-line bg-white p-7 shadow-[0_18px_40px_rgba(20,20,40,0.06)]"
          >
            <div className="font-mono text-xs tracking-[0.06em] text-lane">
              {s.num} · {s.shape.toUpperCase()}
            </div>
            <h3 className="mt-2 text-2xl font-semibold tracking-[-0.02em]">{s.title}</h3>
            <p className="mt-3 text-base leading-relaxed text-muted">{s.body}</p>
            <div className="mt-6 flex items-center gap-2 text-sm font-medium text-ink-2">
              <span className="size-[7px] rounded-full bg-lane" />
              You approve every send
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
