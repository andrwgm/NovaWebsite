import React, { useEffect, useMemo, useState } from 'react';
import './howItWorks.css';

import { Timeline } from 'primereact/timeline';
import { Image } from 'primereact/image';

const ITEMS = [
  {
    n: 1,
    title: 'Online questionnaires (60 minutes)',
    detail: 'Parents, carers, and teachers (with consent) complete screened questionnaires to help us understand your child\'s developmental journey, behaviours, and family context.',
  },
  {
    n: 2,
    title: 'Parent/carer interview (90 minutes)',
    detail: 'A supportive conversation to explore your insights and experiences, ensuring we capture a full picture of your child\'s world.',
  },
  {
    n: 3,
    title: 'Child/Young person Observation (60 minutes)',
    detail: 'Gentle observation sessions to appreciate how your child engages and thrives in different settings.',
  },
  {
    n: 4,
    title: 'Multi‑disciplinary Team Review',
    detail: 'Our expert team - including Clinical Psychologists, Occupational Therapists and Speech & Language therapists - collaborates to integrate all information thoughtfully.',
  },
  {
    n: 5,
    title: 'Report and feedback session (60 minutes)',
    detail: 'We share a comprehensive report highlighting strengths and recommendations, with time for your questions and next steps.',
  },
];

const ITEMS_ADULTS = [
  {
    n: 1,
    title: 'Online questionnaires (60 minutes)',
    detail: 'You\'ll complete self-report questionnaires to reflect on your experiences, helping us build a picture of your journey.',
  },
  {
    n: 2,
    title: 'Personal interview (90 minutes)',
    detail: 'A one-to-one discussion with a specialist to explore your history, strengths, and daily life in a safe, non-judgmental space.',
  },
  {
    n: 3,
    title: 'Informant interview (60 minutes)',
    detail: 'We\'ll speak with someone who knows you well - such as a partner, parent, or close friend - to gain additional perspectives, always with your consent and in a respectful manner.',
  },
  {
    n: 4,
    title: 'Social Informant questionnaire (60 minutes)',
    detail: 'A separate questionnaire for someone from your social or professional circle (like a colleague or activity instructor, distinct from the previous informant) to provide broader insights into your interactions.',
  },
  {
    n: 5,
    title: 'Multidisciplinary Team Review',
    detail: 'Our team of experts reviews everything collaboratively, ensuring a well-rounded perspective.',
  },
  {
    n: 6,
    title: 'Report and feedback session (60 minutes)',
    detail: 'Receive your detailed report focusing on insights and supports, with dedicated time to discuss what it means for you.',
  },
];

export default function HowItWorks() {
  const [audience, setAudience] = useState('child');
  const items = useMemo(() => {
    const list = audience === 'adult' ? ITEMS_ADULTS : ITEMS;
    return list.map((it, idx) => ({ ...it, idx }));
  }, [audience]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [audience]);

  return (
    <div className="howItWorks">
      <div className="howItWorksHeader">
        <div className="howItWorksTitle">HOW IT WORKS</div>
      </div>
      <div className="howItWorksContent">
        <div className="howItWorksTimeline">
          <div className="hiw-center">
            <div className="hiw-toggle" aria-label="Select audience for timeline">
              <button
                type="button"
                className={`hiw-toggle-btn${audience === 'child' ? ' active' : ''}`}
                onClick={() => setAudience('child')}
              >
                Childs
              </button>
              <button
                type="button"
                className={`hiw-toggle-btn${audience === 'adult' ? ' active' : ''}`}
                onClick={() => setAudience('adult')}
              >
                Adults
              </button>
            </div>
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
              return (
                <div className="hiw-pill-wrap">
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
