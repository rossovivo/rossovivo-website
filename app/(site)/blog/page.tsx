import type { Metadata } from "next";
import { getBlogPosts, getCategories, getFeaturedBlogPost } from "@/lib/cms";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogPageHero } from "@/components/blog/BlogPageHero";
import { BlogHero } from "@/components/blog/BlogHero";
import { BlogCategoryFilter } from "@/components/blog/BlogCategoryFilter";
import { BlogPagination } from "@/components/blog/BlogPagination";

const PAGE_SIZE = 9;

export const metadata: Metadata = {
  title: "Blog | Rossovivo",
  description:
    "Stories, recipes, and updates from Rossovivo — Dubai's authentic Italian pizzeria.",
};

type BlogListingPageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function BlogListingPage({
  searchParams,
}: BlogListingPageProps) {
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, parseInt(pageParam || "1", 10) || 1);

  const [allPosts, categories, featuredPost] = await Promise.all([
    getBlogPosts(),
    getCategories(),
    getFeaturedBlogPost(),
  ]);

  const heroPost = featuredPost || allPosts[0] || null;
  const postsWithoutHero = heroPost
    ? allPosts.filter((p) => p.slug !== heroPost.slug)
    : allPosts;

  const totalPages = Math.ceil(postsWithoutHero.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedPosts = postsWithoutHero.slice(
    startIndex,
    startIndex + PAGE_SIZE,
  );

  return (
    <main>
      <BlogPageHero />

      {heroPost && currentPage === 1 && <BlogHero post={heroPost} />}

      <section className="section-padding bg-cream">
        <div className="container-tight">

          <BlogCategoryFilter categories={categories} />

          {paginatedPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-16">
              No blog posts yet. Check back soon!
            </p>
          )}

          <BlogPagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/blog"
          />
        </div>
      </section>
    </main>
  );
}
