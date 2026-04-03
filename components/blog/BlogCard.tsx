import Image from "next/image";
import Link from "next/link";
import type { BlogPostSummary } from "@/lib/cms-types";

type BlogCardProps = {
  post: BlogPostSummary;
};

export function BlogCard({ post }: BlogCardProps) {
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="card-warm h-full flex flex-col overflow-hidden !p-0">
        <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl">
          {post.coverImageUrl ? (
            <Image
              src={post.coverImageUrl}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <span className="text-muted-foreground text-sm">No image</span>
            </div>
          )}
        </div>
        <div className="flex flex-col flex-1 p-6">
          {formattedDate && (
            <time className="text-sm text-muted-foreground mb-2">
              {formattedDate}
            </time>
          )}
          <h2 className="heading-card !text-xl mb-3 group-hover:text-primary transition-colors duration-200">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="text-muted-foreground text-sm line-clamp-3 flex-1">
              {post.excerpt}
            </p>
          )}
          <span className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-4">
            Read more
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </div>
      </article>
    </Link>
  );
}
