import type { MotionProps, Transition } from "motion/react";

/** Soft "expo out" curve used for most reveals. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
/** iOS-like curve for closing sheets: quick start, clean stop. */
export const EASE_SHEET = [0.32, 0.72, 0, 1] as const;

export const SPRING_SHEET: Transition = { type: "spring", stiffness: 320, damping: 34 };
export const SPRING_MESSAGE: Transition = { type: "spring", stiffness: 400, damping: 30 };
export const SPRING_BAR: Transition = { type: "spring", stiffness: 300, damping: 30 };

/** Delay between cards when the catalog appears. */
export const CARDS_STAGGER = 0.08;
/** Delay between "How it works" steps. */
export const STEPS_STAGGER = 0.1;

export const heroTextReveal = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: EASE_OUT },
} as const;

export const heroMarqueeReveal = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay: 0.2, ease: EASE_OUT },
} as const;

export const liveChatReveal = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: 0.9, ease: EASE_OUT },
} as const;

export const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
} as const;

export const CARDS_VIEWPORT = { once: true, amount: 0.2 } as const;

export const cardsTrackVariants = {
  hidden: {},
  show: { transition: { staggerChildren: CARDS_STAGGER } },
} as const;

export const stepReveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
} as const;
export const STEP_DURATION = 0.5;

export const overlayFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.25 } },
} as const;

export const sheetSlide = {
  initial: { y: "100%" },
  animate: { y: 0 },
  // A spring's long settle tail made the sheet linger at the bottom, so closing is a tween.
  exit: { y: "100%", transition: { duration: 0.3, ease: EASE_SHEET } },
  transition: SPRING_SHEET,
} as const;

export const tabPanel = (direction: 1 | -1) =>
  ({
    initial: { opacity: 0, x: 16 * direction },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 16 * direction },
    transition: { duration: 0.2 },
  }) as const;

export const feedPanel = tabPanel(-1);
export const chatPanel = tabPanel(1);

export const storyViewerPop = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.96 },
  transition: { duration: 0.25 },
} as const;

export const crossfade = (duration: number) =>
  ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration },
  }) as const;

export const heartBurst: MotionProps = {
  initial: { scale: 0.4, opacity: 0 },
  animate: { scale: [0.4, 1.2, 1], opacity: [0, 1, 0] },
  transition: { duration: 0.8 },
};

export const chatMessagePop = {
  initial: { opacity: 0, y: 12, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: SPRING_MESSAGE,
} as const;

export const softFadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
} as const;

export const liveChatAvatarSwap = {
  initial: { opacity: 0, scale: 0.6 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.6 },
  transition: { duration: 0.3 },
} as const;

export const liveChatMessageSwap = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
  transition: { duration: 0.3 },
} as const;

export const stickyBarSlide = {
  initial: { y: 100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 100, opacity: 0 },
  transition: SPRING_BAR,
} as const;

/** Bouncing "typing…" dots: `lift` is how far each dot jumps, in px. */
export const typingDot = (index: number, lift: number): MotionProps => ({
  animate: { y: [0, -lift, 0] },
  transition: { duration: 0.8, repeat: Infinity, delay: index * 0.15 },
});
export const TYPING_DOTS = [0, 1, 2] as const;
/** Dot jump height (px) per placement. */
export const TYPING_DOT_LIFT = { liveChat: 3, chat: 4 } as const;
export const quickFade = crossfade(0.2);
export const storyImageFade = crossfade(0.3);

export const PRESS_SCALE = { scale: 0.97 } as const;
export const LIKE_PRESS_SCALE = { scale: 0.8 } as const;
