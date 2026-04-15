import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import type { BlogPostSummary } from "@/lib/cms-types";

type BlogHeroProps = {
  post: BlogPostSummary;
};

export function BlogHero({ post }: BlogHeroProps) {
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <section className="section-padding bg-cream">
      <div className="container-tight">
        <Link href={`/blog/${post.slug}`} className="group block">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="relative aspect-[21/9] md:aspect-[21/8]">
              {post.coverImageUrl ? (
                <Image
                  src={post.coverImageUrl}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-muted" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <div className="flex items-center gap-3 mb-4">
                {post.category && (
                  <Badge variant="default">{post.category.title}</Badge>
                )}
                {post.estimatedReadingTime > 0 && (
                  <span className="inline-flex items-center gap-1 text-sm text-white/80">
                    <Clock className="w-3.5 h-3.5" />
                    {post.estimatedReadingTime} min read
                  </span>
                )}
              </div>

              <h2 className="heading-section !text-3xl md:!text-5xl text-white mb-3">
                {post.title}
              </h2>

              {post.excerpt && (
                <p className="text-white/80 text-lg max-w-2xl line-clamp-2 mb-4">
                  {post.excerpt}
                </p>
              )}

              <div className="flex items-center gap-3">
                {post.author && (
                  <div className="flex items-center gap-2">
                    {post.author.avatarUrl && (
                      <Image
                        src={post.author.avatarUrl}
                        alt={post.author.name}
                        width={32}
                        height={32}
                        className="rounded-full object-cover"
                      />
                    )}
                    <span className="text-sm text-white/90 font-medium">
                      {post.author.name}
                    </span>
                  </div>
                )}
                {formattedDate && (
                  <time className="text-sm text-white/70">{formattedDate}</time>
                )}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
