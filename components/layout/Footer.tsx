import Link from "next/link";
import { Instagram, Facebook, MapPin, Phone, Mail } from "lucide-react";
import { SiTiktok } from "react-icons/si";
import type { CmsLocation, SiteSettings } from "@/lib/cms-types";

type FooterProps = {
  siteSettings?: SiteSettings;
  locations?: CmsLocation[];
};

const FALLBACK_SOCIALS = {
  instagramUrl: "https://www.instagram.com/rossovivopizza/",
  facebookUrl: "https://www.facebook.com/profile.php?id=61573936196965",
  tiktokUrl: "https://www.tiktok.com/@rossovivopizza",
};

export function Footer({ siteSettings, locations = [] }: FooterProps) {
  const logoLightUrl = siteSettings?.logoLightUrl || "/logo-w.png";
  const primaryPhone = siteSettings?.primaryPhone || "+971 4 380 5833";
  const secondaryPhone = siteSettings?.secondaryPhone || "+971 4 427 2477";
  const primaryEmail = siteSettings?.primaryEmail || "catering@rossovivo.ae";
  const secondaryEmail = siteSettings?.secondaryEmail || "ciao@rossovivo.ae";
  const instagramUrl = siteSettings?.instagramUrl || FALLBACK_SOCIALS.instagramUrl;
  const facebookUrl = siteSettings?.facebookUrl || FALLBACK_SOCIALS.facebookUrl;
  const tiktokUrl = siteSettings?.tiktokUrl || FALLBACK_SOCIALS.tiktokUrl;
  const uniqueLocationNames = Array.from(
    new Set(
      locations
        .map((location) => location.name.trim())
        .filter((name) => name.length > 0),
    ),
  );
  const locationSummary =
    uniqueLocationNames.length === 0
      ? "Media City and Business Bay, Dubai"
      : uniqueLocationNames.length === 1
        ? `${uniqueLocationNames[0]}, Dubai`
        : `${uniqueLocationNames.slice(0, -1).join(", ")} and ${uniqueLocationNames.at(-1)}, Dubai`;
  const footerLocationSummary =
    siteSettings?.footerLocationSummary?.trim() || locationSummary;
  const businessBayLocation = locations.find(
    (location) => location.slug === "business-bay",
  );
  const mediaCityLocation = locations.find(
    (location) => location.slug === "media-city",
  );
  const hours =
    businessBayLocation?.hours || mediaCityLocation?.hours || "11 AM - 11 PM";

  return (
    <footer className="bg-[#232324] text-cream">
      <div className="container-tight section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <img
                src={logoLightUrl}
                alt="Rossovivo logo"
                className="h-14 w-auto object-contain"
              />
            </Link>
            <div className="flex gap-4 mb-6">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Rossovivo Instagram"
                className="text-cream/60 hover:text-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Rossovivo Facebook"
                className="text-cream/60 hover:text-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Rossovivo TikTok"
                className="text-cream/60 hover:text-primary transition-colors"
              >
                <SiTiktok className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-bold mb-6">Explore</h4>
            <nav className="flex flex-col gap-3">
              <Link
                href="/catering"
                className="text-cream/70 hover:text-primary transition-colors"
              >
                Catering
              </Link>
              <Link
                href="/about"
                className="text-cream/70 hover:text-primary transition-colors"
              >
                About
              </Link>
              <Link
                href="/locations"
                className="text-cream/70 hover:text-primary transition-colors"
              >
                Locations
              </Link>
              <Link
                href="/contact"
                className="text-cream/70 hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Catering */}
          <div>
            <h4 className="font-display text-lg font-bold mb-6">Events</h4>
            <nav className="flex flex-col gap-3">
              <Link
                href="/catering"
                className="text-cream/70 hover:text-primary transition-colors"
              >
                Catering
              </Link>
              <Link
                href="/catering#enquiry-form"
                className="text-cream/70 hover:text-primary transition-colors"
              >
                Enquire About Catering
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-bold mb-6">Contact</h4>
            <div className="flex flex-col gap-4">
              <a
                href={`tel:${primaryPhone.replace(/\s+/g, "")}`}
                className="flex items-center gap-3 text-cream/70 hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                Business Bay: {primaryPhone}
              </a>
              <a
                href={`tel:${secondaryPhone.replace(/\s+/g, "")}`}
                className="flex items-center gap-3 text-cream/70 hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                Media City: {secondaryPhone}
              </a>
              <a
                href={`mailto:${primaryEmail}`}
                className="flex items-center gap-3 text-cream/70 hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                {primaryEmail}
              </a>
              <a
                href={`mailto:${secondaryEmail}`}
                className="flex items-center gap-3 text-cream/70 hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                {secondaryEmail}
              </a>
              <div className="flex items-start gap-3 text-cream/70">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>{footerLocationSummary}</span>
              </div>
              <div className="text-cream/70 text-sm leading-relaxed">
                <p className="font-semibold text-cream">Hours</p>
                {hours.split("\n").map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-cream/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-cream/50 text-sm">
            © {new Date().getFullYear()} Rossovivo Pizzeria.{" "}
            <a
              href="https://thedaxen.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cream transition-colors"
            >
              Made by Daxen.
            </a>
          </p>
          <div className="flex gap-6 text-sm text-cream/50">
            <Link
              href="/privacy-policy"
              className="hover:text-cream transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="hover:text-cream transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
