import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

type Promotion = {
  id: number;
  subheadline: string;
  title: string;
  description: string;
  price: string;
  wasPrice?: string;
  save: string;
  isSaveArchived?: boolean;
};

const promotions: Promotion[] = [
  {
    id: 1,
    subheadline: "1 Pasta + 1 Beverage",
    title: "Pasta Meal Deal",
    description: "Choose one pasta and one beverage. Coffee included.",
    price: "AED 65",
    save: "SAVE AED [X]",
    isSaveArchived: true,
  },
  {
    id: 2,
    subheadline: "1 Pizza + 1 Beverage",
    title: "Pizza Lovers Club",
    description: "Choose one pizza and one beverage. Coffee included.",
    price: "AED 69",
    save: "SAVE AED [X]",
    isSaveArchived: true,
  },
  {
    id: 3,
    subheadline: "1 Main + 1 Side + 1 Beverage",
    title: "The Classic Combo",
    description:
      "Choose one main course, one side, and one beverage. Coffee included.",
    price: "AED 95",
    save: "SAVE AED [X]",
    isSaveArchived: true,
  },
  {
    id: 4,
    subheadline: "1 Salad + 1 Beverage",
    title: "Light Bite",
    description: "Choose one salad and one beverage. Coffee included.",
    price: "AED 69",
    save: "SAVE AED [X]",
    isSaveArchived: true,
  },
  {
    id: 5,
    subheadline: "1 Starter + 1 Main + 1 Soft Drink",
    title: "Business Lunch",
    description: "Choose one starter, one main, and 1 soft drink.",
    price: "AED 65",
    save: "SAVE AED [X]",
    isSaveArchived: true,
  },
];

const perforationY = ["20%", "30%", "40%", "50%", "60%", "70%", "80%"];

export function PromotionsSection() {
  const { toast } = useToast();
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    setCanNativeShare(
      typeof navigator !== "undefined" && typeof navigator.share === "function",
    );
  }, []);

  useEffect(() => {
    if (!carouselApi || promotions.length < 2) {
      return;
    }

    const interval = setInterval(() => {
      carouselApi.scrollNext();
    }, 4500);

    return () => clearInterval(interval);
  }, [carouselApi]);

  const getSharePayload = (promo: Promotion) => {
    const url =
      typeof window !== "undefined"
        ? window.location.origin
        : "https://rossovivo.ae";
    const title = `${promo.title} | Rossovivo`;
    const text = `${promo.title} for ${promo.price} at Rossovivo.`;

    return { title, text, url };
  };

  const openShareWindow = (url: string) => {
    if (typeof window === "undefined") return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const copyShareText = async (promo: Promotion, forInstagram = false) => {
    const payload = getSharePayload(promo);
    const textToCopy = `${payload.text} ${payload.url}`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      toast({
        title: forInstagram ? "Copied for Instagram" : "Copied",
        description: forInstagram
          ? "Paste it into your Instagram story or post."
          : "Offer link copied to clipboard.",
      });
    } catch {
      toast({
        title: "Copy failed",
        description: "Please try again.",
      });
    }
  };

  const shareNative = async (promo: Promotion) => {
    if (!canNativeShare) return;
    const payload = getSharePayload(promo);
    try {
      await navigator.share(payload);
    } catch {
      // Ignore cancelled share.
    }
  };

  const shareWhatsapp = (promo: Promotion) => {
    const payload = getSharePayload(promo);
    openShareWindow(
      `https://wa.me/?text=${encodeURIComponent(`${payload.text} ${payload.url}`)}`,
    );
  };

  const shareFacebook = (promo: Promotion) => {
    const payload = getSharePayload(promo);
    openShareWindow(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(payload.url)}`,
    );
  };

  const shareX = (promo: Promotion) => {
    const payload = getSharePayload(promo);
    openShareWindow(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(payload.text)}&url=${encodeURIComponent(payload.url)}`,
    );
  };

  const shareTelegram = (promo: Promotion) => {
    const payload = getSharePayload(promo);
    openShareWindow(
      `https://t.me/share/url?url=${encodeURIComponent(payload.url)}&text=${encodeURIComponent(payload.text)}`,
    );
  };

  const shareEmail = (promo: Promotion) => {
    const payload = getSharePayload(promo);
    openShareWindow(
      `mailto:?subject=${encodeURIComponent(payload.title)}&body=${encodeURIComponent(`${payload.text}\n\n${payload.url}`)}`,
    );
  };

  const shareInstagram = async (promo: Promotion) => {
    await copyShareText(promo, true);
    openShareWindow("https://www.instagram.com/");
  };

  return (
    <section className="section-padding pt-10 pb-14 md:pt-12 md:pb-18 relative overflow-hidden bg-charcoal text-cream">
      <div className="container-tight relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-3">
            <h2 className="heading-section text-cream text-3xl sm:text-4xl">
              Special Offers & Promo
            </h2>
          </div>
        </motion.div>

        <Carousel
          setApi={setCarouselApi}
          opts={{ align: "start", loop: promotions.length > 1 }}
          className="mt-12"
        >
          <CarouselContent>
            {promotions.map((promo) => {
              return (
                <CarouselItem
                  key={promo.id}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <article className="relative h-full overflow-hidden bg-[#42413d] p-6">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 z-[2]"
                    >
                      <span className="absolute -left-5 -top-5 h-10 w-10 rounded-full bg-charcoal" />
                      <span className="absolute -right-5 -top-5 h-10 w-10 rounded-full bg-charcoal" />
                      <span className="absolute -bottom-5 -left-5 h-10 w-10 rounded-full bg-charcoal" />
                      <span className="absolute -bottom-5 -right-5 h-10 w-10 rounded-full bg-charcoal" />

                      {perforationY.map((offset) => (
                        <span
                          key={`left-${promo.id}-${offset}`}
                          className="absolute -left-2.5 h-5 w-5 -translate-y-1/2 rounded-full bg-charcoal"
                          style={{ top: offset }}
                        />
                      ))}
                      {perforationY.map((offset) => (
                        <span
                          key={`right-${promo.id}-${offset}`}
                          className="absolute -right-2.5 h-5 w-5 -translate-y-1/2 rounded-full bg-charcoal"
                          style={{ top: offset }}
                        />
                      ))}
                    </div>

                    <div className="relative z-[3] h-full rounded-2xl border border-cream/25 p-4">
                      <div className="grid grid-cols-[1fr_auto] items-start gap-3">
                        <div>
                          <p className="font-sans text-sm min-h-[20px] font-semibold leading-tight text-cream/90">
                            {promo.subheadline}
                          </p>
                          <h3 className="font-display min-h-[50px] text-2xl font-semibold text-cream mt-3">
                            {promo.title}
                          </h3>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 rounded-full border border-cream/25 bg-white/10 px-3 text-xs font-semibold uppercase tracking-[0.14em] text-cream hover:bg-white/20"
                            >
                              <Share2 className="h-3.5 w-3.5" />
                              Share
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-56">
                            {canNativeShare && (
                              <>
                                <DropdownMenuItem
                                  onSelect={() => shareNative(promo)}
                                >
                                  System Share
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                              </>
                            )}
                            <DropdownMenuItem
                              onSelect={() => shareWhatsapp(promo)}
                            >
                              WhatsApp
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onSelect={() => shareFacebook(promo)}
                            >
                              Facebook
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => shareX(promo)}>
                              X (Twitter)
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onSelect={() => shareTelegram(promo)}
                            >
                              Telegram
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onSelect={() => shareInstagram(promo)}
                            >
                              Instagram
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onSelect={() => shareEmail(promo)}
                            >
                              Email
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onSelect={() => copyShareText(promo)}
                            >
                              Copy Link
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <p className="mt-2 min-h-[30px] text-sm text-cream/80">
                        {promo.description}
                      </p>

                      <div className="mt-3 flex items-end justify-between gap-3">
                        <div>
                          <div className="flex items-baseline gap-2">
                            {promo.wasPrice && (
                              <span className="text-sm text-cream/45 line-through">
                                {promo.wasPrice}
                              </span>
                            )}
                            <span className="font-display text-2xl text-primary">
                              {promo.price}
                            </span>
                          </div>
                        </div>
                        {!promo.isSaveArchived && (
                          <span className="rounded-full border border-primary/40 bg-primary/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                            {promo.save}
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious
            variant="ghost"
            size="icon"
            className="-left-8 top-1/2 h-10 w-10 -translate-y-1/2 border border-cream/20 bg-cream/10 text-cream hover:border-primary/40 hover:bg-cream/20 hover:text-primary"
          />
          <CarouselNext
            variant="ghost"
            size="icon"
            className="-right-8 top-1/2 h-10 w-10 -translate-y-1/2 border border-cream/20 bg-cream/10 text-cream hover:border-primary/40 hover:bg-cream/20 hover:text-primary"
          />
        </Carousel>
      </div>
    </section>
  );
}
