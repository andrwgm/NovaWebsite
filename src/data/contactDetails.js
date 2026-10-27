// Contact details, opening hours and the crisis note. One source for the footer and the
// /contact aside (ContactDetails.jsx), so the two can never disagree.

export const CONTACT_EMAIL = 'team@novaclinics.co.uk'
export const CONTACT_HOURS = '9am to 5pm, Monday to Friday'
export const TERMS_PATH = '/terms-and-conditions'

// The crisis note is written as parts so each phone number can be a tel: link (and the SHOUT
// number an sms: link). It reads exactly:
// "Nova Clinics is not an emergency service. If you need urgent help: call 999 in an emergency.
// England and Wales: call NHS 111 and choose the mental health option. Scotland: call NHS 24 on
// 111. Northern Ireland: call Lifeline on 0808 808 8000. Anywhere in the UK: call Samaritans free
// on 116 123, or text SHOUT to 85258."
export const CRISIS_NOTE_INTRO =
  'Nova Clinics is not an emergency service. If you need urgent help:'

export const CRISIS_NOTE_ITEMS = [
  ['call ', { text: '999', tel: '999' }, ' in an emergency.'],
  [
    'England and Wales: call NHS ',
    { text: '111', tel: '111' },
    ' and choose the mental health option.',
  ],
  ['Scotland: call NHS 24 on ', { text: '111', tel: '111' }, '.'],
  [
    'Northern Ireland: call Lifeline on ',
    { text: '0808 808 8000', tel: '08088088000' },
    '.',
  ],
  [
    'Anywhere in the UK: call Samaritans free on ',
    { text: '116 123', tel: '116123' },
    ', or text SHOUT to ',
    { text: '85258', sms: '85258?body=SHOUT' },
    '.',
  ],
]
