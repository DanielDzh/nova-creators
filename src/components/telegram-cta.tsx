import Image from "next/image";
import { creators } from "@/data/creators";
import { TelegramIcon } from "./icons";
import { TelegramButton } from "./telegram-button";

export function TelegramCta() {
  return (
    <section className="px-4 py-16 sm:px-6 md:py-24">
      <div className="border-tg/30 relative mx-auto max-w-6xl overflow-hidden rounded-[36px] border bg-[radial-gradient(120%_140%_at_50%_0%,rgb(42_171_238/0.35),transparent_60%)] px-6 py-14 text-center sm:px-12 md:py-20">
        <TelegramIcon className="text-tg mx-auto size-12" />
        <h2 className="font-display mx-auto mt-6 max-w-2xl text-3xl font-bold tracking-tight text-balance sm:text-5xl">
          Найцікавіше — в Telegram
        </h2>
        <p className="text-muted mx-auto mt-4 max-w-md">
          Особисті повідомлення від креаторів, закулісся зйомок і контент, якого немає у відкритій
          стрічці.
        </p>

        <div className="mt-8 flex justify-center">
          <TelegramButton size="lg" />
        </div>

        <div className="text-muted mt-8 flex items-center justify-center gap-3 text-sm">
          <div className="flex -space-x-2.5">
            {creators.map((creator) => (
              <Image
                key={creator.slug}
                src={creator.avatar}
                alt=""
                width={32}
                height={32}
                className="border-ink size-8 rounded-full border-2 object-cover"
              />
            ))}
          </div>
          вже чекають на тебе
        </div>
      </div>
    </section>
  );
}
