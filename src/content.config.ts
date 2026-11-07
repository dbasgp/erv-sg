import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const familyEnum = z.enum(['ceiling-dehumidifiers', 'fresh-air-dehumidifiers', 'erv-systems']);
const n = z.number().nullable().default(null);
const s = z.string().nullable().default(null);

// One JSON file per model. Unknown values stay null and render as "Ask for datasheet".
const products = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/products' }),
  schema: z.object({
    model: z.string(),
    series: z.string(),
    family: familyEnum,
    slug: z.string(),
    summary: z.string(),
    capacity_l_per_day: n,
    airflow_m3h: n,
    fresh_air_m3h: n,
    recovery_efficiency_pct: n,
    power_w: n,
    refrigerant: s,
    noise_db: n,
    dimensions_mm: s,
    weight_kg: n,
    drain: s,
    control: s,
    filter: s,
    suitable_area_m2: s,
    certifications: z.array(z.string()).default([]),
    datasheet_pdf: s,
    images: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
});

const applications = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/applications' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number(),
    problem: z.string(),
    families: z.array(familyEnum),
    setup: z.array(z.string()),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    locationType: z.string(),
    problem: z.string(),
    solution: z.string(),
    result: z.string(),
    families: z.array(familyEnum).default([]),
    photos: z.array(z.object({ src: z.string(), alt: z.string() })).default([]),
    date: z.coerce.date(),
    draft: z.boolean().default(true),
  }),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    stub: z.boolean().default(false),
  }),
});

export const collections = { products, applications, projects, articles };
