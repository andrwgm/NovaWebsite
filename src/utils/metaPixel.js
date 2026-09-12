export const META_PIXEL_ID = '3206290686427770';

let lastPageViewPath = null;

function hasFbq() {
  return typeof window !== 'undefined' && typeof window.fbq === 'function';
}

function customParams({ form_source, item_id } = {}) {
  const params = {};
  if (form_source) {
    params.form_source = form_source;
    params.content_name = form_source;
  }
  if (item_id) {
    params.item_id = item_id;
    params.content_ids = [item_id];
    if (params.content_name) {
      params.content_category = item_id;
    } else {
      params.content_name = item_id;
    }
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
 * Price card seen. Custom, not ViewContent: this is not a product catalogue.
 * item_id is the card key (autism | adhd | combined).
 */
export function trackMetaPricingSeen({ item_id } = {}) {
  if (!hasFbq() || !item_id) {
    return;
  }
  window.fbq('trackCustom', 'PricingSeen', customParams({ item_id }));
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
