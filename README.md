# erv.sg

Static product showcase for DBA Electric Pte. Ltd. (Singapore): ceiling dehumidifiers, fresh-air ceiling dehumidifiers and ERV systems. Astro 5, plain CSS, no client framework.

## Develop

```bash
npm install
npm run dev          # http://localhost:4321  (draft projects and stub articles are visible here)
npm run build        # outputs to dist/       (draft projects and stub articles are excluded)
npm run preview      # serve dist/ locally
npm run placeholders # list every {{PLACEHOLDER}} still to fill in
npm run check:drafts # after a build: confirm no draft project / stub article is in dist/
```

Node 18.20+ (20 or 22 recommended).

## Where things live

| What | Where |
|---|---|
| Company details, contacts, GA4 ID, form endpoint | `src/config/site.ts` |
| Colours, type, spacing (light + dark) | `src/styles/tokens.css` |
| Product family copy | `src/data/families.ts` |
| Spec labels, which specs show per family | `src/data/specs.ts` |
| FAQ (also generates FAQPage schema) | `src/data/faq.ts` |
| Models, applications, projects, articles | `src/content/…` (see `CONTENT_GUIDE.md`) |
| Product photos | `src/assets/products/` |
| Datasheet PDFs | `public/datasheets/` |

## Enquiry form

Forms post to [Web3Forms](https://web3forms.com). Create an access key for the receiving mailbox, then set it as an environment variable:

- Local: copy `.env.example` to `.env` and fill in `PUBLIC_WEB3FORMS_KEY`.
- Render: service → Environment → add `PUBLIC_WEB3FORMS_KEY`, then trigger a new deploy (the key is baked in at build time).

Web3Forms keys are designed to be used in the browser, so it's fine that this key ends up in the built HTML. Until it's set, the form shows a "not connected yet" message pointing people to WhatsApp/email.

**Floor plan upload:** Web3Forms only accepts file attachments on a paid plan. On the free plan, remove the file field from `src/components/EnquiryForm.astro`, or upgrade.

## Analytics

Set `analytics.ga4Id` in `src/config/site.ts`. GA4 only loads once it is set. Events sent:

- `generate_lead`: successful quote or trade form submit (`form`: `quote` / `trade`)
- `form_error`: failed submit
- `whatsapp_click`: any WhatsApp link (`link_location`: `sticky`, `contact`, `datasheet`, `professionals`)

Mark `generate_lead` as a key event in GA4.

## Deploy to Render (static site)

The site is a plain static build, hosted as a Render **static site**, the same way as our other client sites.

### First-time setup

1. Push this folder to its own GitHub repo, `dbasgp/erv-sg`.
2. Render dashboard → New → Static Site → connect `dbasgp/erv-sg`, branch `main`.
3. Settings:
   - Build command: `npm ci && npm run build && npm run check:drafts`
   - Publish directory: `dist`
   - Environment: `PUBLIC_WEB3FORMS_KEY` (see Enquiry form), `NODE_VERSION` = `22`
4. Headers: Render ignores `public/_headers`. Add the same headers under the service's Settings → Headers (or apply `render.yaml` as a Blueprint, which already lists them):

   | Path | Header | Value |
   |---|---|---|
   | `/*` | `X-Content-Type-Options` | `nosniff` |
   | `/*` | `Referrer-Policy` | `strict-origin-when-cross-origin` |
   | `/*` | `X-Frame-Options` | `SAMEORIGIN` |
   | `/*` | `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` |
   | `/_astro/*` | `Cache-Control` | `public, max-age=31536000, immutable` |

5. Redirects: Render also ignores `_redirects` files. Any redirect has to be a route rule on the service (dashboard → Redirects/Rewrites, or `POST /v1/services/{id}/routes`). None are needed today.

The build fails if a draft project or stub article ends up in `dist/` (`check:drafts`).

### Deploying a change

Render's GitHub webhook has been unreliable on our other sites, so don't rely on auto-deploy:

```bash
git push origin main
curl -X POST https://api.render.com/v1/services/<SERVICE_ID>/deploys \
  -H "Authorization: Bearer $RENDER_API_KEY" -H "Content-Type: application/json" -d '{}'
```

Then check the deploy finished in the dashboard (or `GET /v1/services/<SERVICE_ID>/deploys?limit=1`).

### Pointing erv.sg

1. In the Render service → Settings → Custom Domains, add **www.erv.sg** and **erv.sg**. Render shows the `<service>.onrender.com` target and issues certificates once DNS resolves.
2. DNS on Cloudflare (recommended, matches our other domains):
   - `CNAME www → <service>.onrender.com`
   - `CNAME @ → <service>.onrender.com` (Cloudflare flattens the apex CNAME). Don't use Render's apex A record (`216.24.57.1`); point the apex with a CNAME as above.
   - Start with the records **DNS only** (grey cloud) until Render shows both domains verified, then proxy them if wanted.
3. Make www canonical with a Cloudflare Redirect Rule: `erv.sg/*` → `https://www.erv.sg/${1}`, 301, preserve query string. Canonicals, sitemap, robots and Open Graph URLs already use `https://www.erv.sg`.
4. Once it's live, submit `https://www.erv.sg/sitemap-index.xml` in Google Search Console.

## Adding a product

See `CONTENT_GUIDE.md`. In short: add `src/content/products/<slug>.json`, drop photos in `src/assets/products/`, rebuild. The family page, comparison table, professionals downloads table, sitemap and Product schema all update automatically.
