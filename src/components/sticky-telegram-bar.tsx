"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { TelegramButton } from "./telegram-button";

const SHOW_AFTER_PX = 640;

export function StickyTelegramBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY > document.documentElement.scrollHeight - 480;
      setVisible(window.scrollY > SHOW_AFTER_PX && !nearBottom);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="from-ink via-ink/90 fixed inset-x-0 bottom-0 z-30 bg-linear-to-t to-transparent px-4 pt-6 pb-[max(1rem,env(safe-area-inset-bottom))] md:hidden"
        >
          <TelegramButton className="w-full" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
