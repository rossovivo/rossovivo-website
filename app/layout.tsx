import "./globals.css";

import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { Providers } from "./providers";

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
  verification: {
    google: "rQfTkTHLfvguidlRC8d2ePavdtGrqI-VhQ2-g6gnaO0",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="gtm" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PS6CLF5G');`}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GZZTLSLYLY"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-GZZTLSLYLY');`}
        </Script>
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PS6CLF5G"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
