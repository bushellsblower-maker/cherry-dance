# Go live — Cherry Dance + Cabaret Cerises

This Worker preview is meant to sit at **https://cherry.cybush.uk**. It is not yet an owner-supportable CMS. Use this checklist before treating it as the public site or handing `/admin` to Cheryl / the studio.

## What is already true

- Public copy is seeded from `docs/research-pack.json` and cherry-dance.com (and the pack’s linked sources).
- Booking, shop, and tickets are **link-outs** to TeamUp, the Wix shop, and Online Ticket Seller / venue pages.
- `/admin` edits the same content model the homepage reads.
- `SITE_CONTENT` KV (`cherry-site-content`, id `108b76dd196c4a1793bc4f22f269f0f9`) is bound in `wrangler.jsonc`. Until that binding is live on the deployed Worker, saves fall back to isolate memory.
- There is **no login**. Anyone who can open `/admin` can rewrite the site.

## 1. Authentication

Do this before the first non-demo edit.

Options, in roughly increasing effort:

1. **Cloudflare Access** on `cherry.cybush.uk/admin*` (and `/go-live` if you want it private). Fastest: one Access application, email OTP or Google, no app code.
2. **Workers + Better Auth / magic link** (the Eastbourne/Clacton template already ships this pattern). Requires a session store and an email sender.
3. **Shared password** via a Worker secret and a cookie. Fine for one owner; weak if the password is reused or shared widely.

Hurdles:

- Access needs the `cybush.uk` zone and a list of allowed emails.
- App-level auth needs a callback URL on the final hostname, plus CSRF on server functions.
- Do not “just hide” `/admin` by omitting the nav link.

## 2. Who can edit, and an audit trail

Decide:

- One owner (Cheryl / studio manager) vs a small set of editors.
- Whether cabaret dates can be edited by the same person as class notes.

Add, before shared use:

- An editor identity on every save (Access JWT email, or Better Auth user).
- A write log: timestamp, editor, summary of fields changed. KV list keys (`site-content:log:<iso>`) or a D1 `content_revisions` table are enough.
- A “revert to previous JSON” control in `/admin`.

Without this, two people will overwrite each other and nobody can prove what went live.

## 3. Bind KV / D1 for persistence

Current design:

| Layer | Role |
| --- | --- |
| `src/data/site-content.json` | Seed / reset target (git-versioned) |
| Cloudflare KV `SITE_CONTENT` | Live override after Save |
| In-memory global | Local `vite dev` (no `cloudflare:workers` env) |

Go-live steps:

1. Confirm the Worker `cherry` in account `f027194dcc0be7e3812e673468bab58d` has the `SITE_CONTENT` binding.
2. Deploy with `npm run deploy` (builds, then `wrangler deploy --config dist/server/wrangler.json`).
3. Open `/admin`, Save once, reload the homepage in a new session. If the edit vanished, the binding is missing on that environment.
4. Optional: move the same JSON into D1 if you want SQL revisions and multi-row performance records.

Do not treat the repo JSON as the production store. Deploys would clobber owner edits unless you stop seeding over KV.

## 4. Domain cutover vs preview

Two viable setups:

**A. Keep cherry.cybush.uk as preview**

- Leave https://www.cherry-dance.com on Wix as the public brand site.
- Use this Worker for experiments, CMS rehearsal, and cabaret date surfacing.
- Point studio staff at the preview only after Access is on.

**B. Cut cherry-dance.com over to this Worker**

- Add a custom domain / route on the `cherry` Worker for `cherry-dance.com` and `www`.
- Lower Wix DNS (or proxy) only after redirects for `/shop`, existing booking links, and any indexed paths are mapped.
- Keep a long overlap: Wix stays the shop host even if the marketing homepage moves.

Hurdles:

- Wix owns email-looking paths, shop checkout, and current SEO.
- Cabaret already has `cabaretcerises.wixsite.com` and Online Ticket Seller. Do not invent a third ticket shop.
- SSL and apex/www redirects need a zone you control. If cherry-dance.com stays at Wix, this app should not claim it.

## 5. Systems of record (do not fork)

| Concern | System of record | This site |
| --- | --- | --- |
| Class booking | TeamUp / GoTeamUp | Link to schedule |
| Uniform / merch checkout | Wix shop | Link to `/shop` |
| Cabaret tickets | Online Ticket Seller + venue pages | Per-show ticket URL |
| Private classes | Email | `mailto:` only |

If TeamUp times change, update the timetable **and** send people to TeamUp. Never take card payments here.

## 6. Images and CDN

The first ship is illustration-led (SVG cherries, CSS sparkle). That avoids inventing photos of the studio.

When you add real images:

- Store files in **R2** (or Cloudflare Images), not git.
- Serve via the Worker or Images delivery URL.
- Need consent from instructors / students before publishing identifiable photos.
- Add alt text and a credit field to the CMS model.

Hurdle: `/admin` has no upload control yet. Adding `multipart` to a Worker without auth is unsafe.

## 7. GDPR and contact forms

There is **no contact form** in this version (phone, email, and maps links only). That is intentional.

If you add a form later:

- Collect a purpose statement and a tick-box (not a pre-ticked box).
- Send to a mailbox the studio actually reads; do not log bodies in KV forever.
- Publish a short privacy notice (who, why, how long, how to ask for deletion).
- Prefer Cloudflare Turnstile over a raw inbox honeypot.

Until then, `mailto:` and the published phone number keep personal data off this Worker.

## 8. Backups and rollback

- **Git** backs up seed JSON and code.
- **KV** holds the live document. Export it: `wrangler kv key get site-content --namespace-id 108b76dd196c4a1793bc4f22f269f0f9`.
- After every important edit, download the Raw JSON from `/admin` and keep a dated copy.
- Rollback: paste a previous JSON into a reset path, or `wrangler kv key put` the last good blob.
- Worker rollback: Cloudflare dashboard → Workers → `cherry` → deployments.

Hurdle: KV has no built-in point-in-time UI. If this becomes daily-edited, move revisions to D1.

## 9. Performance list workflow

Recommended rhythm:

1. After a show night, set that row to **passed** (keep the real venue URL).
2. When Online Ticket Seller lists the next Grove date, set it **upcoming** and paste the exact ticket URL.
3. Keep 2027 Grove Fridays as **scheduled** until a public listing exists — do not invent times or titles.
4. Mark **18+** only where the venue or Cabaret Cerises copy says so. The troupe is adult-only; that is already stated in the cabaret block.
5. Source of truth for “is this still on sale?” is the ticket URL, not this CMS.

Do not scrape Hippodrome / Grove pages from the Worker without permission. A human paste into `/admin` is the supportable workflow.

## Deploy reminder

```bash
npm ci
npm run build
npm run deploy
```

Worker: `cherry`  
Route: `cherry.cybush.uk/*`  
Zone: `cybush.uk`  
Account: `f027194dcc0be7e3812e673468bab58d`
