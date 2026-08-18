import React from 'react';
import PolicyPage from './PolicyPage';

const intro = [
  'This website, novaclinics.co.uk (the “Website”), is operated by NovaClinicsUK trading as Nova Clinics UK.',
  'Cookies and similar technologies are used in accordance with the consent banner that appears on your first visit. You may accept or reject analytics cookies, and you can withdraw your choice at any time using the “Withdraw cookie consent” link in the footer.',
];

const sections = [
  {
    title: 'What are cookies?',
    body: [
      'Cookies are small text files stored in your browser that let Nova Clinics or an approved third party recognise you across visits. They help us remember preferences and deliver a secure, consistent experience on this Website.',
      'We also use similar technologies such as local storage to remember your cookie consent choice.',
    ],
  },
  {
    title: 'How we use cookies',
    body: ['Cookies and similar technologies on this Website are used to:'],
    list: [
      'Enable essential website functions.',
      'Remember whether you have accepted or rejected analytics cookies.',
      'Provide analytics so we can monitor performance — but only if you give consent.',
    ],
  },
  {
    title: 'Cookies we use',
    body: ['We currently use the following categories:'],
    list: [
      'Strictly necessary — a local storage entry (`nova_cookie_consent`) that records whether you have accepted or rejected analytics cookies. This is required to honour your choice and does not require consent.',
      'Analytics (consent required) — Google Analytics and Cloudflare Web Analytics, loaded only if you click “Accept” on the cookie banner. This helps us understand how visitors use the Website. We do not use advertising, remarketing, or behavioural profiling cookies.',
    ],
  },
  {
    title: 'Session vs. persistent cookies',
    body: [
      'Your cookie consent choice is stored in your browser as a persistent local storage entry until you clear it or withdraw consent via the footer link.',
      'Analytics cookies, if accepted, remain for the lifetime defined by the analytics provider.',
    ],
  },
  {
    title: 'Third-party technology',
    body: [
      'If you accept analytics cookies, Google Analytics and Cloudflare Web Analytics may capture anonymous usage data to help us understand how the site performs.',
      'We do not allow third-party cookies for advertising, remarketing, or behavioural profiling.',
    ],
  },
  {
    title: 'Managing cookies',
    body: [
      'When you first visit the Website, you can accept or reject analytics cookies using the banner.',
      'You can change your choice at any time by selecting “Withdraw cookie consent” in the footer, which clears your saved preference and shows the banner again.',
      'You can also delete cookies and site data in your browser settings. Guidance is available in the help pages for every major browser.',
      'If you reject analytics cookies or delete site data, the Website will continue to function, but we will not load analytics scripts.',
      'Additional guidance on cookies is available from the Information Commissioner’s Office (ICO).',
    ],
  },
  {
    title: 'Contact and compliance',
    body: [
      'Questions about this Cookie Policy can be directed to our Data Protection Officer at dpo@novaclinics.co.uk.',
      'We comply with the Privacy and Electronic Communications Regulations (PECR) as aligned with UK GDPR. Consent for non-essential cookies is specific, informed, and unambiguous; strictly necessary storage is limited to core functionality such as remembering your consent choice.',
    ],
    list: [
      'Non-essential analytics cookies are only set if you click “Accept”.',
      'You can reject analytics cookies without affecting access to the Website.',
      'Your consent choice is stored in your browser until you clear it or withdraw consent.',
      'There are no pre-ticked boxes, dark patterns, paywalls, or service denials for refusing analytics cookies.',
      'ICO registration: In progress — to be published at register.ico.org.uk.',
    ],
  },
  {
    title: 'Policy reviews',
    body: ['Last reviewed: 14 August 2026', 'Next review: 14 February 2027'],
  },
];

export default function CookiesPolicy() {
  return (
    <PolicyPage
      title="Cookie Policy"
      caption="Nova Clinics UK"
      intro={intro}
      sections={sections}
    />
  );
}
