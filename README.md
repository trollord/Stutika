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
  page.tsx              home — eight numbered bands, 01…08
  about/                the firm, principles, why Obiter
  practice-areas/       all eight practices in full
  startup-advisory/
  industries/
  founder/
  contact/              enquiry form
  disclaimer/           Bar Council of India notice as a standalone page
  privacy-policy/       }  both render components/LegalDoc.tsx
  terms-and-conditions/ }  with a sticky clause index
  api/contact/route.ts  enquiry handler
  icon.svg              favicon
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
```

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

The text is reproduced verbatim from the supplied Word documents.

> **Unresolved: which domain is correct?**
> The Privacy Policy and Terms & Conditions refer to `www.obiterlegal.in` and
> `stutika@obiterlegal.in`. The main website content document uses
> `stutika@obiterlegal.com`, which is what `site.email` holds and what the
> contact page and footer show. Both currently appear on the site.
> To settle it, change `legalContactEmail` in `lib/content.ts` and the two
> `www.obiterlegal.in` mentions in the `intro` arrays just below it (or change
> `site.email` instead, if `.in` is the right one).

## Enquiry form — needs configuring before launch

`app/api/contact/route.ts` sends enquiries through [Resend](https://resend.com).
**Until the environment variables below are set, the form returns a 503 and tells
the visitor to email the firm directly** — it does not silently drop enquiries.

Create `.env.local`:

```
RESEND_API_KEY=re_...
CONTACT_FROM="Obiter Legal <website@obiterlegal.com>"   # must be a verified sender
CONTACT_TO=stutika@obiterlegal.com                      # optional, defaults to the address in content.ts
```

The route validates input, caps field lengths, and drops bot submissions via a
honeypot field.

To use a different provider, replace the `fetch` call in that file — nothing
else depends on Resend.

## Before going live

- [ ] Set `site.url` in `lib/content.ts` to the production domain (it feeds
      `metadataBase`, the sitemap and `robots.txt`).
- [ ] Resolve the `obiterlegal.in` / `obiterlegal.com` conflict described above.
- [ ] Configure the enquiry form environment variables above.
- [ ] Replace the `SR` monogram plate on the home and founder pages with a
      photograph of Stutika Rathi if one becomes available
      (`components/Plate.tsx`, `variant="monogram"`).
