"use client";

import type { CSSProperties, Ref } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import type { Creator } from "@/data/creators";
import { ArrowIcon, UsersIcon } from "./icons";

type CreatorCardProps = {
  creator: Creator;
  onOpen: () => void;
  ref?: Ref<HTMLButtonElement>;
};

export function CreatorCard({ creator, onOpen, ref }: CreatorCardProps) {
  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
      }}
      className="group relative w-[72vw] max-w-[300px] shrink-0 snap-center sm:w-auto sm:max-w-none"
      style={{ "--accent": creator.accent } as CSSProperties}
    >
      <button
        ref={ref}
        type="button"
        onClick={onOpen}
        className="border-line relative block aspect-[3/4] w-full overflow-hidden rounded-[28px] border text-left transition-[box-shadow,scale] duration-500 group-hover:shadow-[0_24px_60px_-20px_var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white active:scale-[0.97] active:duration-150"
        aria-label={`Відкрити профіль: ${creator.name}`}
      >
        <Image
          src={creator.avatar}
          alt={`${creator.name} — ${creator.niche}`}
          fill
          sizes="(min-width: 1024px) 270px, (min-width: 640px) 45vw, 72vw"
          placeholder="blur"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/90 via-black/45 to-transparent" />

        <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-black/35 px-3 py-1 text-xs font-medium backdrop-blur-md">
          <span className="animate-pulse-dot size-1.5 rounded-full bg-green-400" />
          онлайн
        </span>
        <span className="text-ink absolute top-3 right-3 grid size-10 place-items-center rounded-full bg-white transition-colors group-hover:bg-(--accent)">
          <span className="sr-only">Дивитись блог</span>
          <ArrowIcon className="size-5 -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
        </span>

        <span className="absolute inset-x-0 bottom-0 p-4">
          <span className="font-display block text-xl leading-tight font-bold text-balance">
            {creator.name}
          </span>
          <span className="mt-1.5 flex items-center gap-2 text-sm whitespace-nowrap text-white/75">
            <span className="inline-flex items-center gap-1.5 font-medium text-white">
              <span className="size-1.5 rounded-full bg-(--accent)" />
              {creator.niche}
            </span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <UsersIcon className="size-3.5" />
              {creator.followers}
              <span className="sr-only"> підписників</span>
            </span>
          </span>
        </span>
      </button>
    </motion.article>
  );
}
