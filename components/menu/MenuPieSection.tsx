"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { MenuCategory } from "@/lib/menu";
import { fallbackMenuCategories } from "@/lib/menu-fallback";

type MenuPieSectionProps = {
  showCta?: boolean;
  helperText?: string;
};

type MenuApiResponse = {
  categories?: MenuCategory[];
};

const PIE_CATEGORY_GROUPS = [
  { name: "Pizza", keywords: ["pizza"] },
  { name: "Panini & Pasta", keywords: ["panini", "pasta"] },
  { name: "Salads & Sides", keywords: ["salad", "side"] },
  { name: "Bites & Mains", keywords: ["bite", "main"] },
  { name: "Drinks", keywords: ["drink"] },
  { name: "Coffee & Desserts", keywords: ["coffee", "dessert", "sweet"] },
] as const;

const mergeCategoriesForPie = (categories: MenuCategory[]): MenuCategory[] => {
  if (categories.length === 0) return [];

  const grouped = PIE_CATEGORY_GROUPS.map((group) => ({
    name: group.name,
    items: [] as MenuCategory["items"],
  }));
  const unmatched: MenuCategory[] = [];

  for (const category of categories) {
    const normalizedName = category.name.trim().toLowerCase();
    const groupIndex = PIE_CATEGORY_GROUPS.findIndex((group) =>
      group.keywords.some((keyword) => normalizedName.includes(keyword)),
    );

    if (groupIndex === -1) {
      unmatched.push(category);
      continue;
    }

    grouped[groupIndex].items.push(...category.items);
  }

  if (unmatched.length > 0) {
    for (const category of unmatched) {
      const targetIndex = grouped.reduce(
        (smallestIndex, group, index, source) =>
          group.items.length < source[smallestIndex].items.length
            ? index
            : smallestIndex,
        0,
      );

      grouped[targetIndex].items.push(...category.items);
    }
  }

  const nonEmptyGroups = grouped.filter((group) => group.items.length > 0);
  return nonEmptyGroups.length > 0 ? nonEmptyGroups : categories.slice(0, 5);
};

const polarToCartesian = (cx: number, cy: number, r: number, angle: number) => {
  const radians = ((angle - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(radians),
    y: cy + r * Math.sin(radians),
  };
};

const describeArc = (
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
) => {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`;
};

const splitLabel = (label: string) => {
  if (label.includes("&")) {
    const [left, right] = label.split("&").map((part) => part.trim());
    if (left && right) {
      return [left, `& ${right}`];
    }
    return [label];
  }
  const words = label.split(" ");
  if (words.length <= 2) return [label];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
};

export function MenuPieSection({
  showCta = true,
  helperText = "Tap a slice to explore each menu section in detail.",
}: MenuPieSectionProps) {
  const [menuCategories, setMenuCategories] = useState<MenuCategory[]>(
    mergeCategoriesForPie(fallbackMenuCategories),
  );
  const [activeCategory, setActiveCategory] = useState<MenuCategory | null>(
    null,
  );

  useEffect(() => {
    let isMounted = true;

    const loadMenu = async () => {
      try {
        const response = await fetch("/api/menu");
        if (!response.ok) return;

        const data = (await response.json()) as MenuApiResponse;
        if (!isMounted) return;

        if (Array.isArray(data?.categories) && data.categories.length > 0) {
          setMenuCategories(mergeCategoriesForPie(data.categories));
        }
      } catch (error) {
        // Keep fallback content if menu fetch is unavailable.
      }
    };

    loadMenu();

    return () => {
      isMounted = false;
    };
  }, []);

  const safeCategoryCount = Math.max(menuCategories.length, 1);
  const sliceAngle = 360 / safeCategoryCount;

  return (
    <section
      className="relative section-padding py-10 md:py-14 lg:py-16 overflow-hidden"
      style={{
        backgroundImage: "url('/menu-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div aria-hidden="true" className="absolute inset-0 z-0 bg-cream/20" />

      <div className="container-tight relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="uppercase tracking-[0.2em] text-sm text-primary font-medium mb-4 block">
            Artisan Pizza
          </span>
          <h2 className="heading-section text-charcoal">
            See What&apos;s Cooking.
          </h2>
        </motion.div>

        <div className="flex flex-col items-center gap-10 lg:gap-14">
          <div className="relative w-[min(570px,91vw)] lg:w-[min(630px,75vw)] aspect-square">
            <div className="absolute inset-0 rounded-full overflow-hidden shadow-lg">
              <img
                src="/pizza-bg.png"
                alt="Pizza menu"
                className="h-full w-full object-cover"
              />
            </div>
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
            >
              {menuCategories.map((category, index) => {
                const startAngle = index * sliceAngle;
                const endAngle = startAngle + sliceAngle;
                const path = describeArc(50, 50, 50, startAngle, endAngle);

                return (
                  <path
                    key={category.name}
                    d={path}
                    role="button"
                    tabIndex={0}
                    aria-label={`${category.name} menu`}
                    className="cursor-pointer fill-transparent transition-colors hover:fill-black/15 focus-visible:fill-black/20"
                    stroke="rgba(255,255,255,0.35)"
                    strokeWidth="0.6"
                    onClick={() => setActiveCategory(category)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setActiveCategory(category);
                      }
                    }}
                  />
                );
              })}
            </svg>

            {menuCategories.map((category, index) => {
              const startAngle = index * sliceAngle;
              const endAngle = startAngle + sliceAngle;
              const midAngle = (startAngle + endAngle) / 2;
              const labelPos = polarToCartesian(50, 50, 28, midAngle);
              const lines = splitLabel(category.name);

              return (
                <div
                  key={`${category.name}-label`}
                  className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ left: `${labelPos.x}%`, top: `${labelPos.y}%` }}
                >
                  <div className="rounded-full bg-black/30 px-3 py-1.5 text-center text-xs font-bold uppercase tracking-[0.2em] text-cream drop-shadow-md sm:text-sm">
                    {lines.map((line) => (
                      <span key={line} className="block whitespace-nowrap">
                        {line}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-muted-foreground text-center max-w-lg">
            {helperText}
          </p>
        </div>

        {showCta && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="cta" size="lg" className="gap-2">
                  View Full Menu
                  <ChevronDown className="w-4 h-4 opacity-80" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                sideOffset={10}
                className="w-[280px] rounded-2xl border border-white/20 bg-charcoal/95 p-2 text-white shadow-2xl backdrop-blur-xl"
              >
                <DropdownMenuItem
                  asChild
                  className="cursor-pointer rounded-xl px-4 py-3 text-sm font-medium text-cream focus:bg-white/10 focus:text-white"
                >
                  <a
                    href="https://qr.emenu.ae/rossovivo-mediacity"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Media City eMenu
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  className="cursor-pointer rounded-xl px-4 py-3 text-sm font-medium text-cream focus:bg-white/10 focus:text-white"
                >
                  <a
                    href="https://qr.emenu.ae/rossovivo-businessbay"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Business Bay eMenu
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>
        )}
      </div>

      <Dialog
        open={Boolean(activeCategory)}
        onOpenChange={(open) => {
          if (!open) setActiveCategory(null);
        }}
      >
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
          {activeCategory && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-3xl text-charcoal">
                  {activeCategory.name}
                </DialogTitle>
              </DialogHeader>
              <div className="max-h-[60vh] overflow-y-auto pr-2">
                <div className="space-y-5">
                  {activeCategory.items.map((item, index) => (
                    <div
                      key={`${item.name}-${item.price}-${index}`}
                      className="border-b border-border/60 pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="font-display text-xl text-charcoal">
                            {item.name}
                          </h4>
                          {item.description && (
                            <p className="text-muted-foreground text-sm">
                              {item.description}
                            </p>
                          )}
                        </div>
                        <span className="text-sm font-semibold text-charcoal">
                          AED {item.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
