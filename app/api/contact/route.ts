import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { getPostHogClient } from "@/lib/posthog-server";

const contactSchema = z.object({
  segmentName: z.string().trim().min(1).max(120),
  name: z.string().trim().min(1).max(120),
  phone: z.string().trim().min(5).max(60),
  address: z.string().trim().min(3).max(300),
  partySize: z.coerce.number().int().min(1).max(5000),
  date: z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/),
  eventType: z.string().trim().min(1).max(120),
  availableSpace: z.string().trim().min(1).max(120),
  setupPreference: z.string().trim().min(1).max(120),
  notes: z.string().trim().max(4000).optional(),
});

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const formatEventDate = (dateValue: string) => {
  const parsed = new Date(`${dateValue}T00:00:00`);

  if (Number.isNaN(parsed.getTime())) {
    return dateValue;
  }

  return new Intl.DateTimeFormat("en-GB", { dateStyle: "full" }).format(parsed);
};

const buildEmailText = (payload: z.infer<typeof contactSchema>) => {
  const submittedAt = new Date().toISOString();

  return [
    "New website enquiry",
    "",
    `Segment: ${payload.segmentName}`,
    `Name: ${payload.name}`,
    `Phone: ${payload.phone}`,
    `Address: ${payload.address}`,
    `Party size: ${payload.partySize}`,
    `Date: ${payload.date}`,
    `Event type: ${payload.eventType}`,
    `Available space: ${payload.availableSpace}`,
    `Setup preference: ${payload.setupPreference}`,
    `Notes: ${payload.notes || "-"}`,
    "",
    `Submitted at: ${submittedAt}`,
  ].join("\n");
};

const buildEmailHtml = (payload: z.infer<typeof contactSchema>) => {
  const submittedAt = new Date().toISOString();
  const eventDate = formatEventDate(payload.date);
  const details: Array<[string, string]> = [
    ["Segment", payload.segmentName],
    ["Name", payload.name],
    ["Phone", payload.phone],
    ["Address", payload.address],
    ["Party size", String(payload.partySize)],
    ["Event date", eventDate],
    ["Event type", payload.eventType],
    ["Available space", payload.availableSpace],
    ["Setup preference", payload.setupPreference],
    ["Submitted at", submittedAt],
  ];

  const rowHtml = details
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:12px 0 12px 0;border-bottom:1px solid #E8DFD3;width:34%;font-size:13px;font-weight:700;letter-spacing:0.3px;color:#4F4F55;vertical-align:top;">
            ${escapeHtml(label)}
          </td>
          <td style="padding:12px 0 12px 14px;border-bottom:1px solid #E8DFD3;font-size:14px;line-height:1.5;color:#1E1E20;vertical-align:top;">
            ${escapeHtml(value)}
          </td>
        </tr>`,
    )
    .join("");

  const notes = payload.notes?.trim() || "-";
  const notesHtml = escapeHtml(notes).replaceAll("\n", "<br />");

  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:#F7F2EA;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#F7F2EA;padding:28px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:680px;background:#FFFFFF;border:1px solid #E8DFD3;border-radius:18px;overflow:hidden;">
            <tr>
              <td style="padding:28px 30px;background:#2F2F31;">
                <p style="margin:0 0 8px 0;color:#F7F2EA;font-size:11px;letter-spacing:1.6px;text-transform:uppercase;">Rossovivo</p>
                <h1 style="margin:0;color:#FFFFFF;font-size:24px;line-height:1.3;font-weight:700;">New website enquiry</h1>
                <p style="margin:10px 0 0 0;color:#F2E9DC;font-size:14px;line-height:1.6;">A new lead was submitted from the contact/catering form.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:26px 30px 8px 30px;">
                <span style="display:inline-block;background:#C83D25;color:#FFFFFF;border-radius:999px;padding:7px 12px;font-size:12px;font-weight:700;letter-spacing:0.2px;">
                  ${escapeHtml(payload.segmentName)} enquiry
                </span>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 30px 6px 30px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                  ${rowHtml}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 30px 30px 30px;">
                <p style="margin:0 0 8px 0;font-size:13px;font-weight:700;letter-spacing:0.3px;color:#4F4F55;">Additional notes</p>
                <div style="background:#FBF8F2;border:1px solid #E8DFD3;border-radius:12px;padding:14px 15px;color:#1E1E20;font-size:14px;line-height:1.6;">
                  ${notesHtml}
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
};

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const toEmailList = (process.env.RESEND_TO_EMAIL || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  if (!apiKey || !fromEmail || toEmailList.length === 0) {
    return NextResponse.json(
      { success: false, error: "missing_resend_env" },
      { status: 500 },
    );
  }

  let parsedBody: unknown;

  try {
    parsedBody = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "invalid_json" },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(parsedBody);

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: "invalid_payload" },
      { status: 400 },
    );
  }

  const resend = new Resend(apiKey);
  const payload = parsed.data;
  const subject = `New ${payload.segmentName} enquiry from ${payload.name}`;
  const text = buildEmailText(payload);
  const html = buildEmailHtml(payload);

  const distinctId = request.headers.get("x-posthog-distinct-id") ?? `anon_contact_${Date.now()}`;

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: toEmailList,
      subject,
      text,
      html,
    });

    if (error) {
      const posthog = getPostHogClient();
      posthog.capture({
        distinctId,
        event: "contact_enquiry_failed",
        properties: {
          segment_name: payload.segmentName,
          event_type: payload.eventType,
          available_space: payload.availableSpace,
          setup_preference: payload.setupPreference,
          party_size: payload.partySize,
          reason: "email_send_failed",
        },
      });
      await posthog.shutdown();
      return NextResponse.json(
        { success: false, error: "email_send_failed" },
        { status: 502 },
      );
    }

    const posthog = getPostHogClient();
    posthog.capture({
      distinctId,
      event: "contact_enquiry_submitted",
      properties: {
        segment_name: payload.segmentName,
        event_type: payload.eventType,
        available_space: payload.availableSpace,
        setup_preference: payload.setupPreference,
        party_size: payload.partySize,
        email_id: data?.id ?? null,
      },
    });
    await posthog.shutdown();

    return NextResponse.json(
      { success: true, id: data?.id ?? null },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "email_send_failed" },
      { status: 502 },
    );
  }
}
