"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import type { Creator } from "@/data/creators";
import { formatCount } from "@/lib/format";
import { CloseIcon, HeartIcon, PinIcon } from "./icons";
import { TelegramButton } from "./telegram-button";

const STORY_DURATION_MS = 5000;

type StoryViewerProps = {
  creator: Creator;
  startIndex: number;
  onClose: () => void;
};

export function StoryViewer({ creator, startIndex, onClose }: StoryViewerProps) {
  const [index, setIndex] = useState(startIndex);
  const [paused, setPaused] = useState(false);
  const [liked, setLiked] = useState<Set<number>>(() => new Set());
  const [burstKey, setBurstKey] = useState(0);

  const post = creator.posts[index];
  const isLiked = liked.has(index);
  const isLast = index === creator.posts.length - 1;

  const next = useCallback(() => {
    if (isLast) onClose();
    else setIndex((current) => current + 1);
  }, [isLast, onClose]);

  const prev = useCallback(() => setIndex((current) => Math.max(0, current - 1)), []);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [next, prev, onClose]);

  const toggleLike = () => {
    const updated = new Set(liked);
    if (isLiked) updated.delete(index);
    else {
      updated.add(index);
      setBurstKey((key) => key + 1);
    }
    setLiked(updated);
  };

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Сторіз ${creator.name}`}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black md:bg-black/90 md:backdrop-blur-lg"
    >
      <div className="relative h-dvh w-full overflow-hidden md:h-[min(860px,94dvh)] md:max-w-[440px] md:rounded-[28px]">
        <AnimatePresence initial={false}>
          <motion.div
            key={post.image}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={post.image}
              alt={post.caption}
              fill
              sizes="(min-width: 768px) 440px, 100vw"
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black/80" />

        <div className="absolute inset-x-0 top-0 z-10 p-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
          <div className="flex gap-1">
            {creator.posts.map((item, itemIndex) => (
              <div
                key={item.image}
                className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/30"
              >
                <div
                  key={`${itemIndex}-${index}`}
                  className="h-full bg-white"
                  style={
                    itemIndex < index
                      ? { width: "100%" }
                      : itemIndex > index
                        ? { width: "0%" }
                        : {
                            animation: `story-progress ${STORY_DURATION_MS}ms linear forwards`,
                            animationPlayState: paused ? "paused" : "running",
                          }
                  }
                  onAnimationEnd={itemIndex === index ? next : undefined}
                />
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center gap-3">
            <Image
              src={creator.avatar}
              alt=""
              width={36}
              height={36}
              className="size-9 rounded-full border border-white/40 object-cover"
            />
            <div className="min-w-0 flex-1 text-sm">
              <p className="font-semibold">{creator.handle}</p>
              {post.location && (
                <p className="flex items-center gap-1 text-xs text-white/70">
                  <PinIcon className="size-3" />
                  {post.location}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Закрити сторіз"
              className="grid size-9 place-items-center rounded-full bg-black/30 backdrop-blur-md"
            >
              <CloseIcon className="size-4" />
            </button>
          </div>
        </div>

        <div
          className="absolute inset-0 flex"
          onPointerDown={() => setPaused(true)}
          onPointerUp={() => setPaused(false)}
          onPointerLeave={() => setPaused(false)}
        >
          <button type="button" aria-label="Попередня" className="w-1/3" onClick={prev} />
          <button type="button" aria-label="Наступна" className="flex-1" onClick={next} />
        </div>

        <AnimatePresence>
          {burstKey > 0 && isLiked && (
            <motion.div
              key={burstKey}
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: [0.4, 1.2, 1], opacity: [0, 1, 0] }}
              transition={{ duration: 0.8 }}
              className="pointer-events-none absolute inset-0 grid place-items-center"
            >
              <HeartIcon filled className="size-28 text-white drop-shadow-2xl" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute inset-x-0 bottom-0 z-10 space-y-4 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <div className="flex items-end gap-3">
            <p className="flex-1 text-[15px] leading-snug">{post.caption}</p>
            <button
              type="button"
              onClick={toggleLike}
              aria-pressed={isLiked}
              aria-label="Вподобати"
              className="flex flex-col items-center gap-0.5 text-xs font-semibold"
            >
              <motion.span whileTap={{ scale: 0.8 }} className="grid size-11 place-items-center">
                <HeartIcon
                  filled={isLiked}
                  className={`size-7 transition-colors ${isLiked ? "text-rose-500" : "text-white"}`}
                />
              </motion.span>
              {formatCount(post.likes + (isLiked ? 1 : 0))}
            </button>
          </div>
          <TelegramButton label="Більше контенту в Telegram" className="w-full" />
        </div>
      </div>
    </motion.div>
  );
}
