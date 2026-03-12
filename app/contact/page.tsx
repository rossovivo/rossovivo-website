import { ContactPageClient } from "@/components/contact/ContactPageClient";
import {
  getCateringPageContent,
  getContactPageContent,
  getLocations,
  getSiteSettings,
} from "@/lib/cms";

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
    <ContactPageClient
      content={content}
      siteSettings={siteSettings}
      locations={resolvedContactLocations}
      eventTypeOptions={cateringPage.eventTypeOptions}
      availableSpaceOptions={cateringPage.availableSpaceOptions}
      setupPreferenceOptions={cateringPage.setupPreferenceOptions}
    />
  );
}
