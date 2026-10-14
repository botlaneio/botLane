import { afterEach, describe, expect, it, vi } from "vitest";
import { calendarUrl, mailHref, whatsappHref } from "./contact";

afterEach(() => vi.unstubAllEnvs());

describe("contact links", () => {
  it("hides WhatsApp when no number is configured", () => {
    vi.stubEnv("NEXT_PUBLIC_WHATSAPP_NUMBER", "");
    expect(whatsappHref()).toBeNull();
  });

  it("builds a wa.me link from digits only", () => {
    vi.stubEnv("NEXT_PUBLIC_WHATSAPP_NUMBER", "+1 (555) 010-0000");
    expect(whatsappHref("Hi")).toBe("https://wa.me/15550100000?text=Hi");
  });

  it("hides email and calendar when unset or invalid", () => {
    vi.stubEnv("NEXT_PUBLIC_CONTACT_EMAIL", "not-an-email");
    vi.stubEnv("NEXT_PUBLIC_DEMO_CALENDAR_URL", "http://insecure.example");
    expect(mailHref()).toBeNull();
    expect(calendarUrl()).toBeNull();
  });
});
