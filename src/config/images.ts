/** Intrinsic sizes (px) for small avatars; they match the Tailwind `size-*` classes in the views. */
export const AVATAR_SIZE = {
  chat: 28,
  ctaStack: 32,
  story: 36,
  heroStack: 40,
  liveChat: 44,
  profile: 112,
} as const;

/** `sizes` hints for responsive images, per placement. */
export const IMAGE_SIZES = {
  marqueeTile: "(min-width: 768px) 220px, 45vw",
  catalogCard: "(min-width: 1024px) 270px, (min-width: 640px) 45vw, 72vw",
  feedPost: "(min-width: 768px) 210px, 46vw",
  story: "(min-width: 768px) 440px, 100vw",
} as const;
