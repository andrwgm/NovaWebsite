import React from 'react';
import PolicyPage from './PolicyPage';

const intro = [
  'These Terms and Conditions (the "Terms") govern the relationship between you and NovaClinicsUK, trading as Nova Clinics UK ("Nova Clinics"), for all services and products ("Services").',
  'By submitting a referral form, booking with us or using our Services, you agree to these Terms, our Privacy Policy and our Cookie Policy.',
];

const sections = [
  {
    title: 'Scope and services',
    body: [
      'Nova Clinics delivers private-pay diagnostic assessments for autism, attention deficit hyperactivity disorder (ADHD), and combined autism and ADHD assessments for children aged 8 and over and adults across the UK.',
      'Our Services include diagnostic assessment, feedback, reporting and straightforward follow-up support. A post-assessment support session is included for people who complete the assessment pathway, subject to the timing set out below.',
      'We provide assessments only. We do not offer continuing medical care, prescribing, emergency treatment or crisis intervention.',
    ],
  },
  {
    title: 'Who we can assess',
    body: [
      'To make sure every assessment is safe and accurate, our Services are available where:',
    ],
    list: [
      'the person being assessed is aged 8 or over (we are developing a pathway for younger children, and you can join our interest list);',
      'the person being assessed lives in the UK;',
      'everyone taking part in the assessment, including parents, carers and family members, can take part in English (we are not able to offer interpreters);',
      'everyone taking part agrees to appointments being video recorded; and',
      'the assessment is not needed for a court case, tribunal, legal claim or insurance claim.',
    ],
    bodyAfterList: [
      'Before any payment is taken, we ask you to complete a referral form. Our Clinical Lead reviews every referral form to decide whether our service is the right fit. Sometimes we may not be able to offer an assessment, for example where another service is better placed to help, or where an online assessment may not give an accurate picture. If so, we will explain this and suggest other sources of support. Our decision is based on clinical judgement and is not a comment on you or your family.',
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
      'We confirm in writing the Service selected, the published fee and how that fee will be collected. Current standard fees are: autism assessment £2,400; ADHD assessment £1,000; combined autism and ADHD assessment £3,000. These fees include questionnaires, clinical assessment, multidisciplinary review, the diagnostic report, feedback, and the included post-assessment support session where offered as part of your pathway.',
      'For further information email team@novaclinics.co.uk or write to Nova Clinics UK, 82a James Carter Road, Mildenhall, Bury St Edmunds, IP28 7DE, United Kingdom.',
    ],
  },
  {
    title: 'Booking process',
    list: [
      'Enquiry. You contact us through our Website contact form or by email.',
      'Referral form. We send you a secure login to complete our referral form. It takes about 15 minutes, and you can save your answers and come back later.',
      'Review. Our Clinical Lead reviews your referral form and we will be in touch within 2 working days. We will either offer you an assessment, invite you to a short call to talk things through, or explain why we are not able to offer an assessment. No payment is taken at this stage.',
      'First payment. If we offer you an assessment, a first payment towards the published fee (the amount we confirm in writing) unlocks the questionnaires and other forms in the patient portal.',
      'Remaining balance. Any remaining balance must be paid before we book your assessment appointment. We will usually collect it at the point we book the appointment with you.',
      'Confirmation. An assessment appointment is confirmed only when Nova Clinics confirms it in writing (usually by email), including the Service, date and time, and that the remaining balance has been paid.',
    ],
    bodyAfterList: [
      'If, after your first payment, we learn something that means we cannot safely or accurately assess, we will explain why and refund the amounts you have paid in full.',
    ],
  },
  {
    title: 'Fees and payments',
    body: [
      'Where a payment plan applies, we will tell you in writing: (1) the first payment amount, which unlocks portal questionnaires and forms; and (2) any remaining balance, which is due before we book the assessment appointment.',
      'The first payment amount is not a fixed published figure; it is a portion of the published fee (including, where we so confirm, the full fee). For refunds, that first payment is the "deposit".',
      'Payments are processed securely through Stripe Checkout, including from the patient portal. Nova Clinics does not store your full card or bank details.',
      'Checkout may offer card, Apple Pay, Google Pay, Revolut Pay, PayPal and Klarna. PayPal and Klarna may, at their own discretion, also offer a pay-later option (for example Pay in 3) to customers they consider eligible. That is not available to everyone, is subject to their checks and approval, and is governed by their terms, not by Nova Clinics. If Checkout completes, Nova Clinics receives that instalment in full; any spreading of payments is between you and PayPal or Klarna.',
      'Receipts and payment records are issued through Stripe.',
    ],
  },
  {
    title: 'Cancellation, rescheduling and refunds',
    body: [
      'We understand that plans can change. Unless otherwise agreed in writing, the following applies to your first scheduled appointment:',
    ],
    list: [
      'More than 14 days before your first appointment: full refund of amounts paid, minus the deposit.',
      'Between 48 hours and 14 days before your first appointment: 50% of the total fee is payable; we will refund the remainder of any amounts paid above that amount.',
      'Less than 48 hours before your first appointment, or if you do not attend: the full fee is payable and no refund is due.',
      'If you arrive more than 20 minutes late, we may treat the appointment as a non-attendance under these Terms.',
      'Refunds, where due, are processed within 10 working days to your original payment method.',
      'You may reschedule once free of charge with at least 48 hours\' notice. Any further changes, or changes with less than 48 hours\' notice, will be handled as a cancellation under these Terms.',
    ],
  },
  {
    title: 'Appointments and communication',
    body: [
      'All assessments and appointments take place online by secure video call. Nova Clinics starts video appointments through Google Meet from our Google Workspace.',
      'For each appointment you will need:',
    ],
    list: [
      'a laptop, desktop computer or tablet with a screen of at least 10 inches, and a working camera and microphone (phones are not suitable);',
      'a stable internet connection; and',
      'a quiet, private space where you will not be interrupted.',
    ],
    bodyAfterList: [
      'We may try to contact you by telephone around 72 hours before an appointment to confirm details and answer practical questions. This is offered on a best-effort basis and is not guaranteed.',
      'Appointment changes must be requested by contacting our team. Self-service rescheduling or cancellation is not currently available through the patient portal.',
    ],
  },
  {
    title: 'Recording of appointments',
    body: [
      'All assessment appointments are video recorded. Recording helps us keep everyone safe, make sure our notes and report are accurate, and check the quality of our work. Everyone who joins an appointment, including parents, carers and family members, is recorded and must keep their camera on throughout. If a camera is turned off during the observation part of the assessment, the observation will not be valid.',
      'Recording is a condition of our Services. If anyone taking part does not agree to being recorded, we are not able to carry out the assessment.',
      'Recordings are stored securely in the UK, can only be seen by the clinicians involved in the assessment and their supervisor, and are deleted 90 days after your final report or last appointment, whichever is later, unless we need to keep them while a complaint, legal or safeguarding matter is resolved. More detail is in our Privacy Policy.',
    ],
  },
  {
    title: 'Language and reasonable adjustments',
    body: [
      'Our assessments rely on questionnaires and conversations designed to be carried out in English, so everyone taking part needs to be comfortable speaking English. We are not able to offer interpreters, and family members or friends cannot interpret.',
      'If anyone taking part has a learning disability, is deaf or hard of hearing, or has any sensory, physical, communication or other need, please let us know on the referral form. Our Clinical Lead will talk with you about reasonable adjustments, such as live captions, extra time, breaks or written summaries.',
    ],
  },
  {
    title: 'Safeguarding and your wellbeing',
    body: [
      'We have a duty of care to everyone taking part. If we become concerned that you, or someone else, may be at risk of serious harm, we may share relevant information with the right services, such as your GP, social care or emergency services. Where it is safe to do so, we will talk to you first.',
      'Nova Clinics is not an emergency service and does not provide crisis support. If you or someone you care for needs urgent help, call 999 (including for the police), go to your nearest A&E, or call NHS 111 and choose the mental health option. You can also call Samaritans free on 116 123.',
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
      'Our reports are written to support you and your wellbeing. They are not prepared for court, tribunal, legal or insurance purposes.',
    ],
  },
  {
    title: 'Age, consent and account management',
    list: [
      'For children and young people under 18, the referral and assessment are arranged and managed by a parent or guardian with parental responsibility, even where the patient portal profile relates to the child. You will be asked to confirm that you have parental responsibility.',
      'Young people aged 16 and 17 are asked for their own agreement on the referral form and their own consent to the assessment.',
      "For a child in the care of a local authority, we need the local authority's agreement before the assessment goes ahead.",
      'For adults aged 18 and over, the referral, assessment and account are managed by the person themselves, although they may involve family members for support if they wish.',
    ],
  },
  {
    title: 'Patient portal',
    body: [
      'We provide a secure patient portal for completing the referral form and other forms, uploading requested documents, viewing appointments, receiving messages from our team, paying where a payment plan applies, and accessing your report when available.',
      'Before we have reviewed your referral, your portal login gives access to the referral form only. Questionnaires and other assessment forms are available after the first payment has completed. An unpaid remaining balance does not by itself block those forms, but we will not book the assessment appointment until that remaining balance is paid.',
      'The portal does not currently support self-service booking, rescheduling or cancellation. Please contact our team for appointment changes.',
    ],
  },
  {
    title: 'Data protection',
    body: [
      'Data protection provisions are set out in the Privacy Policy. Accepting these Terms confirms you have read and accepted the Privacy Policy and Cookie Policy, including how your data is used.',
    ],
  },
  {
    title: 'Limitations of liability',
    body: [
      'Nova Clinics offers diagnostic assessments only. For general health issues contact your GP, and for urgent or emergency care dial 999 or NHS 111, or visit your nearest A&E.',
      'We are not responsible for any damage, health issues, inconvenience or loss arising from the use or misuse of reports issued. You remain responsible for decisions you take on the basis of the assessment results.',
      'Please protect your account login details. If a third party uses your login details, you are responsible for activity carried out under your account unless it was caused by our failure to keep our systems secure.',
      'Nothing in these Terms excludes or limits our liability for death or personal injury caused by our negligence, fraud, or any other liability that cannot be excluded under applicable law.',
      'Subject to the paragraph above, Nova Clinics is not liable for indirect or consequential loss. Our total liability arising from the Services is limited to the fees paid by you for the relevant assessment, except where a higher liability is required by law.',
    ],
  },
  {
    title: 'Copyright',
    body: [
      'All materials supplied by Nova Clinics (including questionnaires, reports and content) belong to Nova Clinics or are used under licence. Please do not share them with third parties without our prior written consent.',
    ],
  },
  {
    title: 'Changes and additions',
    body: [
      'We may amend or supplement these Terms at any time. Material changes will be communicated by email and on the Website. Continued use of our Services after notification constitutes acceptance.',
    ],
  },
  {
    title: 'Assignment',
    body: [
      'Any claims you have against Nova Clinics may only be transferred to another party with our prior written consent.',
    ],
  },
  {
    title: 'Applicable law and jurisdiction',
    body: [
      'These Terms are governed exclusively by English law. The courts of England and Wales have exclusive jurisdiction over any dispute.',
      'Effective date: 25/9/26',
    ],
  },
];

export default function TermsAndConditions() {
  return (
    <PolicyPage
      title="Terms and Conditions"
      caption="Nova Clinics UK"
      intro={intro}
      sections={sections}
    />
  );
}
