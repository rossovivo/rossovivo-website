import { createHash } from "node:crypto";
import axios from "axios";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID!;
const ACCESS_TOKEN = process.env.META_CONVERSIONS_API_TOKEN!;
const API_VERSION = "v21.0";
const ENDPOINT = `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events`;

function sha256(value: string) {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

type UserData = {
  ip?: string | null;
  userAgent?: string | null;
  fbp?: string | null;
  fbc?: string | null;
  phone?: string | null;
};

type ConversionEvent = {
  eventName: string;
  eventId: string;
  sourceUrl: string;
  userData: UserData;
  customData?: Record<string, unknown>;
};

function buildUserDataPayload(userData: UserData) {
  const payload: Record<string, string> = {};

  if (userData.ip) payload.client_ip_address = userData.ip;
  if (userData.userAgent) payload.client_user_agent = userData.userAgent;
  if (userData.fbp) payload.fbp = userData.fbp;
  if (userData.fbc) payload.fbc = userData.fbc;
  if (userData.phone) payload.ph = sha256(userData.phone.replace(/\D/g, ""));

  return payload;
}

export async function sendConversionEvent({
  eventName,
  eventId,
  sourceUrl,
  userData,
  customData,
}: ConversionEvent) {
  if (!ACCESS_TOKEN || !PIXEL_ID) return;

  const eventPayload = {
    event_name: eventName,
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventId,
    event_source_url: sourceUrl,
    action_source: "website",
    user_data: buildUserDataPayload(userData),
    ...(customData && { custom_data: customData }),
  };

  try {
    await axios.post(ENDPOINT, {
      data: [eventPayload],
      access_token: ACCESS_TOKEN,
    });
  } catch (error) {
    console.error("[Meta CAPI]", error instanceof Error ? error.message : error);
  }
}

export function extractMetaCookies(cookieHeader: string | null) {
  if (!cookieHeader) return { fbp: null, fbc: null };

  const fbpMatch = cookieHeader.match(/_fbp=([^;]+)/);
  const fbcMatch = cookieHeader.match(/_fbc=([^;]+)/);

  return {
    fbp: fbpMatch?.[1] ?? null,
    fbc: fbcMatch?.[1] ?? null,
  };
}

export function getClientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    null
  );
}
