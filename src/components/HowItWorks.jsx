import React, { useEffect, useMemo, useState } from 'react';
import './howItWorks.css';

import { Timeline } from 'primereact/timeline';
import { Image } from 'primereact/image';

const CHILD_STEPS_AUTISM = [
  {
    title: 'Ch Aut Online questionnaires (60 minutes)',
    detail: 'Parents, carers, and teachers (with consent) complete screened questionnaires to help us understand your child\'s developmental journey, behaviours, and family context.',
    extraInfo: 'Extra info: Parents, carers, and teachers (with consent) complete screened questionnaires to help us understand your child\'s developmental journey, behaviours, and family context.',
  },
  {
    title: 'Parent/carer interview (90 minutes)',
    detail: 'A supportive conversation to explore your insights and experiences, ensuring we capture a full picture of your child\'s world.',
    extraInfo: 'Extra info: A supportive conversation to explore your insights and experiences, ensuring we capture a full picture of your child\'s world.',
  },
  {
    title: 'Child/Young person Observation (60 minutes)',
    detail: 'Gentle observation sessions to appreciate how your child engages and thrives in different settings.',
    extraInfo: 'Extra info: Gentle observation sessions to appreciate how your child engages and thrives in different settings.',
  },
  {
    title: 'Multi‑disciplinary Team Review',
    detail: 'Our expert team - including Clinical Psychologists, Occupational Therapists and Speech & Language therapists - collaborates to integrate all information thoughtfully.',
    extraInfo: 'Extra info: Our expert team - including Clinical Psychologists, Occupational Therapists and Speech & Language therapists - collaborates to integrate all information thoughtfully.',
  },
  {
    title: 'Report and feedback session (60 minutes)',
    detail: 'We share a comprehensive report highlighting strengths and recommendations, with time for your questions and next steps.',
    extraInfo: 'Extra info: We share a comprehensive report highlighting strengths and recommendations, with time for your questions and next steps.',
  },
  {
    title: 'Post-assessment follow-up',
    detail: 'We check in after feedback to answer questions, support next steps, and share any additional resources.',
    extraInfo: 'Extra info: We check in after feedback to answer questions, support next steps, and share any additional resources.',
  },
];

const ADULT_STEPS_AUTISM = [
  {
    title: 'Ad Aut Online questionnaires (60 minutes)',
    detail: 'You\'ll complete self-report questionnaires to reflect on your experiences, helping us build a picture of your journey.',
    extraInfo: 'Extra info: You\'ll complete self-report questionnaires to reflect on your experiences, helping us build a picture of your journey.',
  },
  {
    title: 'Personal interview (90 minutes)',
    detail: 'A one-to-one discussion with a specialist to explore your history, strengths, and daily life in a safe, non-judgmental space.',
    extraInfo: 'Extra info: A one-to-one discussion with a specialist to explore your history, strengths, and daily life in a safe, non-judgmental space.',
  },
  {
    title: 'Informant interview (60 minutes)',
    detail: 'We\'ll speak with someone who knows you well - such as a partner, parent, or close friend - to gain additional perspectives, always with your consent and in a respectful manner.',
    extraInfo: 'Extra info: We\'ll speak with someone who knows you well - such as a partner, parent, or close friend - to gain additional perspectives, always with your consent and in a respectful manner.',
  },
  {
    title: 'Social Informant questionnaire (60 minutes)',
    detail: 'A separate questionnaire for someone from your social or professional circle (like a colleague or activity instructor, distinct from the previous informant) to provide broader insights into your interactions.',
    extraInfo: 'Extra info: A separate questionnaire for someone from your social or professional circle (like a colleague or activity instructor, distinct from the previous informant) to provide broader insights into your interactions.',
  },
  {
    title: 'Multidisciplinary Team Review',
    detail: 'Our team of experts reviews everything collaboratively, ensuring a well-rounded perspective.',
    extraInfo: 'Extra info: Our team of experts reviews everything collaboratively, ensuring a well-rounded perspective.',
  },
  {
    title: 'Report and feedback session (60 minutes)',
    detail: 'Receive your detailed report focusing on insights and supports, with dedicated time to discuss what it means for you.',
    extraInfo: 'Extra info: Receive your detailed report focusing on insights and supports, with dedicated time to discuss what it means for you.',
  },
  {
    title: 'Post-assessment follow-up',
    detail: 'We follow up after feedback to answer questions, support next steps, and share any additional resources.',
    extraInfo: 'Extra info: We follow up after feedback to answer questions, support next steps, and share any additional resources.',
  },
];

const CHILD_STEPS_ADHD = [
  {
    title: 'Ch Ad Online questionnaires (60 minutes)',
    detail: 'Parents, carers, and teachers (with consent) complete screened questionnaires to help us understand your child\'s developmental journey, behaviours, and family context.',
    extraInfo: 'Extra info: Parents, carers, and teachers (with consent) complete screened questionnaires to help us understand your child\'s developmental journey, behaviours, and family context.',
  },
  {
    title: 'Parent/carer interview (90 minutes)',
    detail: 'A supportive conversation to explore your insights and experiences, ensuring we capture a full picture of your child\'s world.',
    extraInfo: 'Extra info: A supportive conversation to explore your insights and experiences, ensuring we capture a full picture of your child\'s world.',
  },
  {
    title: 'Child/Young person Observation (60 minutes)',
    detail: 'Gentle observation sessions to appreciate how your child engages and thrives in different settings.',
    extraInfo: 'Extra info: Gentle observation sessions to appreciate how your child engages and thrives in different settings.',
  },
  {
    title: 'Multi‑disciplinary Team Review',
    detail: 'Our expert team - including Clinical Psychologists, Occupational Therapists and Speech & Language therapists - collaborates to integrate all information thoughtfully.',
    extraInfo: 'Extra info: Our expert team - including Clinical Psychologists, Occupational Therapists and Speech & Language therapists - collaborates to integrate all information thoughtfully.',
  },
  {
    title: 'Report and feedback session (60 minutes)',
    detail: 'We share a comprehensive report highlighting strengths and recommendations, with time for your questions and next steps.',
    extraInfo: 'Extra info: We share a comprehensive report highlighting strengths and recommendations, with time for your questions and next steps.',
  },
  {
    title: 'Post-assessment follow-up',
    detail: 'We check in after feedback to answer questions, support next steps, and share any additional resources.',
    extraInfo: 'Extra info: We check in after feedback to answer questions, support next steps, and share any additional resources.',
  },
];

const ADULT_STEPS_ADHD = [
  {
    title: 'Ad Ad Online questionnaires (60 minutes)',
    detail: 'You\'ll complete self-report questionnaires to reflect on your experiences, helping us build a picture of your journey.',
    extraInfo: 'Extra info: You\'ll complete self-report questionnaires to reflect on your experiences, helping us build a picture of your journey.',
  },
  {
    title: 'Personal interview (90 minutes)',
    detail: 'A one-to-one discussion with a specialist to explore your history, strengths, and daily life in a safe, non-judgmental space.',
    extraInfo: 'Extra info: A one-to-one discussion with a specialist to explore your history, strengths, and daily life in a safe, non-judgmental space.',
  },
  {
    title: 'Informant interview (60 minutes)',
    detail: 'We\'ll speak with someone who knows you well - such as a partner, parent, or close friend - to gain additional perspectives, always with your consent and in a respectful manner.',
    extraInfo: 'Extra info: We\'ll speak with someone who knows you well - such as a partner, parent, or close friend - to gain additional perspectives, always with your consent and in a respectful manner.',
  },
  {
    title: 'Social Informant questionnaire (60 minutes)',
    detail: 'A separate questionnaire for someone from your social or professional circle (like a colleague or activity instructor, distinct from the previous informant) to provide broader insights into your interactions.',
    extraInfo: 'Extra info: A separate questionnaire for someone from your social or professional circle (like a colleague or activity instructor, distinct from the previous informant) to provide broader insights into your interactions.',
  },
  {
    title: 'Multidisciplinary Team Review',
    detail: 'Our team of experts reviews everything collaboratively, ensuring a well-rounded perspective.',
    extraInfo: 'Extra info: Our team of experts reviews everything collaboratively, ensuring a well-rounded perspective.',
  },
  {
    title: 'Report and feedback session (60 minutes)',
    detail: 'Receive your detailed report focusing on insights and supports, with dedicated time to discuss what it means for you.',
    extraInfo: 'Extra info: Receive your detailed report focusing on insights and supports, with dedicated time to discuss what it means for you.',
  },
  {
    title: 'Post-assessment follow-up',
    detail: 'We follow up after feedback to answer questions, support next steps, and share any additional resources.',
    extraInfo: 'Extra info: We follow up after feedback to answer questions, support next steps, and share any additional resources.',
  },
];

const CHILD_STEPS_COMBINED = [
  {
    title: 'Ch Co Online questionnaires (60 minutes)',
    detail: 'Parents, carers, and teachers (with consent) complete screened questionnaires to help us understand your child\'s developmental journey, behaviours, and family context.',
    extraInfo: 'Extra info: Parents, carers, and teachers (with consent) complete screened questionnaires to help us understand your child\'s developmental journey, behaviours, and family context.',
  },
  {
    title: 'Parent/carer interview (90 minutes)',
    detail: 'A supportive conversation to explore your insights and experiences, ensuring we capture a full picture of your child\'s world.',
    extraInfo: 'Extra info: A supportive conversation to explore your insights and experiences, ensuring we capture a full picture of your child\'s world.',
  },
  {
    title: 'Child/Young person Observation (60 minutes)',
    detail: 'Gentle observation sessions to appreciate how your child engages and thrives in different settings.',
    extraInfo: 'Extra info: Gentle observation sessions to appreciate how your child engages and thrives in different settings.',
  },
  {
    title: 'Multi‑disciplinary Team Review',
    detail: 'Our expert team - including Clinical Psychologists, Occupational Therapists and Speech & Language therapists - collaborates to integrate all information thoughtfully.',
    extraInfo: 'Extra info: Our expert team - including Clinical Psychologists, Occupational Therapists and Speech & Language therapists - collaborates to integrate all information thoughtfully.',
  },
  {
    title: 'Report and feedback session (60 minutes)',
    detail: 'We share a comprehensive report highlighting strengths and recommendations, with time for your questions and next steps.',
    extraInfo: 'Extra info: We share a comprehensive report highlighting strengths and recommendations, with time for your questions and next steps.',
  },
  {
    title: 'Post-assessment follow-up',
    detail: 'We check in after feedback to answer questions, support next steps, and share any additional resources.',
    extraInfo: 'Extra info: We check in after feedback to answer questions, support next steps, and share any additional resources.',
  },
];

const ADULT_STEPS_COMBINED = [
  {
    title: 'Ad Co Online questionnaires (60 minutes)',
    detail: 'You\'ll complete self-report questionnaires to reflect on your experiences, helping us build a picture of your journey.',
    extraInfo: 'Extra info: You\'ll complete self-report questionnaires to reflect on your experiences, helping us build a picture of your journey.',
  },
  {
    title: 'Personal interview (90 minutes)',
    detail: 'A one-to-one discussion with a specialist to explore your history, strengths, and daily life in a safe, non-judgmental space.',
    extraInfo: 'Extra info: A one-to-one discussion with a specialist to explore your history, strengths, and daily life in a safe, non-judgmental space.',
  },
  {
    title: 'Informant interview (60 minutes)',
    detail: 'We\'ll speak with someone who knows you well - such as a partner, parent, or close friend - to gain additional perspectives, always with your consent and in a respectful manner.',
    extraInfo: 'Extra info: We\'ll speak with someone who knows you well - such as a partner, parent, or close friend - to gain additional perspectives, always with your consent and in a respectful manner.',
  },
  {
    title: 'Social Informant questionnaire (60 minutes)',
    detail: 'A separate questionnaire for someone from your social or professional circle (like a colleague or activity instructor, distinct from the previous informant) to provide broader insights into your interactions.',
    extraInfo: 'Extra info: A separate questionnaire for someone from your social or professional circle (like a colleague or activity instructor, distinct from the previous informant) to provide broader insights into your interactions.',
  },
  {
    title: 'Multidisciplinary Team Review',
    detail: 'Our team of experts reviews everything collaboratively, ensuring a well-rounded perspective.',
    extraInfo: 'Extra info: Our team of experts reviews everything collaboratively, ensuring a well-rounded perspective.',
  },
  {
    title: 'Report and feedback session (60 minutes)',
    detail: 'Receive your detailed report focusing on insights and supports, with dedicated time to discuss what it means for you.',
    extraInfo: 'Extra info: Receive your detailed report focusing on insights and supports, with dedicated time to discuss what it means for you.',
  },
  {
    title: 'Post-assessment follow-up',
    detail: 'We follow up after feedback to answer questions, support next steps, and share any additional resources.',
    extraInfo: 'Extra info: We follow up after feedback to answer questions, support next steps, and share any additional resources.',
  },
];

const FLOWS = {
  autism: {
    child: CHILD_STEPS_AUTISM,
    adult: ADULT_STEPS_AUTISM,
  },
  adhd: {
    child: CHILD_STEPS_ADHD,
    adult: ADULT_STEPS_ADHD,
  },
  combined: {
    child: CHILD_STEPS_COMBINED,
    adult: ADULT_STEPS_COMBINED,
  },
};

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
        <div className="howItWorksTitle">How it <div style={{fontFamily: 'TimesNewRomanMTCondensedItalic', paddingLeft: '3rem'}}>works?</div></div>
      </div>
      <div className="howItWorksContent">
        <div className="howItWorksTimeline">
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
    </div>
  );
}
