import React, { useEffect, useMemo, useState } from 'react';
import './howItWorks.css';

import { Timeline } from 'primereact/timeline';
import { Image } from 'primereact/image';

const ITEMS = [
  {
    n: 1,
    title: 'Pre‑call (15 min, free)',
    detail: 'Brief chat to understand your goals, explain the process and next steps.'
  },
  {
    n: 2,
    title: 'Information gathering',
    detail: 'Questionnaires and background history from parents/teachers to build a full picture.'
  },
  {
    n: 3,
    title: 'Assessment day (2–3 hrs)',
    detail:
      'Online cognitive testing + structured play/interaction (ASC) or continuous‑performance tasks (ADHD).',
  },
  {
    n: 4,
    title: 'Multi‑disciplinary case meeting',
    detail: 'Clinicians review findings together and agree the conclusions and recommendations.'
  },
  {
    n: 5,
    title: 'Feedback session (1 hr)',
    detail: 'Walkthrough of outcomes, personalised report and time for your questions.'
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
