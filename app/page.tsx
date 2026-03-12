import { Hero } from "@/components/home/Hero";
import { CateringTeaser } from "@/components/home/CateringTeaser";
import { LocationsPreview } from "@/components/home/LocationsPreview";
import { FinalCTA } from "@/components/home/FinalCTA";
import { SocialProof } from "@/components/home/SocialProof";
import {
  getCateringPageContent,
  getHomePageContent,
  getLocations,
  getSiteSettings,
} from "@/lib/cms";

const Index = async () => {
  const [homePage, locations, siteSettings, cateringPage] = await Promise.all([
    getHomePageContent(),
    getLocations(),
    getSiteSettings(),
    getCateringPageContent(),
  ]);
  const homeLocations = homePage.locationEntryIds.length
    ? homePage.locationEntryIds
        .map((entryId) =>
          locations.find((location) => location.entryId === entryId),
        )
        .filter((location): location is (typeof locations)[number] =>
          Boolean(location),
        )
    : locations;
  const resolvedHomeLocations =
    homeLocations.length > 0 ? homeLocations : locations;

  return (
    <>
      <Hero
        eyebrow={homePage.heroEyebrow}
        title={homePage.heroTitle}
        titleHighlight={homePage.heroTitleHighlight}
        subtitle={homePage.heroSubtitle}
        primaryLabel={homePage.heroPrimaryLabel}
        primaryHref={homePage.heroPrimaryHref}
        secondaryLabel={homePage.heroSecondaryLabel}
        secondaryHref={homePage.heroSecondaryHref}
        heroVideoUrl={homePage.heroVideoUrl}
        heroImageUrl={homePage.heroImageUrl}
        eMenuMediaCityUrl={siteSettings.eMenuMediaCityUrl}
        eMenuBusinessBayUrl={siteSettings.eMenuBusinessBayUrl}
      />
      <LocationsPreview
        initialLocations={resolvedHomeLocations}
        sectionTitle={homePage.locationsSectionTitle}
      />
      <CateringTeaser
        eyebrow={homePage.cateringTeaserEyebrow}
        title={homePage.cateringTeaserTitle}
        description={homePage.cateringTeaserDescription}
        eventTypes={homePage.cateringTeaserEventTypes}
        imageUrl={homePage.cateringTeaserImageUrl}
        ctaLabel={siteSettings.orderNowSecondaryLabel}
        ctaHref={siteSettings.orderNowSecondaryHref}
      />
      <SocialProof
        instagramUrl={siteSettings.instagramUrl}
        instagramHandle={homePage.socialSectionHandle}
      />
      <FinalCTA
        title={homePage.eventFormTitle}
        subtitle={homePage.eventFormSubtitle}
        imageUrl={homePage.eventFormImageUrl}
        submitLabel="Request Catering Quote"
        eventTypeOptions={cateringPage.eventTypeOptions}
        availableSpaceOptions={cateringPage.availableSpaceOptions}
        setupPreferenceOptions={cateringPage.setupPreferenceOptions}
      />
    </>
  );
};

export default Index;
