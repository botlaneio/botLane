import type { Metadata } from "next";
import { MarkPlayground } from "./playground";

export const metadata: Metadata = {
  title: "Mark playground | BotLane",
  robots: { index: false },
};

export default function MarkPlaygroundPage() {
  return <MarkPlayground />;
}
