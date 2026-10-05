"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { IMAGE_SIZES } from "@/config/images";
import { cardVariants } from "@/config/motion";
import type { Creator } from "@/data/creators";
import { ArrowIcon, UsersIcon } from "./icons";

type CreatorCardProps = {
  creator: Creator;
  index: number;
  onOpen: (slug: string) => void;
  /** Hands the card element to the carousel for its coverflow styles. */
  onRegister: (index: number, node: HTMLButtonElement | null) => void;
};

export const CreatorCard = ({ creator, index, onOpen, onRegister }: CreatorCardProps) => {
  const handleClick = () => onOpen(creator.slug);
  const handleRef = (node: HTMLButtonElement | null) => onRegister(index, node);

  return (
    <motion.article
      variants={cardVariants}
      className="group relative w-[72vw] max-w-[300px] shrink-0 snap-center sm:w-auto sm:max-w-none"
      style={{ "--accent": creator.accent } as CSSProperties}
    >
      <button
        ref={handleRef}
        type="button"
        onClick={handleClick}
        className="border-line relative block aspect-[3/4] w-full overflow-hidden rounded-[28px] border text-left transition-[box-shadow,scale] duration-500 group-hover:shadow-[0_24px_60px_-20px_var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white active:scale-[0.97] active:duration-150"
        aria-label={`Відкрити профіль: ${creator.name}`}
      >
        <Image
          src={creator.avatar}
          alt={`${creator.name} — ${creator.niche}`}
          fill
          sizes={IMAGE_SIZES.catalogCard}
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
};
