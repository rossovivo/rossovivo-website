import "./globals.css";

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Providers } from "./providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyEventCTA } from "@/components/layout/StickyEventCTA";
import { getLocations, getSiteSettings } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Rossovivo Pizzeria",
  description: "Authentic wood-fired pizza, crafted with love and fire.",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const [siteSettings, locations] = await Promise.all([
    getSiteSettings(),
    getLocations(),
  ]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
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
