import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost, getBlogSlugs } from "@/lib/cms";
import { BlogPortableText } from "@/components/blog/BlogPortableText";
import { SchemaMarkup } from "@/components/blog/SchemaMarkup";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) return { title: "Post Not Found" };

  return {
    title: post.seoTitle || `${post.title} | Rossovivo Blog`,
    description: post.seoDescription || post.excerpt || "",
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) notFound();

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <main>
      {post.schemaMarkup && post.schemaMarkup.length > 0 && (
        <SchemaMarkup schema={post.schemaMarkup} />
      )}
      <article>
        {post.coverImageUrl && (
          <div className="relative w-full h-[40vh] md:h-[50vh]">
            <Image
              src={post.coverImageUrl}
              alt={post.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
          </div>
        )}

        <div className="container-tight">
          <header className="max-w-3xl mx-auto py-12 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-primary text-sm font-medium mb-6 hover:underline"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              Back to Blog
            </Link>
            <h1 className="heading-section mb-4">{post.title}</h1>
            {formattedDate && (
              <time className="text-muted-foreground">{formattedDate}</time>
            )}
          </header>

          <div className="max-w-3xl mx-auto pb-16">
            {post.content && post.content.length > 0 && (
              <BlogPortableText value={post.content} />
            )}
          </div>
        </div>
      </article>
    </main>
  );
}
