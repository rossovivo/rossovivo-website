import { redirect } from "next/navigation";

type SegmentPageProps = {
  params: Promise<{
    segment: string;
  }>;
};

export default async function CateringSegmentPage({ params }: SegmentPageProps) {
  await params;
  redirect("/catering");
}
