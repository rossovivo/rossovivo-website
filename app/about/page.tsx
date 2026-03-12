import { AboutPageClient } from "@/components/about/AboutPageClient";
import { getAboutPageContent } from "@/lib/contentful-cms";

export default async function AboutPage() {
  const content = await getAboutPageContent();
  return <AboutPageClient content={content} />;
}
