import { motion } from "motion/react";
import type { ProfileTab } from "@/data/profile";

type ProfileTabButtonProps = {
  id: ProfileTab;
  label: string;
  active: boolean;
  onSelect: (id: ProfileTab) => void;
};

export const ProfileTabButton = ({ id, label, active, onSelect }: ProfileTabButtonProps) => {
  const handleClick = () => onSelect(id);

  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={handleClick}
      className={`relative flex-1 py-3.5 text-sm font-semibold transition-colors ${
        active ? "text-white" : "text-muted"
      }`}
    >
      {label}
      {active && (
        <motion.span
          layoutId="profile-tab"
          className="absolute inset-x-6 -bottom-px h-0.5 rounded-full bg-(--accent)"
        />
      )}
    </button>
  );
};
