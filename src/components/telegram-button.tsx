import { TELEGRAM_URL } from "@/data/creators";
import { TelegramIcon } from "./icons";

type TelegramButtonProps = {
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: "h-10 px-4 text-sm gap-2",
  md: "h-12 px-6 text-[15px] gap-2.5",
  lg: "h-14 px-8 text-base gap-3",
};

export function TelegramButton({
  label = "Перейти в Telegram",
  size = "md",
  className = "",
}: TelegramButtonProps) {
  return (
    <a
      href={TELEGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group bg-tg hover:bg-tg-dark relative inline-flex items-center justify-center overflow-hidden rounded-full font-semibold text-white shadow-[0_8px_32px_-8px_rgb(42_171_238/0.7)] transition-all duration-300 hover:shadow-[0_12px_40px_-8px_rgb(42_171_238/0.9)] active:scale-[0.97] ${sizes[size]} ${className}`}
    >
      <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <TelegramIcon className="relative size-5 shrink-0" />
      <span className="relative">{label}</span>
    </a>
  );
}
