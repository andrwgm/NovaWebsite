import { SITE_ORIGIN } from '../../blog/blogConfig'
import { ASSESSMENT_MIN_AGE } from '../assessmentPricing'

// Pieces shared by the three service pages (ADHD, autism, combined autism + ADHD):
// the common blocks, the FAQ answers that read the same for every service, and the
// JSON-LD builder. Per-service copy lives in adhd.js, autism.js and combined.js.
// Prices, ages and timings come from ../assessmentPricing.js. Do not retype them.

export { SITE_ORIGIN }

// One path to change the photo (and the social share image) on all three pages.
export const HERO_IMAGE = '/images/meeting.avif'
export const HERO_IMAGE_ALT = 'People in a calm, supportive conversation'

export const NO_TREATMENT_NOTE = 'We do not provide medication or ongoing treatment.'

export const SECTION_LINKS = [
  { id: 'overview', label: 'Overview' },
  { id: 'whats-included', label: 'What’s included' },
  { id: 'how-it-works', label: 'How it works' },
  { id: 'support-box', label: 'Support' },
  { id: 'faqs', label: 'FAQs' },
]

export const INCLUDED_NOTE =
  'Developmental history and everyday experiences form part of your assessment.'

export const PATHWAYS_INTRO =
  'A clear, structured process designed to understand your experiences and provide practical next steps.'

export const SUPPORT_BOX = {
  titleLead: 'Support you',
  titleItalic: 'can hold.',
  body: 'Every Nova Clinics assessment includes a physical support box delivered to your home, with practical guides and resources to help you prepare, understand each stage and put helpful strategies into practice.',
  delivery: 'UK delivery is included.',
  linkLabel: 'Explore the support box',
  linkTo: '/support',
  image: '/images/box-no-bg-shadow-cropped.avif',
  imageAlt: 'Nova Clinics support box with practical guides and family resources',
}

export function buildFinalCta(button) {
  return {
    titleLead: 'Ready to take',
    titleItalic: 'the next step?',
    button,
  }
}

export function buildPageUrl(path) {
  return `${SITE_ORIGIN}${path}`
}

// ---- FAQ answers that read the same whichever assessment the page is about ----

export const FAQ_GP_REFERRAL = {
  id: 'gp-referral',
  question: 'Do I need a GP referral?',
  answer:
    'No. You do not need a referral to book a private assessment, and you can contact us directly. Nova Clinics is an independent private provider, so we do not accept NHS Right to Choose funding or GP referrals.',
}

export const FAQ_INFORMANT = {
  id: 'informant',
  question: 'Who can be my informant?',
  answer:
    'An informant is someone who knows you well and can share your neurodevelopmental history and how you present day to day. They complete questionnaires and attend a separate 60-minute appointment, which you are welcome to join. We also ask for a short questionnaire from someone in your social or professional circle, such as a colleague or activity instructor, who is different from your main informant. For children, parents or carers take part, and we ask the child’s class teacher, SENCo or teaching assistant to complete a questionnaire. If your child is not in school, it can be someone who has known them for at least six months in a social setting and who does not live with them.',
}

export const FAQ_AFTERWARDS = {
  id: 'afterwards',
  question: 'What will I receive afterwards?',
  answer:
    'You will receive a comprehensive written report about a week before an online feedback appointment, where we discuss the outcome agreed by our multidisciplinary team. You will also receive a clear outcome letter that you can share with schools, employers and other services; each organisation applies its own requirements. A post-assessment follow-up session is available up to four weeks after the feedback session.',
}

export const FAQ_ONLINE = {
  id: 'online',
  question: 'Are appointments online only?',
  answer:
    'Yes, our assessments are conducted securely online via video call, making them accessible from anywhere in the UK. If you need adjustments for in-person elements, just let us know.',
}

export const FAQ_CLINICIANS = {
  id: 'clinicians',
  question: 'Who will conduct my assessment?',
  answer:
    'Your assessment is led by our team of HCPC-registered clinical psychologists with extensive NHS experience in neurodiversity. We take a multidisciplinary approach, compliant with NICE standards, to ensure a holistic view that honours your individuality.',
}

/** "How much does it cost?" answer. The price and report timing are passed in, never typed here. */
export function buildCostFaq({ question, assessmentName, price, results }) {
  return {
    id: 'cost',
    question,
    answer: `${assessmentName} is ${price.display}. The price covers the whole pathway, from questionnaires to feedback and follow-up, plus the secure portal and your support box with UK delivery, with no required add-ons. We typically collect a first payment so you can complete portal forms, with any remaining balance due before we book your assessment appointment. Amounts are confirmed in writing. Expect your report ${results.lead.toLowerCase()} ${results.rest}`,
  }
}

function buildHowToJsonLd(content, audience) {
  return {
    '@type': 'HowTo',
    '@id': `${content.url}#how-it-works-${audience.id}`,
    name: `${audience.label} ${content.schema.assessmentLabel} assessment at Nova Clinics`,
    url: `${content.url}#how-it-works`,
    step: audience.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.title,
      text: step.detail,
    })),
  }
}

/** One @graph with page, breadcrumb, service, both pathways and the FAQ. */
export function buildAssessmentPageJsonLd(content) {
  const { url, seo, schema } = content
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: seo.title,
        description: seo.description,
        isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
        breadcrumb: { '@id': `${url}#breadcrumb` },
        about: { '@id': `${url}#service` },
        inLanguage: 'en-GB',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/` },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Assessments',
            item: `${SITE_ORIGIN}/#pricing`,
          },
          { '@type': 'ListItem', position: 3, name: content.hero.breadcrumbLabel, item: url },
        ],
      },
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: schema.name,
        serviceType: schema.serviceType,
        description: `${content.hero.intro} ${content.hero.body}`,
        url,
        provider: { '@id': `${SITE_ORIGIN}/#clinic` },
        areaServed: { '@type': 'Country', name: 'United Kingdom' },
        audience: {
          '@type': 'PeopleAudience',
          suggestedMinAge: ASSESSMENT_MIN_AGE,
        },
        offers: {
          '@type': 'Offer',
          url,
          price: String(schema.price.value),
          priceCurrency: schema.price.currency,
          availability: 'https://schema.org/InStock',
        },
      },
      ...content.pathways.audiences.map((audience) => buildHowToJsonLd(content, audience)),
      {
        '@type': 'FAQPage',
        '@id': `${url}#faqs`,
        url: `${url}#faqs`,
        mainEntity: content.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  }
}
