"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import { motion } from "motion/react";
import { CAROUSEL_MEDIA_QUERY } from "@/config/interaction";
import { CARDS_VIEWPORT, cardsTrackVariants } from "@/config/motion";
import { creators } from "@/data/creators";
import { coverflowStyle, slideOffset } from "@/lib/coverflow";
import { CarouselDot } from "./carousel-dot";
import { CreatorCard } from "./creator-card";
import { useProfile } from "./profile-provider";

export const CreatorsSection = () => {
  const { openProfile } = useProfile();
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const frameRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Mobile coverflow: the centred card stays in front, neighbours shrink, turn and dim.
  // Styles are written straight to the DOM so swiping never re-renders React.
  const applyCoverflow = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const isCarousel = window.matchMedia(CAROUSEL_MEDIA_QUERY).matches;
    let closest = 0;
    let closestDistance = Infinity;

    cardRefs.current.forEach((card, index) => {
      const slide = card?.parentElement;
      if (!card || !slide) return;
      const offset = slideOffset(slide, track);
      if (Math.abs(offset) < closestDistance) {
        closestDistance = Math.abs(offset);
        closest = index;
      }
      const { transform, filter } = isCarousel
        ? coverflowStyle(offset)
        : { transform: "", filter: "" };
      card.style.transform = transform;
      card.style.filter = filter;
    });

    setActiveIndex(closest);
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(applyCoverflow);
    window.addEventListener("resize", applyCoverflow);
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", applyCoverflow);
    };
  }, [applyCoverflow]);

  const handleScroll = () => {
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(applyCoverflow);
  };

  // On desktop the card under the mouse tints the background glow.
  const handlePointerOver = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const slide = (event.target as HTMLElement).closest("article");
    const index = slide ? Array.from(event.currentTarget.children).indexOf(slide) : -1;
    if (index >= 0) setActiveIndex(index);
  };

  const registerCard = useCallback((index: number, node: HTMLButtonElement | null) => {
    cardRefs.current[index] = node;
  }, []);

  const scrollToCard = (index: number) => {
    const slide = trackRef.current?.children[index];
    slide?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  return (
    <section id="creators" className="relative isolate scroll-mt-24 overflow-x-clip py-16 md:py-24">
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
        viewport={CARDS_VIEWPORT}
        variants={cardsTrackVariants}
        onScroll={handleScroll}
        onPointerOver={handlePointerOver}
        className="no-scrollbar relative mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[calc(50vw-min(36vw,150px))] py-4 sm:mx-auto sm:grid sm:max-w-6xl sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-6 lg:grid-cols-4"
      >
        {creators.map((creator, index) => (
          <CreatorCard
            key={creator.slug}
            creator={creator}
            index={index}
            onOpen={openProfile}
            onRegister={registerCard}
          />
        ))}
      </motion.div>

      <div
        className="mt-4 flex justify-center gap-2 sm:hidden"
        role="tablist"
        aria-label="Креатори"
      >
        {creators.map((creator, index) => (
          <CarouselDot
            key={creator.slug}
            index={index}
            label={creator.name}
            active={index === activeIndex}
            onSelect={scrollToCard}
          />
        ))}
      </div>
    </section>
  );
};
