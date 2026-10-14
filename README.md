# botlane.io

Marketing site for BotLane, a managed AI automation partner. We design, run and maintain AI workflows inside the tools a business already uses, and nothing goes out until a person approves it.

Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Radix primitives and GSAP (home hero only).

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
npm test         # unit tests (Vitest)
npm start & npm run smoke   # every page, 404s and old-URL redirects
```

## Deploy (Cloudflare Workers)

Built with [OpenNext](https://opennext.js.org/cloudflare). Workers Builds settings:

| Setting | Value |
| --- | --- |
| Build command | `npx opennextjs-cloudflare build` |
| Deploy command | `npx wrangler deploy` |
| Non-production / preview command | `npx wrangler versions upload` |

`npm run preview` runs the Worker locally; `npm run deploy` builds and deploys from your machine.

Next.js is pinned to 16.3.8 and `cacheComponents` is off: Next 16.4 and Cache Components both break the Worker on OpenNext 1.20.10. Check the OpenNext release notes before upgrading.

## Where things live

| Path | What it is |
| --- | --- |
| `src/app/globals.css` | Design tokens (colours, fonts, 8px buttons, gutters) and shared classes |
| `src/app/(site)/` | Marketing pages: home, solutions (+ 5 detail pages), how it works, pricing, safeguards, about, legal |
| `src/app/(focus)/` | Conversion pages without the main nav: `/book`, `/assessment` |
| `src/content/` | **All page copy.** `solutions.ts`, `process.ts`, `safeguards.ts`, `site.ts` (nav, footer) |
| `src/components/hero/` | The home hero. `home-hero.tsx` is the markup; `hero-stage.tsx` runs the scroll animation |
| `src/components/illustrations/` | Small product-card illustrations used across pages (all marked "Example") |
| `src/lib/contact.ts` | WhatsApp, email and booking links from env vars (hidden when unset) |
| `src/lib/inquiry.ts` | Assessment form validation, spam checks and delivery |
| `docs/plans/` | The implementation plan for this version |

## How the hero works

The hero lives in a fixed 1200 × 900 stage scaled to the screen. On desktops (1024px and wider, motion allowed) the section is 300vh tall with a sticky inner panel, and a GSAP ScrollTrigger timeline scrubbed to scroll flies the four cards from their scattered start positions into the BotLane window. Phones, tablets and `prefers-reduced-motion` get the finished window as a static picture.

## Settings (env vars)

| Variable | Used for |
| --- | --- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp buttons (digits, with country code). Hidden when empty |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Email link in the footer and on conversion pages. Hidden when empty |
| `NEXT_PUBLIC_DEMO_CALENDAR_URL` | Booking page embedded on `/book` (https). Without it, `/book` points to the assessment form |
| `INQUIRY_WEBHOOK_URL`, `INQUIRY_WEBHOOK_SECRET` | Where assessment requests are posted (full JSON) |
| `PARTNER_SHEET_WEBHOOK_URL`, `PARTNER_SHEET_SECRET` | Fallback: requests go to the existing Google Sheet (see `integrations/google-sheets`) |

`NEXT_PUBLIC_*` values are built into the pages, so set them in the build environment and rebuild after changing them.
