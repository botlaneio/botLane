import { AuthView } from "@/components/auth-view";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | BotLane",
  description: "Sign in to your BotLane account to manage approvals and workflows.",
};

export default function SignInPage() {
  return <AuthView initialMode="signin" />;
}
