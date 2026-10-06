import { SITE_ORIGIN } from '../blog/blogConfig'
import {
  ADHD_PRICE,
  ASSESSMENT_MIN_AGE,
  AUTISM_PRICE,
  COMBINED_PRICE,
} from './assessmentPricing'

// Content and small rules for /contact. Prices and the minimum age come from
// assessmentPricing.js so this page can never disagree with the service pages.

export const CONTACT_PATH = '/contact'
export const CONTACT_URL = `${SITE_ORIGIN}${CONTACT_PATH}`

// form_source when someone opens /contact directly (typed URL, search result, link).
export const CONTACT_DIRECT_SOURCE = 'contact_page'

export const CONTACT_SEO = {
  title: 'Contact Nova Clinics | Enquire About a Private Assessment',
  description: `Get in touch with Nova Clinics about a private online ADHD, autism or combined assessment for adults and children aged ${ASSESSMENT_MIN_AGE}+ across the UK. No GP referral needed.`,
  image: '/images/contact.avif',
}

export const CONTACT_HERO = {
  label: 'Get in contact',
  titleLead: 'Let’s talk about',
  titleItalic: 'your assessment.',
  intro:
    'Tell us which assessment you are interested in and we will reply by email with the next steps.',
}

// Order matters: this is the order of the cards on the form.
export const CONTACT_SERVICES = [
  {
    id: 'adhd',
    label: 'ADHD',
    description: 'Full ADHD assessment',
    icon: 'pi pi-bolt',
    price: ADHD_PRICE.display,
  },
  {
    id: 'autism',
    label: 'Autism',
    description: 'Full autism assessment',
    icon: 'pi pi-compass',
    price: AUTISM_PRICE.display,
  },
  {
    id: 'combined',
    label: 'Combined',
    description: 'Autism and ADHD together',
    icon: 'pi pi-clone',
    price: COMBINED_PRICE.display,
  },
  {
    id: 'unsure',
    label: 'Not sure yet',
    description: 'We can help you choose',
    icon: 'pi pi-question-circle',
    price: null,
  },
]

export const CONTACT_AUDIENCES = [
  { id: 'self', label: 'For me', icon: 'pi pi-user' },
  { id: 'child', label: 'For my child', icon: 'pi pi-users' },
]

const SERVICE_IDS = CONTACT_SERVICES.map((service) => service.id)
const AUDIENCE_IDS = CONTACT_AUDIENCES.map((audience) => audience.id)

// Copy for the child block. The waiting list text is the same sentence used on the
// autism page and in "How it works".
export const CHILD_COPY = {
  ageCheck: `I understand that this online service is for ages ${ASSESSMENT_MIN_AGE} and over.`,
  waitlistText: `If your child is under ${ASSESSMENT_MIN_AGE}, you can join the waiting list for our upcoming in-person hybrid pathway.`,
  waitlistCheck: `My child is under ${ASSESSMENT_MIN_AGE}. Please add us to the waiting list.`,
  adhdNote: `We do not assess ADHD in children under ${ASSESSMENT_MIN_AGE}. Please speak with your GP.`,
  combinedNote: `We do not assess ADHD under age ${ASSESSMENT_MIN_AGE}. Please speak with your GP. Remote autism assessments are also ${ASSESSMENT_MIN_AGE}+ only.`,
}

export const PRIVATE_SERVICE_CHECK =
  'I understand that Nova Clinics is a private service. We cannot accept NHS Right to Choose or other publicly funded referrals.'

export const WAITLIST_MESSAGE = `\n[You're welcome to edit this message if you wish]\n\nHello, my child is under ${ASSESSMENT_MIN_AGE} and I would like to join the waiting list for your upcoming in-person hybrid autism assessment pathway. Please let me know what information you need from me. Thank you.`

/** The waiting list only exists for the autism pathway (autism, combined or still deciding). */
export function waitlistAvailable(service) {
  return service !== 'adhd'
}

/**
 * Turns the router state sent by requestContact() into form defaults. Unknown or missing
 * values fall back to "nothing chosen", so a direct visit starts with a clean form.
 */
export function resolveContactRequest(state) {
  const request = state && typeof state === 'object' ? state : {}
  const service = SERVICE_IDS.includes(request.itemId) ? request.itemId : ''
  const wantsWaitlist = request.waitlist === true && waitlistAvailable(service)
  const audience = wantsWaitlist
    ? 'child'
    : AUDIENCE_IDS.includes(request.audience)
      ? request.audience
      : ''

  return {
    service,
    audience,
    waitlist: wantsWaitlist,
    message: typeof request.message === 'string' ? request.message : '',
    source:
      typeof request.source === 'string' && request.source
        ? request.source
        : CONTACT_DIRECT_SOURCE,
    itemId: SERVICE_IDS.includes(request.itemId) ? request.itemId : undefined,
    from: typeof request.from === 'string' && request.from.startsWith('/') ? request.from : null,
  }
}

export const CONTACT_ASIDE = {
  stepsTitle: 'What happens next',
  steps: [
    {
      icon: 'pi pi-send',
      title: 'You send your enquiry',
      text: 'It takes a couple of minutes. Please leave out any medical details.',
    },
    {
      icon: 'pi pi-envelope',
      title: 'We reply by email',
      text: 'We will explain the pathway, timings and how to get started.',
    },
    {
      icon: 'pi pi-box',
      title: 'You begin when you are ready',
      text: 'There is no obligation. Your support box is delivered to your home with UK delivery included.',
    },
  ],
  reassurance: [
    { icon: 'pi pi-verified', text: 'HCPC-registered clinical psychologists' },
    { icon: 'pi pi-map-marker', text: 'Online across the UK' },
    { icon: 'pi pi-id-card', text: 'No GP referral needed' },
  ],
  image: '/images/contact.avif',
  imageAlt: 'Nova Clinics team ready to help with your enquiry',
}

export function buildContactPageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ContactPage',
        '@id': `${CONTACT_URL}#webpage`,
        url: CONTACT_URL,
        name: CONTACT_SEO.title,
        description: CONTACT_SEO.description,
        isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
        breadcrumb: { '@id': `${CONTACT_URL}#breadcrumb` },
        about: { '@id': `${SITE_ORIGIN}/#clinic` },
        inLanguage: 'en-GB',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${CONTACT_URL}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Contact', item: CONTACT_URL },
        ],
      },
    ],
  }
}
