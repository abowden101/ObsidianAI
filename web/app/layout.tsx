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
  title: "Veritas Guard — Cinematic Zero-Trust Security Powered by Grok",
  description:
    "Veritas Guard delivers premium hospitality security with xAI Grok reasoning, autonomous response, and zero-trust posture orchestration.",
  metadataBase: new URL("https://veritasguard.org"),
  keywords: [
    "Veritas Guard",
    "zero trust",
    "xAI",
    "Grok",
    "hospitality security",
    "enterprise security",
    "cyber resilience",
  ],
  openGraph: {
    title: "Veritas Guard — Mission-Critical xAI Security",
    description:
      "A premium security platform for hospitality and enterprise, blending live Grok reasoning with zero-trust automation.",
    url: "https://veritasguard.org",
    siteName: "Veritas Guard",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://veritasguard.org/og-image.png",
        width: 1200,
        height: 630,
        alt: "Veritas Guard cinematic platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Veritas Guard — Cinematic Zero-Trust Security",
    description:
      "Veritas Guard blends xAI Grok reasoning with hospitality automation and enterprise-grade security.",
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
