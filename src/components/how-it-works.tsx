"use client";

import { motion } from "motion/react";
import { STEP_DURATION, STEPS_STAGGER, stepReveal } from "@/config/motion";
import { steps } from "@/data/how-it-works";

const stepNumber = (index: number) => String(index + 1).padStart(2, "0");

export const HowItWorks = () => (
  <section id="how" className="scroll-mt-20 py-16 md:py-24">
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <p className="text-muted text-xs font-semibold tracking-[0.2em] uppercase">Як це працює</p>
      <h2 className="font-display mt-3 max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
        Три кроки до розмови, яка не закінчується
      </h2>

      <ol className="mt-10 grid gap-4 md:grid-cols-3">
        {steps.map((step, index) => (
          <motion.li
            key={step.title}
            {...stepReveal}
            transition={{ duration: STEP_DURATION, delay: index * STEPS_STAGGER }}
            className="border-line bg-surface relative overflow-hidden rounded-3xl border p-6"
          >
            <span className="font-display text-5xl font-bold text-white/[0.07]">
              {stepNumber(index)}
            </span>
            <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
            <p className="text-muted mt-2 text-sm leading-relaxed">{step.text}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  </section>
);
