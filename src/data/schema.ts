import { site } from '../config/site';

export interface Crumb { name: string; href: string }

const abs = (p: string) => new URL(p, site.url).href;

export const organizationLd = () => ({
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness'],
  '@id': `${site.url}/#org`,
  name: site.company.legalName,
  alternateName: 'erv.sg',
  url: `${site.url}/`,
  logo: abs('/favicon.svg'),
  image: abs('/favicon.svg'),
  identifier: { '@type': 'PropertyValue', propertyID: 'UEN', value: site.company.uen },
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.company.street,
    addressLocality: site.company.city,
    postalCode: site.company.postalCode,
    addressCountry: site.company.country,
  },
  areaServed: { '@type': 'Country', name: 'Singapore' },
  telephone: site.contact.phone,
  email: site.contact.email,
  sameAs: [site.sister.store.url, site.sister.hk.url],
});

export const breadcrumbLd = (crumbs: Crumb[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: abs(c.href) })),
});

export const faqLd = (items: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } })),
});

export const articleLd = (a: { title: string; description: string; path: string; date: Date; updated?: Date }) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: a.title,
  description: a.description,
  mainEntityOfPage: abs(a.path),
  datePublished: a.date.toISOString(),
  dateModified: (a.updated ?? a.date).toISOString(),
  inLanguage: 'en-SG',
  author: { '@id': `${site.url}/#org` },
  publisher: { '@id': `${site.url}/#org` },
});

export const productLd = (p: {
  model: string; summary: string; path: string; image?: string; category: string; series: string;
  props: { name: string; value: string }[];
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: p.model,
  description: p.summary,
  sku: p.model,
  model: p.model,
  category: p.category,
  brand: { '@type': 'Brand', name: 'DBA' },
  manufacturer: { '@id': `${site.url}/#org` },
  url: abs(p.path),
  ...(p.image ? { image: abs(p.image) } : {}),
  additionalProperty: p.props.map((x) => ({ '@type': 'PropertyValue', name: x.name, value: x.value })),
});
