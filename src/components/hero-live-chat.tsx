"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { creators } from "@/data/creators";
import { useProfile } from "./profile-provider";

const TYPING_MS = 1600;
const MESSAGE_MS = 3600;

// Each creator "writes" their own greeting, one after another.
const messages = creators.map((creator) => ({
  creator,
  text: creator.greeting[creator.greeting.length - 1],
}));

type Phase = "typing" | "message";

export function HeroLiveChat() {
  const { openProfile } = useProfile();
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const { creator, text } = messages[index];

  useEffect(() => {
    const timer = setTimeout(
      () => {
        if (phase === "typing") {
          setPhase("message");
        } else {
          setIndex((current) => (current + 1) % messages.length);
          setPhase("typing");
        }
      },
      phase === "typing" ? TYPING_MS : MESSAGE_MS,
    );
    return () => clearTimeout(timer);
  }, [phase]);

  return (
    <motion.button
      type="button"
      onClick={() => openProfile(creator.slug, "chat")}
      aria-label={`Написати: ${creator.name}`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
      whileTap={{ scale: 0.97 }}
      className="border-line bg-surface/75 absolute inset-x-4 bottom-6 z-10 flex min-h-[76px] items-center gap-3 rounded-2xl border p-3 text-left shadow-2xl shadow-black/50 backdrop-blur-xl sm:inset-x-6"
    >
      <span className="relative shrink-0">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={creator.slug}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.3 }}
            className="block"
          >
            <Image
              src={creator.avatar}
              alt=""
              width={44}
              height={44}
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-muted mt-1 flex items-center gap-1.5 text-sm"
            >
              друкує
              <span className="flex gap-0.5">
                {[0, 1, 2].map((dot) => (
                  <motion.span
                    key={dot}
                    className="size-1 rounded-full bg-white/60"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: dot * 0.15 }}
                  />
                ))}
              </span>
            </motion.span>
          ) : (
            <motion.span
              key={`${creator.slug}-message`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="mt-0.5 line-clamp-2 block text-sm leading-snug text-white/90"
            >
              {text}
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </motion.button>
  );
}
