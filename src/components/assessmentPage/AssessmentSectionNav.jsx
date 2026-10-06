import React, { useEffect, useState } from 'react';
import './assessmentSectionNav.css';

export default function AssessmentSectionNav({ content }) {
  const links = content.sectionLinks;
  const [activeId, setActiveId] = useState(links[0].id);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      return undefined;
    }

    const targets = links
      .map((link) => document.getElementById(link.id))
      .filter(Boolean);
    if (!targets.length) {
      return undefined;
    }

    // A section is "current" while it crosses a thin band around the middle of the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [links]);

  const handleClick = (event, id) => {
    const target = document.getElementById(id);
    if (!target) {
      return;
    }
    event.preventDefault();
    setActiveId(id);
    const reduceMotion = typeof window.matchMedia === 'function'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    window.history.replaceState(null, '', `#${id}`);
  };

  return (
    <nav className="asmt-nav" aria-label="On this page">
      <ul className="asmt-nav__list">
        {links.map((link) => {
          const isActive = link.id === activeId;
          return (
            <li key={link.id}>
              <a
                className={`asmt-nav__link${isActive ? ' is-active' : ''}`}
                href={`#${link.id}`}
                aria-current={isActive ? 'location' : undefined}
                onClick={(event) => handleClick(event, link.id)}
              >
                {link.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
