"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { AVATAR_SIZE } from "@/config/images";
import { heroTextReveal } from "@/config/motion";
import { creators } from "@/data/creators";
import { totalAudienceLabel } from "@/data/hero";
import { HeroLiveChat } from "./hero-live-chat";
import { HeroMarquee } from "./hero-marquee";
import { ArrowIcon } from "./icons";
import { TelegramButton } from "./telegram-button";

export const HeroSection = () => (
  <section id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-36 md:pb-24">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(124_196_255/0.18),transparent)] blur-2xl"
    />
    <div
      aria-hidden="true"
      className="pointer-events-none absolute top-60 -right-40 h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgb(255_122_138/0.14),transparent)] blur-2xl"
    />

    <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 md:grid-cols-[1.1fr_1fr]">
      <motion.div {...heroTextReveal}>
        <div className="border-line mb-6 inline-flex items-center gap-2 rounded-full border bg-white/5 py-1.5 pr-3.5 pl-2 text-xs text-white/80">
          <span className="animate-pulse-dot size-2 rounded-full bg-green-400" />4 AI-креатори зараз
          онлайн
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
                width={AVATAR_SIZE.heroStack}
                height={AVATAR_SIZE.heroStack}
                className="border-ink size-10 rounded-full border-2 object-cover"
              />
            ))}
          </div>
          <p className="text-muted text-sm leading-tight">
            <span className="font-semibold text-white">{totalAudienceLabel}</span> підписників
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
