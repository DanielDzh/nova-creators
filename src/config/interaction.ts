/** Media query for the phone layout, where the catalog is a swipe carousel. */
export const CAROUSEL_MEDIA_QUERY = "(max-width: 639px)";

/** Swipe-to-close for the profile sheet and the stories. */
export const SWIPE_CLOSE = {
  /** Distance dragged down (px) that closes the panel. */
  offset: 120,
  /** Flick velocity (px/s) that closes the panel regardless of distance. */
  velocity: 600,
} as const;

/** Panels can only be dragged down, never up past their resting position. */
export const DRAG_DOWN_ONLY = { top: 0, bottom: 0 } as const;

export const PROFILE_SHEET = {
  dragElastic: { top: 0, bottom: 0.7 },
  /** Wait for the open animation before scrolling to the chat tab. */
  chatScrollDelayMs: 450,
} as const;

export const STORIES = {
  durationMs: 5000,
  /** Second tap within this window counts as a double tap (like). */
  doubleTapMs: 260,
  likeVibrationMs: 12,
  dragElastic: { top: 0, bottom: 0.8 },
} as const;

/** Mobile coverflow for the catalog carousel. */
export const COVERFLOW = {
  perspectivePx: 900,
  maxRotateDeg: 14,
  /** How much a fully off-centre card shrinks. */
  scaleDrop: 0.1,
  /** How much a fully off-centre card darkens. */
  dimming: 0.45,
} as const;

/** Scripted chat in the profile. */
export const CHAT_DEMO = {
  pauseBeforeTypingMs: 350,
  typingBaseMs: 700,
  typingPerCharMs: 18,
  typingMaxMs: 2000,
} as const;

/** Rotating chat preview in the hero. */
export const LIVE_CHAT = {
  typingMs: 1600,
  messageMs: 3600,
} as const;

export const STICKY_TELEGRAM_BAR = {
  /** Show after scrolling past the hero. */
  showAfterPx: 640,
  /** Hide near the final Telegram block, which has its own button. */
  hideNearBottomPx: 480,
} as const;
