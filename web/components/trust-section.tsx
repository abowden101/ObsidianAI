"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Lock, Fingerprint } from "lucide-react";

const trustHighlights = [
  {
    title: "Live Grok signal fusion",
    description:
      "Security decisions informed by natural language reasoning, threat telemetry, and operational context.",
  },
  {
    title: "Hospitality-safe automation",
    description:
      "Automated response flows designed to protect guests, preserve service, and reduce false escalation.",
  },
  {
    title: "Audit-grade posture",
    description:
      "Built-in observability, compliance logging, and zero-trust control for multi-location deployments.",
  },
];

export function TrustSection() {
  return (
    <section id="trust" className="border-y border-white/10 bg-[#02030b] px-6 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/80">
            Why choose ObsidianAI
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Scalable trust for hospitality operations and enterprise security.
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            We deliver an immersive security platform that feels as premium as the experiences it protects.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {trustHighlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 * index }}
              className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.3)]"
            >
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-cyan-400/10 text-cyan-300">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-[2rem] border border-cyan-500/20 bg-[#01101c]/80 p-8"
          >
            <div className="mb-4 flex items-center gap-3 text-cyan-300">
              <Lock className="h-6 w-6" />
              <span className="font-mono text-sm uppercase tracking-[0.28em] text-cyan-200">Zero-trust posture</span>
            </div>
            <p className="text-sm leading-7 text-slate-300">
              Identity-aware access control, micro-segmentation, and continuous verification anchored to live Grok reasoning.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-[2rem] border border-white/10 bg-[#010a14]/80 p-8"
          >
            <div className="mb-4 flex items-center gap-3 text-cyan-300">
              <Fingerprint className="h-6 w-6" />
              <span className="font-mono text-sm uppercase tracking-[0.28em] text-cyan-200">Air-tight assurance</span>
            </div>
            <p className="text-sm leading-7 text-slate-300">
              Designed for managed hospitality portfolios with a focus on guest privacy, uptime, and operational legitimacy.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
