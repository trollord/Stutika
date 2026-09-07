import nodemailer, { type Transporter } from "nodemailer";

import { site } from "@/lib/content";

/**
 * The mailer needs three things and nothing else:
 *
 *   MAIL_USER  the sending address, which is also the SMTP login
 *   MAIL_PASS  its app password
 *   MAIL_TO    where enquiries should land
 *
 * Everything else is derived. Gmail and Google Workspace — including custom
 * domains like obiterlegal.in — both go through smtp.gmail.com, so the host is
 * inferred rather than configured. MAIL_HOST and MAIL_PORT exist only as an
 * escape hatch if the mailbox ever moves to another provider.
 */

let cached: Transporter | null = null;

export function isMailConfigured() {
  return Boolean(process.env.MAIL_USER && process.env.MAIL_PASS);
}

export function getTransport(): Transporter {
  if (cached) return cached;

  const user = process.env.MAIL_USER;
  const pass = process.env.MAIL_PASS;

  if (!user || !pass) {
    throw new Error(
      "Mail is not configured. Set MAIL_USER and MAIL_PASS in your environment.",
    );
  }

  const host = process.env.MAIL_HOST ?? "smtp.gmail.com";
  const port = Number(process.env.MAIL_PORT ?? 587);

  cached = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  return cached;
}

export type Enquiry = {
  name: string;
  organisation?: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
};

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[c] as string,
  );
}

export async function sendEnquiryEmail(enquiry: Enquiry) {
  const transport = getTransport();
  const to = process.env.MAIL_TO || site.email;
  const from = process.env.MAIL_USER;
  const receivedAt = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });

  const rows: [string, string][] = [
    ["Name", enquiry.name],
    ["Organisation", enquiry.organisation || "—"],
    ["Email", enquiry.email],
    ["Phone", enquiry.phone || "—"],
    ["Area of interest", enquiry.subject],
    ["Received", `${receivedAt} IST`],
  ];

  // Monochrome to match the site.
  const html = `
  <div style="font-family:Helvetica,Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #dcdcd8">
    <div style="background:#1a1a19;padding:22px 26px">
      <div style="color:#a7a7a2;letter-spacing:3px;font-size:11px;text-transform:uppercase">Obiter Legal — Website Enquiry</div>
      <div style="color:#ececea;font-size:17px;margin-top:6px">${escapeHtml(enquiry.subject)}</div>
    </div>
    <table style="width:100%;border-collapse:collapse">
      ${rows
        .map(
          ([k, v], i) => `
        <tr style="background:${i % 2 ? "#f5f5f3" : "#ffffff"}">
          <td style="padding:11px 26px;color:#8d8d88;font-size:12px;width:160px;vertical-align:top">${k}</td>
          <td style="padding:11px 26px;color:#1a1a19;font-size:14px">${escapeHtml(v)}</td>
        </tr>`,
        )
        .join("")}
    </table>
    <div style="padding:22px 26px;border-top:1px solid #dcdcd8">
      <div style="color:#8d8d88;letter-spacing:2px;font-size:11px;text-transform:uppercase;margin-bottom:10px">Requirement</div>
      <div style="color:#1a1a19;font-size:14px;line-height:1.75;white-space:pre-wrap">${escapeHtml(enquiry.message)}</div>
    </div>
    <div style="padding:14px 26px;background:#f5f5f3;color:#8d8d88;font-size:11px;line-height:1.7">
      Sent from the enquiry form at ${site.url}. Reply directly to reach the sender.
    </div>
  </div>`;

  await transport.sendMail({
    from: `"Obiter Legal Website" <${from}>`,
    to,
    replyTo: enquiry.email,
    subject: `Website enquiry — ${enquiry.subject} — ${enquiry.name}`,
    text: [
      ...rows.map(([k, v]) => `${k}: ${v}`),
      "",
      enquiry.message,
    ].join("\n"),
    html,
  });
}
