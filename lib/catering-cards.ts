import { Building2, Home, Heart } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type CateringCard = {
  id: string;
  href: string;
  label: string;
  description: string;
  image: string;
  icon: LucideIcon;
};

export const cateringCards: CateringCard[] = [
  {
    id: "corporate",
    href: "/catering/corporate",
    label: "Corporate",
    description:
      "Professional setup for office lunches, launches, and client events.",
    image: "/corporate-catering.jpg",
    icon: Building2,
  },
  {
    id: "home-events",
    href: "/catering/home-events",
    label: "Home Events",
    description:
      "Warm, guest-friendly service for birthdays, dinners, and celebrations.",
    image: "/home-catering.jpg",
    icon: Home,
  },
  {
    id: "weddings",
    href: "/catering/weddings",
    label: "Weddings",
    description: "Memorable live-fire service tailored to your wedding timeline.",
    image: "/assets/catering-event.jpg",
    icon: Heart,
  },
];
