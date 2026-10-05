"use client";

import { motion } from "motion/react";
import { TYPING_DOTS, typingDot } from "@/config/motion";

type TypingDotsProps = {
  /** How far each dot jumps, in px. */
  lift: number;
  className: string;
};

/** Three bouncing dots of a "typing…" indicator. */
export const TypingDots = ({ lift, className }: TypingDotsProps) => (
  <>
    {TYPING_DOTS.map((dot) => (
      <motion.span key={dot} className={className} {...typingDot(dot, lift)} />
    ))}
  </>
);
