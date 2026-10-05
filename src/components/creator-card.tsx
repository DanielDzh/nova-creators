"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import type { Creator } from "@/data/creators";
import { ArrowIcon } from "./icons";

type CreatorCardProps = {
  creator: Creator;
  onOpen: () => void;
};

export function CreatorCard({ creator, onOpen }: CreatorCardProps) {
  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
      }}
      className="group relative w-[82vw] max-w-[340px] shrink-0 snap-center sm:w-auto sm:max-w-none"
      style={{ "--accent": creator.accent } as CSSProperties}
    >
      <button
        type="button"
        onClick={onOpen}
        className="border-line relative block aspect-[3/4] w-full overflow-hidden rounded-[28px] border text-left transition-shadow duration-500 group-hover:shadow-[0_24px_60px_-20px_var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        aria-label={`Відкрити профіль: ${creator.name}`}
      >
        <Image
          src={creator.avatar}
          alt={`${creator.name} — ${creator.niche}`}
          fill
          sizes="(min-width: 1024px) 270px, (min-width: 640px) 45vw, 82vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent" />

        <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1 text-xs font-medium backdrop-blur-md">
          <span className="size-1.5 rounded-full bg-(--accent)" />
          {creator.niche}
        </span>
        <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 text-[11px] text-white/80 backdrop-blur-md">
          <span className="animate-pulse-dot size-1.5 rounded-full bg-green-400" />
          онлайн
        </span>

        <span className="absolute inset-x-0 bottom-0 p-5">
          <span className="font-display block text-xl font-bold">{creator.name}</span>
          <span className="mt-0.5 block text-sm text-white/60">@{creator.handle}</span>
          <span className="mt-3 line-clamp-2 block text-sm leading-snug text-white/85">
            {creator.tagline}
          </span>
          <span className="mt-4 flex items-center justify-between gap-3">
            <span className="text-xs text-white/60">
              <span className="font-semibold text-white">{creator.followers}</span> підписників
            </span>
            <span className="text-ink inline-flex h-10 items-center gap-1.5 rounded-full bg-white px-4 text-sm font-semibold transition-colors group-hover:bg-(--accent)">
              Дивитись блог
              <ArrowIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </span>
        </span>
      </button>
    </motion.article>
  );
}
