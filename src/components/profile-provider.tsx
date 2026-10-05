"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { AnimatePresence } from "motion/react";
import { creators, type Creator } from "@/data/creators";
import type { ProfileTab } from "@/data/profile";
import { ProfileSheet } from "./profile-sheet";

type ProfileContextValue = {
  openProfile: (slug: string, tab?: ProfileTab) => void;
};

type ActiveProfile = {
  creator: Creator;
  tab: ProfileTab;
};

const ProfileContext = createContext<ProfileContextValue | null>(null);

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) throw new Error("useProfile must be used inside <ProfileProvider>");
  return context;
};

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [active, setActive] = useState<ActiveProfile | null>(null);

  const openProfile = useCallback((slug: string, tab: ProfileTab = "feed") => {
    const creator = creators.find((item) => item.slug === slug);
    setActive(creator ? { creator, tab } : null);
  }, []);

  const closeProfile = useCallback(() => setActive(null), []);

  return (
    <ProfileContext.Provider value={{ openProfile }}>
      {children}
      <AnimatePresence>
        {active && (
          <ProfileSheet
            key={active.creator.slug}
            creator={active.creator}
            initialTab={active.tab}
            onClose={closeProfile}
          />
        )}
      </AnimatePresence>
    </ProfileContext.Provider>
  );
};
