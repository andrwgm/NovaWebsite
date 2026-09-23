import { readConsentPreferences } from './googleAnalytics';

const STORAGE_KEY = 'nova_enquiry_attribution';

export const ATTRIBUTION_UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
];

export const ATTRIBUTION_CLICK_ID_KEYS = [
  'gclid',
  'gbraid',
  'wbraid',
  'fbclid',
];

export const ATTRIBUTION_PARAM_KEYS = [
  ...ATTRIBUTION_UTM_KEYS,
  ...ATTRIBUTION_CLICK_ID_KEYS,
];

function emptyClickIds() {
  return {
    gclid: null,
    gbraid: null,
    wbraid: null,
    fbclid: null,
  };
}

function emptyParams() {
  return {
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
    utm_content: null,
    utm_term: null,
    ...emptyClickIds(),
  };
}

function emptySnapshot() {
  return {
    ...emptyParams(),
    first_landing_page: null,
    referrer: null,
  };
}

function normalizeValue(value) {
  if (value == null) {
    return null;
  }
  const text = String(value).trim();
  if (!text || text.toLowerCase() === 'null' || text.toLowerCase() === 'undefined') {
    return null;
  }
  return text.slice(0, 2048);
}

function currentPageUrl() {
  if (typeof window === 'undefined') {
    return null;
  }
  return `${window.location.origin}${window.location.pathname}${window.location.search}`;
}

function externalReferrer() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return null;
  }
  const referrer = normalizeValue(document.referrer);
  if (!referrer) {
    return null;
  }
  try {
    const refUrl = new URL(referrer);
    if (refUrl.origin === window.location.origin) {
      return null;
    }
    return referrer;
  } catch {
    return null;
  }
}

function readStored() {
  if (typeof window === 'undefined') {
    return emptySnapshot();
  }
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return emptySnapshot();
    }
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') {
      return emptySnapshot();
    }
    const snapshot = emptySnapshot();
    ATTRIBUTION_PARAM_KEYS.forEach((key) => {
      snapshot[key] = normalizeValue(parsed[key]);
    });
    snapshot.first_landing_page = normalizeValue(parsed.first_landing_page);
    snapshot.referrer = normalizeValue(parsed.referrer);
    return snapshot;
  } catch {
    return emptySnapshot();
  }
}

function writeStored(snapshot) {
  if (typeof window === 'undefined') {
    return;
  }
  const hasValue = Object.values(snapshot).some((value) => value != null);
  try {
    if (!hasValue) {
      window.sessionStorage.removeItem(STORAGE_KEY);
      return;
    }
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    // Private mode / blocked storage — still attach what we can from the current URL.
  }
}

function firstTouch(current, incoming) {
  return current || incoming || null;
}

/**
 * First-party website statistics (UTMs, landing, referrer) use the PECR
 * statistics exemption: on unless the visitor opts out. No choice yet = on.
 */
export function isEnquiryStatsAllowed() {
  const prefs = readConsentPreferences();
  if (prefs === null) {
    return true;
  }
  return prefs.stats !== false;
}

/** Advertising click IDs are only stored after Advertising consent. */
export function isEnquiryClickIdAllowed() {
  return Boolean(readConsentPreferences()?.ads);
}

let pendingClickIds = emptyClickIds();

function rememberClickIdsFromUrl(params) {
  ATTRIBUTION_CLICK_ID_KEYS.forEach((key) => {
    pendingClickIds[key] = firstTouch(pendingClickIds[key], normalizeValue(params.get(key)));
  });
}

function emptyPayload() {
  return {
    ...emptyParams(),
    landing_page: null,
    first_landing_page: null,
    referrer: null,
  };
}

/**
 * Capture campaign parameters from the current URL for this visit.
 * UTMs / landing / referrer: first-party website statistics, unless opted out.
 * Click IDs: only written when Website statistics are on and Advertising is allowed.
 * If Website statistics are off, session storage is not written and nothing is saved.
 * Does not touch Google Analytics, Ads, or Meta.
 */
export function captureEnquiryAttribution() {
  if (typeof window === 'undefined') {
    return emptySnapshot();
  }

  const params = new URLSearchParams(window.location.search);
  const statsOn = isEnquiryStatsAllowed();
  const adsOn = isEnquiryClickIdAllowed();
  const prefs = readConsentPreferences();

  rememberClickIdsFromUrl(params);

  if (prefs && prefs.ads === false) {
    pendingClickIds = emptyClickIds();
  }

  if (!statsOn) {
    pendingClickIds = emptyClickIds();
    writeStored(emptySnapshot());
    return emptySnapshot();
  }

  const stored = readStored();
  const next = emptySnapshot();

  ATTRIBUTION_UTM_KEYS.forEach((key) => {
    next[key] = firstTouch(stored[key], normalizeValue(params.get(key)));
  });
  const pageUrl = currentPageUrl();
  next.first_landing_page = firstTouch(stored.first_landing_page, pageUrl);
  next.referrer = firstTouch(stored.referrer, externalReferrer());

  if (adsOn) {
    ATTRIBUTION_CLICK_ID_KEYS.forEach((key) => {
      next[key] = firstTouch(stored[key], pendingClickIds[key]);
    });
  }

  writeStored(next);
  return next;
}

/**
 * Payload to attach to any enquiry/form POST. Missing values are null, never invented.
 * If Website statistics are off, every attribution field is empty.
 * Click IDs are included only when Advertising consent is granted.
 * `landing_page` is the page at submit time. `first_landing_page` is the first page of the visit.
 * `attribution_source` and `created_at` are derived/stored by the backend.
 */
export function getEnquiryAttributionPayload() {
  const statsOn = isEnquiryStatsAllowed();
  if (!statsOn) {
    captureEnquiryAttribution();
    return emptyPayload();
  }

  const stored = captureEnquiryAttribution();
  const adsOn = isEnquiryClickIdAllowed();
  return {
    utm_source: stored.utm_source,
    utm_medium: stored.utm_medium,
    utm_campaign: stored.utm_campaign,
    utm_content: stored.utm_content,
    utm_term: stored.utm_term,
    gclid: adsOn ? stored.gclid : null,
    gbraid: adsOn ? stored.gbraid : null,
    wbraid: adsOn ? stored.wbraid : null,
    fbclid: adsOn ? stored.fbclid : null,
    landing_page: currentPageUrl(),
    first_landing_page: stored.first_landing_page,
    referrer: stored.referrer,
  };
}

/** For multipart forms (future job applications, etc.). */
export function appendEnquiryAttributionToFormData(formData) {
  if (!formData || typeof formData.append !== 'function') {
    return formData;
  }
  formData.append('attribution', JSON.stringify(getEnquiryAttributionPayload()));
  return formData;
}
