import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyEventCTA } from "@/components/layout/StickyEventCTA";
import { getLocations, getSiteSettings } from "@/lib/cms";

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const [siteSettings, locations] = await Promise.all([
    getSiteSettings(),
    getLocations(),
  ]);

  return (
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
  );
}
