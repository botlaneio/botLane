import { AuthView } from "@/components/auth-view";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In or Sign Up | BotLane",
  description: "Access your BotLane approval dashboard and delegate workflows with 100% human-in-the-loop oversight.",
};

export default function AuthPage() {
  return <AuthView initialMode="signin" />;
}
