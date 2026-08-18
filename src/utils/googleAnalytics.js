const GA_MEASUREMENT_ID = 'G-ZWND4BHC68';

export function loadGoogleAnalytics() {
  if (typeof window === 'undefined' || document.querySelector('script[data-ga-gtag]')) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID);

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.setAttribute('data-ga-gtag', 'true');
  document.head.appendChild(script);
}

export function removeGoogleAnalytics() {
  document.querySelectorAll('script[data-ga-gtag]').forEach((script) => script.remove());
  if (typeof window !== 'undefined') {
    delete window.gtag;
    delete window.dataLayer;
  }
}
