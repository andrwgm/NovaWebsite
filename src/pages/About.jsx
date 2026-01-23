import React from 'react';
import FullTeam from '../components/FullTeam';
import TrustBadges from '../components/TrustBadges';
import './about.css';

export default function About() {
  return (
    <main className="about">
      <section className="about-hero">
        <h1 className="about-hero__title">A faster path to<div style={{fontFamily: 'TimesNewRomanMTCondensedItalic', paddingLeft: '3rem'}}>clear answers</div></h1>
        <p className="about-hero__description">
          Nova is a consultant-led clinic specialising in private Autism and ADHD assessments across the UK.
          We combine NHS-level expertise with the warmth of a family practice—making sure you feel guided,
          informed and supported at every milestone.
        </p>
      </section>

      <section className="about-clinic">
        <div className="about-clinic__image">
          <img src="/images/flower-kid.avif" alt="Child" />
        </div>
        <div className="about-clinic__content">
          <h2>Care built around <div style={{fontFamily: 'TimesNewRomanMTCondensedItalic', paddingLeft: '3rem'}}>you or your family</div></h2>
          <p>
            Our multidisciplinary team makes the diagnostic journey smoother for both adults and children.
            We offer online assessments, same-week availability, and reports accepted for EHCPs, workplace
            adjustments and university support plans.
          </p>
          <ul>
            <li>Consultant psychiatrists with GMC registration and NHS backgrounds.</li>
            <li>Care coordinators who handle booking, paperwork and follow-up recommendations.</li>
            <li>Clear pricing for combined or standalone Autism and ADHD pathways.</li>
            <li>Dedicated aftercare so you know the exact next steps once you receive your report.</li>
          </ul>
        </div>
      </section>

      <section className="about-values">
        <article>
          <h3>Evidence-<span style={{fontFamily: 'TimesNewRomanMTCondensedItalic'}}>first</span></h3>
          <p>
            Assessments follow NICE guidelines and gold-standard tools, ensuring reliable outcomes recognised by schools
            and employers.
          </p>
        </article>
        <article>
          <h3>Human <span style={{fontFamily: 'TimesNewRomanMTCondensedItalic'}}>support</span></h3>
          <p>
            You will always have a single point-of-contact ready to answer questions, share updates and celebrate progress.
          </p>
        </article>
        <article>
          <h3>Zero <span style={{fontFamily: 'TimesNewRomanMTCondensedItalic'}}>waiting list</span></h3>
          <p>
            Appointments are available right away, helping you skip the 18-24 month delays typical in the public system.
          </p>
        </article>
      </section>

      <div className="about-team">
        <FullTeam />
      </div>

      <TrustBadges />
    </main>
  );
}
