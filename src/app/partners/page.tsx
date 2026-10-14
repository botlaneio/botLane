"use client";

import { useState } from "react";
import { submitPartnerApplication } from "@/components/partners/actions";
import {
  Handshake,
  ArrowRight,
  CheckCircle2,
  DollarSign,
  Briefcase,
  Layers,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const PARTNER_BENEFITS = [
  {
    icon: DollarSign,
    title: "20% Lifetime Recurring Share",
    description:
      "Earn a predictable 20% recurring monthly revenue share on every client you introduce to BotLane, for as long as they remain on active retainer.",
  },
  {
    icon: Briefcase,
    title: "White-Label & Co-Branded",
    description:
      "Deliver automated client reports under your agency&apos;s bespoke styling, logo, and color palette. Lane does the heavy lifting while you take the credit.",
  },
  {
    icon: Layers,
    title: "Agency Portfolio Sandbox",
    description:
      "Get a multi-tenant partner portal to monitor and manage all your client instances and approval queues from a single pane of glass.",
  },
  {
    icon: Sparkles,
    title: "Dedicated Solutions Engineer",
    description:
      "Direct Slack channel with BotLane core engineering to assist in client onboarding, custom CRM mapping, and API integrations.",
  },
];

export function PartnerApplicationForm({ onSubmitted }: { onSubmitted?: () => void }) {
  const [partnerType, setPartnerType] = useState("Agency / Fractional CMO");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [clientCount, setClientCount] = useState("10-25 clients");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");

  // Sends the application to the partner Google Sheet (see components/partners/actions.ts).
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || isSending) return;
    setIsSending(true);
    setError("");
    const data = new FormData();
    data.set("name", name);
    data.set("agency", company);
    data.set("email", email);
    data.set("clients", clientCount);
    data.set("message", `Partner track: ${partnerType}`);
    const result = await submitPartnerApplication({ status: "idle" }, data);
    setIsSending(false);
    if (result.status === "ok") {
      setIsSuccess(true);
      onSubmitted?.();
    } else {
      setError(Object.values(result.fieldErrors ?? {})[0] ?? result.message ?? "Something went wrong. Please try again.");
    }
  };

  if (isSuccess) {
    return (
      <div className="rounded-[1.375rem] border border-emerald-500/20 bg-emerald-500/5 p-8 text-center" suppressHydrationWarning>
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
          <CheckCircle2 size={24} />
        </div>
        <h3 className="mt-4 text-xl font-bold text-ink">Partner Application Received</h3>
        <p className="mt-2 text-xs text-muted max-w-md mx-auto">
          Thanks <strong className="text-ink">{name}</strong>. Our partnerships team will review {company}&apos;s application
          and email you at <strong className="text-ink">{email}</strong> within 1 business day with your partner dashboard credentials.
        </p>
        <button
          type="button"
          onClick={() => setIsSuccess(false)}
          className="mt-6 text-xs text-lane hover:underline font-mono"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" suppressHydrationWarning autoComplete="off">
      <div suppressHydrationWarning>
        <label htmlFor="partner-track" className="text-xs font-medium text-ink">Partner Track</label>
        <select
          id="partner-track"
          name="partner-track"
          value={partnerType}
          onChange={(e) => setPartnerType(e.target.value)}
          suppressHydrationWarning
          className="mt-1.5 w-full rounded-[0.5rem] border border-line bg-white px-3 py-2 text-xs text-ink focus:outline-none focus:border-lane"
        >
          <option value="Agency / Fractional CMO">Agency / Fractional CMO (Referral & Reseller)</option>
          <option value="RevOps & IT Consultant">RevOps & IT Consultant (Systems Integrator)</option>
          <option value="Accounting / CPA Firm">Accounting / CPA Firm (Invoice Follow-Up Reseller)</option>
          <option value="Venture / Incubator">Venture / Incubator (Portfolio Advantage)</option>
        </select>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div suppressHydrationWarning>
          <label htmlFor="partner-name" className="text-xs font-medium text-ink">Your Full Name</label>
          <input
            id="partner-name"
            name="partner-name"
            type="text"
            required
            placeholder="Jordan Hayes"
            value={name}
            onChange={(e) => setName(e.target.value)}
            suppressHydrationWarning
            autoComplete="off"
            className="mt-1.5 w-full rounded-[0.5rem] border border-line bg-white px-3 py-2 text-xs text-ink placeholder:text-muted/60 focus:outline-none focus:border-lane"
          />
        </div>
        <div suppressHydrationWarning>
          <label htmlFor="partner-email" className="text-xs font-medium text-ink">Work Email</label>
          <input
            id="partner-email"
            name="partner-email"
            type="email"
            required
            placeholder="jordan@agencygroup.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            suppressHydrationWarning
            autoComplete="off"
            className="mt-1.5 w-full rounded-[0.5rem] border border-line bg-white px-3 py-2 text-xs text-ink placeholder:text-muted/60 focus:outline-none focus:border-lane"
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div suppressHydrationWarning>
          <label htmlFor="partner-company" className="text-xs font-medium text-ink">Company / Agency Name</label>
          <input
            id="partner-company"
            name="partner-company"
            type="text"
            required
            placeholder="Hayes Digital"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            suppressHydrationWarning
            autoComplete="off"
            className="mt-1.5 w-full rounded-[0.5rem] border border-line bg-white px-3 py-2 text-xs text-ink placeholder:text-muted/60 focus:outline-none focus:border-lane"
          />
        </div>
        <div suppressHydrationWarning>
          <label htmlFor="partner-clients" className="text-xs font-medium text-ink">Active Client Roster Size</label>
          <select
            id="partner-clients"
            name="partner-clients"
            value={clientCount}
            onChange={(e) => setClientCount(e.target.value)}
            suppressHydrationWarning
            className="mt-1.5 w-full rounded-[0.5rem] border border-line bg-white px-3 py-2 text-xs text-ink focus:outline-none focus:border-lane"
          >
            <option value="5-15 clients">5 – 15 clients</option>
            <option value="16-35 clients">16 – 35 clients</option>
            <option value="36-70 clients">36 – 70 clients</option>
            <option value="70+ clients">70+ clients</option>
          </select>
        </div>
      </div>

      {error && (
        <p role="alert" className="text-xs text-lane-ink">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSending}
        className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-[0.5rem] bg-btn text-xs font-semibold text-white shadow-sm transition hover:bg-btn-hover disabled:opacity-60"
      >
        <span>{isSending ? "Sending…" : "Apply for Partner Programme"}</span>
        <ArrowRight size={13} />
      </button>
    </form>
  );
}

export default function PartnersPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-bg">
        {/* Hero Section */}
        <section className="relative mx-auto max-w-[75rem] px-6 pt-16 pb-20 text-center sm:pt-24 sm:pb-28">
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-lane">
            <Handshake size={14} />
            <span>BotLane Partner Programme</span>
          </div>

          <h1 className="mt-5 text-[clamp(2.25rem,5vw,4.25rem)] font-bold leading-[1] tracking-[-0.04em] text-ink">
            Scale your clients&apos; operations. <br />
            Earn 20% recurring revenue share.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Join the agency network offering autonomous client reporting, lead conversion, and invoice recovery.
            Eliminate operational grunt work for your clients while unlocking a high-margin recurring income stream.
          </p>
        </section>

        {/* Benefits Grid */}
        <section className="mx-auto max-w-[75rem] px-6 pb-20">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PARTNER_BENEFITS.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className="rounded-[1.25rem] border border-line bg-white p-6 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex size-10 items-center justify-center rounded-[0.625rem] bg-surface text-ink">
                      <Icon size={19} />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-ink">{b.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted">{b.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Partner Application & Details */}
        <section className="mx-auto max-w-[68.75rem] px-6 py-16 border-t border-line">
          <div className="rounded-[1.75rem] border border-line bg-white p-8 sm:p-12 shadow-[0_1rem_3.125rem_rgba(20,20,40,0.05)]">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-6 space-y-4">
                <div className="font-mono text-xs font-semibold uppercase tracking-wider text-lane">
                  Partner Tracks
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-ink">
                  Built for modern agency leaders.
                </h2>
                <p className="text-sm leading-relaxed text-muted">
                  Whether you are an independent fractional CMO or manage a 50-person performance agency,
                  BotLane integrates seamlessly into your existing service offerings without requiring you to hire more junior account managers.
                </p>

                <div className="space-y-3 pt-2 text-xs text-ink-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                    <span>Monthly payout via Stripe Connect direct to your agency bank account</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                    <span>Co-branded onboarding collateral and client pitch deck templates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                    <span>No minimum commitment or exclusivity clauses</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 rounded-[1.25rem] border border-line bg-surface/40 p-6 sm:p-8">
                <div className="font-mono text-xs font-semibold uppercase tracking-wider text-muted mb-4">
                  Register Your Agency
                </div>
                <PartnerApplicationForm />
              </div>
            </div>
          </div>
        </section>

        {/* Partner FAQ */}
        <section className="mx-auto max-w-[60rem] px-6 py-20 border-t border-line">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-ink">
              Partner Programme FAQ
            </h2>
          </div>

          <div className="mt-10 space-y-3">
            {[
              {
                q: "When are partner commission payouts distributed?",
                a: "Commissions are calculated at the end of each billing cycle and deposited automatically via Stripe Connect on the 15th of each month.",
              },
              {
                q: "Can we bundle Lane into our existing agency retainers?",
                a: "Yes. Many partner agencies charge their clients a premium management fee (e.g. $1,500/mo) and pay BotLane's partner discounted wholesale rate, keeping the margin.",
              },
              {
                q: "Do you offer technical support for our clients?",
                a: "We provide Tier-2 engineering support directly to your agency team via your dedicated Slack connect channel. You remain the primary relationship owner with your clients.",
              },
            ].map((faq, idx) => (
              <div
                key={faq.q}
                className="rounded-[0.875rem] border border-line bg-white p-5 cursor-pointer"
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-ink">{faq.q}</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${activeFaq === idx ? "rotate-180" : ""}`}
                  />
                </div>
                {activeFaq === idx && (
                  <p className="mt-3 text-xs leading-relaxed text-muted">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
