"use client";

import { motion, useSpring, useTransform, type MotionValue } from "motion/react";

type HeroGlowProps = {
  /** Cursor offset from the glow's resting point, in px. */
  offsetX: MotionValue<number>;
  offsetY: MotionValue<number>;
};

const follow = { stiffness: 50, damping: 20, mass: 1.2 };

export function HeroGlow({ offsetX, offsetY }: HeroGlowProps) {
  // The main light trails the cursor with inertia; the accent drifts the opposite way for depth.
  const x = useSpring(offsetX, follow);
  const y = useSpring(offsetY, follow);
  const accentX = useTransform(x, (value) => value * -0.15);
  const accentY = useTransform(y, (value) => value * -0.15);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <motion.div
        style={{ x, y }}
        className="absolute top-[120px] left-1/2 size-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(124_196_255/0.28),transparent)] will-change-transform"
      />
      <motion.div
        style={{ x: accentX, y: accentY }}
        className="absolute top-60 -right-40 size-[420px] rounded-full bg-[radial-gradient(closest-side,rgb(255_122_138/0.14),transparent)] will-change-transform"
      />
    </div>
  );
}
