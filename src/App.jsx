import React, { Suspense, useEffect, useRef, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import { onContactModalRequest } from './utils/contactModalService';
import { loadGoogleAnalytics, removeGoogleAnalytics } from './utils/googleAnalytics';

import { Image } from 'primereact/image';

import "./app.css";

const About = React.lazy(() => import('./pages/About'));
const Careers = React.lazy(() => import('./pages/Careers'));
const CareersOfferDetails = React.lazy(() => import('./pages/CareersOfferDetails'));
const Support = React.lazy(() => import('./pages/Support'));
const CookiesPolicy = React.lazy(() => import('./pages/CookiesPolicy'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));
const TermsAndConditions = React.lazy(() => import('./pages/TermsAndConditions'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const UnderConstruction = React.lazy(() => import('./pages/UnderConstruction'));
const Blog = React.lazy(() => import('./pages/Blog'));
const BlogPost = React.lazy(() => import('./pages/BlogPost'));
const ContactModal = React.lazy(() => import('./components/ContactModal'));

export function App() {
  return <AppContent />;
}

function AppContent() {
  const location = useLocation();
  const [showSplash, setShowSplash] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const hasShownSplash = useRef(false);
  const consentKey = 'nova_cookie_consent';
  const [cookieConsent, setCookieConsent] = useState(() => {
    if (typeof window === 'undefined') {
      return null;
    }
    const stored = window.localStorage.getItem(consentKey);
    return stored === 'accepted' || stored === 'rejected' ? stored : null;
  });
  const shouldShowCookieBanner = cookieConsent === null;
  const [isCookieBannerReady, setIsCookieBannerReady] = useState(false);
  const [contactModalRequestId, setContactModalRequestId] = useState(0);
  const [contactModalPrefill, setContactModalPrefill] = useState('');
  const [isContactModalEnabled, setIsContactModalEnabled] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [location.pathname]);

  useEffect(() => {
    if (hasShownSplash.current || location.pathname !== '/') {
      return undefined;
    }

    hasShownSplash.current = true;
    setShowSplash(true);
    let hasHidden = false;
    const hideSplash = () => {
      if (hasHidden) return;
      hasHidden = true;
      setIsFading(true);
      setTimeout(() => setShowSplash(false), 300);
    };

    if (document.readyState === 'complete') {
      hideSplash();
      return undefined;
    }

    window.addEventListener('load', hideSplash);
    const fallbackTimer = setTimeout(hideSplash, 8000);
    return () => {
      window.removeEventListener('load', hideSplash);
      clearTimeout(fallbackTimer);
    };
  }, [location.pathname]);

  useEffect(() => {
    if (cookieConsent !== 'accepted') {
      return undefined;
    }
    if (document.querySelector('script[data-cf-beacon]')) {
      return undefined;
    }
    const script = document.createElement('script');
    script.defer = true;
    script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    script.setAttribute('data-cf-beacon', '{"token":"4ca237c52da34a759461480f964a0fc3"}');
    document.body.appendChild(script);
    loadGoogleAnalytics();
    return undefined;
  }, [cookieConsent]);

  useEffect(() => {
    if (cookieConsent === 'accepted') {
      return undefined;
    }
    const script = document.querySelector('script[data-cf-beacon]');
    if (script) {
      script.remove();
    }
    if (window.__cfBeacon) {
      delete window.__cfBeacon;
    }
    removeGoogleAnalytics();
    return undefined;
  }, [cookieConsent]);

  useEffect(() => {
    if (showSplash || !shouldShowCookieBanner) {
      setIsCookieBannerReady(false);
      return undefined;
    }
    const timer = setTimeout(() => setIsCookieBannerReady(true), 500);
    return () => clearTimeout(timer);
  }, [showSplash, shouldShowCookieBanner]);

  useEffect(() => {
    const unsubscribe = onContactModalRequest((payload) => {
      setIsContactModalEnabled(true);
      const nextMessage = typeof payload?.message === 'string' ? payload.message : '';
      setContactModalPrefill(nextMessage);
      setContactModalRequestId((current) => current + 1);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const handleConsentEvent = (event) => {
      const choice = event?.detail;
      if (choice !== 'accepted' && choice !== 'rejected' && choice !== null) {
        return;
      }
      handleCookieChoice(choice);
    };

    window.addEventListener('nova-cookie-consent', handleConsentEvent);
    return () => window.removeEventListener('nova-cookie-consent', handleConsentEvent);
  }, []);

  const handleCookieChoice = (choice) => {
    setCookieConsent(choice);
    if (typeof window !== 'undefined') {
      if (choice === null) {
        window.localStorage.removeItem(consentKey);
      } else {
        window.localStorage.setItem(consentKey, choice);
      }
    }
  };

  return (
    <div className="app-shell">
      <Navbar />
      <Suspense
        fallback={(
          <main className="app-main">
            <div className="route-fallback" aria-hidden="true" />
          </main>
        )}
      >
        <>
          <main className="app-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/support" element={<Support />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/careers/:slug" element={<CareersOfferDetails />} />
              <Route path="/resources" element={<UnderConstruction />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/best-practices" element={<UnderConstruction />} />
              <Route path="/cookies-policy" element={<CookiesPolicy />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </>
      </Suspense>
      {isContactModalEnabled && (
        <Suspense fallback={null}>
          <ContactModal requestId={contactModalRequestId} prefillMessage={contactModalPrefill} />
        </Suspense>
      )}
      {shouldShowCookieBanner && isCookieBannerReady && (
        <div className="cookie-banner" role="dialog" aria-live="polite" aria-label="Cookie consent">
          <div className="cookie-banner__content">
            <p>
            We use analytics cookies to understand how visitors interact with our website and to improve performance.
            These cookies are only set if you give your consent.
            You can accept or reject analytics cookies at any time.
            </p>
            <div className="cookie-banner__actions">
              <button
                type="button"
                className="cookie-banner__button cookie-banner__button--secondary"
                onClick={() => handleCookieChoice('rejected')}
              >
                Reject
              </button>
              <button type="button" className="cookie-banner__button" onClick={() => handleCookieChoice('accepted')}>
                Accept
              </button>
              <a className="cookie-banner__link" href="/cookies-policy">
                View details
              </a>
            </div>
          </div>
        </div>
      )}
      {showSplash && (
        <div className={`splash-screen${isFading ? ' is-fading' : ''}`} aria-hidden="true">
          <Image src="/images/topbar_logo.avif" alt="Nova Clinics Logo" />
        </div>
      )}
    </div>
  );
}

export default function AppRoot() {
  return (
    <HelmetProvider>
      <Router>
        <App />
      </Router>
    </HelmetProvider>
  );
} 
