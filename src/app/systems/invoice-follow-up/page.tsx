import type { Metadata } from "next";
import { SystemPage } from "@/components/system-page";
import { systemBySlug } from "@/content/systems";

const system = systemBySlug("invoice-follow-up");

export const metadata: Metadata = {
  title: `${system.title} — BotLane`,
  description: system.summary,
};

export default function Page() {
  return <SystemPage system={system} />;
}
