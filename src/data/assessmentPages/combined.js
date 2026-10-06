import { FLOWS } from '../howItWorksPathways'
import {
  ASSESSMENT_MIN_AGE,
  COMBINED_ENQUIRY_MESSAGE,
  COMBINED_PRICE,
  COMBINED_RESULTS,
} from '../assessmentPricing'
import {
  FAQ_AFTERWARDS,
  FAQ_CLINICIANS,
  FAQ_GP_REFERRAL,
  FAQ_INFORMANT,
  FAQ_ONLINE,
  INCLUDED_NOTE,
  NO_TREATMENT_NOTE,
  PATHWAYS_INTRO,
  SECTION_LINKS,
  SUPPORT_BOX,
  buildCostFaq,
  buildFinalCta,
  buildPageUrl,
} from './shared'

// Content for /autism-adhd-assessment. Steps and session times come from FLOWS.combined
// (howItWorksPathways.js, also mirrored in public/llms.txt).

const PATH = '/autism-adhd-assessment'

const UNDER_AGE_NOTE = `Our online service is for ages ${ASSESSMENT_MIN_AGE} and above. We do not assess ADHD in children under ${ASSESSMENT_MIN_AGE}, and a hybrid face-to-face autism pathway for younger children is being set up. Please speak with your GP or register your interest with our team.`

export const COMBINED_PAGE = {
  key: 'combined',
  path: PATH,
  url: buildPageUrl(PATH),

  seo: {
    title: 'Private Autism and ADHD Assessment (UK, Ages 8+) | Nova Clinics',
    description: `Private online combined autism and ADHD assessment for adults and children aged ${ASSESSMENT_MIN_AGE}+ across the UK. ${COMBINED_PRICE.display} for one integrated pathway, HCPC-registered psychologists, no GP referral needed.`,
    heroImage: '/images/combined.avif',
    heroImageAlt: 'Nova Clinics combined autism and ADHD assessment',
  },

  enquiry: {
    message: COMBINED_ENQUIRY_MESSAGE,
    itemId: 'combined',
    heroSource: 'combined_page_hero',
    finalSource: 'combined_page_final_cta',
    cta: 'Enquire about combined assessment',
  },

  hero: {
    breadcrumbLabel: 'Autism + ADHD',
    label: `Private combined pathway · Ages ${ASSESSMENT_MIN_AGE}+`,
    titleLead: 'Autism and ADHD',
    titleItalic: 'assessment',
    intro: 'Understand both profiles and how they may interact.',
    body: `One coordinated online assessment for adults and children aged ${ASSESSMENT_MIN_AGE} and over, led by HCPC-registered clinical psychologists, with one integrated outcome and practical next steps.`,
    price: COMBINED_PRICE.display,
    priceCaption: 'Your complete assessment pathway',
    priceNote: NO_TREATMENT_NOTE,
  },

  sectionLinks: SECTION_LINKS,

  included: {
    intro:
      'Your complete autism and ADHD assessment pathway includes everything you need, with no required add-ons.',
    note: INCLUDED_NOTE,
    items: [
      {
        id: 'interviews',
        icon: 'pi pi-comments',
        title: 'Autism and ADHD interviews',
        description:
          'ADI-R-informed and DIVA or ACE interviews, brought together in one coordinated pathway.',
      },
      {
        id: 'observation',
        icon: 'pi pi-eye',
        title: 'ADOS-2-informed observation',
        description:
          'A structured observation of communication, social interaction and imaginative use of materials.',
      },
      {
        id: 'questionnaires',
        icon: 'pi pi-list',
        title: 'Structured questionnaires',
        description:
          'Autism and ADHD questionnaires for you and, where relevant, others who know you well.',
      },
      {
        id: 'review',
        icon: 'pi pi-users',
        title: 'Multidisciplinary review',
        description:
          'Your evidence is reviewed by a specialist team against DSM-5 criteria for both autism and ADHD.',
      },
      {
        id: 'report',
        icon: 'pi pi-file',
        title: 'One integrated report',
        description:
          'A single written report covering both, plus an online feedback session and a post-assessment follow-up.',
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
    titleLead: 'Your combined assessment,',
    titleItalic: 'step by step',
    intro: PATHWAYS_INTRO,
    childNote: UNDER_AGE_NOTE,
    audiences: [
      { id: 'adult', label: 'Adult', steps: FLOWS.combined.adult },
      { id: 'child', label: 'Child', steps: FLOWS.combined.child },
    ],
  },

  supportBox: SUPPORT_BOX,

  faqTitle: { lead: 'Your combined questions,', italic: 'answered' },
  faqs: [
    {
      id: 'why-combined',
      question: 'Why choose a combined autism and ADHD assessment?',
      answer:
        'It suits anyone exploring both autism and ADHD. Instead of two separate pathways, one coordinated assessment brings the interviews, observation and review together, saving time and giving a unified view of your neurodivergent profile. This follows best practice from NICE and helps uncover how your traits interplay.',
    },
    {
      id: 'outcome',
      question: 'What could the outcome be?',
      answer:
        'Our multidisciplinary team reviews the evidence against the DSM-5 criteria for both autism and ADHD, so the outcome may be autism, ADHD, both or neither. Your report explains the findings clearly and includes personalised recommendations.',
    },
    {
      id: 'child',
      question: 'Can my child have a combined assessment?',
      answer: `Yes, from age ${ASSESSMENT_MIN_AGE}. Our online service is open to children and young people aged ${ASSESSMENT_MIN_AGE} and over, as well as adults. ${UNDER_AGE_NOTE}`,
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
      question: 'How much does a combined autism and ADHD assessment cost?',
      assessmentName: 'A combined autism and ADHD assessment',
      price: COMBINED_PRICE,
      results: COMBINED_RESULTS,
    }),
    FAQ_ONLINE,
    FAQ_CLINICIANS,
  ],

  finalCta: buildFinalCta('Enquire about combined assessment'),

  schema: {
    name: 'Private autism and ADHD assessment',
    serviceType: 'Combined autism and ADHD assessment',
    assessmentLabel: 'combined autism and ADHD',
    price: COMBINED_PRICE,
  },
}
