import { SparkIcon } from "./icons";
import { TelegramButton } from "./telegram-button";

export function SiteHeader() {
  return (
    <header className="border-line bg-ink/70 fixed inset-x-0 top-0 z-40 border-b pt-[env(safe-area-inset-top)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2" aria-label="NOVA — на початок">
          <SparkIcon className="size-5 text-white" />
          <span className="font-display text-lg font-bold tracking-wide">NOVA</span>
        </a>
        <nav className="text-muted hidden items-center gap-8 text-sm md:flex">
          <a href="#creators" className="transition-colors hover:text-white">
            Креатори
          </a>
          <a href="#how" className="transition-colors hover:text-white">
            Як це працює
          </a>
        </nav>
        <TelegramButton label="Telegram" size="sm" />
      </div>
    </header>
  );
}
