import { motion } from 'framer-motion';

export function BrandStory() {
  return (
    <section className="section-padding bg-white">
      <div className="container-tight">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden">
              <img
                src="/assets/hands-dough.jpg"
                alt="Artisan pizza dough making"
                className="w-full aspect-square object-cover"
              />
            </div>
            <div className="absolute -z-10 -top-6 -left-6 w-full h-full bg-primary/10 rounded-3xl" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="uppercase tracking-[0.2em] text-sm text-primary font-medium mb-4 block">
              Our Story
            </span>
            <h2 className="heading-section text-charcoal mb-6">
              Born from<br />
              <span className="text-primary">Fire & Passion</span>
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg">
              <p>
                Rossovivo isn't just a pizzeria—it's a love letter to Italian tradition 
                written in flour, fire, and mozzarella.
              </p>
              <p>
                Every pizza starts with 72-hour fermented dough, San Marzano tomatoes, 
                and the roaring heat of our wood-fired oven. No shortcuts. No compromises.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
