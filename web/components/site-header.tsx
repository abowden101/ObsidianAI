"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight } from "lucide-react";

const navItems = [
  { href: "#capabilities", label: "Capabilities" },
  { href: "#use-cases", label: "Use Cases" },
  { href: "#trust", label: "Trust" },
  { href: "#deploy", label: "Deploy" },
];

export function SiteHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-2xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
        <Link href="#top" className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.28em] text-white">
          <span className="flex h-10 w-10 items-center justify-center rounded-3xl border border-cyan-400/15 bg-cyan-400/10 text-cyan-200">
            <ShieldCheck className="h-5 w-5" />
          </span>
          OBSDIANAI
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm uppercase tracking-[0.28em] text-slate-300 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="#deploy"
          className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2.5 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/15"
        >
          Launch demo
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.header>
  );
}
