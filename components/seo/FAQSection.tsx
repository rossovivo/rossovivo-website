"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { JsonLd } from "./JsonLd";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQSectionProps = {
  faqs: FAQItem[];
  heading?: string;
};

export function FAQSection({ faqs, heading = "Frequently Asked Questions" }: FAQSectionProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="section-padding bg-cream paper-texture">
      <JsonLd data={faqSchema} />
      <div className="container-tight max-w-3xl">
        <h2 className="heading-card text-charcoal text-center mb-10">{heading}</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`faq-${index}`} className="border-charcoal/15">
              <AccordionTrigger className="text-left text-charcoal font-medium text-base hover:no-underline hover:text-primary transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-charcoal/75 text-base leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
