import { siteConfig } from "@/config/site";
import { navLinks } from "@/data/navigation";
import { SparkIcon } from "./icons";
import { TelegramButton } from "./telegram-button";

/** Floating glass capsule: it sits clear of the screen edges, so iOS glass bars never leave a seam. */
export const SiteHeader = () => (
  <header className="fixed inset-x-3 top-[calc(env(safe-area-inset-top)+0.75rem)] z-40 sm:inset-x-6">
    <div className="bg-ink/55 mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full border border-white/10 pr-2 pl-5 shadow-[0_12px_40px_-12px_rgb(0_0_0/0.7)] backdrop-blur-2xl">
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
