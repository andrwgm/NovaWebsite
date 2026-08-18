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

export function grantAnalyticsConsent() {
  updateConsent(ANALYTICS_GRANTED);
}

export function denyAllGoogleConsent() {
  updateConsent(ALL_DENIED);
}

/** Enable when a marketing/advertising cookie category is added to the banner. */
export function grantAdsConsent() {
  updateConsent(ADS_GRANTED);
}
