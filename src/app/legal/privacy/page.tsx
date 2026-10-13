import type { Metadata } from "next";
import { LegalPage, ToConfirm } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy policy — BotLane",
  description: "How BotLane collects, uses and protects personal information.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      updated="Draft, October 2026"
      intro={
        <p>
          This policy explains what personal information BotLane LLC collects through botlane.io and through Lane, why we collect it,
          and the choices you have.
        </p>
      }
      sections={[
        {
          id: "who-we-are",
          title: "Who we are",
          body: (
            <p>
              BotLane LLC runs botlane.io and provides Lane. <ToConfirm>registered address and privacy contact email</ToConfirm>
            </p>
          ),
        },
        {
          id: "what-we-collect",
          title: "What we collect",
          body: (
            <>
              <p>
                From the website: the details you give us in forms, such as your name, business, work email and website when you
                apply to the partner programme or book a demo.
              </p>
              <p>
                From customers: the information Lane needs to do the work you ask for, from the tools you connect.{" "}
                <ToConfirm>the categories of data for each system</ToConfirm>
              </p>
            </>
          ),
        },
        {
          id: "how-we-use-it",
          title: "How we use it",
          body: (
            <p>
              To reply to you, to provide and support Lane, and to keep the service secure. Lane prepares work for your approval and
              does not send on your behalf until you approve. <ToConfirm>legal bases, if serving the UK or EU</ToConfirm>
            </p>
          ),
        },
        {
          id: "who-we-share-with",
          title: "Who we share it with",
          body: (
            <p>
              Service providers that help us run BotLane, such as hosting and email. We do not sell personal information.{" "}
              <ToConfirm>list of sub-processors</ToConfirm>
            </p>
          ),
        },
        {
          id: "retention",
          title: "How long we keep it",
          body: (
            <p>
              <ToConfirm>retention periods for form submissions and customer data</ToConfirm>
            </p>
          ),
        },
        {
          id: "your-rights",
          title: "Your choices and rights",
          body: (
            <p>
              You can ask to see, correct or delete your information. <ToConfirm>how to make a request, and rights by region</ToConfirm>
            </p>
          ),
        },
        {
          id: "cookies",
          title: "Cookies",
          body: (
            <p>
              <ToConfirm>which cookies and analytics the site uses</ToConfirm> A separate cookie policy will follow.
            </p>
          ),
        },
        {
          id: "contact",
          title: "Contact us",
          body: (
            <p>
              <ToConfirm>privacy contact email and postal address</ToConfirm>
            </p>
          ),
        },
      ]}
    />
  );
}
