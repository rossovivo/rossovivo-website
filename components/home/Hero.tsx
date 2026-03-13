"use client";

import { motion } from "framer-motion";
import posthog from "posthog-js";
import { trackMetaEvent } from "@/lib/meta-pixel";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowRight, ChevronDown, UtensilsCrossed } from "lucide-react";

type HeroProps = {
  eyebrow?: string;
  title?: string;
  titleHighlight?: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  heroVideoUrl?: string;
  heroImageUrl?: string;
  eMenuMediaCityUrl?: string;
  eMenuBusinessBayUrl?: string;
};

export function Hero({
  eyebrow = "Artisan Pizza",
  title = "Authentic Italian Pizza Since 2009",
  titleHighlight = "Italian",
  subtitle = "Artisanal wood-fired pizzas, pastas, and Italian classics.",
  primaryLabel = "Plan an Event",
  primaryHref = "/#enquiry-form",
  secondaryLabel = "See Menu",
  secondaryHref = "/#order-now",
  heroVideoUrl = "/hero.mp4",
  heroImageUrl = "",
  eMenuMediaCityUrl = "https://qr.emenu.ae/rossovivo-mediacity",
  eMenuBusinessBayUrl = "https://qr.emenu.ae/rossovivo-businessbay",
}: HeroProps) {
  const hasMenuLinks = Boolean(eMenuMediaCityUrl || eMenuBusinessBayUrl);
  const hasHeroImage = Boolean(heroImageUrl?.trim());
  const hasHeroVideo = Boolean(heroVideoUrl?.trim());
  const hasTitleHighlight = Boolean(titleHighlight?.trim());
  const normalizedTitle = title ?? "";
  const normalizedTitleHighlight = titleHighlight?.trim() ?? "";
  const escapedTitleHighlight = normalizedTitleHighlight.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&",
  );
  const highlightMatch = hasTitleHighlight
    ? normalizedTitle.match(new RegExp(escapedTitleHighlight, "i"))
    : null;
  const hasInlineHighlight = Boolean(
    highlightMatch && highlightMatch.index !== undefined,
  );
  const highlightStartIndex = highlightMatch?.index ?? -1;
  const highlightEndIndex = hasInlineHighlight
    ? highlightStartIndex + (highlightMatch?.[0].length ?? 0)
    : -1;
  const titleBeforeHighlight = hasInlineHighlight
    ? normalizedTitle.slice(0, highlightStartIndex)
    : normalizedTitle;
  const titleHighlightedPart = hasInlineHighlight
    ? normalizedTitle.slice(highlightStartIndex, highlightEndIndex)
    : normalizedTitleHighlight;
  const titleAfterHighlight = hasInlineHighlight
    ? normalizedTitle.slice(highlightEndIndex)
    : "";
  const highlightPrefixSpacing =
    hasTitleHighlight && !hasInlineHighlight && normalizedTitle ? " " : "";

  return (
    <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        {hasHeroImage ? (
          <img
            src={heroImageUrl}
            alt="Rossovivo hero"
            className="h-full w-full object-cover brightness-[0.55] saturate-75"
          />
        ) : hasHeroVideo ? (
          <video
            className="h-full w-full object-cover brightness-[0.55] saturate-75"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={heroVideoUrl} type="video/mp4" />
          </video>
        ) : (
          <div className="h-full w-full bg-charcoal" />
        )}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(65, 65, 67, 0.45)" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container-tight">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto max-w-5xl py-8 text-center text-white sm:px-10 sm:py-10"
        >
          <p className="uppercase tracking-[0.22em] text-xs sm:text-sm font-medium text-cream/80">
            {eyebrow}
          </p>

          <h1 className="mt-4 heading-display text-6xl md:text-[4.25rem] lg:text-[5.25rem] text-white">
            {titleBeforeHighlight}
            {hasTitleHighlight ? (
              <>
                {highlightPrefixSpacing}
                <span className="text-primary">{titleHighlightedPart}</span>
                {titleAfterHighlight}
              </>
            ) : null}
          </h1>

          <p className="mt-5 text-base md:text-xl text-cream/85 max-w-2xl mx-auto font-light">
            {subtitle}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild variant="hero" className="gap-2">
              <Link
                href={primaryHref}
                onClick={() => {
                  posthog.capture("hero_cta_clicked", {
                    cta_type: "primary",
                    cta_label: primaryLabel,
                    cta_href: primaryHref,
                  });
                  trackMetaEvent("ViewContent", {
                    content_name: primaryLabel,
                    content_category: "hero_cta",
                  });
                }}
              >
                {primaryLabel}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            {hasMenuLinks ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="heroOutline" className="gap-2">
                    <UtensilsCrossed className="w-5 h-5" />
                    {secondaryLabel}
                    <ChevronDown className="w-4 h-4 opacity-80" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="center"
                  sideOffset={10}
                  className="w-[280px] rounded-2xl border border-white/20 bg-charcoal/95 p-2 text-white shadow-2xl backdrop-blur-xl"
                >
                  {eMenuMediaCityUrl && (
                    <DropdownMenuItem
                      asChild
                      className="cursor-pointer rounded-xl px-4 py-3 text-sm font-medium text-cream focus:bg-white/10 focus:text-white"
                    >
                      <a
                        href={eMenuMediaCityUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          posthog.capture("emenu_opened", {
                            location: "media_city",
                          });
                          trackMetaEvent("ViewContent", {
                            content_name: "eMenu Media City",
                            content_category: "menu",
                          });
                        }}
                      >
                        View Media City eMenu
                      </a>
                    </DropdownMenuItem>
                  )}
                  {eMenuBusinessBayUrl && (
                    <DropdownMenuItem
                      asChild
                      className="cursor-pointer rounded-xl px-4 py-3 text-sm font-medium text-cream focus:bg-white/10 focus:text-white"
                    >
                      <a
                        href={eMenuBusinessBayUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          posthog.capture("emenu_opened", {
                            location: "business_bay",
                          });
                          trackMetaEvent("ViewContent", {
                            content_name: "eMenu Business Bay",
                            content_category: "menu",
                          });
                        }}
                      >
                        View Business Bay eMenu
                      </a>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="heroOutline" className="gap-2">
                <Link
                  href={secondaryHref}
                  onClick={() => {
                    posthog.capture("hero_cta_clicked", {
                      cta_type: "secondary",
                      cta_label: secondaryLabel,
                      cta_href: secondaryHref,
                    });
                    trackMetaEvent("ViewContent", {
                      content_name: secondaryLabel,
                      content_category: "hero_cta",
                    });
                  }}
                >
                  <UtensilsCrossed className="w-5 h-5" />
                  {secondaryLabel}
                </Link>
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
