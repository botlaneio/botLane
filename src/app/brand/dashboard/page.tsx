import type { Metadata } from "next";
import { AgentDashboard, AgentDashboardPhone, AgentDashboardTablet } from "@/components/dashboard/agent-dashboard";

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
      <div className="mx-auto mt-20 grid max-w-[90rem] grid-cols-[60rem_26rem] items-start gap-12">
        <AgentDashboardTablet />
        <AgentDashboardPhone />
      </div>
    </main>
  );
}
