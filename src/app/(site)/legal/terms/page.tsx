import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ArrowLeft } from "lucide-react";

export const metadata: Metadata = { title: "Terms of Service", description: "The terms that govern use of BotLane services." };

export default function TermsOfServicePage() {
  return (
    <>
      
      <div className="page-top pb-24">
        <div className="mx-auto max-w-[53.75rem] px-6 ">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-muted hover:text-ink transition mb-8"
          >
            <ArrowLeft size={13} />
            <span>Back to BotLane home</span>
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-lane">
            <FileText size={12} />
            <span>Legal Documentation</span>
          </div>

          <h1 className="mt-4 text-[clamp(2rem,4.5vw,3.25rem)] font-bold tracking-tight text-ink">
            Terms of Service
          </h1>

          <div className="mt-2 text-xs font-mono text-muted">
            Effective Date: October 13, 2026 · Version 2.4
          </div>

          <div className="mt-8 rounded-[1rem] border border-line bg-white p-4.5 text-xs text-ink-2 shadow-sm">
            <strong className="text-ink">Operational Governance Notice:</strong> BotLane provides software that assists in the
            preparation, calculation, and drafting of business communications. By using the Service, you acknowledge that you or
            an authorized member of your team retains ultimate editorial discretion over all client reports, lead replies, and payment
            reminders prior to execution.
          </div>

          <div className="mt-10 space-y-10 text-sm leading-relaxed text-ink-2">
            <section>
              <h2 className="text-lg font-bold text-ink">1. Acceptance & Description of Service</h2>
              <p className="mt-2 text-muted">
                These Terms of Service (&quot;Terms&quot;) govern your access to and use of the software, websites, and APIs provided by
                BotLane LLC (&quot;BotLane&quot;, &quot;we&quot;, &quot;our&quot;). By registering for an account, deploying an integration, or paying a subscription
                retainer, you agree to be bound by these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-ink">2. The Human-in-the-Loop Operational Model</h2>
              <p className="mt-2 text-muted">
                BotLane&apos;s software (&quot;Lane&quot;) functions as an autonomous preparatory coworker. Lane extracts data from authorized
                third-party platforms, synthesizes analytics, drafts written prose, and places items in an approval queue:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 mt-2 text-xs text-muted">
                <li>
                  <strong>Approval Authority:</strong> You are responsible for reviewing all generated deliverables (reports, emails, invoices)
                  prior to triggering the dispatch command.
                </li>
                <li>
                  <strong>Accuracy of Connected Data:</strong> BotLane relies upon the accuracy and timeliness of data retrieved via third-party
                  APIs (Google Ads, Meta, Stripe, QuickBooks). We are not liable for third-party upstream API outages or discrepancies.
                </li>
                <li>
                  <strong>Autopilot Opt-In:</strong> If you explicitly configure automated dispatch rules (bypassing manual review for specific
                  low-risk workflows), you accept responsibility for actions taken within your defined rule parameters.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-ink">3. Subscription Retainers, Billing & Refunds</h2>
              <div className="mt-2 space-y-2 text-muted">
                <p>
                  <strong>Monthly Retainer:</strong> Services are billed in advance on a recurring monthly basis. Retainers include unlimited
                  automated runs and unlimited team seats as defined in your plan tier.
                </p>
                <p>
                  <strong>30-Day Money-Back Guarantee:</strong> New customers are entitled to a full 100% refund of their first monthly retainer
                  if requested within thirty (30) calendar days of the initial subscription date.
                </p>
                <p>
                  <strong>Cancellation:</strong> You may cancel your subscription at any time via your billing dashboard. Cancellation takes
                  effect at the end of the current paid billing cycle.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-bold text-ink">4. Intellectual Property & Ownership of Work Product</h2>
              <p className="mt-2 text-muted">
                <strong>Your Content & Deliverables:</strong> As between you and BotLane, you own all rights, title, and interest in and to
                the deliverables generated for your clients, including reports, email copy, analytical charts, and brand assets.
              </p>
              <p className="mt-2 text-muted">
                <strong>BotLane Technology:</strong> BotLane retains all intellectual property rights in our proprietary algorithms, agent
                orchestration frameworks, user interfaces, and brand marks.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-ink">5. Service Level Agreement & Availability</h2>
              <p className="mt-2 text-muted">
                We target a 99.9% monthly uptime for our core orchestration APIs. Scheduled maintenance windows are communicated in advance.
                In the event of an unplanned disruption, our engineering team responds with priority resolution protocols.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-ink">6. Limitation of Liability</h2>
              <p className="mt-2 text-muted">
                To the maximum extent permitted by applicable law, BotLane LLC shall not be liable for any indirect, incidental, special,
                consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly. BotLane&apos;s
                total aggregate liability under these Terms shall not exceed the amounts paid by you to BotLane during the twelve (12) months
                preceding the claim.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-ink">7. Governing Law & Dispute Resolution</h2>
              <p className="mt-2 text-muted">
                These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its
                conflict of law provisions. Any dispute arising out of or relating to these Terms shall be resolved through confidential,
                binding arbitration in San Francisco, California.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-ink">8. Contact Information</h2>
              <p className="mt-2 text-muted">
                Questions about these Terms may be directed to:
              </p>
              <div className="mt-3 rounded-[0.75rem] border border-line bg-surface/50 p-4 text-xs font-mono text-ink">
                BotLane LLC · Legal Department<br />
                Email: legal@botlane.io<br />
                Address: 548 Market St, Suite 89201, San Francisco, CA 94104
              </div>
            </section>
          </div>
        </div>
      </div>
      
    </>
  );
}
