"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * Full-viewport ambient layer: perspective grid + parallax orbs + neural SVG.
 * pointer-events-none so it never blocks clicks. Respects prefers-reduced-motion.
 */
export function InteractiveBackdrop() {
  const reduced = usePrefersReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth);
      my.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced, mx, my]);

  const springCfg = reduced
    ? { stiffness: 400, damping: 40 }
    : { stiffness: 26, damping: 26, mass: 0.9 };

  const orbX = useSpring(useTransform(mx, [0, 1], [-28, 28]), springCfg);
  const orbY = useSpring(useTransform(my, [0, 1], [-22, 22]), springCfg);
  const orb2X = useSpring(useTransform(mx, [0, 1], [26, -26]), springCfg);
  const orb2Y = useSpring(useTransform(my, [0, 1], [-20, 20]), springCfg);
  const orb1Y = useSpring(useTransform(orbY, (v) => v * 0.65), springCfg);

  const gridRotateX = useSpring(useTransform(my, [0, 1], [52, 48]), springCfg);
  const gridRotateZ = useSpring(useTransform(mx, [0, 1], [-2.5, 2.5]), springCfg);

  const spotX = useTransform(mx, [0, 1], [12, 88]);
  const spotY = useTransform(my, [0, 1], [10, 85]);
  const spotlight = useMotionTemplate`radial-gradient(620px circle at ${spotX}% ${spotY}%, rgba(34,211,238,0.14), transparent 68%)`;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: reduced
            ? "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(34,211,238,0.12), transparent)"
            : undefined,
        }}
      />
      {!reduced && (
        <motion.div
          className="absolute inset-0 mix-blend-screen"
          style={{ background: spotlight }}
        />
      )}

      <div
        className="absolute -bottom-[40%] left-1/2 h-[85vh] w-[200%] -translate-x-1/2"
        style={{ perspective: "1200px" }}
      >
        <motion.div
          className="relative h-full w-full origin-[50%_0%]"
          style={{
            rotateX: gridRotateX,
            rotateZ: gridRotateZ,
            transformStyle: "preserve-3d",
            backgroundImage: `
              linear-gradient(rgba(34,211,238,0.07) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34,211,238,0.07) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse 55% 70% at 50% 20%, black 10%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 55% 70% at 50% 20%, black 10%, transparent 75%)",
          }}
        />
      </div>

      <motion.div
        className="absolute left-[6%] top-[14%] h-72 w-72 rounded-full bg-cyan-500/20 blur-[100px]"
        style={{ x: orbX, y: orb1Y }}
      />
      <motion.div
        className="absolute right-[4%] top-[28%] h-64 w-64 rounded-full bg-violet-500/15 blur-[90px]"
        style={{ x: orb2X, y: orb2Y }}
      />

      <NeuralWires reduced={reduced} />
    </div>
  );
}

function NeuralWires({ reduced }: { reduced: boolean }) {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-[0.45]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="obsidian-neural-w" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgb(34 211 238)" stopOpacity="0" />
          <stop offset="50%" stopColor="rgb(34 211 238)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="rgb(34 211 238)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0,120 C320,40 520,200 720,90 S1180,20 1440,100"
        fill="none"
        stroke="url(#obsidian-neural-w)"
        strokeWidth="0.8"
        strokeDasharray="8 14"
        className={reduced ? "" : "animate-dash-slow"}
      />
      <path
        d="M0,280 C280,380 640,180 920,260 S1320,340 1440,240"
        fill="none"
        stroke="rgba(113,113,122,0.35)"
        strokeWidth="0.6"
        strokeDasharray="4 10"
        className={reduced ? "" : "animate-dash-slower"}
      />
      <path
        d="M200,0 C260,200 400,320 640,420 S1000,520 1240,900"
        fill="none"
        stroke="rgba(34,211,238,0.2)"
        strokeWidth="0.5"
        strokeDasharray="6 12"
        className={reduced ? "" : "animate-dash-crawl"}
      />
    </svg>
  );
}
