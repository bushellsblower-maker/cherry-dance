# Cherry Dance

Marketing site for **Cherry Dance** (Eastbourne dance & fitness studios) and the cabaret spin-off **Cabaret Cerises**.

- Preview: https://cherry.cybush.uk
- Brand source: https://www.cherry-dance.com
- Tickets: https://cabaretcerises.onlineticketseller.com/
- Booking (link out): https://goteamup.com/p/2104075-cherry-dance/c/schedule
- Shop (Clothing Kings): https://www.theclothingkings.co.uk/category/partnerships/cherry-dance/

Stack matches the sibling Workers (`eastbourne`, `clacton-on-sea`): TanStack Start, React, Tailwind, Vite, Cloudflare Worker `cherry`.

Public copy is seeded from [`docs/research-pack.json`](docs/research-pack.json) and [`docs/redesign-brief.md`](docs/redesign-brief.md). The app does not invent classes, ticket prices, dates, or venues. Shop checkout is Clothing Kings (ex VAT), not the outdated Wix `/shop` tiles.

## Local run

```bash
npm ci
npm run dev
```

Dev server: http://localhost:8080

```bash
npm run build
```

## Demo CMS (`/admin`)

`/admin` edits hero text, timetable notes, performances, socials, CTA URLs, and contact details.

- Banner on the page: **Demo CMS — no authentication yet**.
- Seed: `src/data/site-content.json` (from the research pack).
- Production persistence: Cloudflare KV binding `SITE_CONTENT` (see `wrangler.jsonc`).
- Local `vite dev` has no Workers KV, so saves stay in memory for that process.

Do not treat `/admin` as safe for the owner until auth is in place.

## Go live

Owner support, domain cutover, KV, backups, and the performance-list workflow are in [`docs/GO_LIVE.md`](docs/GO_LIVE.md). There is also an in-app summary at `/go-live`.

## Deploy

Cloudflare account `f027194dcc0be7e3812e673468bab58d`, zone `cybush.uk`.

```bash
npm run deploy
```

That runs `vite build` then `wrangler deploy --config dist/server/wrangler.json`.

| Field | Value |
| --- | --- |
| Worker name | `cherry` |
| Account | `f027194dcc0be7e3812e673468bab58d` |
| Route | `cherry.cybush.uk/*` |
| Zone | `cybush.uk` |
| KV | `SITE_CONTENT` → `cherry-site-content` |
