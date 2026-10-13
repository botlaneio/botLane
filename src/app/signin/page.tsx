import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { SignInForm } from "@/components/auth/auth-forms";
import { SignInIllustration } from "@/components/auth/auth-illustrations";

export const metadata: Metadata = {
  title: "Sign In | BotLane",
  description: "Sign in to your BotLane workspace.",
};

export default function SignInPage() {
  return (
    <AuthShell
      switchPrompt="Don't have an account?"
      switchLabel="Sign up"
      switchHref="/signup"
      title="Welcome back."
      subtitle="Sign in to your workspace and keep your operations moving."
      form={<SignInForm />}
      aside={<SignInIllustration />}
    />
  );
}
