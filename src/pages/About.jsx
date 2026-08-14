import React, { Suspense, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDeferredRender } from '../utils/deferredRender';
import AboutStory from '../components/AboutStory';
import './about.css';

const FullTeam = React.lazy(() => import('../components/FullTeam'));
const PeopleBehind = React.lazy(() => import('../components/PeopleBehind'));
const TrustBadges = React.lazy(() => import('../components/TrustBadges'));

export default function About() {
  const location = useLocation();
  const anchorId = location.hash ? location.hash.replace('#', '') : '';
  const loadDeferred = useDeferredRender({ immediate: Boolean(location.hash) });

  useEffect(() => {
    if (!anchorId || !loadDeferred) return;

    requestAnimationFrame(() => {
      const target = document.getElementById(anchorId);
      if (target) {
        const offset = 120;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
      }
    });
  }, [anchorId, loadDeferred]);

  return (
    <main className="about">
      <AboutStory />

      {loadDeferred && (
        <Suspense fallback={null}>
          <div className="about-team">
            <FullTeam />
          </div>
          <PeopleBehind />
          <TrustBadges />
        </Suspense>
      )}
    </main>
  );
}
