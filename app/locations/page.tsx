import { LocationsPageClient } from "@/components/locations/LocationsPageClient";
import { getLocations } from "@/lib/cms";

export default async function LocationsPage() {
  const locations = await getLocations();
  return <LocationsPageClient locations={locations} />;
}
