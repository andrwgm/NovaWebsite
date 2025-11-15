import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import CareersOfferDetails from './pages/CareersOfferDetails';
import Support from './pages/Support';
import CookiesPolicy from './pages/CookiesPolicy';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';

import "./app.css";

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const tabMap = ['/', '/about', '/contact'];
  const activeIndex = tabMap.indexOf(location.pathname);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const handleTabChange = (e) => {
    navigate(tabMap[e.index]);
  };

  return (
    <>
      <Navbar activeIndex={activeIndex} onTabChange={handleTabChange} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/support" element={<Support />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/careers/:slug" element={<CareersOfferDetails />} />
        <Route path="/cookies-policy" element={<CookiesPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <ContactModal />
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
