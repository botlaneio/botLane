import type { Metadata } from "next";
import { LegalPage, ToConfirm } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms of service — BotLane",
  description: "The terms that apply when you use botlane.io and Lane.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of service"
      updated="Draft, October 2026"
      intro={<p>These terms cover your use of botlane.io and of Lane, the service provided by BotLane LLC.</p>}
      sections={[
        { id: "agreement", title: "The agreement", body: <p>Who the terms are between, and when they apply. <ToConfirm>governing entity details</ToConfirm></p> },
        {
          id: "the-service",
          title: "The service",
          body: (
            <p>
              Lane prepares client reports, lead follow-ups and invoice reminders using the tools you connect, and asks for your
              approval before anything is sent. <ToConfirm>service description and availability</ToConfirm>
            </p>
          ),
        },
        {
          id: "your-responsibilities",
          title: "Your responsibilities",
          body: (
            <p>
              You are responsible for the accounts you connect and for what you approve. <ToConfirm>acceptable use</ToConfirm>
            </p>
          ),
        },
        { id: "fees", title: "Fees and billing", body: <p><ToConfirm>retainer, billing cycle, taxes and cancellation</ToConfirm></p> },
        { id: "data", title: "Your data", body: <p>How we handle data is set out in the privacy policy. <ToConfirm>data processing terms</ToConfirm></p> },
        { id: "liability", title: "Warranties and liability", body: <p><ToConfirm>disclaimers and limits of liability</ToConfirm></p> },
        { id: "ending", title: "Ending the agreement", body: <p><ToConfirm>termination and what happens to your data</ToConfirm></p> },
        { id: "changes", title: "Changes to these terms", body: <p><ToConfirm>how changes are notified</ToConfirm></p> },
        { id: "contact", title: "Contact us", body: <p><ToConfirm>legal contact details</ToConfirm></p> },
      ]}
    />
  );
}
