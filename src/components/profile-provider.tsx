"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { AnimatePresence } from "motion/react";
import { creators, type Creator } from "@/data/creators";
import { ProfileSheet } from "./profile-sheet";

type ProfileContextValue = {
  openProfile: (slug: string) => void;
};

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) throw new Error("useProfile must be used inside <ProfileProvider>");
  return context;
}

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<Creator | null>(null);

  const openProfile = useCallback((slug: string) => {
    setActive(creators.find((creator) => creator.slug === slug) ?? null);
  }, []);

  return (
    <ProfileContext.Provider value={{ openProfile }}>
      {children}
      <AnimatePresence>
        {active && (
          <ProfileSheet key={active.slug} creator={active} onClose={() => setActive(null)} />
        )}
      </AnimatePresence>
    </ProfileContext.Provider>
  );
}
