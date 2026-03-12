# Instagram Feed (Behold)

This project now uses a Behold feed endpoint server-side and normalizes it for
the homepage social section.

## Files
- `app/api/instagram/route.ts` — server endpoint that fetches Behold posts + caches them
- `components/home/SocialProof.tsx` — client component that renders normalized posts

## How It Works
1. **Server route** fetches Behold JSON from `BEHOLD_FEED_URL`.
2. The route maps posts into:
   - `id`
   - `caption`
   - `image`
   - `link`
   - `type`
   - `timestamp`
3. **Client** calls `/api/instagram` and renders items if available.
4. If the feed is unavailable, the component shows placeholders and a short
   unavailable message.

## Environment Variables (Vercel / Local)
Set these on Vercel and in your local `.env`:

```
BEHOLD_FEED_URL=https://feeds.behold.so/q0wNsiAungPnjFBwbFEm
```

## Caching
The API response is cached for 1 hour:
- `revalidate = 3600`
- `Cache-Control: s-maxage=3600, stale-while-revalidate=86400`

You can adjust cache duration in `app/api/instagram/route.ts`:
```
const REVALIDATE_SECONDS = 60 * 60; // 1 hour
```

## Troubleshooting
- **No posts shown**: verify `BEHOLD_FEED_URL` is set and reachable.
- **No images at all**: check `/api/instagram` response in the browser.
