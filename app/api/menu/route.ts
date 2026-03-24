import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import type { MenuCategory, MenuItem } from "@/lib/menu";

type SanityMenuItem = {
  name?: unknown;
  description?: unknown;
  features?: unknown;
  price?: unknown;
  category?: unknown;
  sortOrder?: unknown;
  _createdAt?: unknown;
};

type MenuApiResponse = {
  categories: MenuCategory[];
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

const normalizeFeatures = (features: unknown) => {
  if (Array.isArray(features)) {
    const cleaned = features
      .map((item) => String(item).trim())
      .filter(Boolean);
    return cleaned.length > 0 ? cleaned.join(" ") : undefined;
  }

  if (typeof features === "string") {
    const cleaned = features.trim();
    return cleaned || undefined;
  }

  return undefined;
};

const normalizeMenuCategories = (items: SanityMenuItem[]): MenuCategory[] => {
  const grouped = new Map<
    string,
    {
      name: string;
      items: Array<MenuItem & { sortOrder: number; createdAt: string }>;
    }
  >();

  for (const item of items) {
    const name = typeof item.name === "string" ? item.name.trim() : "";
    const price = asNumber(item.price);

    if (!name || price === null) continue;

    const categoryName =
      typeof item.category === "string" && item.category.trim()
        ? item.category.trim()
        : "Uncategorized";

    const description =
      typeof item.description === "string"
        ? item.description.trim() || undefined
        : undefined;
    const features = normalizeFeatures(item.features);
    const sortOrder = asNumber(item.sortOrder) ?? Number.MAX_SAFE_INTEGER;
    const createdAt =
      typeof item._createdAt === "string" ? item._createdAt : "";

    if (!grouped.has(categoryName)) {
      grouped.set(categoryName, {
        name: categoryName,
        items: [],
      });
    }

    grouped.get(categoryName)?.items.push({
      name,
      description,
      features,
      price,
      sortOrder,
      createdAt,
    });
  }

  return Array.from(grouped.values())
    .map((category) => ({
      name: category.name,
      items: category.items
        .sort(
          (a, b) =>
            a.sortOrder - b.sortOrder ||
            a.createdAt.localeCompare(b.createdAt) ||
            a.name.localeCompare(b.name),
        )
        .map(({ sortOrder, createdAt, ...menuItem }) => menuItem),
    }))
    .filter((category) => category.items.length > 0);
};

export async function GET() {
  if (!sanityClient) {
    return NextResponse.json<MenuApiResponse>(
      { categories: [], error: "missing_sanity_env" },
      { status: 200 },
    );
  }

  try {
    const items = await sanityClient.fetch<SanityMenuItem[]>(
      `*[_type == "menuItem"] | order(category asc, sortOrder asc, _createdAt asc){
        name,
        description,
        features,
        price,
        category,
        sortOrder,
        _createdAt
      }`,
    );

    const categories = normalizeMenuCategories(Array.isArray(items) ? items : []);

    return NextResponse.json<MenuApiResponse>(
      { categories },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch {
    return NextResponse.json<MenuApiResponse>(
      { categories: [], error: "fetch_failed" },
      { status: 200 },
    );
  }
}
