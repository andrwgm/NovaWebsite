import React from 'react';
import SupportGuides from '../components/SupportGuides';
import './support.css';

export default function Support() {
  return (
    <main className="support">
      <section className="support-hero">
        <h1 className="support-hero__title">Understanding<div style={{fontFamily: 'TimesNewRomanMTCondensedItalic', paddingLeft: '3rem'}}>starts here</div></h1>
        <p className="support-hero__description">
          At Nova Clinics, we recognise that every neurodiverse journey is unique. This space brings together trusted information, practical tools, and emotional support - all in one place. Explore the topics below to discover guides, activities, and useful links for understanding and supporting yourself or your loved one.
        </p>
      </section>

      <section className="support-highlight">
        <p className="support-highlight__statement">
          Through every stage, through every day — <div style={{fontFamily: 'TimesNewRomanMTCondensedItalic'}}>Nova&apos;s here to guide your way</div>
        </p>
        <div className="support-highlight__image">
          <img src="/images/girl-book.png" alt="Person reading while resting on a sofa" />
        </div>
      </section>

      <SupportGuides />
    </main>
  );
}
