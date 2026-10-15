"use client";

import Link from "next/link";
import { ShieldCheck, Lock, ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function PrivacyPolicyPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-bg">
        <div className="mx-auto max-w-[53.75rem] px-6 py-16 sm:py-24">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-muted hover:text-ink transition mb-8"
          >
            <ArrowLeft size={13} />
            <span>Back to BotLane home</span>
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-lane">
            <Lock size={12} />
            <span>Legal Documentation</span>
          </div>

          <h1 className="mt-4 text-[clamp(2rem,4.5vw,3.25rem)] font-bold tracking-tight text-ink">
            Privacy Policy
          </h1>

          <div className="mt-2 text-xs font-mono text-muted">
            Effective Date: October 13, 2026 · Version 2.4
          </div>

          <div className="mt-8 rounded-[1rem] border border-emerald-500/20 bg-emerald-500/5 p-4.5 flex items-start gap-3 text-xs text-ink-2">
            <ShieldCheck size={18} className="text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-ink">Zero LLM Training Commitment:</strong> BotLane LLC does not use your agency&apos;s
              proprietary client data, financial transactions, ad account metrics, or email communications to train public,
              foundational, or third-party artificial intelligence models.
            </div>
          </div>

          <div className="mt-10 space-y-10 text-sm leading-relaxed text-ink-2">
            <section>
              <h2 className="text-lg font-bold text-ink">1. Introduction & Overview</h2>
              <p className="mt-2 text-muted">
                BotLane LLC (&quot;BotLane&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) provides autonomous workforce software for agencies
                and service businesses. This Privacy Policy outlines how we collect, process, isolate, and protect your information
                when you use our website (botlane.io), our web dashboard, and our integration connectors.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-ink">2. Data We Collect and Process</h2>
              <div className="mt-2 space-y-2 text-muted">
                <p>
                  <strong>Account & Contact Information:</strong> Name, professional email address, company name, billing details,
                  and Slack/team communication handles.
                </p>
                <p>
                  <strong>Connected Third-Party Integration Data:</strong> When you authorize BotLane via OAuth, we access read-only
                  or scoped operational data from connected platforms, including:
                </p>
                <ul className="list-disc pl-5 space-y-1 mt-1 text-xs">
                  <li>Advertising accounts (Google Ads, Meta Marketing API): Campaign spend, click-through rates, ROAS, conversions.</li>
                  <li>CRM systems (HubSpot, Typeform): Inbound form submissions, contact email, pipeline stages.</li>
                  <li>Financial ledgers (Stripe, QuickBooks Online, Plaid): Invoice numbers, payment statuses, aging balances.</li>
                  <li>Communication channels (Google Workspace / Gmail): Scoped draft generation and outbound send approval states.</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-bold text-ink">3. Human-in-the-Loop Isolation & Memory</h2>
              <p className="mt-2 text-muted">
                All data extracted from your connected tools is processed in isolated runtime environments strictly bounded by your
                tenant identifier. Lane generates deliverables (reports, emails, reminders) in draft state. Data remains resident in
                ephemeral cache until human review is executed or expired.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-ink">4. Security Standards & Encryption</h2>
              <p className="mt-2 text-muted">
                We employ defense-in-depth architectural safeguards:
              </p>
              <ul className="list-disc pl-5 space-y-1 mt-2 text-xs text-muted">
                <li><strong>In Transit:</strong> All API communication and user interactions enforce TLS 1.3 with HSTS.</li>
                <li><strong>At Rest:</strong> Authentication tokens, credentials, and stored cache are encrypted using AES-256 keys managed by Cloud KMS.</li>
                <li><strong>Scope Minimization:</strong> We only request the minimum OAuth scopes necessary to compile the specific system deliverable.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-ink">5. Data Retention & Right to Erasure</h2>
              <p className="mt-2 text-muted">
                You retain complete ownership of your data at all times. Upon cancellation of your BotLane subscription or upon written
                request to privacy@botlane.io, all cached client records, integration tokens, and generated artifact logs are permanently
                and irreversibly deleted from our infrastructure within 48 hours.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-ink">6. Your Rights (GDPR & CCPA/CPRA)</h2>
              <p className="mt-2 text-muted">
                Regardless of your geographic location, BotLane extends comprehensive privacy protections, including the right to access,
                rectify, export in portable JSON format, or delete any personal information held in our systems.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-ink">7. Contact Our Data Protection Team</h2>
              <p className="mt-2 text-muted">
                For questions regarding this policy or to submit a data erasure request, contact our Data Protection Officer:
              </p>
              <div className="mt-3 rounded-[0.75rem] border border-line bg-surface/50 p-4 text-xs font-mono text-ink">
                BotLane LLC · Data Privacy Officer<br />
                Email: privacy@botlane.io<br />
                Address: 30 N Gould St, Ste R, Sheridan, WY 82801
              </div>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
