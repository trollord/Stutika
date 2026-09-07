import { site } from "@/lib/content";
import { isMailConfigured, sendEnquiryEmail } from "@/lib/mailer";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  organisation?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  /** Honeypot. Anything here means a bot filled the form. */
  website?: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Small in-memory rate limit, per warm serverless instance.
const hits = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now - rec.ts > WINDOW_MS) {
    hits.set(ip, { count: 1, ts: now });
    return false;
  }
  rec.count += 1;
  return rec.count > MAX_PER_WINDOW;
}

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return Response.json(
      { message: "Too many enquiries just now. Please try again shortly." },
      { status: 429 },
    );
  }

  let payload: Payload;
  try {
    payload = (await request.json()) as Payload;
  } catch {
    return Response.json({ message: "Malformed request." }, { status: 400 });
  }

  // Silently accept anything a bot submits so it gets no signal either way.
  if (clean(payload.website, 200)) {
    return Response.json({ ok: true });
  }

  const enquiry = {
    name: clean(payload.name, 120),
    organisation: clean(payload.organisation, 160),
    email: clean(payload.email, 160),
    phone: clean(payload.phone, 40),
    subject: clean(payload.subject, 120) || "General enquiry",
    message: clean(payload.message, 4000),
  };

  if (!enquiry.name || !EMAIL.test(enquiry.email) || enquiry.message.length < 12) {
    return Response.json(
      { message: "Please complete the required fields." },
      { status: 422 },
    );
  }

  // Not yet wired to a mailbox: say so plainly rather than pretending the
  // enquiry was delivered.
  if (!isMailConfigured()) {
    console.warn(
      "[contact] SMTP_HOST / SMTP_USER / SMTP_PASS are not set — enquiry not delivered.",
      { subject: enquiry.subject, email: enquiry.email },
    );
    return Response.json(
      {
        message: `The enquiry form is not connected yet. Please write to ${site.email} directly.`,
      },
      { status: 503 },
    );
  }

  try {
    await sendEnquiryEmail(enquiry);
  } catch (error) {
    console.error("[contact] delivery failed", error);
    return Response.json(
      { message: `We could not send that just now. Please write to ${site.email}.` },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
