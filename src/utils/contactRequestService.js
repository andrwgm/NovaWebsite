// Every "contact" button on the site calls requestContact(). App listens and sends the
// visitor to the /contact page, carrying the payload in router state. Payload fields, all
// optional:
//   message   pre-made text for the message box
//   source    where the button lives (analytics form_source, stored with the enquiry)
//   itemId    'adhd' | 'autism' | 'combined': pre-selects the service
//   audience  'self' | 'child': pre-selects who the assessment is for
//   under8Interest  true: selects 'for my child' and scrolls to the under-8 interest list
const listeners = new Set();

export const onContactRequest = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const requestContact = (payload = {}) => {
  listeners.forEach((listener) => listener(payload));
};
