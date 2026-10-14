import type { Metadata } from "next";
import { UiPreview } from "./preview";

export const metadata: Metadata = {
  title: "UI components | BotLane",
  robots: { index: false },
};

export default function UiPreviewPage() {
  return <UiPreview />;
}
