import type { Metadata } from "next";
import { ContactPageClient } from "@/components/contact/ContactPageClient";
import { JsonLd } from "@/components/seo/JsonLd";
import { FAQSection } from "@/components/seo/FAQSection";
import { contactSchemaData, contactFaqs } from "@/lib/seo-data";
import {
  getCateringPageContent,
  getContactPageContent,
  getLocations,
  getSiteSettings,
} from "@/lib/cms";

export const metadata: Metadata = {
  title: "Contact Rossovivo Dubai | Pizza Catering Enquiries & Restaurant Info",
  description:
    "Get in touch with Rossovivo Dubai. Call our Business Bay or Media City restaurants, email us for catering quotes, or fill out our event planning form. We reply within 24 hours.",
};

export default async function ContactPage() {
  const [content, siteSettings, locations, cateringPage] = await Promise.all([
    getContactPageContent(),
    getSiteSettings(),
    getLocations(),
    getCateringPageContent(),
  ]);
  const contactLocations = content.locationEntryIds.length
    ? content.locationEntryIds
        .map((entryId) =>
          locations.find((location) => location.entryId === entryId),
        )
        .filter((location): location is (typeof locations)[number] =>
          Boolean(location),
        )
    : locations;
  const resolvedContactLocations =
    contactLocations.length > 0 ? contactLocations : locations;

  return (
    <>
      <JsonLd data={contactSchemaData} />
      <ContactPageClient
        content={content}
        siteSettings={siteSettings}
        locations={resolvedContactLocations}
        eventTypeOptions={cateringPage.eventTypeOptions}
        availableSpaceOptions={cateringPage.availableSpaceOptions}
        setupPreferenceOptions={cateringPage.setupPreferenceOptions}
      />
      <FAQSection faqs={contactFaqs} />
    </>
  );
}
