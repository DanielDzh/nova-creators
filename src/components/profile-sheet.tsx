"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useDragControls, type PanInfo } from "motion/react";
import { AVATAR_SIZE } from "@/config/images";
import { DRAG_DOWN_ONLY, PROFILE_SHEET, SWIPE_CLOSE } from "@/config/interaction";
import { chatPanel, feedPanel, overlayFade, sheetSlide } from "@/config/motion";
import type { Creator } from "@/data/creators";
import { getProfileStats, profileTabs, type ProfileTab } from "@/data/profile";
import { isSwipeClose } from "@/lib/gestures";
import { ChatDemo } from "./chat-demo";
import { FeedPost } from "./feed-post";
import { CloseIcon, SparkIcon } from "./icons";
import { ProfileTabButton } from "./profile-tab-button";
import { StoryViewer } from "./story-viewer";
import { TelegramButton } from "./telegram-button";

type ProfileSheetProps = {
  creator: Creator;
  initialTab?: ProfileTab;
  onClose: () => void;
};

export const ProfileSheet = ({ creator, initialTab = "feed", onClose }: ProfileSheetProps) => {
  const [tab, setTab] = useState<ProfileTab>(initialTab);
  const [storyIndex, setStoryIndex] = useState<number | null>(null);
  const dragControls = useDragControls();
  const tabsRef = useRef<HTMLDivElement>(null);
  const stats = getProfileStats(creator);

  // Opened straight into the chat: bring the tabs into view once the sheet has slid in.
  useEffect(() => {
    if (initialTab !== "chat") return;
    const scrollToTabs = () =>
      tabsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    const timer = setTimeout(scrollToTabs, PROFILE_SHEET.chatScrollDelayMs);
    return () => clearTimeout(timer);
  }, [initialTab]);

  useEffect(() => {
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, []);

  useEffect(() => {
    if (storyIndex !== null) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, storyIndex]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (isSwipeClose(info, SWIPE_CLOSE)) onClose();
  };

  const handleHandlePointerDown = (event: PointerEvent<HTMLDivElement>) =>
    dragControls.start(event);
  const handleOpenStories = () => setStoryIndex(0);
  const handleCloseStories = () => setStoryIndex(null);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center md:p-6">
      <motion.div
        {...overlayFade}
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`Профіль ${creator.name}`}
        drag="y"
        dragControls={dragControls}
        dragListener={false}
        dragConstraints={DRAG_DOWN_ONLY}
        dragElastic={PROFILE_SHEET.dragElastic}
        onDragEnd={handleDragEnd}
        {...sheetSlide}
        style={{ "--accent": creator.accent } as CSSProperties}
        className="border-line bg-surface relative flex h-[92dvh] w-full flex-col overflow-hidden rounded-t-[32px] border md:h-[min(780px,90dvh)] md:max-w-[460px] md:rounded-[32px]"
      >
        <div
          onPointerDown={handleHandlePointerDown}
          className="absolute inset-x-0 top-0 z-10 flex h-10 cursor-grab touch-none justify-center pt-3 active:cursor-grabbing"
        >
          <span className="h-1.5 w-12 rounded-full bg-white/30" />
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрити"
          className="absolute top-4 right-4 z-10 grid size-9 place-items-center rounded-full bg-black/40 backdrop-blur-md transition-colors hover:bg-black/60"
        >
          <CloseIcon className="size-4" />
        </button>

        <div className="no-scrollbar flex-1 overflow-y-auto overscroll-contain">
          <div className="px-5 pt-12 pb-[calc(2rem+env(safe-area-inset-bottom))]">
            <button
              type="button"
              onClick={handleOpenStories}
              aria-label="Дивитись сторіз"
              className="relative mx-auto block size-28 rounded-full bg-[conic-gradient(from_180deg,var(--accent),#ffffff,var(--accent))] p-[3px] transition-transform active:scale-95"
            >
              <span className="border-surface block size-full overflow-hidden rounded-full border-4">
                <Image
                  src={creator.avatar}
                  alt={creator.name}
                  width={AVATAR_SIZE.profile}
                  height={AVATAR_SIZE.profile}
                  className="size-full object-cover"
                />
              </span>
              <span className="text-ink absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-(--accent) px-2 py-0.5 text-[10px] font-bold">
                STORIES
              </span>
            </button>

            <div className="mt-4 text-center">
              <h2 className="font-display text-2xl font-bold">{creator.name}</h2>
              <p className="text-muted mt-1 flex items-center justify-center gap-2 text-sm">
                @{creator.handle}
                <span className="border-line inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] text-white/80">
                  <SparkIcon className="size-3 text-(--accent)" />
                  AI-креатор
                </span>
              </p>
            </div>

            <dl className="border-line mt-6 grid grid-cols-3 gap-2 rounded-2xl border bg-white/[0.03] p-3 text-center">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-display text-lg font-bold">{stat.value}</dd>
                  <dd className="text-muted text-[11px]">{stat.label}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-5 text-[15px] leading-relaxed text-white/85">{creator.bio}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {creator.tags.map((tag) => (
                <li key={tag} className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/70">
                  #{tag}
                </li>
              ))}
            </ul>

            <TelegramButton label="Написати в Telegram" className="mt-6 w-full" />

            <div
              ref={tabsRef}
              className="bg-surface/90 sticky top-0 z-[5] -mx-5 mt-8 px-5 backdrop-blur-md"
            >
              <div className="border-line flex border-b" role="tablist">
                {profileTabs.map((item) => (
                  <ProfileTabButton
                    key={item.id}
                    id={item.id}
                    label={item.label}
                    active={tab === item.id}
                    onSelect={setTab}
                  />
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              {tab === "feed" ? (
                <motion.ul key="feed" {...feedPanel} className="mt-4 grid grid-cols-2 gap-2">
                  {creator.posts.map((post, index) => (
                    <FeedPost
                      key={post.image.src}
                      post={post}
                      index={index}
                      onOpen={setStoryIndex}
                    />
                  ))}
                </motion.ul>
              ) : (
                <motion.div key="chat" {...chatPanel}>
                  <ChatDemo creator={creator} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {storyIndex !== null && (
          <StoryViewer creator={creator} startIndex={storyIndex} onClose={handleCloseStories} />
        )}
      </AnimatePresence>
    </div>
  );
};
