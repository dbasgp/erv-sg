import { getCollection } from 'astro:content';
import type { FamilySlug } from './families';

export const getProducts = async (family?: FamilySlug) => {
  const all = await getCollection('products');
  return all
    .filter((p) => !family || p.data.family === family)
    .sort((a, b) => Number(b.data.featured) - Number(a.data.featured) || a.data.model.localeCompare(b.data.model));
};
