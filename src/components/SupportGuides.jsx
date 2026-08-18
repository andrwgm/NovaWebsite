import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Accordion, AccordionTab } from 'primereact/accordion';
import BeforeAssessmentGuide from './BeforeAssessmentGuide';
import AfterAssessmentGuide from './AfterAssessmentGuide';
import ChildAtHomeGuide from './ChildAtHomeGuide';
import NotAloneGuide from './NotAloneGuide';
import './supportGuides.css';

export default function SupportGuides() {
  const tabSlugs = useMemo(
    () => ['before-the-assessment', 'during-the-assessment', 'supporting-your-child', 'youre-not-alone'],
    []
  );
  const slugToIndex = useMemo(() => {
    const map = {};
    tabSlugs.forEach((slug, idx) => {
      map[slug] = idx;
    });
    return map;
  }, [tabSlugs]);

  const [activeIndex, setActiveIndex] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const rawHash = location.hash.replace('#', '').toLowerCase();
    if (!rawHash) {
      setActiveIndex(null);
      return;
    }
    const hash = rawHash === 'after-the-assessment' ? 'during-the-assessment' : rawHash;
    const idx = slugToIndex[hash];
    if (typeof idx === 'number') {
      setActiveIndex(idx);
      if (hash !== rawHash) {
        navigate({ pathname: location.pathname, hash }, { replace: true });
      }
    }
  }, [location.hash, location.pathname, navigate, slugToIndex]);

  const handleTabChange = (event) => {
    const nextIndex = event.index;
    setActiveIndex(nextIndex);

    if (typeof nextIndex === 'number') {
      const nextHash = tabSlugs[nextIndex];
      if (nextHash) {
        navigate({ pathname: location.pathname, hash: nextHash }, { replace: true });
      }
    } else {
      navigate({ pathname: location.pathname, hash: '' }, { replace: true });
    }
  };

  if (import.meta.env.SSR) {
    return (
      <section className="support-guides">
        <div className="support-guides__panel support-guides__panel--before">
          <BeforeAssessmentGuide />
        </div>
        <div className="support-guides__panel support-guides__panel--after">
          <AfterAssessmentGuide />
        </div>
        <div className="support-guides__panel support-guides__panel--child">
          <ChildAtHomeGuide />
        </div>
        <div className="support-guides__panel support-guides__panel--alone">
          <NotAloneGuide />
        </div>
      </section>
    );
  }

  return (
    <section className="support-guides">
      <Accordion
        activeIndex={activeIndex}
        onTabChange={handleTabChange}
        className="support-guides__accordion"
      >
        <AccordionTab
          id="before-the-assessment"
          header={
            <h2>
              Before the <em>Assessment</em>
            </h2>
          }
          className="support-guides__tab"
          headerClassName="support-guides__header"
          contentClassName="support-guides__content"
          style={{ '--support-guide-color': '#FF787C', '--support-guide-z': 4 }}
        >
          <div className="support-guides__panel support-guides__panel--before">
            <BeforeAssessmentGuide />
          </div>
        </AccordionTab>

        <AccordionTab
          id="during-the-assessment"
          header={
            <h2>
              During the <em>Assessment</em>
            </h2>
          }
          className="support-guides__tab"
          headerClassName="support-guides__header"
          contentClassName="support-guides__content"
          style={{ '--support-guide-color': '#FFA6A8', '--support-guide-z': 3 }}
        >
          <div className="support-guides__panel support-guides__panel--after">
            <AfterAssessmentGuide />
          </div>
        </AccordionTab>

        <AccordionTab
          id="supporting-your-child"
          header={
            <h2>
              Supporting your <em>Child</em>
            </h2>
          }
          className="support-guides__tab"
          headerClassName="support-guides__header"
          contentClassName="support-guides__content"
          style={{ '--support-guide-color': '#D45286', '--support-guide-z': 2 }}
        >
          <div className="support-guides__panel support-guides__panel--child">
            <ChildAtHomeGuide />
          </div>
        </AccordionTab>

        <AccordionTab
          id="youre-not-alone"
          header={
            <h2>
              You&apos;re <em>not Alone</em>
            </h2>
          }
          className="support-guides__tab"
          headerClassName="support-guides__header"
          contentClassName="support-guides__content"
          style={{ '--support-guide-color': '#961D4E', '--support-guide-z': 1 }}
        >
          <div className="support-guides__panel support-guides__panel--alone">
            <NotAloneGuide />
          </div>
        </AccordionTab>
      </Accordion>
    </section>
  );
}
