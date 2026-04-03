"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

const heroHighlights = [
  "End-to-end zero-trust orchestration",
  "Live Grok reasoning for threat context",
  "Hospitality-safe automation and incident continuity",
];

export function Hero() {
  return (
    <section id="top" className="relative px-6 pt-24 pb-20 sm:px-8 lg:px-10 lg:pt-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.85, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-950/75 p-8 shadow-[0_60px_120px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.12),transparent_26%),radial-gradient(circle_at_bottom_right,_rgba(165,180,252,0.08),transparent_24%)]" />
          <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="relative">
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm uppercase tracking-[0.28em] text-cyan-200">
                <ShieldCheck className="h-4 w-4" />
                Mission-critical xAI security
              </div>
              <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
                Real-Time Zero-Trust Security. Powered by Grok.
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                ObsidianAI is the premium hospitality security platform for teams that need cinematic trust, intelligent automation, and enterprise-grade event response.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  href="#deploy"
                  className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-950 transition hover:bg-cyan-300"
                >
                  Schedule assessment
                </Link>
                <Link
                  href="#capabilities"
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-slate-950/60 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-slate-900/60"
                >
                  Explore capabilities
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#06111b]/95 p-7 shadow-[0_30px_90px_rgba(0,0,0,0.38)]">
              <div className="mb-4 flex items-center justify-between gap-3 rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-300">
                <span>Live reasoning</span>
                <span className="rounded-full bg-cyan-400/15 px-3 py-1 text-xs uppercase tracking-[0.28em] text-cyan-100">
                  Active
                </span>
              </div>
              <div className="space-y-4">
                {heroHighlights.map((highlight) => (
                  <div key={highlight} className="rounded-3xl border border-white/10 bg-[#02070f]/95 p-5">
                    <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/80">Live feed</p>
                    <p className="mt-3 text-lg font-semibold text-white">{highlight}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-black/50 p-5">
                  <p className="text-xs uppercase tracking-[0.32em] text-slate-500">Response time</p>
                  <p className="mt-3 text-3xl font-semibold text-white">1.2s</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-black/50 p-5">
                  <p className="text-xs uppercase tracking-[0.32em] text-slate-500">Alert fidelity</p>
                  <p className="mt-3 text-3xl font-semibold text-white">99.8%</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
