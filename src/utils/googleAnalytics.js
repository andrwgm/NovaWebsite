export const GA_MEASUREMENT_ID = 'G-ZWND4BHC68';
export const COOKIE_CONSENT_KEY = 'nova_cookie_consent';

const ALL_DENIED = {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
};

const ANALYTICS_GRANTED = {
  analytics_storage: 'granted',
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
  updateConsent(ANALYTICS_GRANTED);
}

export function denyAllGoogleConsent() {
  updateConsent(ALL_DENIED);
  clearGoogleAnalyticsCookies();
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
export function trackGenerateLead({ method = 'contact_form' } = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('event', 'generate_lead', { method });
}
