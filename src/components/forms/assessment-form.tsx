"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import { submitAssessment } from "@/app/(focus)/assessment/actions";
import { solutions } from "@/content/solutions";
import { PROCESS_MAX, ROLES, SIZES, type FormState } from "@/lib/inquiry";
import { cn } from "@/lib/utils";

const ATTR_KEY = "bl-attribution";
const ATTR_FIELDS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
const HIDDEN = [...ATTR_FIELDS, "landing", "referrer"] as const;

const input =
  "w-full rounded-[10px] border border-[#dcdbe0] bg-white px-3.5 py-3 text-[16px] outline-none transition-colors focus:border-ink aria-[invalid=true]:border-danger";

function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="text-[15px] font-medium">
        {label}
      </label>
      {children}
      {hint}
      {error && (
        <p id={`${id}-err`} className="text-[14px] text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

/** Fills the hidden spam-timer and attribution fields once the page is interactive. UTM tags from the
 *  first page of the visit are kept in sessionStorage so the request carries its source. */
function useHiddenFields(form: React.RefObject<HTMLFormElement | null>) {
  useEffect(() => {
    const f = form.current;
    if (!f) return;
    const set = (name: string, value: string) => {
      const el = f.elements.namedItem(name);
      if (el instanceof HTMLInputElement) el.value = value;
    };
    set("t", String(Date.now()));
    try {
      const params = new URLSearchParams(window.location.search);
      const fresh = Object.fromEntries(ATTR_FIELDS.map((k) => [k, params.get(k) ?? ""]).filter(([, v]) => v));
      const saved = JSON.parse(sessionStorage.getItem(ATTR_KEY) ?? "{}");
      const merged: Record<string, string> = { landing: window.location.pathname, referrer: document.referrer, ...saved, ...fresh };
      sessionStorage.setItem(ATTR_KEY, JSON.stringify(merged));
      for (const k of HIDDEN) if (merged[k]) set(k, merged[k]);
    } catch {
      /* storage blocked: send nothing extra */
    }
  }, [form]);
}

export function AssessmentForm({ workflow, process }: { workflow: string; process: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(submitAssessment, { status: "idle" });
  const [count, setCount] = useState(process.length);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  useHiddenFields(formRef);

  useEffect(() => {
    if (state.status !== "idle") statusRef.current?.focus();
  }, [state]);

  if (state.status === "ok") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="grid content-start gap-5 rounded-[24px] bg-white p-[clamp(24px,4vw,48px)] shadow-float outline-none"
      >
        <span className="chip chip-ok w-fit">Request received</span>
        <h2 className="text-[clamp(30px,2vw+20px,44px)]">
          Thanks{state.firstName ? `, ${state.firstName}` : ""}. <em>We&apos;re on it.</em>
        </h2>
        <p className="text-muted">
          We&apos;ll review what you sent and reply by email. If you&apos;d like to talk it through sooner, book a call.
        </p>
        <div className="pair">
          <Link href="/book" className="btn btn-primary">
            Book a discovery call
          </Link>
          <Link href="/" className="btn btn-ghost">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const v = state.values ?? {};
  const e = state.fieldErrors ?? {};
  const err = (k: keyof NonNullable<FormState["fieldErrors"]>) =>
    e[k] ? { "aria-invalid": true as const, "aria-describedby": `${k}-err` } : {};

  return (
    <form
      ref={formRef}
      action={action}
      className="grid content-start gap-6 rounded-[24px] bg-white p-[clamp(24px,4vw,48px)] shadow-float"
      aria-describedby={state.message ? "form-status" : undefined}
      noValidate
    >
      <div ref={statusRef} tabIndex={-1} className="outline-none">
        {state.status === "error" && state.message && (
          <div id="form-status" role="alert" className="rounded-[12px] bg-[#fbe7e5] px-4 py-3 text-[15px] text-[#7d2018]">
            {state.message}
            {!state.fieldErrors && " If it keeps failing, use one of the other contact options on this page."}
          </div>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Full name" error={e.name}>
          <input id="name" name="name" autoComplete="name" required maxLength={120} defaultValue={v.name} className={input} {...err("name")} />
        </Field>
        <Field id="email" label="Work email" error={e.email}>
          <input id="email" name="email" type="email" autoComplete="email" required maxLength={200} defaultValue={v.email} className={input} {...err("email")} />
        </Field>
        <Field id="company" label="Company" error={e.company}>
          <input id="company" name="company" autoComplete="organization" required maxLength={160} defaultValue={v.company} className={input} {...err("company")} />
        </Field>
        <Field id="role" label="Your role" error={e.role}>
          <select id="role" name="role" required defaultValue={v.role ?? ""} className={input} {...err("role")}>
            <option value="" disabled>
              Choose one
            </option>
            {ROLES.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </Field>
        <Field id="size" label="Company size" error={e.size}>
          <select id="size" name="size" required defaultValue={v.size ?? ""} className={input} {...err("size")}>
            <option value="" disabled>
              Choose one
            </option>
            {SIZES.map((s) => (
              <option key={s} value={s}>
                {s} people
              </option>
            ))}
          </select>
        </Field>
      </div>

      <fieldset className="grid gap-2.5" aria-describedby={e.workflow ? "workflow-err" : undefined}>
        <legend className="mb-2 text-[15px] font-medium">Which workflow?</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {[...solutions.map((s) => ({ value: s.slug, label: s.name })), { value: "other", label: "Something else" }].map((o) => (
            <label
              key={o.value}
              className="flex cursor-pointer items-center gap-3 rounded-[10px] border border-[#dcdbe0] px-3.5 py-3 text-[15.5px] has-[:checked]:border-ink has-[:checked]:bg-fog"
            >
              <input type="radio" name="workflow" value={o.value} defaultChecked={(v.workflow ?? workflow) === o.value} className="accent-ink" required />
              {o.label}
            </label>
          ))}
        </div>
        {e.workflow && (
          <p id="workflow-err" className="text-[14px] text-danger">
            {e.workflow}
          </p>
        )}
      </fieldset>

      <Field
        id="process"
        label="Describe the process you'd like to hand off (optional)"
        error={e.process}
        hint={
          <p className={cn("text-right text-[13px] text-subtle", count > PROCESS_MAX && "text-danger")} aria-live="polite">
            {count} / {PROCESS_MAX}
          </p>
        }
      >
        <textarea
          id="process"
          name="process"
          rows={5}
          maxLength={PROCESS_MAX}
          defaultValue={v.process ?? process}
          onChange={(ev) => setCount(ev.target.value.length)}
          placeholder="For example: every Friday we copy numbers from three tools into a report for each client."
          className={cn(input, "resize-y")}
          {...err("process")}
        />
      </Field>

      <div className="grid gap-1.5">
        <label className="flex items-start gap-3 text-[15px] text-muted">
          <input
            type="checkbox"
            name="consent"
            required
            defaultChecked={v.consent === "on"}
            className="mt-1 size-4 accent-ink"
            {...err("consent")}
          />
          <span>
            BotLane may contact me about this request. See our{" "}
            <Link href="/legal/privacy" className="text-ink">
              privacy policy
            </Link>
            .
          </span>
        </label>
        {e.consent && (
          <p id="consent-err" className="text-[14px] text-danger">
            {e.consent}
          </p>
        )}
      </div>

      {/* spam checks and attribution */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Leave this empty <input name="company_url" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <input type="hidden" name="t" defaultValue="" />
      {HIDDEN.map((k) => (
        <input key={k} type="hidden" name={k} defaultValue="" />
      ))}

      <button type="submit" className="btn btn-primary w-full sm:w-fit" disabled={pending}>
        {pending ? "Sending…" : "Request an assessment"}
      </button>
    </form>
  );
}
