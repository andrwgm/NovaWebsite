import React from 'react';
import './trustBadges.css';

const DEFAULT_BADGES = [
  {
    id: 'hcpc',
    src: '/images/hcpc-logo.png',
    alt: 'HCPC registered',
  },
];

export default function TrustBadges({ title = 'Professional accreditations', badges = DEFAULT_BADGES }) {
  return (
    <section className="trust-badges" aria-label={title}>
      <span className="trust-badges-title">{title}</span>
      <div className="trust-badges-grid">
        {badges.map((badge) => (
          <div key={badge.id ?? badge.alt} className="trust-badge">
            <img src={badge.src} alt={badge.alt} loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
}
