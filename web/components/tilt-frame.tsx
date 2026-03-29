"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type TiltFrameProps = {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
};

/**
 * Subtle 3D tilt following pointer — use on hero panels / pricing cards.
 */
export function TiltFrame({
  children,
  className,
  intensity = 5,
}: TiltFrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const spring = { stiffness: 280, damping: 24 };

  const rotateX = useSpring(
    useTransform(y, [0, 1], [intensity, -intensity]),
    spring
  );
  const rotateY = useSpring(
    useTransform(x, [0, 1], [-intensity, intensity]),
    spring
  );

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width);
        y.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        x.set(0.5);
        y.set(0.5);
      }}
    >
      {children}
    </motion.div>
  );
}
