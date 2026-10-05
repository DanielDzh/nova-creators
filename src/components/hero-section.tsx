"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { creators } from "@/data/creators";
import { ArrowIcon } from "./icons";
import { useProfile } from "./profile-provider";
import { TelegramButton } from "./telegram-button";

const fan = [
  { left: "0%", rotate: -9, y: 22, z: 1 },
  { left: "19%", rotate: -3, y: 4, z: 3 },
  { left: "39%", rotate: 3, y: 10, z: 2 },
  { left: "58%", rotate: 9, y: 28, z: 0 },
];

export function HeroSection() {
  const { openProfile } = useProfile();

  return (
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

        <div className="relative mx-auto aspect-[3/2] w-full max-w-[460px]">
          {creators.map((creator, index) => {
            const pose = fan[index];
            return (
              <motion.button
                key={creator.slug}
                type="button"
                onClick={() => openProfile(creator.slug)}
                aria-label={`Відкрити профіль: ${creator.name}`}
                initial={{ opacity: 0, y: 60, rotate: 0 }}
                animate={{ opacity: 1, y: pose.y, rotate: pose.rotate }}
                whileHover={{ y: pose.y - 16, scale: 1.04, zIndex: 10 }}
                whileTap={{ scale: 0.97 }}
                transition={{
                  type: "spring",
                  stiffness: 140,
                  damping: 18,
                  delay: 0.2 + index * 0.08,
                }}
                style={{ zIndex: pose.z, left: pose.left }}
                className="absolute top-0 aspect-[3/4] w-[42%] cursor-pointer overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-black/60"
              >
                <Image
                  src={creator.avatar}
                  alt={creator.name}
                  fill
                  sizes="(min-width: 768px) 200px, 42vw"
                  placeholder="blur"
                  className="object-cover"
                  priority
                />
                <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent p-3 pt-10 text-left">
                  <span className="block text-xs font-semibold">@{creator.handle}</span>
                  <span className="block text-[10px] text-white/70">{creator.niche}</span>
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
