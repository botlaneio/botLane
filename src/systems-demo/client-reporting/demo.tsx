"use client";

import { DemoFunnel } from "@/modules/demo-funnel/funnel";
import { clientReportingDemo } from "./config";

/** Client boundary: the config holds icon components, which can't cross from a server page. */
export function ClientReportingDemo() {
  return <DemoFunnel config={clientReportingDemo} />;
}
