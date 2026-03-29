import { Hero } from "@/components/hero";
import { GrokWidget } from "@/components/grok-widget";
import { TrustSection } from "@/components/trust-section";
import { PricingSection } from "@/components/pricing-section";
import { CalendlySection } from "@/components/calendly-section";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { InteractiveBackdrop } from "@/components/interactive-backdrop";

export default function Home() {
  return (
    <>
      <InteractiveBackdrop />
      <SiteHeader />
      <main className="relative z-10">
        <Hero />
        <div className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
          <GrokWidget />
        </div>
        <TrustSection />
        <PricingSection />
        <CalendlySection />
      </main>
      <SiteFooter />
    </>
  );
}
