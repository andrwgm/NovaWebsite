import React from 'react';
import PolicyPage from './PolicyPage';

const intro = [
  'This website, novaclinics.co.uk (the “Website”), is operated by NovaClinicsUK trading as Nova Clinics UK.',
  'Cookies and similar technologies are used in accordance with the consent banner that appears on your first visit (and again when our cookie categories change). You can accept all, reject all, or choose analytics, advertising, and campaign statistics separately. You can withdraw your choice at any time using the “Withdraw cookie consent” link in the footer.',
];

const sections = [
  {
    title: 'What are cookies?',
    body: [
      'Cookies are small text files stored in your browser that let Nova Clinics or an approved third party recognise you across visits. They help us remember preferences and deliver a secure, consistent experience on this Website.',
      'We also use similar technologies such as local storage to remember your cookie consent choice, and session storage to keep first-party campaign statistics with an enquiry you may send.',
    ],
  },
  {
    title: 'How we use cookies',
    body: ['Cookies and similar technologies on this Website are used to:'],
    list: [
      'Enable essential website functions, including remembering your cookie choice.',
      'Keep first-party campaign statistics (UTMs, landing page, and referring website) with an enquiry you submit, unless you opt out.',
      'Remember which analytics and advertising categories you have accepted or rejected.',
      'Provide analytics so we can monitor performance — but only if you give consent.',
      'Measure and improve Google Ads and Meta (Facebook and Instagram) campaigns — but only if you give separate consent for advertising cookies. Advertising click IDs (gclid, gbraid, wbraid, fbclid) are only stored with an enquiry if you allow Advertising.',
      'The Website also records an aggregate hit count per public blog article on our own servers. That count does not use a cookie, local storage, or a visitor identifier, and it is not shown on the public site.',
    ],
  },
  {
    title: 'Cookies we use',
    body: ['We currently use the following categories:'],
    list: [
      'Strictly necessary — a local storage entry (`nova_cookie_consent`) that records your analytics, advertising, and campaign-statistics choices. This is required to honour your preference and does not require consent.',
      'Campaign statistics (on by default; free opt-out) — a session storage entry (`nova_enquiry_attribution`) that keeps first-party UTMs, the first page of this visit, the page you were on when you sent an enquiry, and the referring website, so we can attach them to an enquiry you submit. This uses the PECR exemption for first-party statistical purposes. It is not sent to Google or Meta from the form. You can opt out in the cookie banner (Customise). If you opt out, we do not store these fields.',
      'Analytics (consent required) — Google Analytics (via Google Consent Mode v2) and Cloudflare Web Analytics. Google Analytics may send cookieless, aggregated measurement signals before you choose; full analytics cookies and detailed measurement are only enabled if you allow Analytics (Accept all, or Customise). Cloudflare Web Analytics is loaded only after Analytics is allowed.',
      'Advertising (consent required) — Google Ads cookies and the Meta Pixel, used for campaign measurement and conversion attribution. These are only enabled if you allow Advertising. We do not build remarketing audiences from clinical page paths (for example ADHD or autism assessment pages), we do not use Google Customer Match or Meta Automatic Advanced Matching with enquiry form data, and we do not send name, email, phone, or message from the contact form to advertising platforms. Advertising click IDs (gclid, gbraid, wbraid, fbclid) from the landing URL are only stored with an enquiry if you allow this category.',
    ],
  },
  {
    title: 'Session vs. persistent cookies',
    body: [
      'Your cookie consent choice is stored in your browser as a persistent local storage entry until you clear it or withdraw consent via the footer link.',
      'First-party campaign statistics, if not opted out, are stored in session storage for this visit only and are cleared when you close the tab.',
      'Analytics and advertising cookies, if accepted, remain for the lifetime defined by the relevant provider.',
    ],
  },
  {
    title: 'Third-party technology',
    body: [
      'If you accept analytics cookies, Google Analytics and Cloudflare Web Analytics may capture usage data to help us understand how the site performs. Before you choose, Google Analytics may still receive limited, cookieless signals under Consent Mode to support privacy-safe measurement.',
      'If you accept advertising cookies, Google Ads and Meta may set cookies and use consent signals to measure ads and conversions. Advertising remains denied until you allow that category. The Meta Pixel is loaded in a consent-revoked state until Advertising is allowed, and Automatic Advanced Matching is disabled so form fields are not scraped.',
    ],
  },
  {
    title: 'Managing cookies',
    body: [
      'When you first visit the Website (or after we change cookie categories), you can accept all, reject all, or customise analytics, advertising, and campaign statistics using the banner. Analytics and advertising are not pre-ticked. Campaign statistics are on by default; you can untick them to opt out.',
      'Reject all turns off analytics and advertising cookies. Campaign statistics stay on unless you opt out in Customise.',
      'You can change your choice at any time by selecting “Withdraw cookie consent” in the footer, which clears your saved preference, removes Google Analytics, Google Ads, and Meta Pixel cookies from your browser where present, and shows the banner again.',
      'You can also delete cookies and site data in your browser settings. Guidance is available in the help pages for every major browser.',
      'If you reject optional cookies, opt out of campaign statistics, or delete site data, the Website will continue to function. Google Analytics, Google Ads, and Meta remain in a consent-denied state for categories you refuse, and Cloudflare Web Analytics will not load without Analytics consent.',
      'Additional guidance on cookies is available from the Information Commissioner’s Office (ICO).',
    ],
  },
  {
    title: 'Contact and compliance',
    body: [
      'Questions about this Cookie Policy can be directed to our Data Protection Officer at dpo@novaclinics.co.uk.',
      'We comply with the Privacy and Electronic Communications Regulations (PECR) as aligned with UK GDPR. Consent for non-essential cookies is specific, informed, and unambiguous. Strictly necessary storage is limited to remembering your consent choice. First-party campaign statistics use the PECR statistical-purposes exemption, with a free opt-out in the banner.',
    ],
    list: [
      'Non-essential analytics cookies are only set if you allow Analytics.',
      'Non-essential advertising cookies are only set if you allow Advertising. Advertising click IDs are only stored with an enquiry if you allow Advertising.',
      'Campaign statistics can be turned off in Customise without affecting access to the Website.',
      'You can reject optional cookies without affecting access to the Website.',
      'Your consent choice is stored in your browser until you clear it or withdraw consent.',
      'There are no pre-ticked boxes, dark patterns, paywalls, or service denials for refusing analytics or advertising cookies. Campaign statistics are on by default because they use an opt-out exemption, not consent.',
      'ICO registration number: ZC224111 — public register at ico.org.uk/ESDWebPages/Entry/ZC224111.',
    ],
  },
  {
    title: 'Policy reviews',
    body: ['Last reviewed: 23 September 2026', 'Next review: 23 March 2027'],
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
