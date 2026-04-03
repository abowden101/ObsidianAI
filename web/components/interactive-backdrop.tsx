"use client";

import { useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function InteractiveBackdrop() {
  const reduced = usePrefersReducedMotion();
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);

  useEffect(() => {
    if (reduced) return;

    const handlePointerMove = (event: PointerEvent) => {
      pointerX.set(event.clientX / window.innerWidth);
      pointerY.set(event.clientY / window.innerHeight);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [pointerX, pointerY, reduced]);

  const springConfig = reduced ? { stiffness: 280, damping: 40 } : { stiffness: 45, damping: 30, mass: 0.9 };
  const orb1X = useSpring(useTransform(pointerX, [0, 1], [-24, 24]), springConfig);
  const orb1Y = useSpring(useTransform(pointerY, [0, 1], [-22, 22]), springConfig);
  const orb2X = useSpring(useTransform(pointerX, [0, 1], [24, -24]), springConfig);
  const orb2Y = useSpring(useTransform(pointerY, [0, 1], [-18, 18]), springConfig);

  const glowX = useTransform(pointerX, [0, 1], [10, 90]);
  const glowY = useTransform(pointerY, [0, 1], [12, 88]);
  const glowMask = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(34,211,238,0.16), transparent 38%)`;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#010207]" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-[#020308]/95 to-black" />

      {!reduced && <motion.div className="absolute inset-0 opacity-80" style={{ background: glowMask }} />}

      <motion.div
        className="absolute left-[6%] top-[18%] h-72 w-72 rounded-full bg-cyan-500/14 blur-[110px]"
        style={{ x: orb1X, y: orb1Y }}
      />
      <motion.div
        className="absolute right-[8%] top-[28%] h-64 w-64 rounded-full bg-violet-500/12 blur-[96px]"
        style={{ x: orb2X, y: orb2Y }}
      />

      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-x-0 top-0 h-1/3 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.08),transparent_30%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[radial-gradient(circle_at_bottom,_rgba(59,130,246,0.05),transparent_30%)]" />
      </div>

      <svg className="absolute inset-0 h-full w-full opacity-45" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 140C300 40 520 210 760 100C980 -20 1180 80 1440 40" stroke="rgba(56,189,248,0.16)" strokeWidth="1.2" strokeDasharray="9 16" />
        <path d="M0 320C260 360 620 170 920 250C1160 320 1320 260 1440 210" stroke="rgba(59,130,246,0.12)" strokeWidth="1" strokeDasharray="8 14" />
        <path d="M180 0C260 220 440 300 620 420C800 540 940 620 1180 700C1340 760 1480 840 1680 900" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" strokeDasharray="6 12" />
      </svg>
    </div>
  );
}
