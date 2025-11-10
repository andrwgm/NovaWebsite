import React from 'react';
import PolicyPage from './PolicyPage';

const intro = [
  'This website, novaclinics.co.uk (the “Website”), is operated by NovaClinicsUK trading as Nova Clinics UK.',
  'Cookies and similar tracking technologies collect data in accordance with the consent banner that appears on your first visit. You may review or amend those choices at any time via the Privacy Settings link in the footer.',
];

const sections = [
  {
    title: 'What are cookies?',
    body: [
      'Cookies are small text files stored in your browser that let Nova Clinics or an approved third party recognise you across visits. They help us remember preferences and deliver a secure, consistent experience on this Website.',
    ],
  },
  {
    title: 'How we use cookies',
    body: ['Cookies on this Website are used to:'],
    list: ['Enable essential website functions.', 'Provide analytics so we can monitor performance.', 'Store your stated preferences.'],
  },
  {
    title: 'Session vs. persistent cookies',
    body: [
      'Nova Clinics UK uses both session cookies (which expire when you close your browser) and persistent cookies (which remain for the lifetime defined within each cookie). Session cookies keep a single visit running smoothly, while persistent cookies remember selections such as your consent choices.',
    ],
  },
  {
    title: 'Third-party technology',
    body: [
      'Third-party analytics partners may capture anonymous usage data to help us understand how the site performs. We do not allow any third-party cookies for advertising, remarketing, or behavioural profiling.',
    ],
  },
  {
    title: 'Managing cookies',
    body: [
      'You can delete cookies or block new ones in your browser settings. Guidance is available in the help pages for every major browser.',
      'If you disable cookies, certain features may not function as intended, some preferences may not be saved, and parts of the Website may display incorrectly.',
      'Additional guidance on cookies is available from the Information Commissioner’s Office (ICO).',
    ],
  },
  {
    title: 'Contact and compliance',
    body: [
      'Questions about this Cookie Policy can be directed to our Data Protection Officer at dpo@novaclinics.co.uk.',
      'We comply with the Privacy and Electronic Communications Regulations (PECR) as aligned with UK GDPR. Consent is specific, informed, and unambiguous; strictly necessary cookies remain limited to core functionality.',
    ],
    list: [
      'Granular consent is captured for every non-essential category.',
      'Withdrawal is as simple as opening “Cookie Settings” and toggling your choices.',
      'Consent logs are stored for at least six months for audit purposes.',
      'There are no pre-ticked boxes, dark patterns, paywalls, or service denials for refusing non-essential cookies.',
      'ICO registration: In progress – to be published at register.ico.org.uk.',
    ],
  },
  {
    title: 'Policy reviews',
    body: ['Last reviewed: 10 November 2025', 'Next review: 10 May 2026'],
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
