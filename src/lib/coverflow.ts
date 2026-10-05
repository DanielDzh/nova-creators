import { COVERFLOW } from "@/config/interaction";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/** Distance of a slide's centre from the track's centre, in slide widths (0 = centred). */
export const slideOffset = (slide: HTMLElement, track: HTMLElement) => {
  const trackCenter = track.scrollLeft + track.clientWidth / 2;
  const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
  return (slideCenter - trackCenter) / slide.offsetWidth;
};

/** Transform and dimming for a coverflow card at the given offset. */
export const coverflowStyle = (offset: number) => {
  const clamped = clamp(offset, -1, 1);
  const amount = Math.abs(clamped);
  return {
    transform: `perspective(${COVERFLOW.perspectivePx}px) rotateY(${clamped * -COVERFLOW.maxRotateDeg}deg) scale(${1 - amount * COVERFLOW.scaleDrop})`,
    filter: `brightness(${1 - amount * COVERFLOW.dimming})`,
  };
};
