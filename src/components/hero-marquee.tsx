"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { IMAGE_SIZES } from "@/config/images";
import { heroMarqueeReveal } from "@/config/motion";
import { marqueeColumns, type MarqueeTile as Tile } from "@/data/hero";
import { formatCount } from "@/lib/format";
import { HeartIcon } from "./icons";
import { useProfile } from "./profile-provider";

/** Two identical copies make the loop seamless: the track scrolls exactly one copy. */
const LOOP_COPIES = [false, true] as const;

type MarqueeTileProps = {
  tile: Tile;
  /** The duplicate copy is hidden from assistive tech and keyboard. */
  duplicate: boolean;
};

const MarqueeTile = ({ tile, duplicate }: MarqueeTileProps) => {
  const { openProfile } = useProfile();
  const { creator } = tile;

  const handleClick = () => openProfile(creator.slug);

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Відкрити профіль: ${creator.name}`}
      aria-hidden={duplicate || undefined}
      tabIndex={duplicate ? -1 : undefined}
      className="group/tile border-line relative block aspect-[3/4] w-full shrink-0 overflow-hidden rounded-3xl border transition-[scale] duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.96]"
    >
      <Image
        src={tile.image}
        alt={duplicate ? "" : creator.name}
        fill
        sizes={IMAGE_SIZES.marqueeTile}
        placeholder="blur"
        className="object-cover transition-transform duration-700 group-hover/tile:scale-105"
      />
      <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-linear-to-t from-black/80 to-transparent p-3 pt-12 text-left">
        <span className="min-w-0">
          <span className="block truncate text-xs font-semibold">@{creator.handle}</span>
          <span className="block text-[10px] text-white/70">{creator.niche}</span>
        </span>
        {tile.likes !== undefined && (
          <span className="flex shrink-0 items-center gap-1 text-[11px] font-semibold">
            <HeartIcon filled className="size-3" />
            {formatCount(tile.likes)}
          </span>
        )}
      </span>
    </button>
  );
};

export const HeroMarquee = () => (
  <motion.div
    {...heroMarqueeReveal}
    className="group relative mx-auto grid h-[440px] w-full max-w-[460px] grid-cols-2 gap-3 overflow-hidden mask-[linear-gradient(to_bottom,transparent,black_14%,black_86%,transparent)] sm:h-[540px]"
  >
    {marqueeColumns.map((column, columnIndex) => (
      <div
        key={columnIndex}
        className={`animate-marquee-up flex flex-col group-hover:[animation-play-state:paused] ${
          columnIndex % 2 === 1 ? "[animation-direction:reverse]" : ""
        }`}
      >
        {LOOP_COPIES.map((duplicate) => (
          <div key={String(duplicate)} className="flex flex-col gap-3 pb-3">
            {column.map((tile) => (
              <MarqueeTile key={tile.id} tile={tile} duplicate={duplicate} />
            ))}
          </div>
        ))}
      </div>
    ))}
  </motion.div>
);
