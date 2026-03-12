import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const orderLocations = [
  {
    id: "media-city",
    name: "Media City",
    address: "Ground Floor, Office Park Building, Al Bourooj Street, Dubai",
    orderUrl: "https://qr.emenu.ae/rossovivo-mediacity",
    image: "/location-mediacity/1.jpg",
  },
  {
    id: "business-bay",
    name: "Business Bay",
    address: "Ground Floor, Millennium Tower, Sheikh Zayed Road, Dubai",
    orderUrl: "https://qr.emenu.ae/rossovivo-businessbay",
    image: "/location-businessbay/1.jpg",
  },
];

export function OrderNowSection() {
  return (
    <section id="order-now" className="section-padding bg-white scroll-mt-32">
      <div className="container-tight">
        <div className="text-center">
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Online Ordering & Menu
          </span>
          <h2 className="mt-4 heading-section text-charcoal">
            See Menu Or Order
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {orderLocations.map((location, index) => (
            <motion.article
              key={location.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.1, duration: 0.45 }}
              className="overflow-hidden rounded-3xl border border-charcoal/10 bg-cream shadow-sm"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={location.image}
                  alt={`${location.name} location`}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent" />
                <p className="absolute bottom-4 left-4 font-display text-3xl text-cream">
                  {location.name}
                </p>
              </div>

              <div className="p-6">
                <p className="text-sm text-muted-foreground">
                  {location.address}
                </p>
                <Button asChild variant="cta" className="mt-5 gap-2">
                  <a
                    href={location.orderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Order Now
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
