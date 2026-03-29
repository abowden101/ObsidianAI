"use client";

import { motion } from "framer-motion";
import { CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { calendlyEmbedSrc } from "@/lib/calendly";
import { publicConfig } from "@/lib/public-config";

const calUrl = publicConfig.calendlyUrl;

export function CalendlySection() {
  const iframeSrc = calUrl ? calendlyEmbedSrc(calUrl) : null;

  return (
    <section id="demo" className="scroll-mt-24 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center"
        >
          <h2 className="font-mono text-3xl font-bold text-zinc-50 md:text-4xl">
            Book a live demo
          </h2>
          <p className="mt-3 text-zinc-400">
            {iframeSrc ? (
              <>
                Embedded Calendly — theme matches Obsidian (dark / cyan). Adjust
                copy and availability in the Calendly admin.
              </>
            ) : (
              <>
                Set{" "}
                <code className="rounded bg-zinc-900 px-1.5 py-0.5 font-mono text-sm text-cyan-400/90">
                  NEXT_PUBLIC_CALENDLY_URL
                </code>{" "}
                in Vercel (see <code className="rounded bg-zinc-900 px-1 font-mono text-sm">web/.env.example</code>
                ).
              </>
            )}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-panel overflow-hidden rounded-xl shadow-2xl"
        >
          {iframeSrc ? (
            <iframe
              title="Schedule a demo with ObsidianAI"
              src={iframeSrc}
              width="100%"
              height="700"
              frameBorder={0}
              className="min-h-[700px] w-full bg-zinc-950"
            />
          ) : (
            <Card className="border-0 bg-transparent shadow-none">
              <CardHeader className="items-center text-center">
                <CalendarClock className="mx-auto mb-2 h-12 w-12 text-cyan-500/80" />
                <CardTitle className="text-xl">Calendly embed</CardTitle>
                <CardDescription className="max-w-md text-zinc-400">
                  Add your public Calendly URL to the environment so prospects
                  can self-book security assessments and product walkthroughs.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4 pb-10">
                <Button asChild variant="secondary">
                  <a href="mailto:team@obsidianai.org?subject=Demo%20request">
                    Email team@obsidianai.org for now
                  </a>
                </Button>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </section>
  );
}
