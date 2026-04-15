"use client";

import { motion } from "framer-motion";

export function BlogPageHero() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-charcoal">
      <div className="relative z-10 container-tight flex min-h-[400px] md:min-h-[430px] items-center justify-center text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="uppercase tracking-[0.22em] text-xs sm:text-sm font-medium text-cream/80 mb-4">
            From Our Kitchen
          </p>
          <h1 className="heading-display text-white">
            The Rossovivo <span className="text-primary">Blog</span>
          </h1>
          <p className="mt-5 text-base md:text-xl text-cream/70 max-w-2xl mx-auto font-light">
            Stories, recipes, and the latest from our kitchen
          </p>
        </motion.div>
      </div>
    </section>
  );
}
