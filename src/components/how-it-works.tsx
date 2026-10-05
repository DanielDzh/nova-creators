"use client";

import { motion } from "motion/react";

const steps = [
  {
    title: "Обери креатора",
    text: "Чотири характери, чотири світи: lifestyle, технології, мода й пригоди.",
  },
  {
    title: "Гортай і знайомся",
    text: "Сторіз, стрічка та демо-чат прямо на сторінці — без реєстрації.",
  },
  {
    title: "Продовж у Telegram",
    text: "Особисті відповіді, ексклюзивні фото й добірки, яких немає в стрічці.",
  },
];

export function HowItWorks() {
  return (
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
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border-line bg-surface relative overflow-hidden rounded-3xl border p-6"
            >
              <span className="font-display text-5xl font-bold text-white/[0.07]">
                0{index + 1}
              </span>
              <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
              <p className="text-muted mt-2 text-sm leading-relaxed">{step.text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
