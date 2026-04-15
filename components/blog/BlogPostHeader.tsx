import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Clock } from "lucide-react";
import type { BlogPostContent } from "@/lib/cms-types";

type BlogPostHeaderProps = {
  post: BlogPostContent;
  readingTime: number;
};

export function BlogPostHeader({ post, readingTime }: BlogPostHeaderProps) {
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <header className="max-w-3xl mx-auto py-12">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/blog">Blog</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {post.category && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/blog/category/${post.category.slug}`}>
                    {post.category.title}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{post.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {post.category && (
        <Link href={`/blog/category/${post.category.slug}`} className="inline-block mb-4">
          <Badge variant="default">{post.category.title}</Badge>
        </Link>
      )}

      <h1 className="heading-section mb-6">{post.title}</h1>

      <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
        {post.author && (
          <div className="flex items-center gap-2">
            {post.author.avatarUrl && (
              <Image
                src={post.author.avatarUrl}
                alt={post.author.name}
                width={36}
                height={36}
                className="rounded-full object-cover"
              />
            )}
            <div>
              <span className="text-foreground font-medium text-sm">
                {post.author.name}
              </span>
              {post.author.role && (
                <span className="text-muted-foreground text-sm block">
                  {post.author.role}
                </span>
              )}
            </div>
          </div>
        )}

        {formattedDate && <time className="text-sm">{formattedDate}</time>}

        {readingTime > 0 && (
          <span className="inline-flex items-center gap-1 text-sm">
            <Clock className="w-3.5 h-3.5" />
            {readingTime} min read
          </span>
        )}
      </div>
    </header>
  );
}
