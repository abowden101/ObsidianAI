import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#010207",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: "ObsidianAI — Cinematic Zero-Trust Security Powered by Grok",
  description:
    "ObsidianAI delivers premium hospitality security with xAI Grok reasoning, autonomous response, and zero-trust posture orchestration.",
  metadataBase: new URL("https://obsidianai.org"),
  keywords: [
    "ObsidianAI",
    "zero trust",
    "xAI",
    "Grok",
    "hospitality security",
    "enterprise security",
    "cyber resilience",
  ],
  openGraph: {
    title: "ObsidianAI — Mission-Critical xAI Security",
    description:
      "A premium security platform for hospitality and enterprise, blending live Grok reasoning with zero-trust automation.",
    url: "https://obsidianai.org",
    siteName: "ObsidianAI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://obsidianai.org/og-image.png",
        width: 1200,
        height: 630,
        alt: "ObsidianAI cinematic platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ObsidianAI — Cinematic Zero-Trust Security",
    description:
      "ObsidianAI blends xAI Grok reasoning with hospitality automation and enterprise-grade security.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark bg-[#020203] text-white">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#020203] font-sans text-zinc-100 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
