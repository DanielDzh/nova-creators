import type { Metadata, Viewport } from "next";
import { Manrope, Unbounded } from "next/font/google";
import { siteConfig } from "@/config/site";
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
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [...siteConfig.keywords],
  category: "entertainment",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.tagline,
    locale: siteConfig.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.tagline,
  },
  robots: {
    index: true,
    follow: true,
  },
  appleWebApp: {
    title: siteConfig.name,
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
  colorScheme: "dark",
  viewportFit: "cover",
};

const RootLayout = ({ children }: LayoutProps<"/">) => (
  <html
    lang={siteConfig.language}
    data-scroll-behavior="smooth"
    className={`${manrope.variable} ${unbounded.variable}`}
  >
    <body className="grain">{children}</body>
  </html>
);

export default RootLayout;
