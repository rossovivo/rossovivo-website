"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Building2, Home, Heart, ArrowRight } from "lucide-react";

type CateringTeaserProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  eventTypes?: string[];
  imageUrl?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

const fallbackEventTypes = ["Corporate Catering", "Home Events", "Weddings"];
const eventIcons = [Building2, Home, Heart];

export function CateringTeaser({
  eyebrow = "A Full Italian Experience.",
  title = "Catering For Every Occasion.",
  description =
    "From birthdays and private dinners to weddings and corporate activations, we cook everything on-site using real pizza ovens and pasta stations - transforming your event into a live Italian feast.",
  eventTypes = fallbackEventTypes,
  imageUrl = "/assets/catering-event.jpg",
  ctaLabel = "Plan an Event",
  ctaHref = "/catering",
}: CateringTeaserProps) {
  return (
    <section className="relative z-20 section-padding bg-charcoal text-cream overflow-hidden">
      <div className="w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-auto overflow-hidden">
              <img
                src={imageUrl}
                alt="Rossovivo catering event"
                className="w-full h-full object-fill"
              />
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="px-8 md:px-0 order-1 lg:order-2"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="uppercase tracking-[0.2em] text-sm text-primary font-medium">
                {eyebrow}
              </span>
            </div>

            <h2 className="heading-section text-cream mb-6">{title}</h2>

            <p className="text-cream/70 text-lg mb-10 max-w-lg">{description}</p>

            <div className="mb-10 max-w-xl space-y-4">
              {eventTypes.map((eventType, index) => {
                const Icon = eventIcons[index] || Building2;
                return (
                <motion.div
                  key={eventType}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="group flex items-center justify-between rounded-2xl px-5 py-1">
                    <span className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-primary" />
                      <span className="text-2xl leading-none">{eventType}</span>
                    </span>
                  </div>
                </motion.div>
                );
              })}
            </div>
            <div className="flex px-5 items-center">
              <Button asChild size="lg" className="text-white gap-2">
                <Link href={ctaHref}>
                  {ctaLabel}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
