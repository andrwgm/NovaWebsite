import React, { useEffect, useMemo, useState } from 'react';
import './howItWorks.css';

import { Timeline } from 'primereact/timeline';
import { Image } from 'primereact/image';

const ITEMS = [
  {
    n: 1,
    title: 'Online questionnaires (60 minutes)',
    detail: 'Parents and teachers answer a screened questionnaire to build a full picture of your child’s development, behaviour and family history.'
  },
  {
    n: 2,
    title: 'Parent interview (90 minutes)',
    detail: 'Detailed discussion with the parents about their child’s behaviour and interactions with others'
  },
  {
    n: 3,
    title: 'Child observation (60 minutes)',
    detail:
      'Observation of the child in a play setting to assess their social and communication skills.',
  },
  {
    n: 4,
    title: 'Multi‑disciplinary case meeting',
    detail: 'Clinicians review findings together and agree the conclusions and recommendations.'
  },
  {
    n: 5,
    title: 'Report and feedback session (60 minutes)',
    detail: 'Walkthrough of outcomes, personalised report and time for your questions and feedback.'
  },
];

export default function HowItWorks() {
  const items = useMemo(() => ITEMS.map((it, idx) => ({ ...it, idx })), []);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="howItWorks">
      <div className="howItWorksTitle">HOW IT WORKS</div>
      <div className="howItWorksContent">
        <div className="howItWorksTimeline">
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
              return (
                <div
                  className={`hiw-pill${expanded ? ' expanded' : ''}`}
                  aria-expanded={expanded}
                  onMouseEnter={() => {
                    setActiveIndex(item.idx);
                  }}
                >
                  <div className="hiw-pill-title">{item.title}</div>
                  {item.detail && (
                    <div className="hiw-pill-detail">{item.detail}</div>
                  )}
                </div>
              );
            }}
          />
        </div>
        <div className="howItWorksImage">
          <Image src="/images/penguin-kid.jpg" alt="how it works" />
        </div>
      </div>
    </div>
  );
}
