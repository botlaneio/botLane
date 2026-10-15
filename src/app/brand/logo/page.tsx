import type { Metadata } from "next";
import { LogoPreview } from "./preview";

export const metadata: Metadata = {
  title: "Logo system | BotLane",
  robots: { index: false },
};

export default function LogoPreviewPage() {
  return <LogoPreview />;
}
