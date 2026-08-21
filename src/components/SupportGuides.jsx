import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Accordion, AccordionTab } from 'primereact/accordion';
import BeforeAssessmentGuide from './BeforeAssessmentGuide';
import AfterAssessmentGuide from './AfterAssessmentGuide';
import ChildAtHomeGuide from './ChildAtHomeGuide';
import NotAloneGuide from './NotAloneGuide';
import './supportGuides.css';

const HINT_MAX_CYCLES = 1;
const HINT_REPLAY_MS = 12000;

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
  const [isHinting, setIsHinting] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const dismissedRef = useRef(false);
  const cyclesRef = useRef(0);
  const inViewRef = useRef(false);
  const replayTimerRef = useRef(0);
  const skipHint = Boolean(location.hash.replace('#', ''));

  const stopHint = useCallback(() => {
    dismissedRef.current = true;
    setIsHinting(false);
    window.clearTimeout(replayTimerRef.current);
  }, []);

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

  useEffect(() => {
    if (typeof activeIndex === 'number') {
      stopHint();
    }
  }, [activeIndex, stopHint]);

  useEffect(() => {
    if (dismissedRef.current) {
      return undefined;
    }

    if (skipHint) {
      dismissedRef.current = true;
      return undefined;
    }

    const section = sectionRef.current;
    if (!section || typeof window === 'undefined') {
      return undefined;
    }

    if (!window.matchMedia || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      dismissedRef.current = true;
      return undefined;
    }

    if (!('IntersectionObserver' in window)) {
      dismissedRef.current = true;
      return undefined;
    }

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const playCycle = () => {
      if (dismissedRef.current || !inViewRef.current) {
        return;
      }
      if (cyclesRef.current >= HINT_MAX_CYCLES) {
        return;
      }

      setIsHinting(false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (dismissedRef.current || !inViewRef.current) {
            return;
          }
          if (cyclesRef.current >= HINT_MAX_CYCLES) {
            return;
          }
          cyclesRef.current += 1;
          setIsHinting(true);
        });
      });
    };

    const scheduleReplay = () => {
      window.clearTimeout(replayTimerRef.current);
      if (dismissedRef.current || cyclesRef.current >= HINT_MAX_CYCLES || !inViewRef.current) {
        return;
      }

      replayTimerRef.current = window.setTimeout(() => {
        if (inViewRef.current && !dismissedRef.current) {
          playCycle();
        }
      }, HINT_REPLAY_MS);
    };

    const onAnimationEnd = (event) => {
      if (!(event.target instanceof HTMLElement)) {
        return;
      }
      if (!event.target.classList.contains('p-accordion-tab')) {
        return;
      }
      if (!String(event.animationName || '').endsWith('support-guide-peek')) {
        return;
      }
      setIsHinting(false);
      scheduleReplay();
    };

    const onMotionChange = () => {
      if (motionQuery.matches) {
        stopHint();
      }
    };

    const firstTab = section.querySelector('.p-accordion-tab');
    const observed = firstTab || section;
    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
        if (!entry.isIntersecting) {
          window.clearTimeout(replayTimerRef.current);
          return;
        }
        if (dismissedRef.current) {
          return;
        }
        if (cyclesRef.current === 0) {
          playCycle();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(observed);
    section.addEventListener('animationend', onAnimationEnd);
    section.addEventListener('webkitAnimationEnd', onAnimationEnd);
    if (motionQuery.addEventListener) {
      motionQuery.addEventListener('change', onMotionChange);
    } else if (motionQuery.addListener) {
      motionQuery.addListener(onMotionChange);
    }

    return () => {
      observer.disconnect();
      section.removeEventListener('animationend', onAnimationEnd);
      section.removeEventListener('webkitAnimationEnd', onAnimationEnd);
      window.clearTimeout(replayTimerRef.current);
      if (motionQuery.removeEventListener) {
        motionQuery.removeEventListener('change', onMotionChange);
      } else if (motionQuery.removeListener) {
        motionQuery.removeListener(onMotionChange);
      }
    };
  }, [skipHint, stopHint]);

  const handleTabChange = (event) => {
    stopHint();
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
    <section
      ref={sectionRef}
      className={`support-guides${isHinting ? ' support-guides--hinting' : ''}`}
    >
      <div onPointerDown={stopHint}>
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
      </div>
    </section>
  );
}
