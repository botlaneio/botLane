import type { Metadata } from "next";
import { AgentDashboard } from "@/components/dashboard/agent-dashboard";

export const metadata: Metadata = {
  title: "Dashboard component | BotLane",
  robots: { index: false },
};

export default function DashboardPreviewPage() {
  return (
    <main className="min-h-screen overflow-x-auto bg-[#f8f8f6] px-10 py-16">
      <div className="mx-auto min-w-[72rem] max-w-[82rem]">
        <AgentDashboard />
      </div>
    </main>
  );
}
