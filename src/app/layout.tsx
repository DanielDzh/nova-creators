import type { Metadata, Viewport } from "next";
import { Manrope, Unbounded } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: "NOVA — AI-блогери з характером",
  description:
    "Цифрові креатори з власним стилем, стрічкою та голосом. Обирай блогера, гортай пости й продовжуй спілкування в Telegram.",
  openGraph: {
    title: "NOVA — AI-блогери з характером",
    description: "Блогери, яких не існує. Емоції — справжні.",
    locale: "uk_UA",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#07070a",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="uk" className={`${manrope.variable} ${unbounded.variable}`}>
      <body className="grain">{children}</body>
    </html>
  );
}
