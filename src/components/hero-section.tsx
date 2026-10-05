"use client";

import type { PointerEvent } from "react";
import Image from "next/image";
import { motion, useMotionValue, useReducedMotion } from "motion/react";
import { creators } from "@/data/creators";
import { HeroGlow } from "./hero-glow";
import { HeroLiveChat } from "./hero-live-chat";
import { HeroMarquee } from "./hero-marquee";
import { ArrowIcon } from "./icons";
import { TelegramButton } from "./telegram-button";

// Resting point of the glow, relative to the section's top centre.
const GLOW_REST_Y = 120;

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    glowX.set(event.clientX - rect.left - rect.width / 2);
    glowY.set(event.clientY - rect.top - GLOW_REST_Y);
  };

  const handlePointerLeave = () => {
    glowX.set(0);
    glowY.set(0);
  };

  return (
    <section
      id="top"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative overflow-hidden pt-28 pb-16 sm:pt-36 md:pb-24"
    >
      <HeroGlow offsetX={glowX} offsetY={glowY} />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 md:grid-cols-[1.1fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="border-line mb-6 inline-flex items-center gap-2 rounded-full border bg-white/5 py-1.5 pr-3.5 pl-2 text-xs text-white/80">
            <span className="animate-pulse-dot size-2 rounded-full bg-green-400" />4 AI-креатори
            зараз онлайн
          </div>

          <h1 className="font-display text-[2.4rem] leading-[1.05] font-bold tracking-tight text-balance sm:text-6xl">
            Блогери, яких не&nbsp;існує.
            <span className="mt-1 block bg-linear-to-r from-white via-[#c9d8ff] to-[#ffb3be] bg-clip-text text-transparent">
              Емоції — справжні.
            </span>
          </h1>

          <p className="text-muted mt-6 max-w-md text-base leading-relaxed sm:text-lg">
            NOVA — студія цифрових креаторів. У кожного свій характер, стиль і стрічка. Гортай,
            знайомся і спілкуйся — вони на зв&apos;язку 24/7.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#creators"
              className="text-ink inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-[15px] font-semibold transition-transform active:scale-[0.97]"
            >
              Обрати блогера
              <ArrowIcon className="size-4" />
            </a>
            <TelegramButton />
          </div>

          <div className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-3">
              {creators.map((creator) => (
                <Image
                  key={creator.slug}
                  src={creator.avatar}
                  alt=""
                  width={40}
                  height={40}
                  className="border-ink size-10 rounded-full border-2 object-cover"
                />
              ))}
            </div>
            <p className="text-muted text-sm leading-tight">
              <span className="font-semibold text-white">1,1 млн</span> підписників
              <br />
              по всіх платформах
            </p>
          </div>
        </motion.div>

        <div className="relative mx-auto w-full max-w-[460px]">
          <HeroMarquee />
          <HeroLiveChat />
        </div>
      </div>
    </section>
  );
}
