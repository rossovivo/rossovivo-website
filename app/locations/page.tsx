import type { Metadata } from "next";
import { LocationsPageClient } from "@/components/locations/LocationsPageClient";
import { JsonLd } from "@/components/seo/JsonLd";
import { FAQSection } from "@/components/seo/FAQSection";
import { locationsSchemaData, locationsFaqs } from "@/lib/seo-data";
import { getLocations } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Rossovivo Locations in Dubai | Business Bay & Media City Pizzeria",
  description:
    "Find Rossovivo at two prime Dubai locations — Business Bay (Millennium Tower) & Media City (Office Park Building). Dine in, takeaway or order online. Open 7 days a week.",
};

export default async function LocationsPage() {
  const locations = await getLocations();
  return (
    <>
      <JsonLd data={locationsSchemaData} />
      <LocationsPageClient locations={locations} />
      <FAQSection faqs={locationsFaqs} />
    </>
  );
}
