"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { BlogCategory } from "@/lib/cms-types";

type BlogCategoryFilterProps = {
  categories: BlogCategory[];
  activeSlug?: string;
};

export function BlogCategoryFilter({
  categories,
  activeSlug,
}: BlogCategoryFilterProps) {
  if (categories.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-10">
      <Link href="/blog">
        <Badge variant={activeSlug ? "outline" : "default"} className="cursor-pointer text-sm px-4 py-1.5">
          All
        </Badge>
      </Link>
      {categories.map((category) => (
        <Link key={category.slug} href={`/blog/category/${category.slug}`}>
          <Badge
            variant={activeSlug === category.slug ? "default" : "outline"}
            className="cursor-pointer text-sm px-4 py-1.5"
          >
            {category.title}
          </Badge>
        </Link>
      ))}
    </div>
  );
}
