import type { Metadata } from "next";
import { AuthSplit } from "@/components/auth/auth-split";
import { SignInForm } from "@/components/auth/auth-forms";
import { ORB_EMBER } from "@/components/auth/living-orb";

export const metadata: Metadata = {
  title: "Sign In | BotLane",
  description: "Sign in to your BotLane workspace.",
};

/** Split sign-in: the form on the left, the graphite orb panel on the right. */
export default function SignInPage() {
  return (
    <AuthSplit
      panelSide="right"
      title="Sign in to botLane"
      form={<SignInForm />}
      switchLink={{ label: "Sign up", href: "/signup" }}
      panel={{
        eyebrow: "Agent Lane",
        eyebrowClassName: "text-[#ff8a6b]",
        heading: "Your newest hire is already at work",
        body: "Client reporting, lead follow-up and invoice follow-up, drafted by Lane. You just approve.",
        cta: { label: "Book a demo", href: "/demo" },
        orbStops: ORB_EMBER,
      }}
    />
  );
}
