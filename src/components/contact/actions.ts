"use server";

import { CONTACT_INTERESTS } from "./interests";

// Contact messages go to a Google Sheet through the same kind of Apps Script web app
// the partner form uses (see integrations/google-sheets/README.md).
// If CONTACT_SHEET_WEBHOOK_URL and CONTACT_SHEET_SECRET are set, messages go to that sheet.
// Until then they land in the partner sheet, marked "Contact form" in the Website column
// with the chosen topic in the Clients column, so nothing is lost.

export type ContactFormState = {
  status: "idle" | "ok" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "company" | "interest", string>>;
};


const FAILED = "We couldn’t send your message just now. Please try again shortly.";

function text(formData: FormData, key: string, max = 200) {
  const v = formData.get(key);
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function submitContactMessage(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Honeypot: real people never see or fill this field.
  if (text(formData, "company_url")) return { status: "ok" };

  const entry = {
    name: text(formData, "name", 120),
    email: text(formData, "email", 200),
    company: text(formData, "company", 160),
    interest: text(formData, "interest", 40),
    message: text(formData, "message", 1500),
  };

  const fieldErrors: ContactFormState["fieldErrors"] = {};
  if (!entry.name) fieldErrors.name = "Please add your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(entry.email)) fieldErrors.email = "Please add a valid email.";
  if (!entry.company) fieldErrors.company = "Please add your company.";
  if (!CONTACT_INTERESTS.includes(entry.interest)) fieldErrors.interest = "Please pick a topic.";
  if (Object.keys(fieldErrors).length) {
    return { status: "error", message: "A few details need a look.", fieldErrors };
  }

  const ownSheet = process.env.CONTACT_SHEET_WEBHOOK_URL && process.env.CONTACT_SHEET_SECRET;
  const url = ownSheet ? process.env.CONTACT_SHEET_WEBHOOK_URL : process.env.PARTNER_SHEET_WEBHOOK_URL;
  const secret = ownSheet ? process.env.CONTACT_SHEET_SECRET : process.env.PARTNER_SHEET_SECRET;
  if (!url || !secret) {
    console.error("[contact] no sheet webhook is configured");
    return { status: "error", message: FAILED };
  }

  const payload = ownSheet
    ? entry
    : {
        name: entry.name,
        agency: entry.company,
        email: entry.email,
        website: "Contact form",
        clients: entry.interest,
        message: entry.message,
      };

  try {
    // Apps Script answers a POST with a redirect to the result; fetch follows it.
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ secret, source: "botlane.io/company/contact", ...payload }),
      redirect: "follow",
      signal: AbortSignal.timeout(10_000),
    });
    const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
    if (!res.ok || !data?.ok) {
      console.error("[contact] sheet rejected the entry", res.status, data?.error);
      return { status: "error", message: FAILED };
    }
  } catch (err) {
    console.error("[contact] could not reach the sheet", err);
    return { status: "error", message: FAILED };
  }

  return { status: "ok" };
}
