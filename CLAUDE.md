# Build brief: erv.sg — product showcase website

Paste everything below into Claude in VS Code (Claude Code). Put it in the repo root as `CLAUDE.md` too, so it stays as context for later edits.

---

## Role and goal

You are building **erv.sg**, a fast, static, SEO-first product showcase website for Singapore. It is NOT an online shop: no cart, no checkout, no prices. Its only job is to explain three product families, build trust with specifiers, and generate enquiries (WhatsApp, phone, email, quote form). Purchases of off-the-shelf units are handled on the sister store **dba.sg** (link out where relevant).

Before writing code: propose a short design plan (palette as 4–6 hex values, typefaces, layout wireframe in ASCII, principles), review it for anything generic, then build. Ask me only if something blocks you; otherwise use clearly marked placeholders.

## Company (use exactly)

- Operator: **DBA Electric Pte. Ltd.**, UEN 202521170D, 629 Aljunied Road, Singapore
- Sister sites: dba.sg (Singapore store), dba.hk (Hong Kong)
- Phone / WhatsApp / email for Singapore: `{{SG_PHONE}}`, `{{SG_WHATSAPP}}`, `{{SG_EMAIL}}` — placeholders, keep them in one config file
- Never name the OEM factory or any third-party manufacturer. Products are presented as DBA products.

## Audience (in priority order)

1. M&E consultants, contractors and interior designers specifying for condos, landed homes and fit-outs
2. Homeowners renovating condos / landed homes (false ceiling available)
3. Commercial / institutional buyers: clinics, hospitals, schools, labs, hotels, offices, F&B, storage

## Product families (3 pillars)

1. **Ceiling dehumidifiers** — concealed in the false ceiling, ducted to rooms, quiet, drains continuously. Series: GEM, UTC (UTC22 is the R290 successor to UTC20), GEC, HC.
2. **Fresh-air ceiling dehumidifiers** — bring in filtered outdoor air and dry it before it enters the home, so ventilation doesn't add humidity.
3. **ERV systems** (energy recovery ventilators) — balanced supply/exhaust with an enthalpy core that recovers cooling energy and part of the moisture from exhaust air.

Core message for the tropics: in Singapore, outdoor air is hot and wet all year. Ventilation alone imports humidity; dehumidification alone leaves stale, CO₂-heavy air in sealed, air-conditioned rooms. Pairing fresh air + energy recovery + dehumidification is the answer. Keep this explanation plain and short.

## Product data rules

- Store every model as structured content (one Markdown/JSON file per model) with fields: `model, series, family, slug, summary, capacity_l_per_day, airflow_m3h, fresh_air_m3h, recovery_efficiency_pct, power_w, refrigerant, noise_db, dimensions_mm, weight_kg, drain, control, filter, suitable_area_m2, certifications, datasheet_pdf, images, featured`.
- **Do not invent specifications.** Any value I haven't supplied must be `null` and render as "Ask for datasheet". Create 2 sample models per family with null specs so I can fill them in.
- Certifications field is a list; show a badge only when present. Do not claim the Grade 1 energy label or CB certificate for UTC22 until I add them (expected Dec 2026).
- R290 models: include a short, factual note that installation follows the applicable Singapore requirements for flammable refrigerant equipment (SCDF guidance, IEC 60335-2-40). Link to a "Safety & compliance" page, no legal advice.
- Product comparison table per family, generated from the data.

## Site map

- **Home** — hero built around the real problem (Singapore humidity + stale sealed rooms), the three families, where they're used, trust strip (UEN, Singapore office, compliance), enquiry CTA
- **Products** — family landing pages (3) → model detail pages (spec table, datasheet download, "Request a quote" prefilled with model)
- **How it works** — ERV vs HRV vs fresh-air dehumidifier vs plain dehumidifier, with one simple SVG airflow diagram per type (build the SVGs yourself, original, no copied diagrams)
- **Applications** — condo, landed home, clinic/healthcare, school, lab, hotel, office, wine/cigar/storage. Each: the humidity/IAQ problem, recommended family, typical setup
- **Projects** — case study template (location type, problem, solution, result, photos). Ship with 2 placeholder entries marked DRAFT and excluded from production builds
- **For professionals** — specifier resources: datasheets, CAD/BIM placeholders, sizing help request, trade partner sign-up form (contractors, IDs, M&E). Mention Singapore codes in plain language: SS 553 (ACMV) and SS 554 (indoor air quality), Green Mark relevance. Don't quote clause numbers or limits unless I supply them.
- **Learn** (blog/guides, Markdown) — seed 4 article stubs with titles + outlines only: "ERV vs HRV in a tropical climate", "Why your condo still feels damp with the aircon on", "Fresh air for sealed bedrooms: CO₂ and sleep", "Planning a ceiling dehumidifier during renovation"
- **FAQ** — installation (false ceiling, drain point, duct runs, MCST approval), maintenance (filter cleaning, servicing), noise, running cost, warranty `{{WARRANTY}}`. Generate FAQPage schema
- **About** — DBA Electric, Singapore presence, link to dba.sg / dba.hk
- **Contact** — form, WhatsApp click-to-chat, phone, email, map embed placeholder for 629 Aljunied Road
- **Safety & compliance**, **Privacy policy** (PDPA-aware), **Terms**

## Enquiry system

- Quote form fields: name, company (optional), role (homeowner / ID / contractor / consultant / facility manager / other), phone, email, property type, floor area (m²), number of rooms, interested family/model, message, file upload for floor plan (optional), PDPA consent checkbox
- Submit via a serverless-friendly handler (Formspree / Web3Forms / Cloudflare Pages Function — pick one, keep the key in env vars). Show clear success and error states.
- Floating WhatsApp button with a prefilled message including the page/model name
- Track form submits and WhatsApp clicks as GA4 events (measurement ID in config, `{{GA4_ID}}`)

## Tech stack

- **Astro** (static output) + content collections for products, applications, projects, articles
- Plain CSS with custom properties (or Tailwind if you strongly prefer) — design tokens in one file
- Images: Astro `<Image>`, WebP/AVIF, lazy-loaded, explicit sizes
- No heavy JS frameworks; islands only where needed (comparison table filter, form)
- Deploy target: Cloudflare Pages (include a README with build + deploy steps and how to add a product)
- Lighthouse targets: 95+ on performance, accessibility, best practices, SEO (mobile)

## SEO

- Singapore English, `en-SG`, `lang` attribute set; structure ready for a Chinese (`zh-SG`) version later but don't build it now
- Per-page title/description, canonical, Open Graph, sitemap.xml, robots.txt
- Schema: Organization + LocalBusiness (Singapore address), Product per model (no price/offers), FAQPage, BreadcrumbList, Article
- Target phrases (work naturally into copy, no stuffing): ERV Singapore, energy recovery ventilator Singapore, fresh air dehumidifier Singapore, ceiling dehumidifier Singapore, concealed dehumidifier condo, fresh air system condo Singapore, indoor air quality Singapore home, dehumidifier for false ceiling

## Design direction

- Subject: tropical air, moisture, clean engineering. Feel precise and calm, like a quality building-services brand, not a gadget store.
- Avoid template looks: no cream-and-terracotta, no black-with-neon, no identical rounded SaaS cards, no ALL-CAPS eyebrow labels, no "→" on every button.
- One memorable element only (e.g. a live-feeling humidity/airflow visual in the hero); keep the rest quiet.
- Mobile first: most homeowners and contractors arrive on phones. Tap targets ≥ 44px, sticky enquiry button on mobile.
- Accessibility: WCAG AA contrast, keyboard focus visible, `prefers-reduced-motion` respected, alt text on all images.
- Support light and dark mode via CSS variables.

## Copy rules

- Plain, specific, sentence case. Explain what a product does, not hype.
- No unverifiable claims ("best", "No.1", "99% efficient", health cures). No medical claims about mould or allergies beyond general, widely accepted statements.
- Units: metric (L/day, m³/h, m², dB(A), W, mm).

## Deliverables

1. Working Astro project, `npm run dev` / `npm run build` clean, no console errors
2. `src/config/site.ts` holding company details, contacts, GA4 ID, form endpoint
3. Content folders with sample entries + a `CONTENT_GUIDE.md` showing how I add a model, project, or article
4. README with deploy steps for Cloudflare Pages and DNS notes for pointing erv.sg
5. A final checklist of every `{{PLACEHOLDER}}` still to fill in
