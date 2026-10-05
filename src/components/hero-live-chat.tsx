"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { AVATAR_SIZE } from "@/config/images";
import { LIVE_CHAT } from "@/config/interaction";
import {
  PRESS_SCALE,
  TYPING_DOT_LIFT,
  liveChatAvatarSwap,
  liveChatMessageSwap,
  liveChatReveal,
  quickFade,
} from "@/config/motion";
import { liveChatMessages } from "@/data/hero";
import { useProfile } from "./profile-provider";
import { TypingDots } from "./typing-dots";

type Phase = "typing" | "message";

export const HeroLiveChat = () => {
  const { openProfile } = useProfile();
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const { creator, text } = liveChatMessages[index];

  useEffect(() => {
    const advance = () => {
      if (phase === "typing") {
        setPhase("message");
        return;
      }
      setIndex((current) => (current + 1) % liveChatMessages.length);
      setPhase("typing");
    };
    const timer = setTimeout(
      advance,
      phase === "typing" ? LIVE_CHAT.typingMs : LIVE_CHAT.messageMs,
    );
    return () => clearTimeout(timer);
  }, [phase]);

  const handleClick = () => openProfile(creator.slug, "chat");

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      aria-label={`Написати: ${creator.name}`}
      {...liveChatReveal}
      whileTap={PRESS_SCALE}
      className="border-line bg-surface/75 absolute inset-x-4 bottom-6 z-10 flex min-h-[76px] items-center gap-3 rounded-2xl border p-3 text-left shadow-2xl shadow-black/50 backdrop-blur-xl sm:inset-x-6"
    >
      <span className="relative shrink-0">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span key={creator.slug} {...liveChatAvatarSwap} className="block">
            <Image
              src={creator.avatar}
              alt=""
              width={AVATAR_SIZE.liveChat}
              height={AVATAR_SIZE.liveChat}
              className="size-11 rounded-full object-cover"
            />
          </motion.span>
        </AnimatePresence>
        <span className="border-surface absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2 bg-green-400" />
      </span>

      <span className="min-w-0 flex-1" aria-live="polite">
        <span className="block text-xs font-semibold">
          {creator.name}
          <span className="text-muted font-normal"> · зараз</span>
        </span>
        <AnimatePresence mode="wait" initial={false}>
          {phase === "typing" ? (
            <motion.span
              key={`${creator.slug}-typing`}
              {...quickFade}
              className="text-muted mt-1 flex items-center gap-1.5 text-sm"
            >
              друкує
              <span className="flex gap-0.5">
                <TypingDots
                  lift={TYPING_DOT_LIFT.liveChat}
                  className="size-1 rounded-full bg-white/60"
                />
              </span>
            </motion.span>
          ) : (
            <motion.span
              key={`${creator.slug}-message`}
              {...liveChatMessageSwap}
              className="mt-0.5 line-clamp-2 block text-sm leading-snug text-white/90"
            >
              {text}
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </motion.button>
  );
};
