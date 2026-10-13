"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Building2, Eye, EyeOff, Info, Lock, Mail, User } from "lucide-react";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[18px]" aria-hidden>
      <path fill="#4285F4" d="M22.6 12.2c0-.8-.1-1.5-.2-2.2H12v4.2h5.9a5 5 0 0 1-2.2 3.3v2.7h3.6c2.1-1.9 3.3-4.8 3.3-8z" />
      <path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.6-2.7c-1 .7-2.2 1.1-3.7 1.1-2.9 0-5.3-1.9-6.2-4.5H2.1v2.8A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.8 14.2a6.6 6.6 0 0 1 0-4.3V7.1H2.1a11 11 0 0 0 0 9.9l3.7-2.8z" />
      <path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.7l3.2-3.2A11 11 0 0 0 2.1 7.1l3.7 2.8C6.7 7.3 9.1 5.4 12 5.4z" />
    </svg>
  );
}

function MicrosoftIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[18px]" aria-hidden>
      <path fill="#F25022" d="M2 2h9.5v9.5H2z" />
      <path fill="#7FBA00" d="M12.5 2H22v9.5h-9.5z" />
      <path fill="#00A4EF" d="M2 12.5h9.5V22H2z" />
      <path fill="#FFB900" d="M12.5 12.5H22V22h-9.5z" />
    </svg>
  );
}

function Field({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon: typeof Mail;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink">{label}</span>
      <span className="relative mt-2 block">
        <Icon className="pointer-events-none absolute top-1/2 left-3.5 size-[18px] -translate-y-1/2 text-muted" />
        {children}
      </span>
    </label>
  );
}

const inputClass =
  "h-12 w-full rounded-[10px] border border-line bg-white pr-11 pl-11 text-sm text-ink placeholder:text-faint outline-none transition focus:border-ink/30 focus:ring-4 focus:ring-ink/[0.04]";

function PasswordInput({ placeholder, autoComplete }: { placeholder: string; autoComplete: string }) {
  const [shown, setShown] = useState(false);
  return (
    <>
      <input
        name="password"
        type={shown ? "text" : "password"}
        required
        minLength={8}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={inputClass}
      />
      <button
        type="button"
        onClick={() => setShown(!shown)}
        aria-label={shown ? "Hide password" : "Show password"}
        className="absolute top-1/2 right-3 -translate-y-1/2 rounded-md p-1 text-muted transition hover:text-ink"
      >
        {shown ? <EyeOff className="size-[18px]" /> : <Eye className="size-[18px]" />}
      </button>
    </>
  );
}

/** Accounts aren't open yet, so every way in ends here instead of pretending to sign the visitor in. */
function NotOpenYet() {
  return (
    <div role="status" className="mt-5 flex items-start gap-3 rounded-[12px] border border-line bg-surface/70 p-4 text-sm">
      <Info className="mt-0.5 size-4 shrink-0 text-lane" />
      <div className="text-ink-2">
        Client workspaces aren&apos;t open for self sign-up yet. We set yours up with you during onboarding.{" "}
        <Link href="/demo" className="font-medium text-lane hover:underline">
          Book a demo
        </Link>
      </div>
    </div>
  );
}

function SocialButtons({ onClick }: { onClick: () => void }) {
  return (
    <>
      <div className="my-6 flex items-center gap-4 text-xs text-muted">
        <span className="h-px flex-1 bg-line" />
        OR
        <span className="h-px flex-1 bg-line" />
      </div>
      <div className="space-y-3">
        <button
          type="button"
          onClick={onClick}
          className="flex h-12 w-full items-center justify-center gap-3 rounded-[10px] border border-line bg-white text-sm font-medium text-ink transition hover:bg-surface"
        >
          <GoogleIcon />
          Continue with Google
        </button>
        <button
          type="button"
          onClick={onClick}
          className="flex h-12 w-full items-center justify-center gap-3 rounded-[10px] border border-line bg-white text-sm font-medium text-ink transition hover:bg-surface"
        >
          <MicrosoftIcon />
          Continue with Microsoft
        </button>
      </div>
    </>
  );
}

function Checkbox({ name, required, defaultChecked, children }: { name: string; required?: boolean; defaultChecked?: boolean; children: React.ReactNode }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-ink-2">
      <input
        type="checkbox"
        name={name}
        required={required}
        defaultChecked={defaultChecked}
        className="size-[18px] shrink-0 cursor-pointer rounded-[5px] accent-lane"
      />
      <span>{children}</span>
    </label>
  );
}

const cardClass =
  "rounded-[22px] border border-line bg-white p-6 shadow-[0_20px_50px_-24px_rgba(20,20,40,0.16)] sm:p-8";

const submitClass =
  "group flex h-12 w-full items-center justify-center gap-2 rounded-[10px] bg-ink text-sm font-medium text-white shadow-[0_8px_20px_-10px_rgba(0,0,0,0.5)] transition hover:bg-black active:scale-[0.99]";

export function SignInForm() {
  const [notice, setNotice] = useState(false);

  return (
    <div className={cardClass}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setNotice(true);
        }}
        className="space-y-5"
      >
        <Field label="Email address" icon={Mail}>
          <input name="email" type="email" required autoComplete="email" placeholder="you@acmecorp.com" className={inputClass} />
        </Field>
        <Field label="Password" icon={Lock}>
          <PasswordInput placeholder="Enter your password" autoComplete="current-password" />
        </Field>
        <div className="flex items-center justify-between">
          <Checkbox name="remember" defaultChecked>
            Keep me signed in
          </Checkbox>
          <button type="button" onClick={() => setNotice(true)} className="text-sm text-lane underline-offset-2 hover:underline">
            Forgot password?
          </button>
        </div>
        <button type="submit" className={submitClass}>
          Sign in
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </form>

      {notice && <NotOpenYet />}

      <SocialButtons onClick={() => setNotice(true)} />

      <p className="mt-6 text-center text-xs leading-relaxed text-muted">
        By signing in, you agree to our{" "}
        <Link href="/legal/terms" className="hover:text-ink">Terms of Service</Link> and{" "}
        <Link href="/legal/privacy" className="hover:text-ink">Privacy Policy</Link>.
      </p>
    </div>
  );
}

export function SignUpForm() {
  const [notice, setNotice] = useState(false);

  return (
    <div className={cardClass}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setNotice(true);
        }}
        className="space-y-5"
      >
        <Field label="Full name" icon={User}>
          <input name="name" required autoComplete="name" placeholder="John Doe" className={inputClass} />
        </Field>
        <Field label="Work email" icon={Mail}>
          <input name="email" type="email" required autoComplete="email" placeholder="you@acmecorp.com" className={inputClass} />
        </Field>
        <Field label="Company name" icon={Building2}>
          <input name="company" required autoComplete="organization" placeholder="Acme Corp" className={inputClass} />
        </Field>
        <Field label="Password" icon={Lock}>
          <PasswordInput placeholder="Create a password (min 8 characters)" autoComplete="new-password" />
        </Field>
        <Checkbox name="terms" required>
          I agree to the{" "}
          <Link href="/legal/terms" className="text-lane hover:underline">Terms of Service</Link> and{" "}
          <Link href="/legal/privacy" className="text-lane hover:underline">Privacy Policy</Link>.
        </Checkbox>
        <button type="submit" className={submitClass}>
          Create account
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </form>

      {notice && <NotOpenYet />}

      <SocialButtons onClick={() => setNotice(true)} />
    </div>
  );
}
