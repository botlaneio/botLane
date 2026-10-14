import { afterEach, describe, expect, it, vi } from "vitest";
import { handleAssessment } from "./inquiry";

const NOW = 1_800_000_000_000;

function form(overrides: Record<string, string | null> = {}) {
  const base: Record<string, string> = {
    name: "Ada Owner",
    email: "ada@example.com",
    company: "Example Co",
    role: "Founder or owner",
    size: "11–50",
    workflow: "invoice-follow-up",
    process: "We chase invoices by hand every Friday.",
    consent: "on",
    t: String(NOW - 20_000),
  };
  const fd = new FormData();
  for (const [k, v] of Object.entries({ ...base, ...overrides })) if (v !== null) fd.set(k, v);
  return fd;
}

afterEach(() => vi.unstubAllEnvs());

function okFetch() {
  return vi.fn(async () => new Response(JSON.stringify({ ok: true }), { status: 200 }));
}

describe("handleAssessment", () => {
  it("delivers a valid request", async () => {
    vi.stubEnv("INQUIRY_WEBHOOK_URL", "https://hooks.example/inquiry");
    vi.stubEnv("INQUIRY_WEBHOOK_SECRET", "s3cret");
    const fetch = okFetch();
    const res = await handleAssessment(form(), { fetch, now: () => NOW });
    expect(res.status).toBe("ok");
    expect(fetch).toHaveBeenCalledOnce();
    const body = JSON.parse((fetch.mock.calls[0] as unknown as [string, RequestInit])[1].body as string);
    expect(body).toMatchObject({ secret: "s3cret", kind: "assessment", company: "Example Co", workflow: "invoice-follow-up" });
  });

  it("requires consent and keeps the visitor's values", async () => {
    const fetch = okFetch();
    const res = await handleAssessment(form({ consent: null }), { fetch, now: () => NOW });
    expect(res.status).toBe("error");
    expect(res.fieldErrors?.consent).toBeTruthy();
    expect(res.values?.company).toBe("Example Co");
    expect(fetch).not.toHaveBeenCalled();
  });

  it("quietly drops honeypot submissions", async () => {
    const fetch = okFetch();
    const res = await handleAssessment(form({ company_url: "http://spam" }), { fetch, now: () => NOW });
    expect(res.status).toBe("ok");
    expect(fetch).not.toHaveBeenCalled();
  });

  it("quietly drops submissions made too fast to be human", async () => {
    const fetch = okFetch();
    const res = await handleAssessment(form({ t: String(NOW - 1_000) }), { fetch, now: () => NOW });
    expect(res.status).toBe("ok");
    expect(fetch).not.toHaveBeenCalled();
  });

  it("returns an error, not a crash, when delivery fails", async () => {
    vi.stubEnv("INQUIRY_WEBHOOK_URL", "https://hooks.example/inquiry");
    vi.stubEnv("INQUIRY_WEBHOOK_SECRET", "s3cret");
    const fetch = vi.fn(async () => {
      throw new Error("network down");
    });
    const res = await handleAssessment(form(), { fetch, now: () => NOW });
    expect(res.status).toBe("error");
    expect(res.values?.email).toBe("ada@example.com");
  });

  it("falls back to the partner sheet with a mapped payload", async () => {
    vi.stubEnv("INQUIRY_WEBHOOK_URL", "");
    vi.stubEnv("PARTNER_SHEET_WEBHOOK_URL", "https://script.example/exec");
    vi.stubEnv("PARTNER_SHEET_SECRET", "p");
    const fetch = okFetch();
    await handleAssessment(form(), { fetch, now: () => NOW });
    const body = JSON.parse((fetch.mock.calls[0] as unknown as [string, RequestInit])[1].body as string);
    expect(body).toMatchObject({ secret: "p", agency: "Example Co", website: "Assessment: invoice-follow-up" });
  });
});
