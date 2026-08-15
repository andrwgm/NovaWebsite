import React from 'react';
import SupportGuidePanel from './SupportGuidePanel';
import './childAtHomeGuide.css';

const HOME_INTRO = [
  'Starting an assessment, can bring a mix of relief, uncertainty, and questions about what the process will involve.',
  'As the journey unfolds, understanding each stage and what it may mean can make everything feel clearer, more manageable, and less overwhelming.',
];

const HOME_HEADLINE = (
  <>
    <span>At</span> <em>home</em>
  </>
);

const HOME_TOPICS = [
  {
    id: 'child',
    lines: (
      <>
        Understanding
        <br />
        <em>your child</em>
      </>
    ),
    description:
      'Learn to notice everyday patterns, strengths, preferences and the situations that may feel more difficult. The activities help families look beyond behaviour and understand what their child may be communicating through their responses.',
  },
  {
    id: 'sensory',
    lines: (
      <>
        Sensory comfort
        <br />
        <em>& regulation</em>
      </>
    ),
    description:
      'Explore sensory preferences and discover practical ways to help your child feel more comfortable and regulated. From movement and textures to calming activities, the guide encourages you to find what works best for them.',
  },
  {
    id: 'routines',
    lines: (
      <>
        Routines, emotions
        <br />
        <em>& communication</em>
      </>
    ),
    description:
      'Use simple tools to make routines and transitions more predictable, while helping your child recognise emotions, body signals and different ways to communicate what they need.',
  },
  {
    id: 'activities',
    lines: (
      <>
        Activities to
        <br />
        <em>explore together</em>
      </>
    ),
    description:
      'Creative and interactive activities designed for parents and children to complete side by side. They create opportunities to talk, play and discover your child’s needs, interests and ways of feeling comfortable together.',
  },
];

const HOME_PAGES = [
  { src: '/images/page-9.avif', alt: 'Day by Day at Home page: the hard moment map' },
  { src: '/images/page-10.avif', alt: 'Day by Day at Home page: first, next, then' },
  { src: '/images/page-11.avif', alt: 'Day by Day at Home page: window painting activity' },
  { src: '/images/page-12.avif', alt: 'Day by Day at Home page: sensory comfort at home' },
];

const SCHOOL_INTRO = [
  'My School Passport is a child-friendly booklet designed to help families share important information with school about their child’s strengths, preferences, communication style and support needs.',
  'It gives children and parents a simple, creative way to explain what helps them feel comfortable, understood and supported in the classroom, so teachers can build a clearer picture of the individual behind the diagnosis.',
];

const SCHOOL_HEADLINE = (
  <>
    <span>At</span> <em>school</em>
  </>
);

const SCHOOL_TOPICS = [
  {
    id: 'comfortable',
    lines: (
      <>
        What helps me
        <br />
        <em>feel comfortable</em>
      </>
    ),
    description:
      'The routines, familiar environments, sensory preferences and small adjustments that help your child feel settled, safe and more at ease throughout the school day.',
  },
  {
    id: 'difficult',
    lines: (
      <>
        Things I may
        <br />
        <em>find difficult</em>
      </>
    ),
    description:
      'Sensory, social or everyday situations that may feel confusing, demanding or overwhelming, alongside the early signs that your child may need more time, space or support.',
  },
  {
    id: 'communicate',
    lines: (
      <>
        How I communicate
        <br />
        <em>and feel</em>
      </>
    ),
    description:
      'Helping school understand how your child expresses emotions, communicates their needs, responds to other people and shows when they are becoming tired, anxious or overwhelmed.',
  },
  {
    id: 'at-school',
    lines: (
      <>
        What helps me
        <br />
        <em>at school</em>
      </>
    ),
    description:
      'Practical strategies, communication approaches, breaks and reasonable adjustments that can make learning, transitions, changes in routine and the wider school day feel more manageable and predictable.',
  },
  {
    id: 'strengths',
    lines: (
      <>
        My strengths
        <br />
        <em>& interests</em>
      </>
    ),
    description:
      'The things your child enjoys, feels confident in and is proud of, as well as the interests, skills and qualities that can help teachers understand what motivates and engages them.',
  },
];

const SCHOOL_PAGES = [
  { src: '/images/page-13.avif', alt: 'My School Passport page: the hard moment map' },
  { src: '/images/page-14.avif', alt: 'My School Passport page: first, next, then' },
  { src: '/images/page-15.avif', alt: 'My School Passport page: window painting activity' },
  { src: '/images/page-16.avif', alt: 'My School Passport page: sensory comfort' },
];

export default function ChildAtHomeGuide() {
  return (
    <div className="supportGuideContent beforeAssessmentGuide beforeAssessmentGuide--child">
      <section className="beforeAssessmentBlock" aria-label="At home">
        <SupportGuidePanel
          wrap={false}
          intro={HOME_INTRO}
          headline={HOME_HEADLINE}
          headlineVariant="section"
          headlinePlacement="with-media"
          cover={{
            src: '/images/day-by-day-at-home-cover.avif',
            alt: 'Day by Day at Home guide cover',
            rotate: '24deg',
          }}
          showExplore
          topics={HOME_TOPICS}
          pages={HOME_PAGES}
          topicsLabel="Topics inside Day by Day at Home"
          orientation="media-left"
        />
      </section>

      <section className="beforeAssessmentBlock" aria-label="At school">
        <SupportGuidePanel
          wrap={false}
          intro={SCHOOL_INTRO}
          introPlacement="after-headline"
          headline={SCHOOL_HEADLINE}
          headlineVariant="section"
          cover={{
            src: '/images/my-school-passport-cover.avif',
            alt: 'My School Passport guide cover',
            rotate: '-16deg',
            className: 'beforeAssessmentCover--school',
          }}
          showExplore={false}
          topics={SCHOOL_TOPICS}
          pages={SCHOOL_PAGES}
          topicsLabel="Topics inside My School Passport"
          orientation="media-right"
        />
      </section>
    </div>
  );
}
