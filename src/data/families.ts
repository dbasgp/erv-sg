export type FamilySlug = 'ceiling-dehumidifiers' | 'fresh-air-dehumidifiers' | 'erv-systems';

export interface Family {
  slug: FamilySlug;
  name: string;
  singular: string;
  short: string;
  title: string; // SEO title
  description: string; // meta description
  intro: string;
  points: string[];
  goodFor: string;
  image?: string; // filename in src/assets/products
  imageAlt?: string;
}

export const families: Family[] = [
  {
    slug: 'ceiling-dehumidifiers',
    name: 'Ceiling dehumidifiers',
    singular: 'ceiling dehumidifier',
    short: 'Hidden above the false ceiling, ducted to one or more rooms.',
    title: 'Ceiling dehumidifier Singapore: concealed units for condos and landed homes',
    description:
      'Concealed ceiling dehumidifiers that sit above the false ceiling, duct dry air to each room and drain continuously. GEM, UTC, GEC and HC series.',
    intro:
      'A ceiling dehumidifier sits out of sight above the false ceiling. It pulls in room air, removes moisture over a cold coil, and sends the drier air back through slim ducts and grilles. Water goes straight to a drain point, so there is no tank to empty.',
    points: [
      'Only the grilles and a wall controller are visible',
      'One unit can serve several rooms through ducts',
      'Continuous drainage to a floor trap or condensate line',
      'Runs independently of the aircon, so rooms stay dry when it is off',
    ],
    goodFor: 'Condos and landed homes under renovation, wardrobes and store rooms, basements, wine and cigar rooms.',
    image: 'utc22-1.jpg',
    imageAlt: 'DBA UTC series slim ceiling dehumidifier, side view',
  },
  {
    slug: 'fresh-air-dehumidifiers',
    name: 'Fresh-air ceiling dehumidifiers',
    singular: 'fresh-air ceiling dehumidifier',
    short: 'Bring in filtered outdoor air and dry it before it reaches the room.',
    title: 'Fresh air dehumidifier Singapore: filtered, dried outdoor air for sealed rooms',
    description:
      'Fresh-air ceiling dehumidifiers draw in filtered outdoor air and dry it before it enters the home, so ventilation does not add humidity.',
    intro:
      'Opening a window in Singapore brings in fresh air and a lot of moisture with it. A fresh-air dehumidifier takes outdoor air through a filter, dries it, then supplies it to the rooms. You get the ventilation without the damp.',
    points: [
      'Supplies filtered outdoor air to bedrooms and living areas',
      'Dries that air before it enters, instead of after',
      'Can also recirculate and dry room air',
      'Fits above a standard false ceiling',
    ],
    goodFor: 'Bedrooms kept closed with the aircon on, condos with limited cross-ventilation, clinics and small offices.',
    image: 'gec30v-1.jpg',
    imageAlt: 'DBA GEC V series fresh-air ceiling dehumidifier',
  },
  {
    slug: 'erv-systems',
    name: 'ERV systems',
    singular: 'ERV system',
    short: 'Balanced supply and exhaust, with energy recovered from the outgoing air.',
    title: 'ERV Singapore: energy recovery ventilators for homes and buildings',
    description:
      'Energy recovery ventilators supply fresh air and exhaust stale air in balance, using an enthalpy core to recover cooling and part of the moisture from the exhaust.',
    intro:
      'An ERV (energy recovery ventilator) runs two airstreams at once: fresh air in, stale air out. They pass each other inside an enthalpy core without mixing. The cool, drier exhaust pre-conditions the hot, humid incoming air, so the aircon has less work to do.',
    points: [
      'Balanced airflow, so rooms are not pushed into positive or negative pressure',
      'Enthalpy core transfers heat and part of the moisture',
      'Removes CO₂ and odours from sealed rooms',
      'Pairs with a dehumidifier when incoming air needs further drying',
    ],
    goodFor: 'Whole-home fresh air in condos and landed homes, classrooms, offices, meeting rooms and hotel rooms.',
  },
];

export const familyBySlug = (slug: string) => families.find((f) => f.slug === slug);
