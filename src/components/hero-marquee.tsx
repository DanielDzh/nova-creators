"use client";

import Image, { type StaticImageData } from "next/image";
import { motion } from "motion/react";
import { creators, type Creator } from "@/data/creators";
import { formatCount } from "@/lib/format";
import { HeartIcon } from "./icons";
import { useProfile } from "./profile-provider";

type Tile = {
  id: string;
  creator: Creator;
  image: StaticImageData;
  likes?: number;
};

const [mark, artem, vira, olesia] = creators;

const avatarTile = (creator: Creator): Tile => ({
  id: `${creator.slug}-avatar`,
  creator,
  image: creator.avatar,
});

const postTile = (creator: Creator, index: number): Tile => ({
  id: `${creator.slug}-post-${index}`,
  creator,
  image: creator.posts[index].image,
  likes: creator.posts[index].likes,
});

// Interleaved so neighbouring tiles always belong to different creators.
const columns: Tile[][] = [
  [
    avatarTile(mark),
    avatarTile(vira),
    postTile(artem, 0),
    postTile(olesia, 0),
    postTile(mark, 1),
    postTile(vira, 1),
  ],
  [
    avatarTile(artem),
    avatarTile(olesia),
    postTile(mark, 0),
    postTile(vira, 0),
    postTile(artem, 1),
    postTile(olesia, 1),
  ],
];

function MarqueeTile({ tile, hidden }: { tile: Tile; hidden: boolean }) {
  const { openProfile } = useProfile();
  const { creator } = tile;

  return (
    <button
      type="button"
      onClick={() => openProfile(creator.slug)}
      aria-label={`Відкрити профіль: ${creator.name}`}
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      className="group/tile border-line relative block aspect-[3/4] w-full shrink-0 overflow-hidden rounded-3xl border transition-[scale] duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.96]"
    >
      <Image
        src={tile.image}
        alt={hidden ? "" : creator.name}
        fill
        sizes="(min-width: 768px) 220px, 45vw"
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
}

export function HeroMarquee() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="group relative mx-auto grid h-[440px] w-full max-w-[460px] grid-cols-2 gap-3 overflow-hidden mask-[linear-gradient(to_bottom,transparent,black_14%,black_86%,transparent)] sm:h-[540px]"
    >
      {columns.map((column, columnIndex) => (
        <div
          key={columnIndex}
          className={`animate-marquee-up flex flex-col group-hover:[animation-play-state:paused] ${
            columnIndex === 1 ? "[animation-direction:reverse]" : ""
          }`}
        >
          {/* Two identical copies make the loop seamless: the track scrolls exactly one copy. */}
          {[false, true].map((hidden) => (
            <div key={String(hidden)} className="flex flex-col gap-3 pb-3">
              {column.map((tile) => (
                <MarqueeTile key={tile.id} tile={tile} hidden={hidden} />
              ))}
            </div>
          ))}
        </div>
      ))}
    </motion.div>
  );
}
