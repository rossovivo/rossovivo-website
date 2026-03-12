import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SimpleRichText } from "@/components/contentful/SimpleRichText";
import { getLegalPageContent } from "@/lib/contentful-cms";

const PRIVACY_POLICY_SLUG = "privacy-policy";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getLegalPageContent(PRIVACY_POLICY_SLUG);

  if (!content) {
    return {
      title: "Privacy Policy | Rossovivo Pizzeria",
      description:
        "Read how Rossovivo collects, uses, and protects your personal information.",
    };
  }

  return {
    title: content.seoTitle || content.title,
    description: content.seoDescription,
  };
}

export default async function PrivacyPolicyPage() {
  const content = await getLegalPageContent(PRIVACY_POLICY_SLUG);
  if (!content) {
    notFound();
  }

  return (
    <>
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
    </>
  );
}
