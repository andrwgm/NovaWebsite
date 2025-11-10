import React from 'react';
import PolicyPage from './PolicyPage';

const intro = [
  'Nova Clinics UK (NovaClinicsUK, “Nova Clinics”) provides private-pay ASD assessment services for children and young people up to age 18.',
  'This notice explains how we handle your personal information whenever you contact us, visit the Website, or use our services.',
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
      'Address: 128 City Road, London, EC1V 2NX, UK',
      'Company number: 16344901',
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
      'Seek a private-pay ASD assessment for your child (for clinical delivery, service management, audits, complaint handling, and evidence within investigations).',
      'Sign up to our newsletter or parent participation group.',
      'Submit a complaint.',
    ],
  },
  {
    title: 'Information we receive from others',
    body: ['We also receive data from trusted partners so that your child’s assessment is safe and joined-up:'],
    list: [
      'Your GP practice or other NHS health and care organisations involved in your child’s care.',
      'Family members or carers supporting the assessment.',
      'Your child’s school.',
      'Local Authority Safeguarding Teams.',
    ],
  },
  {
    title: 'Personal information we collect',
    body: ['We process the following personal data:'],
    list: [
      'Personal identifiers and contact details (name, date of birth, contact information, NHS number).',
      'Cookie data captured under the Cookie Policy, based on your consent.',
      'Technical information (device details, IP address, browser type/version, time zone, plug-ins, operating system, page response times, interaction data, and exit routes).',
      'Usage and activity data showing how you use the Website and resources.',
    ],
  },
  {
    title: 'Special category data',
    body: [
      'We do not collect GPS or other location data. We do process the following special category data where required:',
    ],
    list: [
      'Health information such as assessment notes, observations, diagnosis, and appointments.',
      'Racial or ethnic origin.',
      'Sex life and sexual orientation data where clinically relevant.',
      'Religious or philosophical beliefs.',
      'Recordings of video calls with the clinical team for quality, training, and verification.',
    ],
  },
  {
    title: 'Pseudonymised and codified data',
    body: [
      'We may share pseudonymised or coded datasets with authorised NHS commissioning bodies or research partners for service evaluation, invoicing, or peer-reviewed research. Individuals cannot be re-identified from the statistics we publish.',
    ],
  },
  {
    title: 'How we use your information',
    body: ['Personal information is used to:'],
    list: [
      'Deliver ASD assessments and issue diagnostic reports.',
      'Provide relevant information, resources, or offers (you may opt out at any time).',
      'Send evaluation questionnaires or service updates via email/SMS (opt-out available).',
      'Administer the Website, troubleshoot issues, analyse usage, and improve services.',
      'Keep our systems secure.',
      'Generate anonymised statistics for clinical audit and service development.',
    ],
  },
  {
    title: 'Who we share information with',
    body: ['We may share your information with:'],
    list: [
      'Your NHS GP practice, local NHS hospital, or mental health service (with consent or where clinically necessary).',
      'Business partners and sub-contractors needed to deliver your assessment.',
      'Integrated Care Boards or Local Authorities for safeguarding or statutory reporting.',
      'Courts or regulators when the law requires it.',
    ],
  },
  {
    title: 'Public interest disclosures',
    body: [
      'If serious crime or risk to children outweighs confidentiality, we will share information on a documented, case-by-case basis.',
    ],
  },
  {
    title: 'International transfers',
    body: [
      'Data is hosted exclusively in AWS London (UK). Only approved UK/EEA staff can access it, and we do not make routine transfers outside the UK/EEA.',
    ],
  },
  {
    title: 'Our lawful bases (Art. 6 UK GDPR)',
    body: ['Depending on the activity we rely on:'],
    list: [
      'Consent – e.g., cookies or newsletters.',
      'Contract – fulfilling your assessment booking.',
      'Legal obligation – such as safeguarding reports.',
      'Legitimate interests – including service improvement, fraud prevention, and targeted ASD resources (balanced against your rights).',
    ],
  },
  {
    title: 'Our lawful bases for special category data (Art. 9 UK GDPR)',
    list: [
      'Provision of health or social care under UK law (DPA 2018, s10 & Sch 1, Part 1).',
      'Archiving, research, and statistics with a legal basis.',
    ],
  },
  {
    title: 'Protecting young minds – children’s data',
    list: [
      'Parental responsibility: for those under 16 we obtain consent from a parent or guardian.',
      'Gillick competence: where a child shows sufficient understanding we may rely on their consent for specific matters.',
      'Safeguarding overrides: we will share data without consent if required to protect the child or others.',
    ],
  },
  {
    title: 'Data security & storage',
    list: [
      'All data is encrypted at rest and in transit (AES-256, TLS 1.3).',
      'Access is strictly role-based and audited.',
      'Our EHR is hosted in AWS London with no US subprocessors.',
      'Any personal data breach is reported to the ICO within 72 hours and to affected individuals without undue delay where high risk exists.',
      'We follow the Records Management Code of Practice 2021: child health records are retained until the patient’s 25th birthday (or 26th if the record was created at age 17) and then securely destroyed.',
    ],
  },
  {
    title: 'Consent and opt-outs',
    body: [
      'You can withdraw consent or opt out of marketing/research at any time via your patient portal or by emailing dpo@novaclinics.co.uk.',
      'Where another lawful basis applies, we may continue to process historical data to meet regulatory duties.',
    ],
  },
  {
    title: 'National data opt-out',
    body: [
      'We honour the national data opt-out for any use of confidential patient information for research or planning. Visit www.nhs.uk/your-nhs-data-matters to exercise this option.',
    ],
  },
  {
    title: 'Your data protection rights',
    body: ['You may exercise the following rights (subject to legal limits):'],
    list: [
      'Access (Subject Access Request – free of charge, responded to within one month).',
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
      'Contact dpo@novaclinics.co.uk in the first instance. If unresolved you may escalate to the Information Commissioner’s Office (ICO): Wycliffe House, Water Lane, Wilmslow, Cheshire SK9 5AF, helpline 0303 123 1113, ico.org.uk.',
    ],
  },
  {
    title: 'Review cycle',
    body: ['Date of last review: 10 November 2025', 'Next review due: 10 May 2026 (bi-annual cycle).'],
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
