# Blog Feature

## Sanity Schema

### Document Types
- **blogPost** - Blog articles with title, slug, cover image, excerpt, portable text content, SEO fields, schema markup
- **category** - Blog categories with title, slug, description
- **author** - Blog authors with name, slug, avatar, bio, role

### Blog Post Fields
- `title` (required), `slug` (required, auto from title)
- `author` (reference to author), `category` (reference to category)
- `featured` (boolean, highlights post in hero section)
- `coverImage` (with hotspot), `excerpt`
- `content` (portable text + inline images with alt/caption)
- `publishedAt` (datetime), `estimatedReadingTime` (number, minutes)
- `seoTitle`, `seoDescription`, `schemaMarkup` (from plugin)

## Frontend Routes

| Route | File | Purpose |
|-------|------|---------|
| `/blog` | `app/blog/page.tsx` | Listing with hero, category filter, pagination |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | Detail with author, share, related posts |
| `/blog/category/[slug]` | `app/blog/category/[slug]/page.tsx` | Category-filtered listing |

## Components

All in `components/blog/`:

| Component | Type | Purpose |
|-----------|------|---------|
| BlogHero | Server | Featured post highlight on listing |
| BlogCard | Server | Post card in grid listings |
| BlogCategoryFilter | Client | Category pill navigation |
| BlogPostHeader | Server | Detail page header with breadcrumbs |
| BlogPortableText | Server | Portable text renderer |
| BlogAuthorCard | Server | Author info below article |
| BlogRelatedPosts | Server | Related posts section |
| BlogShareButtons | Client | Social share (X, Facebook, LinkedIn, copy) |
| BlogPagination | Server | Page navigation |
| SchemaMarkup | Server | JSON-LD structured data |

## CMS Functions

All in `lib/cms.ts`:

- `getBlogPosts()` - All posts ordered by date
- `getBlogPost(slug)` - Single post with full content
- `getBlogSlugs()` - All slugs for static generation
- `getCategories()` - All categories ordered by title
- `getBlogPostsByCategory(slug)` - Posts filtered by category
- `getFeaturedBlogPost()` - Most recent featured post
- `getRelatedBlogPosts(slug, categorySlug, limit)` - Related posts by category

## Reading Time

`lib/reading-time.ts` exports `estimateReadingTime(content)` which counts words in portable text blocks at 200 WPM. Falls back to this when `estimatedReadingTime` field is not set in Sanity.

## SEO

- Open Graph article metadata with image, author, section, published time
- Twitter summary_large_image cards
- BreadcrumbList JSON-LD on detail pages
- Schema markup via `@operationnation/sanity-plugin-schema-markup`
- Blog posts and categories included in sitemap

## Pagination

Client-side pagination via URL search params (`?page=2`). Page size: 9 posts. The featured/hero post is excluded from the paginated grid on page 1.
