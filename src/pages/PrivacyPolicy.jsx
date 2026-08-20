import React from 'react';
import PolicyPage from './PolicyPage';

const intro = [
  'Nova Clinics UK (NovaClinicsUK, “Nova Clinics”) provides private-pay neurodevelopmental diagnostic assessments — including autism, ADHD, and combined assessments — for children and adults across the UK.',
  'This notice explains how we handle your personal information whenever you contact us, visit the Website, use our patient portal, or receive our services.',
];

const sections = [
  {
    title: 'Applicable law',
    body: [
      'Nova Clinics handles personal data under English law and, where relevant, retained EU law (UK GDPR). We take appropriate steps to safeguard your privacy and personal information.',
    ],
  },
  {
    title: 'Our contact details',
    body: [
      'Name: NovaClinicsUK',
      'Trading name: Nova Clinics UK',
      'Address: 82a James Carter Road, Mildenhall, Bury St. Edmunds, IP28 7DE, UK',
      'Company number: 16344901',
      'ICO registration number: ZC224111 (registered 17 August 2026; listed at ico.org.uk/ESDWebPages/Entry/ZC224111).',
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
      'Submit an enquiry or contact form on the Website.',
      'Book or proceed with a private-pay autism, ADHD, or combined assessment (for clinical delivery, service management, audits, complaint handling, and evidence within investigations).',
      'Create or use a patient portal account, complete questionnaires or consent forms, upload documents, send messages, or manage your profile.',
      'Make a payment through our payment provider.',
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
      'Family members, carers, or informants supporting the assessment.',
      'Your child’s school or another relevant setting, where needed for the assessment.',
      'Local Authority Safeguarding Teams, where safeguarding duties apply.',
    ],
  },
  {
    title: 'Personal information we collect',
    body: ['We process the following personal data:'],
    list: [
      'Personal identifiers and contact details (name, date of birth, contact information, NHS number, address, and GP details where provided).',
      'Account and portal activity (profile information, form responses, uploaded documents, appointment details, and messages with our team).',
      'Payment and billing information processed through our payment provider (we do not store your full card or bank details).',
      'Recruitment information submitted with job applications (such as CVs, cover letters, and application answers).',
      'Cookie and similar technology data captured under the Cookie Policy, based on your consent where required.',
      'Technical information (device details, IP address, browser type/version, time zone, operating system, page response times, interaction data, and exit routes).',
      'Usage and activity data showing how you use the Website and resources.',
    ],
  },
  {
    title: 'Special category data',
    body: [
      'We do not collect GPS or other location data. We do process health-related and other special category data where required for your assessment and care pathway:',
    ],
    list: [
      'Health information such as assessment notes, observations, diagnosis, appointments, and clinical correspondence.',
      'Recordings and transcripts of video appointments conducted via Google Meet, initiated from our Google Workspace, to support clinical documentation, quality assurance, and training. Google Meet notifies participants when a meeting is being recorded.',
      'Other special category information — such as racial or ethnic origin, religious or philosophical beliefs, or sex life and sexual orientation — only where it appears in the information you or others provide and is clinically relevant to the assessment.',
    ],
  },
  {
    title: 'Pseudonymised and codified data',
    body: [
      'Where applicable, we may share pseudonymised or coded datasets with authorised NHS commissioning bodies or research partners for service evaluation, invoicing, or peer-reviewed research. Individuals cannot be re-identified from the statistics we publish.',
      'Although our services are currently delivered on a private-pay basis, we may engage in NHS-commissioned or research activities in future. Where that applies, this section will govern those uses.',
    ],
  },
  {
    title: 'How we use your information',
    body: ['Personal information is used to:'],
    list: [
      'Deliver autism, ADHD, and combined assessments and issue diagnostic reports.',
      'Provide included follow-up support, including the post-assessment session where offered as part of your pathway.',
      'Manage bookings, appointments, questionnaires, documents, and communication through our patient portal and by email or telephone.',
      'Process payments and issue receipts through our payment provider.',
      'Provide relevant information, resources, or offers (you may opt out at any time).',
      'Send evaluation questionnaires or service updates by email or through the patient portal (opt-out available).',
      'Assess and manage job applications.',
      'Administer the Website, troubleshoot issues, analyse usage, and improve services.',
      'Keep our systems secure.',
      'Generate anonymised statistics for clinical audit and service development.',
    ],
  },
  {
    title: 'Who we share information with',
    body: ['We may share your information with:'],
    list: [
      'Your NHS GP practice, local NHS hospital, or mental health service, where you have asked us to share information or have given your consent.',
      'Schools, informants, or other contacts you provide, where needed for the assessment. Nova Clinics may contact them directly on your behalf.',
      'Clinicians, care coordinators, and other staff or sub-contractors involved in delivering your assessment.',
      'Service providers that help us operate securely, including hosting, email, video conferencing, analytics, and payment processing (see “Service providers and international transfers”).',
      'Integrated Care Boards or Local Authorities for safeguarding or statutory reporting, where the law requires it.',
      'Courts or regulators when the law requires it.',
    ],
  },
  {
    title: 'Service providers and international transfers',
    body: [
      'Clinical and portal data are hosted in AWS London (UK). We use approved service providers to deliver our services, including:',
    ],
    list: [
      'Amazon Web Services (AWS) — hosting and email delivery from the UK.',
      'Cloudflare — website delivery, security, and analytics (only where you consent to analytics cookies).',
      'Google Workspace — video appointments (Google Meet), meeting recordings and transcripts, and internal business documents.',
      'Stripe — payment processing and receipts.',
    ],
    bodyAfterList: [
      'Some of these providers may process limited personal data outside the UK. Where that happens, we rely on appropriate safeguards such as the UK International Data Transfer Agreement, adequacy regulations, or equivalent contractual protections.',
    ],
  },
  {
    title: 'Public interest disclosures',
    body: [
      'If serious crime or risk to children or vulnerable individuals outweighs confidentiality, we will share information on a documented, case-by-case basis.',
    ],
  },
  {
    title: 'Our lawful bases (Art. 6 UK GDPR)',
    body: ['Depending on the activity we rely on:'],
    list: [
      'Consent — e.g. cookies, marketing communications, newsletter sign-up, sharing reports with your GP where requested, and some optional processing.',
      'Contract — fulfilling your assessment booking and delivering our services.',
      'Legal obligation — such as safeguarding reports or regulatory duties.',
      'Legitimate interests — including service improvement, fraud prevention, recruitment administration, and providing relevant neurodevelopmental resources (balanced against your rights).',
    ],
  },
  {
    title: 'Our lawful bases for special category data (Art. 9 UK GDPR)',
    list: [
      'Provision of health or social care under UK law (DPA 2018, s10 & Sch 1, Part 1).',
      'Explicit consent, where required for specific processing such as some sharing or recording arrangements.',
      'Archiving, research, and statistics with a legal basis, where applicable.',
    ],
  },
  {
    title: 'Children, young people, and adults',
    list: [
      'Parental responsibility: for children and young people under 18, assessments are arranged and managed by a parent or guardian with parental responsibility, even where the patient portal profile relates to the child.',
      'Adults aged 18 and over manage their own assessment and account, although they may choose to involve family members for support.',
      'Gillick competence: where a young person shows sufficient understanding, we may rely on their consent for specific matters in addition to parental involvement.',
      'Safeguarding overrides: we will share data without consent if required to protect the child, young person, or others.',
    ],
  },
  {
    title: 'Data security & storage',
    list: [
      'All data is encrypted at rest and in transit (AES-256, TLS 1.3).',
      'Access is strictly role-based and audited.',
      'Clinical records are hosted in AWS London.',
      'Any personal data breach is reported to the ICO within 72 hours and to affected individuals without undue delay where high risk exists.',
    ],
  },
  {
    title: 'How long we keep information',
    list: [
      'Child health records: we follow the Records Management Code of Practice 2021 — records are retained until the patient’s 25th birthday (or 26th if the record was created at age 17) and then securely destroyed.',
      'Adult health records: retained for eight years from the date of last contact or treatment, then securely destroyed.',
      'Recruitment records for unsuccessful applicants: retained for up to six months, unless you have given separate consent to remain in a talent pool.',
      'Website enquiries and general correspondence: typically up to twelve months, unless needed longer for an active enquiry or dispute.',
      'Cookie consent preferences: stored in your browser until you clear them or withdraw consent via the Website footer.',
    ],
  },
  {
    title: 'Consent and opt-outs',
    body: [
      'You can withdraw consent or opt out of marketing, newsletters, or non-essential communications at any time by emailing dpo@novaclinics.co.uk.',
      'Where another lawful basis applies, we may continue to process historical data to meet regulatory, contractual, or safeguarding duties.',
    ],
  },
  {
    title: 'National data opt-out',
    body: [
      'Where we use confidential patient information for research or planning purposes that fall within the national data opt-out framework, we will honour the national data opt-out. Visit www.nhs.uk/your-nhs-data-matters to exercise this option.',
      'This applies where relevant — for example, if we participate in NHS-commissioned or research activities in future.',
    ],
  },
  {
    title: 'Your data protection rights',
    body: ['You may exercise the following rights (subject to legal limits):'],
    list: [
      'Access (Subject Access Request — free of charge, responded to within one month).',
      'Rectification.',
      'Erasure where lawful.',
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
      'If unresolved, you may escalate to the Information Commissioner’s Office (ICO): Wycliffe House, Water Lane, Wilmslow, Cheshire SK9 5AF, helpline 0303 123 1113, ico.org.uk. Our ICO registration number is ZC224111.',
    ],
  },
  {
    title: 'Review cycle',
    body: ['Date of last review: 20 August 2026', 'Next review due: 20 February 2027 (bi-annual cycle).'],
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
