export const GA_MEASUREMENT_ID = 'G-ZWND4BHC68';
export const COOKIE_CONSENT_KEY = 'nova_cookie_consent';
/** Bump when banner categories change so prior Accept/Reject must be asked again. */
export const COOKIE_CONSENT_VERSION = 2;

const ALL_DENIED = {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
};

/**
 * @typedef {{ analytics: boolean, ads: boolean }} ConsentPreferences
 */

/**
 * Legacy `accepted` / `rejected` (v1) are ignored so the banner returns when
 * marketing is introduced. Valid v2 JSON: {"v":2,"analytics":true,"ads":false}.
 * @returns {ConsentPreferences | null}
 */
export function parseStoredConsent(raw) {
  if (!raw || typeof raw !== 'string') {
    return null;
  }

  if (raw === 'accepted' || raw === 'rejected') {
    return null;
  }

  try {
    const parsed = JSON.parse(raw);
    if (
      !parsed
      || typeof parsed !== 'object'
      || parsed.v !== COOKIE_CONSENT_VERSION
      || typeof parsed.analytics !== 'boolean'
      || typeof parsed.ads !== 'boolean'
    ) {
      return null;
    }
    return { analytics: parsed.analytics, ads: parsed.ads };
  } catch {
    return null;
  }
}

/** @returns {ConsentPreferences | null} */
export function readConsentPreferences() {
  if (typeof window === 'undefined') {
    return null;
  }
  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    const parsed = parseStoredConsent(raw);
    // Drop legacy v1 Accept/Reject so the marketing banner is asked again.
    if (raw && !parsed) {
      window.localStorage.removeItem(COOKIE_CONSENT_KEY);
    }
    return parsed;
  } catch {
    return null;
  }
}

/** @param {ConsentPreferences | null} preferences */
export function writeConsentPreferences(preferences) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    if (!preferences) {
      window.localStorage.removeItem(COOKIE_CONSENT_KEY);
      return;
    }
    window.localStorage.setItem(
      COOKIE_CONSENT_KEY,
      JSON.stringify({
        v: COOKIE_CONSENT_VERSION,
        analytics: Boolean(preferences.analytics),
        ads: Boolean(preferences.ads),
      }),
    );
  } catch {
    // Private mode / blocked storage — Consent Mode still updates in-session.
  }
}

/** @param {ConsentPreferences} preferences */
export function consentStateFromPreferences(preferences) {
  const ads = preferences.ads ? 'granted' : 'denied';
  return {
    analytics_storage: preferences.analytics ? 'granted' : 'denied',
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: ads,
  };
}

function updateConsent(consentState) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }
  window.gtag('consent', 'update', consentState);
}

function expireCookiesMatching(isMatch) {
  if (typeof document === 'undefined') {
    return;
  }

  const hostname = window.location.hostname;
  const rootDomain = hostname.replace(/^www\./, '');
  const domains = [undefined, hostname, `.${hostname}`, rootDomain, `.${rootDomain}`];
  const cookieNames = new Set();

  document.cookie.split(';').forEach((part) => {
    const name = part.split('=')[0]?.trim();
    if (name && isMatch(name)) {
      cookieNames.add(name);
    }
  });

  cookieNames.forEach((name) => {
    domains.forEach((domain) => {
      const domainPart = domain ? `; domain=${domain}` : '';
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domainPart}`;
    });
  });
}

function clearAnalyticsCookies() {
  const measurementSuffix = GA_MEASUREMENT_ID.replace(/^G-/, '');
  expireCookiesMatching((name) => (
    name === '_ga'
    || name === `_ga_${measurementSuffix}`
    || name === '_gid'
    || name === 'FPID'
    || name === 'FPLC'
    || /^(_gat|_gac_)/.test(name)
    || name.startsWith('_ga_')
  ));
}

function clearAdsCookies() {
  expireCookiesMatching((name) => (
    name === '_gads'
    || name === 'IDE'
    || name.startsWith('_gcl_')
  ));
}

function clearGoogleConsentCookies() {
  clearAnalyticsCookies();
  clearAdsCookies();
}

/** @param {ConsentPreferences} preferences */
export function applyConsentPreferences(preferences) {
  const next = {
    analytics: Boolean(preferences.analytics),
    ads: Boolean(preferences.ads),
  };

  updateConsent(consentStateFromPreferences(next));

  if (!next.analytics) {
    clearAnalyticsCookies();
  }
  if (!next.ads) {
    clearAdsCookies();
  }

  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return next;
  }

  window.gtag('event', 'cookie_consent', {
    consent_analytics: next.analytics ? 'granted' : 'denied',
    consent_ads: next.ads ? 'granted' : 'denied',
  });

  return next;
}

/**
 * Apply a banner choice immediately (not in a React effect) so Tag Assistant
 * records the consent update before the next event.
 * @param {ConsentPreferences | null} preferences
 */
export function applyBannerConsentChoice(preferences) {
  if (!preferences) {
    updateConsent(ALL_DENIED);
    clearGoogleConsentCookies();
    return null;
  }
  return applyConsentPreferences(preferences);
}

export function denyAllGoogleConsent() {
  updateConsent(ALL_DENIED);
  clearGoogleConsentCookies();
}

/** @deprecated Prefer applyConsentPreferences — kept for clarity in call sites. */
export function grantAnalyticsConsent() {
  updateConsent(consentStateFromPreferences({ analytics: true, ads: false }));
}

/** Enable advertising storage when the visitor accepts the marketing category. */
export function grantAdsConsent() {
  updateConsent({
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
  });
}

/**
 * GA4 recommended lead event. Safe to fire on any successful enquiry submit.
 * Consent Mode still governs whether Analytics/Ads cookies are used.
 * Do not pass name, email, phone, or message.
 */
export function trackGenerateLead({ method = 'contact_form', form_source, item_id } = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  const params = { method };
  if (form_source) {
    params.form_source = form_source;
  }
  if (item_id) {
    params.item_id = item_id;
  }

  window.gtag('event', 'generate_lead', params);
}

/**
 * Fired when the contact modal opens. Use form_source, not source:
 * source is a reserved GA4 traffic-source dimension.
 */
export function trackContactFormOpen({ form_source = 'unknown', item_id } = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  const params = { form_source };
  if (item_id) {
    params.item_id = item_id;
  }

  window.gtag('event', 'contact_form_open', params);
}
