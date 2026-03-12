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
  SiteSettings,
} from "@/lib/cms-types";

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


export async function getSiteSettings(): Promise<SiteSettings> {
  return fallbackSiteSettings;
}

export async function getLocations(): Promise<CmsLocation[]> {
  return fallbackLocations;
}

export async function getHomePageContent(): Promise<HomePageContent> {
  return fallbackHomePage;
}

export async function getAboutPageContent(): Promise<AboutPageContent> {
  return fallbackAboutPage;
}

export async function getContactPageContent(): Promise<ContactPageContent> {
  return fallbackContactPage;
}

export async function getCateringPageContent(): Promise<CateringPageContent> {
  return fallbackCateringPage;
}

export async function getLegalPageContent(
  slug: string,
): Promise<LegalPageContent | null> {
  if (slug === "privacy-policy") return fallbackPrivacyLegal;
  if (slug === "terms-of-service") return fallbackTermsLegal;
  return null;
}
