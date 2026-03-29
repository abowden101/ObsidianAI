"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";

const links = [
  { href: "#pricing", label: "Pricing" },
  { href: "#demo", label: "Book demo" },
  { href: "#grok", label: "Live Grok" },
  { href: "mailto:team@obsidianai.org", label: "Contact", external: true },
] as const;

export function SiteHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="fixed top-0 z-50 w-full border-b border-zinc-800/80 bg-[#050608]/85 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight text-zinc-100">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-500/40 bg-cyan-500/10">
            <Shield className="h-4 w-4 text-cyan-400" aria-hidden />
          </span>
          ObsidianAI
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) =>
            "external" in l && l.external ? (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-zinc-400 transition-colors hover:text-cyan-300"
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-zinc-400 transition-colors hover:text-cyan-300"
              >
                {l.label}
              </Link>
            )
          )}
        </nav>
        <Link
          href="#pricing"
          className="rounded-md border border-cyan-500/50 bg-cyan-500/10 px-3 py-1.5 text-sm font-medium text-cyan-200 transition hover:bg-cyan-500/20"
        >
          Get started
        </Link>
      </div>
    </motion.header>
  );
}
