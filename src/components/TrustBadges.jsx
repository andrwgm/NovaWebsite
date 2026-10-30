import React from 'react';
import './trustBadges.css';

// Nova Clinics itself is not HCPC registered or endorsed, so no logo here. This is the
// statement about our clinicians, in plain words.
export const CLINICIAN_REGISTRATION_STATEMENT =
  'All our clinicians are registered with the Health and Care Professions Council (HCPC).';

export default function TrustBadges({
  title = 'Our clinicians',
  className = '',
}) {
  return (
    <section className={`trust-badges ${className}`.trim()} aria-label={title}>
      <span className="trust-badges-title">{title}</span>
      <p className="trust-badges-text">{CLINICIAN_REGISTRATION_STATEMENT}</p>
    </section>
  );
}
