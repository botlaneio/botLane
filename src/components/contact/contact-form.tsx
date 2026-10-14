"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock } from "lucide-react";
import { Select } from "@/components/ui/select";
import { submitContactMessage, type ContactFormState } from "./actions";
import { CONTACT_INTERESTS } from "./interests";

const boxClass =
  "block rounded-[0.875rem] border border-line bg-white px-4 pt-3 pb-2.5 transition focus-within:border-ink/30 focus-within:ring-4 focus-within:ring-ink/[0.04]";
const labelClass = "text-sm font-medium text-ink";
const inputClass = "mt-1 block w-full bg-transparent text-[0.9375rem] text-ink placeholder:text-faint outline-none";

function FieldError({ text }: { text?: string }) {
  return text ? <p className="mt-1.5 px-1 text-xs text-lane">{text}</p> : null;
}

export function ContactForm() {
  const [state, action, pending] = useActionState<ContactFormState, FormData>(submitContactMessage, {
    status: "idle",
  });
  const errors = state.fieldErrors ?? {};
  const router = useRouter();

  // Once the message is in, move to the confirmation page.
  useEffect(() => {
    if (state.status === "ok") router.push("/company/contact/sent");
  }, [state.status, router]);

  return (
    <form action={action} className="space-y-3" noValidate>
      {/* Honeypot: hidden from people, filled by bots. */}
      <input type="text" name="company_url" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <div>
        <label className={boxClass}>
          <span className={labelClass}>Name</span>
          <input name="name" required autoComplete="name" placeholder="John Doe" className={inputClass} />
        </label>
        <FieldError text={errors.name} />
      </div>

      <div>
        <label className={boxClass}>
          <span className={labelClass}>Work email</span>
          <input name="email" type="email" required autoComplete="email" placeholder="john@acmecorp.com" className={inputClass} />
        </label>
        <FieldError text={errors.email} />
      </div>

      <div>
        <label className={boxClass}>
          <span className={labelClass}>Company</span>
          <input name="company" required autoComplete="organization" placeholder="Acme Corp" className={inputClass} />
        </label>
        <FieldError text={errors.company} />
      </div>

      <div>
        <div className={boxClass}>
          <label htmlFor="contact-interest" className={labelClass}>What are you interested in?</label>
          <Select
            id="contact-interest"
            name="interest"
            defaultValue={CONTACT_INTERESTS[0]}
            options={CONTACT_INTERESTS.map((option) => ({ label: option, value: option }))}
            className="items-stretch!"
            triggerClassName="mt-1! h-auto! min-w-0! cursor-pointer! rounded-none! border-0! bg-transparent! px-0! pr-0! pl-0! text-[0.9375rem]! hover:border-0! data-popup-open:shadow-none!"
          />
        </div>
        <FieldError text={errors.interest} />
      </div>

      <label className={boxClass}>
        <span className={labelClass}>Message (optional)</span>
        <textarea
          name="message"
          rows={3}
          maxLength={1500}
          placeholder="E.g. Interested in reporting and lead follow-up…"
          className={`${inputClass} resize-y`}
        />
      </label>

      {state.status === "error" && state.message && !Object.keys(errors).length && (
        <p role="alert" className="px-1 text-sm text-lane">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending || state.status === "ok"}
        className="group mt-2 flex h-14 w-full items-center justify-center gap-2 rounded-[0.75rem] bg-btn text-base font-medium text-white shadow-[0_0.5rem_1.25rem_-0.625rem_rgba(0,0,0,0.5)] transition hover:bg-btn-hover disabled:opacity-70"
      >
        {pending ? "Sending…" : "Send message"}
        {!pending && <ArrowRight className="size-[1.125rem] transition-transform group-hover:translate-x-0.5" />}
      </button>

      <p className="flex items-center justify-center gap-2 pt-2 text-sm text-muted">
        <Lock className="size-4" />
        We respect your privacy. No spam.
      </p>
    </form>
  );
}
