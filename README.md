# botlane.io

Marketing site for BotLane: Lane, the AI hire that runs client reporting, lead follow-up and invoice follow-up while you approve.

Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4 and anime.js 4.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
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
| `src/app/page.tsx` | The homepage: header, hero, scroll board, three systems, footer |
| `src/app/globals.css` | Colour tokens (white, near-black, Lane red) and Tailwind theme |
| `src/components/assemble/` | The scroll-to-assemble hero board |
| `src/components/assemble/data.ts` | All board copy: tools, runs, approvals, captions. **Edit content here** |
| `src/components/assemble/assemble-scene.tsx` | The board markup (server-rendered, no JS) |
| `src/components/assemble/timeline.ts` | The animation: one anime.js timeline seeked by scroll |
| `src/components/assemble/assemble-controller.tsx` | Client wrapper: lazy-loads anime.js when the board nears the viewport |
| `src/components/partners/` | Partner programme: modal, form and the server action that writes to Google Sheets |
| `src/app/@modal/`, `src/app/partners/` | `/partners` opens as a modal from inside the site and as a full page from a direct link |

## How the board works

The board lives in a fixed 1240 × 600 coordinate space and is scaled to fit the screen. Every animated piece carries a `data-*` attribute; `timeline.ts` finds them and builds a single timeline (0 → 2900). Scroll position inside the tall stage seeks that timeline, so motion is smooth in both directions and never re-renders React.

The story: pieces assemble → **01 Client reporting** (a funnel: four sources into one report) → **02 Lead follow-up** (a line: one lead, a run of touches) → **03 Invoice follow-up** (a loop: reminders until it's paid) → the three shapes side by side. Lane and You stay fixed throughout; each system stops at an approval moment.

Respects `prefers-reduced-motion` (shows the final frame).

## Partner programme form

Applications go to the "BotLane Partner Applications" Google Sheet. Setup: [`integrations/google-sheets/README.md`](integrations/google-sheets/README.md). Needs `PARTNER_SHEET_WEBHOOK_URL` and `PARTNER_SHEET_SECRET` set as Cloudflare secrets.

## To do

- Replace placeholder tool icons with official logo files in `public/logos/` (follow each brand's guidelines)
- Swap placeholder names, numbers and tools in `data.ts` for real ones
- Mobile layout for the board (it currently scales down)
- Pages for each system and pricing
