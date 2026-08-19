export const GA_MEASUREMENT_ID = 'G-ZWND4BHC68';
export const COOKIE_CONSENT_KEY = 'nova_cookie_consent';

const ALL_DENIED = {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
};

/** Analytics accepted; ads stay denied until a marketing category exists. */
const ANALYTICS_ONLY = {
  analytics_storage: 'granted',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
};

/** Ad consent for when Google Ads is enabled — call alongside analytics if marketing cookies are accepted. */
const ADS_GRANTED = {
  ad_storage: 'granted',
  ad_user_data: 'granted',
  ad_personalization: 'granted',
};

function updateConsent(consentState) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }
  window.gtag('consent', 'update', consentState);
}

function clearGoogleAnalyticsCookies() {
  if (typeof document === 'undefined') {
    return;
  }

  const hostname = window.location.hostname;
  const rootDomain = hostname.replace(/^www\./, '');
  const domains = [undefined, hostname, `.${hostname}`, rootDomain, `.${rootDomain}`];
  const measurementSuffix = GA_MEASUREMENT_ID.replace(/^G-/, '');

  const cookieNames = new Set([
    '_ga',
    `_ga_${measurementSuffix}`,
    '_gid',
  ]);

  document.cookie.split(';').forEach((part) => {
    const name = part.split('=')[0]?.trim();
    if (name && (/^(_ga|_gid|_gat|_gac_|FPID|FPLC)/.test(name) || name.startsWith('_ga_'))) {
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

export function grantAnalyticsConsent() {
  updateConsent(ANALYTICS_ONLY);
}

export function denyAllGoogleConsent() {
  updateConsent(ALL_DENIED);
  clearGoogleAnalyticsCookies();
}

/**
 * Apply a banner choice immediately (not in a React effect) so Tag Assistant
 * records the consent update before the next event.
 */
export function applyBannerConsentChoice(choice) {
  if (choice === 'accepted') {
    grantAnalyticsConsent();
  } else {
    denyAllGoogleConsent();
  }

  if (
    (choice !== 'accepted' && choice !== 'rejected')
    || typeof window === 'undefined'
    || typeof window.gtag !== 'function'
  ) {
    return;
  }

  window.gtag('event', 'cookie_consent', {
    consent_analytics: choice === 'accepted' ? 'granted' : 'denied',
  });
}

/** Enable when a marketing/advertising cookie category is added to the banner. */
export function grantAdsConsent() {
  updateConsent(ADS_GRANTED);
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
