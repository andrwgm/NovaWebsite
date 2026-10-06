import { FLOWS } from '../howItWorksPathways'
import {
  ADHD_ENQUIRY_MESSAGE,
  ADHD_MIN_AGE,
  ADHD_PRICE,
  ADHD_RESULTS,
} from '../assessmentPricing'
import {
  FAQ_AFTERWARDS,
  FAQ_CLINICIANS,
  FAQ_GP_REFERRAL,
  FAQ_INFORMANT,
  FAQ_ONLINE,
  HERO_IMAGE,
  HERO_IMAGE_ALT,
  INCLUDED_NOTE,
  NO_TREATMENT_NOTE,
  PATHWAYS_INTRO,
  SECTION_LINKS,
  SUPPORT_BOX,
  buildCostFaq,
  buildFinalCta,
  buildPageUrl,
} from './shared'

// Content for /adhd-assessment. Steps and session times come from FLOWS.adhd
// (howItWorksPathways.js, also mirrored in public/llms.txt).

const PATH = '/adhd-assessment'

export const ADHD_PAGE = {
  key: 'adhd',
  path: PATH,
  url: buildPageUrl(PATH),

  seo: {
    title: 'Private ADHD Assessment (UK, Ages 8+) | Nova Clinics',
    description: `Private online ADHD assessment for adults and children aged ${ADHD_MIN_AGE}+ across the UK. ${ADHD_PRICE.display} complete pathway, HCPC-registered psychologists, no GP referral needed.`,
    heroImage: HERO_IMAGE,
    heroImageAlt: HERO_IMAGE_ALT,
  },

  enquiry: {
    message: ADHD_ENQUIRY_MESSAGE,
    itemId: 'adhd',
    heroSource: 'adhd_page_hero',
    finalSource: 'adhd_page_final_cta',
    cta: 'Enquire about ADHD assessment',
  },

  hero: {
    breadcrumbLabel: 'ADHD',
    label: `Online across the UK · Ages ${ADHD_MIN_AGE}+`,
    titleLead: 'Private ADHD',
    titleItalic: 'assessment',
    intro: 'Understand your attention, activity and everyday experiences.',
    body: `A thorough online assessment for adults and children aged ${ADHD_MIN_AGE} and over, led by HCPC-registered clinical psychologists, with a clear outcome and practical next steps.`,
    price: ADHD_PRICE.display,
    priceCaption: 'Your complete assessment pathway',
    priceNote: NO_TREATMENT_NOTE,
  },

  sectionLinks: SECTION_LINKS,

  included: {
    intro:
      'Your complete ADHD assessment pathway includes everything you need, with no required add-ons.',
    note: INCLUDED_NOTE,
    items: [
      {
        id: 'interview',
        icon: 'pi pi-comments',
        title: 'DIVA or ACE clinical interview',
        description: 'A specialist, structured interview to explore your experiences.',
      },
      {
        id: 'questionnaires',
        icon: 'pi pi-list',
        title: 'Structured ADHD questionnaires',
        description:
          'Standardised questionnaires for you and, where relevant, others who know you well.',
      },
      {
        id: 'review',
        icon: 'pi pi-eye',
        title: 'Multidisciplinary review',
        description:
          'Your evidence is considered by a specialist team before the clinical outcome is agreed.',
      },
      {
        id: 'report',
        icon: 'pi pi-file',
        title: 'Detailed written report',
        description: 'A clear outcome, clinical findings and personalised recommendations.',
      },
      {
        id: 'follow-up',
        icon: 'pi pi-refresh',
        title: 'Feedback and follow-up',
        description:
          'Time to discuss the outcome, ask questions and understand your next steps.',
      },
      {
        id: 'portal',
        icon: 'pi pi-box',
        title: 'Secure portal and support box',
        description:
          'Secure updates and documents online, plus practical resources delivered to your home.',
      },
    ],
  },

  pathways: {
    titleLead: 'Your ADHD assessment,',
    titleItalic: 'step by step',
    intro: PATHWAYS_INTRO,
    childNote: `We do not assess ADHD in children under ${ADHD_MIN_AGE}. Please speak with your GP.`,
    audiences: [
      { id: 'adult', label: 'Adult', steps: FLOWS.adhd.adult },
      { id: 'child', label: 'Child', steps: FLOWS.adhd.child },
    ],
  },

  supportBox: SUPPORT_BOX,

  faqTitle: { lead: 'Your ADHD questions,', italic: 'answered' },
  faqs: [
    {
      id: 'child',
      question: 'Can my child have an ADHD assessment?',
      answer: `Yes, from age ${ADHD_MIN_AGE}. Our online ADHD service is open to children and young people aged ${ADHD_MIN_AGE} and over, as well as adults. Our clinical policy requires children to be at least ${ADHD_MIN_AGE} years old, so we do not offer ADHD assessments for children under ${ADHD_MIN_AGE}; if your child is younger, please speak with your GP.`,
    },
    {
      id: 'medication',
      question: 'Is medication included?',
      answer:
        'No. Nova Clinics provides diagnostic assessments and post-assessment guidance, but we do not prescribe medication or provide ongoing treatment. If you receive a diagnosis, we recommend speaking with your GP about medication.',
    },
    FAQ_GP_REFERRAL,
    FAQ_INFORMANT,
    FAQ_AFTERWARDS,
    buildCostFaq({
      question: 'How much does a private ADHD assessment cost?',
      assessmentName: 'A full ADHD assessment',
      price: ADHD_PRICE,
      results: ADHD_RESULTS,
    }),
    FAQ_ONLINE,
    FAQ_CLINICIANS,
  ],

  finalCta: buildFinalCta('Enquire about ADHD assessment'),

  schema: {
    name: 'Private ADHD assessment',
    serviceType: 'ADHD assessment',
    assessmentLabel: 'ADHD',
    price: ADHD_PRICE,
  },
}
