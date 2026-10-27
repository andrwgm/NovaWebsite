import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BlogSeo from '../blog/BlogSeo';
import BlogJsonLd from '../blog/BlogJsonLd';
import ContactForm from './ContactForm';
import ContactAside from './ContactAside';
import Under8InterestForm from './Under8InterestForm';
import {
  CONTACT_HERO,
  CONTACT_SEO,
  CONTACT_URL,
  buildContactPageJsonLd,
  resolveContactRequest,
} from '../../data/contactPage';
import { UNDER8_INTEREST_ANCHOR } from '../../data/assessmentPricing';
import './contactPage.css';

const CONTACT_JSON_LD = buildContactPageJsonLd();

export default function ContactPage() {
  const location = useLocation();

  // location.key changes on every navigation to /contact, including pressing a contact
  // button while already here, so the form re-applies the new defaults each time.
  const request = useMemo(
    () => resolveContactRequest(location.state),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location.key]
  );

  // The under-8 interest list sits under the enquiry form on the child route.
  const [audience, setAudience] = useState(request.audience);
  const handleAudienceChange = useCallback((next) => setAudience(next), []);

  // Buttons that say "Join the interest list" land here and scroll to the form.
  useEffect(() => {
    if (!request.under8Interest) return undefined;
    const timer = window.setTimeout(() => {
      const target = document.getElementById(UNDER8_INTEREST_ANCHOR);
      if (!target) return;
      const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      target.focus({ preventScroll: true });
    }, 100);
    return () => window.clearTimeout(timer);
  }, [request]);

  return (
    // App already wraps routes in <main>, so this is a plain container.
    <div className="cpage">
      <BlogSeo
        title={CONTACT_SEO.title}
        description={CONTACT_SEO.description}
        canonicalUrl={CONTACT_URL}
        ogImage={CONTACT_SEO.image}
        ogType="website"
      />
      <BlogJsonLd schema={CONTACT_JSON_LD} />

      <section className="cpage__hero" aria-labelledby="cpage-title">
        <nav className="cpage__breadcrumb" aria-label="Breadcrumb">
          <ol>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li aria-current="page">Contact</li>
          </ol>
        </nav>
        <p className="cpage__label">{CONTACT_HERO.label}</p>
        <h1 className="cpage__title" id="cpage-title">
          {CONTACT_HERO.titleLead}{' '}
          <span className="cpage__title-italic">{CONTACT_HERO.titleItalic}</span>
        </h1>
        <p className="cpage__intro">{CONTACT_HERO.intro}</p>
      </section>

      <section className="cpage__body">
        <div className="cpage__main">
          <div className="cpage__form-card">
            <ContactForm request={request} onAudienceChange={handleAudienceChange} />
          </div>
          {audience === 'child' && <Under8InterestForm defaultService={request.service} />}
        </div>
        <ContactAside />
      </section>
    </div>
  );
}
