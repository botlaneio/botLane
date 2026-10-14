import type { Metadata, Viewport } from "next";
import { Geist, Newsreader } from "next/font/google";
import { siteUrl, tagline } from "@/content/site";
import "./globals.css";

const sans = Geist({ variable: "--font-sans", subsets: ["latin"], display: "swap" });
const serif = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const description =
  "BotLane designs, runs and maintains AI workflows inside the tools you already use. Lane prepares the work. Nothing goes out until you approve it.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `BotLane · ${tagline}`, template: "%s · BotLane" },
  description,
  openGraph: { title: "BotLane", description, siteName: "BotLane", type: "website" },
  icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }, { url: "/favicon.ico" }] },
};

export const viewport: Viewport = { themeColor: "#ffffff", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
