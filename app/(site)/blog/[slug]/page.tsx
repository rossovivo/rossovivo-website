import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getBlogPost, getBlogSlugs, getRelatedBlogPosts } from "@/lib/cms";
import { estimateReadingTime } from "@/lib/reading-time";
import { BlogPortableText } from "@/components/blog/BlogPortableText";
import { SchemaMarkup } from "@/components/blog/SchemaMarkup";
import { BlogPostHeader } from "@/components/blog/BlogPostHeader";
import { BlogAuthorCard } from "@/components/blog/BlogAuthorCard";
import { BlogRelatedPosts } from "@/components/blog/BlogRelatedPosts";
import { BlogShareButtons } from "@/components/blog/BlogShareButtons";
import { JsonLd } from "@/components/seo/JsonLd";

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
    openGraph: {
      type: "article",
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt || "",
      url: `https://www.rossovivo.com/blog/${slug}`,
      ...(post.coverImageUrl && {
        images: [{ url: post.coverImageUrl, width: 1200, height: 630 }],
      }),
      ...(post.publishedAt && { publishedTime: post.publishedAt }),
      ...(post.author && { authors: [post.author.name] }),
      ...(post.category && { section: post.category.title }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt || "",
      ...(post.coverImageUrl && { images: [post.coverImageUrl] }),
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) notFound();

  const readingTime =
    post.estimatedReadingTime > 0
      ? post.estimatedReadingTime
      : post.content.length > 0
        ? estimateReadingTime(post.content)
        : 0;

  const relatedPosts = await getRelatedBlogPosts(
    slug,
    post.category?.slug || null,
  );

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.rossovivo.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://www.rossovivo.com/blog",
      },
      ...(post.category
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: post.category.title,
              item: `https://www.rossovivo.com/blog/category/${post.category.slug}`,
            },
            {
              "@type": "ListItem",
              position: 4,
              name: post.title,
              item: `https://www.rossovivo.com/blog/${slug}`,
            },
          ]
        : [
            {
              "@type": "ListItem",
              position: 3,
              name: post.title,
              item: `https://www.rossovivo.com/blog/${slug}`,
            },
          ]),
    ],
  };

  return (
    <main>
      <JsonLd data={breadcrumbJsonLd} />
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
          <BlogPostHeader post={post} readingTime={readingTime} />

          <div className="max-w-3xl mx-auto mb-6">
            <BlogShareButtons title={post.title} slug={slug} />
          </div>

          <div className="max-w-3xl mx-auto pb-12">
            {post.content && post.content.length > 0 && (
              <BlogPortableText value={post.content} />
            )}
          </div>

          {post.author && (
            <div className="max-w-3xl mx-auto pb-12">
              <BlogAuthorCard author={post.author} />
            </div>
          )}
        </div>
      </article>

      <BlogRelatedPosts posts={relatedPosts} />
    </main>
  );
}
