"use client";

import { useActionState } from "react";
import { submitPartnerApplication, type PartnerFormState } from "./actions";

const initial: PartnerFormState = { status: "idle" };
const CLIENT_RANGES = ["1–5", "6–20", "21–50", "50+"];

const field =
  "h-11 w-full rounded-lg border border-[#e0e0e4] bg-white px-3.5 text-[15px] text-ink placeholder:text-faint focus:border-ink focus:outline-none";
const labelCls = "mb-1.5 block text-[13px] font-medium text-ink-2";

export function PartnerForm() {
  const [state, action, pending] = useActionState(submitPartnerApplication, initial);
  const err = state.fieldErrors ?? {};

  if (state.status === "ok") {
    return (
      <div role="status" className="flex h-full flex-col items-start justify-center gap-3 py-6">
        <span className="flex size-11 items-center justify-center rounded-full bg-ok shadow-[0_6px_16px_rgba(26,127,55,0.3)]">
          <svg width="20" height="20" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M4 8.2l2.6 2.6L12 5.4" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3 className="text-2xl font-semibold tracking-[-0.02em]">Application received.</h3>
        <p className="max-w-[340px] text-[15px] leading-relaxed text-muted">
          Thanks. We’ll be in touch within two working days to set up a quick intro call.
        </p>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="pp-name" className={labelCls}>Your name</label>
          <input id="pp-name" name="name" autoComplete="name" required className={field} aria-invalid={!!err.name} aria-describedby={err.name ? "pp-name-err" : undefined} />
          {err.name && <p id="pp-name-err" className="mt-1 text-xs text-lane-ink">{err.name}</p>}
        </div>
        <div>
          <label htmlFor="pp-agency" className={labelCls}>Agency or business</label>
          <input id="pp-agency" name="agency" autoComplete="organization" required className={field} aria-invalid={!!err.agency} aria-describedby={err.agency ? "pp-agency-err" : undefined} />
          {err.agency && <p id="pp-agency-err" className="mt-1 text-xs text-lane-ink">{err.agency}</p>}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="pp-email" className={labelCls}>Work email</label>
          <input id="pp-email" name="email" type="email" autoComplete="email" required className={field} aria-invalid={!!err.email} aria-describedby={err.email ? "pp-email-err" : undefined} />
          {err.email && <p id="pp-email-err" className="mt-1 text-xs text-lane-ink">{err.email}</p>}
        </div>
        <div>
          <label htmlFor="pp-website" className={labelCls}>Website <span className="font-normal text-faint">(optional)</span></label>
          <input id="pp-website" name="website" type="url" inputMode="url" autoComplete="url" placeholder="https://" className={field} />
        </div>
      </div>
      <fieldset>
        <legend className={labelCls}>How many clients do you work with?</legend>
        <div className="grid grid-cols-4 gap-2">
          {CLIENT_RANGES.map((r) => (
            <label key={r} className="relative">
              <input type="radio" name="clients" value={r} className="peer sr-only" required />
              <span className="flex h-11 cursor-pointer items-center justify-center rounded-lg border border-[#e0e0e4] bg-white text-sm font-medium peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-lane">
                {r}
              </span>
            </label>
          ))}
        </div>
        {err.clients && <p className="mt-1 text-xs text-lane-ink">{err.clients}</p>}
      </fieldset>
      <div>
        <label htmlFor="pp-message" className={labelCls}>Anything we should know? <span className="font-normal text-faint">(optional)</span></label>
        <textarea id="pp-message" name="message" rows={3} className={`${field} h-auto resize-none py-2.5`} />
      </div>
      {/* honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>Company URL<input name="company_url" tabIndex={-1} autoComplete="off" /></label>
      </div>

      {state.status === "error" && state.message && (
        <p role="alert" className="rounded-lg bg-[#fdeceb] px-3.5 py-2.5 text-sm text-lane-ink">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-1 h-12 rounded-lg bg-ink text-[15px] font-medium text-white shadow-[0_6px_14px_rgba(20,20,40,0.18)] hover:bg-black disabled:opacity-60"
      >
        {pending ? "Sending…" : "Apply to partner"}
      </button>
      <p className="text-xs leading-relaxed text-faint">
        We’ll only use these details to talk to you about the partner programme.
      </p>
    </form>
  );
}
