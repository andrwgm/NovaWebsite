import React, { useState } from 'react';

/**
 * @param {{ onChoice: (prefs: { analytics: boolean, ads: boolean, stats: boolean } | null) => void }} props
 */
export default function CookieBanner({ onChoice }) {
  const [isCustomising, setIsCustomising] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [ads, setAds] = useState(false);
  const [stats, setStats] = useState(true);

  return (
    <div className="cookie-banner" role="dialog" aria-live="polite" aria-label="Cookie consent">
      <div className="cookie-banner__content">
        {!isCustomising ? (
          <>
            <p>
              We use analytics cookies to understand how visitors use this site, and advertising
              cookies (Google Ads and Meta) to measure and improve our campaigns — only if you allow them.
              You can accept all, reject all, or choose by category. We also keep first-party campaign
              details (UTMs, landing page, and referring website) with an enquiry you send, under the
              PECR statistics exemption. You can opt out in Customise. Advertising click IDs are only
              stored if you allow Advertising. Essential storage that remembers your choice does not
              require consent.
            </p>
            <div className="cookie-banner__actions">
              <button
                type="button"
                className="cookie-banner__button cookie-banner__button--secondary"
                onClick={() => onChoice({ analytics: false, ads: false, stats: true })}
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
                onClick={() => onChoice({ analytics: true, ads: true, stats: true })}
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
              Analytics and advertising cookies are optional and are not pre-selected. Advertising
              cookies are used for Google Ads and Meta (Facebook and Instagram) measurement and are
              separate from analytics. Campaign statistics are on by default; untick to opt out.
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
                  — Google Ads and Meta Pixel cookies for campaign measurement (not clinical
                  remarketing lists, and not matching enquiry emails or phone numbers). Also
                  allows us to store advertising click IDs (gclid, gbraid, wbraid, fbclid) with
                  an enquiry you send.
                </span>
              </label>
              <label className="cookie-banner__category">
                <input
                  type="checkbox"
                  checked={stats}
                  onChange={(event) => setStats(event.target.checked)}
                />
                <span>
                  <strong>Campaign statistics</strong>
                  {' '}
                  — First-party UTMs, landing page, and referring website, stored with an enquiry
                  you send. On by default. Untick to opt out. Not sent to Google or Meta from the
                  form.
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
                onClick={() => onChoice({ analytics, ads, stats })}
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
