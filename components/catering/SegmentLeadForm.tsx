"use client";

import { useState } from "react";
import posthog from "posthog-js";
import { Calendar, MapPin, MessageSquare, Phone, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type SegmentLeadFormProps = {
  segmentName: string;
  submitLabel: string;
  initialEventType?: string;
  eventTypeOptions?: string[];
  availableSpaceOptions?: string[];
  setupPreferenceOptions?: string[];
};

export function SegmentLeadForm({
  segmentName,
  submitLabel,
  initialEventType,
  eventTypeOptions = ["Corporate", "Home Events", "Weddings"],
  availableSpaceOptions = [
    "Indoor",
    "Outdoor",
    "Indoor + Outdoor",
    "Not Sure Yet",
  ],
  setupPreferenceOptions = ["Pizza Oven", "Pasta Station"],
}: SegmentLeadFormProps) {
  const { toast } = useToast();
  const defaultEventType = eventTypeOptions.includes(initialEventType || "")
    ? (initialEventType as string)
    : eventTypeOptions[0];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    partySize: "",
    date: "",
    eventType: defaultEventType,
    availableSpace: "",
    setupPreference: "",
    notes: "",
  });
  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      address: "",
      partySize: "",
      date: "",
      eventType: defaultEventType,
      availableSpace: "",
      setupPreference: "",
      notes: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          segmentName,
          ...formData,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || result?.success !== true) {
        throw new Error(
          typeof result?.error === "string" ? result.error : "send_failed",
        );
      }

      posthog.capture("catering_enquiry_submitted", {
        segment_name: segmentName,
        event_type: formData.eventType,
        available_space: formData.availableSpace,
        setup_preference: formData.setupPreference,
        party_size: formData.partySize ? Number(formData.partySize) : undefined,
      });

      toast({
        title: "Enquiry Sent",
        description:
          `We've received your ${segmentName.toLowerCase()} request and will reply within 24 hours.`,
      });

      resetForm();
    } catch (err) {
      posthog.capture("catering_enquiry_failed", {
        segment_name: segmentName,
        error: err instanceof Error ? err.message : "unknown_error",
      });
      posthog.captureException(err);
      toast({
        variant: "destructive",
        title: "Could not send enquiry",
        description:
          "Please try again in a moment. If urgent, call or email us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-8 md:p-10 shadow-2xl">
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-charcoal">Name *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="input-warm"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-charcoal">
            <Phone className="mr-1 inline h-4 w-4" />
            Phone *
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="input-warm"
            placeholder="+971 00 000 0000"
          />
        </div>
      </div>

      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-charcoal">
            <MapPin className="mr-1 inline h-4 w-4" />
            Address *
          </label>
          <input
            type="text"
            required
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="input-warm"
            placeholder="Street, area, city"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-charcoal">
            <Users className="mr-1 inline h-4 w-4" />
            Party Size *
          </label>
          <input
            type="number"
            required
            min="10"
            value={formData.partySize}
            onChange={(e) => setFormData({ ...formData, partySize: e.target.value })}
            className="input-warm"
            placeholder="50"
          />
        </div>
      </div>

      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-charcoal">
            <Calendar className="mr-1 inline h-4 w-4" />
            Date *
          </label>
          <input
            type="date"
            required
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="input-warm"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-charcoal">Type Of Event *</label>
          <select
            required
            value={formData.eventType}
            onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
            className="input-warm"
          >
            {eventTypeOptions.map((eventType) => (
              <option key={eventType} value={eventType}>
                {eventType}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-charcoal">Available Space *</label>
          <select
            required
            value={formData.availableSpace}
            onChange={(e) => setFormData({ ...formData, availableSpace: e.target.value })}
            className="input-warm"
          >
            <option value="" disabled>
              Select available space
            </option>
            {availableSpaceOptions.map((space) => (
              <option key={space} value={space}>
                {space}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-charcoal">
            Preference Of Pizza Oven Or Pasta Station *
          </label>
          <select
            required
            value={formData.setupPreference}
            onChange={(e) => setFormData({ ...formData, setupPreference: e.target.value })}
            className="input-warm"
          >
            <option value="" disabled>
              Select your setup preference
            </option>
            {setupPreferenceOptions.map((setupOption) => (
              <option key={setupOption} value={setupOption}>
                {setupOption}
              </option>
            ))}
          </select>
          <p className="mt-2 text-xs text-muted-foreground">
            The type of oven required will be determined post-enquiry.
          </p>
        </div>
      </div>

      <div className="mb-8">
        <label className="mb-2 block text-sm font-medium text-charcoal">
          <MessageSquare className="mr-1 inline h-4 w-4" />
          Additional Notes (Optional)
        </label>
        <textarea
          rows={4}
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="input-warm resize-none"
          placeholder="Tell us anything else that will help us plan your event."
        />
      </div>

      <Button type="submit" variant="cta" size="lg" className="w-full gap-2" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : submitLabel}
      </Button>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        We&apos;ll respond within 24 hours with a tailored quote.
      </p>
    </form>
  );
}
