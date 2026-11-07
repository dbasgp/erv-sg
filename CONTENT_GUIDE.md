# Content guide

Everything below is plain files. Edit, run `npm run dev` to check, then commit and push to deploy.

## Add a product model

1. Copy an existing file in `src/content/products/`, e.g. `dba-utc22.json`, to `src/content/products/<slug>.json`.
2. Fill in the fields. **Only enter values from the datasheet.** Anything you don't have stays `null` and shows as "Ask for datasheet".

| Field | Example | Notes |
|---|---|---|
| `model` | `"DBA-UTC22"` | Shown as the page title |
| `series` | `"UTC"` | GEM, UTC, GEC, HC, GEC V… |
| `family` | `"ceiling-dehumidifiers"` | One of `ceiling-dehumidifiers`, `fresh-air-dehumidifiers`, `erv-systems` |
| `slug` | `"dba-utc22"` | Lower case, matches the file name, becomes the URL |
| `summary` | `"Slim ceiling dehumidifier…"` | One plain sentence |
| `capacity_l_per_day` | `22` | Number, L/day |
| `airflow_m3h` | `250` | Number, m³/h |
| `fresh_air_m3h` | `120` | Number, m³/h |
| `recovery_efficiency_pct` | `70` | Number, % (ERVs) |
| `power_w` | `350` | Number, W |
| `refrigerant` | `"R290"` | Text. Any value containing R290 adds the R290 safety note automatically |
| `noise_db` | `38` | Number, dB(A) |
| `dimensions_mm` | `"800 × 450 × 230"` | Text, W × D × H |
| `weight_kg` | `28` | Number |
| `drain`, `control`, `filter` | `"Ø20 mm"`, `"Wired controller"`, `"G4"` | Text |
| `suitable_area_m2` | `"30–60"` | Text, so ranges are allowed |
| `certifications` | `["Grade 1 energy label", "CB"]` | A badge appears only for items listed. Leave `[]` until a certificate is issued |
| `datasheet_pdf` | `"/datasheets/dba-utc22.pdf"` | Put the PDF in `public/datasheets/` |
| `images` | `["utc22-1.jpg", "utc22-2.jpg"]` | File names in `src/assets/products/`. First one is the main photo |
| `featured` | `true` | Featured models are listed first |

3. Photos: add them to `src/assets/products/`. Any size works (they're resized automatically), but square shots on a plain background look most consistent.

Which spec rows show for each family is set in `src/data/specs.ts`.

**UTC22:** don't add the Grade 1 energy label or CB certificate to `certifications` until they're actually issued.

## Add a project (case study)

1. Copy `src/content/projects/sample-condo-bedrooms.md` to a new file, e.g. `tanjong-pagar-condo.md`.
2. Fill in `title`, `description`, `locationType`, `problem`, `solution`, `result`, `families`, `date`.
3. Photos: put them in `src/assets/products/` and list them as `photos: [{ src: "file.jpg", alt: "What the photo shows" }]`.
4. Write any longer story under the `---` in plain Markdown.
5. `draft: true` shows it only in `npm run dev`. Set `draft: false` to publish.

Delete the two sample projects once real ones exist. Get the owner's agreement before publishing, and avoid exact addresses.

## Add an article (Learn)

1. Create `src/content/articles/<slug>.md`:

```md
---
title: Your title in sentence case
description: One or two sentences for search results.
date: 2026-12-01
stub: false
---

Body text in Markdown. Use ## for section headings.
```

2. `stub: true` adds a "being written" note, sets noindex and keeps the page out of the sitemap. Set `stub: false` when the article is finished.

## Add an application

Copy any file in `src/content/applications/`. `order` controls the position in lists. `families` is the recommended families, main recommendation first.

## Edit the FAQ

`src/data/faq.ts`. The FAQPage schema is generated from the same data.

## Contacts and placeholders

Everything in `{{DOUBLE_BRACES}}` is a placeholder. Most are in `src/config/site.ts`. Run `npm run placeholders` to list what's left.
