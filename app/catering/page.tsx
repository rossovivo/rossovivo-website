import type { Metadata } from "next";
import {
  CateringEventTemplate,
  type CateringEventTemplateContent,
} from "@/components/catering/CateringEventTemplate";
import { getCateringPageContent } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Catering | Rossovivo",
  description:
    "Live-fire pizza catering for corporate events, home celebrations, and weddings across Dubai.",
};

export default async function CateringPage() {
  const cms = await getCateringPageContent();
  const bestsellerSetup = cms.polaroidItems.find((item) => item.isBestseller);

  const generalCateringContent: CateringEventTemplateContent = {
    name: "Catering",
    kicker: "",
    heroTitle: cms.title,
    heroDescription: cms.subtitle,
    audienceNote:
      "Best for: corporate events, home celebrations, weddings, launches, and private gatherings across Dubai.",
    image: cms.heroImageUrl,
    setupSectionEyebrow: cms.polaroidEyebrow,
    setupSectionTitle: cms.polaroidTitle,
    setupOptions: cms.polaroidItems.map((item) => ({
      id: item.id,
      title: item.title,
      suitability: item.isBestseller ? "Bestseller" : item.tag || "Setup",
      description: item.description,
      image: item.imageUrl,
    })),
    featureSectionEyebrow: cms.featuresEyebrow,
    featureSectionTitle: cms.featuresTitle,
    featureItems: cms.featureItems.map((item) => ({
      iconName: item.iconName,
      title: item.title,
      copy: item.copy,
    })),
    highlights: cms.featureItems.map((item) => item.copy),
    includesSectionEyebrow: cms.includesEyebrow,
    includesSectionTitle: cms.includesTitle,
    includesItems: cms.includesItems.map((item) => ({
      name: item.name,
      quote: item.quote,
      designation: item.designation,
      src: item.imageUrl,
    })),
    optionalSectionEyebrow: cms.optionalEyebrow,
    optionalSectionTitle: cms.optionalTitle,
    optionalItems: cms.optionalItems.map((item) => ({
      name: item.name,
      quote: item.quote,
      designation: item.designation,
      src: item.imageUrl,
    })),
    quoteCta: "Request Catering Quote",
    enquiryTitle: cms.eventFormTitle,
    enquiryDescription: cms.eventFormSubtitle,
    eventFormImage: cms.eventFormImageUrl,
    videoSrc: "/hero.mp4",
    formInitialEventType: cms.eventTypeOptions[0] || "Corporate",
    bestsellerSetupId: bestsellerSetup?.id,
    eventTypeOptions: cms.eventTypeOptions,
    availableSpaceOptions: cms.availableSpaceOptions,
    setupPreferenceOptions: cms.setupPreferenceOptions,
  };

  return (
    <CateringEventTemplate
      content={generalCateringContent}
      showEventTypeSelection
    />
  );
}
