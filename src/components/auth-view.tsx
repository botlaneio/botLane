"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  User,
  Building,
  Layers,
  RotateCw,
  GitCommit,
} from "lucide-react";
import { LaneMarkCycle } from "./lane-mark-cycle";
import { LaneMark } from "./lane-mark";
import { Wordmark } from "./wordmark";

interface AuthViewProps {
  initialMode?: "signin" | "signup";
}

const SYSTEMS = [
  { id: "all", label: "All 3 Systems", icon: Sparkles },
  { id: "reporting", label: "Client Reporting (Funnel)", icon: Layers },
  { id: "leads", label: "Lead Follow-up (Line)", icon: GitCommit },
  { id: "invoices", label: "Invoice Follow-up (Loop)", icon: RotateCw },
];

export function AuthView({ initialMode = "signin" }: AuthViewProps) {
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [selectedSystem, setSelectedSystem] = useState("all");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotEmailSent, setForgotEmailSent] = useState(false);
  const [demoApproved, setDemoApproved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 700);
  };

  const handleOAuth = (provider?: string) => {
    void provider;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 600);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotEmailSent(true);
  };

  return (
    <div className="min-h-screen bg-[#fafafc] text-ink selection:bg-lane-soft selection:text-lane-ink flex flex-col justify-between">
      {/* Top Header */}
      <header className="border-b border-line/70 bg-white/80 backdrop-blur-md sticky top-0 z-20">
        <div className="mx-auto flex h-16 max-w-[75rem] items-center justify-between px-6">
          <Link
            href="/"
            aria-label="Back to BotLane homepage"
            className="group flex items-center gap-2.5 transition-opacity hover:opacity-90"
          >
            <Wordmark className="text-[1.1875rem] text-ink" />
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft size={14} />
            <span>Return to home</span>
          </Link>
        </div>
      </header>

      {/* Main Content Split View */}
      <main className="flex-1 py-10 px-6 sm:px-8">
        <div className="mx-auto max-w-[68.75rem] grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Form Card */}
          <div className="lg:col-span-6 max-w-[30rem] w-full mx-auto">
            {isSuccess ? (
              <div className="rounded-[1.5rem] border border-line bg-white p-8 sm:p-10 shadow-[0_1.25rem_3.125rem_rgba(20,20,40,0.06)] text-center animate-in fade-in zoom-in-95 duration-200">
                <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-ok/10 text-ok">
                  <Check size={28} strokeWidth={2.5} />
                </div>
                <h2 className="text-2xl font-semibold tracking-[-0.03em] text-ink">
                  {mode === "signin" ? "Welcome back to BotLane!" : "Workspace Created!"}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {mode === "signin"
                    ? `Logged in as ${email}. Your human-in-the-loop dashboard is synchronizing.`
                    : `We set up a dedicated workspace for ${name || "your team"} at ${company || "BotLane"}. Your approval desk is live.`}
                </p>

                <div className="mt-6 rounded-xl border border-line bg-surface/70 p-4 text-left text-xs text-muted">
                  <div className="font-semibold text-ink flex items-center gap-2">
                    <ShieldCheck size={14} className="text-lane" />
                    <span>Active Session · BotLane Engine v2.4</span>
                  </div>
                  <div className="mt-1.5 text-muted">
                    Zero automated actions are ever dispatched without your explicit approval.
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3">
                  <Link
                    href="/"
                    className="inline-flex h-11 w-full items-center justify-center rounded-[0.5rem] bg-btn text-sm font-medium text-white transition-colors hover:bg-btn-hover"
                  >
                    Go to Approval Dashboard
                  </Link>
                  <button
                    type="button"
                    onClick={() => setIsSuccess(false)}
                    className="text-xs text-muted hover:text-ink underline"
                  >
                    Switch account
                  </button>
                </div>
              </div>
            ) : (
              <div className="rounded-[1.5rem] border border-line bg-white p-8 sm:p-10 shadow-[0_1.25rem_3.125rem_rgba(20,20,40,0.06)]">
                {/* Tabs */}
                <div className="flex rounded-xl bg-surface p-1 border border-line/60 mb-7">
                  <button
                    type="button"
                    onClick={() => setMode("signin")}
                    className={`flex-1 rounded-[0.5rem] py-2 text-xs font-semibold transition-all ${
                      mode === "signin"
                        ? "bg-white text-ink shadow-sm"
                        : "text-muted hover:text-ink"
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("signup")}
                    className={`flex-1 rounded-[0.5rem] py-2 text-xs font-semibold transition-all ${
                      mode === "signup"
                        ? "bg-white text-ink shadow-sm"
                        : "text-muted hover:text-ink"
                    }`}
                  >
                    Create Account
                  </button>
                </div>

                {/* Header text */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-lane">
                    <LaneMarkCycle size={18} />
                    <span>{mode === "signin" ? "Secure Login" : "New Workforce Onboarding"}</span>
                  </div>
                  <h1 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-ink">
                    {mode === "signin"
                      ? "Sign in to your account"
                      : "Start with Lane workforce"}
                  </h1>
                  <p className="mt-1 text-xs text-muted">
                    {mode === "signin"
                      ? "Review pending runs and approve client reporting, lead nudges, and invoices."
                      : "Join hundreds of agencies and teams delegating repetitive tasks with total human oversight."}
                  </p>
                </div>

                {/* Real Brand SSO Login Buttons */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button
                    type="button"
                    onClick={() => handleOAuth("Google")}
                    className="inline-flex h-10 items-center justify-center gap-2.5 rounded-[0.5rem] border border-line bg-white px-3 text-xs font-medium text-ink transition-colors hover:bg-surface hover:border-line-2 cursor-pointer shadow-xs"
                    aria-label="Continue with Google"
                  >
                    <svg
                      className="size-4 shrink-0"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.16 0 9.93 0 12s.45 3.84 1.24 5.42l4.04-3.15z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                      />
                    </svg>
                    <span>Google</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOAuth("GitHub")}
                    className="inline-flex h-10 items-center justify-center gap-2.5 rounded-[0.5rem] border border-line bg-white px-3 text-xs font-medium text-ink transition-colors hover:bg-surface hover:border-line-2 cursor-pointer shadow-xs"
                    aria-label="Continue with GitHub"
                  >
                    <svg
                      className="size-4 shrink-0 fill-[#24292f]"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      />
                    </svg>
                    <span>GitHub</span>
                  </button>
                </div>

                <div className="relative mb-6 text-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-line" />
                  </div>
                  <span className="relative bg-white px-3 text-[0.6875rem] uppercase tracking-wider text-faint">
                    Or continue with email
                  </span>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {mode === "signup" && (
                    <>
                      <div>
                        <label
                          htmlFor="auth-name"
                          className="block text-xs font-medium text-ink-2 mb-1"
                        >
                          Full Name
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-faint pointer-events-none">
                            <User size={15} />
                          </span>
                          <input
                            id="auth-name"
                            type="text"
                            required
                            placeholder="e.g. Zuheb"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-xl border border-line bg-surface/40 pl-9 pr-3.5 py-2.5 text-sm text-ink transition-colors placeholder:text-faint focus:border-lane focus:bg-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="auth-company"
                          className="block text-xs font-medium text-ink-2 mb-1"
                        >
                          Company / Studio Name
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-faint pointer-events-none">
                            <Building size={15} />
                          </span>
                          <input
                            id="auth-company"
                            type="text"
                            placeholder="Acme Growth Agency"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            className="w-full rounded-xl border border-line bg-surface/40 pl-9 pr-3.5 py-2.5 text-sm text-ink transition-colors placeholder:text-faint focus:border-lane focus:bg-white focus:outline-none"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div>
                    <label
                      htmlFor="auth-email"
                      className="block text-xs font-medium text-ink-2 mb-1"
                    >
                      Work Email
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-faint pointer-events-none">
                        <Mail size={15} />
                      </span>
                      <input
                        id="auth-email"
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-line bg-surface/40 pl-9 pr-3.5 py-2.5 text-sm text-ink transition-colors placeholder:text-faint focus:border-lane focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label
                        htmlFor="auth-password"
                        className="block text-xs font-medium text-ink-2"
                      >
                        Password
                      </label>
                      {mode === "signin" && (
                        <button
                          type="button"
                          onClick={() => setForgotPasswordOpen(true)}
                          className="text-[0.6875rem] font-medium text-lane hover:underline"
                        >
                          Forgot password?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-faint pointer-events-none">
                        <Lock size={15} />
                      </span>
                      <input
                        id="auth-password"
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="••••••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-xl border border-line bg-surface/40 pl-9 pr-10 py-2.5 text-sm text-ink transition-colors placeholder:text-faint focus:border-lane focus:bg-white focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-faint hover:text-ink"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>

                  {mode === "signup" && (
                    <div>
                      <label className="block text-xs font-medium text-ink-2 mb-1.5">
                        Workflow Focus
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {SYSTEMS.map((sys) => {
                          const Icon = sys.icon;
                          const isSelected = selectedSystem === sys.id;
                          return (
                            <button
                              key={sys.id}
                              type="button"
                              onClick={() => setSelectedSystem(sys.id)}
                              className={`flex items-center gap-2 rounded-[0.5rem] border p-2 text-left text-xs transition-colors ${
                                isSelected
                                  ? "border-lane bg-red-50/70 font-medium text-lane-ink"
                                  : "border-line bg-surface/30 text-muted hover:border-muted/50 hover:text-ink"
                              }`}
                            >
                              <Icon size={13} className={isSelected ? "text-lane" : "text-muted"} />
                              <span className="truncate">{sys.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {mode === "signin" && (
                    <div className="flex items-center">
                      <label className="flex items-center gap-2 text-xs text-muted cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="size-4 rounded border-line text-lane focus:ring-lane"
                        />
                        <span>Remember me on this browser</span>
                      </label>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="mt-2 flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-[0.5rem] bg-btn px-4 text-sm font-medium text-white transition-all hover:bg-btn-hover active:scale-[0.99] disabled:opacity-50"
                  >
                    {isLoading ? (
                      <span className="inline-block size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>{mode === "signin" ? "Sign In" : "Create Account & Start"}</span>
                        <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                </form>

                {/* Footer Switcher */}
                <div className="mt-6 text-center text-xs text-muted">
                  {mode === "signin" ? (
                    <p>
                      Don&apos;t have an account yet?{" "}
                      <button
                        type="button"
                        onClick={() => setMode("signup")}
                        className="font-medium text-lane hover:underline"
                      >
                        Create an account
                      </button>
                    </p>
                  ) : (
                    <p>
                      Already using BotLane?{" "}
                      <button
                        type="button"
                        onClick={() => setMode("signin")}
                        className="font-medium text-lane hover:underline"
                      >
                        Sign in instead
                      </button>
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: High-craft interactive product showcase */}
          <div className="lg:col-span-6 space-y-6 lg:pl-6">
            {/* The Live Interactive Approval Preview Card */}
            <div className="rounded-[1.5rem] border border-line bg-white p-7 shadow-[0_1rem_2.5rem_rgba(20,20,40,0.06)] relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <div className="flex items-center gap-2.5">
                  <LaneMarkCycle size={24} />
                  <div>
                    <div className="text-xs font-semibold text-ink">Lane Approval Desk</div>
                    <div className="text-[0.6875rem] text-muted">Human-in-the-loop safeguards</div>
                  </div>
                </div>
                <span className="font-mono text-[0.625rem] uppercase tracking-wider text-lane bg-[#efeafb] px-2.5 py-1 rounded-full font-medium">
                  Live simulator
                </span>
              </div>

              <div className="mt-5 space-y-4">
                <div className="rounded-xl border border-line bg-surface/50 p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[0.6875rem] text-muted">RUN-1843</span>
                    <span className="text-[0.6875rem] font-medium text-muted">2 min ago</span>
                  </div>
                  <div className="mt-1.5 text-sm font-semibold text-ink">
                    Reply to Zuheb & prepare discovery briefing
                  </div>
                  <p className="mt-1 text-xs text-muted">
                    Lane analyzed the enquiry, drafted 3 personalized replies, and checked your calendar availability.
                  </p>

                  <div className="mt-4 pt-3 border-t border-line/60 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-lane animate-pulse" />
                      <span className="text-xs font-medium text-ink-2">
                        {demoApproved ? "Approved by you" : "Awaiting your OK"}
                      </span>
                    </div>

                    {demoApproved ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-ok bg-ok/10 px-3 py-1 rounded-full">
                        <CheckCircle2 size={13} />
                        Dispatched safely
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setDemoApproved(true)}
                        className="inline-flex items-center gap-1.5 rounded-[0.5rem] bg-lane-strong px-3 py-1.5 text-xs font-medium text-white hover:bg-lane-ink transition-colors cursor-pointer"
                      >
                        <Check size={13} />
                        <span>Tap to Approve</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-xl border border-line bg-surface/40 p-3">
                    <div className="text-base font-semibold text-ink">0</div>
                    <div className="text-[0.625rem] text-muted uppercase tracking-wider mt-0.5">Surprise Sends</div>
                  </div>
                  <div className="rounded-xl border border-line bg-surface/40 p-3">
                    <div className="text-base font-semibold text-ink">100%</div>
                    <div className="text-[0.625rem] text-muted uppercase tracking-wider mt-0.5">Human Approved</div>
                  </div>
                  <div className="rounded-xl border border-line bg-surface/40 p-3">
                    <div className="text-base font-semibold text-ink">15 hrs</div>
                    <div className="text-[0.625rem] text-muted uppercase tracking-wider mt-0.5">Saved / Week</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Quote */}
            <div className="rounded-[1.25rem] border border-line/70 bg-surface/50 p-6">
              <p className="text-sm italic leading-relaxed text-ink-2">
                &ldquo;Lane took away all the repetitive friction of Monday reports and Friday invoicing. Our account directors love that they remain the decision-makers, but don&apos;t have to do the manual data assembly.&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="size-9 rounded-full bg-ink text-white flex items-center justify-center font-semibold text-xs">
                  ZH
                </div>
                <div>
                  <div className="text-xs font-semibold text-ink">Zuheb & Co.</div>
                  <div className="text-[0.6875rem] text-muted">Creative Agency Partner</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Forgot Password Modal */}
      {forgotPasswordOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={() => {
              setForgotPasswordOpen(false);
              setForgotEmailSent(false);
            }}
          />
          <div className="relative w-full max-w-[26.25rem] rounded-[1.375rem] border border-line bg-white p-7 shadow-2xl">
            {forgotEmailSent ? (
              <div className="text-center py-4">
                <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-ok/10 text-ok">
                  <Check size={24} />
                </div>
                <h3 className="text-lg font-semibold text-ink">Reset instructions sent</h3>
                <p className="mt-1 text-xs text-muted">
                  We sent a recovery link to your address. Please check your inbox.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setForgotPasswordOpen(false);
                    setForgotEmailSent(false);
                  }}
                  className="mt-6 inline-flex h-10 items-center justify-center rounded-[0.5rem] bg-btn px-5 text-xs font-medium text-white hover:bg-btn-hover"
                >
                  Return to sign in
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword}>
                <h3 className="text-lg font-semibold text-ink">Reset your password</h3>
                <p className="mt-1 text-xs text-muted">
                  Enter your registered work email and we&apos;ll send you a secure login link.
                </p>
                <div className="mt-4">
                  <input
                    type="email"
                    required
                    placeholder="you@company.com"
                    defaultValue={email}
                    className="w-full rounded-xl border border-line bg-surface/50 px-3.5 py-2.5 text-sm text-ink focus:border-lane focus:bg-white focus:outline-none"
                  />
                </div>
                <div className="mt-6 flex justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setForgotPasswordOpen(false)}
                    className="h-10 px-4 rounded-[0.5rem] text-xs font-medium text-muted hover:bg-surface hover:text-ink"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="h-10 px-5 rounded-[0.5rem] bg-btn text-xs font-medium text-white hover:bg-btn-hover"
                  >
                    Send reset link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-line/60 bg-white/60 py-6 px-6 text-center text-xs text-muted">
        <div className="mx-auto max-w-[75rem] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-ink">
            <LaneMark size={16} />
            <span className="font-semibold text-xs">botlane</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Security</span>
          </div>
          <div>© BotLane LLC · All rights reserved</div>
        </div>
      </footer>
    </div>
  );
}
