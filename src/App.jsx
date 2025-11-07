import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';

import "./app.css";

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const tabMap = ['/', '/about', '/contact'];
  const activeIndex = tabMap.indexOf(location.pathname);

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
