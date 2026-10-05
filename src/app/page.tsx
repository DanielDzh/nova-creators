import { CreatorsSection } from "@/components/creators-section";
import { HeroSection } from "@/components/hero-section";
import { HowItWorks } from "@/components/how-it-works";
import { ProfileProvider } from "@/components/profile-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StickyTelegramBar } from "@/components/sticky-telegram-bar";
import { TelegramCta } from "@/components/telegram-cta";

const Home = () => (
  <ProfileProvider>
    <SiteHeader />
    <main>
      <HeroSection />
      <CreatorsSection />
      <HowItWorks />
      <TelegramCta />
    </main>
    <SiteFooter />
    <StickyTelegramBar />
  </ProfileProvider>
);

export default Home;
