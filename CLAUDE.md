# Project: Rossovivo Website

## Overview
- **Type**: Next.js website (restaurant/pizzeria)
- **Stack**: Next.js 16.1.6, React 19, Tailwind CSS 3.4, TypeScript, Sanity CMS v5
- **Package Manager**: bun
- **Started**: 2024

## Architecture Decisions
- Sanity CMS as headless content management with embedded Studio at `/studio`
- Server components by default, "use client" only for interactive pieces
- Hybrid data fetching: Sanity queries with fallback to default data
- PostHog analytics with reverse proxy for ad-blocker resilience
- Resend for transactional email (contact/catering forms)

## Preferences & Rules
- Colors use HSL CSS variables (existing pattern from project start)
- All components use CVA (class-variance-authority) + cn() utility
- shadcn/ui as primitive component library
- Expressive naming, no comments
- Co-locate feature components in `components/[feature]/`
- Use axios for non-Sanity HTTP calls

## Patterns & Conventions
- CSS utility classes: `section-padding`, `container-tight`, `heading-section`, `heading-card`, `card-warm`
- Typography: Gotham (display), Inter (body), Hurricane (script)
- Brand colors: chili (primary red), cream/paper (backgrounds), charcoal (text)
- Sanity schemas in `studio/schemaTypes/`, registered in `index.ts`
- CMS queries and client in `lib/cms.ts`, types in `lib/cms-types.ts`
- Pages fetch data server-side and delegate rendering to feature components

## Learnings & Corrections

## Dependencies & Tooling
- `@sanity/client@7.17.0` - Sanity CMS client
- `@operationnation/sanity-plugin-schema-markup@2.0.0` - SEO structured data
- `@portabletext/react@6.0.3` - Rich text rendering
- `framer-motion@12.29.2` - Animations
- `posthog-js` / `posthog-node` - Analytics
- `resend@6.9.3` - Email
- `lucide-react` / `@tabler/icons-react` - Icons

## Component Registry
- `components/ui/` - 51 shadcn/ui primitives (Button, Badge, Card, Pagination, Breadcrumb, etc.)
- `components/blog/` - BlogCard, BlogPortableText, SchemaMarkup, BlogHero, BlogCategoryFilter, BlogPostHeader, BlogAuthorCard, BlogRelatedPosts, BlogShareButtons, BlogPagination
- `components/home/` - Hero, LocationCards, CateringTeaser, SocialProof
- `components/catering/` - Catering page components
- `components/about/` - AboutPageClient
- `components/contact/` - Contact form components
- `components/layout/` - Navbar, Footer, StickyEventCTA
- `components/seo/` - JsonLd, FAQSection

## API & Data Layer
- Sanity Project: `qcsslhtr`, Dataset: `production`
- API routes: `/api/contact`, `/api/instagram`, `/api/location-reviews`, `/api/menu`, `/api/revalidate`
- Blog queries: getBlogPosts, getBlogPost, getBlogSlugs, getCategories, getBlogPostsByCategory, getFeaturedBlogPost, getRelatedBlogPosts

## Current State
- Full restaurant website with home, about, blog, catering, locations, contact, menu pages
- Blog enhanced with categories, authors, featured posts, pagination, related posts, share buttons, breadcrumbs, reading time
- SEO: sitemaps, robots, JSON-LD, schema markup, Open Graph
- Analytics: PostHog, Meta Pixel, GTM
