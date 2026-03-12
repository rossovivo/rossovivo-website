import { NextResponse } from 'next/server';

const LIMIT = 6;
const REVALIDATE_SECONDS = 60 * 60;
const DEFAULT_BEHOLD_FEED_URL = 'https://feeds.behold.so/q0wNsiAungPnjFBwbFEm';

export const revalidate = 3600;

type BeholdPostSize = {
  mediaUrl?: string;
};

type BeholdPost = {
  id: string;
  prunedCaption?: string;
  caption?: string;
  permalink?: string;
  mediaType?: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM' | string;
  mediaUrl?: string;
  thumbnailUrl?: string;
  sizes?: {
    large?: BeholdPostSize;
    medium?: BeholdPostSize;
    full?: BeholdPostSize;
    small?: BeholdPostSize;
  };
  timestamp?: string;
};

const getImageUrl = (post: BeholdPost) => {
  const bySize =
    post.sizes?.large?.mediaUrl ??
    post.sizes?.medium?.mediaUrl ??
    post.sizes?.full?.mediaUrl ??
    post.sizes?.small?.mediaUrl;

  if (post.mediaType === 'VIDEO') {
    return bySize ?? post.thumbnailUrl ?? post.mediaUrl ?? '';
  }

  return bySize ?? post.mediaUrl ?? post.thumbnailUrl ?? '';
};

export async function GET() {
  const feedUrl = process.env.BEHOLD_FEED_URL || DEFAULT_BEHOLD_FEED_URL;

  if (!feedUrl) {
    return NextResponse.json(
      { items: [], error: 'missing_feed_url' },
      { status: 200 },
    );
  }

  try {
    const response = await fetch(feedUrl, {
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      return NextResponse.json(
        { items: [], error: `behold_${response.status}` },
        { status: 200 },
      );
    }

    const data = await response.json();
    const items = Array.isArray(data?.posts) ? data.posts : [];

    const normalized = items
      .map((item: BeholdPost, index: number) => {
        const imageUrl = getImageUrl(item);
        return {
          id: item.id ?? String(index),
          caption: item.prunedCaption ?? item.caption ?? '',
          image: imageUrl ?? '',
          link: item.permalink ?? '',
          type: item.mediaType ?? 'IMAGE',
          timestamp: item.timestamp ?? '',
        };
      })
      .filter((item: { image: string }) => Boolean(item.image))
      .slice(0, LIMIT);

    return NextResponse.json(
      { items: normalized },
      {
        status: 200,
        headers: {
          'Cache-Control': `s-maxage=${REVALIDATE_SECONDS}, stale-while-revalidate=86400`,
        },
      },
    );
  } catch (error) {
    return NextResponse.json(
      { items: [], error: 'fetch_failed' },
      { status: 200 },
    );
  }
}
