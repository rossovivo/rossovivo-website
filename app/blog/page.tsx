import type { Metadata } from "next";
import { getBlogPosts } from "@/lib/cms";
import { BlogCard } from "@/components/blog/BlogCard";

export const metadata: Metadata = {
  title: "Blog | Rossovivo",
  description:
    "Stories, recipes, and updates from Rossovivo — Dubai's authentic Italian pizzeria.",
};

export default async function BlogListingPage() {
  const posts = await getBlogPosts();

  return (
    <main>
      <section className="section-padding bg-cream">
        <div className="container-tight">
          <div className="text-center mb-12">
            <h1 className="heading-section mb-4">Our Blog</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Stories, recipes, and the latest from our kitchen
            </p>
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-16">
              No blog posts yet. Check back soon!
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
