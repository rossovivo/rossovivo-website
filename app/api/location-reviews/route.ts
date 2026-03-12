import { NextResponse } from 'next/server';

type ContentfulLocationReviewEntry = {
  sys?: {
    updatedAt?: string;
    createdAt?: string;
  };
  fields?: {
    locationId?: unknown;
    rating?: unknown;
    ratingCount?: unknown;
  };
};

type LocationReview = {
  locationId: string;
  rating: number;
  ratingCount: string;
};

type LocationReviewWithMeta = LocationReview & {
  updatedAt: string;
};

const CONTENT_TYPE = 'locationReview';
const MAX_ITEMS = 100;

export const dynamic = 'force-dynamic';

const asNumber = (value: unknown) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const asString = (value: unknown) => {
  if (typeof value === 'string') {
    const cleaned = value.trim();
    return cleaned || null;
  }

  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(value);
  }

  return null;
};

const normalizeLocationReviews = (
  entries: ContentfulLocationReviewEntry[],
): LocationReview[] => {
  const latestByLocation = new Map<string, LocationReviewWithMeta>();

  for (const entry of entries) {
    const fields = entry?.fields ?? {};
    const locationId = asString(fields.locationId);
    const rating = asNumber(fields.rating);
    const ratingCount = asString(fields.ratingCount);

    if (!locationId || rating === null || !ratingCount) {
      continue;
    }

    const updatedAt = entry?.sys?.updatedAt ?? entry?.sys?.createdAt ?? '';
    const existing = latestByLocation.get(locationId);

    if (!existing || updatedAt > existing.updatedAt) {
      latestByLocation.set(locationId, {
        locationId,
        rating,
        ratingCount,
        updatedAt,
      });
    }
  }

  return Array.from(latestByLocation.values())
    .sort((a, b) => a.locationId.localeCompare(b.locationId))
    .map(({ updatedAt, ...review }) => review);
};

export async function GET() {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const deliveryToken = process.env.CONTENTFUL_DELIVERY_TOKEN;
  const environment = process.env.CONTENTFUL_ENVIRONMENT || 'master';

  if (!spaceId || !deliveryToken) {
    return NextResponse.json(
      { reviews: [], error: 'missing_contentful_env' },
      { status: 200 },
    );
  }

  const url = new URL(
    `https://cdn.contentful.com/spaces/${spaceId}/environments/${environment}/entries`,
  );
  url.searchParams.set('content_type', CONTENT_TYPE);
  url.searchParams.set('limit', String(MAX_ITEMS));
  url.searchParams.set('order', 'fields.locationId,-sys.updatedAt');

  try {
    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${deliveryToken}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json(
        { reviews: [], error: `contentful_${response.status}` },
        { status: 200 },
      );
    }

    const data = await response.json();
    const entries = Array.isArray(data?.items)
      ? (data.items as ContentfulLocationReviewEntry[])
      : [];

    const reviews = normalizeLocationReviews(entries);

    return NextResponse.json(
      { reviews },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store',
        },
      },
    );
  } catch (error) {
    return NextResponse.json(
      { reviews: [], error: 'fetch_failed' },
      { status: 200 },
    );
  }
}
