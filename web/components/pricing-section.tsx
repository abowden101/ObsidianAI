"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { publicConfig } from "@/lib/public-config";

const mailFallback = "mailto:team@obsidianai.org?subject=ObsidianAI%20pricing";

const tiers = [
  {
    name: "Foundation",
    price: "$1,995",
    period: "/mo",
    description: "Zero-trust posture for single-property hospitality operations.",
    features: [
      "Baseline breach assessment",
      "Grok-assisted remediation playbooks",
      "Monthly executive report",
      "Email security operations support",
    ],
    checkoutUrl: publicConfig.stripeFoundation || mailFallback,
    cta: "Activate Foundation",
    highlight: false,
  },
  {
    name: "Obsidian Core",
    price: "$2,995–$6,995",
    period: "/mo",
    description: "Scaled perimeter, automation, and SOC-aligned surveillance for growing portfolios.",
    features: [
      "Dedicated alert pipeline",
      "Custom PMS / IDP integration",
      "Response runbooks + escalation flow",
      "Named security engineer support",
    ],
    checkoutUrl: publicConfig.stripeCore || mailFallback,
    cta: "Activate Core",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Full portfolio resilience, MSP deployment, and contractual SLAs.",
    features: [
      "vCISO alignment and runbooks",
      "White-label portal options",
      "Custom Grok knowledge boundaries",
      "Compliance-ready engagement",
    ],
    checkoutUrl: publicConfig.stripeEnterprise || mailFallback,
    cta: "Talk to Sales",
    highlight: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="scroll-mt-24 px-6 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/80">Pricing</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Transparent enterprise tiers. No soft launch ambiguity.
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            ObsidianAI pricing is built around launch-ready security, fast deployment, and a premium support path for hospitality companies that demand executive-grade trust.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.07 * index }}
            >
              <Card className={`h-full border ${tier.highlight ? "border-cyan-400/30 shadow-[0_0_80px_-28px_rgba(34,211,238,0.45)]" : "border-white/10"} bg-[#02050f]/90`}>
                <CardHeader className="space-y-4 p-8">
                  <div className="flex items-center justify-between gap-4">
                    <CardTitle className="text-2xl text-white">{tier.name}</CardTitle>
                    {tier.highlight && <Badge>Recommended</Badge>}
                  </div>
                  <CardDescription className="text-slate-400">{tier.description}</CardDescription>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-semibold text-white">{tier.price}</span>
                    <span className="pb-1 text-sm text-slate-500">{tier.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-5 p-8">
                  <ul className="space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex gap-3 text-sm leading-7 text-slate-300">
                        <Check className="mt-1 h-4 w-4 text-cyan-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="p-8 pt-0">
                  <Button asChild className="w-full rounded-full bg-cyan-400 px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-950 hover:bg-cyan-300">
                    <a href={tier.checkoutUrl} target="_blank" rel="noopener noreferrer">
                      {tier.cta}
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
