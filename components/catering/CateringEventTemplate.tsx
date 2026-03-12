"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  Building2,
  Calendar,
  CheckCircle2,
  Flame,
  Heart,
  Home,
  MessageSquare,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SegmentLeadForm } from "@/components/catering/SegmentLeadForm";
import { AnimatedFeatureCards } from "@/components/ui/animated-feature-cards";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

type SetupOption = {
  id: string;
  title: string;
  suitability: string;
  description: string;
  image: string;
};

const defaultSetupOptions: SetupOption[] = [
  {
    id: "electric-oven",
    title: "Electric Ovens",
    suitability: "Indoor Friendly",
    description: "Ideal for indoor / small venues",
    image: "/assets/electric-oven.jpg",
  },
  {
    id: "gas-oven",
    title: "Wood Fire Oven",
    suitability: "Outdoor Ready",
    description: "Fast setup and flexible for outdoor locations",
    image: "/assets/wood-oven.jpg",
  },
  {
    id: "tuk-tuk-truck",
    title: "Tuk-tuk Oven Truck",
    suitability: "Bestseller",
    description: "Ideal for outdoor events and includes a wood-fire oven",
    image: "/assets/truck.jpg",
  },
  {
    id: "pasta-station",
    title: "Pasta Station",
    suitability: "Add On",
    description:
      "Suitable for all venues. Pasta that's cooked live, served fresh",
    image: "/assets/pasta-station.jpg",
  },
];

const polaroidRotations = [
  "lg:rotate-[-2deg]",
  "lg:rotate-[1.25deg]",
  "lg:rotate-[-1deg]",
  "lg:rotate-[2deg]",
];

type EventTypeCard = {
  title: string;
  description: string;
  bestFor: string[];
  icon: LucideIcon;
};

const eventTypeCards: EventTypeCard[] = [
  {
    title: "Corporate Events",
    description:
      "Structured service designed for office activations, launches, and team events.",
    bestFor: [
      "Team Lunches",
      "Client Hosting",
      "Conferences",
      "Brand Activation",
      "Staff Appreciation Events",
    ],
    icon: Building2,
  },
  {
    title: "Home Events",
    description:
      "Guest-friendly setup for birthdays, private dinners, and family celebrations.",
    bestFor: [
      "Birthdays",
      "Anniversaries",
      "Family Gatherings",
      "Housewarmings",
      "Private Dinners",
    ],
    icon: Home,
  },
  {
    title: "Weddings",
    description:
      "Live station formats for welcome parties and wedding day service.",
    bestFor: [
      "Welcome Parties",
      "Wedding Day Stations",
      "Late-night Bites",
      "Post-wedding Brunches",
    ],
    icon: Heart,
  },
];

const defaultServiceIncludes = [
  {
    name: "On-site Pizza Ovens & Pasta Stations",
    quote:
      "Choose from our signature ovens including electric, wood fire, and the tuk tuk truck or opt for a pasta station.",
    designation: "Service Included",
    src: "/assets/service-images/Image1.jpg",
  },
  {
    name: "Live Chef, Full Setup & Cleanup",
    quote:
      "Our service includes a live chef, pre-event setup and post-event cleanup with no hidden fees.",
    designation: "Service Included",
    src: "/assets/service-images/Image2.jpg",
  },
  {
    name: "Authentic Toppings & Ingredients",
    quote:
      "Sourced fresh or made in-house, our chefs cook using authentic Italian ingredients.",
    designation: "Service Included",
    src: "/assets/service-images/Image3.jpg",
  },
  {
    name: "3 Hours Of Live-Station Time",
    quote:
      "Basic package includes 3 hours of pizza oven or pasta station time.",
    designation: "Service Included",
    src: "/assets/service-images/Image4.jpg",
  },
];

const defaultOptionalAddOns = [
  {
    name: "Request Premium Ingredients & Toppings",
    quote:
      "Looking for something more unique? Choose from a variety of premium ingredients sourced fresh or made in-house.",
    designation: "Optional Upgrade",
    src: "/assets/addon-images/Image2.jpg",
  },
  {
    name: "Customise Your Menu",
    quote:
      "Fully customize and expand your menu by adding appetisers, dessert stations, and other items.",
    designation: "Optional Upgrade",
    src: "/assets/addon-images/Image1.jpg",
  },
  {
    name: "Extend Service Time",
    quote: "Add more time to the pizza oven or pasta station if required.",
    designation: "Optional Upgrade",
    src: "/assets/addon-images/Image3.jpg",
  },
  {
    name: "Nutella Pizza",
    quote:
      "Surprise your guests with our signature Nutella Pizza! Decadent and a fan favorite.",
    designation: "Optional Upgrade",
    src: "/temp-images-catering/nutella-pizza.jpg",
  },
  {
    name: "Request Service Staff",
    quote:
      "Request more service staff to cater to your guests in addition to the chef.",
    designation: "Optional Upgrade",
    src: "/assets/addon-images/Image5.jpg",
  },
];

const iconNameMap: Record<string, LucideIcon> = {
  UtensilsCrossed,
  Users,
  Flame,
  Calendar,
  MessageSquare,
  CheckCircle2,
  Building2,
  Home,
  Heart,
};

export type CateringEventTemplateContent = {
  name: string;
  kicker: string;
  heroTitle: string;
  heroDescription: string;
  hideHeroImage?: boolean;
  audienceNote: string;
  image: string;
  setupSectionEyebrow?: string;
  setupSectionTitle?: string;
  setupOptions?: SetupOption[];
  featureSectionEyebrow?: string;
  featureSectionTitle?: string;
  featureItems?: Array<{
    iconName?: string;
    title?: string;
    copy: string;
  }>;
  highlights: string[];
  includesSectionEyebrow?: string;
  includesSectionTitle?: string;
  includesItems?: Array<{
    name: string;
    quote: string;
    designation?: string;
    src: string;
  }>;
  optionalSectionEyebrow?: string;
  optionalSectionTitle?: string;
  optionalItems?: Array<{
    name: string;
    quote: string;
    designation: string;
    src: string;
  }>;
  quoteCta: string;
  enquiryTitle: string;
  enquiryDescription: string;
  eventFormImage?: string;
  videoSrc?: string;
  formInitialEventType?: string;
  bestsellerSetupId?: string;
  eventTypeOptions?: string[];
  availableSpaceOptions?: string[];
  setupPreferenceOptions?: string[];
};

type CateringEventTemplateProps = {
  content: CateringEventTemplateContent;
  showEventTypeSelection?: boolean;
  showBackToAllCatering?: boolean;
};

export function CateringEventTemplate({
  content,
  showEventTypeSelection = false,
  showBackToAllCatering = false,
}: CateringEventTemplateProps) {
  const [expandedHighlightIndex, setExpandedHighlightIndex] = useState<
    number | null
  >(0);
  const setupOptions = content.setupOptions || defaultSetupOptions;
  const featureItems: Array<{ iconName?: string; title?: string; copy: string }> =
    content.featureItems && content.featureItems.length > 0
      ? content.featureItems
      : content.highlights.map((item) => ({ copy: item }));
  const serviceIncludes =
    content.includesItems && content.includesItems.length > 0
      ? content.includesItems
      : defaultServiceIncludes;
  const optionalAddOns =
    content.optionalItems && content.optionalItems.length > 0
      ? content.optionalItems
      : defaultOptionalAddOns;
  const setupSectionEyebrow = content.setupSectionEyebrow || "From Oven To Table";
  const setupSectionTitle =
    content.setupSectionTitle && content.setupSectionTitle !== setupSectionEyebrow
      ? content.setupSectionTitle
      : "";

  return (
    <>
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={
            content.hideHeroImage ? { backgroundColor: "#414143" } : undefined
          }
        >
          {!content.hideHeroImage && (
            <img
              src={content.image}
              alt={`${content.name} catering`}
              className="w-full h-full object-cover"
            />
          )}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: content.hideHeroImage
                ? "#414143"
                : "rgba(65, 65, 67, 0.8)",
            }}
          />
        </div>

        <div className="relative z-10 container-tight text-center text-white pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mx-auto max-w-3xl">
              <div className="mb-6 flex items-center justify-center gap-2">
                <span className="text-sm font-medium uppercase tracking-[0.2em]">
                  {content.kicker}
                </span>
              </div>
              <h1 className="mx-auto mb-6 max-w-[20ch] text-balance heading-display text-4xl sm:text-5xl md:text-6xl tracking-tight text-white">
                {content.heroTitle}
              </h1>
              <p className="mx-auto max-w-2xl text-md md:text-xl text-cream/80">
                {content.heroDescription}
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Button asChild variant="cta" size="lg" className="gap-2">
                  <Link href="#enquiry-form">
                    Enquire Now
                    <ArrowDown className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <section
        className="bg-white pb-16 pt-6 scroll-mt-32 md:pt-8 lg:pt-10"
        id="setup-options"
      >
        <div className="container-tight">
          <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.18em] text-primary/85">
            {setupSectionEyebrow}
          </p>
          {setupSectionTitle ? (
            <h2 className="heading-section mb-8 text-center text-charcoal">
              {setupSectionTitle}
            </h2>
          ) : null}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {setupOptions.map((option, index) => {
              const isBestseller = option.id === content.bestsellerSetupId;
              return (
                <article
                  key={option.id}
                  className={`rounded-[1.75rem] border border-charcoal/15 bg-[#f5f0e6] p-3 shadow-sm transition-transform hover:-translate-y-1 ${polaroidRotations[index]}`}
                >
                  <div className="rounded-[1.35rem] bg-white p-3 pb-5">
                    <div className="relative overflow-hidden rounded-xl bg-muted">
                      <img
                        src={option.image}
                        alt={option.title}
                        className="aspect-[4/3] md:aspect-[4/5] w-full object-cover"
                      />
                      <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-charcoal">
                        {isBestseller ? "Bestseller" : option.suitability}
                      </span>
                    </div>
                    <h3 className="mt-4 text-center font-display text-2xl font-bold text-charcoal">
                      {option.title}
                    </h3>
                    <p className="mt-2 text-center text-base text-muted-foreground">
                      {option.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section
        className="section-padding pt-4 bg-white scroll-mt-32"
        id="service-features"
      >
        <div className="container-tight">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <span className="mb-4 block text-sm font-medium uppercase tracking-[0.2em] text-primary">
                {content.featureSectionEyebrow || "Service Features"}
              </span>
              <h2 className="heading-section text-charcoal">
                {content.featureSectionTitle || "What Makes Us Different?"}
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {featureItems.map((item, index) => {
                const HighlightIcon =
                  (item.iconName && iconNameMap[item.iconName]) || CheckCircle2;
                return (
                  <div
                    key={`${item.title || item.copy}-${index}`}
                    className="flex items-start gap-3 rounded-2xl border border-charcoal/10 bg-cream p-5"
                  >
                    <HighlightIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <p className="text-base text-charcoal">
                      {item.title ? `${item.title}: ${item.copy}` : item.copy}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      {showEventTypeSelection && (
        <section
          className="section-padding bg-cream paper-texture scroll-mt-32"
          id="event-types"
        >
          <div className="container-tight">
            <div className="mb-10 text-center">
              <span className="mb-4 block text-sm font-medium uppercase tracking-[0.2em] text-primary">
                Catering Every Event
              </span>
              <h2 className="heading-section text-charcoal">
                A Full Italian Experience
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {eventTypeCards.map((eventType) => {
                const Icon = eventType.icon;
                return (
                  <article
                    key={eventType.title}
                    className="flex h-full flex-col rounded-2xl border border-charcoal/10 bg-white/90 px-5 py-5 shadow-sm hover:scale-[1.02] transition-transform duration-300"
                  >
                    <div className="mb-3 flex justify-center md:justify-start items-center">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </span>
                    </div>
                    <p className="font-display text-center md:text-left font-normal text-2xl text-charcoal">
                      {eventType.title}
                    </p>
                    <p className="mt-2 text-base text-muted-foreground md:min-h-[4.5rem]">
                      {eventType.description}
                    </p>
                    <div className="mt-4 flex flex-1 flex-col rounded-xl border border-primary/30 bg-primary/10 p-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                        Best For
                      </p>
                      <ul className="mt-2 space-y-2">
                        {eventType.bestFor.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-base text-charcoal"
                          >
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ARCHIVED: <section className="bg-charcoal">
        <div className="mx-auto grid w-full max-w-[1600px] overflow-hidden lg:grid-cols-[1.45fr_1fr]">
          <div className="bg-black">
            <video
              controls
              playsInline
              preload="auto"
              className="block h-[320px] w-full object-cover sm:h-[420px] lg:h-full lg:min-h-[520px]"
            >
              <source src={content.videoSrc ?? "/hero.mp4"} type="video/mp4" />
            </video>
          </div>

          <div className="flex items-center bg-charcoal px-6 py-10 sm:px-10 lg:px-14">
            <div className="max-w-xl">
              <h3 className="mt-4 font-display text-5xl md:text-6xl text-cream">
                See Rossovivo Catering In Action
              </h3>
            </div>
          </div>
        </div>
      </section> */}

      <section className="bg-white scroll-mt-32" id="pricing">
        <div className="w-full container-tight section-padding rounded-3xl px-4">
          <div>
            <div>
              <div className="mb-4 md:mb-10 text-center">
                <span className="mb-4 block text-sm font-medium uppercase tracking-[0.2em] text-primary">
                  {content.includesSectionEyebrow || "Service Details"}
                </span>
                <h2 className="heading-section text-charcoal">
                  {content.includesSectionTitle || "Catering Service Includes"}
                </h2>
              </div>
              <AnimatedFeatureCards items={serviceIncludes} autoplay />

              <div className="pt-24">
                <div className="mb-4 md:mb-10 text-center">
                  <span className="mb-4 block text-sm font-medium uppercase tracking-[0.2em] text-primary">
                    {content.optionalSectionEyebrow || "Optional"}
                  </span>
                  <h2 className="heading-section text-charcoal">
                    {content.optionalSectionTitle ||
                      "Customise Package With Add Ons"}
                  </h2>
                </div>
                <AnimatedTestimonials testimonials={optionalAddOns} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="section-padding bg-charcoal scroll-mt-32"
        id="enquiry-form"
      >
        <div className="container-tight">
          <div className="mx-auto max-w-3xl">
            <div className="mb-12 text-center">
              <Flame className="mx-auto mb-4 h-10 w-10 text-primary" />
              <h2 className="heading-section mb-4 text-cream">
                {content.enquiryTitle}
              </h2>
              <p className="text-lg text-cream/70">
                {content.enquiryDescription}
              </p>
            </div>

            {content.eventFormImage ? (
              <div className="mb-8 overflow-hidden rounded-2xl border border-cream/15">
                <img
                  src={content.eventFormImage}
                  alt={`${content.name} event form`}
                  className="h-52 w-full object-cover md:h-64"
                />
              </div>
            ) : null}

            <SegmentLeadForm
              segmentName={content.name}
              submitLabel={content.quoteCta}
              initialEventType={content.formInitialEventType}
              eventTypeOptions={content.eventTypeOptions}
              availableSpaceOptions={content.availableSpaceOptions}
              setupPreferenceOptions={content.setupPreferenceOptions}
            />

            {showBackToAllCatering && (
              <div className="mt-6 flex justify-center">
                <Button asChild variant="ctaDark" size="lg" className="gap-2">
                  <Link href="/catering">
                    <ArrowLeft className="h-5 w-5" />
                    Back to All Catering
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
