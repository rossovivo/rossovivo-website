import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

export async function POST(request: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{
      _type: string;
    }>(request, process.env.SANITY_REVALIDATE_SECRET);

    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }

    if (!body?._type) {
      return NextResponse.json({ message: "Bad request" }, { status: 400 });
    }

    const typeToTag: Record<string, string> = {
      siteSettings: "siteSettings",
      location: "location",
      homePage: "homePage",
      aboutPage: "aboutPage",
      contactPage: "contactPage",
      cateringPage: "cateringPage",
      legalPage: "legalPage",
      cateringPolaroid: "cateringPage",
      cateringFeature: "cateringPage",
      cateringMediaItem: "cateringPage",
    };

    const tag = typeToTag[body._type];

    if (tag) {
      revalidateTag(tag);
    }

    revalidateTag("sanity");

    return NextResponse.json({
      revalidated: true,
      tag: tag || "sanity",
      now: Date.now(),
    });
  } catch {
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
  }
}
