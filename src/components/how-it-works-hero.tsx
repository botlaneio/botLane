import {
  ArrowRight,
  BarChart3,
  Box,
  Check,
  ChevronRight,
  Circle,
  FileCheck2,
  FileText,
  Home,
  LayoutGrid,
  Plus,
  Send,
  Settings,
  Sparkles,
  Users,
} from "lucide-react";
import {
  GmailLogo,
  GoogleAdsLogo,
  GoogleDriveLogo,
  HubSpotLogo,
  MetaAdsLogo,
} from "@/components/assemble/company-icons";

const TOOLS = [
  { name: "Google Ads", logo: <GoogleAdsLogo size={24} /> },
  { name: "Meta Ads", logo: <MetaAdsLogo size={24} /> },
  { name: "HubSpot", logo: <HubSpotLogo size={24} /> },
  { name: "Gmail", logo: <GmailLogo size={22} /> },
  { name: "Google Drive", logo: <GoogleDriveLogo size={22} /> },
];

const LANES = [
  {
    num: "01",
    title: "Client Reporting",
    short: ["Client", "Reporting"],
    status: "Generating weekly reports…",
    icon: FileText,
    tone: "bg-lane/10 text-lane",
    edge: "border-l-lane",
  },
  {
    num: "02",
    title: "Lead Intake",
    short: ["Lead", "Intake"],
    status: "Processing new leads…",
    icon: BarChart3,
    tone: "bg-blue-500/10 text-blue-600",
    edge: "border-l-blue-500",
  },
  {
    num: "03",
    title: "AR Recovery",
    short: ["AR", "Recovery"],
    status: "Drafting follow-ups…",
    icon: Box,
    tone: "bg-emerald-500/10 text-emerald-600",
    edge: "border-l-emerald-500",
  },
];

const ACTIVITY = [
  { logo: <GoogleAdsLogo size={18} />, title: "Weekly performance report drafted", lane: "Client Reporting", when: "2 min ago" },
  { logo: <GmailLogo size={16} />, title: "12 new leads analysed", lane: "Lead Intake", when: "8 min ago" },
  { logo: <GoogleDriveLogo size={16} />, title: "3 follow-up emails prepared", lane: "AR Recovery", when: "15 min ago" },
];

const SIDE_CARDS = [
  {
    label: "Lane 02 · Lead Intake",
    rows: [
      { title: "New lead from website", who: "Acme Corp", when: "2 min ago", done: false },
      { title: "Follow-up email draft", who: "Beta Systems", when: "12 min ago", done: false },
      { title: "Qualified and routed", who: "Orbit Retail", when: "28 min ago", done: false },
    ],
  },
  {
    label: "Lane 03 · AR Recovery",
    rows: [
      { title: "Invoice follow-up drafted", who: "Northside Co", when: "5 min ago", done: false },
      { title: "Payment reminder queued", who: "Riverside Ltd", when: "18 min ago", done: false },
      { title: "Marked as ready", who: "Summit Group", when: "34 min ago", done: true },
    ],
  },
];

const STATS = [
  { value: "3", label: "Dedicated lanes" },
  { value: "< 1s", label: "Average response" },
  { value: "100%", label: "Human approval" },
  { value: "Zero", label: "Manual spreadsheets" },
];

function Step({ num, title, children, text }: { num: string; title: string; children: React.ReactNode; text: string }) {
  return (
    <li className="flex gap-3.5 rounded-[20px] border border-line bg-white p-4 shadow-[0_4px_24px_rgba(20,20,40,0.04)] sm:gap-5 sm:p-6">
      <div className="flex flex-col items-center">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface text-sm font-semibold text-ink sm:size-11 sm:text-base">
          {num}
        </span>
        <span aria-hidden className="mt-3 w-px flex-1 border-l border-dashed border-line" />
      </div>
      <div className="min-w-0 flex-1">
        <h2 className="mt-2 text-base font-semibold sm:text-lg tracking-[-0.01em] text-ink">{title}</h2>
        <div className="mt-3 sm:mt-4">{children}</div>
        <p className="mt-3 max-w-[340px] text-sm leading-relaxed text-muted sm:mt-4 sm:text-[15px]">{text}</p>
      </div>
    </li>
  );
}

function Workspace() {
  return (
    <div aria-hidden className="pointer-events-none relative select-none [perspective:1800px]">
      <div className="relative w-[500px] [transform:rotateY(-10deg)_rotateX(4deg)_rotateZ(-2deg)] [transform-style:preserve-3d]">
        {/* stacked ghosts behind the main window */}
        <div className="absolute inset-0 translate-x-10 -translate-y-8 rounded-[20px] border border-line/60 bg-white/50" />
        <div className="absolute inset-0 translate-x-5 -translate-y-4 rounded-[20px] border border-line/70 bg-white/70" />
        <div className="absolute inset-0 -translate-x-3 translate-y-6 rounded-[20px] border border-line/50 bg-white/60" />

        <div className="relative overflow-hidden rounded-[20px] border border-line bg-white shadow-[0_40px_80px_-30px_rgba(20,20,40,0.25)]">
          <div className="flex items-center gap-4 border-b border-line px-5 py-3">
            <div className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-neutral-300" />
              <span className="size-2.5 rounded-full bg-neutral-300" />
              <span className="size-2.5 rounded-full bg-neutral-300" />
            </div>
            <span className="text-[12px] text-muted">workspace.botlane.ai</span>
            <span className="ml-auto flex items-center gap-1.5 text-[10px] text-muted">
              <span className="size-1.5 rounded-full bg-ok" />
              All systems connected
            </span>
          </div>

          <div className="flex">
            <div className="flex flex-col items-center gap-4 border-r border-line px-3 py-5 text-muted">
              <span className="flex size-9 items-center justify-center rounded-[10px] bg-lane text-white">
                <Home className="size-4" />
              </span>
              <LayoutGrid className="size-4" />
              <BarChart3 className="size-4" />
              <Users className="size-4" />
              <Settings className="size-4" />
            </div>

            <div className="flex-1 p-5">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-[12px] bg-lane/10 text-lane">
                  <Sparkles className="size-5" />
                </span>
                <div>
                  <div className="text-base font-semibold tracking-[-0.01em] text-ink">Your AI team is working</div>
                  <div className="text-[11px] text-muted">3 lanes · Connected tools · Human approval</div>
                </div>
              </div>

              <div className="mt-5 space-y-2.5">
                {LANES.map((lane) => {
                  const Icon = lane.icon;
                  return (
                    <div
                      key={lane.num}
                      className={`flex items-center gap-3 rounded-[12px] border border-line border-l-2 ${lane.edge} px-3 py-3`}
                    >
                      <span className={`flex size-9 items-center justify-center rounded-[10px] ${lane.tone}`}>
                        <Icon className="size-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-[13px] font-medium text-ink">
                          {lane.title} <span className="ml-1 text-[11px] font-normal text-muted">Lane {lane.num}</span>
                        </div>
                        <div className="text-[11px] text-muted">{lane.status}</div>
                      </div>
                      <span className="flex items-center gap-1 rounded-full bg-blue-500/5 px-2 py-0.5 text-[10px] text-blue-600">
                        <Circle className="size-2" strokeWidth={4} />
                        In progress
                      </span>
                      <ChevronRight className="size-4 text-faint" />
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 rounded-[12px] border border-line p-3">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-medium text-ink">Recent activity</span>
                  <span className="flex items-center gap-1 text-[10px] text-muted">
                    View all <ArrowRight className="size-3" />
                  </span>
                </div>
                <div className="mt-2 space-y-1">
                  {ACTIVITY.map((row) => (
                    <div key={row.title} className="flex items-center gap-3 py-1.5">
                      <span className="flex size-8 items-center justify-center rounded-[8px] border border-line">{row.logo}</span>
                      <div className="min-w-0 flex-1">
                        <div className="text-[11px] text-ink">{row.title}</div>
                        <div className="text-[10px] text-muted">{row.lane}</div>
                      </div>
                      <span className="size-1.5 rounded-full bg-ok" />
                      <span className="w-16 text-right text-[10px] text-muted">{row.when}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* lane cards floating off the right edge */}
        <div className="absolute top-4 -right-40 w-[210px] space-y-4 [transform:translateZ(40px)_rotateZ(-3deg)]">
          {SIDE_CARDS.map((card) => (
            <div key={card.label} className="rounded-[16px] border border-line bg-white p-3 shadow-[0_24px_50px_-24px_rgba(20,20,40,0.3)]">
              <div className="text-[10px] text-muted">{card.label}</div>
              <div className="mt-2 space-y-1.5">
                {card.rows.map((row) => (
                  <div key={row.title} className="flex items-center gap-2.5 rounded-[10px] border border-line p-2">
                    <span
                      className={`flex size-6 shrink-0 items-center justify-center rounded-full ${
                        row.done ? "bg-ok/15 text-ok" : "bg-surface text-ink"
                      }`}
                    >
                      {row.done ? <Check className="size-3.5" /> : <Circle className="size-3" strokeWidth={3} />}
                    </span>
                    <div className="min-w-0">
                      <div className="truncate text-[11px] font-medium text-ink">{row.title}</div>
                      <div className="text-[10px] text-muted">{row.who}</div>
                      <div className="text-[10px] text-faint">{row.when}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function HowItWorksHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-[1200px] items-start gap-14 px-6 pt-12 pb-20 sm:pt-16 xl:grid-cols-[minmax(0,500px)_minmax(0,1fr)] xl:gap-16">
        <div>
          <div className="inline-flex rounded-[8px] bg-surface px-3 py-1.5 font-mono text-[12px] uppercase tracking-[0.14em] text-ink-2">
            How it works
          </div>
          <h1 className="mt-5 text-[clamp(40px,5.2vw,68px)] font-bold leading-[0.98] tracking-[-0.045em] text-ink">
            From noise to approved work.
          </h1>
          <p className="mt-5 max-w-[480px] text-lg leading-relaxed text-muted">
            Connected signals, AI employees, human approval. That&apos;s it.
          </p>

          <ol className="mt-9 space-y-4">
            <Step
              num="01"
              title="Your data comes in"
              text="We connect to your existing tools (Google Ads, CRM, inbox, drive, etc.)."
            >
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {TOOLS.map((tool) => (
                  <span
                    key={tool.name}
                    title={tool.name}
                    className="flex size-9 items-center justify-center rounded-[10px] border border-line bg-white sm:size-12 sm:rounded-[12px] [&>svg]:size-5 sm:[&>svg]:size-6"
                  >
                    {tool.logo}
                    <span className="sr-only">{tool.name}</span>
                  </span>
                ))}
                <span className="flex size-9 items-center justify-center rounded-[10px] border border-line bg-white text-muted sm:size-12 sm:rounded-[12px]">
                  <Plus className="size-4 sm:size-5" />
                  <span className="sr-only">and more</span>
                </span>
              </div>
            </Step>

            <Step
              num="02"
              title="Agent Lane does the work"
              text="Your three AI lanes analyse, draft and prepare outputs."
            >
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {LANES.map((lane) => {
                  const Icon = lane.icon;
                  return (
                    <span key={lane.num} className="flex items-center gap-2 rounded-[12px] border border-line bg-white py-1.5 pr-2.5 pl-1.5 sm:gap-2.5 sm:pr-3">
                      <span className={`flex size-8 items-center justify-center rounded-[10px] sm:size-9 ${lane.tone}`}>
                        <Icon className="size-4" />
                      </span>
                      <span className="text-[11px] sm:text-[12px] leading-tight text-muted">
                        {lane.short[0]}
                        <br />
                        {lane.short[1]}
                      </span>
                    </span>
                  );
                })}
              </div>
            </Step>

            <Step
              num="03"
              title="You approve and it’s delivered"
              text="Review, approve in one click, and the work is pushed to your channels."
            >
              <div className="flex items-center gap-3 text-faint sm:gap-4">
                <span className="flex size-10 items-center justify-center rounded-[12px] sm:size-12 border border-line bg-white text-ink">
                  <FileCheck2 className="size-5" />
                  <span className="sr-only">Review</span>
                </span>
                <ArrowRight className="size-4" />
                <span className="flex size-10 items-center justify-center rounded-[12px] sm:size-12 bg-lane/10">
                  <span className="flex size-6 items-center justify-center rounded-full bg-lane text-white">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  <span className="sr-only">Approve</span>
                </span>
                <ArrowRight className="size-4" />
                <span className="flex size-10 items-center justify-center rounded-[12px] sm:size-12 border border-line bg-white text-ink">
                  <Send className="size-5" />
                  <span className="sr-only">Deliver</span>
                </span>
              </div>
            </Step>
          </ol>

        </div>

        <div className="xl:pt-24">
          <div className="hidden xl:block">
            <Workspace />
          </div>
          <dl className="grid grid-cols-4 xl:mt-20">
            {STATS.map((stat) => (
              <div key={stat.label} className="border-l border-line pl-2.5 sm:pl-5">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-[22px] font-bold leading-none sm:text-[34px] tracking-[-0.03em] text-ink">{stat.value}</dd>
                <dd className="mt-1.5 text-[11px] leading-tight text-muted sm:mt-2 sm:text-sm">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
