import { site } from '../config/site';

export interface FaqGroup { title: string; items: { q: string; a: string }[] }

export const faq: FaqGroup[] = [
  {
    title: 'Installation',
    items: [
      { q: 'Do I need a false ceiling?', a: 'Yes. Ceiling dehumidifiers, fresh-air dehumidifiers and ERVs are all designed to sit above a false ceiling, usually along the corridor, in a bathroom or above a store room. The ceiling needs enough depth for the unit and an access panel below it for servicing. Check the model datasheet for the exact height.' },
      { q: 'Where does the water go?', a: 'Dehumidifiers drain continuously through a condensate pipe to a floor trap, a bathroom drain or an existing aircon condensate line. The drain point should be planned with the plumber or contractor so the pipe has a proper fall. ERVs do not normally produce condensate.' },
      { q: 'How are the ducts run?', a: 'Slim ducts run from the unit through the false ceiling to a grille in each room. Shorter, straighter runs work better. For fresh-air units and ERVs, there is also a duct to an outdoor air intake, and for ERVs an exhaust duct to the outside.' },
      { q: 'Do I need MCST approval in a condo?', a: 'Usually, for any new opening in an external wall or change to the façade, such as a new fresh-air intake. Many MCSTs also want renovation works declared in advance. Check your MCST\'s by-laws and renovation guidelines before work starts. Your contractor normally handles the application.' },
      { q: 'Can it be added after the renovation is finished?', a: 'It is possible, but the false ceiling usually has to be partly opened. It is much simpler and cheaper to plan it at the design stage, before the ceiling goes up.' },
    ],
  },
  {
    title: 'Maintenance',
    items: [
      { q: 'How often should the filters be cleaned?', a: 'As a rule of thumb, check the filters every one to three months and clean or replace them when they look dirty. Units that take in outdoor air near a busy road or construction site may need more frequent cleaning. The exact interval for each model is in its manual.' },
      { q: 'Does the unit need servicing?', a: 'We recommend a yearly check of the coil, drain line, fan and controls by a trained technician, in addition to regular filter cleaning.' },
    ],
  },
  {
    title: 'Noise and running cost',
    items: [
      { q: 'How loud is a ceiling dehumidifier?', a: 'The unit sits above the ceiling, usually outside the bedroom, so what you hear in the room is mainly air moving through the grille. Each model\'s rated noise level is on its datasheet. Placing the unit away from bedrooms and using a duct silencer where needed keeps it quiet.' },
      { q: 'How much does it cost to run?', a: 'It depends on the model, the size of the space, how humid it is and how many hours a day it runs. Send us the room sizes and how you plan to use it, and we will estimate the power consumption from the datasheet figures.' },
      { q: 'Will it lower my aircon bill?', a: 'An ERV recovers some of the cooling from the air it exhausts, which reduces the load from bringing in fresh air. Drier air can also feel comfortable at a slightly higher aircon setting. Actual savings vary from home to home, so we do not quote a fixed figure.' },
    ],
  },
  {
    title: 'Warranty and buying',
    items: [
      { q: 'What warranty do you offer?', a: `Warranty: ${site.warranty}. Full terms are provided with the quotation.` },
      { q: 'Can I buy a unit online?', a: `Off-the-shelf units are sold at ${site.sister.store.name}. Ceiling, fresh-air and ERV systems are usually supplied with a quotation, since they need to be sized and installed for your space.` },
    ],
  },
];
