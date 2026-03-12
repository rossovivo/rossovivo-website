# Contentful CMS Model (Pages + Global Content)

This model expands Contentful beyond `locationReview` and keeps `menuItem` untouched (deprecated path is left as-is).

## Env vars

Use the same env vars already used by existing sync scripts:

```bash
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_DELIVERY_TOKEN=your_content_delivery_api_token
CONTENTFUL_CMA_TOKEN=your_content_management_api_token
CONTENTFUL_ENVIRONMENT=master
```

`CONTENTFUL_CMA_TOKEN` is required for model sync.

## Sync command

```bash
pnpm contentful:sync-cms-model:dry
pnpm contentful:sync-cms-model
```

Optional: sync only selected content types:

```bash
pnpm contentful:sync-cms-model -- --only=siteSettings,location,homePage
```

## Seed starter content

The project includes a seed script that upserts starter entries using current live copy/links from the codebase.

```bash
pnpm contentful:seed-cms-content:dry
pnpm contentful:seed-cms-content
```

## Content types created/updated

1. `siteSettings` (singleton)
- Global logos, social links, WhatsApp, phones, emails, addresses, footer location summary, and eMenu links.

2. `location`
- `slug`, `locationId`, `name`, `address`, `phone`, `hours`, `menuUrl`, `directionsUrl`, `mapEmbedUrl`, `directionsUrlLong`, `mapEmbedUrlLong`, `rating`, `ratingCount`, `displayOrder`, `isActive`, `gallery`.

3. `homePage` (singleton)
- Hero eyebrow/title/title highlight/subtitle/buttons/media.
- Hero media supports both `heroVideo` (asset upload) and `heroVideoUrl` (URL fallback).
- Locations section title + location references.
- Catering teaser copy/list/image.
- Event form title/subtitle/image.
- Social handle label.

4. `cateringPolaroidItem`
- Reusable polaroid card item: `title`, `tag`, `description`, `image`, `isBestseller`, `sortOrder`.

5. `cateringFeatureItem`
- Reusable feature item: `iconName` (Lucide name), `title`, `copy`, `sortOrder`.

6. `cateringMediaItem`
- Reusable media card item: `name`, `quote`, `designation`, `image`, `sortOrder`.

7. `cateringPage` (singleton)
- Main hero title/subtitle/image.
- Polaroid section copy + `cateringPolaroidItem[]`.
- Features copy + `cateringFeatureItem[]`.
- Includes copy + `cateringMediaItem[]`.
- Optional section copy + `cateringMediaItem[]`.
- Event form copy/image.
- Form option arrays (`eventTypeOptions`, `availableSpaceOptions`, `setupPreferenceOptions`).

8. `aboutPage` (singleton)
- Hero, story heading, rich text body, signature, story image, CTA copy/links.

9. `contactPage` (singleton)
- Hero copy, info headings, form copy, location references.

10. `legalPage`
- `slug`, `title`, `seoTitle`, `seoDescription`, `lastUpdated`, rich text `body`, `contactEmail`.

## Notes

- Existing `menuItem` and `locationReview` content types are not modified by this script.
- The script is non-destructive for synced types: it adds/updates defined fields but does not delete extra existing fields.
- `iconName` in `cateringFeatureItem` uses a PascalCase validation pattern and is intended to map to icon names from [lucide.dev](https://lucide.dev/).
- Starter seeding intentionally focuses on copy/links first; images can be uploaded and attached in Contentful after seed.
