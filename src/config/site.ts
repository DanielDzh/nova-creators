const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteConfig = {
  name: "NOVA",
  title: "NOVA — AI-блогери з характером",
  tagline: "Блогери, яких не існує. Емоції — справжні.",
  description:
    "Цифрові креатори з власним стилем, стрічкою та голосом. Обирай блогера, гортай пости й продовжуй спілкування в Telegram.",
  keywords: [
    "AI-блогери",
    "віртуальні блогери",
    "цифрові креатори",
    "AI-інфлюенсери",
    "AI-персонажі",
    "Telegram",
    "NOVA",
  ],
  /** Absolute origin used for canonical URLs and social previews. */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (productionHost ? `https://${productionHost}` : "http://localhost:3000"),
  locale: "uk_UA",
  language: "uk",
  themeColor: "#07070a",
  backgroundColor: "#07070a",
  telegramUrl: "https://t.me/danone_dz",
} as const;
