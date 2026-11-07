import type { CollectionEntry } from 'astro:content';
import type { FamilySlug } from './families';

type P = CollectionEntry<'products'>['data'];
export type SpecKey = keyof P;

export const ASK = 'Ask for datasheet';

export const specLabels: Partial<Record<SpecKey, { label: string; unit?: string }>> = {
  capacity_l_per_day: { label: 'Dehumidifying capacity', unit: 'L/day' },
  airflow_m3h: { label: 'Airflow', unit: 'm³/h' },
  fresh_air_m3h: { label: 'Fresh air volume', unit: 'm³/h' },
  recovery_efficiency_pct: { label: 'Recovery efficiency', unit: '%' },
  power_w: { label: 'Rated power', unit: 'W' },
  refrigerant: { label: 'Refrigerant' },
  noise_db: { label: 'Noise level', unit: 'dB(A)' },
  dimensions_mm: { label: 'Dimensions (W × D × H)', unit: 'mm' },
  weight_kg: { label: 'Weight', unit: 'kg' },
  drain: { label: 'Drain' },
  control: { label: 'Control' },
  filter: { label: 'Filter' },
  suitable_area_m2: { label: 'Suitable floor area', unit: 'm²' },
};

const common: SpecKey[] = ['power_w', 'noise_db', 'dimensions_mm', 'weight_kg', 'control', 'filter'];

// Which fields apply to which family (detail page)
export const detailFields: Record<FamilySlug, SpecKey[]> = {
  'ceiling-dehumidifiers': ['capacity_l_per_day', 'airflow_m3h', 'suitable_area_m2', 'refrigerant', ...common, 'drain'],
  'fresh-air-dehumidifiers': ['capacity_l_per_day', 'airflow_m3h', 'fresh_air_m3h', 'suitable_area_m2', 'refrigerant', ...common, 'drain'],
  'erv-systems': ['airflow_m3h', 'recovery_efficiency_pct', 'suitable_area_m2', ...common],
};

// Shorter list for the comparison table
export const compareFields: Record<FamilySlug, SpecKey[]> = {
  'ceiling-dehumidifiers': ['capacity_l_per_day', 'airflow_m3h', 'suitable_area_m2', 'power_w', 'noise_db', 'refrigerant', 'dimensions_mm'],
  'fresh-air-dehumidifiers': ['capacity_l_per_day', 'fresh_air_m3h', 'airflow_m3h', 'power_w', 'noise_db', 'refrigerant', 'dimensions_mm'],
  'erv-systems': ['airflow_m3h', 'recovery_efficiency_pct', 'power_w', 'noise_db', 'filter', 'dimensions_mm'],
};

export const fmt = (p: P, key: SpecKey): string | null => {
  const v = p[key];
  if (v === null || v === undefined || v === '') return null;
  return String(v);
};

export const isR290 = (p: P) => (p.refrigerant ?? '').toUpperCase().includes('R290');
