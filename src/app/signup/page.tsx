import type { Metadata } from "next";
import { AuthSplit } from "@/components/auth/auth-split";
import { SignUpForm } from "@/components/auth/auth-forms";
import { ORB_LILAC } from "@/components/auth/living-orb";

export const metadata: Metadata = {
  title: "Create Account | BotLane",
  description: "Create your BotLane workspace.",
};

/** Split sign-up, mirrored from sign-in: the graphite orb panel on the left, the form on the right. */
export default function SignUpPage() {
  return (
    <AuthSplit
      panelSide="left"
      title="Create your botLane account"
      form={<SignUpForm />}
      switchLink={{ label: "Sign in", href: "/signin" }}
      panel={{
        eyebrow: "Three lanes",
        eyebrowClassName: "text-[#bfb1f0]",
        heading: "Give your team its newest hire",
        body: "Client reporting, lead follow-up and invoice follow-up, with every send approved by you.",
        cta: { label: "See pricing", href: "/pricing" },
        orbStops: ORB_LILAC,
      }}
    />
  );
}
