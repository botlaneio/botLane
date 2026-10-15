import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Makes relative sharing and canonical links absolute (https://botlane.io/...).
  metadataBase: new URL("https://botlane.io"),
  title: "botLane",
  description:
    "Lane runs client reporting, lead follow-up and invoice follow-up for you. You just approve.",
  openGraph: {
    title: "botLane",
    description:
      "Lane runs client reporting, lead follow-up and invoice follow-up for you. You just approve.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-surface="light" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-full bg-bg text-ink">{children}</body>
    </html>
  );
}
