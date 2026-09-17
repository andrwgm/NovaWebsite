import React from 'react';
import PolicyPage from './PolicyPage';

const intro = [
  'These Terms and Conditions (the “Terms”) govern the relationship between you and NovaClinicsUK, trading as Nova Clinics UK (“Nova Clinics”), for all services and products (“Services”).',
  'By booking with us or using our Services you agree to these Terms, our Privacy Policy, and our Cookie Policy.',
];

const sections = [
  {
    title: 'Scope & services',
    body: [
      'Nova Clinics delivers private-pay diagnostic assessments for autism spectrum disorder (ASD), attention deficit hyperactivity disorder (ADHD), and combined autism and ADHD assessments for children and adults across the UK.',
      'Our Services include diagnostic assessment, feedback, reporting, and straightforward follow-up support. A post-assessment support session is included for patients who complete the assessment pathway, subject to the timing set out below.',
      'We provide assessments only. We do not offer continuing medical care, prescribing, emergency treatment, or crisis intervention.',
    ],
  },
  {
    title: 'Clinical standards',
    body: [
      'Assessments are delivered by qualified clinicians registered with the Health and Care Professions Council (HCPC) or other appropriate UK professional bodies, as applicable to their role.',
    ],
  },
  {
    title: 'Private-pay model',
    body: [
      'Services are delivered on a private-pay basis. We do not currently accept NHS Right to Choose funding or GP referrals.',
      'We confirm in writing the Service selected, the published fee, and how that fee will be collected. Current standard fees are: autism assessment £2,400; ADHD assessment £1,000; combined autism and ADHD assessment £3,000. These fees include questionnaires, clinical assessment, multi-disciplinary review, the diagnostic report, feedback, and the included post-assessment support session where offered as part of your pathway.',
      'For further information email team@novaclinics.co.uk or write to Nova Clinics UK, 82a James Carter Road, Mildenhall, Bury St. Edmunds, IP28 7DE, United Kingdom.',
    ],
  },
  {
    title: 'Booking process',
    body: [
      'You may submit an enquiry through our Website contact form or by email. Our team will contact you to discuss suitability, explain the pathway, and confirm next steps, including patient portal access.',
      'A first payment towards the published fee (the amount we confirm in writing) is required before you can complete questionnaires and other forms in the patient portal.',
      'Any remaining balance must be paid before we book your assessment appointment. We will usually collect that remaining balance at the point we book the appointment with you.',
      'An assessment appointment is confirmed only when Nova Clinics confirms it in writing (usually by email), including the Service, date and time, and that the remaining balance has been paid.',
    ],
  },
  {
    title: 'Fees and payments',
    body: [
      'Where a payment plan applies, we will tell you in writing: (1) the first payment amount, which unlocks portal questionnaires and forms; and (2) any remaining balance, which is due before we book the assessment appointment.',
      'The first payment amount is not a fixed published figure; it is a portion of the published fee (including, where we so confirm, the full fee). For refunds, that first payment is the “deposit”.',
      'Payments are processed securely through Stripe Checkout, including from the patient portal. Nova Clinics does not store your full card or bank details.',
      'Checkout may offer card, Apple Pay, Google Pay, Revolut Pay, PayPal, and Klarna. PayPal and Klarna may, at their own discretion, also offer a pay-later option (for example Pay in 3) to customers they consider eligible. That is not available to everyone, is subject to their checks and approval, and is governed by their terms — not by Nova Clinics. If Checkout completes, Nova Clinics receives that instalment in full; any spreading of payments is between you and PayPal or Klarna.',
      'Receipts and payment records are issued through Stripe.',
    ],
  },
  {
    title: 'Cancellation, rescheduling, and refunds',
    body: ['We understand that plans can change. Unless otherwise agreed in writing, the following applies to your first scheduled appointment:'],
    list: [
      'More than 14 days before your first appointment: full refund of amounts paid, minus the deposit.',
      'Between 48 hours and 14 days before your first appointment: 50% of the total fee is payable; we will refund the remainder of any amounts paid above that amount.',
      'Less than 48 hours before your first appointment, or if you do not attend: the full fee is payable and no refund is due.',
      'If you arrive more than 20 minutes late, we may treat the appointment as a non-attendance under these Terms.',
      'Refunds, where due, are processed within 10 working days to your original payment method.',
      'You may reschedule once free of charge with at least 48 hours’ notice. Any further changes, or changes with less than 48 hours’ notice, will be handled as a cancellation under these Terms.',
    ],
  },
  {
    title: 'Appointments and communication',
    body: [
      'Assessments and appointments are conducted remotely by secure video call unless otherwise agreed. Nova Clinics initiates video appointments through Google Meet from our Google Workspace.',
      'Video appointments may be recorded to support clinical documentation. Participants are notified when a meeting is being recorded.',
      'We may attempt to contact you by telephone around 72 hours before an appointment to confirm details and answer practical questions. This is offered on a best-effort basis and is not guaranteed.',
      'Appointment changes must be requested by contacting our team. Self-service rescheduling or cancellation is not currently available through the patient portal.',
    ],
  },
  {
    title: 'Post-assessment support',
    body: [
      'Where included in your pathway, one post-assessment support session is provided at no additional charge.',
      'This session must be booked within four weeks of completion of your assessment pathway, unless we agree otherwise in writing.',
    ],
  },
  {
    title: 'Reports and delivery',
    body: [
      'Your diagnostic report will be made available as a digital PDF through the patient portal when it is ready.',
      'Where available, we will also arrange secure delivery of a printed copy to your home address.',
      'We will not issue the diagnostic report until the published fee has been paid in full.',
      'We aim to issue reports as soon as clinically appropriate following completion of the assessment pathway. We do not guarantee a fixed delivery date.',
    ],
  },
  {
    title: 'Age, consent, and account management',
    body: [
      'For children and young people under 18, the assessment is arranged and managed by a parent or guardian with parental responsibility, even where the patient portal profile relates to the child.',
      'For adults aged 18 and over, the assessment and account are managed by the patient themselves, although they may involve family members for support if they wish.',
    ],
  },
  {
    title: 'Patient portal',
    body: [
      'We provide a secure patient portal for completing forms, uploading requested documents, viewing appointments, receiving messages from our team, paying where a payment plan applies, and accessing your report when available.',
      'Questionnaires and other assessment forms in the portal are available after the first payment has completed. An unpaid remaining balance does not by itself block those forms, but we will not book the assessment appointment until that remaining balance is paid.',
      'The portal does not currently support self-service booking, rescheduling, or cancellation. Please contact our team for appointment changes.',
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
      'Nova Clinics offers diagnostic assessments only. For general health issues contact your GP, and for urgent or emergency care dial 999 or NHS 111, or visit your nearest A&E.',
      'We are not responsible for any damage, health issues, inconvenience, or loss arising from the use or misuse of reports issued. You remain responsible for decisions you take on the basis of the assessment results.',
      'Protect your account credentials. If a third party uses your login details, you are responsible for activity undertaken under your account unless caused by our failure to keep our systems secure.',
      'Nothing in these Terms excludes or limits our liability for death or personal injury caused by our negligence, fraud, or any other liability that cannot be excluded under applicable law.',
      'Subject to the paragraph above, Nova Clinics is not liable for indirect or consequential loss. Our total liability arising from the Services is limited to the fees paid by you for the relevant assessment, except where a higher liability is required by law.',
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
      'Effective date: 17 September 2026.',
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
