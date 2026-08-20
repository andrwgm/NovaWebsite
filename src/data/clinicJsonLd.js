import { SITE_ORIGIN } from '../blog/blogConfig'

/** Keep answers in sync with QuestionsAnswered.jsx SLIDES. */
export const HOME_FAQS = [
  {
    question: 'How much does an assessment cost?',
    answer:
      'A full ADHD assessment is £1,800, a full autism assessment is £2,400, and a combined autism + ADHD assessment is £3,200. Prices include all stages, from questionnaires to feedback. We offer transparent pricing with no hidden fees - contact us for full details or payment options.',
  },
  {
    question: 'Are appointments online only?',
    answer:
      'Yes, our assessments are conducted securely online via video call, making them accessible from anywhere in the UK. If you need adjustments for in-person elements, just let us know.',
  },
  {
    question: 'Who will conduct my assessment?',
    answer:
      'Your assessment is led by our expert team of HCPC-registered clinical psychologists with extensive NHS experience in neurodiversity. We take a multidisciplinary approach, compliant with NICE standards, to ensure a holistic view that honours your individuality.',
  },
  {
    question: 'Do you offer medication or treatment?',
    answer:
      'We focus on assessments, we recommend you speak with you GP about medication. ',
  },
]

export function buildHomeFaqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_ORIGIN}/#faqs`,
    url: `${SITE_ORIGIN}/#faqs`,
    mainEntity: HOME_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}
