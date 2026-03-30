import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

const typeToRoutes: Record<string, string[]> = {
  siteSettings: ["/"],
  location: ["/", "/locations"],
  homePage: ["/"],
  aboutPage: ["/about"],
  contactPage: ["/contact"],
  cateringPage: ["/catering"],
  legalPage: ["/terms-of-service", "/privacy-policy"],
  cateringPolaroid: ["/catering"],
  cateringFeature: ["/catering"],
  cateringMediaItem: ["/catering"],
};

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

    const routes = typeToRoutes[body._type] ?? ["/"];

    for (const route of routes) {
      revalidatePath(route);
    }

    if (body._type === "siteSettings") {
      revalidatePath("/", "layout");
    }

    return NextResponse.json({
      revalidated: true,
      routes,
      now: Date.now(),
    });
  } catch {
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
  }
}
