// Contact details come from env vars. Anything unset returns null and its button is hidden,
// so the site never shows a placeholder number, address or booking link.

export const DEFAULT_WA_TEXT = "Hi BotLane, I'd like to talk about automating a workflow.";

export function whatsappHref(text: string = DEFAULT_WA_TEXT): string | null {
  const digits = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, "");
  if (digits.length < 7) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

export function contactEmail(): string | null {
  const email = (process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "").trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null;
}

export function mailHref(subject = "BotLane enquiry"): string | null {
  const email = contactEmail();
  return email ? `mailto:${email}?subject=${encodeURIComponent(subject)}` : null;
}

export function calendarUrl(): string | null {
  const url = (process.env.NEXT_PUBLIC_DEMO_CALENDAR_URL ?? "").trim();
  return /^https:\/\//.test(url) ? url : null;
}
