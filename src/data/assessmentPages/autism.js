import { FLOWS } from '../howItWorksPathways'
import {
  ASSESSMENT_MIN_AGE,
  AUTISM_ENQUIRY_MESSAGE,
  AUTISM_PRICE,
  AUTISM_RESULTS,
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

// Content for /autism-assessment. Steps and session times come from FLOWS.autism
// (howItWorksPathways.js, also mirrored in public/llms.txt).

const PATH = '/autism-assessment'

const UNDER_AGE_NOTE = `Our online service is for ages ${ASSESSMENT_MIN_AGE} and above. If your child is under ${ASSESSMENT_MIN_AGE}, you can join the waiting list for our upcoming in-person hybrid pathway.`

// Opens /contact with a waiting-list message and the child + waiting list boxes pre-selected.
const WAITING_LIST_ACTION = {
  label: 'Join the waiting list',
  message: `\n[You're welcome to edit this message if you wish]\n\nHello, my child is under ${ASSESSMENT_MIN_AGE} and I would like to join the waiting list for your upcoming in-person hybrid autism assessment pathway. Please let me know what information you need from me. Thank you.`,
  source: 'autism_page_waiting_list',
  itemId: 'autism',
  audience: 'child',
  waitlist: true,
}

export const AUTISM_PAGE = {
  key: 'autism',
  path: PATH,
  url: buildPageUrl(PATH),

  seo: {
    title: 'Private Autism Assessment (UK, Ages 8+) | Nova Clinics',
    description: `Private online autism assessment for adults and children aged ${ASSESSMENT_MIN_AGE}+ across the UK. ${AUTISM_PRICE.display} complete pathway, ADOS-2 and ADI-R-informed, HCPC-registered psychologists, no GP referral needed.`,
    heroImage: '/images/autism.avif',
    heroImageAlt: 'Nova Clinics autism assessment',
  },

  enquiry: {
    message: AUTISM_ENQUIRY_MESSAGE,
    itemId: 'autism',
    heroSource: 'autism_page_hero',
    finalSource: 'autism_page_final_cta',
    cta: 'Enquire about autism assessment',
  },

  hero: {
    breadcrumbLabel: 'Autism',
    label: `Online across the UK · Ages ${ASSESSMENT_MIN_AGE}+`,
    titleLead: 'Private autism',
    titleItalic: 'assessment',
    intro: 'Understand your communication, social interaction and everyday experiences.',
    body: `A thorough online assessment for adults and children aged ${ASSESSMENT_MIN_AGE} and over, led by HCPC-registered clinical psychologists, with a clear outcome and practical next steps.`,
    price: AUTISM_PRICE.display,
    priceCaption: 'Your complete assessment pathway',
    priceNote: NO_TREATMENT_NOTE,
    // Shown under the main buttons so parents of under-8s see the option straight away.
    footnote: {
      text: `If your child is under ${ASSESSMENT_MIN_AGE}, you can join the waiting list for our upcoming in-person hybrid pathway.`,
      action: { ...WAITING_LIST_ACTION, source: 'autism_page_hero_waiting_list' },
    },
  },

  sectionLinks: SECTION_LINKS,

  included: {
    intro:
      'Your complete autism assessment pathway includes everything you need, with no required add-ons.',
    note: INCLUDED_NOTE,
    items: [
      {
        id: 'observation',
        icon: 'pi pi-eye',
        title: 'ADOS-2-informed observation',
        description:
          'A structured observation of communication, social interaction and imaginative use of materials.',
      },
      {
        id: 'interview',
        icon: 'pi pi-comments',
        title: 'ADI-R-informed developmental interview',
        description:
          'A detailed interview exploring developmental history and your current presentation.',
      },
      {
        id: 'questionnaires',
        icon: 'pi pi-list',
        title: 'Questionnaires and background evidence',
        description:
          'Questionnaires for you and, where relevant, others who know you well, such as an informant or school.',
      },
      {
        id: 'review',
        icon: 'pi pi-users',
        title: 'Multidisciplinary review',
        description:
          'Your evidence is reviewed by a specialist team against DSM-5 criteria before the outcome is agreed.',
      },
      {
        id: 'report',
        icon: 'pi pi-file',
        title: 'Detailed report and follow-up',
        description:
          'A clear written outcome, an online feedback session and a post-assessment follow-up.',
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
    titleLead: 'Your autism assessment,',
    titleItalic: 'step by step',
    intro: PATHWAYS_INTRO,
    childNote: UNDER_AGE_NOTE,
    childNoteAction: WAITING_LIST_ACTION,
    audiences: [
      { id: 'adult', label: 'Adult', steps: FLOWS.autism.adult },
      { id: 'child', label: 'Child', steps: FLOWS.autism.child },
    ],
  },

  supportBox: SUPPORT_BOX,

  faqTitle: { lead: 'Your autism questions,', italic: 'answered' },
  faqs: [
    {
      id: 'child',
      question: 'Can my child have an autism assessment?',
      answer: `Yes, from age ${ASSESSMENT_MIN_AGE}. Our online autism service is open to children and young people aged ${ASSESSMENT_MIN_AGE} and over, as well as adults. ${UNDER_AGE_NOTE}`,
    },
    {
      id: 'treatment',
      question: 'Do you offer treatment after an autism assessment?',
      answer:
        'Nova Clinics provides diagnostic assessments and post-assessment guidance, but we do not provide ongoing treatment or prescribe medication. Your report includes tailored recommendations, and we signpost resources for therapy, coaching or community groups. A post-assessment follow-up session is available up to four weeks after your feedback session.',
    },
    FAQ_GP_REFERRAL,
    FAQ_INFORMANT,
    FAQ_AFTERWARDS,
    buildCostFaq({
      question: 'How much does a private autism assessment cost?',
      assessmentName: 'A full autism assessment',
      price: AUTISM_PRICE,
      results: AUTISM_RESULTS,
    }),
    FAQ_ONLINE,
    FAQ_CLINICIANS,
  ],

  finalCta: buildFinalCta('Enquire about autism assessment'),

  schema: {
    name: 'Private autism assessment',
    serviceType: 'Autism assessment',
    assessmentLabel: 'autism',
    price: AUTISM_PRICE,
  },
}
