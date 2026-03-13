declare global {
  interface Window {
    fbq: ((...args: unknown[]) => void) & {
      callMethod?: (...args: unknown[]) => void;
      queue: unknown[];
      loaded: boolean;
      version: string;
      push: (...args: unknown[]) => void;
    };
    _fbq: typeof window.fbq;
  }
}

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID!;

export function initMetaPixel() {
  if (typeof window === "undefined" || window.fbq) return;

  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) {
      fbq.callMethod(...args);
    } else {
      fbq.queue.push(args);
    }
  } as Window["fbq"];

  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.push = fbq;

  window.fbq = fbq;
  window._fbq = fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  window.fbq("init", PIXEL_ID);
  window.fbq("track", "PageView");
}

export function generateEventId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

export function trackMetaEvent(
  eventName: string,
  params?: Record<string, unknown>,
  eventId?: string,
) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, params, eventId ? { eventID: eventId } : undefined);
  }
}

export function trackMetaCustomEvent(
  eventName: string,
  params?: Record<string, unknown>,
  eventId?: string,
) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("trackCustom", eventName, params, eventId ? { eventID: eventId } : undefined);
  }
}
