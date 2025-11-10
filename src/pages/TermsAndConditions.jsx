import React from 'react';
import PolicyPage from './PolicyPage';

const intro = [
  'These Terms and Conditions (the “Terms”) govern the relationship between you and NovaClinicsUK, trading as Nova Clinics UK (“Nova Clinics”), for all services and products (“Services”).',
  'By booking with us you agree to these Terms, our Privacy Policy, and our Cookie Policy.',
];

const sections = [
  {
    title: 'Scope & services',
    body: [
      'Nova Clinics delivers private-pay autism spectrum disorder (ASD) diagnostic assessments for children and young people up to age 18. We provide assessments only and expressly do not offer continuing care or emergency medical treatment.',
    ],
  },
  {
    title: 'Private-pay model',
    body: [
      'All Services are delivered on a private-pay basis. Your booking confirmation sets out the requirements for each Service. For further information email team@novaclinics.co.uk or write to Nova Clinics UK, 128 City Road, London, EC1V 2NX, United Kingdom.',
    ],
  },
  {
    title: 'Data protection',
    body: [
      'Data protection provisions are detailed in the Privacy Policy. Accepting these Terms confirms you have read and accepted the Privacy Policy and Cookie Policy, including how your data is used.',
    ],
  },
  {
    title: 'Limitations of liability',
    body: [
      'Nova Clinics offers diagnostic assessments only. For general health issues contact your GP, and for urgent or emergency care dial NHS 111 or visit your nearest A&E.',
      'We are not responsible for any damage, health issues, inconvenience, or loss arising from the use or misuse of reports issued. You remain responsible for decisions you take on the basis of the assessment results.',
      'Protect your account credentials. If a third party uses your password, you are liable for activity undertaken under your account.',
      'Nova Clinics is liable only for losses directly resulting from gross negligence of our directors, officers, or employees. Liability for slight negligence is excluded.',
    ],
  },
  {
    title: 'Copyright',
    body: [
      'All materials supplied by Nova Clinics (including questionnaires, reports, and content) belong to Nova Clinics or are used under licence. Do not share them with third parties without our prior written consent.',
    ],
  },
  {
    title: 'Changes & additions',
    body: [
      'We may amend or supplement these Terms at any time. Material changes will be communicated via email and the Website. Continued use of our Services after notification constitutes acceptance.',
    ],
  },
  {
    title: 'Assignment',
    body: [
      'Any claims you have against Nova Clinics may only be transferred to another party with our prior written consent.',
    ],
  },
  {
    title: 'Applicable law & jurisdiction',
    body: [
      'These Terms are governed exclusively by English law. The courts of England and Wales have exclusive jurisdiction over any dispute.',
      'Effective date: 10 November 2025.',
    ],
  },
];

export default function TermsAndConditions() {
  return (
    <PolicyPage
      title="Terms & Conditions"
      caption="Nova Clinics UK"
      intro={intro}
      sections={sections}
    />
  );
}
