import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { SignUpForm } from "@/components/auth/auth-forms";
import { SignUpIllustration } from "@/components/auth/auth-illustrations";

export const metadata: Metadata = {
  title: "Create Account | BotLane",
  description: "Create your BotLane workspace.",
};

export default function SignUpPage() {
  return (
    <AuthShell
      switchPrompt="Already have an account?"
      switchLabel="Sign in"
      switchHref="/signin"
      title={
        <>
          Get started with
          <br />
          BotLane.
        </>
      }
      subtitle={
        <>
          Three operational lanes. Zero congestion.
          <br />
          Set up your workspace in minutes.
        </>
      }
      form={<SignUpForm />}
      aside={<SignUpIllustration />}
    />
  );
}
