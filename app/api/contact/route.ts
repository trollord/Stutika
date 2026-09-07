import { site } from "@/lib/content";

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

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
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

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO ?? site.email;
  const from = process.env.CONTACT_FROM;

  // Not yet wired to a mail provider: say so plainly rather than pretending
  // the enquiry was delivered.
  if (!apiKey || !from) {
    console.warn(
      "[contact] RESEND_API_KEY / CONTACT_FROM are not set — enquiry not delivered.",
      { subject: enquiry.subject, email: enquiry.email },
    );
    return Response.json(
      {
        message: `The enquiry form is not connected yet. Please write to ${site.email} directly.`,
      },
      { status: 503 },
    );
  }

  const lines = [
    `Name:         ${enquiry.name}`,
    `Organisation: ${enquiry.organisation || "—"}`,
    `Email:        ${enquiry.email}`,
    `Phone:        ${enquiry.phone || "—"}`,
    `Interest:     ${enquiry.subject}`,
    "",
    enquiry.message,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: enquiry.email,
        subject: `Website enquiry — ${enquiry.subject}`,
        text: lines,
      }),
    });

    if (!response.ok) {
      console.error("[contact] provider rejected the message", {
        status: response.status,
        body: await response.text(),
      });
      return Response.json(
        {
          message: `We could not send that just now. Please write to ${site.email}.`,
        },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("[contact] delivery failed", error);
    return Response.json(
      { message: `We could not send that just now. Please write to ${site.email}.` },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
