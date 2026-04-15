import type { Metadata } from "next";
import { AboutPageClient } from "@/components/about/AboutPageClient";
import { JsonLd } from "@/components/seo/JsonLd";
import { FAQSection } from "@/components/seo/FAQSection";
import { aboutSchemaData, aboutFaqs } from "@/lib/seo-data";
import { getAboutPageContent } from "@/lib/cms";

export const metadata: Metadata = {
  title: "About Rossovivo | Dubai's Authentic Italian Pizzeria Since 2009",
  description:
    "Meet Rossovivo — Dubai's artisan Italian trattoria crafting wood-fired pizzas, handmade pastas & Italian classics since 2009. Real ingredients, real technique, no shortcuts.",
};

export default async function AboutPage() {
  const content = await getAboutPageContent();
  return (
    <>
      <JsonLd data={aboutSchemaData} />
      <AboutPageClient content={content} />
      <FAQSection faqs={aboutFaqs} />
    </>
  );
}
