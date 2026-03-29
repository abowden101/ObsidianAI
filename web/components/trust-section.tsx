"use client";

import { motion } from "framer-motion";
import { Building2, Landmark, Palmtree, ShieldCheck, Lock, Fingerprint } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const hospitalityMarks = [
  {
    label: "Convention & events",
    sub: "Orange County corridor",
    icon: Landmark,
  },
  {
    label: "Resort & lodging",
    sub: "International Drive",
    icon: Building2,
  },
  {
    label: "Theme & experience",
    sub: "Central Florida",
    icon: Palmtree,
  },
];

const zeroTrustBadges = [
  { label: "Zero Trust Architecture", detail: "Identity & device context" },
  { label: "Least-privilege access", detail: "Continuous verification" },
  { label: "Encrypted in transit", detail: "TLS 1.2+ everywhere" },
  { label: "Audit-ready posture", detail: "Logging & attestation" },
];

export function TrustSection() {
  return (
    <section className="border-y border-zinc-800/80 bg-zinc-950/40 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="font-mono text-2xl font-bold text-zinc-50 md:text-3xl">
            Trusted where hospitality meets scale
          </h2>
          <p className="mt-2 text-sm text-zinc-500">
            Logo marks are representative of Orlando hospitality footprint — swap in your property
            partners under license when ready.
          </p>
        </motion.div>

        <div className="mb-16 grid gap-4 sm:grid-cols-3">
          {hospitalityMarks.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="flex flex-col items-center rounded-xl border border-zinc-800 bg-black/30 px-6 py-8 text-center"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-900/80">
                <m.icon className="h-8 w-8 text-zinc-400" strokeWidth={1.25} />
              </div>
              <p className="font-semibold text-zinc-200">{m.label}</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-zinc-500">{m.sub}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-xl border border-cyan-900/40 bg-cyan-950/20 p-6"
          >
            <div className="mb-4 flex items-center gap-2 text-cyan-300">
              <ShieldCheck className="h-6 w-6" />
              <span className="font-mono text-sm font-semibold uppercase tracking-wide">
                Zero-trust signals
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {zeroTrustBadges.map((b) => (
                <Badge key={b.label} variant="secondary" className="py-1.5 pl-2 pr-3">
                  <span className="flex flex-col items-start gap-0.5">
                    <span className="flex items-center gap-1 text-[11px] text-zinc-200">
                      <Lock className="h-3 w-3" />
                      {b.label}
                    </span>
                    <span className="font-normal text-[10px] text-zinc-500">{b.detail}</span>
                  </span>
                </Badge>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6"
          >
            <div className="mb-3 flex items-center gap-2 text-zinc-300">
              <Fingerprint className="h-6 w-6 text-cyan-500" />
              <span className="font-mono text-sm font-semibold uppercase tracking-wide">
                Assurance
              </span>
            </div>
            <p className="text-sm leading-relaxed text-zinc-400">
              Controls map to NIST SP 800-207 zero-trust tenets and are implemented alongside your
              identity provider, property management stack, and network edge — not as a slide deck,
              but as enforced policy backed by Grok-assisted runbooks.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
