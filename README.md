# Obiter Legal — website

Marketing site for Obiter Legal, a boutique law firm in Ballard Estate, Mumbai.

Built with Next.js 16 (App Router), React 19, Tailwind CSS v4 and Motion.

---

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
npm run lint
```

## How it is put together

```
app/
  layout.tsx            fonts, metadata, header/footer, disclaimer gate
  page.tsx              home — the numbered section bands, 01…08
  about/                the firm, principles, why Obiter
  practice-areas/       every practice in full
  startup-advisory/
  industries/
  founder/
  contact/              enquiry form
  disclaimer/           Bar Council of India notice as a standalone page
  privacy-policy/       }  both render components/LegalDoc.tsx
  terms-and-conditions/ }  with a sticky clause index
  api/contact/route.ts  enquiry handler
  favicon.ico           tab icon, 16/32/48 rendered individually
  icon.png              512px icon
  apple-icon.png        180px home-screen icon
  opengraph-image.tsx   social share card, generated at build time
components/
  Band.tsx              the tonal section shell with its numbered rail
  DisclaimerGate.tsx    entry acknowledgement
  Plate.tsx             the monochrome SVG artwork
  SectionSpy.tsx        the fixed right-hand tick rail
  ...
lib/
  content.ts            ALL site copy, verbatim from the approved document
  hooks.ts              scroll/tone/section-spy hooks
brand/
  obiter-mark.webp          the OL monogram, as supplied — source for the icons
  obiter-logo.png           horizontal lockup used in the header, footer and gate
  obiter-logo-stacked.png   the supplied stacked lockup, for wider slots
```

### The logo

The artwork is dark, so it carries a paper-coloured plate baked into the PNG.
That way it can never land on a black background — over the light bands the
plate disappears into the page, and over the dark bands and the footer it reads
as a paper card. `components/Wordmark.tsx` exports `Logo` (the image) and
`Wordmark` (the same image linked home); both are used in the header, the footer
and the disclaimer gate, and the share card embeds it too.

The supplied lockup stacks the monogram over the wordmark, which leaves the
words illegible at header height. `brand/obiter-logo.png` is therefore a
horizontal arrangement of the same two elements, with the wordmark set to 24% of
the monogram's height. The stacked original is kept alongside it.

### Regenerating the icons

`app/favicon.ico`, `app/icon.png` and `app/apple-icon.png` are all derived from
`brand/obiter-mark.webp`. The mark is cropped to its bounding box, its tonal
range compressed into `#1a1a19`–`#8a8a86` so the pale end of the flourish stays
visible on the paper background, and each tab size is rendered at its own scale
with the alpha firmed up rather than being left to browser downscaling. The ICO
frames must be RGBA — Next's image processor rejects RGB ones.

**All copy lives in `lib/content.ts`.** Edit that file to change any text on the
site; nothing is hard-coded in the page components.

## Design system

A monochrome editorial system defined in `app/globals.css`:

| Token | Value | Use |
| --- | --- | --- |
| `--paper` | `#ececea` | light bands |
| `--paper-hi` | `#f5f5f3` | alternate light band |
| `--slate` | `#3e3e3d` | dark bands |
| `--slate-deep` | `#2b2b2a` | deepest bands, footer |
| `--ink` | `#1a1a19` | primary text on light |
| `--accent` | `#8c2f26` | used sparingly, for marks only |

Nothing on the site is numbered except the section markers in each band's rail
and the numbered clauses of the legal documents. Practice areas, service lines
and sectors are deliberately unnumbered, and the site carries no counts or
statistics.

Type: **Archivo** for uppercase display, **Inter** for text and micro-labels,
**Instrument Serif** for the wordmark and pull statements.

Sections are full-bleed bands that alternate light and dark. Each carries an
oversized ghost numeral, a hairline and a rotated caption in the left rail; a
fixed tick rail on the right tracks position. Header and rail colours follow the
band behind them via `useToneAt`.

## The disclaimer gate

Required by Bar Council of India rules. `components/DisclaimerGate.tsx` blocks
the site until the visitor acknowledges the notice, and remembers the
acknowledgement for the browser session (`sessionStorage`).

An inline script in `app/layout.tsx` stamps `data-gate="done"` on `<html>`
before first paint, so returning visitors never see the panel flash. The same
notice is reproduced in the footer and at `/disclaimer`.

To change the wording, edit `DISCLAIMER` and `DISCLAIMER_PARAGRAPHS` in
`lib/content.ts` — the gate, the footer and the standalone page all read from
there.

## Privacy Policy and Terms & Conditions

Both live in `lib/content.ts` as `privacyPolicy` and `termsAndConditions`, typed
as `LegalDocument` — a list of numbered clauses, each with a lead statement, an
optional dashed list, following paragraphs and an optional contact block. Both
pages render through `components/LegalDoc.tsx`, which pairs the clauses with a
sticky contents index that highlights whatever you are reading.

The text is reproduced verbatim from the supplied Word documents. The whole
site uses the `obiterlegal.in` domain; `legalContactEmail` simply follows
`site.email`, so there is one address to change.

## Enquiry form — needs configuring before launch

`app/api/contact/route.ts` posts the enquiry through `lib/mailer.ts`, which
sends over SMTP with nodemailer from the firm's own mailbox.

**Until the three values below are set the form returns a 503 and tells the
visitor to email the firm directly** — it does not silently drop enquiries.

Copy `.env.example` to `.env.local`:

```
MAIL_USER=stutika@obiterlegal.in   # the sending mailbox, also the SMTP login
MAIL_PASS=                         # its app password
MAIL_TO=stutika@obiterlegal.in     # where enquiries are delivered
```

That is the whole configuration. The host is inferred — Gmail and Google
Workspace, including custom domains, both go through `smtp.gmail.com`. If the
mailbox ever moves to another provider, `MAIL_HOST` and `MAIL_PORT` override it.

For Gmail or Workspace, `MAIL_PASS` must be the 16-character **app password**
generated under the account's security settings with 2FA enabled — the normal
login password will be rejected. The same three variables need setting in the
hosting provider's dashboard for the deployed site.

The route validates input, caps field lengths, drops bot submissions via a
honeypot, and rate limits to five enquiries per minute per IP. Enquiries arrive
as a monochrome HTML email with the sender set as `Reply-To`, so replying goes
straight back to them.

`.env.local` is gitignored; `.env.example` is committed as the template. Never
commit real credentials — this repository is public.

## Before going live

- [ ] Configure the enquiry form environment variables above.
- [ ] Replace the `SRG` monogram plate on the home and founder pages with a
      photograph of Stutika Rathi Gupta once one is supplied
      (`components/Plate.tsx`, `variant="monogram"`).
- [ ] `site.url` is set to `https://obiterlegal.in`; confirm before launch, as it
      feeds `metadataBase`, the sitemap and `robots.txt`.
