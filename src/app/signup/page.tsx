import { AuthView } from "@/components/auth-view";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account | BotLane",
  description: "Create your BotLane account and configure your automated workflows.",
};

export default function SignUpPage() {
  return <AuthView initialMode="signup" />;
}
