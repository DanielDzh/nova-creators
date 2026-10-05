import { siteConfig } from "@/config/site";
import { navLinks } from "@/data/navigation";
import { SparkIcon } from "./icons";
import { TelegramButton } from "./telegram-button";

export const SiteHeader = () => (
  <header className="bleed-top bg-ink/45 fixed inset-x-0 top-0 z-40 border-b border-white/10 pt-[env(safe-area-inset-top)] backdrop-blur-2xl">
    <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
      <a
        href="#top"
        className="flex items-center gap-2"
        aria-label={`${siteConfig.name} — на початок`}
      >
        <SparkIcon className="size-5 text-white" />
        <span className="font-display text-lg font-bold tracking-wide">{siteConfig.name}</span>
      </a>
      <nav className="text-muted hidden items-center gap-8 text-sm md:flex">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} className="transition-colors hover:text-white">
            {link.label}
          </a>
        ))}
      </nav>
      <TelegramButton label="Telegram" size="sm" />
    </div>
  </header>
);
