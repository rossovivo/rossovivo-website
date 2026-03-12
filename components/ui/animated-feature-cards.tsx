"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type AnimatedFeatureCardItem = {
  quote: string;
  name: string;
  designation?: string;
  src: string;
};

type AnimatedFeatureCardsProps = {
  items: AnimatedFeatureCardItem[];
  className?: string;
  autoplay?: boolean;
  autoplayIntervalMs?: number;
};

export function AnimatedFeatureCards({
  items,
  className,
  autoplayIntervalMs = 4000,
}: AnimatedFeatureCardsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay || items.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, autoplayIntervalMs);

    return () => window.clearInterval(timer);
  }, [autoplay, autoplayIntervalMs, items.length]);

  if (items.length === 0) {
    return null;
  }

  const activeItem = items[activeIndex];
  const activeImageSrc = activeItem?.src?.trim() || "";

  return (
    <div className={cn("w-full", className)}>
      <div className="grid gap-4 lg:grid-cols-[1.15fr_1fr] lg:items-stretch">
        <div className="order-2 lg:order-1 flex flex-col">
          <div
            onMouseEnter={() => setAutoplay(false)}
            onMouseLeave={() => setAutoplay(true)}
            onClick={() => setAutoplay(false)}
            className="bg-charcoal/[0.04] p-2 md:p-4 rounded-3xl"
          >
            {items.map((item, index) => (
              <button
                key={item.name}
                type="button"
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "w-full px-3 py-4 md:my-2 border border-transparent text-left transition-colors rounded-3xl",
                  index === activeIndex
                    ? "bg-white/[0.7] border-gray-200"
                    : "bg-transparent",
                )}
              >
                <p className="font-display text-xl md:text-2xl text-charcoal">
                  {item.name}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.quote}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="order-1 lg:order-2 relative h-full min-h-[230px] md:min-h-[300px] lg:min-h-0 overflow-hidden rounded-3xl">
          <AnimatePresence mode="wait">
            {activeImageSrc ? (
              <motion.img
                key={activeImageSrc}
                src={activeImageSrc}
                alt={activeItem.name}
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                className="absolute inset-0 h-full w-full object-cover rounded-3xl"
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            ) : (
              <motion.div
                key={`placeholder-${activeIndex}`}
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cream via-[#efe4cf] to-[#dcc7a2]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
