import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: "#020203",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: "ObsidianAI — Zero-Trust Security Powered by xAI Grok",
  description:
    "Orlando-built zero-trust infrastructure intelligence powered by xAI Grok. Real-time threat analysis and hospitality operations automation.",
  metadataBase: new URL("https://obsidianai.org"),
  keywords: [
    "zero trust",
    "MSP",
    "Orlando",
    "hospitality security",
    "xAI",
    "Grok",
    "ObsidianAI",
  ],
  openGraph: {
    title: "ObsidianAI",
    description:
      "ZERO-TRUST. MAXIMUM TRUTH. BUILT IN ORLANDO. MSP + SaaS security for hospitality and enterprise.",
    url: "https://obsidianai.org",
    siteName: "ObsidianAI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ObsidianAI — Zero-Trust · xAI Grok",
    description:
      "Maximum truth infrastructure intelligence. Built in Orlando.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark bg-[#020203]">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#020203] font-sans text-zinc-100 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
