# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Rossovivo Pizzeria Next.js app. Here's a summary of what was done:

- **Packages installed**: `posthog-js` (client-side) and `posthog-node` (server-side) added via pnpm
- **Environment variables**: `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` written to `.env.local`
- **Client-side initialization**: Created `instrumentation-client.ts` using the Next.js 15.3+ approach — no PostHogProvider needed. Includes reverse proxy, exception capture, and debug mode in development
- **Server-side client**: Created `lib/posthog-server.ts` with a singleton `getPostHogClient()` function configured for immediate flushing in serverless API routes
- **Reverse proxy**: Updated `next.config.mjs` with `/ingest/*` rewrites to EU PostHog endpoints, reducing event loss from ad blockers

## Events instrumented

| Event | Description | File |
|---|---|---|
| `catering_enquiry_submitted` | User successfully submits a catering/contact enquiry form | `components/catering/SegmentLeadForm.tsx` |
| `catering_enquiry_failed` | Catering/contact enquiry form submission failed (client-side) | `components/catering/SegmentLeadForm.tsx` |
| `hero_cta_clicked` | User clicks a primary or secondary CTA button in the Hero section | `components/home/Hero.tsx` |
| `emenu_opened` | User opens the eMenu dropdown for a specific location from the hero | `components/home/Hero.tsx` |
| `order_now_clicked` | User clicks Order Now for a specific location card | `components/home/LocationsPreview.tsx` |
| `get_directions_clicked` | User clicks Get Directions for a specific location card | `components/home/LocationsPreview.tsx` |
| `whatsapp_cta_clicked` | User clicks the WhatsApp Us button in the sticky CTA | `components/layout/StickyEventCTA.tsx` |
| `sticky_event_cta_clicked` | User clicks the Plan an Event sticky CTA button | `components/layout/StickyEventCTA.tsx` |
| `contact_enquiry_submitted` | Server-side: enquiry successfully processed and email sent via Resend | `app/api/contact/route.ts` |
| `contact_enquiry_failed` | Server-side: contact enquiry email send failed | `app/api/contact/route.ts` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://eu.posthog.com/project/139691/dashboard/564494
  - **Enquiry conversion funnel** (hero click → enquiry submitted): https://eu.posthog.com/project/139691/insights/PBVyfn6e
  - **Catering enquiries over time** (submitted vs failed): https://eu.posthog.com/project/139691/insights/QDtT6LDl
  - **Location engagement CTAs** (order now, get directions, eMenu): https://eu.posthog.com/project/139691/insights/xvVYMrZC
  - **Contact & WhatsApp CTA engagement**: https://eu.posthog.com/project/139691/insights/XLXQBQgQ

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/posthog-integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
