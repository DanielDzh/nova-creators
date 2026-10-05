import type { CSSProperties } from "react";
import { STORIES } from "@/config/interaction";
import type { Post } from "@/data/creators";

type StoryProgressProps = {
  posts: Post[];
  activeIndex: number;
  paused: boolean;
  onComplete: () => void;
};

const FULL: CSSProperties = { width: "100%" };
const EMPTY: CSSProperties = { width: "0%" };

const runningStyle = (paused: boolean): CSSProperties => ({
  animation: `story-progress ${STORIES.durationMs}ms linear forwards`,
  animationPlayState: paused ? "paused" : "running",
});

const segmentStyle = (index: number, activeIndex: number, paused: boolean) => {
  if (index < activeIndex) return FULL;
  if (index > activeIndex) return EMPTY;
  return runningStyle(paused);
};

export const StoryProgress = ({ posts, activeIndex, paused, onComplete }: StoryProgressProps) => (
  <div className="flex gap-1">
    {posts.map((post, index) => (
      <div key={post.image.src} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/30">
        <div
          // Remount on every story change so the running animation restarts from zero.
          key={`${index}-${activeIndex}`}
          className="h-full bg-white"
          style={segmentStyle(index, activeIndex, paused)}
          onAnimationEnd={index === activeIndex ? onComplete : undefined}
        />
      </div>
    ))}
  </div>
);
