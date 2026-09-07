"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { practices, site } from "@/lib/content";

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "sent" }
  | { state: "error"; message: string };

const SUBJECTS = [
  "General enquiry",
  ...practices.map((practice) => practice.title),
  "Startup Advisory",
];

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const nextErrors: Record<string, string> = {};
    if (!data.name?.trim()) nextErrors.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email ?? ""))
      nextErrors.email = "Please enter a valid email address.";
    if ((data.message ?? "").trim().length < 12)
      nextErrors.message = "Please describe your requirement briefly.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setStatus({ state: "sending" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = (await response.json()) as { message?: string };

      if (!response.ok) {
        setStatus({
          state: "error",
          message:
            body.message ??
            `We could not send that just now. Please write to ${site.email}.`,
        });
        return;
      }

      form.reset();
      setStatus({ state: "sent" });
    } catch {
      setStatus({
        state: "error",
        message: `We could not reach the server. Please write to ${site.email}.`,
      });
    }
  }

  const sending = status.state === "sending";

  return (
    <form onSubmit={onSubmit} noValidate className="enquiry">
      <div className="enquiry__grid">
        <Field
          name="name"
          label="Name"
          placeholder="Full name"
          error={errors.name}
          required
        />
        <Field
          name="organisation"
          label="Organisation"
          placeholder="Company or firm (optional)"
        />
        <Field
          name="email"
          label="Email"
          type="email"
          placeholder="you@company.com"
          error={errors.email}
          required
        />
        <Field name="phone" label="Phone" type="tel" placeholder="Optional" />
      </div>

      <div className="field" style={{ marginTop: 26 }}>
        <label className="field__label" htmlFor="subject">
          Area of interest
        </label>
        <select id="subject" name="subject" defaultValue={SUBJECTS[0]}>
          {SUBJECTS.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>

      <div className="field" style={{ marginTop: 26 }}>
        <label className="field__label" htmlFor="message">
          Your requirement <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="A short description of the matter you would like to discuss."
          aria-invalid={Boolean(errors.message)}
        />
        {errors.message ? (
          <span className="field__error">{errors.message}</span>
        ) : null}
      </div>

      {/* Honeypot — real people never see or fill this. */}
      <div aria-hidden="true" className="sr-only">
        <label htmlFor="company-website">Leave this field empty</label>
        <input id="company-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="enquiry__foot">
        <button type="submit" className="btn" disabled={sending}>
          {sending ? "Sending…" : "Send enquiry"}
        </button>

        <p className="enquiry__note">
          Sending an enquiry does not create an attorney–client relationship. Please
          do not include confidential information in this message.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {status.state === "sent" ? (
          <motion.p
            key="sent"
            className="enquiry__result"
            role="status"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            Thank you — your enquiry has been received. We will revert to the
            address you provided.
          </motion.p>
        ) : null}

        {status.state === "error" ? (
          <motion.p
            key="error"
            className="enquiry__result"
            data-error="true"
            role="alert"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {status.message}{" "}
            <a
              href={`mailto:${site.email}`}
              style={{ textDecoration: "underline", textUnderlineOffset: 4 }}
            >
              {site.email}
            </a>
          </motion.p>
        ) : null}
      </AnimatePresence>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  placeholder,
  error,
  required,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <div className="field">
      <label className="field__label" htmlFor={name}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        autoComplete={
          name === "name"
            ? "name"
            : name === "email"
              ? "email"
              : name === "phone"
                ? "tel"
                : name === "organisation"
                  ? "organization"
                  : "off"
        }
      />
      {error ? <span className="field__error">{error}</span> : null}
    </div>
  );
}
