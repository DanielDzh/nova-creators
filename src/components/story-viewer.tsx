"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type PanInfo } from "motion/react";
import { AVATAR_SIZE, IMAGE_SIZES } from "@/config/images";
import { DRAG_DOWN_ONLY, STORIES, SWIPE_CLOSE } from "@/config/interaction";
import { LIKE_PRESS_SCALE, heartBurst, storyImageFade, storyViewerPop } from "@/config/motion";
import type { Creator } from "@/data/creators";
import { formatCount } from "@/lib/format";
import { isSwipeClose } from "@/lib/gestures";
import { CloseIcon, HeartIcon, PinIcon } from "./icons";
import { StoryProgress } from "./story-progress";
import { TelegramButton } from "./telegram-button";

type StoryViewerProps = {
  creator: Creator;
  startIndex: number;
  onClose: () => void;
};

type Direction = "prev" | "next";

/** `detail === 0` means the click came from the keyboard, not a pointer. */
const isKeyboardClick = (event: MouseEvent) => event.detail === 0;

export const StoryViewer = ({ creator, startIndex, onClose }: StoryViewerProps) => {
  const [index, setIndex] = useState(startIndex);
  const [paused, setPaused] = useState(false);
  const [liked, setLiked] = useState<Set<number>>(() => new Set());
  const [burstKey, setBurstKey] = useState(0);
  const tapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const draggedRef = useRef(false);

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

  useEffect(() => () => clearTimeout(tapTimerRef.current ?? undefined), []);

  const showBurst = () => setBurstKey((key) => key + 1);

  const toggleLike = () => {
    const updated = new Set(liked);
    if (isLiked) {
      updated.delete(index);
    } else {
      updated.add(index);
      showBurst();
      navigator.vibrate?.(STORIES.likeVibrationMs);
    }
    setLiked(updated);
  };

  // Double tap likes (like in Instagram); a single tap navigates after a short wait.
  const handleTap = (direction: Direction, event: MouseEvent) => {
    if (draggedRef.current) return;
    const navigate = direction === "next" ? next : prev;
    if (isKeyboardClick(event)) return navigate();

    if (tapTimerRef.current) {
      clearTimeout(tapTimerRef.current);
      tapTimerRef.current = null;
      if (isLiked) showBurst();
      else toggleLike();
      return;
    }
    const navigateLater = () => {
      tapTimerRef.current = null;
      navigate();
    };
    tapTimerRef.current = setTimeout(navigateLater, STORIES.doubleTapMs);
  };

  const handlePrevTap = (event: MouseEvent) => handleTap("prev", event);
  const handleNextTap = (event: MouseEvent) => handleTap("next", event);
  const handlePause = () => setPaused(true);
  const handleResume = () => setPaused(false);

  const handleDragStart = () => {
    draggedRef.current = true;
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (isSwipeClose(info, SWIPE_CLOSE)) onClose();
    // Let the click that follows a drag pass without navigating.
    const resetDragged = () => {
      draggedRef.current = false;
    };
    setTimeout(resetDragged);
  };

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Сторіз ${creator.name}`}
      {...storyViewerPop}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black md:bg-black/90 md:backdrop-blur-lg"
    >
      <motion.div
        drag="y"
        dragConstraints={DRAG_DOWN_ONLY}
        dragElastic={STORIES.dragElastic}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        className="relative h-dvh w-full overflow-hidden md:h-[min(860px,94dvh)] md:max-w-[440px] md:rounded-[28px]"
      >
        <AnimatePresence initial={false}>
          <motion.div key={post.image.src} {...storyImageFade} className="absolute inset-0">
            <Image
              src={post.image}
              alt={post.caption}
              fill
              sizes={IMAGE_SIZES.story}
              placeholder="blur"
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black/80" />

        <div className="absolute inset-x-0 top-0 z-10 p-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
          <StoryProgress
            posts={creator.posts}
            activeIndex={index}
            paused={paused}
            onComplete={next}
          />

          <div className="mt-3 flex items-center gap-3">
            <Image
              src={creator.avatar}
              alt=""
              width={AVATAR_SIZE.story}
              height={AVATAR_SIZE.story}
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
          onPointerDown={handlePause}
          onPointerUp={handleResume}
          onPointerLeave={handleResume}
        >
          <button type="button" aria-label="Попередня" className="w-1/3" onClick={handlePrevTap} />
          <button type="button" aria-label="Наступна" className="flex-1" onClick={handleNextTap} />
        </div>

        <AnimatePresence>
          {burstKey > 0 && (
            <motion.div
              key={burstKey}
              {...heartBurst}
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
              <motion.span whileTap={LIKE_PRESS_SCALE} className="grid size-11 place-items-center">
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
      </motion.div>
    </motion.div>
  );
};
