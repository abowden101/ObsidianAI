"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Cpu, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { XaiGrokChip } from "@/components/xai-chip";
import { TiltFrame } from "@/components/tilt-frame";

export function Hero() {
  return (
    <section className="relative px-4 pb-16 pt-28 sm:px-6 lg:pt-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-start">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-center text-xs font-medium uppercase tracking-[0.25em] text-cyan-400/90 sm:text-left"
          >
            Network-aware intelligence
          </motion.p>
          <XaiGrokChip />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.22 }}
            className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700/90 bg-zinc-900/60 px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-zinc-400"
          >
            <Cpu className="h-3 w-3 text-cyan-500/80" />
            Neural routing layer
          </motion.span>
        </div>
        <TiltFrame intensity={2} className="relative">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-center font-mono text-4xl font-bold leading-[1.08] tracking-tight text-zinc-50 sm:text-left sm:text-5xl md:text-6xl"
            style={{ transform: "translateZ(24px)" }}
          >
            <span className="block">ZERO-TRUST.</span>
            <span className="block">MAXIMUM TRUTH.</span>
            <span className="mt-2 block text-gradient-brand italic">
              BUILT IN ORLANDO.
            </span>
          </motion.h1>
        </TiltFrame>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="mx-auto mt-8 max-w-2xl text-center text-base leading-relaxed text-zinc-400 sm:mx-0 sm:text-left sm:text-lg"
        >
          We bridge xAI Grok directly to your infrastructure. Real-time threat synthesis,
          natural-language policy, and autonomous operations for Orlando hospitality and
          nationwide enterprise — with a zero-trust posture from day one.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:items-center"
        >
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="#pricing">
              View plans <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full border-zinc-600 sm:w-auto"
          >
            <Link href="#demo">
              Book a demo <MapPin className="h-4 w-4 text-cyan-400" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
