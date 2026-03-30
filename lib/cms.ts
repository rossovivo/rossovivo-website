import "server-only";

import { createClient } from "@sanity/client";
import type {
  AboutPageContent,
  CateringFeatureItem,
  CateringMediaItem,
  CateringPageContent,
  CateringPolaroidItem,
  CmsLocation,
  ContactPageContent,
  HomePageContent,
  LegalPageContent,
  PortableText,
  SiteSettings,
} from "@/lib/cms-types";
import {
  getAboutPageContent as getDefaultAboutPageContent,
  getCateringPageContent as getDefaultCateringPageContent,
  getContactPageContent as getDefaultContactPageContent,
  getHomePageContent as getDefaultHomePageContent,
  getLegalPageContent as getDefaultLegalPageContent,
  getLocations as getDefaultLocations,
  getSiteSettings as getDefaultSiteSettings,
} from "@/lib/default-cms";

const sanityProjectId = process.env.SANITY_PROJECT_ID?.trim();
const sanityDataset = process.env.SANITY_DATASET?.trim();
const sanityToken = process.env.SANITY_API_TOKEN?.trim();

const hasSanity = Boolean(sanityProjectId && sanityDataset);

const sanityClient = hasSanity
  ? createClient({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      token: sanityToken || undefined,
      apiVersion: "2023-10-01",
      useCdn: false,
    })
  : null;

type SanitySiteSettings = {
  internalName?: string | null;
  logoLightUrl?: string | null;
  logoDarkUrl?: string | null;
  instagramUrl?: string | null;
  facebookUrl?: string | null;
  tiktokUrl?: string | null;
  whatsappNumber?: string | null;
  primaryPhone?: string | null;
  secondaryPhone?: string | null;
  primaryEmail?: string | null;
  secondaryEmail?: string | null;
  addresses?: string | null;
  footerLocationSummary?: string | null;
  eMenuMediaCityUrl?: string | null;
  eMenuBusinessBayUrl?: string | null;
  orderNowPrimaryLabel?: string | null;
  orderNowPrimaryHref?: string | null;
  orderNowSecondaryLabel?: string | null;
  orderNowSecondaryHref?: string | null;
};

type SanityLocation = {
  id?: string | null;
  entryId?: string | null;
  slug?: string | null;
  name?: string | null;
  address?: string | null;
  phone?: string | null;
  hours?: string | null;
  menuUrl?: string | null;
  directionsUrl?: string | null;
  directionsUrlLong?: string | null;
  mapEmbedUrl?: string | null;
  mapEmbedUrlLong?: string | null;
  rating?: number | null;
  ratingCount?: string | null;
  displayOrder?: number | null;
  isActive?: boolean | null;
  images?: string[] | null;
};

type SanityHomePage = {
  internalName?: string | null;
  heroEyebrow?: string | null;
  heroTitle?: string | null;
  heroTitleHighlight?: string | null;
  heroSubtitle?: string | null;
  heroPrimaryLabel?: string | null;
  heroPrimaryHref?: string | null;
  heroSecondaryLabel?: string | null;
  heroSecondaryHref?: string | null;
  heroVideoUrl?: string | null;
  heroImageUrl?: string | null;
  locationsSectionTitle?: string | null;
  locationEntryIds?: string[] | null;
  cateringTeaserEyebrow?: string | null;
  cateringTeaserTitle?: string | null;
  cateringTeaserDescription?: string | null;
  cateringTeaserEventTypes?: string[] | null;
  cateringTeaserImageUrl?: string | null;
  eventFormTitle?: string | null;
  eventFormSubtitle?: string | null;
  eventFormImageUrl?: string | null;
  socialSectionHandle?: string | null;
};

type SanityAboutPage = {
  internalName?: string | null;
  heroTitle?: string | null;
  heroHighlight?: string | null;
  heroImageUrl?: string | null;
  storyHeading?: string | null;
  storyBody?: PortableText | null;
  storySignatureLabel?: string | null;
  storySignatureName?: string | null;
  storyImageUrl?: string | null;
  ctaTitle?: string | null;
  ctaHighlight?: string | null;
  ctaPrimaryLabel?: string | null;
  ctaPrimaryHref?: string | null;
  ctaSecondaryLabel?: string | null;
  ctaSecondaryHref?: string | null;
};

type SanityContactPage = {
  internalName?: string | null;
  heroTitle?: string | null;
  heroHighlight?: string | null;
  heroSubtitle?: string | null;
  infoTitle?: string | null;
  socialTitle?: string | null;
  formTitle?: string | null;
  formSubtitle?: string | null;
  formSubmitLabel?: string | null;
  locationEntryIds?: string[] | null;
};

type SanityPolaroid = {
  entryId?: string | null;
  id?: string | null;
  title?: string | null;
  tag?: string | null;
  description?: string | null;
  imageUrl?: string | null;
  isBestseller?: boolean | null;
  sortOrder?: number | null;
};

type SanityFeature = {
  entryId?: string | null;
  id?: string | null;
  iconName?: string | null;
  title?: string | null;
  copy?: string | null;
  sortOrder?: number | null;
};

type SanityMediaItem = {
  entryId?: string | null;
  id?: string | null;
  name?: string | null;
  quote?: string | null;
  designation?: string | null;
  imageUrl?: string | null;
  sortOrder?: number | null;
};

type SanityCateringPage = {
  internalName?: string | null;
  title?: string | null;
  subtitle?: string | null;
  heroImageUrl?: string | null;
  polaroidEyebrow?: string | null;
  polaroidTitle?: string | null;
  featuresEyebrow?: string | null;
  featuresTitle?: string | null;
  includesEyebrow?: string | null;
  includesTitle?: string | null;
  optionalEyebrow?: string | null;
  optionalTitle?: string | null;
  eventFormTitle?: string | null;
  eventFormSubtitle?: string | null;
  eventFormImageUrl?: string | null;
  eventTypeOptions?: string[] | null;
  availableSpaceOptions?: string[] | null;
  setupPreferenceOptions?: string[] | null;
  polaroidItems?: SanityPolaroid[] | null;
  featureItems?: SanityFeature[] | null;
  includesItems?: SanityMediaItem[] | null;
  optionalItems?: SanityMediaItem[] | null;
};

type SanityLegalPage = {
  internalName?: string | null;
  slug?: string | null;
  title?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  lastUpdated?: string | null;
  body?: PortableText | null;
  contactEmail?: string | null;
};

const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings" && internalName == "default-site-settings"]
  | order(_updatedAt desc)[0]{
    internalName,
    "logoLightUrl": logoLight.asset->url,
    "logoDarkUrl": logoDark.asset->url,
    instagramUrl,
    facebookUrl,
    tiktokUrl,
    whatsappNumber,
    primaryPhone,
    secondaryPhone,
    primaryEmail,
    secondaryEmail,
    addresses,
    footerLocationSummary,
    eMenuMediaCityUrl,
    eMenuBusinessBayUrl,
    orderNowPrimaryLabel,
    orderNowPrimaryHref,
    orderNowSecondaryLabel,
    orderNowSecondaryHref
  }
`;

const LOCATIONS_QUERY = `
  *[_type == "location"]
  | order(displayOrder asc, slug asc){
    "entryId": coalesce(locationId, _id),
    "id": coalesce(locationId, slug),
    slug,
    name,
    address,
    phone,
    hours,
    menuUrl,
    directionsUrl,
    directionsUrlLong,
    mapEmbedUrl,
    mapEmbedUrlLong,
    rating,
    ratingCount,
    displayOrder,
    isActive,
    "images": coalesce(gallery[].asset->url, [])
  }
`;

const HOME_PAGE_QUERY = `
  *[_type == "homePage" && internalName == "default-home-page"]
  | order(_updatedAt desc)[0]{
    internalName,
    heroEyebrow,
    heroTitle,
    heroTitleHighlight,
    heroSubtitle,
    heroPrimaryLabel,
    heroPrimaryHref,
    heroSecondaryLabel,
    heroSecondaryHref,
    "heroVideoUrl": coalesce(heroVideo.asset->url, heroVideoUrl),
    "heroImageUrl": heroImage.asset->url,
    locationsSectionTitle,
    "locationEntryIds": coalesce(locations[]->locationId, []),
    cateringTeaserEyebrow,
    cateringTeaserTitle,
    cateringTeaserDescription,
    "cateringTeaserEventTypes": coalesce(cateringTeaserEventTypes, []),
    "cateringTeaserImageUrl": cateringTeaserImage.asset->url,
    eventFormTitle,
    eventFormSubtitle,
    "eventFormImageUrl": eventFormImage.asset->url,
    socialSectionHandle
  }
`;

const ABOUT_PAGE_QUERY = `
  *[_type == "aboutPage" && internalName == "default-about-page"]
  | order(_updatedAt desc)[0]{
    internalName,
    heroTitle,
    heroHighlight,
    "heroImageUrl": heroImage.asset->url,
    storyHeading,
    storyBody,
    storySignatureLabel,
    storySignatureName,
    "storyImageUrl": storyImage.asset->url,
    ctaTitle,
    ctaHighlight,
    ctaPrimaryLabel,
    ctaPrimaryHref,
    ctaSecondaryLabel,
    ctaSecondaryHref
  }
`;

const CONTACT_PAGE_QUERY = `
  *[_type == "contactPage" && internalName == "default-contact-page"]
  | order(_updatedAt desc)[0]{
    internalName,
    heroTitle,
    heroHighlight,
    heroSubtitle,
    infoTitle,
    socialTitle,
    formTitle,
    formSubtitle,
    formSubmitLabel,
    "locationEntryIds": coalesce(locations[]->locationId, [])
  }
`;

const CATERING_PAGE_QUERY = `
  *[_type == "cateringPage" && internalName == "default-catering-page"]
  | order(_updatedAt desc)[0]{
    internalName,
    title,
    subtitle,
    "heroImageUrl": heroImage.asset->url,
    polaroidEyebrow,
    polaroidTitle,
    featuresEyebrow,
    featuresTitle,
    includesEyebrow,
    includesTitle,
    optionalEyebrow,
    optionalTitle,
    eventFormTitle,
    eventFormSubtitle,
    "eventFormImageUrl": eventFormImage.asset->url,
    "eventTypeOptions": coalesce(eventTypeOptions, []),
    "availableSpaceOptions": coalesce(availableSpaceOptions, []),
    "setupPreferenceOptions": coalesce(setupPreferenceOptions, []),
    "polaroidItems": coalesce(polaroidItems[]->{
      "entryId": coalesce(internalName, _id),
      "id": internalName,
      title,
      tag,
      description,
      "imageUrl": image.asset->url,
      isBestseller,
      sortOrder
    }, []),
    "featureItems": coalesce(featureItems[]->{
      "entryId": coalesce(internalName, _id),
      "id": internalName,
      iconName,
      title,
      copy,
      sortOrder
    }, []),
    "includesItems": coalesce(includesItems[]->{
      "entryId": coalesce(internalName, _id),
      "id": internalName,
      name,
      quote,
      designation,
      "imageUrl": image.asset->url,
      sortOrder
    }, []),
    "optionalItems": coalesce(optionalItems[]->{
      "entryId": coalesce(internalName, _id),
      "id": internalName,
      name,
      quote,
      designation,
      "imageUrl": image.asset->url,
      sortOrder
    }, [])
  }
`;

const LEGAL_PAGE_QUERY = `
  *[_type == "legalPage" && slug == $slug]
  | order(_updatedAt desc)[0]{
    internalName,
    slug,
    title,
    seoTitle,
    seoDescription,
    lastUpdated,
    body,
    contactEmail
  }
`;

const toStringValue = (value: unknown, fallback = "") => {
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed || fallback;
  }
  if (typeof value === "number" && Number.isFinite(value)) {
    return String(value);
  }
  return fallback;
};

const toNumberValue = (value: unknown, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const toBooleanValue = (value: unknown, fallback = false) => {
  if (typeof value === "boolean") return value;
  return fallback;
};

const toStringArray = (value: unknown, fallback: string[] = []) => {
  if (!Array.isArray(value)) return fallback;
  const cleaned = value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);
  return cleaned.length > 0 ? cleaned : fallback;
};

const formatDateLabel = (rawDate: string) => {
  const date = new Date(rawDate);
  if (Number.isNaN(date.getTime())) return rawDate;
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const inferHomeHeroTitleParts = (title: string) => {
  const trimmedTitle = title.trim();
  if (!trimmedTitle) return null;
  const italianMatch = trimmedTitle.match(/\bItalian\b/i);
  if (!italianMatch?.[0]) return null;

  return {
    title: trimmedTitle,
    highlight: italianMatch[0],
  };
};

const extractPortableTextParagraphs = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];

  const paragraphs: string[] = [];
  for (const block of value) {
    if (!block || typeof block !== "object") continue;
    const typedBlock = block as {
      _type?: string;
      style?: string;
      children?: Array<{ text?: string }>;
    };
    if (typedBlock._type !== "block" || typedBlock.style !== "normal") continue;

    const text = Array.isArray(typedBlock.children)
      ? typedBlock.children
          .map((child) =>
            child && typeof child.text === "string" ? child.text : "",
          )
          .join("")
          .trim()
      : "";

    if (text) paragraphs.push(text);
  }

  return paragraphs;
};

const mapPolaroidItem = (
  item: SanityPolaroid,
  fallback: CateringPolaroidItem,
): CateringPolaroidItem => ({
  id: toStringValue(item.id, fallback.id),
  title: toStringValue(item.title, fallback.title),
  tag: toStringValue(item.tag, fallback.tag),
  description: toStringValue(item.description, fallback.description),
  imageUrl: toStringValue(item.imageUrl, fallback.imageUrl),
  isBestseller: toBooleanValue(item.isBestseller, fallback.isBestseller),
  sortOrder: toNumberValue(item.sortOrder, fallback.sortOrder),
});

const mapFeatureItem = (
  item: SanityFeature,
  fallback: CateringFeatureItem,
): CateringFeatureItem => ({
  id: toStringValue(item.id, fallback.id),
  iconName: toStringValue(item.iconName, fallback.iconName),
  title: toStringValue(item.title, fallback.title),
  copy: toStringValue(item.copy, fallback.copy),
  sortOrder: toNumberValue(item.sortOrder, fallback.sortOrder),
});

const mapMediaItem = (
  item: SanityMediaItem,
  fallback: CateringMediaItem,
): CateringMediaItem => ({
  id: toStringValue(item.id, fallback.id),
  name: toStringValue(item.name, fallback.name),
  quote: toStringValue(item.quote, fallback.quote),
  designation: toStringValue(item.designation, fallback.designation),
  imageUrl: toStringValue(item.imageUrl, fallback.imageUrl),
  sortOrder: toNumberValue(item.sortOrder, fallback.sortOrder),
});

const sanityFetch = async <T>(
  query: string,
  params?: Record<string, unknown>,
): Promise<T | null> => {
  if (!sanityClient) return null;
  try {
    return await sanityClient.fetch<T>(query, params ?? {});
  } catch {
    return null;
  }
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const [legacy, sanity] = await Promise.all([
    getDefaultSiteSettings(),
    sanityFetch<SanitySiteSettings>(SITE_SETTINGS_QUERY),
  ]);

  if (!sanity) return legacy;

  const addresses = toStringValue(sanity.addresses, "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return {
    ...legacy,
    internalName: toStringValue(sanity.internalName, legacy.internalName),
    logoLightUrl: toStringValue(sanity.logoLightUrl, legacy.logoLightUrl),
    logoDarkUrl: toStringValue(sanity.logoDarkUrl, legacy.logoDarkUrl),
    instagramUrl: toStringValue(sanity.instagramUrl, legacy.instagramUrl),
    facebookUrl: toStringValue(sanity.facebookUrl, legacy.facebookUrl),
    tiktokUrl: toStringValue(sanity.tiktokUrl, legacy.tiktokUrl),
    whatsappNumber: toStringValue(sanity.whatsappNumber, legacy.whatsappNumber),
    primaryPhone: toStringValue(sanity.primaryPhone, legacy.primaryPhone),
    secondaryPhone: toStringValue(sanity.secondaryPhone, legacy.secondaryPhone),
    primaryEmail: toStringValue(sanity.primaryEmail, legacy.primaryEmail),
    secondaryEmail: toStringValue(sanity.secondaryEmail, legacy.secondaryEmail),
    addresses: addresses.length > 0 ? addresses : legacy.addresses,
    footerLocationSummary: toStringValue(
      sanity.footerLocationSummary,
      legacy.footerLocationSummary,
    ),
    eMenuMediaCityUrl: toStringValue(
      sanity.eMenuMediaCityUrl,
      legacy.eMenuMediaCityUrl,
    ),
    eMenuBusinessBayUrl: toStringValue(
      sanity.eMenuBusinessBayUrl,
      legacy.eMenuBusinessBayUrl,
    ),
    orderNowPrimaryLabel: toStringValue(
      sanity.orderNowPrimaryLabel,
      legacy.orderNowPrimaryLabel,
    ),
    orderNowPrimaryHref: toStringValue(
      sanity.orderNowPrimaryHref,
      legacy.orderNowPrimaryHref,
    ),
    orderNowSecondaryLabel: toStringValue(
      sanity.orderNowSecondaryLabel,
      legacy.orderNowSecondaryLabel,
    ),
    orderNowSecondaryHref: toStringValue(
      sanity.orderNowSecondaryHref,
      legacy.orderNowSecondaryHref,
    ),
  };
}

export async function getLocations(): Promise<CmsLocation[]> {
  const [legacy, sanity] = await Promise.all([
    getDefaultLocations(),
    sanityFetch<SanityLocation[]>(LOCATIONS_QUERY),
  ]);

  if (!Array.isArray(sanity) || sanity.length === 0) return legacy;

  const mapped = sanity
    .map((location, index): CmsLocation | null => {
      const slug = toStringValue(location.slug, "").trim();
      if (!slug) return null;

      const fallback = legacy.find((item) => item.slug === slug);
      const idFallback = fallback?.id || slug;
      const directionsFallback = fallback?.directionsUrl || "";
      const mapEmbedFallback = fallback?.mapEmbedUrl || "";
      const imagesFallback = fallback?.images || [];

      const directionsUrl = toStringValue(
        location.directionsUrlLong,
        toStringValue(location.directionsUrl, directionsFallback),
      );
      const mapEmbedUrl = toStringValue(
        location.mapEmbedUrlLong,
        toStringValue(location.mapEmbedUrl, mapEmbedFallback),
      );

      return {
        id: toStringValue(location.id, idFallback),
        entryId: toStringValue(location.entryId, fallback?.entryId || ""),
        slug,
        name: toStringValue(location.name, fallback?.name || slug),
        address: toStringValue(location.address, fallback?.address || ""),
        phone: toStringValue(location.phone, fallback?.phone || ""),
        hours: toStringValue(location.hours, fallback?.hours || ""),
        menuUrl: toStringValue(location.menuUrl, fallback?.menuUrl || ""),
        directionsUrl,
        mapEmbedUrl,
        rating: toNumberValue(location.rating, fallback?.rating || 0),
        ratingCount: toStringValue(
          location.ratingCount,
          fallback?.ratingCount || "",
        ),
        displayOrder: toNumberValue(location.displayOrder, index + 1),
        isActive: toBooleanValue(location.isActive, true),
        images: toStringArray(location.images, imagesFallback),
      };
    })
    .filter((location): location is CmsLocation => Boolean(location))
    .sort((a, b) => a.displayOrder - b.displayOrder);

  if (mapped.length === 0) return legacy;
  const active = mapped.filter((location) => location.isActive);
  return active.length > 0 ? active : mapped;
}

export async function getHomePageContent(): Promise<HomePageContent> {
  const [legacy, sanity] = await Promise.all([
    getDefaultHomePageContent(),
    sanityFetch<SanityHomePage>(HOME_PAGE_QUERY),
  ]);

  if (!sanity) return legacy;

  const rawHeroTitle = toStringValue(sanity.heroTitle, legacy.heroTitle);
  const explicitHeroTitleHighlight = toStringValue(
    sanity.heroTitleHighlight,
    "",
  ).trim();
  const inferredHeroTitleParts = explicitHeroTitleHighlight
    ? null
    : inferHomeHeroTitleParts(rawHeroTitle);
  const resolvedHeroTitle = inferredHeroTitleParts?.title || rawHeroTitle;
  const resolvedHeroTitleHighlight =
    explicitHeroTitleHighlight || inferredHeroTitleParts?.highlight || "";

  return {
    ...legacy,
    internalName: toStringValue(sanity.internalName, legacy.internalName),
    heroEyebrow: toStringValue(sanity.heroEyebrow, legacy.heroEyebrow),
    heroTitle: resolvedHeroTitle,
    heroTitleHighlight: resolvedHeroTitleHighlight,
    heroSubtitle: toStringValue(sanity.heroSubtitle, legacy.heroSubtitle),
    heroPrimaryLabel: toStringValue(
      sanity.heroPrimaryLabel,
      legacy.heroPrimaryLabel,
    ),
    heroPrimaryHref: toStringValue(sanity.heroPrimaryHref, legacy.heroPrimaryHref),
    heroSecondaryLabel: toStringValue(
      sanity.heroSecondaryLabel,
      legacy.heroSecondaryLabel,
    ),
    heroSecondaryHref: toStringValue(
      sanity.heroSecondaryHref,
      legacy.heroSecondaryHref,
    ),
    heroVideoUrl: toStringValue(sanity.heroVideoUrl, legacy.heroVideoUrl),
    heroImageUrl: toStringValue(sanity.heroImageUrl, legacy.heroImageUrl),
    locationsSectionTitle: toStringValue(
      sanity.locationsSectionTitle,
      legacy.locationsSectionTitle,
    ),
    locationEntryIds: toStringArray(
      sanity.locationEntryIds,
      legacy.locationEntryIds,
    ),
    cateringTeaserEyebrow: toStringValue(
      sanity.cateringTeaserEyebrow,
      legacy.cateringTeaserEyebrow,
    ),
    cateringTeaserTitle: toStringValue(
      sanity.cateringTeaserTitle,
      legacy.cateringTeaserTitle,
    ),
    cateringTeaserDescription: toStringValue(
      sanity.cateringTeaserDescription,
      legacy.cateringTeaserDescription,
    ),
    cateringTeaserEventTypes: toStringArray(
      sanity.cateringTeaserEventTypes,
      legacy.cateringTeaserEventTypes,
    ),
    cateringTeaserImageUrl: toStringValue(
      sanity.cateringTeaserImageUrl,
      legacy.cateringTeaserImageUrl,
    ),
    eventFormTitle: toStringValue(sanity.eventFormTitle, legacy.eventFormTitle),
    eventFormSubtitle: toStringValue(
      sanity.eventFormSubtitle,
      legacy.eventFormSubtitle,
    ),
    eventFormImageUrl: toStringValue(
      sanity.eventFormImageUrl,
      legacy.eventFormImageUrl,
    ),
    socialSectionHandle: toStringValue(
      sanity.socialSectionHandle,
      legacy.socialSectionHandle,
    ),
  };
}

export async function getAboutPageContent(): Promise<AboutPageContent> {
  const [legacy, sanity] = await Promise.all([
    getDefaultAboutPageContent(),
    sanityFetch<SanityAboutPage>(ABOUT_PAGE_QUERY),
  ]);

  if (!sanity) return legacy;

  const storyParagraphs = extractPortableTextParagraphs(sanity.storyBody);

  return {
    ...legacy,
    internalName: toStringValue(sanity.internalName, legacy.internalName),
    heroTitle: toStringValue(sanity.heroTitle, legacy.heroTitle),
    heroHighlight: toStringValue(sanity.heroHighlight, legacy.heroHighlight),
    heroImageUrl: toStringValue(sanity.heroImageUrl, legacy.heroImageUrl),
    storyHeading: toStringValue(sanity.storyHeading, legacy.storyHeading),
    storyParagraphs:
      storyParagraphs.length > 0 ? storyParagraphs : legacy.storyParagraphs,
    storySignatureLabel: toStringValue(
      sanity.storySignatureLabel,
      legacy.storySignatureLabel,
    ),
    storySignatureName: toStringValue(
      sanity.storySignatureName,
      legacy.storySignatureName,
    ),
    storyImageUrl: toStringValue(sanity.storyImageUrl, legacy.storyImageUrl),
    ctaTitle: toStringValue(sanity.ctaTitle, legacy.ctaTitle),
    ctaHighlight: toStringValue(sanity.ctaHighlight, legacy.ctaHighlight),
    ctaPrimaryLabel: toStringValue(
      sanity.ctaPrimaryLabel,
      legacy.ctaPrimaryLabel,
    ),
    ctaPrimaryHref: toStringValue(sanity.ctaPrimaryHref, legacy.ctaPrimaryHref),
    ctaSecondaryLabel: toStringValue(
      sanity.ctaSecondaryLabel,
      legacy.ctaSecondaryLabel,
    ),
    ctaSecondaryHref: toStringValue(
      sanity.ctaSecondaryHref,
      legacy.ctaSecondaryHref,
    ),
  };
}

export async function getContactPageContent(): Promise<ContactPageContent> {
  const [legacy, sanity] = await Promise.all([
    getDefaultContactPageContent(),
    sanityFetch<SanityContactPage>(CONTACT_PAGE_QUERY),
  ]);

  if (!sanity) return legacy;

  return {
    ...legacy,
    internalName: toStringValue(sanity.internalName, legacy.internalName),
    heroTitle: toStringValue(sanity.heroTitle, legacy.heroTitle),
    heroHighlight: toStringValue(sanity.heroHighlight, legacy.heroHighlight),
    heroSubtitle: toStringValue(sanity.heroSubtitle, legacy.heroSubtitle),
    infoTitle: toStringValue(sanity.infoTitle, legacy.infoTitle),
    socialTitle: toStringValue(sanity.socialTitle, legacy.socialTitle),
    formTitle: toStringValue(sanity.formTitle, legacy.formTitle),
    formSubtitle: toStringValue(sanity.formSubtitle, legacy.formSubtitle),
    formSubmitLabel: toStringValue(
      sanity.formSubmitLabel,
      legacy.formSubmitLabel,
    ),
    locationEntryIds: toStringArray(
      sanity.locationEntryIds,
      legacy.locationEntryIds,
    ),
  };
}

export async function getCateringPageContent(): Promise<CateringPageContent> {
  const [legacy, sanity] = await Promise.all([
    getDefaultCateringPageContent(),
    sanityFetch<SanityCateringPage>(CATERING_PAGE_QUERY),
  ]);

  if (!sanity) return legacy;

  const polaroidItems = Array.isArray(sanity.polaroidItems)
    ? sanity.polaroidItems
        .map((item, index) =>
          mapPolaroidItem(item, legacy.polaroidItems[index] || legacy.polaroidItems[0]),
        )
        .sort((a, b) => a.sortOrder - b.sortOrder)
    : [];

  const featureItems = Array.isArray(sanity.featureItems)
    ? sanity.featureItems
        .map((item, index) =>
          mapFeatureItem(item, legacy.featureItems[index] || legacy.featureItems[0]),
        )
        .sort((a, b) => a.sortOrder - b.sortOrder)
    : [];

  const includesItems = Array.isArray(sanity.includesItems)
    ? sanity.includesItems
        .map((item, index) =>
          mapMediaItem(item, legacy.includesItems[index] || legacy.includesItems[0]),
        )
        .sort((a, b) => a.sortOrder - b.sortOrder)
    : [];

  const optionalItems = Array.isArray(sanity.optionalItems)
    ? sanity.optionalItems
        .map((item, index) =>
          mapMediaItem(item, legacy.optionalItems[index] || legacy.optionalItems[0]),
        )
        .sort((a, b) => a.sortOrder - b.sortOrder)
    : [];

  return {
    ...legacy,
    internalName: toStringValue(sanity.internalName, legacy.internalName),
    title: toStringValue(sanity.title, legacy.title),
    subtitle: toStringValue(sanity.subtitle, legacy.subtitle),
    heroImageUrl: toStringValue(sanity.heroImageUrl, legacy.heroImageUrl),
    polaroidEyebrow: toStringValue(
      sanity.polaroidEyebrow,
      legacy.polaroidEyebrow,
    ),
    polaroidTitle: toStringValue(sanity.polaroidTitle, legacy.polaroidTitle),
    featuresEyebrow: toStringValue(
      sanity.featuresEyebrow,
      legacy.featuresEyebrow,
    ),
    featuresTitle: toStringValue(sanity.featuresTitle, legacy.featuresTitle),
    includesEyebrow: toStringValue(
      sanity.includesEyebrow,
      legacy.includesEyebrow,
    ),
    includesTitle: toStringValue(sanity.includesTitle, legacy.includesTitle),
    optionalEyebrow: toStringValue(
      sanity.optionalEyebrow,
      legacy.optionalEyebrow,
    ),
    optionalTitle: toStringValue(sanity.optionalTitle, legacy.optionalTitle),
    eventFormTitle: toStringValue(sanity.eventFormTitle, legacy.eventFormTitle),
    eventFormSubtitle: toStringValue(
      sanity.eventFormSubtitle,
      legacy.eventFormSubtitle,
    ),
    eventFormImageUrl: toStringValue(
      sanity.eventFormImageUrl,
      legacy.eventFormImageUrl,
    ),
    eventTypeOptions: toStringArray(
      sanity.eventTypeOptions,
      legacy.eventTypeOptions,
    ),
    availableSpaceOptions: toStringArray(
      sanity.availableSpaceOptions,
      legacy.availableSpaceOptions,
    ),
    setupPreferenceOptions: toStringArray(
      sanity.setupPreferenceOptions,
      legacy.setupPreferenceOptions,
    ),
    polaroidItems: polaroidItems.length > 0 ? polaroidItems : legacy.polaroidItems,
    featureItems: featureItems.length > 0 ? featureItems : legacy.featureItems,
    includesItems: includesItems.length > 0 ? includesItems : legacy.includesItems,
    optionalItems: optionalItems.length > 0 ? optionalItems : legacy.optionalItems,
  };
}

export async function getLegalPageContent(
  slug: string,
): Promise<LegalPageContent | null> {
  const [legacy, sanity] = await Promise.all([
    getDefaultLegalPageContent(slug),
    sanityFetch<SanityLegalPage>(LEGAL_PAGE_QUERY, { slug }),
  ]);

  if (!sanity) return legacy;
  if (!legacy && !sanity.title) return null;

  const fallback = legacy;

  const rawLastUpdated = toStringValue(
    sanity.lastUpdated,
    fallback?.lastUpdated || "",
  );
  const lastUpdated = rawLastUpdated ? formatDateLabel(rawLastUpdated) : "";

  return {
    internalName: toStringValue(
      sanity.internalName,
      fallback?.internalName || slug,
    ),
    slug: toStringValue(sanity.slug, fallback?.slug || slug),
    title: toStringValue(sanity.title, fallback?.title || ""),
    seoTitle: toStringValue(sanity.seoTitle, fallback?.seoTitle || ""),
    seoDescription: toStringValue(
      sanity.seoDescription,
      fallback?.seoDescription || "",
    ),
    lastUpdated,
    contactEmail: toStringValue(
      sanity.contactEmail,
      fallback?.contactEmail || "",
    ),
    body:
      Array.isArray(sanity.body) && sanity.body.length > 0
        ? sanity.body
        : fallback?.body || [],
  };
}
