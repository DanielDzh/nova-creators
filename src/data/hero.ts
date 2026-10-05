import type { StaticImageData } from "next/image";
import { creators, type Creator } from "./creators";

export type MarqueeTile = {
  id: string;
  creator: Creator;
  image: StaticImageData;
  likes?: number;
};

const [mark, artem, vira, olesia] = creators;

const avatarTile = (creator: Creator): MarqueeTile => ({
  id: `${creator.slug}-avatar`,
  creator,
  image: creator.avatar,
});

const postTile = (creator: Creator, index: number): MarqueeTile => ({
  id: `${creator.slug}-post-${index}`,
  creator,
  image: creator.posts[index].image,
  likes: creator.posts[index].likes,
});

/** Interleaved so neighbouring tiles always belong to different creators. */
export const marqueeColumns: MarqueeTile[][] = [
  [
    avatarTile(mark),
    avatarTile(vira),
    postTile(artem, 0),
    postTile(olesia, 0),
    postTile(mark, 1),
    postTile(vira, 1),
  ],
  [
    avatarTile(artem),
    avatarTile(olesia),
    postTile(mark, 0),
    postTile(vira, 0),
    postTile(artem, 1),
    postTile(olesia, 1),
  ],
];

/** Each creator "writes" their own greeting in the hero chat preview, one after another. */
export const liveChatMessages = creators.map((creator) => ({
  creator,
  text: creator.greeting[creator.greeting.length - 1],
}));

export const totalAudienceLabel = "1,1 млн";
