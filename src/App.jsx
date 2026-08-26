import React, { Suspense, useEffect, useRef, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import { onContactModalRequest } from './utils/contactModalService';
import {
  applyBannerConsentChoice,
  denyAllGoogleConsent,
  readConsentPreferences,
  writeConsentPreferences,
} from './utils/googleAnalytics';

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
  const [cookieConsent, setCookieConsent] = useState(() => readConsentPreferences());
  const previousCookieConsent = useRef(cookieConsent);
  const shouldShowCookieBanner = cookieConsent === null;
  const [isCookieBannerReady, setIsCookieBannerReady] = useState(false);
  const [contactModalRequestId, setContactModalRequestId] = useState(0);
  const [contactModalPrefill, setContactModalPrefill] = useState('');
  const [contactModalSource, setContactModalSource] = useState('unknown');
  const [contactModalItemId, setContactModalItemId] = useState(undefined);
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
    const previous = previousCookieConsent.current;
    previousCookieConsent.current = cookieConsent;

    const removeCloudflareBeacon = () => {
      const script = document.querySelector('script[data-cf-beacon]');
      if (script) {
        script.remove();
      }
      if (window.__cfBeacon) {
        delete window.__cfBeacon;
      }
    };

    if (cookieConsent?.analytics) {
      if (!document.querySelector('script[data-cf-beacon]')) {
        const script = document.createElement('script');
        script.defer = true;
        script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
        script.setAttribute('data-cf-beacon', '{"token":"4ca237c52da34a759461480f964a0fc3"}');
        document.body.appendChild(script);
      }
    } else {
      removeCloudflareBeacon();
    }

    // First visit (null, never chosen): leave Consent Mode default denied.
    // Do not send a consent update — Google treats that as "user denied everything".
    if (cookieConsent === null) {
      if (previous !== null) {
        denyAllGoogleConsent();
      }
      return undefined;
    }

    // Hydration / withdraw→new choice: keep gtag aligned with stored prefs.
    // Banner clicks already called applyBannerConsentChoice synchronously.
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
      const nextSource = typeof payload?.source === 'string' && payload.source
        ? payload.source
        : 'unknown';
      const nextItemId = typeof payload?.itemId === 'string' && payload.itemId
        ? payload.itemId
        : undefined;
      setContactModalPrefill(nextMessage);
      setContactModalSource(nextSource);
      setContactModalItemId(nextItemId);
      setContactModalRequestId((current) => current + 1);
    });
    return unsubscribe;
  }, []);

  const handleCookieChoice = (preferences) => {
    applyBannerConsentChoice(preferences);
    writeConsentPreferences(preferences);
    setCookieConsent(preferences);
  };

  useEffect(() => {
    const handleConsentEvent = (event) => {
      const detail = event?.detail;
      if (detail === null) {
        handleCookieChoice(null);
        return;
      }
      if (
        detail
        && typeof detail === 'object'
        && typeof detail.analytics === 'boolean'
        && typeof detail.ads === 'boolean'
      ) {
        handleCookieChoice({ analytics: detail.analytics, ads: detail.ads });
      }
    };

    window.addEventListener('nova-cookie-consent', handleConsentEvent);
    return () => window.removeEventListener('nova-cookie-consent', handleConsentEvent);
  }, []);

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
          <ContactModal
            requestId={contactModalRequestId}
            prefillMessage={contactModalPrefill}
            formSource={contactModalSource}
            itemId={contactModalItemId}
          />
        </Suspense>
      )}
      {shouldShowCookieBanner && isCookieBannerReady && (
        <CookieBanner onChoice={handleCookieChoice} />
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
