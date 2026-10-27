// Contact details, opening hours and the crisis note. One source for the footer and the
// /contact aside (ContactDetails.jsx), so the two can never disagree.

export const CONTACT_EMAIL = 'team@novaclinics.co.uk'
export const CONTACT_HOURS = '9am to 5pm, Monday to Friday'
export const TERMS_PATH = '/terms-and-conditions'

// The crisis note is written as parts so each phone number can be a tel: link while the
// sentence reads exactly: "Nova Clinics is not an emergency service. If you need urgent help,
// call 999, call NHS 111 and choose the mental health option (in Northern Ireland, call
// Lifeline on 0808 808 8000), or call Samaritans free on 116 123."
export const CRISIS_NOTE_PARTS = [
  'Nova Clinics is not an emergency service. If you need urgent help, call ',
  { text: '999', tel: '999' },
  ', call NHS ',
  { text: '111', tel: '111' },
  ' and choose the mental health option (in Northern Ireland, call Lifeline on ',
  { text: '0808 808 8000', tel: '08088088000' },
  '), or call Samaritans free on ',
  { text: '116 123', tel: '116123' },
  '.',
]
