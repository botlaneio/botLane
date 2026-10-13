"use server";

// Partner applications go to a Google Sheet through a small Apps Script web app
// (see integrations/google-sheets/README.md). Two environment variables:
//   PARTNER_SHEET_WEBHOOK_URL  the Apps Script "Web app" URL (ends in /exec)
//   PARTNER_SHEET_SECRET       a shared secret the script checks

export type PartnerFormState = {
  status: "idle" | "ok" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"name" | "agency" | "email" | "clients", string>>;
};

const CLIENT_RANGES = ["1–5", "6–20", "21–50", "50+"];

function text(formData: FormData, key: string, max = 200) {
  const v = formData.get(key);
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function submitPartnerApplication(
  _prev: PartnerFormState,
  formData: FormData,
): Promise<PartnerFormState> {
  // Honeypot: real people never see or fill this field.
  if (text(formData, "company_url")) return { status: "ok" };

  const entry = {
    name: text(formData, "name", 120),
    agency: text(formData, "agency", 160),
    email: text(formData, "email", 200),
    website: text(formData, "website", 200),
    clients: text(formData, "clients", 20),
    message: text(formData, "message", 1500),
  };

  const fieldErrors: PartnerFormState["fieldErrors"] = {};
  if (!entry.name) fieldErrors.name = "Please add your name.";
  if (!entry.agency) fieldErrors.agency = "Please add your agency or business name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(entry.email)) fieldErrors.email = "Please add a valid email.";
  if (!CLIENT_RANGES.includes(entry.clients)) fieldErrors.clients = "Please pick a range.";
  if (Object.keys(fieldErrors).length) {
    return { status: "error", message: "A few details need a look.", fieldErrors };
  }

  const url = process.env.PARTNER_SHEET_WEBHOOK_URL;
  const secret = process.env.PARTNER_SHEET_SECRET;
  if (!url || !secret) {
    console.error("[partners] PARTNER_SHEET_WEBHOOK_URL or PARTNER_SHEET_SECRET is not set");
    return { status: "error", message: "We couldn’t send your application just now. Please try again shortly." };
  }

  try {
    // Apps Script answers a POST with a redirect to the result; fetch follows it.
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ secret, source: "botlane.io/partners", ...entry }),
      redirect: "follow",
      signal: AbortSignal.timeout(10_000),
    });
    const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
    if (!res.ok || !data?.ok) {
      console.error("[partners] sheet rejected the entry", res.status, data?.error);
      return { status: "error", message: "We couldn’t send your application just now. Please try again shortly." };
    }
  } catch (err) {
    console.error("[partners] could not reach the sheet", err);
    return { status: "error", message: "We couldn’t send your application just now. Please try again shortly." };
  }

  return { status: "ok" };
}
