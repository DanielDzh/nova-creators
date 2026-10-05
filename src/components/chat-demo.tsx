"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { AVATAR_SIZE } from "@/config/images";
import { CHAT_DEMO } from "@/config/interaction";
import { TYPING_DOT_LIFT, chatMessagePop, softFadeUp } from "@/config/motion";
import type { Creator } from "@/data/creators";
import { firstName, typingDelay } from "@/lib/chat";
import { QuickReplyButton } from "./quick-reply-button";
import { TelegramButton } from "./telegram-button";
import { TypingDots } from "./typing-dots";

type Message = {
  id: number;
  from: "creator" | "user";
  text: string;
};

type ChatDemoProps = {
  creator: Creator;
};

export const ChatDemo = ({ creator }: ChatDemoProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [pending, setPending] = useState<string[]>(creator.greeting);
  const [typing, setTyping] = useState(false);
  const [asked, setAsked] = useState<Set<number>>(() => new Set());
  const idRef = useRef(0);
  const endRef = useRef<HTMLDivElement>(null);

  const push = (from: Message["from"], text: string) => {
    idRef.current += 1;
    const id = idRef.current;
    setMessages((current) => [...current, { id, from, text }]);
  };

  // Plays queued creator lines one by one: short pause → "typing…" → message.
  useEffect(() => {
    const [line] = pending;
    if (line === undefined) return;

    const startTyping = () => setTyping(true);
    const deliver = () => {
      setTyping(false);
      push("creator", line);
      setPending((queue) => queue.slice(1));
    };

    const typingTimer = setTimeout(startTyping, CHAT_DEMO.pauseBeforeTypingMs);
    const messageTimer = setTimeout(deliver, CHAT_DEMO.pauseBeforeTypingMs + typingDelay(line));

    return () => {
      clearTimeout(typingTimer);
      clearTimeout(messageTimer);
    };
  }, [pending]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, typing]);

  const ask = (index: number) => {
    const quickReply = creator.quickReplies[index];
    setAsked((current) => new Set(current).add(index));
    push("user", quickReply.question);
    setPending(quickReply.answer);
  };

  const busy = pending.length > 0;
  const remaining = creator.quickReplies
    .map((quickReply, index) => ({ ...quickReply, index }))
    .filter(({ index }) => !asked.has(index));
  const finished = remaining.length === 0 && !busy;

  return (
    <div className="mt-4 flex min-h-[340px] flex-col">
      <p className="text-muted mb-4 text-center text-[11px]">
        Демо-діалог · повна версія — у Telegram
      </p>

      <ul className="flex flex-col gap-2" aria-live="polite">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.li
              key={message.id}
              layout
              {...chatMessagePop}
              className={`flex items-end gap-2 ${message.from === "user" ? "justify-end" : ""}`}
            >
              {message.from === "creator" && (
                <Image
                  src={creator.avatar}
                  alt=""
                  width={AVATAR_SIZE.chat}
                  height={AVATAR_SIZE.chat}
                  className="size-7 shrink-0 rounded-full object-cover"
                />
              )}
              <p
                className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-[14px] leading-snug ${
                  message.from === "user"
                    ? "text-ink rounded-br-md bg-(--accent) font-medium"
                    : "bg-surface-2 rounded-bl-md text-white/90"
                }`}
              >
                {message.text}
              </p>
            </motion.li>
          ))}
        </AnimatePresence>

        {typing && (
          <li className="flex items-end gap-2">
            <Image
              src={creator.avatar}
              alt=""
              width={AVATAR_SIZE.chat}
              height={AVATAR_SIZE.chat}
              className="size-7 shrink-0 rounded-full object-cover"
            />
            <span className="bg-surface-2 flex gap-1 rounded-2xl rounded-bl-md px-4 py-3.5">
              <span className="sr-only">{creator.name} друкує…</span>
              <TypingDots
                lift={TYPING_DOT_LIFT.chat}
                className="size-1.5 rounded-full bg-white/60"
              />
            </span>
          </li>
        )}
      </ul>

      <div ref={endRef} className="h-2" />

      <div className="mt-auto pt-4">
        {finished ? (
          <motion.div
            {...softFadeUp}
            className="border-line rounded-2xl border bg-white/[0.03] p-4 text-center"
          >
            <p className="text-sm text-white/85">
              Сподобалось? {firstName(creator.name)} продовжить розмову в Telegram — з ексклюзивними
              фото й особистими відповідями.
            </p>
            <TelegramButton label="Продовжити в Telegram" className="mt-4 w-full" />
          </motion.div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {remaining.map((quickReply) => (
              <QuickReplyButton
                key={quickReply.index}
                index={quickReply.index}
                question={quickReply.question}
                disabled={busy}
                onAsk={ask}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
