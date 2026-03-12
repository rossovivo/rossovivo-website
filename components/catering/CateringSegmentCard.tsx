import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type CateringSegmentCardProps = {
  href: string;
  label: string;
  description: string;
  image: string;
  icon: LucideIcon;
};

export function CateringSegmentCard({
  href,
  label,
  description,
  image,
  icon: Icon,
}: CateringSegmentCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-3xl border border-charcoal/10 bg-cream shadow-sm transition-all hover:-translate-y-1"
    >
      <div className="relative h-[200px] shrink-0 md:h-[220px]">
        <img
          src={image}
          alt={`${label} catering`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
      </div>

      <div className="flex min-h-[200px] flex-1 flex-col justify-between bg-cream px-6 py-6 text-charcoal md:min-h-[220px]">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </span>
          <h3 className="font-sans text-3xl font-semibold leading-tight text-charcoal">
            {label}
          </h3>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">{description}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
          View details
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
