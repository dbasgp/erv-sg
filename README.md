# erv.sg

Static product showcase for DBA Electric Pte. Ltd. (Singapore): ceiling dehumidifiers, fresh-air ceiling dehumidifiers and ERV systems. Astro 5, plain CSS, no client framework.

## Develop

```bash
npm install
npm run dev          # http://localhost:4321  (draft projects are visible here)
npm run build        # outputs to dist/       (draft projects are excluded)
npm run preview      # serve dist/ locally
npm run placeholders # list every {{PLACEHOLDER}} still to fill in
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
- Cloudflare Pages: Settings → Environment variables → `PUBLIC_WEB3FORMS_KEY` (Production and Preview), then redeploy.

Web3Forms keys are designed to be used in the browser, so it's fine that this key ends up in the built HTML. Until it's set, the form shows a "not connected yet" message pointing people to WhatsApp/email.

**Floor plan upload:** Web3Forms only accepts file attachments on a paid plan. On the free plan, remove the file field from `src/components/EnquiryForm.astro`, or upgrade.

## Analytics

Set `analytics.ga4Id` in `src/config/site.ts`. GA4 only loads once it is set. Events sent:

- `generate_lead`: successful quote or trade form submit (`form`: `quote` / `trade`)
- `form_error`: failed submit
- `whatsapp_click`: any WhatsApp link (`link_location`: `sticky`, `contact`, `datasheet`, `professionals`)

Mark `generate_lead` as a key event in GA4.

## Deploy to Cloudflare Pages

1. Push this folder to a Git repo (e.g. `dbasgp/erv-sg`).
2. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → pick the repo.
3. Build settings: framework preset **Astro**, build command `npm run build`, output directory `dist`.
4. Environment variables: `PUBLIC_WEB3FORMS_KEY`, and `NODE_VERSION` = `22`.
5. Save and deploy. The site appears at `<project>.pages.dev`.

`public/_headers` sets security headers and long-term caching for hashed assets. Cloudflare Pages reads it automatically.

### Pointing erv.sg

1. In the Pages project → Custom domains, add **www.erv.sg** first, then **erv.sg**.
2. If erv.sg's DNS is on Cloudflare, the records are created for you (`www` CNAME → `<project>.pages.dev`, apex via CNAME flattening).
3. If DNS is elsewhere, either move the nameservers to Cloudflare (simplest, needed for the apex) or add `CNAME www → <project>.pages.dev` at the current DNS host.
4. Make www canonical: add a Cloudflare Redirect Rule `erv.sg/*` → `https://www.erv.sg/${1}` (301, preserve query string). Canonicals, sitemap and Open Graph URLs already use `https://www.erv.sg`.
5. After it's live, submit `https://www.erv.sg/sitemap-index.xml` in Google Search Console.

### Alternative: Render

Our other sites run on Render. To use Render instead, create a static site with build `npm install && npm run build` and publish dir `dist`. Render ignores `_headers`, so set headers and redirects through Render's settings or API.

## Adding a product

See `CONTENT_GUIDE.md`. In short: add `src/content/products/<slug>.json`, drop photos in `src/assets/products/`, rebuild. The family page, comparison table, professionals downloads table, sitemap and Product schema all update automatically.
