import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getCategories,
  getBlogPostsByCategory,
} from "@/lib/cms";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogCategoryFilter } from "@/components/blog/BlogCategoryFilter";
import { BlogPagination } from "@/components/blog/BlogPagination";

const PAGE_SIZE = 9;

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);

  if (!category) return { title: "Category Not Found" };

  return {
    title: `${category.title} | Rossovivo Blog`,
    description:
      category.description ||
      `Browse ${category.title} articles from Rossovivo — Dubai's authentic Italian pizzeria.`,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, parseInt(pageParam || "1", 10) || 1);

  const [categories, posts] = await Promise.all([
    getCategories(),
    getBlogPostsByCategory(slug),
  ]);

  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const totalPages = Math.ceil(posts.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedPosts = posts.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <main>
      <section className="section-padding bg-cream">
        <div className="container-tight">
          <div className="text-center mb-10">
            <h1 className="heading-section mb-4">{category.title}</h1>
            {category.description && (
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                {category.description}
              </p>
            )}
          </div>

          <BlogCategoryFilter categories={categories} activeSlug={slug} />

          {paginatedPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-16">
              No posts in this category yet. Check back soon!
            </p>
          )}

          <BlogPagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath={`/blog/category/${slug}`}
          />
        </div>
      </section>
    </main>
  );
}
