import { Flame } from "lucide-react";
import { SegmentLeadForm } from "@/components/catering/SegmentLeadForm";

type FinalCTAProps = {
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  submitLabel?: string;
  eventTypeOptions?: string[];
  availableSpaceOptions?: string[];
  setupPreferenceOptions?: string[];
};

export function FinalCTA({
  title = "Start Planning Your Event!",
  subtitle =
    "Share your event details and preferred setup. We'll tailor a proposal around your guest count, venue constraints, and service timing.",
  imageUrl = "",
  submitLabel = "Request Catering Quote",
  eventTypeOptions,
  availableSpaceOptions,
  setupPreferenceOptions,
}: FinalCTAProps) {
  return (
    <section
      className="section-padding bg-charcoal scroll-mt-32"
      id="enquiry-form"
    >
      <div className="container-tight">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <Flame className="mx-auto mb-4 h-10 w-10 text-primary" />
            <h2 className="heading-section mb-4 text-cream">{title}</h2>
            <p className="text-lg text-cream/70">{subtitle}</p>
          </div>

          {imageUrl ? (
            <div className="mb-8 overflow-hidden rounded-2xl border border-cream/15">
              <img
                src={imageUrl}
                alt="Event planning"
                className="h-52 w-full object-cover md:h-64"
              />
            </div>
          ) : null}

          <SegmentLeadForm
            segmentName="Catering"
            submitLabel={submitLabel}
            initialEventType="Corporate"
            eventTypeOptions={eventTypeOptions}
            availableSpaceOptions={availableSpaceOptions}
            setupPreferenceOptions={setupPreferenceOptions}
          />
        </div>
      </div>
    </section>
  );
}
