"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import type { Creator } from "@/data/creators";
import { TelegramButton } from "./telegram-button";

type Message = {
  id: number;
  from: "creator" | "user";
  text: string;
};

const PAUSE_BEFORE_TYPING_MS = 350;

const typingDelay = (text: string) => Math.min(700 + text.length * 18, 2000);

export function ChatDemo({ creator }: { creator: Creator }) {
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

    const typingTimer = setTimeout(() => setTyping(true), PAUSE_BEFORE_TYPING_MS);
    const messageTimer = setTimeout(
      () => {
        setTyping(false);
        push("creator", line);
        setPending((queue) => queue.slice(1));
      },
      PAUSE_BEFORE_TYPING_MS + typingDelay(line),
    );

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
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className={`flex items-end gap-2 ${message.from === "user" ? "justify-end" : ""}`}
            >
              {message.from === "creator" && (
                <Image
                  src={creator.avatar}
                  alt=""
                  width={28}
                  height={28}
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
              width={28}
              height={28}
              className="size-7 shrink-0 rounded-full object-cover"
            />
            <span className="bg-surface-2 flex gap-1 rounded-2xl rounded-bl-md px-4 py-3.5">
              <span className="sr-only">{creator.name} друкує…</span>
              {[0, 1, 2].map((dot) => (
                <motion.span
                  key={dot}
                  className="size-1.5 rounded-full bg-white/60"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: dot * 0.15 }}
                />
              ))}
            </span>
          </li>
        )}
      </ul>

      <div ref={endRef} className="h-2" />

      <div className="mt-auto pt-4">
        {finished ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-line rounded-2xl border bg-white/[0.03] p-4 text-center"
          >
            <p className="text-sm text-white/85">
              Сподобалось? {creator.name.split(" ")[0]} продовжить розмову в Telegram — з
              ексклюзивними фото й особистими відповідями.
            </p>
            <TelegramButton label="Продовжити в Telegram" className="mt-4 w-full" />
          </motion.div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {remaining.map((quickReply) => (
              <button
                key={quickReply.index}
                type="button"
                disabled={busy}
                onClick={() => ask(quickReply.index)}
                className="border-line rounded-full border bg-white/5 px-3.5 py-2 text-left text-[13px] text-white/90 transition-colors hover:border-(--accent) disabled:opacity-40"
              >
                {quickReply.question}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
