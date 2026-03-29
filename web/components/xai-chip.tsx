"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

/** Factual attribution — text only, no third-party logos. */
export function XaiGrokChip() {
  return (
    <motion.a
      href="https://x.ai/"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.15, duration: 0.35 }}
      className="group inline-flex items-center gap-2 rounded-full border border-cyan-500/35 bg-cyan-950/40 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-cyan-200/95 shadow-[0_0_24px_-8px_rgba(34,211,238,0.5)] backdrop-blur-sm"
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-40" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
      </span>
      Inference · xAI Grok
      <ExternalLink className="h-3 w-3 opacity-60 transition group-hover:opacity-100" />
    </motion.a>
  );
}
