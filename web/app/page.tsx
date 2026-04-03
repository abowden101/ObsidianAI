import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles, Layers, Globe, Cpu, Zap } from "lucide-react";
import { Hero } from "@/components/hero";
import { SiteHeader } from "@/components/site-header";
import { TrustSection } from "@/components/trust-section";
import { PricingSection } from "@/components/pricing-section";
import { CalendlySection } from "@/components/calendly-section";
import { SiteFooter } from "@/components/site-footer";
import { InteractiveBackdrop } from "@/components/interactive-backdrop";

const capabilities = [
  {
    title: "Live threat fusion",
    description:
      "Combine network telemetry, guest workflows, and Grok reasoning into contextual alerts that move faster than manual triage.",
    icon: ShieldCheck,
  },
  {
    title: "Autonomous hospitality response",
    description:
      "Trigger service-safe lockdowns, guest remediation, and operational resilience from a single policy plane.",
    icon: Sparkles,
  },
  {
    title: "Zero-trust posture orchestration",
    description:
      "Enforce adaptive access, micro-segmentation, and continuous verification across multi-property estates.",
    icon: Layers,
  },
];

const useCases = [
  {
    title: "Guest safety at scale",
    description:
      "Protect guests and operations with invisible risk mitigation for resorts, hotels, and conference venues.",
    icon: Globe,
  },
  {
    title: "Enterprise breach resilience",
    description:
      "Secure hospitality supply chains, identity fabrics, and edge networks with audit-grade continuity.",
    icon: Cpu,
  },
  {
    title: "Service-first automation",
    description:
      "Preserve guest experience while automating incident response, guest notifications, and back-office lifecycle actions.",
    icon: Zap,
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

function CapabilityCard({ title, description, icon: Icon }: { title: string; description: string; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <motion.div
      variants={sectionVariants}
      className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-[0_30px_90px_rgba(0,0,0,0.33)] backdrop-blur-xl"
    >
      <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-cyan-400/10 text-cyan-300">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="text-2xl font-semibold text-white">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-300">{description}</p>
    </motion.div>
  );
}

function UseCaseCard({ title, description, icon: Icon }: { title: string; description: string; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <motion.div
      variants={sectionVariants}
      className="rounded-[2rem] border border-zinc-800/80 bg-slate-950/80 p-8"
    >
      <div className="mb-4 flex items-center gap-3 text-cyan-300">
        <div className="grid h-12 w-12 place-items-center rounded-3xl bg-cyan-400/10">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <p className="text-sm leading-7 text-slate-300">{description}</p>
    </motion.div>
  );
}

export default function Home() {
  return (
    <>
      <InteractiveBackdrop />
      <SiteHeader />
      <main className="relative z-10">
        <Hero />

        <section id="capabilities" className="scroll-mt-24 border-t border-white/10 px-6 py-24 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/80">
                Core capability stack
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Cinematic detection, trusted automation.
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                ObsidianAI delivers intelligent security workflows with a premium hospitality-first design system, built for high-stakes enterprise operations.
              </p>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {capabilities.map((capability, index) => (
                <CapabilityCard key={capability.title} {...capability} />
              ))}
            </div>
          </div>
        </section>

        <section id="use-cases" className="bg-[#02030b] px-6 py-24 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/80">
                Hospitality + enterprise
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Use cases that earn trust without sacrifice.
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                From resort venues to managed enterprise portfolios, ObsidianAI applies zero-trust reasoning where guest safety and business continuity matter most.
              </p>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {useCases.map((useCase) => (
                <UseCaseCard key={useCase.title} {...useCase} />
              ))}
            </div>
          </div>
        </section>

        <TrustSection />
        <PricingSection />
        <CalendlySection />
      </main>
      <SiteFooter />
    </>
  );
}
