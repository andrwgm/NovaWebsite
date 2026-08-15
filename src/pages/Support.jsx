import React, { Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { useDeferredRender } from '../utils/deferredRender';
import './support.css';

const SupportGuides = React.lazy(() => import('../components/SupportGuides'));

export default function Support() {
  const location = useLocation();
  const loadDeferred = useDeferredRender({ immediate: Boolean(location.hash) });

  return (
    <main className="support">
      <section className="support-hero">
        <h1 className="support-hero__title">Understanding<div style={{fontFamily: 'TimesNewRomanMTCondensedItalic', paddingLeft: '3rem'}}>starts here</div></h1>
        <p className="support-hero__description">
          Your Nova Clinics box has been thoughtfully created to offer support beyond the assessment itself. Inside, you’ll find practical guides, family resources and interactive activities designed to inform, reassure and support you throughout the journey. Explore each resource below to discover what’s inside and how it can help along the way.
        </p>
      </section>

      <section className="support-highlight">
        <p className="support-highlight__statement">
          Through every stage, through every day — <div style={{fontFamily: 'TimesNewRomanMTCondensedItalic'}}>Nova&apos;s here to guide your way</div>
        </p>
        <div className="support-highlight__image">
          <img src="/images/girl-book.avif" alt="Person reading while resting on a sofa" />
        </div>
      </section>

      {loadDeferred && (
        <Suspense fallback={null}>
          <SupportGuides />
        </Suspense>
      )}
    </main>
  );
}
