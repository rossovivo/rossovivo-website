"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type { AboutPageContent } from "@/lib/cms-types";

const SHOW_OUR_JOURNEY_SECTION = false;
const locationsLabel = "(Millenium Tower and Media City)";

type AboutPageClientProps = {
  content: AboutPageContent;
};

export function AboutPageClient({ content }: AboutPageClientProps) {
  return (
    <>
      <section className="relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={content.heroImageUrl}
            alt="Rossovivo about hero"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(65, 65, 67, 0.78)" }}
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative z-10 container-tight flex min-h-[400px] md:min-h-[430px] items-center justify-center text-center text-white">
            <div className="mx-auto max-w-3xl">
              <h1 className="heading-display text-white">
                {content.heroTitle}
                <br />
                <span className="text-primary">{content.heroHighlight}</span>
              </h1>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="section-padding bg-white paper-texture">
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mx-auto mb-6 max-w-4xl text-center"
          >
            <h2 className="heading-card font-script text-[#3f2d1a] text-5xl">
              {content.storyHeading}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative mx-auto max-w-4xl rotate-[-0.25deg] overflow-hidden rounded-md border border-[#8f6e3f]/35 bg-[#f7efd9] px-6 py-10 shadow-[0_22px_48px_rgba(41,28,13,0.22)] sm:px-10 md:px-14 md:py-14"
            style={{
              backgroundImage:
                "radial-gradient(circle at 10% 14%, rgba(150,110,58,0.2), transparent 44%), radial-gradient(circle at 87% 87%, rgba(110,75,35,0.16), transparent 38%), linear-gradient(180deg, rgba(255,255,255,0.62), rgba(247,239,217,0.9))",
            }}
          >
            <div className="pointer-events-none absolute inset-2 rounded-sm border border-[#8f6e3f]/18" />
            <div className="pointer-events-none absolute right-0 top-0 h-20 w-20 bg-gradient-to-bl from-[#dcc7a2]/95 via-[#ead7b4]/70 to-transparent shadow-[-4px_4px_10px_rgba(41,28,13,0.14)] hidden md:flex" />
            <div
              className="pointer-events-none absolute inset-0 opacity-25"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom, transparent 0%, rgba(79,56,30,0.08) 52%, transparent 100%)",
              }}
            />
            <div className="absolute right-6 top-6 hidden h-16 w-16 items-center justify-center rounded-full border-2 border-primary/45 text-center text-[10px] font-semibold uppercase tracking-[0.12em] leading-tight text-primary/85 md:flex">
              <span>
                EST.
                <br />
                2009
              </span>
            </div>
            <div className="mt-8 space-y-6">
              {content.storyParagraphs.map((section, index) => {
                const paragraphClasses = `whitespace-pre-line text-lg md:text-[1.35rem] leading-relaxed text-[#3d2f1f] ${
                  index === 0
                    ? "first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-5xl first-letter:text-primary md:first-letter:text-6xl"
                    : ""
                }`;

                if (!section.includes(locationsLabel)) {
                  return (
                    <p key={index} className={paragraphClasses}>
                      {section}
                    </p>
                  );
                }

                const [beforeLocationLabel, afterLocationLabel] =
                  section.split(locationsLabel);

                return (
                  <p key={index} className={paragraphClasses}>
                    {beforeLocationLabel}
                    <Link
                      href="/locations"
                      className="font-medium text-primary underline decoration-primary/45 underline-offset-4 transition-colors hover:text-primary/80"
                    >
                      {locationsLabel}
                    </Link>
                    {afterLocationLabel}
                  </p>
                );
              })}
            </div>

            <div className="pt-10">
              <p className="text-base italic text-[#5a4630]">
                {content.storySignatureLabel}
              </p>
              <p className="font-script text-5xl leading-none text-primary md:text-6xl">
                {content.storySignatureName}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {SHOW_OUR_JOURNEY_SECTION && (
        <section className="section-padding bg-charcoal text-cream">
          <div className="container-tight">
            <p>Our Journey</p>
          </div>
        </section>
      )}

      <section className="bg-charcoal">
        <div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-none sm:rounded-2xl"
          >
            <img
              src={content.storyImageUrl}
              alt="Rossovivo team and kitchen"
              className="block h-full w-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-tight text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-section text-charcoal mb-6">
              {content.ctaTitle}
              <br />
              <span className="text-primary">{content.ctaHighlight}</span>
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild variant="cta" size="lg">
                <Link href={content.ctaPrimaryHref}>{content.ctaPrimaryLabel}</Link>
              </Button>
              <Button asChild variant="ctaDark" size="lg" className="gap-2">
                <Link href={content.ctaSecondaryHref}>
                  {content.ctaSecondaryLabel}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
