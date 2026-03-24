import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

type SanityLocationReview = {
  locationId?: unknown;
  rating?: unknown;
  ratingCount?: unknown;
  _updatedAt?: unknown;
  _createdAt?: unknown;
};

type LocationReview = {
  locationId: string;
  rating: number;
  ratingCount: string;
};

type LocationReviewWithMeta = LocationReview & {
  updatedAt: string;
};

type LocationReviewsResponse = {
  reviews: LocationReview[];
  error?: string;
};

const sanityProjectId = process.env.SANITY_PROJECT_ID?.trim();
const sanityDataset = process.env.SANITY_DATASET?.trim();
const sanityToken = process.env.SANITY_API_TOKEN?.trim();

const hasSanity = Boolean(sanityProjectId && sanityDataset);

const sanityClient = hasSanity
  ? createClient({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      token: sanityToken || undefined,
      apiVersion: "2023-10-01",
      useCdn: false,
    })
  : null;

export const dynamic = "force-dynamic";

const asNumber = (value: unknown) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const asString = (value: unknown) => {
  if (typeof value === "string") {
    const cleaned = value.trim();
    return cleaned || null;
  }

  if (typeof value === "number" && Number.isFinite(value)) {
    return String(value);
  }

  return null;
};

const normalizeLocationReviews = (items: SanityLocationReview[]): LocationReview[] => {
  const latestByLocation = new Map<string, LocationReviewWithMeta>();

  for (const item of items) {
    const locationId = asString(item.locationId);
    const rating = asNumber(item.rating);
    const ratingCount = asString(item.ratingCount);
    if (!locationId || rating === null || !ratingCount) continue;

    const updatedAt =
      (typeof item._updatedAt === "string" && item._updatedAt) ||
      (typeof item._createdAt === "string" && item._createdAt) ||
      "";

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
  if (!sanityClient) {
    return NextResponse.json<LocationReviewsResponse>(
      { reviews: [], error: "missing_sanity_env" },
      { status: 200 },
    );
  }

  try {
    const items = await sanityClient.fetch<SanityLocationReview[]>(
      `*[_type == "locationReview"] | order(locationId asc, _updatedAt desc){
        locationId,
        rating,
        ratingCount,
        _updatedAt,
        _createdAt
      }`,
    );

    const reviews = normalizeLocationReviews(Array.isArray(items) ? items : []);

    return NextResponse.json<LocationReviewsResponse>(
      { reviews },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch {
    return NextResponse.json<LocationReviewsResponse>(
      { reviews: [], error: "fetch_failed" },
      { status: 200 },
    );
  }
}
