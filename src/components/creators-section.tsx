"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { creators } from "@/data/creators";
import { CreatorCard } from "./creator-card";
import { useProfile } from "./profile-provider";

export function CreatorsSection() {
  const { openProfile } = useProfile();
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild as HTMLElement | null;
    if (!card) return;
    const step = card.offsetWidth + 16;
    setActiveIndex(Math.min(creators.length - 1, Math.round(track.scrollLeft / step)));
  };

  const scrollTo = (index: number) => {
    const card = trackRef.current?.children[index] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  return (
    <section id="creators" className="scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-muted text-xs font-semibold tracking-[0.2em] uppercase">Каталог</p>
        <h2 className="font-display mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Обери свого креатора
        </h2>
        <p className="text-muted mt-3 max-w-lg">
          Торкнися картки — відкриється профіль зі стрічкою, сторіз і живим чатом.
        </p>
      </div>

      <motion.div
        ref={trackRef}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        onScroll={handleScroll}
        className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[9vw] pb-4 sm:mx-auto sm:grid sm:max-w-6xl sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-6 lg:grid-cols-4"
      >
        {creators.map((creator) => (
          <CreatorCard
            key={creator.slug}
            creator={creator}
            onOpen={() => openProfile(creator.slug)}
          />
        ))}
      </motion.div>

      <div
        className="mt-4 flex justify-center gap-2 sm:hidden"
        role="tablist"
        aria-label="Креатори"
      >
        {creators.map((creator, index) => (
          <button
            key={creator.slug}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={creator.name}
            onClick={() => scrollTo(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === activeIndex ? "w-6 bg-white" : "w-1.5 bg-white/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
