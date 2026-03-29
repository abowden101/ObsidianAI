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
import { TiltFrame } from "@/components/tilt-frame";
import { publicConfig } from "@/lib/public-config";

const mailFallback =
  "mailto:team@obsidianai.org?subject=ObsidianAI%20plan%20checkout";

const tiers = [
  {
    name: "Foundation",
    price: "$1,995",
    period: "/mo",
    description:
      "SMBs and single-property operators getting serious about zero-trust.",
    features: [
      "Baseline posture assessment",
      "Grok-assisted policy drafts",
      "Email + ticket support",
      "Monthly executive summary",
    ],
    checkoutUrl: publicConfig.stripeFoundation || mailFallback,
    cta: "Checkout — Foundation",
    highlight: false,
  },
  {
    name: "Obsidian Core",
    price: "$2,995–$6,995",
    period: "/mo",
    description:
      "Mid-market multi-site: scaled telemetry, playbooks, and dedicated response windows.",
    features: [
      "Everything in Foundation",
      "24/7 alerting pipeline",
      "Custom integrations (PMS / IDP)",
      "Named security engineer (Orlando + remote)",
    ],
    checkoutUrl: publicConfig.stripeCore || mailFallback,
    cta: "Checkout — Core",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description:
      "Multi-region, MSP resale, white-label portal, and contractual SLAs.",
    features: [
      "Dedicated vCISO alignment",
      "SOC workflow + runbooks",
      "Custom Grok system prompts & data boundaries",
      "MSA / BAA pathways as required",
    ],
    checkoutUrl: publicConfig.stripeEnterprise,
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
            Checkout uses Stripe Payment Links or Checkout Sessions via{" "}
            <code className="rounded bg-zinc-900 px-1.5 py-0.5 font-mono text-xs text-cyan-500/90">
              NEXT_PUBLIC_STRIPE_CHECKOUT_*
            </code>
            . Unset env falls back to email.
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
              <TiltFrame
                intensity={tier.highlight ? 5 : 3}
                className="h-full rounded-xl [transform-style:preserve-3d]"
              >
                <Card
                  className={`flex h-full flex-col ${
                    tier.highlight
                      ? "border-cyan-500/50 shadow-[0_0_40px_-12px_rgba(34,211,238,0.4)]"
                      : "glass-panel"
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
                        <li
                          key={f}
                          className="flex gap-2 text-sm text-zinc-300"
                        >
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
                        href={tier.checkoutUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {tier.cta}
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </TiltFrame>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
