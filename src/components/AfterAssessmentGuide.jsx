import React from 'react';
import SupportGuidePanel from './SupportGuidePanel';
import './afterAssessmentGuide.css';

const INTRO = [
  'Starting an assessment, can bring a mix of relief, uncertainty, and questions about what the process will involve.',
  'As the journey unfolds, understanding each stage and what it may mean can make everything feel clearer, more manageable, and less overwhelming.',
];

const HEADLINE = (
  <>
    <span>Clarity</span>
    <span>
      is only <em>the</em>
    </span>
    <span>beginning</span>
  </>
);

const TOPICS = [
  {
    id: 'journey',
    lines: (
      <>
        Understanding the
        <br />
        <em>assessment journey</em>
      </>
    ),
    description:
      'A clear overview of how the process develops, from questionnaires and interviews to structured assessment, MDT review, feedback and follow-up.',
  },
  {
    id: 'profile',
    lines: (
      <>
        Making sense of
        <br />
        <em>your profile</em>
      </>
    ),
    description:
      'Guidance to help understand patterns, strengths, differences and support needs as a fuller picture begins to emerge.',
  },
  {
    id: 'everyday',
    lines: (
      <>
        Everyday needs
        <br />
        <em>and daily life</em>
      </>
    ),
    description:
      'Practical insight into sensory needs, attention, organisation, routines, transitions, sleep, eating, recovery and social energy.',
  },
  {
    id: 'home',
    lines: (
      <>
        Support at
        <br />
        <em>home</em>
      </>
    ),
    description:
      'Simple ways to reduce pressure around everyday tasks, respond more effectively during difficult moments and make home life feel more manageable.',
  },
  {
    id: 'beyond',
    lines: (
      <>
        Support beyond
        <br />
        <em>home</em>
      </>
    ),
    description:
      'Guidance around education, work and other everyday settings, including practical adjustments and ways to make environments easier to access and navigate.',
  },
  {
    id: 'communicating',
    lines: (
      <>
        Communicating what
        <br />
        <em>you need</em>
      </>
    ),
    description:
      'Support for explaining needs clearly to family, school, work or healthcare professionals, including when writing may feel easier than speaking.',
  },
  {
    id: 'next',
    lines: (
      <>
        Knowing what
        <br />
        <em>comes next</em>
      </>
    ),
    description:
      'Practical next steps, trusted resources and guidance on where to look for further support without feeling you need to solve everything at once.',
  },
];

const PAGES = [
  { src: '/images/page-5.avif', alt: 'Your Support Journey page with a tiny reset activity' },
  { src: '/images/page-6.avif', alt: 'Your Support Journey page on understanding the profile' },
  { src: '/images/page-7.avif', alt: 'Your Support Journey page on other daily settings' },
  { src: '/images/page-8.avif', alt: 'Your Support Journey page on how information comes together' },
];

export default function AfterAssessmentGuide() {
  return (
    <SupportGuidePanel
      scope="journeyGuide"
      intro={INTRO}
      headline={HEADLINE}
      headlineVariant="journey"
      cover={{
        src: '/images/your-support-journey-cover.avif',
        alt: 'Your Support Journey guide cover',
      }}
      topics={TOPICS}
      pages={PAGES}
      topicsLabel="Topics inside Your Support Journey"
    />
  );
}
