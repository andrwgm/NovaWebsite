import React from 'react';
import PolicyPage from './PolicyPage';

const intro = [
  'Nova Clinics UK (NovaClinicsUK, "Nova Clinics") provides private-pay neurodevelopmental diagnostic assessments, including autism, ADHD and combined assessments, for children aged 8 and over and adults across the UK.',
  'This notice explains how we handle your personal information whenever you contact us, complete our referral form, visit the Website, use our patient portal, or receive our services.',
];

const sections = [
  {
    title: 'Applicable law',
    body: [
      'Nova Clinics handles personal data in line with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018. We take appropriate steps to safeguard your privacy and personal information.',
    ],
  },
  {
    title: 'Our contact details',
    body: [
      'Name: NovaClinicsUK',
      'Trading name: Nova Clinics UK',
      'Address: 82a James Carter Road, Mildenhall, Bury St Edmunds, IP28 7DE, UK',
      'Company number: 16344901',
      'ICO registration number: ZC224111 (registered 17 August 2026; listed at ico.org.uk/ESDWebPages/Entry/ZC224111)',
      'General enquiries: team@novaclinics.co.uk',
      'We are the controller of your personal data and decide why and how it is used and shared.',
    ],
  },
  {
    title: 'Data Protection Officer',
    body: [
      'Our Data Protection Officer (DPO) monitors compliance with data protection rules. You can reach them at dpo@novaclinics.co.uk for any privacy-related query or concern.',
    ],
  },
  {
    title: 'How we obtain information from you',
    body: ['We collect personal information directly when you:'],
    list: [
      'Submit an enquiry or contact form on the Website, or email us. When you send an enquiry through the Website, we also save details of how you arrived at the Website (see "How we record where enquiries come from").',
      'Complete our referral form, which helps us decide whether our service is the right fit before any payment is taken.',
      'Join our interest list for assessments for children under 8.',
      'Book or proceed with a private-pay autism, ADHD or combined assessment (for clinical delivery, service management, audits, complaint handling and evidence within investigations).',
      'Create or use a patient portal account, complete questionnaires or consent forms, upload documents, send messages or manage your profile.',
      'Make a payment through Stripe Checkout (including a first payment that unlocks portal questionnaires, and any remaining balance collected before we book an assessment appointment).',
      'Sign up to our blog newsletter.',
      'Apply for a role through our careers pages.',
      'Submit a complaint about our services or about how we handle your data.',
    ],
  },
  {
    title: 'Information we receive from others',
    body: ['We also receive data from trusted partners so that your assessment is safe and joined-up:'],
    list: [
      'Your GP practice or other NHS health and care organisations, where you ask us to liaise with them or where you have given consent for us to share information.',
      'Family members, carers or informants supporting the assessment.',
      "Your child's school or another relevant setting, where needed for the assessment.",
      "Local authority children's or adult services, where safeguarding duties apply or where a child is in the care of the local authority.",
    ],
  },
  {
    title: 'Personal information we collect',
    body: ['We process the following personal data:'],
    list: [
      'Personal identifiers and contact details (name, preferred name, pronouns, date of birth, contact information and postcode). At onboarding we also collect your full address, NHS number and GP details.',
      'Referral form answers, including information about health, wellbeing, current support, family and legal circumstances, and any adjustments you need.',
      'Account and portal activity (profile information, form responses, uploaded documents, appointment details and messages with our team).',
      'Payment and billing records associated with your assessment (amounts, dates, payment status and Stripe identifiers). We do not store your full card or bank details. If you pay with PayPal or Klarna, those providers process payment data under their own notices. Any pay-later option they show (for example Pay in 3) is offered only if they consider you eligible; we do not decide that.',
      'Recruitment information submitted with job applications (such as CVs, cover letters and application answers).',
      'Cookie and similar technology data captured under the Cookie Policy, based on your consent where required.',
      'Technical information (device details, IP address, browser type and version, time zone, operating system, page response times, interaction data and exit routes).',
      'Usage and activity data showing how you use the Website and resources.',
      'Enquiry source information, saved with an enquiry you send through the Website: campaign details in the web address you arrived from (utm_source, utm_medium, utm_campaign, utm_content, utm_term), advert click identifiers (gclid, gbraid, wbraid, fbclid, only if you have accepted advertising cookies), the first page you visited, the page you sent the enquiry from, the website that referred you, the date and time, and a label we create describing the source (Google Ads, Meta Ads, organic, direct, referral or unknown). Where a detail does not exist, it is left empty.',
    ],
  },
  {
    title: 'Special category data',
    body: [
      'We do not collect GPS or other location data. We do process health-related and other special category data where required for your referral, assessment and care pathway:',
    ],
    list: [
      'Health information such as referral form answers, assessment notes, observations, diagnosis, appointments and clinical correspondence.',
      'Video recordings and transcripts of all assessment appointments, conducted via Google Meet from our Google Workspace. Recording is a condition of our service, because it supports accurate clinical documentation, the safety of everyone taking part, clinical supervision and quality assurance. Everyone who joins an appointment, including parents, carers and family members, is recorded and must keep their camera on throughout. Google Meet notifies participants when a meeting is being recorded.',
      'Other special category information (such as racial or ethnic origin, religious or philosophical beliefs, or sex life and sexual orientation) only where it appears in the information you or others provide and is clinically relevant to the assessment.',
    ],
  },
  {
    title: 'Pseudonymised and codified data',
    body: [
      'Where applicable, we may share pseudonymised or coded datasets with authorised NHS commissioning bodies or research partners for service evaluation, invoicing or peer-reviewed research. Individuals cannot be re-identified from the statistics we publish.',
      'Although our services are currently delivered on a private-pay basis, we may engage in NHS-commissioned or research activities in future. Where that applies, this section will govern those uses.',
    ],
  },
  {
    title: 'How we use your information',
    body: ['Personal information is used to:'],
    list: [
      'Review your referral form and decide whether our service is the right fit. Every referral is reviewed by our Clinical Lead.',
      'Deliver autism, ADHD and combined assessments and issue diagnostic reports.',
      'Provide included follow-up support, including the post-assessment session where offered as part of your pathway.',
      'Manage bookings, appointments, questionnaires, documents and communication through our patient portal and by email or telephone.',
      'Control access to portal questionnaires until a required first payment has completed.',
      'Confirm that any remaining balance is paid before we book an assessment appointment, and that the published fee is paid in full before we issue the diagnostic report.',
      'Process payments and issue receipts through Stripe Checkout.',
      'Let you know when our assessments for children under 8 become available, if you have joined our interest list.',
      'Provide relevant information, resources or offers (you may opt out at any time).',
      'Send evaluation questionnaires or service updates by email or through the patient portal (opt-out available).',
      'Assess and manage job applications.',
      'Administer the Website, troubleshoot issues, analyse usage and improve services.',
      'Keep our systems secure.',
      'Generate anonymised statistics for clinical audit and service development.',
      'Count how many times each public blog article is opened, as an aggregate number per article. We do not store a visitor identifier, cookie or IP address for that count.',
    ],
  },
  {
    title: 'Automated decision-making',
    body: [
      'Our referral form highlights answers that may need a closer look, but it does not make decisions about you. Every decision about whether we can offer an assessment is made by our Clinical Lead. We do not make decisions about you based solely on automated processing.',
    ],
  },
  {
    title: 'How we record where enquiries come from',
    body: [
      "When you arrive on our Website, we note the campaign details already in the web address (UTM tags), the page you land on, and the website that referred you, if any. These details are kept in your browser's session storage (nova_enquiry_attribution) for that visit only, and are deleted when you close the tab. We keep the details from the start of your visit and do not overwrite them as you browse.",
      'If you have accepted advertising cookies, we also keep any advert click identifier in the web address (gclid, gbraid, wbraid or fbclid). If you have not, we do not store them.',
      'If you then send us an enquiry, these details are saved with your enquiry in our secure database in AWS London. If you do not send an enquiry, nothing is saved.',
      'We use this information only for our own statistics: to understand which campaigns, pages or websites lead people to contact us, so we can improve our Website and how we reach people. We do not send it, or your email address, phone number or message, to Google Analytics, Google Ads or Meta, and we do not use it for remarketing, Customer Match or Automatic Advanced Matching.',
      'You can switch this off at any time, free of charge, in our cookie settings ("Website statistics"). The Website and contact form work the same either way.',
      'We rely on legitimate interests for this, and keep it with your enquiry, usually for up to 12 months. More detail is in our Cookie Policy.',
    ],
  },
  {
    title: 'Who we share information with',
    body: ['We may share your information with:'],
    list: [
      'Your NHS GP practice, local NHS hospital or mental health service, where you have asked us to share information or have given your consent.',
      'Schools, informants or other contacts you provide, where needed for the assessment. Nova Clinics may contact them directly on your behalf.',
      'Clinicians in our multidisciplinary team, care coordinators, and other staff or sub-contractors involved in delivering your assessment.',
      'Service providers that help us operate securely, including hosting, email, video conferencing, analytics, advertising measurement (where you consent) and payment processing (see "Service providers and international transfers").',
      'Integrated Care Boards, local authorities or emergency services for safeguarding or statutory reporting, where the law requires it or where there is a serious risk of harm.',
      'Courts or regulators when the law requires it.',
    ],
  },
  {
    title: 'Service providers and international transfers',
    body: [
      'Clinical and portal data are hosted in AWS London (UK). We use approved service providers to deliver our services, including:',
    ],
    list: [
      'Amazon Web Services (AWS): hosting (including enquiries and enquiry source information), email delivery from the UK, and first-party aggregate blog view counts (no visitor identifier).',
      'Cloudflare: website delivery and security, including Turnstile bot protection on the contact form. Cloudflare Web Analytics is used only where you consent to analytics cookies.',
      'Google Analytics: website analytics under Google Consent Mode v2 (only where you consent to analytics cookies).',
      'Google Ads: advertising measurement and conversion attribution under Google Consent Mode v2 (only where you consent to advertising cookies). We do not use clinical-path remarketing audiences or Customer Match with enquiry or referral form data.',
      'Meta (Facebook and Instagram): advertising measurement and conversion attribution via the Meta Pixel (only where you consent to advertising cookies). We do not use Automatic Advanced Matching, we do not send enquiry or referral form emails or phone numbers to Meta, and we do not build remarketing audiences from clinical page paths.',
      'Google Workspace: email (Gmail), video appointments (Google Meet), meeting recordings and transcripts, and internal business documents.',
      'Stripe: payment processing (Checkout), receipts and related fraud prevention. We receive confirmation that a payment succeeded or failed, not your full card number.',
    ],
    bodyAfterList: [
      'Some of these providers may process limited personal data outside the UK. Where that happens, we rely on appropriate safeguards such as the UK International Data Transfer Agreement, adequacy regulations or equivalent contractual protections.',
    ],
  },
  {
    title: 'Public interest disclosures',
    body: [
      'If serious crime or a risk to children or adults at risk outweighs confidentiality, we will share information on a documented, case-by-case basis.',
    ],
  },
  {
    title: 'Our lawful bases (Article 6 UK GDPR)',
    body: ['Depending on the activity, we rely on:'],
    list: [
      'Consent: for example cookies, marketing communications, newsletter sign-up, our under-8 interest list, sharing reports with your GP where requested, and some optional processing.',
      'Contract, or steps taken at your request before entering a contract: reviewing your referral form, fulfilling your assessment (including recording appointments), collecting fees through Stripe Checkout, and operating the patient portal (including payment status that gates questionnaires and booking).',
      'Legal obligation: such as safeguarding reports or regulatory duties.',
      'Legitimate interests: including service improvement, fraud prevention, recruitment administration, providing relevant neurodevelopmental resources, and recording where enquiries come from (balanced against your rights).',
    ],
  },
  {
    title: 'Our lawful bases for special category data (Article 9 UK GDPR)',
    list: [
      'Provision of health or social care under UK law (Data Protection Act 2018, section 10 and Schedule 1, Part 1). This covers your referral form, assessment and appointment recordings.',
      'Safeguarding of children and individuals at risk (Data Protection Act 2018, Schedule 1, Part 2), where relevant.',
      'Explicit consent, where required for specific optional processing, such as some sharing with third parties.',
      'Archiving, research and statistics with a legal basis, where applicable.',
    ],
  },
  {
    title: 'Children, young people and adults',
    list: [
      'Parental responsibility: for children and young people under 18, the referral and assessment are arranged and managed by a parent or guardian with parental responsibility, even where the patient portal profile relates to the child. We ask you to confirm that you have parental responsibility.',
      "Young people aged 16 and 17 are presumed able to make their own decisions about their care. We ask for their own agreement on the referral form and their own consent to the assessment, alongside their parent or carer's involvement.",
      'Gillick competence: where a young person under 16 shows sufficient understanding, we may rely on their consent for specific matters in addition to parental involvement. Our clinician records this.',
      "Children in the care of a local authority: we will need the local authority's agreement before an assessment goes ahead.",
      'Adults aged 18 and over manage their own referral, assessment and account, although they may choose to involve family members for support.',
      'Safeguarding overrides: we will share data without consent if required to protect a child, young person or others from serious harm. Where it is safe to do so, we will talk to you first.',
    ],
  },
  {
    title: 'Data security and storage',
    list: [
      'All data is encrypted at rest and in transit (AES-256, TLS 1.3).',
      'Access is strictly role-based and audited.',
      'Clinical records, referral forms and recordings are stored in the UK.',
      'Any personal data breach that must be reported is reported to the ICO within 72 hours, and to affected individuals without undue delay where there is a high risk to them.',
    ],
  },
  {
    title: 'How long we keep information',
    body: [
      'We follow the general health record periods in the NHS Records Management Code of Practice 2023. After each period, information is securely deleted or fully anonymised.',
    ],
    table: {
      headers: ['Information', 'How long we keep it'],
      rows: [
        ['Adult health records', '8 years from the date of last contact'],
        [
          'Child and young person health records',
          'Until the 25th birthday (26th if the young person was 17 at last contact)',
        ],
        [
          'Appointment recordings',
          '90 days after the final report or last appointment, whichever is later. Longer only while a complaint, legal or safeguarding matter is open, and we will tell you',
        ],
        [
          'Referral forms where we could not offer an assessment',
          'Kept as part of the health record, for the same periods as adult and child health records above',
        ],
        ['Referral forms started but not submitted', '30 days after last activity'],
        [
          'Under-8 interest list',
          'Until we contact you about the new service, or 24 months, whichever is sooner. You can unsubscribe at any time',
        ],
        [
          'Website enquiries and general correspondence (including enquiry source information)',
          'Up to 12 months, unless needed longer for an active enquiry or dispute',
        ],
        ['Payment and invoice records', '6 years after the end of the financial year'],
        [
          'Recruitment records for unsuccessful applicants',
          'Up to 6 months, unless you have given separate consent to remain in a talent pool',
        ],
        [
          'Cookie consent preferences',
          'Stored in your browser until you clear them or withdraw consent via the Website footer. When we change cookie categories (for example adding advertising), you will be asked again',
        ],
      ],
    },
  },
  {
    title: 'Consent and opt-outs',
    body: [
      'You can withdraw consent or opt out of marketing, newsletters, our interest list or non-essential communications at any time by emailing team@novaclinics.co.uk.',
      'Where another lawful basis applies, we may continue to process historical data to meet regulatory, contractual or safeguarding duties.',
    ],
  },
  {
    title: 'National data opt-out',
    body: [
      'Where we use confidential patient information for research or planning purposes that fall within the national data opt-out framework, we will honour the national data opt-out. Visit www.nhs.uk/your-nhs-data-matters to exercise this option.',
      'This applies where relevant, for example if we take part in NHS-commissioned or research activities in future.',
    ],
  },
  {
    title: 'Your data protection rights',
    body: ['You may exercise the following rights (subject to legal limits):'],
    list: [
      'Access (Subject Access Request, free of charge, responded to within one month).',
      'Rectification.',
      'Erasure, where lawful.',
      'Restriction.',
      'Objection.',
      'Data portability.',
    ],
  },
  {
    title: 'Submit a request',
    body: [
      'Send your request with proof of ID to dpo@novaclinics.co.uk. You can use the ICO templates at ico.org.uk/sar.',
    ],
  },
  {
    title: 'How to complain',
    body: [
      'For privacy or data protection concerns, contact dpo@novaclinics.co.uk in the first instance.',
      'For general service complaints, contact team@novaclinics.co.uk.',
      "If unresolved, you may escalate to the Information Commissioner's Office (ICO): Wycliffe House, Water Lane, Wilmslow, Cheshire SK9 5AF, helpline 0303 123 1113, ico.org.uk. Our ICO registration number is ZC224111.",
    ],
  },
  {
    title: 'Review cycle',
    body: [
      'Date of last review: 23/9/26',
      'Next review due: 6 months from the date of last review.',
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <PolicyPage
      title="Privacy Policy"
      caption="Nova Clinics UK"
      intro={intro}
      sections={sections}
    />
  );
}
