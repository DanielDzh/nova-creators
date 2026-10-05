import type { Creator } from "./creators";

export type ProfileTab = "feed" | "chat";

export const profileTabs: { id: ProfileTab; label: string }[] = [
  { id: "feed", label: "Стрічка" },
  { id: "chat", label: "Чат" },
];

export type ProfileStat = {
  value: string;
  label: string;
};

export const getProfileStats = (creator: Creator): ProfileStat[] => [
  { value: creator.followers, label: "підписників" },
  { value: String(creator.postsCount), label: "публікацій" },
  { value: creator.responseTime, label: "відповідь" },
];
