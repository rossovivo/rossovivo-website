export type CateringSegmentSlug = "corporate" | "home-events" | "weddings";

export type CateringSegment = {
  slug: CateringSegmentSlug;
  name: string;
  kicker: string;
  heroTitle: string;
  heroDescription: string;
  audienceNote: string;
  image: string;
  planningSteps: Array<{
    step: string;
    title: string;
    description: string;
  }>;
  highlights: string[];
  samplePackages: Array<{
    title: string;
    description: string;
  }>;
  quoteCta: string;
};

export const cateringSegmentList: CateringSegment[] = [
  {
    slug: "corporate",
    name: "Corporate",
    kicker: "Corporate Catering",
    heroTitle: "Corporate Catering, Simplified",
    heroDescription:
      "Live pizza service for office events, launches, and team gatherings.",
    audienceNote:
      "Best for: team lunches, client hosting, conferences, activations, and staff appreciation events.",
    image: "/corporate-catering.jpg",
    planningSteps: [
      {
        step: "01",
        title: "Share Your Event Brief",
        description:
          "Tell us your schedule, guest profile, venue constraints, and service goals.",
      },
      {
        step: "02",
        title: "Approve A Corporate Plan",
        description:
          "We propose service flow, menu mix, and timing so your agenda stays on track.",
      },
      {
        step: "03",
        title: "Execute Without Disruption",
        description:
          "Our team handles setup, live service, and cleanup while your event runs smoothly.",
      },
    ],
    highlights: [
      "Reliable setup and service windows for strict schedules.",
      "Fast batch output for large guest counts.",
      "Flexible menu formats for mixed dietary needs.",
      "Dedicated point of contact from planning to execution.",
    ],
    samplePackages: [
      {
        title: "Office Lunch Service",
        description: "A streamlined setup for working sessions and team lunches.",
      },
      {
        title: "Client Hosting Package",
        description: "Premium presentation with elevated toppings and fast table flow.",
      },
      {
        title: "Large Event Production",
        description: "High-volume output optimized for conferences and activations.",
      },
    ],
    quoteCta: "Request a Corporate Quote",
  },
  {
    slug: "home-events",
    name: "Home Events",
    kicker: "Home Event Catering",
    heroTitle: "Restaurant Pizza at Home",
    heroDescription:
      "Live-made pizzas for birthdays, dinners, and private celebrations.",
    audienceNote:
      "Best for: birthdays, anniversaries, family gatherings, housewarmings, and private dinners.",
    image: "/home-catering.jpg",
    planningSteps: [
      {
        step: "01",
        title: "Tell Us Your Guest Style",
        description:
          "We align the menu with your crowd, space, and the way you want to host.",
      },
      {
        step: "02",
        title: "Shape The Menu Together",
        description:
          "Choose crowd favorites and premium picks that fit your timeline and budget.",
      },
      {
        step: "03",
        title: "Enjoy The Event",
        description:
          "We deliver live pizza service and clean teardown so you can focus on your guests.",
      },
    ],
    highlights: [
      "Friendly, guest-facing service for informal settings.",
      "Customizable menus for adults and kids.",
      "Compact footprint for villas, rooftops, and home patios.",
      "Clean setup and cleanup so you can host stress-free.",
    ],
    samplePackages: [
      {
        title: "Family Gathering Menu",
        description: "Classic crowd-pleasers with flexible pacing for all ages.",
      },
      {
        title: "Celebration Night Package",
        description: "A fuller menu spread designed for birthdays and milestones.",
      },
      {
        title: "Private Dinner Experience",
        description: "A refined, smaller-format service with premium ingredients.",
      },
    ],
    quoteCta: "Plan My Home Event",
  },
  {
    slug: "weddings",
    name: "Weddings",
    kicker: "Wedding Catering",
    heroTitle: "Live-Fire Wedding Catering",
    heroDescription:
      "Memorable pizza stations tailored to your timeline and guests.",
    audienceNote:
      "Best for: welcome parties, wedding day stations, late-night bites, and post-wedding brunches.",
    image: "/assets/pizza-oven.jpg",
    planningSteps: [
      {
        step: "01",
        title: "Align With Your Wedding Plan",
        description:
          "We coordinate with your planner, timeline, and venue teams from the start.",
      },
      {
        step: "02",
        title: "Design Your Service Format",
        description:
          "From cocktail hour to late-night slices, we tailor where and how service happens.",
      },
      {
        step: "03",
        title: "Deliver A Smooth Service",
        description:
          "Our team executes on time with polished presentation and guest-first flow.",
      },
    ],
    highlights: [
      "Coordinated timelines with planners and venue teams.",
      "Station formats for cocktail hour, dinner, or late-night service.",
      "Menu curation to match your wedding style and guest profile.",
      "Polished staff presentation and smooth on-site operations.",
    ],
    samplePackages: [
      {
        title: "Cocktail Hour Pizza Station",
        description: "Continuous small-format service designed for mingling guests.",
      },
      {
        title: "Wedding Dinner Add-On",
        description: "A live-fire feature that complements your core wedding menu.",
      },
      {
        title: "Late-Night Slice Bar",
        description: "A high-impact closing service that guests always remember.",
      },
    ],
    quoteCta: "Plan My Wedding Catering",
  },
];

export const cateringSegments: Record<CateringSegmentSlug, CateringSegment> = {
  corporate: cateringSegmentList[0],
  "home-events": cateringSegmentList[1],
  weddings: cateringSegmentList[2],
};
