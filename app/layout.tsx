import "./globals.css";

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Providers } from "./providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyEventCTA } from "@/components/layout/StickyEventCTA";
import { getLocations, getSiteSettings } from "@/lib/cms";

export const metadata: Metadata = {
  title: {
    default: "Rossovivo | Authentic Wood-Fired Italian Pizza in Dubai Since 2009",
    template: "%s",
  },
  description:
    "Craving real Italian pizza in Dubai? Rossovivo serves handcrafted wood-fired pizzas, pasta & Italian classics at Business Bay & Media City. Order now or dine in!",
  keywords: [
    "authentic Italian pizza Dubai",
    "wood-fired pizza Dubai",
    "Italian restaurant Dubai",
    "artisan pizza Dubai",
    "best pizza Dubai",
    "pizza delivery Dubai",
    "Rossovivo Dubai",
    "Italian food Dubai",
  ],
  openGraph: {
    siteName: "Rossovivo Pizzeria",
    locale: "en_AE",
    type: "website",
  },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const [siteSettings, locations] = await Promise.all([
    getSiteSettings(),
    getLocations(),
  ]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navbar
              orderNowLabel={siteSettings.orderNowPrimaryLabel}
              orderNowHref={siteSettings.orderNowPrimaryHref}
              logoLightUrl={siteSettings.logoLightUrl}
              logoDarkUrl={siteSettings.logoDarkUrl}
            />
            <main className="flex-grow">{children}</main>
            <Footer siteSettings={siteSettings} locations={locations} />
            <StickyEventCTA
              whatsappNumber={siteSettings.whatsappNumber}
              eventHref={siteSettings.orderNowSecondaryHref}
              eventLabel={siteSettings.orderNowSecondaryLabel}
            />
          </div>
        </Providers>
      </body>
    </html>
  );
}
