"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { STICKY_TELEGRAM_BAR } from "@/config/interaction";
import { stickyBarSlide } from "@/config/motion";
import { TelegramButton } from "./telegram-button";

const isBarVisible = () => {
  const { scrollY, innerHeight } = window;
  const pageHeight = document.documentElement.scrollHeight;
  const nearBottom = innerHeight + scrollY > pageHeight - STICKY_TELEGRAM_BAR.hideNearBottomPx;
  return scrollY > STICKY_TELEGRAM_BAR.showAfterPx && !nearBottom;
};

export const StickyTelegramBar = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(isBarVisible());
    const frame = requestAnimationFrame(handleScroll);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          {...stickyBarSlide}
          className="bleed-bottom from-ink via-ink/90 fixed inset-x-0 bottom-0 z-30 bg-linear-to-t to-transparent px-4 pt-6 pb-[max(1rem,env(safe-area-inset-bottom))] md:hidden"
        >
          <TelegramButton className="w-full" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
