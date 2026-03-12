"use client";

import { motion } from "framer-motion";
import { LocationsPreview } from "@/components/home/LocationsPreview";
import type { CmsLocation } from "@/lib/cms-types";

type LocationsPageClientProps = {
  locations: CmsLocation[];
};

export function LocationsPageClient({ locations }: LocationsPageClientProps) {
  return (
    <>
      <section className="bg-charcoal pt-32 pb-24">
        <div className="container-tight text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="heading-display text-cream py-8">
              Our <span className="text-primary">Locations</span>
            </h1>
          </motion.div>
        </div>
      </section>

      <div className="pt-20">
        <LocationsPreview
          initialLocations={locations}
          sectionTitle="Visit Locations or Order Online!"
        />
      </div>

      <section className="w-full pt-20 bg-cream">
        <div className="grid w-full grid-cols-1 md:grid-cols-2">
          {locations
            .filter((location) => Boolean(location.mapEmbedUrl))
            .map((location) => (
              <div
                key={`${location.slug}-map`}
                className="relative h-[360px] w-full md:h-[520px]"
              >
                <iframe
                  title={`${location.name} map`}
                  src={location.mapEmbedUrl}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>
            ))}
        </div>
      </section>
    </>
  );
}
