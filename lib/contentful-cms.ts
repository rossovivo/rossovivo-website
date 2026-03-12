import "server-only";

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
  RichTextDocument,
  SiteSettings,
} from "@/lib/cms-types";

type ContentfulEntry = {
  sys?: { id?: string };
  fields?: Record<string, unknown>;
};

type ContentfulAsset = {
  sys?: { id?: string };
  fields?: {
    file?: unknown;
  };
};

type ContentfulEntriesResponse = {
  items?: ContentfulEntry[];
  includes?: {
    Asset?: ContentfulAsset[];
  };
};

const DEFAULT_LOCALE = "en-US";

const fallbackSiteSettings: SiteSettings = {
  internalName: "default-site-settings",
  logoLightUrl: "/logo-w.png",
  logoDarkUrl: "/logo.png",
  instagramUrl: "https://www.instagram.com/rossovivopizza/",
  facebookUrl: "https://www.facebook.com/profile.php?id=61573936196965",
  tiktokUrl: "https://www.tiktok.com/@rossovivopizza",
  whatsappNumber: "97143805833",
  primaryPhone: "+971 4 380 5833",
  secondaryPhone: "+971 4 427 2477",
  primaryEmail: "catering@rossovivo.ae",
  secondaryEmail: "ciao@rossovivo.ae",
  addresses: [
    "Business Bay: Ground Floor, Millennium Tower, Sheikh Zayed Road, Dubai",
    "Media City: Ground Floor, Office Park Building, Al Bourooj Street, Dubai",
  ],
  footerLocationSummary: "Media City and Business Bay, Dubai",
  eMenuMediaCityUrl: "https://qr.emenu.ae/rossovivo-mediacity",
  eMenuBusinessBayUrl: "https://qr.emenu.ae/rossovivo-businessbay",
  orderNowPrimaryLabel: "Order Now",
  orderNowPrimaryHref: "/locations",
  orderNowSecondaryLabel: "Plan an Event",
  orderNowSecondaryHref: "/catering",
};

const buildLocationImagePaths = (folder: string, imageCount: number) =>
  Array.from(
    { length: imageCount },
    (_, index) => `/${folder}/${index + 1}.jpg`,
  );

const fallbackLocations: CmsLocation[] = [
  {
    id: "media-city",
    entryId: "media-city",
    slug: "media-city",
    name: "Media City",
    address: "Ground Floor, Office Park Building, Al Bourooj Street, Dubai",
    phone: "+971 4 427 2477",
    hours:
      "Sunday to Thursday: 11 AM - 11 PM\nFriday to Saturday: 11 AM - 11:30 PM",
    menuUrl: "https://qr.emenu.ae/rossovivo-mediacity",
    directionsUrl:
      "https://www.google.com/maps/dir//Rossovivo+Artisan+Pizza+-+Al+Sufouh+-+Dubai+Internet+City+-+Dubai+-+United+Arab+Emirates/@65.0674176,25.4541824,10z/data=!4m18!1m8!3m7!1s0x3e5f6b6d1a525c13:0x39750c204cd6190c!2sRossovivo+Artisan+Pizza!8m2!3d25.1045781!4d55.1687334!15sCglyb3Nzb3Zpdm9aCyIJcm9zc292aXZvkgEKcmVzdGF1cmFudOABAA!16s%2Fg%2F1pp2ty710!4m8!1m0!1m5!1m1!1s0x3e5f6b6d1a525c13:0x39750c204cd6190c!2m2!1d55.1687334!2d25.1045781!3e3?entry=ttu&g_ep=EgoyMDI2MDIyMi4wIKXMDSoASAFQAw%3D%3D",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d231055.95806638285!2d54.98600118886605!3d25.194812399999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6b6d1a525c13%3A0x39750c204cd6190c!2sRossovivo%20Artisan%20Pizza!5e0!3m2!1sen!2sfi!4v1771332367460!5m2!1sen!2sfi",
    rating: 4.3,
    ratingCount: "297",
    displayOrder: 1,
    isActive: true,
    images: buildLocationImagePaths("location-mediacity", 18),
  },
  {
    id: "business-bay",
    entryId: "business-bay",
    slug: "business-bay",
    name: "Business Bay",
    address: "Ground Floor, Millennium Tower, Sheikh Zayed Road, Dubai",
    phone: "+971 4 380 5833",
    hours:
      "Sunday to Thursday: 11 AM - 11 PM\nFriday to Saturday: 11 AM - 11:30 PM",
    menuUrl: "https://qr.emenu.ae/rossovivo-businessbay",
    directionsUrl:
      "https://www.google.com/maps/dir//Rossovivo+-+Ground+Floor,+Millennium+Tower,+Sheikh+Zayed+Road%D8%8C+Business+Bay+-+Dubai+-+United+Arab+Emirates%E2%80%AD/@65.0674176,25.4541824,10z/data=!3m1!5s0x3e5f685b1ccf4f7b:0xfe15742f9994907!4m18!1m8!3m7!1s0x3e5f427f41fdddb7:0xaa4b74612932b5f1!2sRossovivo!8m2!3d25.1948124!4d55.2662633!15sCglyb3Nzb3Zpdm9aCyIJcm9zc292aXZvkgEQcGl6emFfcmVzdGF1cmFudOABAA!16s%2Fg%2F113jlr73r!4m8!1m0!1m5!1m1!1s0x3e5f427f41fdddb7:0xaa4b74612932b5f1!2m2!1d55.2662633!2d25.1948124!3e3?entry=ttu&g_ep=EgoyMDI2MDIyMi4wIKXMDSoASAFQAw%3D%3D",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d231055.95806638285!2d54.98600118886605!3d25.194812399999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f427f41fdddb7%3A0xaa4b74612932b5f1!2sRossovivo!5e0!3m2!1sen!2sfi!4v1771332345800!5m2!1sen!2sfi",
    rating: 4.3,
    ratingCount: "401",
    displayOrder: 2,
    isActive: true,
    images: buildLocationImagePaths("location-businessbay", 15),
  },
];

const fallbackHomePage: HomePageContent = {
  internalName: "default-home-page",
  heroEyebrow: "Artisan Pizza",
  heroTitle: "Authentic Italian Pizza Since 2009",
  heroTitleHighlight: "Italian",
  heroSubtitle: "Artisanal wood-fired pizzas, pastas, and Italian classics.",
  heroPrimaryLabel: "Plan an Event",
  heroPrimaryHref: "/#enquiry-form",
  heroSecondaryLabel: "See Menu",
  heroSecondaryHref: "/#order-now",
  heroVideoUrl: "/hero.mp4",
  heroImageUrl: "",
  locationsSectionTitle: "Visit Our Locations",
  locationEntryIds: [],
  cateringTeaserEyebrow: "A Full Italian Experience.",
  cateringTeaserTitle: "Catering For Every Occasion.",
  cateringTeaserDescription:
    "From birthdays and private dinners to weddings and corporate activations, we cook everything on-site using real pizza ovens and pasta stations - transforming your event into a live Italian feast.",
  cateringTeaserEventTypes: ["Corporate Catering", "Home Events", "Weddings"],
  cateringTeaserImageUrl: "/assets/catering-event.jpg",
  eventFormTitle: "Start Planning Your Event!",
  eventFormSubtitle:
    "Share your event details and preferred setup. We'll tailor a proposal around your guest count, venue constraints, and service timing.",
  eventFormImageUrl: "",
  socialSectionHandle: "@rossovivo",
};

const fallbackAboutPage: AboutPageContent = {
  internalName: "default-about-page",
  heroTitle: "About",
  heroHighlight: "Rossovivo",
  heroImageUrl: "/assets/about-hero.jpg",
  storyHeading: "Dear pizza lovers,",
  storyParagraphs: [
    "At Rossovivo, we keep things simple.\nGreat ingredients. Proper technique. No shortcuts.",
    "We’re an Italian trattoria specialised in wood-fired pizzas, handcrafted pastas, and comfort Italian classics since 2009!",
    "Our food is made using premium, authentic ingredients - our dough is prepped with care, our sauces are slow-cooked, and our cheeses are made in-house making each item on our menu unforgettable. From our two ROSSOVIVO locations in Dubai (Millenium Tower and Media City) we deliver our food across the city and offer a friendly dine-in experience.",
    "When the gatherings get bigger, we bring our kitchen (and the full Italian experience) to you.\nFrom intimate gatherings and birthdays to large celebrations and corporate events, our service is completely customisable to your event requirements. With great food comes greater entertainment as our chefs cook everything fresh on-site using real pizza ovens and pasta stations. Pre-event setup and post-event cleanup is also included with no additional fees.",
    "We don't believe in overcomplicating Italian food.\nWe stay true to the original values of our craft - to produce authentic Italian pizza because our passion is for real pizza.",
  ],
  storySignatureLabel: "Con affetto,",
  storySignatureName: "Rossovivo",
  storyImageUrl: "/assets/about-images.jpg",
  ctaTitle: "Ready to Taste the",
  ctaHighlight: "Difference?",
  ctaPrimaryLabel: "Plan an Event",
  ctaPrimaryHref: "/catering",
  ctaSecondaryLabel: "Order Now",
  ctaSecondaryHref: "/locations",
};

const fallbackContactPage: ContactPageContent = {
  internalName: "default-contact-page",
  heroTitle: "Let's",
  heroHighlight: "Talk",
  heroSubtitle:
    "Questions, feedback, or just want to say hello? We'd love to hear from you.",
  infoTitle: "We're Here to Help",
  socialTitle: "Follow Us",
  formTitle: "Plan Your Event",
  formSubtitle: "",
  formSubmitLabel: "Send Event Enquiry",
  locationEntryIds: [],
};

const fallbackPolaroidItems: CateringPolaroidItem[] = [
  {
    id: "setup-electric-oven",
    title: "Electric Ovens",
    tag: "Indoor Friendly",
    description: "Ideal for indoor / small venues",
    imageUrl: "/assets/electric-oven.jpg",
    isBestseller: false,
    sortOrder: 1,
  },
  {
    id: "setup-wood-fire-oven",
    title: "Wood Fire Oven",
    tag: "Outdoor Ready",
    description: "Fast setup and flexible for outdoor locations",
    imageUrl: "/assets/wood-oven.jpg",
    isBestseller: false,
    sortOrder: 2,
  },
  {
    id: "setup-tuk-tuk-oven-truck",
    title: "Tuk-tuk Oven Truck",
    tag: "Bestseller",
    description: "Ideal for outdoor events and includes a wood-fire oven",
    imageUrl: "/assets/truck.jpg",
    isBestseller: true,
    sortOrder: 3,
  },
  {
    id: "setup-pasta-station",
    title: "Pasta Station",
    tag: "Add On",
    description:
      "Suitable for all venues. Pasta that's cooked live, served fresh",
    imageUrl: "/assets/pasta-station.jpg",
    isBestseller: false,
    sortOrder: 4,
  },
];

const fallbackFeatureItems: CateringFeatureItem[] = [
  {
    id: "feature-live-cooking",
    iconName: "UtensilsCrossed",
    title: "Live Cooking Experience",
    copy: "Great food, great entertainment! Food cooked live using real pizza ovens and pasta stations.",
    sortOrder: 1,
  },
  {
    id: "feature-setup-cleanup",
    iconName: "Users",
    title: "From Chefs to Setup & Cleanup",
    copy: "Zero-hassle hosting! A professional service with chefs, equipment, setup, and cleanup - all included, no hidden fees.",
    sortOrder: 2,
  },
  {
    id: "feature-freshly-cooked",
    iconName: "Flame",
    title: "Freshly Cooked Service",
    copy: "Freshly cooked, beautifully served! No back kitchen, reheating, or boring buffet lines.",
    sortOrder: 3,
  },
  {
    id: "feature-flexible-scalable",
    iconName: "Calendar",
    title: "Flexible & Scalable",
    copy: "Flexible setups and packages - from intimate gatherings to 500 person events.",
    sortOrder: 4,
  },
  {
    id: "feature-custom-menu",
    iconName: "MessageSquare",
    title: "Custom Menu Planning",
    copy: "Customisable menus, guided by experts! Bespoke menus personalised for your event and guests.",
    sortOrder: 5,
  },
  {
    id: "feature-options",
    iconName: "CheckCircle2",
    title: "Variety of Options",
    copy: "Optional upgrades! Add-on stations for drinks, desserts, and full ceramic setups.",
    sortOrder: 6,
  },
];

const fallbackIncludesItems: CateringMediaItem[] = [
  {
    id: "include-oven-pasta-stations",
    name: "On-site Pizza Ovens & Pasta Stations",
    quote:
      "Choose from our signature ovens including electric, wood fire, and the tuk tuk truck or opt for a pasta station.",
    designation: "Service Included",
    imageUrl: "/assets/service-images/Image1.jpg",
    sortOrder: 1,
  },
  {
    id: "include-chef-setup-cleanup",
    name: "Live Chef, Full Setup & Cleanup",
    quote:
      "Our service includes a live chef, pre-event setup and post-event cleanup with no hidden fees.",
    designation: "Service Included",
    imageUrl: "/assets/service-images/Image2.jpg",
    sortOrder: 2,
  },
  {
    id: "include-authentic-ingredients",
    name: "Authentic Toppings & Ingredients",
    quote:
      "Sourced fresh or made in-house, our chefs cook using authentic Italian ingredients.",
    designation: "Service Included",
    imageUrl: "/assets/service-images/Image3.jpg",
    sortOrder: 3,
  },
  {
    id: "include-live-station-time",
    name: "3 Hours Of Live-Station Time",
    quote:
      "Basic package includes 3 hours of pizza oven or pasta station time.",
    designation: "Service Included",
    imageUrl: "/assets/service-images/Image4.jpg",
    sortOrder: 4,
  },
];

const fallbackOptionalItems: CateringMediaItem[] = [
  {
    id: "optional-premium-ingredients",
    name: "Request Premium Ingredients & Toppings",
    quote:
      "Looking for something more unique? Choose from a variety of premium ingredients sourced fresh or made in-house.",
    designation: "Optional Upgrade",
    imageUrl: "/assets/addon-images/Image2.jpg",
    sortOrder: 101,
  },
  {
    id: "optional-customise-menu",
    name: "Customise Your Menu",
    quote:
      "Fully customize and expand your menu by adding appetisers, dessert stations, and other items.",
    designation: "Optional Upgrade",
    imageUrl: "/assets/addon-images/Image1.jpg",
    sortOrder: 102,
  },
  {
    id: "optional-extend-service-time",
    name: "Extend Service Time",
    quote: "Add more time to the pizza oven or pasta station if required.",
    designation: "Optional Upgrade",
    imageUrl: "/assets/addon-images/Image3.jpg",
    sortOrder: 103,
  },
  {
    id: "optional-nutella-pizza",
    name: "Nutella Pizza",
    quote:
      "Surprise your guests with our signature Nutella Pizza! Decadent and a fan favorite.",
    designation: "Optional Upgrade",
    imageUrl: "/temp-images-catering/nutella-pizza.jpg",
    sortOrder: 104,
  },
  {
    id: "optional-service-staff",
    name: "Request Service Staff",
    quote:
      "Request more service staff to cater to your guests in addition to the chef.",
    designation: "Optional Upgrade",
    imageUrl: "/assets/addon-images/Image5.jpg",
    sortOrder: 105,
  },
];

const fallbackMediaImageById = new Map(
  [...fallbackIncludesItems, ...fallbackOptionalItems].map((item) => [
    item.id,
    item.imageUrl,
  ]),
);

const fallbackMediaImageByName = new Map(
  [...fallbackIncludesItems, ...fallbackOptionalItems].map((item) => [
    item.name.trim().toLowerCase(),
    item.imageUrl,
  ]),
);

const fallbackCateringPage: CateringPageContent = {
  internalName: "default-catering-page",
  title: "Not just catering. A full Italian experience!",
  subtitle:
    "We transform your event into a live Italian feast. Our chefs cook everything fresh on-site using real pizza ovens and pasta stations",
  heroImageUrl: "/assets/hero-pizza.jpg",
  polaroidEyebrow: "From Oven To Table",
  polaroidTitle: "From Oven To Table",
  featuresEyebrow: "Service Features",
  featuresTitle: "What Makes Us Different?",
  includesEyebrow: "Service Details",
  includesTitle: "Catering Service Includes",
  optionalEyebrow: "Optional",
  optionalTitle: "Customise Package With Add Ons",
  eventFormTitle: "Start Planning Your Event!",
  eventFormSubtitle:
    "Please share the event details and preferred setup. We'll tailor a proposal around your requirements and reach out to you via WhatsApp.",
  eventFormImageUrl: "",
  eventTypeOptions: ["Corporate", "Home Events", "Weddings"],
  availableSpaceOptions: [
    "Indoor",
    "Outdoor",
    "Indoor + Outdoor",
    "Not Sure Yet",
  ],
  setupPreferenceOptions: ["Pizza Oven", "Pasta Station"],
  polaroidItems: fallbackPolaroidItems,
  featureItems: fallbackFeatureItems,
  includesItems: fallbackIncludesItems,
  optionalItems: fallbackOptionalItems,
};

const fallbackPrivacyLegal: LegalPageContent = {
  internalName: "privacy-policy",
  slug: "privacy-policy",
  title: "Privacy Policy",
  seoTitle: "Privacy Policy | Rossovivo Pizzeria",
  seoDescription:
    "Read how Rossovivo collects, uses, and protects your personal information.",
  lastUpdated: "February 14, 2026",
  contactEmail: "catering@rossovivo.ae",
  body: {
    nodeType: "document",
    data: {},
    content: [
      {
        nodeType: "paragraph",
        data: {},
        content: [
          {
            nodeType: "text",
            value:
              'This Privacy Policy explains how Rossovivo Pizzeria ("Rossovivo", "we", "our", "us") collects, uses, stores, and shares personal information.',
            marks: [],
            data: {},
          },
        ],
      },
    ],
  },
};

const fallbackTermsLegal: LegalPageContent = {
  internalName: "terms-of-service",
  slug: "terms-of-service",
  title: "Terms of Service",
  seoTitle: "Terms of Service | Rossovivo Pizzeria",
  seoDescription:
    "Review the terms governing use of the Rossovivo website and services.",
  lastUpdated: "February 14, 2026",
  contactEmail: "catering@rossovivo.ae",
  body: {
    nodeType: "document",
    data: {},
    content: [
      {
        nodeType: "paragraph",
        data: {},
        content: [
          {
            nodeType: "text",
            value:
              "By accessing or using the Rossovivo website and services, you agree to these Terms of Service.",
            marks: [],
            data: {},
          },
        ],
      },
    ],
  },
};

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const deliveryToken = process.env.CONTENTFUL_DELIVERY_TOKEN;
const environmentId = process.env.CONTENTFUL_ENVIRONMENT || "master";
const hasContentful = Boolean(spaceId && deliveryToken);
const contentfulRevalidateSeconds =
  process.env.NODE_ENV === "development" ? 1 : 60;

const normalizeAssetUrl = (url: string) => {
  if (!url) return "";
  if (url.startsWith("//")) return `https:${url}`;
  return url;
};

const localeKeyPattern = /^[a-z]{2}(?:-[A-Za-z0-9]{2,})+$/;

const isLocaleMap = (value: Record<string, unknown>) => {
  const keys = Object.keys(value);
  if (keys.length === 0) return false;
  return keys.every((key) => localeKeyPattern.test(key));
};

const unwrapLocalizedValue = <T>(value: unknown): T | undefined => {
  if (value === null || value === undefined) return undefined;
  if (Array.isArray(value)) return value as T;
  if (typeof value !== "object") return value as T;

  const maybeObject = value as Record<string, unknown>;
  if (maybeObject.sys) return value as T;

  if (DEFAULT_LOCALE in maybeObject) {
    return maybeObject[DEFAULT_LOCALE] as T;
  }

  if (isLocaleMap(maybeObject)) {
    const [firstLocaleKey] = Object.keys(maybeObject);
    if (!firstLocaleKey) return undefined;
    return maybeObject[firstLocaleKey] as T;
  }

  return value as T;
};

const getField = <T>(
  entry: ContentfulEntry,
  fieldId: string,
): T | undefined => {
  return unwrapLocalizedValue<T>(entry?.fields?.[fieldId]);
};

const buildAssetMap = (assets: ContentfulAsset[] = []) => {
  const map = new Map<string, string>();
  for (const asset of assets) {
    const id = asset?.sys?.id;
    if (!id) continue;

    const fileValue = unwrapLocalizedValue<Record<string, unknown>>(
      asset?.fields?.file,
    );
    const rawUrl = typeof fileValue?.url === "string" ? fileValue.url : "";
    if (!rawUrl) continue;

    map.set(id, normalizeAssetUrl(rawUrl));
  }
  return map;
};

const resolveAssetUrl = (value: unknown, assetMap: Map<string, string>) => {
  if (typeof value === "string") {
    return value;
  }

  const linkId = (value as { sys?: { id?: string } })?.sys?.id;
  if (!linkId) return "";
  return assetMap.get(linkId) || "";
};

const fetchEntries = async (
  query: Record<string, string>,
): Promise<{
  items: ContentfulEntry[];
  assetMap: Map<string, string>;
} | null> => {
  if (!hasContentful) return null;

  const url = new URL(
    `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries`,
  );

  for (const [key, value] of Object.entries(query)) {
    url.searchParams.set(key, value);
  }

  try {
    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${deliveryToken}`,
      },
      next: { revalidate: contentfulRevalidateSeconds },
    });

    if (!response.ok) return null;

    const data = (await response.json()) as ContentfulEntriesResponse;
    const items = Array.isArray(data.items) ? data.items : [];
    const assets = Array.isArray(data.includes?.Asset)
      ? data.includes.Asset
      : [];
    return { items, assetMap: buildAssetMap(assets) };
  } catch {
    return null;
  }
};

const toStringValue = (value: unknown, fallback = "") => {
  if (typeof value === "string") return value;
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
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

const extractEntryLinkIds = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => (item as { sys?: { id?: string } })?.sys?.id || "")
    .map((id) => id.trim())
    .filter(Boolean);
};

const extractPlainText = (node: unknown): string => {
  if (!node || typeof node !== "object") return "";
  const typedNode = node as {
    nodeType?: string;
    value?: string;
    content?: unknown[];
  };

  if (typedNode.nodeType === "text") {
    return typeof typedNode.value === "string" ? typedNode.value : "";
  }

  if (!Array.isArray(typedNode.content)) {
    return "";
  }

  return typedNode.content.map((child) => extractPlainText(child)).join("");
};

const extractParagraphsFromRichText = (document: unknown): string[] => {
  if (!document || typeof document !== "object") return [];
  const root = document as { content?: unknown[] };
  if (!Array.isArray(root.content)) return [];

  const paragraphs: string[] = [];
  for (const node of root.content) {
    const typedNode = node as { nodeType?: string };
    if (typedNode.nodeType !== "paragraph") continue;
    const text = extractPlainText(node).trim();
    if (text) paragraphs.push(text);
  }

  return paragraphs;
};

const fallbackLocationImagesBySlug = new Map(
  fallbackLocations.map((location) => [location.slug, location.images]),
);

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

export async function getSiteSettings(): Promise<SiteSettings> {
  const response = await fetchEntries({
    content_type: "siteSettings",
    "fields.internalName": "default-site-settings",
    order: "-sys.updatedAt",
    limit: "1",
    include: "2",
  });

  const entry = response?.items?.[0];
  if (!entry) return fallbackSiteSettings;

  const addressesRaw = toStringValue(getField(entry, "addresses"), "");
  const addresses = addressesRaw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return {
    internalName: toStringValue(
      getField(entry, "internalName"),
      fallbackSiteSettings.internalName,
    ),
    logoLightUrl:
      resolveAssetUrl(getField(entry, "logoLight"), response.assetMap) ||
      fallbackSiteSettings.logoLightUrl,
    logoDarkUrl:
      resolveAssetUrl(getField(entry, "logoDark"), response.assetMap) ||
      fallbackSiteSettings.logoDarkUrl,
    instagramUrl: toStringValue(
      getField(entry, "instagramUrl"),
      fallbackSiteSettings.instagramUrl,
    ),
    facebookUrl: toStringValue(
      getField(entry, "facebookUrl"),
      fallbackSiteSettings.facebookUrl,
    ),
    tiktokUrl: toStringValue(
      getField(entry, "tiktokUrl"),
      fallbackSiteSettings.tiktokUrl,
    ),
    whatsappNumber: toStringValue(
      getField(entry, "whatsappNumber"),
      fallbackSiteSettings.whatsappNumber,
    ),
    primaryPhone: toStringValue(
      getField(entry, "primaryPhone"),
      fallbackSiteSettings.primaryPhone,
    ),
    secondaryPhone: toStringValue(
      getField(entry, "secondaryPhone"),
      fallbackSiteSettings.secondaryPhone,
    ),
    primaryEmail: toStringValue(
      getField(entry, "primaryEmail"),
      fallbackSiteSettings.primaryEmail,
    ),
    secondaryEmail: toStringValue(
      getField(entry, "secondaryEmail"),
      fallbackSiteSettings.secondaryEmail,
    ),
    addresses:
      addresses.length > 0 ? addresses : fallbackSiteSettings.addresses,
    footerLocationSummary: toStringValue(
      getField(entry, "footerLocationSummary"),
      fallbackSiteSettings.footerLocationSummary,
    ),
    eMenuMediaCityUrl: toStringValue(
      getField(entry, "eMenuMediaCityUrl"),
      fallbackSiteSettings.eMenuMediaCityUrl,
    ),
    eMenuBusinessBayUrl: toStringValue(
      getField(entry, "eMenuBusinessBayUrl"),
      fallbackSiteSettings.eMenuBusinessBayUrl,
    ),
    orderNowPrimaryLabel: toStringValue(
      getField(entry, "orderNowPrimaryLabel"),
      fallbackSiteSettings.orderNowPrimaryLabel,
    ),
    orderNowPrimaryHref: toStringValue(
      getField(entry, "orderNowPrimaryHref"),
      fallbackSiteSettings.orderNowPrimaryHref,
    ),
    orderNowSecondaryLabel: toStringValue(
      getField(entry, "orderNowSecondaryLabel"),
      fallbackSiteSettings.orderNowSecondaryLabel,
    ),
    orderNowSecondaryHref: toStringValue(
      getField(entry, "orderNowSecondaryHref"),
      fallbackSiteSettings.orderNowSecondaryHref,
    ),
  };
}

export async function getLocations(): Promise<CmsLocation[]> {
  const response = await fetchEntries({
    content_type: "location",
    order: "fields.displayOrder,fields.slug",
    limit: "100",
    include: "2",
  });

  if (!response || response.items.length === 0) {
    return fallbackLocations;
  }

  const parsed = response.items
    .map((entry, index): CmsLocation | null => {
      const slug = toStringValue(getField(entry, "slug"), "").trim();
      if (!slug) return null;

      const id = toStringValue(getField(entry, "locationId"), slug);
      const galleryLinks = getField<unknown[]>(entry, "gallery") || [];
      const galleryImages = galleryLinks
        .map((assetLink) => resolveAssetUrl(assetLink, response.assetMap))
        .filter(Boolean);
      const fallbackImages = fallbackLocationImagesBySlug.get(slug) || [];

      const directionsUrl = toStringValue(
        getField(entry, "directionsUrlLong"),
        toStringValue(
          getField(entry, "directionsUrl"),
          fallbackLocations.find((location) => location.slug === slug)
            ?.directionsUrl || "",
        ),
      );

      const mapEmbedUrl = toStringValue(
        getField(entry, "mapEmbedUrlLong"),
        toStringValue(
          getField(entry, "mapEmbedUrl"),
          fallbackLocations.find((location) => location.slug === slug)
            ?.mapEmbedUrl || "",
        ),
      );

      return {
        id,
        entryId: toStringValue(entry?.sys?.id, id),
        slug,
        name: toStringValue(
          getField(entry, "name"),
          fallbackLocations.find((location) => location.slug === slug)?.name ||
            slug,
        ),
        address: toStringValue(getField(entry, "address"), ""),
        phone: toStringValue(getField(entry, "phone"), ""),
        hours: toStringValue(getField(entry, "hours"), ""),
        menuUrl: toStringValue(getField(entry, "menuUrl"), ""),
        directionsUrl,
        mapEmbedUrl,
        rating: toNumberValue(
          getField(entry, "rating"),
          fallbackLocations.find((location) => location.slug === slug)
            ?.rating || 0,
        ),
        ratingCount: toStringValue(
          getField(entry, "ratingCount"),
          fallbackLocations.find((location) => location.slug === slug)
            ?.ratingCount || "",
        ),
        displayOrder: toNumberValue(getField(entry, "displayOrder"), index + 1),
        isActive: toBooleanValue(getField(entry, "isActive"), true),
        images: galleryImages.length > 0 ? galleryImages : fallbackImages,
      };
    })
    .filter((location): location is CmsLocation => Boolean(location))
    .sort((a, b) => a.displayOrder - b.displayOrder);

  const activeLocations = parsed.filter((location) => location.isActive);
  return activeLocations.length > 0 ? activeLocations : parsed;
}

export async function getHomePageContent(): Promise<HomePageContent> {
  const response = await fetchEntries({
    content_type: "homePage",
    "fields.internalName": "default-home-page",
    order: "-sys.updatedAt",
    limit: "1",
    include: "2",
  });

  const entry = response?.items?.[0];
  if (!entry) return fallbackHomePage;

  const rawHeroTitle = toStringValue(
    getField(entry, "heroTitle"),
    fallbackHomePage.heroTitle,
  );
  const explicitHeroTitleHighlight = toStringValue(
    getField(entry, "heroTitleHighlight"),
    "",
  ).trim();
  const inferredHeroTitleParts = explicitHeroTitleHighlight
    ? null
    : inferHomeHeroTitleParts(rawHeroTitle);
  const resolvedHeroTitle = inferredHeroTitleParts?.title || rawHeroTitle;
  const resolvedHeroTitleHighlight =
    explicitHeroTitleHighlight || inferredHeroTitleParts?.highlight || "";

  return {
    internalName: toStringValue(
      getField(entry, "internalName"),
      fallbackHomePage.internalName,
    ),
    heroEyebrow: toStringValue(
      getField(entry, "heroEyebrow"),
      fallbackHomePage.heroEyebrow,
    ),
    heroTitle: resolvedHeroTitle,
    heroTitleHighlight: resolvedHeroTitleHighlight,
    heroSubtitle: toStringValue(
      getField(entry, "heroSubtitle"),
      fallbackHomePage.heroSubtitle,
    ),
    heroPrimaryLabel: toStringValue(
      getField(entry, "heroPrimaryLabel"),
      fallbackHomePage.heroPrimaryLabel,
    ),
    heroPrimaryHref: toStringValue(
      getField(entry, "heroPrimaryHref"),
      fallbackHomePage.heroPrimaryHref,
    ),
    heroSecondaryLabel: toStringValue(
      getField(entry, "heroSecondaryLabel"),
      fallbackHomePage.heroSecondaryLabel,
    ),
    heroSecondaryHref: toStringValue(
      getField(entry, "heroSecondaryHref"),
      fallbackHomePage.heroSecondaryHref,
    ),
    heroVideoUrl:
      resolveAssetUrl(getField(entry, "heroVideo"), response.assetMap) ||
      toStringValue(
        getField(entry, "heroVideoUrl"),
        fallbackHomePage.heroVideoUrl,
      ),
    heroImageUrl: resolveAssetUrl(
      getField(entry, "heroImage"),
      response.assetMap,
    ),
    locationsSectionTitle: toStringValue(
      getField(entry, "locationsSectionTitle"),
      fallbackHomePage.locationsSectionTitle,
    ),
    locationEntryIds:
      extractEntryLinkIds(getField(entry, "locations")) ||
      fallbackHomePage.locationEntryIds,
    cateringTeaserEyebrow: toStringValue(
      getField(entry, "cateringTeaserEyebrow"),
      fallbackHomePage.cateringTeaserEyebrow,
    ),
    cateringTeaserTitle: toStringValue(
      getField(entry, "cateringTeaserTitle"),
      fallbackHomePage.cateringTeaserTitle,
    ),
    cateringTeaserDescription: toStringValue(
      getField(entry, "cateringTeaserDescription"),
      fallbackHomePage.cateringTeaserDescription,
    ),
    cateringTeaserEventTypes:
      getField<string[]>(entry, "cateringTeaserEventTypes") ||
      fallbackHomePage.cateringTeaserEventTypes,
    cateringTeaserImageUrl:
      resolveAssetUrl(
        getField(entry, "cateringTeaserImage"),
        response.assetMap,
      ) || fallbackHomePage.cateringTeaserImageUrl,
    eventFormTitle: toStringValue(
      getField(entry, "eventFormTitle"),
      fallbackHomePage.eventFormTitle,
    ),
    eventFormSubtitle: toStringValue(
      getField(entry, "eventFormSubtitle"),
      fallbackHomePage.eventFormSubtitle,
    ),
    eventFormImageUrl:
      resolveAssetUrl(getField(entry, "eventFormImage"), response.assetMap) ||
      fallbackHomePage.eventFormImageUrl,
    socialSectionHandle: toStringValue(
      getField(entry, "socialSectionHandle"),
      fallbackHomePage.socialSectionHandle,
    ),
  };
}

export async function getAboutPageContent(): Promise<AboutPageContent> {
  const response = await fetchEntries({
    content_type: "aboutPage",
    "fields.internalName": "default-about-page",
    order: "-sys.updatedAt",
    limit: "1",
    include: "2",
  });

  const entry = response?.items?.[0];
  if (!entry) return fallbackAboutPage;

  const storyDocument = getField<RichTextDocument>(entry, "storyBody");
  const storyParagraphs = extractParagraphsFromRichText(storyDocument);

  return {
    internalName: toStringValue(
      getField(entry, "internalName"),
      fallbackAboutPage.internalName,
    ),
    heroTitle: toStringValue(
      getField(entry, "heroTitle"),
      fallbackAboutPage.heroTitle,
    ),
    heroHighlight: toStringValue(
      getField(entry, "heroHighlight"),
      fallbackAboutPage.heroHighlight,
    ),
    heroImageUrl:
      resolveAssetUrl(getField(entry, "heroImage"), response.assetMap) ||
      fallbackAboutPage.heroImageUrl,
    storyHeading: toStringValue(
      getField(entry, "storyHeading"),
      fallbackAboutPage.storyHeading,
    ),
    storyParagraphs:
      storyParagraphs.length > 0
        ? storyParagraphs
        : fallbackAboutPage.storyParagraphs,
    storySignatureLabel: toStringValue(
      getField(entry, "storySignatureLabel"),
      fallbackAboutPage.storySignatureLabel,
    ),
    storySignatureName: toStringValue(
      getField(entry, "storySignatureName"),
      fallbackAboutPage.storySignatureName,
    ),
    storyImageUrl:
      resolveAssetUrl(getField(entry, "storyImage"), response.assetMap) ||
      fallbackAboutPage.storyImageUrl,
    ctaTitle: toStringValue(
      getField(entry, "ctaTitle"),
      fallbackAboutPage.ctaTitle,
    ),
    ctaHighlight: toStringValue(
      getField(entry, "ctaHighlight"),
      fallbackAboutPage.ctaHighlight,
    ),
    ctaPrimaryLabel: toStringValue(
      getField(entry, "ctaPrimaryLabel"),
      fallbackAboutPage.ctaPrimaryLabel,
    ),
    ctaPrimaryHref: toStringValue(
      getField(entry, "ctaPrimaryHref"),
      fallbackAboutPage.ctaPrimaryHref,
    ),
    ctaSecondaryLabel: toStringValue(
      getField(entry, "ctaSecondaryLabel"),
      fallbackAboutPage.ctaSecondaryLabel,
    ),
    ctaSecondaryHref: toStringValue(
      getField(entry, "ctaSecondaryHref"),
      fallbackAboutPage.ctaSecondaryHref,
    ),
  };
}

export async function getContactPageContent(): Promise<ContactPageContent> {
  const response = await fetchEntries({
    content_type: "contactPage",
    "fields.internalName": "default-contact-page",
    order: "-sys.updatedAt",
    limit: "1",
    include: "2",
  });

  const entry = response?.items?.[0];
  if (!entry) return fallbackContactPage;

  return {
    internalName: toStringValue(
      getField(entry, "internalName"),
      fallbackContactPage.internalName,
    ),
    heroTitle: toStringValue(
      getField(entry, "heroTitle"),
      fallbackContactPage.heroTitle,
    ),
    heroHighlight: toStringValue(
      getField(entry, "heroHighlight"),
      fallbackContactPage.heroHighlight,
    ),
    heroSubtitle: toStringValue(
      getField(entry, "heroSubtitle"),
      fallbackContactPage.heroSubtitle,
    ),
    infoTitle: toStringValue(
      getField(entry, "infoTitle"),
      fallbackContactPage.infoTitle,
    ),
    socialTitle: toStringValue(
      getField(entry, "socialTitle"),
      fallbackContactPage.socialTitle,
    ),
    formTitle: toStringValue(
      getField(entry, "formTitle"),
      fallbackContactPage.formTitle,
    ),
    formSubtitle: toStringValue(
      getField(entry, "formSubtitle"),
      fallbackContactPage.formSubtitle,
    ),
    formSubmitLabel: toStringValue(
      getField(entry, "formSubmitLabel"),
      fallbackContactPage.formSubmitLabel,
    ),
    locationEntryIds:
      extractEntryLinkIds(getField(entry, "locations")) ||
      fallbackContactPage.locationEntryIds,
  };
}

type PolaroidItemWithEntryId = CateringPolaroidItem & {
  entryId: string;
};

type FeatureItemWithEntryId = CateringFeatureItem & {
  entryId: string;
};

type MediaItemWithEntryId = CateringMediaItem & {
  entryId?: string;
};

const parsePolaroidItems = async (): Promise<PolaroidItemWithEntryId[]> => {
  const response = await fetchEntries({
    content_type: "cateringPolaroidItem",
    order: "fields.sortOrder,sys.createdAt",
    limit: "100",
    include: "2",
  });

  if (!response || response.items.length === 0) {
    return fallbackPolaroidItems.map((item) => ({
      ...item,
      entryId: item.id,
    }));
  }

  return response.items.map((entry, index) => {
    const imageFromAsset = resolveAssetUrl(
      getField(entry, "image"),
      response.assetMap,
    );
    const imageFromFallbackByIndex =
      fallbackPolaroidItems[index]?.imageUrl || "";

    return {
      entryId: toStringValue(entry?.sys?.id, `polaroid-entry-${index + 1}`),
      id: toStringValue(
        getField(entry, "internalName"),
        `polaroid-${index + 1}`,
      ),
      title: toStringValue(getField(entry, "title"), ""),
      tag: toStringValue(getField(entry, "tag"), ""),
      description: toStringValue(getField(entry, "description"), ""),
      imageUrl:
        imageFromAsset || imageFromFallbackByIndex || "/assets/about-hero.jpg",
      isBestseller: toBooleanValue(getField(entry, "isBestseller"), false),
      sortOrder: toNumberValue(getField(entry, "sortOrder"), index + 1),
    };
  });
};

const parseFeatureItems = async (): Promise<FeatureItemWithEntryId[]> => {
  const response = await fetchEntries({
    content_type: "cateringFeatureItem",
    order: "fields.sortOrder,sys.createdAt",
    limit: "100",
  });

  if (!response || response.items.length === 0) {
    return fallbackFeatureItems.map((item) => ({
      ...item,
      entryId: item.id,
    }));
  }

  return response.items.map((entry, index) => ({
    entryId: toStringValue(entry?.sys?.id, `feature-entry-${index + 1}`),
    id: toStringValue(getField(entry, "internalName"), `feature-${index + 1}`),
    iconName: toStringValue(getField(entry, "iconName"), "CheckCircle2"),
    title: toStringValue(getField(entry, "title"), ""),
    copy: toStringValue(getField(entry, "copy"), ""),
    sortOrder: toNumberValue(getField(entry, "sortOrder"), index + 1),
  }));
};

const parseMediaItems = async (): Promise<{
  includesItems: MediaItemWithEntryId[];
  optionalItems: MediaItemWithEntryId[];
}> => {
  const response = await fetchEntries({
    content_type: "cateringMediaItem",
    order: "fields.sortOrder,sys.createdAt",
    limit: "200",
    include: "2",
  });

  if (!response || response.items.length === 0) {
    return {
      includesItems: fallbackIncludesItems,
      optionalItems: fallbackOptionalItems,
    };
  }

  const parsed = response.items.map((entry, index) => {
    const internalName = toStringValue(
      getField(entry, "internalName"),
      `media-${index + 1}`,
    );
    const name = toStringValue(getField(entry, "name"), "");
    const designation = toStringValue(getField(entry, "designation"), "");
    const imageFromAsset = resolveAssetUrl(
      getField(entry, "image"),
      response.assetMap,
    );
    const imageFromIdFallback = fallbackMediaImageById.get(internalName) || "";
    const imageFromNameFallback =
      fallbackMediaImageByName.get(name.trim().toLowerCase()) || "";
    const resolvedImageUrl =
      imageFromAsset || imageFromIdFallback || imageFromNameFallback;

    const mappedItem: MediaItemWithEntryId = {
      entryId: toStringValue(entry?.sys?.id, ""),
      id: internalName,
      name,
      quote: toStringValue(getField(entry, "quote"), ""),
      designation,
      imageUrl: resolvedImageUrl || "/assets/about-hero.jpg",
      sortOrder: toNumberValue(getField(entry, "sortOrder"), index + 1),
    };

    return mappedItem;
  });

  const includesItems = parsed.filter(
    (item) => !item.designation.toLowerCase().includes("optional"),
  );
  const optionalItems = parsed.filter((item) =>
    item.designation.toLowerCase().includes("optional"),
  );

  return {
    includesItems:
      includesItems.length > 0 ? includesItems : fallbackIncludesItems,
    optionalItems:
      optionalItems.length > 0 ? optionalItems : fallbackOptionalItems,
  };
};

const selectByReferencedIds = <T>(
  items: T[],
  references: unknown,
  getEntryId: (item: T) => string,
) => {
  const referenceIds = extractEntryLinkIds(references);
  if (referenceIds.length === 0) {
    return items;
  }

  const itemByEntryId = new Map(items.map((item) => [getEntryId(item), item]));

  const ordered = referenceIds
    .map((referenceId) => itemByEntryId.get(referenceId))
    .filter((item): item is T => Boolean(item));

  return ordered.length > 0 ? ordered : items;
};

export async function getCateringPageContent(): Promise<CateringPageContent> {
  const pageResponse = await fetchEntries({
    content_type: "cateringPage",
    "fields.internalName": "default-catering-page",
    order: "-sys.updatedAt",
    limit: "1",
    include: "2",
  });

  const entry = pageResponse?.items?.[0];
  if (!entry) {
    return fallbackCateringPage;
  }

  const [polaroidItemsAll, featureItemsAll, mediaItemsAll] = await Promise.all([
    parsePolaroidItems(),
    parseFeatureItems(),
    parseMediaItems(),
  ]);

  const polaroidItems = selectByReferencedIds(
    polaroidItemsAll,
    getField(entry, "polaroidItems"),
    (item) => item.entryId,
  );
  const featureItems = selectByReferencedIds(
    featureItemsAll,
    getField(entry, "featureItems"),
    (item) => item.entryId,
  );
  const includesItems = selectByReferencedIds(
    mediaItemsAll.includesItems,
    getField(entry, "includesItems"),
    (item) => item.entryId || item.id,
  );
  const optionalItems = selectByReferencedIds(
    mediaItemsAll.optionalItems,
    getField(entry, "optionalItems"),
    (item) => item.entryId || item.id,
  );

  return {
    internalName: toStringValue(
      getField(entry, "internalName"),
      fallbackCateringPage.internalName,
    ),
    title: toStringValue(getField(entry, "title"), fallbackCateringPage.title),
    subtitle: toStringValue(
      getField(entry, "subtitle"),
      fallbackCateringPage.subtitle,
    ),
    heroImageUrl:
      resolveAssetUrl(getField(entry, "heroImage"), pageResponse.assetMap) ||
      fallbackCateringPage.heroImageUrl,
    polaroidEyebrow: toStringValue(
      getField(entry, "polaroidEyebrow"),
      fallbackCateringPage.polaroidEyebrow,
    ),
    polaroidTitle: toStringValue(
      getField(entry, "polaroidTitle"),
      fallbackCateringPage.polaroidTitle,
    ),
    featuresEyebrow: toStringValue(
      getField(entry, "featuresEyebrow"),
      fallbackCateringPage.featuresEyebrow,
    ),
    featuresTitle: toStringValue(
      getField(entry, "featuresTitle"),
      fallbackCateringPage.featuresTitle,
    ),
    includesEyebrow: toStringValue(
      getField(entry, "includesEyebrow"),
      fallbackCateringPage.includesEyebrow,
    ),
    includesTitle: toStringValue(
      getField(entry, "includesTitle"),
      fallbackCateringPage.includesTitle,
    ),
    optionalEyebrow: toStringValue(
      getField(entry, "optionalEyebrow"),
      fallbackCateringPage.optionalEyebrow,
    ),
    optionalTitle: toStringValue(
      getField(entry, "optionalTitle"),
      fallbackCateringPage.optionalTitle,
    ),
    eventFormTitle: toStringValue(
      getField(entry, "eventFormTitle"),
      fallbackCateringPage.eventFormTitle,
    ),
    eventFormSubtitle: toStringValue(
      getField(entry, "eventFormSubtitle"),
      fallbackCateringPage.eventFormSubtitle,
    ),
    eventFormImageUrl:
      resolveAssetUrl(
        getField(entry, "eventFormImage"),
        pageResponse.assetMap,
      ) || fallbackCateringPage.eventFormImageUrl,
    eventTypeOptions:
      getField<string[]>(entry, "eventTypeOptions") ||
      fallbackCateringPage.eventTypeOptions,
    availableSpaceOptions:
      getField<string[]>(entry, "availableSpaceOptions") ||
      fallbackCateringPage.availableSpaceOptions,
    setupPreferenceOptions:
      getField<string[]>(entry, "setupPreferenceOptions") ||
      fallbackCateringPage.setupPreferenceOptions,
    polaroidItems:
      polaroidItems.length > 0
        ? polaroidItems
        : fallbackCateringPage.polaroidItems,
    featureItems:
      featureItems.length > 0
        ? featureItems
        : fallbackCateringPage.featureItems,
    includesItems:
      includesItems.length > 0
        ? includesItems
        : fallbackCateringPage.includesItems,
    optionalItems:
      optionalItems.length > 0
        ? optionalItems
        : fallbackCateringPage.optionalItems,
  };
}

export async function getLegalPageContent(
  slug: string,
): Promise<LegalPageContent | null> {
  const response = await fetchEntries({
    content_type: "legalPage",
    "fields.slug": slug,
    order: "-sys.updatedAt",
    limit: "1",
  });

  const entry = response?.items?.[0];
  if (!entry) {
    if (slug === "privacy-policy") return fallbackPrivacyLegal;
    if (slug === "terms-of-service") return fallbackTermsLegal;
    return null;
  }

  const rawLastUpdated = toStringValue(getField(entry, "lastUpdated"), "");
  const lastUpdated = rawLastUpdated ? formatDateLabel(rawLastUpdated) : "";
  const body = getField<RichTextDocument>(entry, "body");

  return {
    internalName: toStringValue(getField(entry, "internalName"), slug),
    slug: toStringValue(getField(entry, "slug"), slug),
    title: toStringValue(getField(entry, "title"), ""),
    seoTitle: toStringValue(getField(entry, "seoTitle"), ""),
    seoDescription: toStringValue(getField(entry, "seoDescription"), ""),
    lastUpdated,
    contactEmail: toStringValue(getField(entry, "contactEmail"), ""),
    body:
      body ||
      (slug === "privacy-policy"
        ? fallbackPrivacyLegal.body
        : fallbackTermsLegal.body),
  };
}
