import { config as loadEnv } from "dotenv";
import contentfulManagement from "contentful-management";

type RichTextNode = {
  nodeType: string;
  data: Record<string, unknown>;
  content?: RichTextNode[];
  value?: string;
  marks?: Array<Record<string, unknown>>;
};

type UpsertEntryInput = {
  contentTypeId: string;
  uniqueFieldId: string;
  uniqueFieldValue: string;
  payload: Record<string, unknown>;
};

loadEnv({ path: ".env.local" });
loadEnv();

const args = new Set(process.argv.slice(2));
const isDryRun = args.has("--dry-run");

const textNode = (value: string): RichTextNode => ({
  nodeType: "text",
  value,
  marks: [],
  data: {},
});

const paragraph = (value: string): RichTextNode => ({
  nodeType: "paragraph",
  data: {},
  content: [textNode(value)],
});

const heading = (level: 2 | 3, value: string): RichTextNode => ({
  nodeType: `heading-${level}`,
  data: {},
  content: [textNode(value)],
});

const unorderedList = (items: string[]): RichTextNode => ({
  nodeType: "unordered-list",
  data: {},
  content: items.map((item) => ({
    nodeType: "list-item",
    data: {},
    content: [paragraph(item)],
  })),
});

const richTextDocument = (nodes: RichTextNode[]) => ({
  nodeType: "document",
  data: {},
  content: nodes,
});

const entryLink = (id: string) => ({
  sys: {
    type: "Link",
    linkType: "Entry",
    id,
  },
});

const SITE_SETTINGS = {
  internalName: "default-site-settings",
  instagramUrl: "https://www.instagram.com/rossovivopizza/",
  facebookUrl: "https://www.facebook.com/profile.php?id=61573936196965",
  tiktokUrl: "https://www.tiktok.com/@rossovivopizza",
  whatsappNumber: "97143805833",
  primaryPhone: "+971 4 380 5833",
  secondaryPhone: "+971 4 427 2477",
  primaryEmail: "catering@rossovivo.ae",
  secondaryEmail: "ciao@rossovivo.ae",
  addresses:
    "Business Bay: Ground Floor, Millennium Tower, Sheikh Zayed Road, Dubai\nMedia City: Ground Floor, Office Park Building, Al Bourooj Street, Dubai",
  footerLocationSummary: "Media City and Business Bay, Dubai",
  eMenuMediaCityUrl: "https://qr.emenu.ae/rossovivo-mediacity",
  eMenuBusinessBayUrl: "https://qr.emenu.ae/rossovivo-businessbay",
  orderNowPrimaryLabel: "Order Now",
  orderNowPrimaryHref: "/locations",
  orderNowSecondaryLabel: "Plan an Event",
  orderNowSecondaryHref: "/catering",
};

const LOCATIONS = [
  {
    slug: "media-city",
    locationId: "media-city",
    name: "Media City",
    address: "Ground Floor, Office Park Building, Al Bourooj Street, Dubai",
    phone: "+971 4 427 2477",
    hours:
      "Sunday to Thursday: 11 AM - 11 PM\nFriday to Saturday: 11 AM - 11:30 PM",
    menuUrl: "https://qr.emenu.ae/rossovivo-mediacity",
    directionsUrlLong:
      "https://www.google.com/maps/dir//Rossovivo+Artisan+Pizza+-+Al+Sufouh+-+Dubai+Internet+City+-+Dubai+-+United+Arab+Emirates/@65.0674176,25.4541824,10z/data=!4m18!1m8!3m7!1s0x3e5f6b6d1a525c13:0x39750c204cd6190c!2sRossovivo+Artisan+Pizza!8m2!3d25.1045781!4d55.1687334!15sCglyb3Nzb3Zpdm9aCyIJcm9zc292aXZvkgEKcmVzdGF1cmFudOABAA!16s%2Fg%2F1pp2ty710!4m8!1m0!1m5!1m1!1s0x3e5f6b6d1a525c13:0x39750c204cd6190c!2m2!1d55.1687334!2d25.1045781!3e3?entry=ttu&g_ep=EgoyMDI2MDIyMi4wIKXMDSoASAFQAw%3D%3D",
    mapEmbedUrlLong:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d231055.95806638285!2d54.98600118886605!3d25.194812399999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6b6d1a525c13%3A0x39750c204cd6190c!2sRossovivo%20Artisan%20Pizza!5e0!3m2!1sen!2sfi!4v1771332367460!5m2!1sen!2sfi",
    rating: 4.3,
    ratingCount: "297",
    displayOrder: 1,
    isActive: true,
  },
  {
    slug: "business-bay",
    locationId: "business-bay",
    name: "Business Bay",
    address: "Ground Floor, Millennium Tower, Sheikh Zayed Road, Dubai",
    phone: "+971 4 380 5833",
    hours:
      "Sunday to Thursday: 11 AM - 11 PM\nFriday to Saturday: 11 AM - 11:30 PM",
    menuUrl: "https://qr.emenu.ae/rossovivo-businessbay",
    directionsUrlLong:
      "https://www.google.com/maps/dir//Rossovivo+-+Ground+Floor,+Millennium+Tower,+Sheikh+Zayed+Road%D8%8C+Business+Bay+-+Dubai+-+United+Arab+Emirates%E2%80%AD/@65.0674176,25.4541824,10z/data=!3m1!5s0x3e5f685b1ccf4f7b:0xfe15742f9994907!4m18!1m8!3m7!1s0x3e5f427f41fdddb7:0xaa4b74612932b5f1!2sRossovivo!8m2!3d25.1948124!4d55.2662633!15sCglyb3Nzb3Zpdm9aCyIJcm9zc292aXZvkgEQcGl6emFfcmVzdGF1cmFudOABAA!16s%2Fg%2F113jlr73r!4m8!1m0!1m5!1m1!1s0x3e5f427f41fdddb7:0xaa4b74612932b5f1!2m2!1d55.2662633!2d25.1948124!3e3?entry=ttu&g_ep=EgoyMDI2MDIyMi4wIKXMDSoASAFQAw%3D%3D",
    mapEmbedUrlLong:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d231055.95806638285!2d54.98600118886605!3d25.194812399999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f427f41fdddb7%3A0xaa4b74612932b5f1!2sRossovivo!5e0!3m2!1sen!2sfi!4v1771332345800!5m2!1sen!2sfi",
    rating: 4.3,
    ratingCount: "401",
    displayOrder: 2,
    isActive: true,
  },
];

const HOME_PAGE = {
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
  locationsSectionTitle: "Visit Our Locations",
  cateringTeaserEyebrow: "A Full Italian Experience.",
  cateringTeaserTitle: "Catering For Every Occasion.",
  cateringTeaserDescription:
    "From birthdays and private dinners to weddings and corporate activations, we cook everything on-site using real pizza ovens and pasta stations - transforming your event into a live Italian feast.",
  cateringTeaserEventTypes: [
    "Corporate Catering",
    "Home Events",
    "Weddings",
  ],
  eventFormTitle: "Start Planning Your Event!",
  eventFormSubtitle:
    "Share your event details and preferred setup. We'll tailor a proposal around your guest count, venue constraints, and service timing.",
  socialSectionHandle: "@rossovivo",
};

const CATERING_POLAROID_ITEMS = [
  {
    internalName: "setup-electric-oven",
    title: "Electric Ovens",
    tag: "Indoor Friendly",
    description: "Ideal for indoor / small venues",
    isBestseller: false,
    sortOrder: 1,
  },
  {
    internalName: "setup-wood-fire-oven",
    title: "Wood Fire Oven",
    tag: "Outdoor Ready",
    description: "Fast setup and flexible for outdoor locations",
    isBestseller: false,
    sortOrder: 2,
  },
  {
    internalName: "setup-tuk-tuk-oven-truck",
    title: "Tuk-tuk Oven Truck",
    tag: "Bestseller",
    description: "Ideal for outdoor events and includes a wood-fire oven",
    isBestseller: true,
    sortOrder: 3,
  },
  {
    internalName: "setup-pasta-station",
    title: "Pasta Station",
    tag: "Add On",
    description: "Suitable for all venues. Pasta that's cooked live, served fresh",
    isBestseller: false,
    sortOrder: 4,
  },
];

const CATERING_FEATURE_ITEMS = [
  {
    internalName: "feature-live-cooking",
    iconName: "UtensilsCrossed",
    title: "Live Cooking Experience",
    copy: "Great food, great entertainment! Food cooked live using real pizza ovens and pasta stations.",
    sortOrder: 1,
  },
  {
    internalName: "feature-setup-cleanup",
    iconName: "Users",
    title: "From Chefs to Setup & Cleanup",
    copy: "Zero-hassle hosting! A professional service with chefs, equipment, setup, and cleanup - all included, no hidden fees.",
    sortOrder: 2,
  },
  {
    internalName: "feature-freshly-cooked",
    iconName: "Flame",
    title: "Freshly Cooked Service",
    copy: "Freshly cooked, beautifully served! No back kitchen, reheating, or boring buffet lines.",
    sortOrder: 3,
  },
  {
    internalName: "feature-flexible-scalable",
    iconName: "Calendar",
    title: "Flexible & Scalable",
    copy: "Flexible setups and packages - from intimate gatherings to 500 person events.",
    sortOrder: 4,
  },
  {
    internalName: "feature-custom-menu",
    iconName: "MessageSquare",
    title: "Custom Menu Planning",
    copy: "Customisable menus, guided by experts! Bespoke menus personalised for your event and guests.",
    sortOrder: 5,
  },
  {
    internalName: "feature-options",
    iconName: "CheckCircle2",
    title: "Variety of Options",
    copy: "Optional upgrades! Add-on stations for drinks, desserts, and full ceramic setups.",
    sortOrder: 6,
  },
];

const CATERING_MEDIA_ITEMS = [
  {
    internalName: "include-oven-pasta-stations",
    name: "On-site Pizza Ovens & Pasta Stations",
    quote:
      "Choose from our signature ovens including electric, wood fire, and the tuk tuk truck or opt for a pasta station.",
    designation: "Service Included",
    sortOrder: 1,
  },
  {
    internalName: "include-chef-setup-cleanup",
    name: "Live Chef, Full Setup & Cleanup",
    quote:
      "Our service includes a live chef, pre-event setup and post-event cleanup with no hidden fees.",
    designation: "Service Included",
    sortOrder: 2,
  },
  {
    internalName: "include-authentic-ingredients",
    name: "Authentic Toppings & Ingredients",
    quote:
      "Sourced fresh or made in-house, our chefs cook using authentic Italian ingredients.",
    designation: "Service Included",
    sortOrder: 3,
  },
  {
    internalName: "include-live-station-time",
    name: "3 Hours Of Live-Station Time",
    quote: "Basic package includes 3 hours of pizza oven or pasta station time.",
    designation: "Service Included",
    sortOrder: 4,
  },
  {
    internalName: "optional-premium-ingredients",
    name: "Request Premium Ingredients & Toppings",
    quote:
      "Looking for something more unique? Choose from a variety of premium ingredients sourced fresh or made in-house.",
    designation: "Optional Upgrade",
    sortOrder: 101,
  },
  {
    internalName: "optional-customise-menu",
    name: "Customise Your Menu",
    quote:
      "Fully customize and expand your menu by adding appetisers, dessert stations, and other items.",
    designation: "Optional Upgrade",
    sortOrder: 102,
  },
  {
    internalName: "optional-extend-service-time",
    name: "Extend Service Time",
    quote: "Add more time to the pizza oven or pasta station if required.",
    designation: "Optional Upgrade",
    sortOrder: 103,
  },
  {
    internalName: "optional-nutella-pizza",
    name: "Nutella Pizza",
    quote:
      "Surprise your guests with our signature Nutella Pizza! Decadent and a fan favorite.",
    designation: "Optional Upgrade",
    sortOrder: 104,
  },
  {
    internalName: "optional-service-staff",
    name: "Request Service Staff",
    quote:
      "Request more service staff to cater to your guests in addition to the chef.",
    designation: "Optional Upgrade",
    sortOrder: 105,
  },
];

const CATERING_PAGE = {
  internalName: "default-catering-page",
  title: "Not just catering. A full Italian experience!",
  subtitle:
    "We transform your event into a live Italian feast. Our chefs cook everything fresh on-site using real pizza ovens and pasta stations",
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
  eventTypeOptions: ["Corporate", "Home Events", "Weddings"],
  availableSpaceOptions: [
    "Indoor",
    "Outdoor",
    "Indoor + Outdoor",
    "Not Sure Yet",
  ],
  setupPreferenceOptions: ["Pizza Oven", "Pasta Station"],
};

const ABOUT_STORY_SECTIONS = [
  "At Rossovivo, we keep things simple. Great ingredients. Proper technique. No shortcuts.",
  "We're an Italian trattoria specialised in wood-fired pizzas, handcrafted pastas, and comfort Italian classics since 2009!",
  "Our food is made using premium, authentic ingredients - our dough is prepped with care, our sauces are slow-cooked, and our cheeses are made in-house making each item on our menu unforgettable. From our two ROSSOVIVO locations in Dubai (Millenium Tower and Media City) we deliver our food across the city and offer a friendly dine-in experience.",
  "When the gatherings get bigger, we bring our kitchen (and the full Italian experience) to you. From intimate gatherings and birthdays to large celebrations and corporate events, our service is completely customisable to your event requirements. With great food comes greater entertainment as our chefs cook everything fresh on-site using real pizza ovens and pasta stations. Pre-event setup and post-event cleanup is also included with no additional fees.",
  "We don't believe in overcomplicating Italian food. We stay true to the original values of our craft - to produce authentic Italian pizza because our passion is for real pizza.",
];

const ABOUT_PAGE = {
  internalName: "default-about-page",
  heroTitle: "About",
  heroHighlight: "Rossovivo",
  storyHeading: "Dear pizza lovers,",
  storySignatureLabel: "Con affetto,",
  storySignatureName: "Rossovivo",
  ctaTitle: "Ready to Taste the",
  ctaHighlight: "Difference?",
  ctaPrimaryLabel: "Plan an Event",
  ctaPrimaryHref: "/catering",
  ctaSecondaryLabel: "Order Now",
  ctaSecondaryHref: "/locations",
};

const CONTACT_PAGE = {
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
};

const PRIVACY_LEGAL_BODY = richTextDocument([
  heading(2, "1. Overview"),
  paragraph(
    'This Privacy Policy explains how Rossovivo Pizzeria ("Rossovivo", "we", "our", "us") collects, uses, stores, and shares personal information when you use our website, place orders, submit inquiries, or interact with our services.',
  ),
  heading(2, "2. Information We Collect"),
  paragraph(
    "We may collect information you provide directly, including name, phone number, email address, event details, and any message content you submit through forms.",
  ),
  paragraph(
    "We may also collect technical data such as device/browser information, IP address, and usage analytics through cookies or similar technologies.",
  ),
  heading(2, "3. How We Use Information"),
  unorderedList([
    "Process and manage orders, bookings, and inquiries.",
    "Respond to customer support requests.",
    "Improve website performance and user experience.",
    "Send operational updates and, where allowed, promotional messages.",
  ]),
  heading(2, "4. Sharing of Information"),
  paragraph(
    "We do not sell personal information. We may share information with service providers that help us operate our website and services (for example, hosting, analytics, payment, or communication tools), and where disclosure is required by law.",
  ),
  heading(2, "5. Cookies and Tracking"),
  paragraph(
    "We may use cookies and similar technologies to remember preferences, measure performance, and understand site usage. You can control cookies through your browser settings.",
  ),
  heading(2, "6. Data Retention"),
  paragraph(
    "We retain personal information only as long as necessary for the purposes described in this policy, or to meet legal, accounting, and reporting obligations.",
  ),
  heading(2, "7. Data Security"),
  paragraph(
    "We use reasonable administrative and technical safeguards to protect personal information. No system is completely secure, so we cannot guarantee absolute security.",
  ),
  heading(2, "8. Your Rights"),
  paragraph(
    "Depending on applicable law, you may have rights to request access to, correction of, deletion of, or restriction of your personal information.",
  ),
  heading(2, "9. Third-Party Links"),
  paragraph(
    "Our website may contain links to third-party websites or services. We are not responsible for their privacy practices and encourage you to review their policies.",
  ),
  heading(2, "10. Changes to This Policy"),
  paragraph(
    'We may update this Privacy Policy from time to time. Updates will be posted on this page with a revised "Last updated" date.',
  ),
  heading(2, "11. Contact Us"),
  paragraph("For privacy-related questions, contact us at catering@rossovivo.ae."),
]);

const TERMS_LEGAL_BODY = richTextDocument([
  heading(2, "1. Acceptance of Terms"),
  paragraph(
    "By accessing or using the Rossovivo website and services, you agree to these Terms of Service. If you do not agree, please do not use our website or services.",
  ),
  heading(2, "2. Services"),
  paragraph(
    "Rossovivo provides restaurant, catering, and related informational services. Availability, menu items, pricing, and delivery or event options may change without notice.",
  ),
  heading(2, "3. Orders and Payments"),
  paragraph(
    "When you place an order or booking request, you agree to provide accurate details. Prices, taxes, and fees are shown where applicable. Orders may be declined or canceled in cases such as unavailability, pricing errors, or suspected misuse.",
  ),
  heading(2, "4. Catering and Event Bookings"),
  paragraph(
    "Catering engagements may require deposits, scheduling confirmation, and cancellation notice windows. Final terms for each event are defined in the applicable quote, invoice, or written agreement.",
  ),
  heading(2, "5. Acceptable Use"),
  unorderedList([
    "Use the website for unlawful, fraudulent, or harmful acts.",
    "Interfere with website functionality, security, or network operations.",
    "Attempt unauthorized access to systems, accounts, or data.",
  ]),
  heading(2, "6. Intellectual Property"),
  paragraph(
    "Website content, branding, designs, and materials are owned by or licensed to Rossovivo and are protected by applicable intellectual property laws. You may not copy, modify, or distribute content without permission.",
  ),
  heading(2, "7. Third-Party Services"),
  paragraph(
    "Our website may link to third-party services (for example maps, social platforms, or external ordering). We are not responsible for third-party content, availability, or practices.",
  ),
  heading(2, "8. Disclaimers"),
  paragraph(
    'Services and content are provided on an "as is" and "as available" basis. To the maximum extent permitted by law, we disclaim all warranties, express or implied, regarding availability, suitability, or uninterrupted operation.',
  ),
  heading(2, "9. Limitation of Liability"),
  paragraph(
    "To the extent permitted by law, Rossovivo is not liable for indirect, incidental, special, consequential, or punitive damages arising from use of the website or services.",
  ),
  heading(2, "10. Indemnification"),
  paragraph(
    "You agree to indemnify and hold harmless Rossovivo from claims, losses, or expenses arising from your misuse of the website, violation of these terms, or infringement of third-party rights.",
  ),
  heading(2, "11. Governing Law"),
  paragraph(
    "These terms are governed by the applicable laws of the United Arab Emirates. Any disputes are subject to the competent courts in Dubai, unless otherwise required by law.",
  ),
  heading(2, "12. Changes to These Terms"),
  paragraph(
    'We may update these Terms of Service at any time. Updates are effective when posted on this page with the revised "Last updated" date.',
  ),
  heading(2, "13. Contact Us"),
  paragraph("For questions about these terms, contact catering@rossovivo.ae."),
]);

const LEGAL_PAGES = [
  {
    internalName: "privacy-policy",
    slug: "privacy-policy",
    title: "Privacy Policy",
    seoTitle: "Privacy Policy | Rossovivo Pizzeria",
    seoDescription:
      "Read how Rossovivo collects, uses, and protects your personal information.",
    lastUpdated: "2026-02-14",
    body: PRIVACY_LEGAL_BODY,
    contactEmail: "catering@rossovivo.ae",
  },
  {
    internalName: "terms-of-service",
    slug: "terms-of-service",
    title: "Terms of Service",
    seoTitle: "Terms of Service | Rossovivo Pizzeria",
    seoDescription:
      "Review the terms governing use of the Rossovivo website and services.",
    lastUpdated: "2026-02-14",
    body: TERMS_LEGAL_BODY,
    contactEmail: "catering@rossovivo.ae",
  },
];

const getRequiredEnv = (key: string) => {
  const value = process.env[key]?.trim();
  if (!value) {
    throw new Error(`Missing required env var: ${key}`);
  }
  return value;
};

const getErrorStatus = (error: unknown) => {
  if (typeof error !== "object" || error === null) return undefined;
  const candidate = error as {
    status?: number | string;
    statusCode?: number | string;
    response?: { status?: number | string };
  };
  const values = [
    candidate.status,
    candidate.statusCode,
    candidate.response?.status,
  ];

  for (const value of values) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return undefined;
};

const setLocalizedValue = (
  entry: any,
  fieldId: string,
  locale: string,
  value: unknown,
) => {
  entry.fields = entry.fields ?? {};
  entry.fields[fieldId] = entry.fields[fieldId] ?? {};
  const previous = entry.fields[fieldId][locale];
  const changed = JSON.stringify(previous) !== JSON.stringify(value);
  if (changed) {
    entry.fields[fieldId][locale] = value;
  }
  return changed;
};

const toLocalizedFields = (payload: Record<string, unknown>, locale: string) => {
  const fields: Record<string, Record<string, unknown>> = {};
  for (const [fieldId, value] of Object.entries(payload)) {
    if (value === undefined) continue;
    fields[fieldId] = { [locale]: value };
  }
  return fields;
};

const slugify = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const printHelp = () => {
  console.log("Usage: pnpm contentful:seed-cms-content [--dry-run]");
  console.log("");
  console.log("--dry-run   Show planned creates/updates without writing.");
};

const ensureContentTypesExist = async (environment: any, ids: string[]) => {
  const missing: string[] = [];
  for (const id of ids) {
    try {
      await environment.getContentType(id);
    } catch (error) {
      const statusCode = getErrorStatus(error);
      if (statusCode === 404) {
        missing.push(id);
        continue;
      }
      throw error;
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required content types: ${missing.join(", ")}. Run contentful:sync-cms-model first.`,
    );
  }
};

const upsertEntry = async (
  environment: any,
  locale: string,
  input: UpsertEntryInput,
) => {
  const { contentTypeId, uniqueFieldId, uniqueFieldValue, payload } = input;
  const response = await environment.getEntries({
    content_type: contentTypeId,
    [`fields.${uniqueFieldId}`]: uniqueFieldValue,
    limit: 2,
  });

  const existing = response.items?.[0];
  if (!existing) {
    if (isDryRun) {
      console.log(`[dry-run] create ${contentTypeId} :: ${uniqueFieldValue}`);
      return `dry-${contentTypeId}-${slugify(uniqueFieldValue)}`;
    }

    const created = await environment.createEntry(contentTypeId, {
      fields: toLocalizedFields(payload, locale),
    });
    await created.publish();
    console.log(`created ${contentTypeId} :: ${uniqueFieldValue}`);
    return created.sys.id as string;
  }

  let hasChanges = false;
  for (const [fieldId, value] of Object.entries(payload)) {
    if (value === undefined) continue;
    hasChanges =
      setLocalizedValue(existing, fieldId, locale, value) || hasChanges;
  }

  if (!hasChanges) {
    console.log(`unchanged ${contentTypeId} :: ${uniqueFieldValue}`);
    return existing.sys.id as string;
  }

  if (isDryRun) {
    console.log(`[dry-run] update ${contentTypeId} :: ${uniqueFieldValue}`);
    return existing.sys.id as string;
  }

  const updated = await existing.update();
  await updated.publish();
  console.log(`updated ${contentTypeId} :: ${uniqueFieldValue}`);
  return updated.sys.id as string;
};

const main = async () => {
  if (args.has("--help") || args.has("-h")) {
    printHelp();
    return;
  }

  const spaceId = getRequiredEnv("CONTENTFUL_SPACE_ID");
  const cmaToken = getRequiredEnv("CONTENTFUL_CMA_TOKEN");
  const environmentId = process.env.CONTENTFUL_ENVIRONMENT?.trim() || "master";

  const client = contentfulManagement.createClient({ accessToken: cmaToken });
  const space = await client.getSpace(spaceId);
  const environment = await space.getEnvironment(environmentId);

  const locales = await environment.getLocales();
  const defaultLocale =
    locales.items.find((item: any) => item.default)?.code ||
    locales.items[0]?.code ||
    "en-US";

  await ensureContentTypesExist(environment, [
    "siteSettings",
    "location",
    "homePage",
    "cateringPolaroidItem",
    "cateringFeatureItem",
    "cateringMediaItem",
    "cateringPage",
    "aboutPage",
    "contactPage",
    "legalPage",
  ]);

  const locationEntryIds: string[] = [];
  for (const location of LOCATIONS) {
    const locationId = await upsertEntry(environment, defaultLocale, {
      contentTypeId: "location",
      uniqueFieldId: "slug",
      uniqueFieldValue: location.slug,
      payload: location,
    });
    locationEntryIds.push(locationId);
  }

  const polaroidEntryIds: string[] = [];
  for (const item of CATERING_POLAROID_ITEMS) {
    const id = await upsertEntry(environment, defaultLocale, {
      contentTypeId: "cateringPolaroidItem",
      uniqueFieldId: "internalName",
      uniqueFieldValue: item.internalName,
      payload: item,
    });
    polaroidEntryIds.push(id);
  }

  const featureEntryIds: string[] = [];
  for (const item of CATERING_FEATURE_ITEMS) {
    const id = await upsertEntry(environment, defaultLocale, {
      contentTypeId: "cateringFeatureItem",
      uniqueFieldId: "internalName",
      uniqueFieldValue: item.internalName,
      payload: item,
    });
    featureEntryIds.push(id);
  }

  const includeEntryIds: string[] = [];
  const optionalEntryIds: string[] = [];
  for (const item of CATERING_MEDIA_ITEMS) {
    const id = await upsertEntry(environment, defaultLocale, {
      contentTypeId: "cateringMediaItem",
      uniqueFieldId: "internalName",
      uniqueFieldValue: item.internalName,
      payload: item,
    });

    if ((item.sortOrder ?? 0) >= 100) {
      optionalEntryIds.push(id);
    } else {
      includeEntryIds.push(id);
    }
  }

  await upsertEntry(environment, defaultLocale, {
    contentTypeId: "siteSettings",
    uniqueFieldId: "internalName",
    uniqueFieldValue: SITE_SETTINGS.internalName,
    payload: SITE_SETTINGS,
  });

  await upsertEntry(environment, defaultLocale, {
    contentTypeId: "homePage",
    uniqueFieldId: "internalName",
    uniqueFieldValue: HOME_PAGE.internalName,
    payload: {
      ...HOME_PAGE,
      locations: locationEntryIds.map(entryLink),
    },
  });

  await upsertEntry(environment, defaultLocale, {
    contentTypeId: "cateringPage",
    uniqueFieldId: "internalName",
    uniqueFieldValue: CATERING_PAGE.internalName,
    payload: {
      ...CATERING_PAGE,
      polaroidItems: polaroidEntryIds.map(entryLink),
      featureItems: featureEntryIds.map(entryLink),
      includesItems: includeEntryIds.map(entryLink),
      optionalItems: optionalEntryIds.map(entryLink),
    },
  });

  const aboutStoryNodes: RichTextNode[] = [
    ...ABOUT_STORY_SECTIONS.map((section) => paragraph(section)),
  ];

  await upsertEntry(environment, defaultLocale, {
    contentTypeId: "aboutPage",
    uniqueFieldId: "internalName",
    uniqueFieldValue: ABOUT_PAGE.internalName,
    payload: {
      ...ABOUT_PAGE,
      storyBody: richTextDocument(aboutStoryNodes),
    },
  });

  await upsertEntry(environment, defaultLocale, {
    contentTypeId: "contactPage",
    uniqueFieldId: "internalName",
    uniqueFieldValue: CONTACT_PAGE.internalName,
    payload: {
      ...CONTACT_PAGE,
      locations: locationEntryIds.map(entryLink),
    },
  });

  for (const legalPage of LEGAL_PAGES) {
    await upsertEntry(environment, defaultLocale, {
      contentTypeId: "legalPage",
      uniqueFieldId: "slug",
      uniqueFieldValue: legalPage.slug,
      payload: legalPage,
    });
  }

  console.log("");
  console.log("CMS content seed complete");
  console.log(`Dry run: ${isDryRun ? "yes" : "no"}`);
};

main().catch((error) => {
  console.error("contentful-seed-cms-content failed");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
