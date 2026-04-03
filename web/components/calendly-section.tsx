"use client";

import { motion } from "framer-motion";
import { CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { publicConfig } from "@/lib/public-config";

const calendlyUrl = publicConfig.calendlyUrl;

export function CalendlySection() {
  return (
    <section id="deploy" className="scroll-mt-24 px-6 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/80">
              Deployment readiness
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Start the first $97 audit and deploy premium security fast.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              ObsidianAI is built for fast launch, high-trust visibility, and deep operational automation across hospitality estates.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.75rem] border border-white/10 bg-[#01101b]/90 p-6">
                <p className="text-xs uppercase tracking-[0.32em] text-cyan-300/80">Fast audit</p>
                <p className="mt-4 text-xl font-semibold text-white">$97 initial assessment</p>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-[#01101b]/90 p-6">
                <p className="text-xs uppercase tracking-[0.32em] text-cyan-300/80">Live continuity</p>
                <p className="mt-4 text-xl font-semibold text-white">Grok reasoning + zero-trust automation</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[2rem] border border-white/10 bg-[#02050d]/95 p-8 shadow-[0_40px_120px_rgba(0,0,0,0.4)]"
          >
            <div className="mb-6 flex items-center gap-3 text-cyan-300">
              <CalendarClock className="h-6 w-6" />
              <span className="font-mono text-sm uppercase tracking-[0.32em]">Schedule assessment</span>
            </div>
            <p className="mb-6 text-sm leading-7 text-slate-400">
              Book a quick discovery call or launch your first paid audit. If Calendly is not configured, email our team directly.
            </p>
            {calendlyUrl ? (
              <Button
                asChild
                className="w-full rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-950 hover:bg-cyan-300"
              >
                <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">
                  Book assessment
                </a>
              </Button>
            ) : (
              <Button
                asChild
                className="w-full rounded-full bg-slate-950/60 px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white hover:bg-slate-900/60"
              >
                <a href="mailto:team@obsidianai.org?subject=ObsidianAI%20assessment">Email team@obsidianai.org</a>
              </Button>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
