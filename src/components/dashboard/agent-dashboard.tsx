import type { ReactNode } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Bell,
  Blocks,
  BookOpen,
  ChartColumn,
  ChevronDown,
  ChevronRight,
  FileChartColumn,
  FileText,
  House,
  ReceiptText,
  Search,
  Settings,
  ShieldCheck,
  TriangleAlert,
  Users,
  UsersRound,
  Cable,
} from "lucide-react";
import { BotLaneLogo } from "../brand/botlane-logo";

/**
 * The Lane app dashboard from the hero mockup, as a standalone component.
 * Static demo data only; nothing here is live.
 */
export function AgentDashboard({ className }: { className?: string }) {
  return (
    <div
      className={`relative w-full max-w-[82rem] rounded-[1.25rem] border border-line bg-white/90 text-ink shadow-[0_2.5rem_5rem_-2rem_rgba(29,29,31,0.18),0_0.5rem_1.5rem_-0.5rem_rgba(29,29,31,0.08)] backdrop-blur ${className ?? ""}`}
    >
      <div className="grid grid-cols-[13rem_1fr] overflow-hidden rounded-[1.25rem]">
        <Sidebar />
        <div className="min-w-0 border-l border-line bg-[#fbfbfa]">
          <TopBar />
          <div className="space-y-3 p-4">
            <SystemCards />
            <StatTiles />
            <div className="grid grid-cols-[17rem_1fr_17rem] gap-3">
              <ConnectedSignals />
              <WeeklySynthesis />
              <ApprovalQueue />
            </div>
          </div>
        </div>
      </div>
      <ApprovalToast />
    </div>
  );
}

/**
 * The same dashboard for tablets: no sidebar, the search bar carries the brand, and the
 * panels drop to two columns, so it reads at full size instead of being scaled down.
 */
export function AgentDashboardTablet({ className }: { className?: string }) {
  return (
    <div
      className={`relative mx-auto w-full max-w-[60rem] rounded-[1.25rem] border border-line bg-white/90 text-ink shadow-[0_2.5rem_5rem_-2rem_rgba(29,29,31,0.18),0_0.5rem_1.5rem_-0.5rem_rgba(29,29,31,0.08)] backdrop-blur ${className ?? ""}`}
    >
      <div className="overflow-hidden rounded-[1.25rem] bg-[#fbfbfa]">
        <div className="flex items-center gap-4 border-b border-line bg-white px-4 py-2.5">
          <div className="flex gap-[0.4375rem]">
            <span className="size-3 rounded-full bg-[#ff5f57]" />
            <span className="size-3 rounded-full bg-[#febc2e]" />
            <span className="size-3 rounded-full bg-[#28c840]" />
          </div>
          <BotLaneLogo mode="full" size={20} variant="light" decorative symbolClassName="mr-1.5" wordmarkClassName="text-[1.0625rem]" />
          <div className="ml-auto flex w-full max-w-[18rem] items-center gap-2 rounded-lg bg-surface px-3 py-[0.4375rem] text-[0.75rem] text-faint">
            <Search className="size-3.5" />
            Search clients or approvals…
          </div>
          <span className="relative text-muted">
            <Bell className="size-4" />
            <span className="absolute -right-0.5 -top-0.5 size-[0.4375rem] rounded-full border border-white bg-lane" />
          </span>
        </div>
        <div className="space-y-3 p-4">
          <SystemCards />
          <StatTiles cols="grid-cols-2" />
          <div className="grid grid-cols-[1fr_16rem] gap-3">
            <WeeklySynthesis kpiCols="grid-cols-2" />
            <ApprovalQueue />
          </div>
        </div>
      </div>
      <ApprovalToast className="absolute -right-3 -bottom-6" />
    </div>
  );
}

/**
 * The same dashboard for phones, laid out like the Lane app on a phone: one column,
 * bigger type, the approval queue first, and the approval prompt docked at the bottom.
 */
export function AgentDashboardPhone({ className }: { className?: string }) {
  const chips = ["Reporting", "Leads", "Invoices"];
  const stats = [
    { value: "24", label: "Clients processed", icon: <ChartColumn className="text-ok" /> },
    { value: "18", label: "Reports generated", icon: <FileChartColumn className="text-muted" /> },
    { value: "0", label: "Needs attention", icon: <TriangleAlert className="text-lane" /> },
    { value: "3", label: "Systems active", icon: <span className="size-2 rounded-full bg-ok" /> },
  ];
  const queue = [
    { title: "Client report", sub: "Acme & Co. · weekly", icon: <ChartColumn className="text-lane" />, tint: true },
    { title: "Invoice follow-ups", sub: "8 clients", icon: <ReceiptText className="text-ink-2" /> },
    { title: "Lead replies", sub: "42 leads", icon: <UsersRound className="text-ink-2" /> },
  ];
  const kpis = [
    { label: "Revenue", value: "$128.4k", delta: "12%", up: true, line: [6, 5, 7, 6, 8, 7, 9, 8, 10, 11] },
    { label: "New leads", value: "342", delta: "24%", up: true, line: [4, 5, 4, 6, 5, 7, 6, 8, 9, 10] },
  ];
  return (
    <div className={`relative mx-auto w-full max-w-[26rem] pb-8 text-ink ${className ?? ""}`}>
      <div className="overflow-hidden rounded-[1.75rem] border border-line bg-[#fbfbfa] shadow-[0_2rem_4rem_-2rem_rgba(29,29,31,0.22),0_0.5rem_1.5rem_-0.5rem_rgba(29,29,31,0.08)]">
        <div className="flex items-center gap-3 border-b border-line bg-white px-4 py-3">
          <BotLaneLogo mode="full" size={22} variant="light" decorative symbolClassName="mr-1.5" wordmarkClassName="text-[1.125rem]" />
          <span className="relative ml-auto text-muted">
            <Bell className="size-[1.125rem]" />
            <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full border border-white bg-lane" />
          </span>
          <span className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-[#d9c3b0] to-[#8a6a55] text-[0.75rem] font-semibold text-white">
            TK
          </span>
        </div>

        <div className="space-y-3 p-3.5">
          <div className="flex gap-1.5">
            {chips.map((c, i) => (
              <span
                key={c}
                className={`flex-1 rounded-full border py-1.5 text-center text-[0.8125rem] font-medium ${
                  i === 0 ? "border-lane/50 bg-[var(--bl-red-tint)] text-lane-ink" : "border-line bg-white text-ink-2"
                }`}
              >
                {c}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-2.5 rounded-xl border border-line bg-white px-3 py-2.5">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-surface [&_svg]:size-4">{s.icon}</span>
                <span className="min-w-0 leading-tight">
                  <span className="block text-[1.25rem] font-semibold tabular-nums">{s.value}</span>
                  <span className="block truncate text-[0.75rem] text-muted">{s.label}</span>
                </span>
              </div>
            ))}
          </div>

          <section className="rounded-xl border border-line bg-white p-3">
            <header className="mb-2 flex items-center gap-2">
              <ShieldCheck className="size-[1.125rem] text-ink-2" />
              <h3 className="text-[0.9375rem] font-semibold">Approval queue</h3>
              <span className="grid size-5 place-items-center rounded-full bg-lane text-[0.6875rem] font-semibold text-white">3</span>
            </header>
            <ul className="space-y-1.5">
              {queue.map((q) => (
                <li key={q.title} className="flex items-center gap-2.5 rounded-lg border border-line px-2.5 py-2">
                  <span
                    className={`grid size-9 shrink-0 place-items-center rounded-lg [&_svg]:size-[1.125rem] ${
                      q.tint ? "bg-[var(--bl-red-tint)]" : "bg-surface"
                    }`}
                  >
                    {q.icon}
                  </span>
                  <span className="min-w-0 flex-1 leading-tight">
                    <span className="block truncate text-[0.875rem] font-medium">{q.title}</span>
                    <span className="block truncate text-[0.75rem] text-muted">{q.sub}</span>
                  </span>
                  <ChevronRight className="size-4 text-faint" />
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-line bg-white p-3">
            <header className="flex items-center gap-2.5">
              <span className="grid size-7 place-items-center rounded-md bg-ink text-[0.6875rem] font-bold text-white">A</span>
              <span className="flex-1 leading-tight">
                <span className="block text-[0.9375rem] font-semibold">Weekly synthesis</span>
                <span className="block text-[0.75rem] text-muted">Acme &amp; Co. · Oct 14 – 20</span>
              </span>
            </header>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {kpis.map((k) => (
                <div key={k.label} className="rounded-lg border border-line px-2.5 py-2">
                  <span className="block text-[0.75rem] text-muted">{k.label}</span>
                  <span className="block text-[1.125rem] font-semibold tabular-nums">{k.value}</span>
                  <span className="mt-0.5 flex items-end justify-between gap-1">
                    <span className={`flex items-center gap-0.5 text-[0.75rem] font-medium ${k.up ? "text-ok" : "text-lane"}`}>
                      {k.up ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />}
                      {k.delta}
                    </span>
                    <Sparkline points={k.line} color={k.up ? "var(--bl-green)" : "var(--bl-red)"} />
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* The approval prompt, docked over the bottom edge */}
      <div className="absolute inset-x-3 bottom-0 flex items-center gap-2.5 rounded-2xl border border-line bg-white/95 p-2.5 shadow-[0_1.25rem_3rem_-1rem_rgba(29,29,31,0.3)] backdrop-blur">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[var(--bl-red-tint)] text-lane">
          <FileText className="size-[1.125rem]" />
        </span>
        <span className="min-w-0 flex-1 leading-tight">
          <span className="block truncate text-[0.8125rem] font-medium">Report ready for approval</span>
          <span className="block truncate text-[0.75rem] text-muted">Acme &amp; Co. · weekly</span>
        </span>
        <span className="flex shrink-0 items-center gap-1 rounded-lg bg-lane px-3 py-2 text-[0.8125rem] font-medium text-white">
          Approve <ArrowRight className="size-3.5" />
        </span>
      </div>
    </div>
  );
}

/* ── Chrome ─────────────────────────────────────────────── */

function Sidebar() {
  const items: { label: string; icon: ReactNode; active?: boolean; badge?: number }[] = [
    { label: "Home", icon: <House />, active: true },
    { label: "Approvals", icon: <ShieldCheck />, badge: 3 },
    { label: "Systems", icon: <Blocks /> },
    { label: "Clients", icon: <Users /> },
    { label: "Knowledge", icon: <BookOpen /> },
    { label: "Settings", icon: <Settings /> },
  ];
  return (
    <aside className="flex flex-col bg-white px-3 pb-3 pt-4">
      <div className="flex gap-[0.4375rem] px-1">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
      </div>
      <BotLaneLogo
        mode="full"
        size={22}
        variant="light"
        decorative
        className="mt-7 px-1"
        symbolClassName="mr-1.5"
        wordmarkClassName="text-[1.1875rem]"
      />
      <nav className="mt-6 space-y-1">
        {items.map((it) => (
          <div
            key={it.label}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-[0.8125rem] ${
              it.active ? "bg-[var(--bl-red-tint)] font-medium text-lane-ink" : "text-ink-2"
            } [&_svg]:size-4 [&_svg]:stroke-[1.75]`}
          >
            <span className={it.active ? "text-lane" : "text-muted"}>{it.icon}</span>
            <span className="flex-1">{it.label}</span>
            {it.badge ? (
              <span className="grid size-[1.125rem] place-items-center rounded-full bg-lane text-[0.625rem] font-semibold text-white">
                {it.badge}
              </span>
            ) : null}
          </div>
        ))}
      </nav>
      <div className="mt-auto flex items-center gap-2.5 rounded-xl border border-line p-2.5">
        <span className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-[#d9c3b0] to-[#8a6a55] text-[0.6875rem] font-semibold text-white">
          TK
        </span>
        <span className="min-w-0 flex-1 leading-tight">
          <span className="block text-[0.8125rem] font-medium">Taylor Kim</span>
          <span className="block text-[0.6875rem] text-muted">Acme Agency</span>
        </span>
        <ChevronRight className="size-3.5 text-faint" />
      </div>
    </aside>
  );
}

function TopBar() {
  return (
    <div className="flex items-center gap-4 border-b border-line bg-white px-4 py-2.5">
      <div className="mx-auto flex w-full max-w-[29rem] items-center gap-2 rounded-lg bg-surface px-3 py-[0.4375rem] text-[0.75rem] text-faint">
        <Search className="size-3.5" />
        Search clients, approvals, or outputs…
      </div>
      <span className="relative text-muted">
        <Bell className="size-4" />
        <span className="absolute -right-0.5 -top-0.5 size-[0.4375rem] rounded-full border border-white bg-lane" />
      </span>
      <span className="flex items-center gap-2 rounded-lg border border-line px-3 py-1.5 text-[0.75rem] text-ink-2">
        Last 7 days <ChevronDown className="size-3.5 text-muted" />
      </span>
    </div>
  );
}

/* ── Row 1: systems ─────────────────────────────────────── */

function SystemCards() {
  const systems = [
    { title: "Client Reporting", sub: "Turn client data into executive reports", icon: <FileText />, active: true },
    { title: "Lead Follow-Up", sub: "Capture, enrich and follow up", icon: <UsersRound /> },
    { title: "Invoice Follow-Up", sub: "Find outstanding invoices and follow up", icon: <ReceiptText /> },
  ];
  return (
    <div className="grid grid-cols-3 gap-3">
      {systems.map((s) => (
        <div
          key={s.title}
          className={`flex items-center gap-3 rounded-xl border bg-white px-3.5 py-3 ${
            s.active ? "border-lane/60 shadow-[0_0_0_3px_var(--bl-red-tint)]" : "border-line"
          }`}
        >
          <span
            className={`grid size-9 shrink-0 place-items-center rounded-lg [&_svg]:size-[1.125rem] [&_svg]:stroke-[1.75] ${
              s.active ? "bg-[var(--bl-red-tint)] text-lane" : "text-ink-2"
            }`}
          >
            {s.icon}
          </span>
          <span className="min-w-0 flex-1 leading-tight">
            <span className="block text-[0.8125rem] font-medium">{s.title}</span>
            <span className="block truncate text-[0.6875rem] text-muted">{s.sub}</span>
          </span>
          <ChevronRight className="size-4 text-faint" />
        </div>
      ))}
    </div>
  );
}

/* ── Row 2: stats ───────────────────────────────────────── */

function StatTiles({ cols = "grid-cols-4" }: { cols?: string }) {
  return (
    <div className={`grid gap-3 ${cols}`}>
      <Stat icon={<ChartColumn className="text-ok" />} value="24" label="Clients processed" />
      <Stat icon={<FileChartColumn className="text-muted" />} value="18" label="Reports generated" />
      <Stat
        icon={<TriangleAlert className="text-lane" />}
        iconBg="bg-[var(--bl-red-tint)]"
        value="0"
        label="Needs attention"
      />
      <div className="flex items-center gap-3 rounded-xl border border-line bg-white px-3.5 py-3">
        <span className="grid size-8 place-items-center rounded-full bg-[var(--bl-green-tint)]">
          <span className="size-2 rounded-full bg-ok" />
        </span>
        <span className="flex-1 leading-tight">
          <span className="block text-[0.75rem] font-medium">All systems operational</span>
          <span className="block text-[0.6875rem] text-muted">3 systems active</span>
        </span>
        <ChevronRight className="size-4 text-faint" />
      </div>
    </div>
  );
}

function Stat({ icon, iconBg, value, label }: { icon: ReactNode; iconBg?: string; value: string; label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-line bg-white px-3.5 py-3">
      <span className={`grid size-8 place-items-center rounded-full [&_svg]:size-4 ${iconBg ?? ""}`}>{icon}</span>
      <span className="leading-tight">
        <span className="block text-[1.0625rem] font-semibold tabular-nums">{value}</span>
        <span className="block text-[0.6875rem] text-muted">{label}</span>
      </span>
    </div>
  );
}

/* ── Row 3: panels ──────────────────────────────────────── */

function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-xl border border-line bg-white p-3 ${className ?? ""}`}>{children}</section>;
}

function ConnectedSignals() {
  const signals = [
    { name: "Google Ads", sub: "Connected · 12 accounts", logo: <GoogleAdsLogo /> },
    { name: "Meta Ads", sub: "Connected · 8 accounts", logo: <MetaLogo /> },
    { name: "HubSpot", sub: "Connected · Contacts & deals", logo: <HubSpotLogo /> },
    { name: "Stripe", sub: "Connected · Invoices & revenue", logo: <StripeLogo /> },
    { name: "Looker Studio", sub: "Connected · Reporting data", logo: <LookerLogo /> },
  ];
  return (
    <Panel>
      <header className="mb-2 flex items-center gap-2 px-1">
        <Cable className="size-4 text-ink-2" />
        <h3 className="flex-1 text-[0.8125rem] font-medium">Connected signals</h3>
        <span className="flex items-center gap-1.5 rounded-full bg-[var(--bl-green-tint)] px-2 py-0.5 text-[0.625rem] font-medium text-ok">
          <span className="size-1.5 rounded-full bg-ok" /> Live
        </span>
      </header>
      <ul className="space-y-1.5">
        {signals.map((s) => (
          <li key={s.name} className="flex items-center gap-2.5 rounded-lg border border-line px-2.5 py-2">
            <span className="size-1.5 rounded-full bg-ok" />
            <span className="grid size-6 place-items-center">{s.logo}</span>
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block text-[0.75rem] font-medium">{s.name}</span>
              <span className="block truncate text-[0.625rem] text-muted">{s.sub}</span>
            </span>
            <ChevronRight className="size-3.5 text-faint" />
          </li>
        ))}
      </ul>
    </Panel>
  );
}

function WeeklySynthesis({ kpiCols = "grid-cols-[1.4fr_1fr_1fr_1fr]" }: { kpiCols?: string }) {
  const kpis = [
    { label: "Total Revenue", value: "$128,430", delta: "12%", up: true, line: [6, 5, 7, 6, 8, 7, 9, 8, 10, 11] },
    { label: "New Leads", value: "342", delta: "24%", up: true, line: [4, 5, 4, 6, 5, 7, 6, 8, 9, 10] },
    { label: "ROAS", value: "4.7x", delta: "9%", up: true, line: [5, 6, 5, 6, 7, 6, 7, 8, 8, 9] },
    { label: "CAC", value: "$52", delta: "11%", up: false, line: [8, 9, 7, 8, 6, 7, 5, 6, 7, 5] },
  ];
  const takeaways = [
    "Paid performance increased 22% week over week, driven by stronger conversion rates.",
    "Lead volume grew by 34%, with significant lift from organic and referral sources.",
    "Invoice collection rate improved to 92%, reducing outstanding balance by $18K.",
  ];
  return (
    <Panel className="p-4">
      <header className="flex items-start gap-3">
        <FileText className="mt-0.5 size-[1.125rem] text-ink-2" />
        <span className="flex-1 leading-tight">
          <h3 className="text-[0.9375rem] font-medium">Weekly executive synthesis</h3>
          <span className="text-[0.6875rem] text-muted">AI-generated from your connected data</span>
        </span>
        <span className="flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-1 text-[0.6875rem] text-ink-2">
          Oct 14 – Oct 20, 2024 <ChevronDown className="size-3 text-muted" />
        </span>
      </header>

      <div className="mt-4 flex items-center gap-2.5">
        <span className="grid size-7 place-items-center rounded-md bg-ink text-[0.625rem] font-bold text-white">A</span>
        <span className="flex-1 text-[0.9375rem] font-medium">Acme &amp; Co.</span>
        <span className="flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-[0.6875rem] font-medium">
          View report <ArrowRight className="size-3" />
        </span>
      </div>

      <div className={`mt-3 grid gap-2 ${kpiCols}`}>
        {kpis.map((k) => (
          <div key={k.label} className="rounded-lg border border-line px-2.5 py-2">
            <span className="block text-[0.625rem] text-muted">{k.label}</span>
            <span className="block text-[1rem] font-semibold tabular-nums">{k.value}</span>
            <span className="mt-0.5 flex items-end justify-between gap-1">
              <span className={`flex items-center gap-0.5 text-[0.625rem] font-medium ${k.up ? "text-ok" : "text-lane"}`}>
                {k.up ? <ArrowUp className="size-2.5" /> : <ArrowDown className="size-2.5" />}
                {k.delta}
              </span>
              <Sparkline points={k.line} color={k.up ? "var(--bl-green)" : "var(--bl-red)"} />
            </span>
          </div>
        ))}
      </div>

      <h4 className="mt-4 text-[0.75rem] font-medium">Key takeaways</h4>
      <ul className="mt-2 space-y-1.5">
        {takeaways.map((t) => (
          <li key={t} className="flex items-start gap-2 text-[0.6875rem] text-ink-2">
            <span className="mt-[0.3125rem] size-1.5 shrink-0 rounded-full bg-[#9db4e8]" />
            {t}
          </li>
        ))}
      </ul>
    </Panel>
  );
}

function ApprovalQueue() {
  const items = [
    { title: "Client report (Acme & Co.)", sub: "Weekly executive report", date: "Oct 20, 2024", icon: <ChartColumn className="text-lane" />, tint: true },
    { title: "Invoice follow-up (8 clients)", sub: "Review and send follow-ups", date: "Oct 19, 2024", icon: <ReceiptText className="text-ink-2" /> },
    { title: "Lead follow-up (42 leads)", sub: "Review personalized emails", date: "Oct 19, 2024", icon: <UsersRound className="text-ink-2" /> },
  ];
  return (
    <Panel>
      <header className="mb-2 flex items-center gap-2 px-1">
        <ShieldCheck className="size-4 text-ink-2" />
        <h3 className="text-[0.8125rem] font-medium">Approval queue</h3>
        <span className="grid size-[1.125rem] place-items-center rounded-full bg-lane text-[0.625rem] font-semibold text-white">3</span>
        <ChevronRight className="ml-auto size-4 text-faint" />
      </header>
      <ul className="space-y-1.5">
        {items.map((it) => (
          <li key={it.title} className="flex items-center gap-2.5 rounded-lg border border-line px-2.5 py-2">
            <span
              className={`grid size-8 shrink-0 place-items-center rounded-lg [&_svg]:size-4 ${
                it.tint ? "bg-[var(--bl-red-tint)]" : "bg-surface"
              }`}
            >
              {it.icon}
            </span>
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block truncate text-[0.6875rem] font-medium">{it.title}</span>
              <span className="block truncate text-[0.625rem] text-muted">{it.sub}</span>
              <span className="block text-[0.625rem] text-faint">{it.date}</span>
            </span>
            <ChevronRight className="size-3.5 text-faint" />
          </li>
        ))}
      </ul>
    </Panel>
  );
}

/** The floating notification that overhangs the dashboard's bottom-right corner. */
function ApprovalToast({ className = "absolute -right-6 bottom-6" }: { className?: string }) {
  return (
    <div className={`${className} flex items-center gap-3 rounded-2xl border border-line bg-white/95 py-3 pl-3 pr-3 shadow-[0_1.25rem_3rem_-1rem_rgba(29,29,31,0.25)] backdrop-blur`}>
      <span className="grid size-10 place-items-center rounded-xl bg-[var(--bl-red-tint)] text-lane">
        <FileText className="size-5" />
      </span>
      <span className="mr-4 leading-tight">
        <span className="block text-[0.8125rem] font-medium">Client report ready for approval</span>
        <span className="block text-[0.6875rem] text-muted">Weekly executive report · Acme &amp; Co.</span>
      </span>
      <span className="rounded-lg border border-line px-3.5 py-2 text-[0.75rem] font-medium">Review</span>
      <span className="flex items-center gap-1.5 rounded-lg bg-lane px-3.5 py-2 text-[0.75rem] font-medium text-white">
        Approve <ArrowRight className="size-3.5" />
      </span>
    </div>
  );
}

/* ── Small pieces ───────────────────────────────────────── */

function Sparkline({ points, color }: { points: number[]; color: string }) {
  const w = 56;
  const h = 18;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const d = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - 2 - ((p - min) / (max - min || 1)) * (h - 4);
      return `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-[1.125rem] w-14" aria-hidden="true">
      <path d={d} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Simplified marks for the connected tools, drawn here so no third-party assets are bundled. */

function GoogleAdsLogo() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
      <path d="M9.2 3.5 2.6 15a3.3 3.3 0 1 0 5.7 3.3l6.6-11.5Z" fill="#fbbc04" />
      <path d="M14.8 3.5a3.3 3.3 0 0 0-5.7 3.3l6.6 11.5a3.3 3.3 0 1 0 5.7-3.3Z" fill="#4285f4" />
      <circle cx="5.4" cy="16.6" r="3.3" fill="#34a853" />
    </svg>
  );
}

function MetaLogo() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
      <path
        d="M4.5 16.5c-1.4 0-2.2-1.2-2.2-3 0-3 1.7-6 3.9-6 1.7 0 3 1.6 5.8 6.2 1.7 2.8 2.9 3.6 4.1 3.6 1.1 0 1.9-.9 1.9-2.6 0-2.7-1.4-5.8-3.3-5.8-1.5 0-2.7 1.7-4.4 4.6-1.9 3.2-3.5 3-5.8 3"
        fill="none"
        stroke="#0866ff"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HubSpotLogo() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
      <g fill="none" stroke="#ff7a59" strokeWidth="2" strokeLinecap="round">
        <circle cx="15" cy="14" r="3.6" />
        <path d="M15 10.4V5.5M13.6 4h2.8M12.2 16.4 7.5 20M12 11.6 5 6.5" />
      </g>
      <circle cx="4.6" cy="6.2" r="1.6" fill="#ff7a59" />
    </svg>
  );
}

function StripeLogo() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" fill="#635bff" />
      <path
        d="M13.9 9.5c-.6-.3-1.3-.5-2-.5-.7 0-1.1.2-1.1.6 0 1.1 3.9.6 3.9 3.4 0 1.4-1.2 2.4-3.1 2.4-.9 0-1.9-.2-2.6-.6v-1.9c.7.4 1.7.7 2.5.7.6 0 1-.2 1-.6 0-1.2-3.9-.7-3.9-3.4 0-1.4 1.1-2.4 3-2.4.8 0 1.6.1 2.3.4Z"
        fill="#fff"
      />
    </svg>
  );
}

function LookerLogo() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
      <circle cx="12" cy="15" r="5" fill="none" stroke="#4285f4" strokeWidth="2.4" />
      <circle cx="9.5" cy="5" r="2" fill="#34a853" />
      <circle cx="12" cy="15" r="1.6" fill="#4285f4" />
    </svg>
  );
}
