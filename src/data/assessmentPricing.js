// Single source for prices, minimum age, report timing and the enquiry messages
// of the three assessments. The home price cards and the three service pages
// (/adhd-assessment, /autism-assessment, /autism-adhd-assessment) all read from
// here so they can never disagree. Prices also live in index.html JSON-LD,
// public/llms.txt and the FAQ answers in clinicJsonLd.js / QuestionsAnswered.jsx.

export const ADHD_PRICE = {
  display: '£1,000',
  value: 1000,
  currency: 'GBP',
}

export const AUTISM_PRICE = {
  display: '£2,400',
  value: 2400,
  currency: 'GBP',
}

export const COMBINED_PRICE = {
  display: '£3,000',
  value: 3000,
  currency: 'GBP',
}

// Clinical policy: the online service is for ages 8 and above. ADHD is never
// assessed under 8. Parents of younger children can join the under-8 interest list
// (Under8InterestForm), which is only a mailing list, not a waiting list.
export const ADHD_MIN_AGE = 8
export const ASSESSMENT_MIN_AGE = 8

// The one approved sentence for the under-8 message, used everywhere it appears.
export const UNDER8_MESSAGE = `We currently assess children aged ${ASSESSMENT_MIN_AGE} and over. If your child is younger, join our interest list and we'll let you know if this changes.`

// Shared label for links to the interest list, and the in-page anchor on /contact.
export const UNDER8_LINK_LABEL = 'Join the interest list'
export const UNDER8_INTEREST_ANCHOR = 'under-8-interest'

export const ADHD_RESULTS = {
  lead: 'Approximately 10 working days',
  rest: 'after the final appointment.',
}

export const AUTISM_RESULTS = {
  lead: 'Approximately 10 working days',
  rest: 'after the final appointment.',
}

export const COMBINED_RESULTS = {
  lead: 'Approximately 15 working days',
  rest: 'after the final appointment.',
}

export const ADHD_ENQUIRY_MESSAGE =
  "\n[You're welcome to edit this message if you wish]\n\nHello, I would like to receive more information and proceed with the Full ADHD Assessment. I'd appreciate details on the next steps, timelines, and how to move forward with the assessment. Thank you."

export const AUTISM_ENQUIRY_MESSAGE =
  "\n[You're welcome to edit this message if you wish]\n\nHello, I would like to receive more information and proceed with the Full Autism Assessment. I'm interested in understanding the next steps, availability, and how to begin the assessment process. Thank you."

export const COMBINED_ENQUIRY_MESSAGE =
  "\n[You're welcome to edit this message if you wish]\n\nHello, I would like to receive more information and proceed with the Combined Autism and ADHD Assessment. I'm keen to understand the process, next steps, and how to start. Thank you."
