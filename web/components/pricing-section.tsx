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

const tiers = [
  {
    name: "Foundation",
    price: "$1,995",
    period: "/mo",
    description: "SMBs and single-property operators getting serious about zero-trust.",
    features: [
      "Baseline posture assessment",
      "Grok-assisted policy drafts",
      "Email + ticket support",
      "Monthly executive summary",
    ],
    stripePlaceholder: "https://buy.stripe.com/test_placeholder_foundation",
    cta: "Checkout — Foundation",
    highlight: false,
  },
  {
    name: "Obsidian Core",
    price: "$2,995–$6,995",
    period: "/mo",
    description: "Mid-market multi-site: scaled telemetry, playbooks, and dedicated response windows.",
    features: [
      "Everything in Foundation",
      "24/7 alerting pipeline",
      "Custom integrations (PMS / IDP)",
      "Named security engineer (Orlando + remote)",
    ],
    stripePlaceholder: "https://buy.stripe.com/test_placeholder_core",
    cta: "Checkout — Core (tiered)",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Multi-region, MSP resale, white-label portal, and contractual SLAs.",
    features: [
      "Dedicated vCISO alignment",
      "SOC workflow + runbooks",
      "Custom Grok system prompts & data boundaries",
      "MSA / BAA pathways as required",
    ],
    stripePlaceholder: "mailto:team@obsidianai.org?subject=Enterprise%20pricing",
    cta: "Talk to sales",
    highlight: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="scroll-mt-24 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="font-mono text-3xl font-bold text-zinc-50 md:text-4xl">
            Transparent tiers
          </h2>
          <p className="mt-3 text-zinc-400">
            Replace placeholder Stripe links with live Payment Links or Checkout Sessions in production.
          </p>
        </motion.div>
        <div className="grid gap-6 lg:grid-cols-3">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Card
                className={`h-full flex flex-col ${
                  tier.highlight
                    ? "border-cyan-500/50 shadow-[0_0_40px_-12px_rgba(34,211,238,0.4)]"
                    : ""
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className="text-xl">{tier.name}</CardTitle>
                    {tier.highlight && <Badge>Popular</Badge>}
                  </div>
                  <CardDescription>{tier.description}</CardDescription>
                  <div className="pt-4">
                    <span className="font-mono text-3xl font-bold text-zinc-50">
                      {tier.price}
                    </span>
                    <span className="text-zinc-500">{tier.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {tier.features.map((f) => (
                      <li key={f} className="flex gap-2 text-sm text-zinc-300">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-500" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    asChild
                    className="w-full"
                    variant={tier.highlight ? "default" : "secondary"}
                  >
                    <a
                      href={tier.stripePlaceholder}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
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
