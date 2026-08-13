import React from 'react';
import './supportGuideContent.css';

const SIDE_ITEMS = [
  {
    title: 'Understanding the assessment journey',
    body:
      'A clear overview of how the process develops, from questionnaires and interviews to structured assessment, MDT review, feedback and follow-up.',
  },
  {
    title: 'Making sense of your profile',
    body:
      'Guidance to help understand patterns, strengths, differences and support needs as a fuller picture begins to emerge.',
  },
  {
    title: 'Everyday needs and daily life',
    body:
      'Practical insight into sensory needs, attention, organisation, routines, transitions, sleep, eating, recovery and social energy.',
  },
  {
    title: 'Support at home',
    body:
      'Simple ways to reduce pressure around everyday tasks, respond more effectively during difficult moments and make home life feel more manageable.',
  },
];

const FULL_ITEMS = [
  {
    title: 'Support beyond home',
    body:
      'Guidance around education, work and other everyday settings, including practical adjustments and ways to make environments easier to access and navigate.',
  },
  {
    title: 'Communicating what you need',
    body:
      'Support for explaining needs clearly to family, school, work or healthcare professionals, including when writing may feel easier than speaking.',
  },
  {
    title: 'Knowing what comes next',
    body:
      'Practical next steps, trusted resources and guidance on where to look for further support without feeling you need to solve everything at once.',
  },
];

export default function AfterAssessmentGuide() {
  return (
    <div className="supportGuideContent">
      <p className="supportGuideContentIntro">
        Starting an assessment, can bring a mix of relief, uncertainty, and questions about what
        the process will involve. As the journey unfolds, understanding each stage and what it may
        mean can make everything feel clearer, more manageable, and less overwhelming.
      </p>

      <h3 className="supportGuideContentHeadline">Clarity is only the beginning.</h3>

      <div className="supportGuideContentFeature">
        <p className="supportGuideContentExplore">
          Inside, you’ll
          <br />
          explore
        </p>
        <div className="supportGuideContentCover">
          <img
            src="/images/your-support-journey-cover.avif"
            alt="Your Support Journey guide cover"
            loading="lazy"
            decoding="async"
            width={268}
            height={380}
          />
        </div>
        <ul className="supportGuideContentList supportGuideContentList--side">
          {SIDE_ITEMS.map((item) => (
            <li key={item.title}>
              <strong>{item.title}</strong>
              <span>{item.body}</span>
            </li>
          ))}
        </ul>
      </div>

      <ul className="supportGuideContentList supportGuideContentList--full">
        {FULL_ITEMS.map((item) => (
          <li key={item.title}>
            <strong>{item.title}</strong>
            <span>{item.body}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
