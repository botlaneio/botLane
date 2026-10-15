"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Info, KeyRound } from "lucide-react";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[1.125rem]" aria-hidden>
      <path fill="#4285F4" d="M22.6 12.2c0-.8-.1-1.5-.2-2.2H12v4.2h5.9a5 5 0 0 1-2.2 3.3v2.7h3.6c2.1-1.9 3.3-4.8 3.3-8z" />
      <path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.6-2.7c-1 .7-2.2 1.1-3.7 1.1-2.9 0-5.3-1.9-6.2-4.5H2.1v2.8A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.8 14.2a6.6 6.6 0 0 1 0-4.3V7.1H2.1a11 11 0 0 0 0 9.9l3.7-2.8z" />
      <path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.7l3.2-3.2A11 11 0 0 0 2.1 7.1l3.7 2.8C6.7 7.3 9.1 5.4 12 5.4z" />
    </svg>
  );
}

function MicrosoftIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[1.125rem]" aria-hidden>
      <path fill="#F25022" d="M2 2h9.5v9.5H2z" />
      <path fill="#7FBA00" d="M12.5 2H22v9.5h-9.5z" />
      <path fill="#00A4EF" d="M2 12.5h9.5V22H2z" />
      <path fill="#FFB900" d="M12.5 12.5H22V22h-9.5z" />
    </svg>
  );
}

/** Accounts aren't open yet, so every way in ends here instead of pretending to sign the visitor in. */
function NotOpenYet() {
  return (
    <div role="status" className="mt-5 flex items-start gap-3 rounded-[0.75rem] border border-line bg-surface/70 p-4 text-sm">
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

function Checkbox({ name, required, defaultChecked, children }: { name: string; required?: boolean; defaultChecked?: boolean; children: React.ReactNode }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-ink-2">
      <input
        type="checkbox"
        name={name}
        required={required}
        defaultChecked={defaultChecked}
        className="size-[1.125rem] shrink-0 cursor-pointer rounded-[0.3125rem] accent-lane"
      />
      <span>{children}</span>
    </label>
  );
}

function SsoIcon() {
  return <KeyRound className="size-[1.0625rem]" aria-hidden />;
}

const plainInputClass =
  "h-12 w-full rounded-[0.625rem] border border-line bg-white px-3.5 text-[0.9375rem] text-ink placeholder:text-faint outline-none transition focus:border-ink/30 focus:ring-4 focus:ring-ink/[0.04]";

const providerClass =
  "flex h-12 w-full items-center justify-center gap-2.5 rounded-[0.625rem] border border-line bg-white text-[0.9375rem] font-medium text-ink transition hover:bg-surface";

/** Sign-in form in the split layout: providers first, then email and password. */
export function SignInForm() {
  const [notice, setNotice] = useState(false);
  const [shown, setShown] = useState(false);

  return (
    <div>
      <div className="grid grid-cols-2 gap-2.5">
        <button type="button" onClick={() => setNotice(true)} className={providerClass}>
          <GoogleIcon />
          Google
        </button>
        <button type="button" onClick={() => setNotice(true)} className={providerClass}>
          <MicrosoftIcon />
          Microsoft
        </button>
      </div>
      <button type="button" onClick={() => setNotice(true)} className={`${providerClass} mt-2.5`}>
        <SsoIcon />
        Continue with SSO
      </button>

      <div className="my-7 flex items-center gap-4 text-xs uppercase tracking-[0.12em] text-muted">
        <span className="h-px flex-1 bg-line" />
        or
        <span className="h-px flex-1 bg-line" />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setNotice(true);
        }}
      >
        <label className="block">
          <span className="text-[0.9375rem] font-medium text-ink">Email</span>
          <input name="email" type="email" required autoComplete="email" className={`${plainInputClass} mt-2`} />
        </label>
        <label className="mt-5 block">
          <span className="text-[0.9375rem] font-medium text-ink">Password</span>
          <span className="relative mt-2 block">
            <input
              name="password"
              type={shown ? "text" : "password"}
              required
              minLength={8}
              autoComplete="current-password"
              className={`${plainInputClass} pr-12`}
            />
            <button
              type="button"
              onClick={() => setShown(!shown)}
              aria-label={shown ? "Hide password" : "Show password"}
              className="absolute top-1/2 right-3 -translate-y-1/2 rounded-md p-1 text-ink-2 transition hover:text-ink"
            >
              {shown ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
            </button>
          </span>
        </label>

        <div className="mt-6">
          <Checkbox name="remember" defaultChecked>
            Keep me signed in on this device
          </Checkbox>
        </div>

        <button
          type="submit"
          className="mt-6 flex h-12 w-full items-center justify-center rounded-[0.625rem] bg-lane text-[0.9375rem] font-medium text-white shadow-[0_0.75rem_1.5rem_-0.875rem_rgba(224,49,43,0.8)] transition hover:bg-lane-strong active:scale-[0.99]"
        >
          Sign in
        </button>
      </form>

      {notice && <NotOpenYet />}

      <div className="mt-6 space-y-2 text-center text-[0.9375rem] text-muted">
        <p>
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium text-lane hover:underline">
            Sign up
          </Link>
        </p>
        <p>
          Forgot your{" "}
          <button type="button" onClick={() => setNotice(true)} className="font-medium text-lane underline underline-offset-2">
            password
          </button>
          ?
        </p>
      </div>

      <p className="mx-auto mt-12 max-w-[19rem] text-center text-[0.8125rem] leading-relaxed text-muted">
        By continuing, I agree to botLane&apos;s{" "}
        <Link href="/legal/terms" className="underline underline-offset-2 hover:text-ink">terms</Link> and{" "}
        <Link href="/legal/privacy" className="underline underline-offset-2 hover:text-ink">privacy policy</Link>.
      </p>
    </div>
  );
}

/** Sign-up form in the split layout, matching the sign-in form. */
export function SignUpForm() {
  const [notice, setNotice] = useState(false);
  const [shown, setShown] = useState(false);

  return (
    <div>
      <div className="grid grid-cols-2 gap-2.5">
        <button type="button" onClick={() => setNotice(true)} className={providerClass}>
          <GoogleIcon />
          Google
        </button>
        <button type="button" onClick={() => setNotice(true)} className={providerClass}>
          <MicrosoftIcon />
          Microsoft
        </button>
      </div>

      <div className="my-7 flex items-center gap-4 text-xs uppercase tracking-[0.12em] text-muted">
        <span className="h-px flex-1 bg-line" />
        or
        <span className="h-px flex-1 bg-line" />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setNotice(true);
        }}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="text-[0.9375rem] font-medium text-ink">Full name</span>
            <input name="name" required autoComplete="name" className={`${plainInputClass} mt-2`} />
          </label>
          <label className="block">
            <span className="text-[0.9375rem] font-medium text-ink">Company</span>
            <input name="company" required autoComplete="organization" className={`${plainInputClass} mt-2`} />
          </label>
        </div>
        <label className="mt-5 block">
          <span className="text-[0.9375rem] font-medium text-ink">Work email</span>
          <input name="email" type="email" required autoComplete="email" className={`${plainInputClass} mt-2`} />
        </label>
        <label className="mt-5 block">
          <span className="text-[0.9375rem] font-medium text-ink">Password</span>
          <span className="relative mt-2 block">
            <input
              name="password"
              type={shown ? "text" : "password"}
              required
              minLength={8}
              autoComplete="new-password"
              placeholder="At least 8 characters"
              className={`${plainInputClass} pr-12`}
            />
            <button
              type="button"
              onClick={() => setShown(!shown)}
              aria-label={shown ? "Hide password" : "Show password"}
              className="absolute top-1/2 right-3 -translate-y-1/2 rounded-md p-1 text-ink-2 transition hover:text-ink"
            >
              {shown ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
            </button>
          </span>
        </label>

        <div className="mt-6">
          <Checkbox name="terms" required>
            I agree to the{" "}
            <Link href="/legal/terms" className="text-lane hover:underline">terms</Link> and{" "}
            <Link href="/legal/privacy" className="text-lane hover:underline">privacy policy</Link>.
          </Checkbox>
        </div>

        <button
          type="submit"
          className="mt-6 flex h-12 w-full items-center justify-center rounded-[0.625rem] bg-lane text-[0.9375rem] font-medium text-white shadow-[0_0.75rem_1.5rem_-0.875rem_rgba(224,49,43,0.8)] transition hover:bg-lane-strong active:scale-[0.99]"
        >
          Create account
        </button>
      </form>

      {notice && <NotOpenYet />}

      <p className="mt-6 text-center text-[0.9375rem] text-muted">
        Already have an account?{" "}
        <Link href="/signin" className="font-medium text-lane hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
