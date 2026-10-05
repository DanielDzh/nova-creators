"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { AnimatePresence } from "motion/react";
import { creators, type Creator } from "@/data/creators";
import { ProfileSheet, type ProfileTab } from "./profile-sheet";

type ProfileContextValue = {
  openProfile: (slug: string, tab?: ProfileTab) => void;
};

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) throw new Error("useProfile must be used inside <ProfileProvider>");
  return context;
}

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<{ creator: Creator; tab: ProfileTab } | null>(null);

  const openProfile = useCallback((slug: string, tab: ProfileTab = "feed") => {
    const creator = creators.find((item) => item.slug === slug);
    setActive(creator ? { creator, tab } : null);
  }, []);

  return (
    <ProfileContext.Provider value={{ openProfile }}>
      {children}
      <AnimatePresence>
        {active && (
          <ProfileSheet
            key={active.creator.slug}
            creator={active.creator}
            initialTab={active.tab}
            onClose={() => setActive(null)}
          />
        )}
      </AnimatePresence>
    </ProfileContext.Provider>
  );
}
