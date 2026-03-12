"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import posthog from "posthog-js";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { usePathname } from "next/navigation";
import type { CmsLocation } from "@/lib/cms-types";

const buildLocationImagePaths = (
  folder: string,
  imageCount: number,
  firstImageNumber?: number,
) => {
  const images = Array.from(
    { length: imageCount },
    (_, index) => `/${folder}/${index + 1}.jpg`,
  );

  if (
    typeof firstImageNumber !== "number" ||
    firstImageNumber < 1 ||
    firstImageNumber > imageCount
  ) {
    return images;
  }

  const prioritizedImage = `/${folder}/${firstImageNumber}.jpg`;
  return [
    prioritizedImage,
    ...images.filter((image) => image !== prioritizedImage),
  ];
};

const fallbackLocations: CmsLocation[] = [
  {
    id: "media-city",
    slug: "media-city",
    name: "Media City",
    address: "Ground Floor, Office Park Building, Al Bourooj Street, Dubai",
    phone: "+971 4 427 2477",
    hours:
      "Sunday to Thursday: 11 AM - 11 PM\nFriday to Saturday: 11 AM - 11:30 PM",
    menuUrl: "https://qr.emenu.ae/rossovivo-mediacity",
    directionsUrl:
      "https://www.google.com/maps/dir//Rossovivo+Artisan+Pizza+-+Al+Sufouh+-+Dubai+Internet+City+-+Dubai+-+United+Arab+Emirates/@65.0674176,25.4541824,10z/data=!4m18!1m8!3m7!1s0x3e5f6b6d1a525c13:0x39750c204cd6190c!2sRossovivo+Artisan+Pizza!8m2!3d25.1045781!4d55.1687334!15sCglyb3Nzb3Zpdm9aCyIJcm9zc292aXZvkgEKcmVzdGF1cmFudOABAA!16s%2Fg%2F1pp2ty710!4m8!1m0!1m5!1m1!1s0x3e5f6b6d1a525c13:0x39750c204cd6190c!2m2!1d55.1687334!2d25.1045781!3e3?entry=ttu&g_ep=EgoyMDI2MDIyMi4wIKXMDSoASAFQAw%3D%3D",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d231055.95806638285!2d54.98600118886605!3d25.194812399999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6b6d1a525c13%3A0x39750c204cd6190c!2sRossovivo%20Artisan%20Pizza!5e0!3m2!1sen!2sfi!4v1771332367460!5m2!1sen!2sfi",
    rating: 4.3,
    ratingCount: "297",
    displayOrder: 1,
    isActive: true,
    images: buildLocationImagePaths("location-mediacity", 18),
  },
  {
    id: "business-bay",
    slug: "business-bay",
    name: "Business Bay",
    address: "Ground Floor, Millennium Tower, Sheikh Zayed Road, Dubai",
    phone: "+971 4 380 5833",
    hours:
      "Sunday to Thursday: 11 AM - 11 PM\nFriday to Saturday: 11 AM - 11:30 PM",
    menuUrl: "https://qr.emenu.ae/rossovivo-businessbay",
    directionsUrl:
      "https://www.google.com/maps/dir//Rossovivo+-+Ground+Floor,+Millennium+Tower,+Sheikh+Zayed+Road%D8%8C+Business+Bay+-+Dubai+-+United+Arab+Emirates%E2%80%AD/@65.0674176,25.4541824,10z/data=!3m1!5s0x3e5f685b1ccf4f7b:0xfe15742f9994907!4m18!1m8!3m7!1s0x3e5f427f41fdddb7:0xaa4b74612932b5f1!2sRossovivo!8m2!3d25.1948124!4d55.2662633!15sCglyb3Nzb3Zpdm9aCyIJcm9zc292aXZvkgEQcGl6emFfcmVzdGF1cmFudOABAA!16s%2Fg%2F113jlr73r!4m8!1m0!1m5!1m1!1s0x3e5f427f41fdddb7:0xaa4b74612932b5f1!2m2!1d55.2662633!2d25.1948124!3e3?entry=ttu&g_ep=EgoyMDI2MDIyMi4wIKXMDSoASAFQAw%3D%3D",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d231055.95806638285!2d54.98600118886605!3d25.194812399999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f427f41fdddb7%3A0xaa4b74612932b5f1!2sRossovivo!5e0!3m2!1sen!2sfi!4v1771332345800!5m2!1sen!2sfi",
    rating: 4.3,
    ratingCount: "401",
    displayOrder: 2,
    isActive: true,
    images: buildLocationImagePaths("location-businessbay", 15),
  },
];

type LocationReviewPayload = {
  locationId?: unknown;
  rating?: unknown;
  ratingCount?: unknown;
};

type LocationReviewsResponse = {
  reviews?: LocationReviewPayload[];
};

type LocationsPreviewProps = {
  initialLocations?: CmsLocation[];
  sectionTitle?: string;
};

function LocationCard({ location }: { location: CmsLocation }) {
  const [api, setApi] = useState<CarouselApi>();
  const [activeSlide, setActiveSlide] = useState(0);
  const thumbnailTrackRef = useRef<HTMLDivElement | null>(null);
  const thumbnailButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => {
      setActiveSlide(api.selectedScrollSnap());
    };

    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  useEffect(() => {
    const thumbnailTrack = thumbnailTrackRef.current;
    const activeThumbnail = thumbnailButtonRefs.current[activeSlide];

    if (!thumbnailTrack || !activeThumbnail) {
      return;
    }

    const left = activeThumbnail.offsetLeft - thumbnailTrack.offsetLeft;
    thumbnailTrack.scrollTo({ left, behavior: "smooth" });
  }, [activeSlide]);

  const jumpToSlide = useCallback(
    (slideIndex: number) => {
      api?.scrollTo(slideIndex);
    },
    [api],
  );

  return (
    <article className="overflow-hidden rounded-2xl bg-white">
      <div className="relative">
        <Carousel opts={{ loop: true }} setApi={setApi} className="w-full">
          <CarouselContent className="ml-0">
            {location.images.map((image) => (
              <CarouselItem key={image} className="pl-0">
                <div className="relative aspect-[16/10] w-full lg:h-[360px] lg:aspect-auto">
                  <img
                    src={image}
                    alt={`${location.name} restaurant`}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            variant="secondary"
            className="left-3 top-1/2 h-8 w-8 -translate-y-1/2 border border-cream/80 bg-cream/90 text-charcoal hover:bg-cream"
          />
          <CarouselNext
            variant="secondary"
            className="right-3 top-1/2 h-8 w-8 -translate-y-1/2 border border-cream/80 bg-cream/90 text-charcoal hover:bg-cream"
          />
        </Carousel>

        <div className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-charcoal/15 bg-cream/95 px-3 py-1 text-xs font-semibold text-charcoal">
          <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
          {location.rating.toFixed(1)} ({location.ratingCount})
        </div>
      </div>

      <div className="px-3 py-3">
        <div
          ref={thumbnailTrackRef}
          className="flex gap-2 overflow-x-auto pb-1"
        >
          {location.images.map((image, slideIndex) => (
            <button
              key={`${location.id}-thumb-${slideIndex}`}
              ref={(node) => {
                thumbnailButtonRefs.current[slideIndex] = node;
              }}
              type="button"
              onClick={() => jumpToSlide(slideIndex)}
              aria-label={`View ${location.name} image ${slideIndex + 1}`}
              className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-md border-2 transition ${
                activeSlide === slideIndex
                  ? "border-primary"
                  : "border-transparent hover:border-charcoal/30"
              }`}
            >
              <img
                src={image}
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="px-6 py-6 sm:px-8 sm:py-7"
      >
        <h3 className="font-display text-3xl font-bold text-charcoal">
          {location.name}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">{location.address}</p>

        <div className="mt-6 space-y-4 text-sm text-charcoal sm:text-base">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-charcoal/60">
              Hours
            </p>
            <p className="mt-1 whitespace-pre-line">{location.hours}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-charcoal/60">
              Phone
            </p>
            <a
              href={`tel:${location.phone}`}
              className="mt-1 inline-block hover:text-primary"
            >
              {location.phone}
            </a>
          </div>
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <Button asChild variant="cta" className="gap-2">
            <a
              href={location.menuUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                posthog.capture("order_now_clicked", {
                  location_id: location.id,
                  location_name: location.name,
                })
              }
            >
              Order Now
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
          <Button asChild variant="ctaDark">
            <a
              href={location.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                posthog.capture("get_directions_clicked", {
                  location_id: location.id,
                  location_name: location.name,
                })
              }
            >
              Get Directions
            </a>
          </Button>
        </div>
      </motion.div>
    </article>
  );
}

export function LocationsPreview({
  initialLocations = fallbackLocations,
  sectionTitle,
}: LocationsPreviewProps) {
  const pathname = usePathname();
  const isLocationsPage = pathname === "/locations" || pathname === "/locations/";
  const [resolvedLocations, setResolvedLocations] =
    useState<CmsLocation[]>(initialLocations);

  useEffect(() => {
    setResolvedLocations(initialLocations);
  }, [initialLocations]);

  useEffect(() => {
    let isMounted = true;

    const loadLocationReviews = async () => {
      try {
        const response = await fetch("/api/location-reviews");
        if (!response.ok) return;

        const data = (await response.json()) as LocationReviewsResponse;

        if (
          !isMounted ||
          !Array.isArray(data?.reviews) ||
          data.reviews.length === 0
        ) {
          return;
        }

        const reviewByLocation = new Map<
          string,
          { rating: number; ratingCount: string }
        >();

        for (const review of data.reviews) {
          const locationId =
            typeof review.locationId === "string"
              ? review.locationId.trim()
              : "";
          const rating = Number(review.rating);
          const ratingCount =
            typeof review.ratingCount === "string"
              ? review.ratingCount.trim()
              : typeof review.ratingCount === "number"
                ? String(review.ratingCount)
                : "";

          if (!locationId || !Number.isFinite(rating) || !ratingCount) {
            continue;
          }

          reviewByLocation.set(locationId, { rating, ratingCount });
        }

        if (reviewByLocation.size === 0) return;

        setResolvedLocations(
          initialLocations.map((location) => {
            const review = reviewByLocation.get(location.id);
            return review ? { ...location, ...review } : location;
          }),
        );
      } catch {
        // Keep fallback ratings if remote reviews are unavailable.
      }
    };

    loadLocationReviews();

    return () => {
      isMounted = false;
    };
  }, [initialLocations]);

  return (
    <section className="relative z-20 -mt-16 pb-10 bg-cream">
      <div className="w-full bg-cream pt-8 md:pt-10">
        <div className="mx-auto w-full max-w-[1450px] px-4 sm:px-6 lg:px-8">
          <div className="mb-6 text-center">
            <h2 className="heading-section text-charcoal text-3xl inline-flex items-center justify-center gap-3">
              {sectionTitle ||
                (isLocationsPage
                  ? "Visit Locations or Order Online!"
                  : "Visit Our Locations")}
            </h2>
          </div>

          <div className="grid w-full gap-4 lg:grid-cols-2 lg:gap-6">
            {resolvedLocations.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
