# Contentful Location Reviews Setup

Location card review values now load from `GET /api/location-reviews`.

If Contentful is missing or empty, the UI keeps using the hardcoded fallback ratings.

## 1) Env vars

Use the existing Contentful env vars in `.env.local`:

```bash
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_DELIVERY_TOKEN=your_content_delivery_api_token
CONTENTFUL_CMA_TOKEN=your_content_management_api_token
CONTENTFUL_ENVIRONMENT=master
```

`CONTENTFUL_CMA_TOKEN` is only required for the optional sync script.

## 2) Create content type

Create a Contentful content type with ID: `locationReview`

Add these fields (field IDs must match):

1. `locationId` (Short text, required)
2. `rating` (Number, required)
3. `ratingCount` (Short text, required)

## 3) Create entries

Create one entry per location card:

- Entry 1:
  - `locationId`: `media-city`
  - `rating`: `4.3`
  - `ratingCount`: `297`
- Entry 2:
  - `locationId`: `business-bay`
  - `rating`: `4.3`
  - `ratingCount`: `401`

If multiple entries exist for the same `locationId`, the most recently updated one is used.

## 4) Optional seed script

You can create/update both entries automatically:

```bash
pnpm contentful:sync-location-reviews:dry
pnpm contentful:sync-location-reviews
```

Optional archive mode:

```bash
pnpm contentful:sync-location-reviews -- --archive-missing
```

## 5) Verify

1. Run `npm run dev`
2. Open `http://localhost:3000/api/location-reviews`
3. Confirm response includes `reviews`
4. Open `/` or `/locations` and verify the card badge values update
