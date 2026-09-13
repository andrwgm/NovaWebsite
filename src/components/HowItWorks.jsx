import React, { useEffect, useMemo, useState } from 'react';
import './howItWorks.css';

import { Timeline } from 'primereact/timeline';
import { Image } from 'primereact/image';
import { requestContactModal } from '../utils/contactModalService';
import { FLOWS, HOW_IT_WORKS_PATHWAYS } from '../data/howItWorksPathways';

const UNDER8_WAITLIST_MESSAGE =
  'I would like to join the waiting list for the upcoming in-person hybrid autism pathway for a child under 8.';

function openUnder8Waitlist(assessment) {
  requestContactModal({
    message: UNDER8_WAITLIST_MESSAGE,
    source: 'how_it_works_under8_waitlist',
    itemId: assessment,
  });
}

function AgeEligibilityNote({ assessment, audience }) {
  if (audience !== 'child') return null;

  const waitlistLink = (
    <button
      type="button"
      className="hiw-age-note__link"
      onClick={() => openUnder8Waitlist(assessment)}
    >
      join the waiting list
    </button>
  );

  let body = null;
  if (assessment === 'adhd') {
    body = 'We do not assess ADHD in children under 8. Please speak with your GP.';
  } else if (assessment === 'autism') {
    body = (
      <>
        Our remote autism service is for ages 8 and above. If your child is under 8, you can{' '}
        {waitlistLink} for our upcoming in-person hybrid pathway.
      </>
    );
  } else if (assessment === 'combined') {
    body = (
      <>
        We do not assess ADHD under age 8. Please speak with your GP. Remote autism assessments
        are also 8+ only; you can {waitlistLink} for our upcoming in-person hybrid pathway.
      </>
    );
  }

  if (!body) return null;

  return (
    <div className="hiw-age-note" role="status">
      <span className="hiw-age-note__icon" aria-hidden="true">
        <i className="pi pi-info-circle" />
      </span>
      <span>{body}</span>
    </div>
  );
}

function HowItWorksDocument() {
  return (
    <details className="hiw-document">
      <summary>All assessment pathways and session times</summary>
      {HOW_IT_WORKS_PATHWAYS.map((pathway) => (
        <article key={pathway.id}>
          <h3>{pathway.label}</h3>
          <ol>
            {pathway.steps.map((step) => (
              <li key={step.title}>
                <strong>{step.title}</strong>
                {step.detail ? <p>{step.detail}</p> : null}
              </li>
            ))}
          </ol>
        </article>
      ))}
    </details>
  );
}

export default function HowItWorks() {
  const [assessment, setAssessment] = useState('autism');
  const [audience, setAudience] = useState('child');
  const items = useMemo(() => {
    const list = FLOWS[assessment]?.[audience] ?? [];
    return list.map((it, idx) => ({
      ...it,
      n: idx + 1,
      idx,
      extraInfo: it.extraInfo ?? it.detail,
    }));
  }, [assessment, audience]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeInfoIndex, setActiveInfoIndex] = useState(null);

  useEffect(() => {
    setActiveIndex(0);
    setActiveInfoIndex(null);
  }, [audience, assessment]);

  useEffect(() => {
    if (activeInfoIndex === null) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      const target = event.target;
      if (!(target instanceof Element) || !target.closest('.hiw-info-wrap')) {
        setActiveInfoIndex(null);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setActiveInfoIndex(null);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [activeInfoIndex]);

  return (
    <div className="howItWorks">
      <div className="howItWorksHeader">
        <h2 className="howItWorksTitle">How it <span style={{display: 'block', fontFamily: 'TimesNewRomanMTCondensedItalic', paddingLeft: '3rem'}}>works?</span></h2>
      </div>
      <div className="howItWorksContent">
        <div className="howItWorksTimeline">
          <div className="hiw-timeline-head">
            <div className="hiw-toggles" aria-label="Select timeline filters">
              <div className="hiw-toggle" role="group" aria-label="Select assessment type">
                <button
                  type="button"
                  className={`hiw-toggle-btn${assessment === 'autism' ? ' active' : ''}`}
                  onClick={() => setAssessment('autism')}
                >
                  Autism
                </button>
                <button
                  type="button"
                  className={`hiw-toggle-btn${assessment === 'adhd' ? ' active' : ''}`}
                  onClick={() => setAssessment('adhd')}
                >
                  ADHD
                </button>
                <button
                  type="button"
                  className={`hiw-toggle-btn${assessment === 'combined' ? ' active' : ''}`}
                  onClick={() => setAssessment('combined')}
                >
                  Combined
                </button>
              </div>
              <div className="hiw-toggle" role="group" aria-label="Select audience">
                <button
                  type="button"
                  className={`hiw-toggle-btn${audience === 'child' ? ' active' : ''}`}
                  onClick={() => setAudience('child')}
                >
                  Child
                </button>
                <button
                  type="button"
                  className={`hiw-toggle-btn${audience === 'adult' ? ' active' : ''}`}
                  onClick={() => setAudience('adult')}
                >
                  Adult
                </button>
              </div>
            </div>
            <AgeEligibilityNote assessment={assessment} audience={audience} />
          </div>
          <Timeline
            value={items}
            layout="vertical"
            align="left"
            marker={(item) => (
              <span className={`hiw-marker${item.idx === activeIndex ? ' active' : ''}`}>
                {item.n}
              </span>
            )}
            content={(item) => {
              const expanded = item.idx === activeIndex;
              const detailId = `hiw-detail-${item.idx}`;
              const infoId = `hiw-extra-info-${item.idx}`;
              const infoExpanded = item.idx === activeInfoIndex;
              return (
                <div className="hiw-pill-wrap">
                  <div
                    role="button"
                    tabIndex={0}
                    className={`hiw-pill${expanded ? ' expanded' : ''}`}
                    aria-expanded={expanded}
                    aria-controls={item.detail ? detailId : undefined}
                    onMouseEnter={() => {
                      setActiveIndex(item.idx);
                    }}
                    onFocus={() => {
                      setActiveIndex(item.idx);
                    }}
                    onClick={() => {
                      setActiveIndex(item.idx);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        setActiveIndex(item.idx);
                      }
                    }}
                  >
                    <div className="hiw-pill-head">
                      <div className="hiw-pill-title">{item.title}</div>
                      {item.extraInfo && (
                        <div
                          className="hiw-info-wrap"
                          onMouseEnter={() => {
                            setActiveInfoIndex(item.idx);
                          }}
                          onMouseLeave={() => {
                            setActiveInfoIndex((current) => (current === item.idx ? null : current));
                          }}
                        >
                          <button
                            type="button"
                            className="hiw-info-btn"
                            aria-label={`More information about step ${item.n}`}
                            aria-expanded={infoExpanded}
                            aria-controls={infoId}
                            onPointerDown={(event) => {
                              event.stopPropagation();
                            }}
                            onClick={(event) => {
                              event.stopPropagation();
                              setActiveInfoIndex((current) => (current === item.idx ? null : item.idx));
                            }}
                            onFocus={() => {
                              setActiveInfoIndex(item.idx);
                            }}
                            onBlur={(event) => {
                              if (!event.currentTarget.parentElement?.contains(event.relatedTarget)) {
                                setActiveInfoIndex((current) => (current === item.idx ? null : current));
                              }
                            }}
                          >
                            <i className="pi pi-info-circle" aria-hidden="true" />
                          </button>
                          <div
                            id={infoId}
                            role="tooltip"
                            className={`hiw-info-tooltip${infoExpanded ? ' visible' : ''}`}
                          >
                            {item.extraInfo}
                          </div>
                        </div>
                      )}
                    </div>
                    {item.detail && (
                      <div id={detailId} className="hiw-pill-detail">{item.detail}</div>
                    )}
                  </div>
                </div>
              );
            }}
          />
        </div>
        <div className="howItWorksImage">
          {audience === 'child' ? (
            <Image src="/images/necklace-kid.avif" alt="how it works" />
          ) : (
            <Image src="/images/grass-girls.avif" alt="how it works" />
          )}
        </div>
      </div>
      <HowItWorksDocument />
    </div>
  );
}
