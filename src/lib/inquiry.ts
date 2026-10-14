import { z } from "zod";
import { solutionSlugs } from "@/content/solutions";

// Assessment requests: validation, spam checks and delivery. Shared by the server action and tests.
// Delivery goes to INQUIRY_WEBHOOK_URL (full payload). Until that is set, requests go to the existing
// partner Google Sheet (integrations/google-sheets), mapped onto its columns, so nothing is lost.

export const ROLES = ["Founder or owner", "Operations", "Agency lead", "Other"] as const;
export const SIZES = ["1–10", "11–50", "51–200", "200+"] as const;
export const WORKFLOWS: [string, ...string[]] = ["other", ...solutionSlugs];
export const PROCESS_MAX = 1000;
const MIN_FILL_MS = 3000;

export const assessmentSchema = z.object({
  name: z.string().trim().min(1, "Please add your name.").max(120),
  email: z.string().trim().email("Please add a valid work email.").max(200),
  company: z.string().trim().min(1, "Please add your company.").max(160),
  role: z.enum(ROLES, { errorMap: () => ({ message: "Please pick your role." }) }),
  size: z.enum(SIZES, { errorMap: () => ({ message: "Please pick a company size." }) }),
  workflow: z.enum(WORKFLOWS, { errorMap: () => ({ message: "Please pick a workflow." }) }),
  process: z.string().trim().max(PROCESS_MAX, `Please keep this under ${PROCESS_MAX} characters.`).default(""),
  consent: z.literal("on", { errorMap: () => ({ message: "Please agree so we can contact you." }) }),
});

export type Assessment = z.infer<typeof assessmentSchema>;

export type FormState = {
  status: "idle" | "ok" | "error";
  message?: string;
  fieldErrors?: Partial<Record<keyof Assessment, string>>;
  values?: Record<string, string>;
  firstName?: string;
};

type Deps = { fetch: typeof fetch; now: () => number };

const FAILED = "We couldn't send your request just now. Your answers are still here, so please try again.";
const FIELDS = ["name", "email", "company", "role", "size", "workflow", "process", "consent"] as const;
const ATTRIBUTION = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "landing", "referrer"] as const;

function str(fd: FormData, key: string, max = 2000) {
  const v = fd.get(key);
  return typeof v === "string" ? v.slice(0, max) : "";
}

export async function handleAssessment(fd: FormData, deps: Deps = { fetch, now: Date.now }): Promise<FormState> {
  const values = Object.fromEntries(FIELDS.map((k) => [k, str(fd, k)]));

  // Bots: a filled honeypot or an impossibly fast submission gets a normal-looking "ok" and is dropped.
  const started = Number(str(fd, "t"));
  if (str(fd, "company_url") || (Number.isFinite(started) && started > 0 && deps.now() - started < MIN_FILL_MS)) {
    return { status: "ok" };
  }

  const parsed = assessmentSchema.safeParse({ ...values, consent: values.consent || undefined });
  if (!parsed.success) {
    const fieldErrors: FormState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof Assessment;
      fieldErrors[key] ??= issue.message;
    }
    return { status: "error", message: "A few details need a look.", fieldErrors, values };
  }

  const attribution = Object.fromEntries(ATTRIBUTION.map((k) => [k, str(fd, k, 300)]).filter(([, v]) => v));
  const delivered = await deliverInquiry("assessment", { ...parsed.data, attribution }, deps.fetch);
  if (!delivered) return { status: "error", message: FAILED, values };
  return { status: "ok", firstName: parsed.data.name.split(/\s+/)[0] };
}

export async function deliverInquiry(
  kind: "assessment",
  entry: Assessment & { attribution: Record<string, string> },
  fetchImpl: typeof fetch = fetch,
): Promise<boolean> {
  const own = process.env.INQUIRY_WEBHOOK_URL && process.env.INQUIRY_WEBHOOK_SECRET;
  const url = own ? process.env.INQUIRY_WEBHOOK_URL : process.env.PARTNER_SHEET_WEBHOOK_URL;
  const secret = own ? process.env.INQUIRY_WEBHOOK_SECRET : process.env.PARTNER_SHEET_SECRET;
  if (!url || !secret) {
    console.error("[inquiry] no webhook is configured");
    return false;
  }

  const source = Object.entries(entry.attribution)
    .map(([k, v]) => `${k}=${v}`)
    .join(" ");
  const payload = own
    ? { kind, ...entry }
    : {
        // Partner sheet columns: Name, Agency, Email, Website, Clients, Message
        name: entry.name,
        agency: entry.company,
        email: entry.email,
        website: `Assessment: ${entry.workflow}`,
        clients: `${entry.role}, ${entry.size}`,
        message: [entry.process, source && `[${source}]`].filter(Boolean).join("\n\n"),
      };

  try {
    const res = await fetchImpl(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ secret, source: "botlane.io/assessment", ...payload }),
      redirect: "follow",
      signal: AbortSignal.timeout(10_000),
    });
    const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
    if (!res.ok || !data?.ok) {
      console.error("[inquiry] webhook rejected the entry", res.status, data?.error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[inquiry] webhook unreachable", err);
    return false;
  }
}
