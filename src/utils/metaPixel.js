export const META_PIXEL_ID = '3206290686427770';

let lastPageViewPath = null;

function hasFbq() {
  return typeof window !== 'undefined' && typeof window.fbq === 'function';
}

function customParams({ form_source, item_id } = {}) {
  const params = {};
  if (form_source) {
    params.form_source = form_source;
  }
  if (item_id) {
    params.item_id = item_id;
  }
  return params;
}

/** Pixel consent is the Advertising category. Events are dropped until grant. */
export function applyMetaConsent(adsGranted) {
  if (!hasFbq()) {
    return;
  }
  if (!adsGranted) {
    lastPageViewPath = null;
  }
  window.fbq('consent', adsGranted ? 'grant' : 'revoke');
}

export function trackMetaPageView(path) {
  if (!hasFbq()) {
    return;
  }
  const nextPath = path || window.location.pathname;
  if (lastPageViewPath === nextPath) {
    return;
  }
  lastPageViewPath = nextPath;
  window.fbq('track', 'PageView');
}

/**
 * Price card seen. Do not pass value/currency — enquiry is not a purchase.
 * content_ids stays the card key (autism | adhd | combined).
 */
export function trackMetaViewContent({ item_id } = {}) {
  if (!hasFbq() || !item_id) {
    return;
  }
  window.fbq('track', 'ViewContent', {
    content_ids: [item_id],
    content_name: item_id,
    content_category: 'assessment',
  });
}

export function trackMetaContactFormOpen({ form_source = 'unknown', item_id } = {}) {
  if (!hasFbq()) {
    return;
  }
  window.fbq('trackCustom', 'ContactFormOpen', customParams({ form_source, item_id }));
}

export function trackMetaFormStart({ form_source = 'unknown', item_id } = {}) {
  if (!hasFbq()) {
    return;
  }
  window.fbq('trackCustom', 'FormStart', customParams({ form_source, item_id }));
}

/**
 * Enquiry POST succeeded. Standard Lead is the Ads conversion.
 * Do not pass name, email, phone, message, or a fake value.
 */
export function trackMetaLead({ form_source, item_id } = {}) {
  if (!hasFbq()) {
    return;
  }
  window.fbq('track', 'Lead', customParams({ form_source, item_id }));
}
