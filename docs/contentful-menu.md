# Contentful Menu Setup

This project now supports loading menu data from Contentful via `GET /api/menu`.

If Contentful is not configured yet, the app keeps showing the existing hardcoded fallback menu.

## 1) Add env vars

Create `.env.local` in the project root with:

```bash
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_DELIVERY_TOKEN=your_content_delivery_api_token
CONTENTFUL_CMA_TOKEN=your_content_management_api_token
CONTENTFUL_ENVIRONMENT=master
```

`CONTENTFUL_ENVIRONMENT` is optional and defaults to `master`.

## 2) Create Content Type in Contentful

Create a content type with ID: `menuItem`

Add these fields (field IDs should match exactly):

1. `name` (Short text, required)
2. `category` (Short text, required)
3. `price` (Number, required)
4. `description` (Long text, optional)
5. `features` (Short text list OR Short text, optional)
6. `sortOrder` (Integer, optional)

## 3) Populate entries

Create one `menuItem` entry per menu item. Example:

- `name`: `Margherita`
- `category`: `Pizza`
- `price`: `60`
- `description`: `Tomato mozzarella and basil`
- `features`: `Vegetarian`, `Bestseller` (or a single string like `Vegetarian Bestseller`)
- `sortOrder`: `2`

## 4) Verify in your app

1. Run `npm run dev`
2. Open `http://localhost:3000/api/menu`
3. Confirm response has `categories` with grouped `items`
4. Open `/menu` and confirm items render from Contentful

## Notes

- Current UI tags only highlight these values: `Vegetarian`, `Gluten Free`, `Bestseller`.
- API uses server-side caching (`revalidate` = 5 minutes).
- If Contentful fetch fails or env vars are missing, the `/menu` page automatically falls back to hardcoded data.

## Sync Script

After dependencies are installed, you can push local fallback menu data to Contentful:

```bash
pnpm contentful:sync-menu:dry
pnpm contentful:sync-menu
```

Optional archive mode:

```bash
pnpm contentful:sync-menu -- --archive-missing
```
