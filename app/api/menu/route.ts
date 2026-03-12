import { NextResponse } from 'next/server';
import type { MenuCategory, MenuItem } from '@/lib/menu';

type ContentfulMenuEntry = {
  sys?: {
    createdAt?: string;
  };
  fields?: {
    name?: unknown;
    description?: unknown;
    features?: unknown;
    price?: unknown;
    category?: unknown;
    sortOrder?: unknown;
  };
};

const CONTENT_TYPE = 'menuItem';
const MAX_ITEMS = 1000;

export const dynamic = 'force-dynamic';

const asNumber = (value: unknown) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const normalizeFeatures = (features: unknown) => {
  if (Array.isArray(features)) {
    const cleaned = features
      .map((item) => String(item).trim())
      .filter(Boolean);
    return cleaned.length > 0 ? cleaned.join(' ') : undefined;
  }

  if (typeof features === 'string') {
    const cleaned = features.trim();
    return cleaned || undefined;
  }

  return undefined;
};

const normalizeMenuCategories = (entries: ContentfulMenuEntry[]): MenuCategory[] => {
  const grouped = new Map<
    string,
    {
      name: string;
      items: Array<MenuItem & { sortOrder: number; createdAt: string }>;
    }
  >();

  for (const entry of entries) {
    const fields = entry?.fields ?? {};
    const name = typeof fields.name === 'string' ? fields.name.trim() : '';
    const price = asNumber(fields.price);

    if (!name || price === null) {
      continue;
    }

    const categoryName =
      typeof fields.category === 'string' && fields.category.trim()
        ? fields.category.trim()
        : 'Uncategorized';

    const description =
      typeof fields.description === 'string'
        ? fields.description.trim() || undefined
        : undefined;

    const features = normalizeFeatures(fields.features);
    const sortOrder = asNumber(fields.sortOrder) ?? Number.MAX_SAFE_INTEGER;
    const createdAt = entry?.sys?.createdAt ?? '';

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
        .map(({ sortOrder, createdAt, ...item }) => item),
    }))
    .filter((category) => category.items.length > 0);
};

export async function GET() {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const deliveryToken = process.env.CONTENTFUL_DELIVERY_TOKEN;
  const environment = process.env.CONTENTFUL_ENVIRONMENT || 'master';

  if (!spaceId || !deliveryToken) {
    return NextResponse.json(
      { categories: [], error: 'missing_contentful_env' },
      { status: 200 },
    );
  }

  const url = new URL(
    `https://cdn.contentful.com/spaces/${spaceId}/environments/${environment}/entries`,
  );
  url.searchParams.set('content_type', CONTENT_TYPE);
  url.searchParams.set('limit', String(MAX_ITEMS));
  url.searchParams.set('order', 'fields.category,fields.sortOrder,sys.createdAt');

  try {
    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${deliveryToken}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json(
        { categories: [], error: `contentful_${response.status}` },
        { status: 200 },
      );
    }

    const data = await response.json();
    const entries = Array.isArray(data?.items)
      ? (data.items as ContentfulMenuEntry[])
      : [];

    const categories = normalizeMenuCategories(entries);

    return NextResponse.json(
      { categories },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store',
        },
      },
    );
  } catch (error) {
    return NextResponse.json(
      { categories: [], error: 'fetch_failed' },
      { status: 200 },
    );
  }
}
