import type { PanInfo } from "motion/react";

type SwipeThreshold = {
  offset: number;
  velocity: number;
};

/** A drag down that went far enough, or was flicked fast enough, to close a panel. */
export const isSwipeClose = (info: PanInfo, threshold: SwipeThreshold) =>
  info.offset.y > threshold.offset || info.velocity.y > threshold.velocity;
