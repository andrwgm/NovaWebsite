import React from 'react';
import SupportGuidePanel from './SupportGuidePanel';
import './beforeAssessmentGuide.css';

const INTRO = [
  'Waiting for an assessment, whether for yourself or your child, can bring a mix of emotions and questions about what comes next.',
  'Our Pre-Assessment Guide is designed to help you understand the process, prepare for your appointment and feel more supported, with practical information, prompts and strategies you can start using straight away.',
];

const HEADLINE = (
  <>
    <span>Support</span>
    <span>doesn’t have to</span>
    <em>wait for</em>
    <span>a diagnosis</span>
  </>
);

const TOPICS = [
  {
    id: 'noticing',
    lines: (
      <>
        Understanding what
        <br />
        <em>you’re noticing</em>
      </>
    ),
    description:
      'Sensory, emotional and cognitive load, masking, fatigue, meltdowns and shutdowns, and why these experiences may become more noticeable while waiting.',
  },
  {
    id: 'changes',
    lines: (
      <>
        Practical changes you
        <br />
        <em>can make now</em>
      </>
    ),
    description:
      'Simple ways to reduce unnecessary load at home, school or work, including support around routines, transitions, communication, sensory needs and recovery.',
  },
  {
    id: 'supporting',
    lines: (
      <>
        Supporting children
        <br />
        <em>and young people</em>
      </>
    ),
    description:
      'Guidance to help recognise when a child may be approaching overload and respond with greater predictability, clearer communication and preventative support.',
  },
  {
    id: 'waiting',
    lines: (
      <>
        Making space for
        <br />
        <em>how waiting feels</em>
      </>
    ),
    description:
      'Relief, doubt, frustration, grief or even no strong emotion at all — the guide explores the different ways this period can affect families and individuals.',
  },
  {
    id: 'ahead',
    lines: (
      <>
        Understanding the
        <br />
        <em>assessment ahead</em>
      </>
    ),
    description:
      'A clear explanation of what an assessment is, what it isn’t, what information may be considered and how the process can turn uncertainty into a clearer picture.',
  },
  {
    id: 'tools',
    lines: (
      <>
        Tools you can
        <br />
        <em>actually use</em>
      </>
    ),
    description:
      'Practical prompts, sensory strategies, recovery planning and simple exercises designed to help you notice patterns and communicate needs more easily.',
  },
];

const PAGES = [
  { src: '/images/page-1.avif', alt: 'Pre-Assessment Guide page on sensory load' },
  { src: '/images/page-2.avif', alt: 'Pre-Assessment Guide page with a brief reflection' },
  { src: '/images/page-3.avif', alt: 'Pre-Assessment Guide page on what the assessment is' },
  { src: '/images/page-4.avif', alt: 'Pre-Assessment Guide page on a calm way forward' },
];

export default function BeforeAssessmentGuide() {
  return (
    <SupportGuidePanel
      scope="beforeGuide"
      intro={INTRO}
      headline={HEADLINE}
      cover={{
        src: '/images/while-youre-waiting-cover.avif',
        alt: "While You're Waiting guide cover",
      }}
      topics={TOPICS}
      pages={PAGES}
      topicsLabel="Topics inside the Pre-Assessment Guide"
      topicVisual={{
        src: '/images/magazine-mock-1.avif',
        alt: 'While You’re Waiting guide open in someone’s hands',
      }}
    />
  );
}
