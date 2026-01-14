import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Careers from './pages/Careers';
import CareersOfferDetails from './pages/CareersOfferDetails';
import Support from './pages/Support';
import CookiesPolicy from './pages/CookiesPolicy';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import NotFound from './pages/NotFound';
import UnderConstruction from './pages/UnderConstruction';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';

import { Image } from 'primereact/image';

import "./app.css";

function AppContent() {
  const location = useLocation();
  const [showSplash, setShowSplash] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const hasShownSplash = useRef(false);

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

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/support" element={<Support />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/careers/:slug" element={<CareersOfferDetails />} />
        <Route path="/resources" element={<UnderConstruction />} />
        <Route path="/blog" element={<UnderConstruction />} />
        <Route path="/best-practices" element={<UnderConstruction />} />
        <Route path="/cookies-policy" element={<CookiesPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <ContactModal />
      {showSplash && (
        <div className={`splash-screen${isFading ? ' is-fading' : ''}`} aria-hidden="true">
          <Image src="/images/topbar_logo.png" alt="Nova Clinics" />
        </div>
      )}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
} 
