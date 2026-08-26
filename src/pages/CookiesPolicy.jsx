import React from 'react';
import PolicyPage from './PolicyPage';

const intro = [
  'This website, novaclinics.co.uk (the “Website”), is operated by NovaClinicsUK trading as Nova Clinics UK.',
  'Cookies and similar technologies are used in accordance with the consent banner that appears on your first visit (and again when our cookie categories change). You can accept all, reject all, or choose analytics and advertising separately. You can withdraw your choice at any time using the “Withdraw cookie consent” link in the footer.',
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
      'Remember which analytics and advertising categories you have accepted or rejected.',
      'Provide analytics so we can monitor performance — but only if you give consent.',
      'Measure and improve Google Ads campaigns — but only if you give separate consent for advertising cookies.',
    ],
  },
  {
    title: 'Cookies we use',
    body: ['We currently use the following categories:'],
    list: [
      'Strictly necessary — a local storage entry (`nova_cookie_consent`) that records your analytics and advertising choices. This is required to honour your preference and does not require consent.',
      'Analytics (consent required) — Google Analytics (via Google Consent Mode v2) and Cloudflare Web Analytics. Google Analytics may send cookieless, aggregated measurement signals before you choose; full analytics cookies and detailed measurement are only enabled if you allow Analytics (Accept all, or Customise). Cloudflare Web Analytics is loaded only after Analytics is allowed.',
      'Advertising (consent required) — Google Ads cookies used for campaign measurement and conversion attribution under Google Consent Mode v2. These are only enabled if you allow Advertising. We do not build remarketing audiences from clinical page paths (for example ADHD or autism assessment pages) and we do not use Customer Match with enquiry form data.',
    ],
  },
  {
    title: 'Session vs. persistent cookies',
    body: [
      'Your cookie consent choice is stored in your browser as a persistent local storage entry until you clear it or withdraw consent via the footer link.',
      'Analytics and advertising cookies, if accepted, remain for the lifetime defined by the relevant provider.',
    ],
  },
  {
    title: 'Third-party technology',
    body: [
      'If you accept analytics cookies, Google Analytics and Cloudflare Web Analytics may capture usage data to help us understand how the site performs. Before you choose, Google Analytics may still receive limited, cookieless signals under Consent Mode to support privacy-safe measurement.',
      'If you accept advertising cookies, Google Ads may set cookies and use Consent Mode signals to measure ads and conversions. Advertising remains denied until you allow that category.',
    ],
  },
  {
    title: 'Managing cookies',
    body: [
      'When you first visit the Website (or after we change cookie categories), you can accept all, reject all, or customise analytics and advertising using the banner. Categories are not pre-ticked.',
      'You can change your choice at any time by selecting “Withdraw cookie consent” in the footer, which clears your saved preference, removes Google Analytics and Google Ads cookies from your browser where present, and shows the banner again.',
      'You can also delete cookies and site data in your browser settings. Guidance is available in the help pages for every major browser.',
      'If you reject optional cookies or delete site data, the Website will continue to function. Google Analytics and Google Ads remain in a consent-denied state for categories you refuse, and Cloudflare Web Analytics will not load without Analytics consent.',
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
      'Non-essential analytics cookies are only set if you allow Analytics.',
      'Non-essential advertising cookies are only set if you allow Advertising.',
      'You can reject optional cookies without affecting access to the Website.',
      'Your consent choice is stored in your browser until you clear it or withdraw consent.',
      'There are no pre-ticked boxes, dark patterns, paywalls, or service denials for refusing analytics or advertising cookies.',
      'ICO registration number: ZC224111 — public register at ico.org.uk/ESDWebPages/Entry/ZC224111.',
    ],
  },
  {
    title: 'Policy reviews',
    body: ['Last reviewed: 26 August 2026', 'Next review: 26 February 2027'],
  },
];

export default function CookiesPolicy() {
  return (
    <PolicyPage
      title="Cookie Policy"
      intro={intro}
      sections={sections}
    />
  );
}
