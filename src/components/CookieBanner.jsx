import React, { useState } from 'react';

/**
 * @param {{ onChoice: (prefs: { analytics: boolean, ads: boolean } | null) => void }} props
 */
export default function CookieBanner({ onChoice }) {
  const [isCustomising, setIsCustomising] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [ads, setAds] = useState(false);

  return (
    <div className="cookie-banner" role="dialog" aria-live="polite" aria-label="Cookie consent">
      <div className="cookie-banner__content">
        {!isCustomising ? (
          <>
            <p>
              We use analytics cookies to understand how visitors use this site, and advertising
              cookies (Google Ads) to measure and improve our campaigns — only if you allow them.
              You can accept all, reject all, or choose by category. Essential storage that remembers
              your choice does not require consent.
            </p>
            <div className="cookie-banner__actions">
              <button
                type="button"
                className="cookie-banner__button cookie-banner__button--secondary"
                onClick={() => onChoice({ analytics: false, ads: false })}
              >
                Reject all
              </button>
              <button
                type="button"
                className="cookie-banner__button cookie-banner__button--secondary"
                onClick={() => setIsCustomising(true)}
              >
                Customise
              </button>
              <button
                type="button"
                className="cookie-banner__button"
                onClick={() => onChoice({ analytics: true, ads: true })}
              >
                Accept all
              </button>
              <a className="cookie-banner__link" href="/cookies-policy">
                Cookie policy
              </a>
            </div>
          </>
        ) : (
          <>
            <p>
              Choose which optional cookies to allow. Nothing is pre-selected. Advertising cookies
              are used for Google Ads measurement and are separate from analytics.
            </p>
            <div className="cookie-banner__categories" role="group" aria-label="Cookie categories">
              <label className="cookie-banner__category">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(event) => setAnalytics(event.target.checked)}
                />
                <span>
                  <strong>Analytics</strong>
                  {' '}
                  — Google Analytics and Cloudflare Web Analytics (site performance).
                </span>
              </label>
              <label className="cookie-banner__category">
                <input
                  type="checkbox"
                  checked={ads}
                  onChange={(event) => setAds(event.target.checked)}
                />
                <span>
                  <strong>Advertising</strong>
                  {' '}
                  — Google Ads cookies for campaign measurement (not clinical remarketing lists).
                </span>
              </label>
            </div>
            <div className="cookie-banner__actions">
              <button
                type="button"
                className="cookie-banner__button cookie-banner__button--secondary"
                onClick={() => setIsCustomising(false)}
              >
                Back
              </button>
              <button
                type="button"
                className="cookie-banner__button"
                onClick={() => onChoice({ analytics, ads })}
              >
                Save preferences
              </button>
              <a className="cookie-banner__link" href="/cookies-policy">
                Cookie policy
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
