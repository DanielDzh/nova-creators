"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useDragControls, type PanInfo } from "motion/react";
import type { Creator } from "@/data/creators";
import { formatCount } from "@/lib/format";
import { ChatDemo } from "./chat-demo";
import { CloseIcon, HeartIcon, SparkIcon } from "./icons";
import { StoryViewer } from "./story-viewer";
import { TelegramButton } from "./telegram-button";

export type ProfileTab = "feed" | "chat";

type ProfileSheetProps = {
  creator: Creator;
  initialTab?: ProfileTab;
  onClose: () => void;
};

const tabs: { id: ProfileTab; label: string }[] = [
  { id: "feed", label: "Стрічка" },
  { id: "chat", label: "Чат" },
];

export function ProfileSheet({ creator, initialTab = "feed", onClose }: ProfileSheetProps) {
  const [tab, setTab] = useState<ProfileTab>(initialTab);
  const [storyIndex, setStoryIndex] = useState<number | null>(null);
  const dragControls = useDragControls();
  const tabsRef = useRef<HTMLDivElement>(null);

  // Opened straight into the chat: bring the tabs into view once the sheet has slid in.
  useEffect(() => {
    if (initialTab !== "chat") return;
    const timer = setTimeout(
      () => tabsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
      450,
    );
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
    if (info.offset.y > 120 || info.velocity.y > 600) onClose();
  };

  const stats = [
    { value: creator.followers, label: "підписників" },
    { value: String(creator.postsCount), label: "публікацій" },
    { value: creator.responseTime, label: "відповідь" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center md:p-6">
      <motion.div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`Профіль ${creator.name}`}
        drag="y"
        dragControls={dragControls}
        dragListener={false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.7 }}
        onDragEnd={handleDragEnd}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 320, damping: 34 }}
        style={{ "--accent": creator.accent } as CSSProperties}
        className="border-line bg-surface relative flex h-[92dvh] w-full flex-col overflow-hidden rounded-t-[32px] border md:h-[min(780px,90dvh)] md:max-w-[460px] md:rounded-[32px]"
      >
        <div
          onPointerDown={(event) => dragControls.start(event)}
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
          <div className="relative h-32 bg-[radial-gradient(120%_120%_at_50%_0%,var(--accent),transparent_70%)] opacity-60" />

          <div className="-mt-16 px-5 pb-[calc(2rem+env(safe-area-inset-bottom))]">
            <button
              type="button"
              onClick={() => setStoryIndex(0)}
              aria-label="Дивитись сторіз"
              className="relative mx-auto block size-28 rounded-full bg-[conic-gradient(from_180deg,var(--accent),#ffffff,var(--accent))] p-[3px] transition-transform active:scale-95"
            >
              <span className="border-surface block size-full overflow-hidden rounded-full border-4">
                <Image
                  src={creator.avatar}
                  alt={creator.name}
                  width={112}
                  height={112}
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
                {tabs.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={tab === item.id}
                    onClick={() => setTab(item.id)}
                    className={`relative flex-1 py-3.5 text-sm font-semibold transition-colors ${
                      tab === item.id ? "text-white" : "text-muted"
                    }`}
                  >
                    {item.label}
                    {tab === item.id && (
                      <motion.span
                        layoutId="profile-tab"
                        className="absolute inset-x-6 -bottom-px h-0.5 rounded-full bg-(--accent)"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              {tab === "feed" ? (
                <motion.ul
                  key="feed"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.2 }}
                  className="mt-4 grid grid-cols-2 gap-2"
                >
                  {creator.posts.map((post, index) => (
                    <li key={post.image.src}>
                      <button
                        type="button"
                        onClick={() => setStoryIndex(index)}
                        className="group relative block aspect-[3/4] w-full overflow-hidden rounded-2xl"
                        aria-label={`Відкрити пост: ${post.caption}`}
                      >
                        <Image
                          src={post.image}
                          alt={post.caption}
                          fill
                          sizes="(min-width: 768px) 210px, 46vw"
                          placeholder="blur"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <span className="absolute inset-x-0 bottom-0 flex items-center gap-1 bg-linear-to-t from-black/70 to-transparent p-2.5 pt-8 text-xs font-semibold">
                          <HeartIcon filled className="size-3.5" />
                          {formatCount(post.likes)}
                        </span>
                      </button>
                    </li>
                  ))}
                </motion.ul>
              ) : (
                <motion.div
                  key="chat"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChatDemo creator={creator} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {storyIndex !== null && (
          <StoryViewer
            creator={creator}
            startIndex={storyIndex}
            onClose={() => setStoryIndex(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
