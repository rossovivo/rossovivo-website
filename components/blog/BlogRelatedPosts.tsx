import { BlogCard } from "@/components/blog/BlogCard";
import type { BlogPostSummary } from "@/lib/cms-types";

type BlogRelatedPostsProps = {
  posts: BlogPostSummary[];
};

export function BlogRelatedPosts({ posts }: BlogRelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="section-padding bg-cream">
      <div className="container-tight">
        <h2 className="heading-card !text-3xl text-center mb-10">
          You Might Also Enjoy
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
