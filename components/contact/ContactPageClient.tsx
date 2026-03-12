"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";
import Link from "next/link";
import { SiTiktok } from "react-icons/si";
import { SegmentLeadForm } from "@/components/catering/SegmentLeadForm";
import type {
  CmsLocation,
  ContactPageContent,
  SiteSettings,
} from "@/lib/cms-types";

type ContactPageClientProps = {
  content: ContactPageContent;
  siteSettings: SiteSettings;
  locations: CmsLocation[];
  eventTypeOptions?: string[];
  availableSpaceOptions?: string[];
  setupPreferenceOptions?: string[];
};

export function ContactPageClient({
  content,
  siteSettings,
  locations,
  eventTypeOptions,
  availableSpaceOptions,
  setupPreferenceOptions,
}: ContactPageClientProps) {
  return (
    <>
      <section className="bg-charcoal py-32 pb-24">
        <div className="container-tight text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="heading-display text-cream py-8">
              {content.heroTitle} <span className="text-primary">{content.heroHighlight}</span>
            </h1>

            <p className="text-xl text-cream/70 max-w-2xl mx-auto">
              {content.heroSubtitle}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-cream paper-texture">
        <div className="container-tight">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="heading-card text-charcoal mb-8">{content.infoTitle}</h2>

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-charcoal">Phone</h4>
                    <div className="mt-1 flex flex-col gap-1">
                      {locations.map((location) => (
                        <a
                          key={`${location.slug}-phone`}
                          href={`tel:${location.phone.replace(/\s+/g, "")}`}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {location.name}: {location.phone}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-charcoal">Email</h4>
                    <a
                      href={`mailto:${siteSettings.primaryEmail}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {siteSettings.primaryEmail}
                    </a>
                    <a
                      href={`mailto:${siteSettings.secondaryEmail}`}
                      className="mt-1 block text-muted-foreground hover:text-primary transition-colors"
                    >
                      {siteSettings.secondaryEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-charcoal">Locations</h4>
                    {locations.map((location) => (
                      <p key={`${location.slug}-address`} className="text-muted-foreground mt-1">
                        {location.name}: {location.address}
                      </p>
                    ))}
                    <Link
                      href="/locations"
                      className="text-primary hover:underline text-sm"
                    >
                      View all locations →
                    </Link>
                  </div>
                </div>
              </div>

              <div className="mb-10">
                <h4 className="font-display font-bold text-charcoal mb-4">
                  {content.socialTitle}
                </h4>
                <div className="flex gap-4">
                  <a
                    href={siteSettings.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Rossovivo Instagram"
                    className="p-3 bg-charcoal text-cream rounded-xl hover:bg-primary transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href={siteSettings.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Rossovivo Facebook"
                    className="p-3 bg-charcoal text-cream rounded-xl hover:bg-primary transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href={siteSettings.tiktokUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Rossovivo TikTok"
                    className="p-3 bg-charcoal text-cream rounded-xl hover:bg-primary transition-colors"
                  >
                    <SiTiktok className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="mb-6 font-display text-2xl font-bold text-charcoal">
                {content.formTitle}
              </h3>
              {content.formSubtitle ? (
                <p className="mb-6 text-muted-foreground">{content.formSubtitle}</p>
              ) : null}
              <SegmentLeadForm
                segmentName="Event"
                submitLabel={content.formSubmitLabel}
                initialEventType="Corporate"
                eventTypeOptions={eventTypeOptions}
                availableSpaceOptions={availableSpaceOptions}
                setupPreferenceOptions={setupPreferenceOptions}
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
