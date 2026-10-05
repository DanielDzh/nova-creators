import Image from "next/image";
import { IMAGE_SIZES } from "@/config/images";
import type { Post } from "@/data/creators";
import { formatCount } from "@/lib/format";
import { HeartIcon } from "./icons";

type FeedPostProps = {
  post: Post;
  index: number;
  onOpen: (index: number) => void;
};

export const FeedPost = ({ post, index, onOpen }: FeedPostProps) => {
  const handleClick = () => onOpen(index);

  return (
    <li>
      <button
        type="button"
        onClick={handleClick}
        className="group relative block aspect-[3/4] w-full overflow-hidden rounded-2xl"
        aria-label={`Відкрити пост: ${post.caption}`}
      >
        <Image
          src={post.image}
          alt={post.caption}
          fill
          sizes={IMAGE_SIZES.feedPost}
          placeholder="blur"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute inset-x-0 bottom-0 flex items-center gap-1 bg-linear-to-t from-black/70 to-transparent p-2.5 pt-8 text-xs font-semibold">
          <HeartIcon filled className="size-3.5" />
          {formatCount(post.likes)}
        </span>
      </button>
    </li>
  );
};
