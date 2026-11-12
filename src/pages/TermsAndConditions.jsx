import React from 'react';
import PolicyPage from './PolicyPage';

const intro = [
  'These Terms and Conditions (the "Terms") govern the relationship between you and Novaclinicsuk Ltd, trading as Nova Clinics ("Nova Clinics"), for all services and products ("Services").',
  'By paying a deposit, submitting a referral form, booking with us or using our Services, you agree to these Terms, our Privacy Policy and our Cookie Policy.',
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
      'After you pay your deposit, we ask you to complete a referral form. Our Clinical Lead reviews every referral form to decide whether our service is the right fit. Sometimes we may not be able to offer an assessment, for example where another service is better placed to help, or where an online assessment may not give an accurate picture. If so, we will explain this and suggest other sources of support. Our decision is based on clinical judgement and is not a comment on you or your family.',
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
      'For further information email team@novaclinics.co.uk or write to Nova Clinics, 82a James Carter Road, Mildenhall, Bury St Edmunds, IP28 7DE, United Kingdom.',
    ],
  },
  {
    title: 'Booking process',
    list: [
      'Enquiry. You contact us through our website, by email or through our online sign-up. Before you pay, we show you the full price, the deposit, what is included and our refund terms.',
      'Deposit. You pay a deposit of 25% of the fee, and we send you a secure login to our patient portal.',
      'Referral form. You complete our referral form in the portal. It takes about 15 minutes, and you can save your answers and come back later.',
      'Review. Our Clinical Lead reviews your referral form and we will be in touch within 2 working days. We will either confirm we can go ahead, ask you for more information, invite you to a short call to talk things through, or explain why we are not able to offer an assessment. If we cannot offer one, we refund your deposit in full.',
      'Onboarding. If we can go ahead, we post your welcome pack and unlock the rest of the forms in the portal. Our Clinical Lead reviews these, no sooner than 15 days after your deposit, before confirming your assessment. If we then find we cannot offer an assessment, we refund everything you have paid.',
      'Booking. You choose your appointment date in the portal and pay the remaining balance to confirm it.',
      'Confirmation. Your appointment is confirmed in writing, usually by email.',
    ],
    bodyAfterList: [
      'If, after any payment, we find we cannot safely or accurately assess, we will explain why and refund everything you have paid. If that is because information on the referral form was wrong or incomplete, we keep our set-up costs and the cost of any appointments already held, and refund the rest.',
    ],
  },
  {
    title: 'Fees and payments',
    body: [
      'Where a payment plan applies, we will tell you in writing: (1) the deposit, which gives you access to the patient portal and the referral form (the other forms unlock once our Clinical Lead accepts your referral); and (2) the remaining balance, which you pay when you book your assessment appointment.',
      'The first payment is a deposit of 25% of the published fee, which you pay before completing your referral form. If our Clinical Lead is not able to accept your referral, or you cancel within 14 days of paying your deposit, you get a full refund. After that, if you cancel, we keep only the costs we have already incurred and the value of work already done: card fees (£5 for an ADHD assessment, £10 for an autism or combined assessment), the cost of your welcome box once we have posted it (£25 or £50) and, once our Clinical Lead has reviewed your forms, a further £320 for that review. We never keep more than you have paid at that point. Please complete your referral form within 4 weeks of paying your deposit, your other forms within 8 weeks of our accepting your referral, and pay the balance within 12 weeks. If something outside your control holds things up, such as a school questionnaire over the holidays, let us know and we can extend this once. If we cannot reach you after a deadline, we will close your assessment and refund your deposit less these costs. You are welcome to come back at any time with a new referral.',
      'Payments are processed securely through Stripe Checkout, including from the patient portal. Nova Clinics does not store your full card or bank details.',
      'Checkout may offer card, Apple Pay, Google Pay, Revolut Pay, PayPal and Klarna. PayPal and Klarna may, at their own discretion, also offer a pay-later option (for example Pay in 3) to customers they consider eligible. That is not available to everyone, is subject to their checks and approval, and is governed by their terms, not by Nova Clinics. If Checkout completes, Nova Clinics receives that instalment in full; any spreading of payments is between you and PayPal or Klarna.',
      'Receipts and payment records are issued through Stripe.',
    ],
  },
  {
    title: 'Your right to cancel',
    body: [
      'You can cancel within 14 days of paying your deposit, for any reason. When you pay your deposit, you are asking us to start setting up your assessment straight away, so you can complete your referral form and, once it is accepted, your other forms. If you then cancel within the 14 days, we refund everything you have paid, and you can keep your welcome box if we have already posted it.',
      'To cancel, email team@novaclinics.co.uk or send us a message in the patient portal. You can use the cancellation form below, but you do not have to. We will refund you within 14 days of hearing from you, to your original payment method.',
    ],
  },
  {
    title: 'Changing or cancelling appointments',
    list: [
      "You can move each appointment once, free of charge, with at least 48 hours' notice.",
      "Moving an appointment with less than 48 hours' notice, or moving the same appointment a second time, costs £50.",
      'If you do not join, or join more than 20 minutes late, the appointment is missed and costs £100 to rebook.',
      'If something outside your control stops you attending, such as a bereavement or a hospital stay, please tell us. We will rebook free of charge. We can also waive any fee at our discretion.',
      'If an appointment is missed or changed late a second time, the usual fee applies and we may close your assessment. We would keep our set-up costs, any fees owed and the cost of appointments already held, and refund the rest.',
      'If you cancel your assessment after the first 14 days, the same applies.',
      'If we need to move an appointment, there is no charge. If we cannot offer a new date within 4 weeks, you can choose a refund for everything not yet done.',
      'Refunds are paid within 10 working days to your original payment method.',
    ],
  },
  {
    title: 'Model cancellation form',
    body: [
      'To: Novaclinicsuk Ltd, trading as Nova Clinics, 82a James Carter Road, Mildenhall, Bury St Edmunds, IP28 7DE, team@novaclinics.co.uk',
      'I/We hereby give notice that I/We cancel my/our contract for the supply of the following service: [assessment type]',
      'Ordered on: [date of deposit]',
      'Name of consumer(s):',
      'Address of consumer(s):',
      'Date:',
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
      'We send automatic reminders 72 hours before and on the morning of each appointment. We may also try to contact you by telephone around 72 hours before an appointment to confirm details and answer practical questions. This call is offered on a best-effort basis and is not guaranteed.',
      'To move or cancel an appointment, please contact our team by email or by sending us a message in the patient portal. You cannot currently move or cancel an appointment yourself in the portal.',
    ],
  },
  {
    title: 'Recording of appointments',
    body: [
      'All assessment appointments are video recorded. Recording helps us keep everyone safe, make sure our notes and report are accurate, and check the quality of our work. Everyone who joins an appointment, including parents, carers and family members, is recorded and must keep their camera on throughout. If a camera is turned off during the observation part of the assessment, the observation will not be valid.',
      'Recording is a condition of our Services. If anyone taking part does not agree to being recorded, we are not able to carry out the assessment.',
      'Recordings are saved securely by Google Meet in Nova Clinics\' Google Workspace, in Europe. They can only be seen by the clinicians involved in the assessment and their supervisor, and are deleted 90 days after your final report or last appointment, whichever is later. Recordings are not deleted while a complaint, contested outcome, safeguarding concern or legal claim is open; they are then deleted 90 days after it closes. More detail is in our Privacy Policy.',
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
      'We do not send reports by post or by email.',
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
      'You pay your deposit first, and we then give you access to the portal, where you complete the referral form. Once our Clinical Lead accepts your referral, the rest of the forms unlock. You book your appointment in the portal and pay the remaining balance when you book. When your report is ready, we let you know by text message and email.',
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
      'Effective date: 12/11/26',
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
