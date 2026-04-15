import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SimpleRichText } from "@/components/cms/SimpleRichText";
import { JsonLd } from "@/components/seo/JsonLd";
import { FAQSection } from "@/components/seo/FAQSection";
import { privacyPolicySchemaData, privacyPolicyFaqs } from "@/lib/seo-data";
import { getLegalPageContent } from "@/lib/cms";

const PRIVACY_POLICY_SLUG = "privacy-policy";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getLegalPageContent(PRIVACY_POLICY_SLUG);

  if (!content) {
    return {
      title: "Privacy Policy | Rossovivo Pizzeria Dubai",
      description:
        "Read Rossovivo's privacy policy to learn how we collect, use and protect your personal data. Last updated February 2026.",
      robots: { index: false, follow: true },
    };
  }

  return {
    title: content.seoTitle || "Privacy Policy | Rossovivo Pizzeria Dubai",
    description:
      content.seoDescription ||
      "Read Rossovivo's privacy policy to learn how we collect, use and protect your personal data. Last updated February 2026.",
    robots: { index: false, follow: true },
  };
}

export default async function PrivacyPolicyPage() {
  const content = await getLegalPageContent(PRIVACY_POLICY_SLUG);
  if (!content) {
    notFound();
  }

  return (
    <>
      <JsonLd data={privacyPolicySchemaData} />
      <section className="bg-charcoal pt-32 pb-16">
        <div className="container-tight text-center">
          <h1 className="heading-display text-cream">{content.title}</h1>
          {content.lastUpdated ? (
            <p className="mt-5 text-cream/70 text-lg">
              Last updated: {content.lastUpdated}
            </p>
          ) : null}
        </div>
      </section>

      <section className="section-padding bg-cream paper-texture">
        <div className="container-tight max-w-4xl space-y-10 text-charcoal">
          <SimpleRichText document={content.body} />
          {content.contactEmail ? (
            <p className="text-muted-foreground">
              Contact:{" "}
              <a
                href={`mailto:${content.contactEmail}`}
                className="text-primary hover:underline"
              >
                {content.contactEmail}
              </a>
            </p>
          ) : null}
        </div>
      </section>

      <FAQSection faqs={privacyPolicyFaqs} />
    </>
  );
}
