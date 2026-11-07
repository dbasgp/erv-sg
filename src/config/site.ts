// Single source of truth for company details, contacts and integrations.
// Anything wrapped in {{ }} is a placeholder still to be filled in.
// Run `npm run placeholders` to list the ones left.

export const site = {
  name: 'erv.sg',
  url: 'https://www.erv.sg',
  locale: 'en-SG',
  description:
    'Ceiling dehumidifiers, fresh-air dehumidifiers and ERV systems for Singapore homes and buildings, from DBA Electric.',

  company: {
    legalName: 'DBA Electric Pte. Ltd.',
    uen: '202521170D',
    street: '629 Aljunied Road',
    postalCode: '{{SG_POSTAL_CODE}}',
    city: 'Singapore',
    country: 'SG',
  },

  contact: {
    phone: '{{SG_PHONE}}', // display format, e.g. +65 6123 4567
    whatsapp: '{{SG_WHATSAPP}}', // digits only, country code first, e.g. 6591234567
    email: '{{SG_EMAIL}}',
    hours: '{{SG_OFFICE_HOURS}}',
  },

  warranty: '{{WARRANTY}}',

  sister: {
    store: { name: 'dba.sg', url: 'https://www.dba.sg' },
    hk: { name: 'dba.hk', url: 'https://www.dba.hk' },
  },

  analytics: {
    ga4Id: '{{GA4_ID}}', // G-XXXXXXXXXX
  },

  forms: {
    // Web3Forms endpoint. The access key comes from the PUBLIC_WEB3FORMS_KEY env var.
    endpoint: 'https://api.web3forms.com/submit',
    accessKey: import.meta.env.PUBLIC_WEB3FORMS_KEY ?? '',
  },

  mapEmbedUrl: '{{GOOGLE_MAPS_EMBED_URL}}',
} as const;

export const isPlaceholder = (v: string | null | undefined) =>
  !v || /^\{\{.*\}\}$/.test(v);

export const telHref = () =>
  isPlaceholder(site.contact.phone) ? '#' : `tel:${site.contact.phone.replace(/[^\d+]/g, '')}`;

export const waHref = (text: string) =>
  `https://wa.me/${isPlaceholder(site.contact.whatsapp) ? '' : site.contact.whatsapp}?text=${encodeURIComponent(text)}`;
