export type SiteSettings = {
  internalName: string;
  logoLightUrl: string;
  logoDarkUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  tiktokUrl: string;
  whatsappNumber: string;
  primaryPhone: string;
  secondaryPhone: string;
  primaryEmail: string;
  secondaryEmail: string;
  addresses: string[];
  footerLocationSummary: string;
  eMenuMediaCityUrl: string;
  eMenuBusinessBayUrl: string;
  orderNowPrimaryLabel: string;
  orderNowPrimaryHref: string;
  orderNowSecondaryLabel: string;
  orderNowSecondaryHref: string;
};

export type CmsLocation = {
  id: string;
  entryId?: string;
  slug: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  menuUrl: string;
  directionsUrl: string;
  mapEmbedUrl: string;
  rating: number;
  ratingCount: string;
  displayOrder: number;
  isActive: boolean;
  images: string[];
};

export type HomePageContent = {
  internalName: string;
  heroEyebrow: string;
  heroTitle: string;
  heroTitleHighlight: string;
  heroSubtitle: string;
  heroPrimaryLabel: string;
  heroPrimaryHref: string;
  heroSecondaryLabel: string;
  heroSecondaryHref: string;
  heroVideoUrl: string;
  heroImageUrl: string;
  locationsSectionTitle: string;
  locationEntryIds: string[];
  cateringTeaserEyebrow: string;
  cateringTeaserTitle: string;
  cateringTeaserDescription: string;
  cateringTeaserEventTypes: string[];
  cateringTeaserImageUrl: string;
  eventFormTitle: string;
  eventFormSubtitle: string;
  eventFormImageUrl: string;
  socialSectionHandle: string;
};

export type AboutPageContent = {
  internalName: string;
  heroTitle: string;
  heroHighlight: string;
  heroImageUrl: string;
  storyHeading: string;
  storyParagraphs: string[];
  storySignatureLabel: string;
  storySignatureName: string;
  storyImageUrl: string;
  ctaTitle: string;
  ctaHighlight: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
};

export type ContactPageContent = {
  internalName: string;
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  infoTitle: string;
  socialTitle: string;
  formTitle: string;
  formSubtitle: string;
  formSubmitLabel: string;
  locationEntryIds: string[];
};

export type CateringPolaroidItem = {
  id: string;
  title: string;
  tag: string;
  description: string;
  imageUrl: string;
  isBestseller: boolean;
  sortOrder: number;
};

export type CateringFeatureItem = {
  id: string;
  iconName: string;
  title: string;
  copy: string;
  sortOrder: number;
};

export type CateringMediaItem = {
  id: string;
  name: string;
  quote: string;
  designation: string;
  imageUrl: string;
  sortOrder: number;
};

export type CateringPageContent = {
  internalName: string;
  title: string;
  subtitle: string;
  heroImageUrl: string;
  polaroidEyebrow: string;
  polaroidTitle: string;
  featuresEyebrow: string;
  featuresTitle: string;
  includesEyebrow: string;
  includesTitle: string;
  optionalEyebrow: string;
  optionalTitle: string;
  eventFormTitle: string;
  eventFormSubtitle: string;
  eventFormImageUrl: string;
  eventTypeOptions: string[];
  availableSpaceOptions: string[];
  setupPreferenceOptions: string[];
  polaroidItems: CateringPolaroidItem[];
  featureItems: CateringFeatureItem[];
  includesItems: CateringMediaItem[];
  optionalItems: CateringMediaItem[];
};

export type RichTextNode = {
  nodeType: string;
  value?: string;
  marks?: Array<{ type: string }>;
  data: Record<string, unknown>;
  content?: RichTextNode[];
};

export type RichTextDocument = {
  nodeType: "document";
  data: Record<string, unknown>;
  content: RichTextNode[];
};

export type PortableTextSpan = {
  _type: "span";
  _key: string;
  text: string;
  marks?: string[];
};

export type PortableTextBlock = {
  _type: "block";
  _key: string;
  style?: string;
  children: PortableTextSpan[];
  markDefs?: Array<Record<string, unknown>>;
  listItem?: "bullet" | "number";
  level?: number;
};

export type PortableText = PortableTextBlock[];

export type LegalPageContent = {
  internalName: string;
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  lastUpdated: string;
  body: RichTextDocument | PortableText;
  contactEmail: string;
};
