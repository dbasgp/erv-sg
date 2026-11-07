// Resolves product image filenames (as written in content JSON) to optimisable assets.
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/products/*.{jpg,jpeg,png,webp,avif}', { eager: true });

export const productImage = (name?: string | null): ImageMetadata | undefined => {
  if (!name) return undefined;
  const hit = Object.entries(files).find(([path]) => path.endsWith(`/${name}`));
  if (!hit && import.meta.env.DEV) console.warn(`[images] ${name} not found in src/assets/products`);
  return hit?.[1].default;
};
