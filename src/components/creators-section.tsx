"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import { motion } from "motion/react";
import { creators } from "@/data/creators";
import { CreatorCard } from "./creator-card";
import { useProfile } from "./profile-provider";

export function CreatorsSection() {
  const { openProfile } = useProfile();
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const frameRef = useRef(0);

  // Mobile coverflow: the centred card stays in front, neighbours shrink, turn and dim.
  // Styles are written straight to the DOM so swiping never re-renders React.
  const applyCoverflow = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const isCarousel = window.matchMedia("(max-width: 639px)").matches;
    const center = track.scrollLeft + track.clientWidth / 2;
    let closest = 0;
    let closestDistance = Infinity;

    cardRefs.current.forEach((card, index) => {
      const slide = card?.parentElement;
      if (!card || !slide) return;
      const distance = (slide.offsetLeft + slide.offsetWidth / 2 - center) / slide.offsetWidth;
      if (Math.abs(distance) < closestDistance) {
        closestDistance = Math.abs(distance);
        closest = index;
      }
      if (!isCarousel) {
        card.style.transform = "";
        card.style.filter = "";
        return;
      }
      const clamped = Math.max(-1, Math.min(1, distance));
      const amount = Math.abs(clamped);
      card.style.transform = `perspective(900px) rotateY(${clamped * -14}deg) scale(${1 - amount * 0.1})`;
      card.style.filter = `brightness(${1 - amount * 0.45})`;
    });

    setActiveIndex(closest);
  }, []);

  const handleScroll = () => {
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(applyCoverflow);
  };

  useEffect(() => {
    const frame = requestAnimationFrame(applyCoverflow);
    window.addEventListener("resize", applyCoverflow);
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", applyCoverflow);
    };
  }, [applyCoverflow]);

  const scrollTo = (index: number) => {
    const card = trackRef.current?.children[index] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  // On desktop the card under the mouse tints the background glow.
  const handlePointerOver = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const slide = (event.target as HTMLElement).closest("article");
    const index = slide ? Array.from(event.currentTarget.children).indexOf(slide) : -1;
    if (index >= 0) setActiveIndex(index);
  };

  return (
    <section id="creators" className="relative isolate scroll-mt-20 overflow-x-clip py-16 md:py-24">
      {/* Ambient glow in the accent colour of the creator in focus. */}
      <div
        aria-hidden="true"
        style={{ backgroundColor: creators[activeIndex].accent }}
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[680px] w-[min(1200px,160vw)] -translate-x-1/2 -translate-y-[40%] [mask-image:radial-gradient(closest-side,black,transparent)] opacity-[0.16] transition-[background-color] duration-700"
      />
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
        onPointerOver={handlePointerOver}
        className="no-scrollbar relative mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[calc(50vw-min(36vw,150px))] py-4 sm:mx-auto sm:grid sm:max-w-6xl sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-6 lg:grid-cols-4"
      >
        {creators.map((creator, index) => (
          <CreatorCard
            key={creator.slug}
            ref={(node) => {
              cardRefs.current[index] = node;
            }}
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
