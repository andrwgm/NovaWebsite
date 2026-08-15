import React, { useState } from 'react';
import './supportGuideContent.css';
import './beforeAssessmentGuide.css';

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

const PAGE_IMAGES = [
  { src: '/images/page-1.avif', alt: 'Pre-Assessment Guide page on sensory load' },
  { src: '/images/page-2.avif', alt: 'Pre-Assessment Guide page with a brief reflection' },
  { src: '/images/page-3.avif', alt: 'Pre-Assessment Guide page on what the assessment is' },
  { src: '/images/page-4.avif', alt: 'Pre-Assessment Guide page on a calm way forward' },
];

export default function BeforeAssessmentGuide() {
  const [activeId, setActiveId] = useState(TOPICS[0].id);
  const activeTopic = TOPICS.find((topic) => topic.id === activeId) ?? TOPICS[0];

  return (
    <div className="supportGuideContent beforeAssessmentGuide">
      <div className="beforeAssessmentTop">
        <div className="beforeAssessmentTopLeft">
          <div className="beforeAssessmentIntro">
            <p>
              Waiting for an assessment, whether for yourself or your child, can bring a mix of
              emotions and questions about what comes next.
            </p>
            <p>
              Our Pre-Assessment Guide is designed to help you understand the process, prepare for
              your appointment and feel more supported, with practical information, prompts and
              strategies you can start using straight away.
            </p>
          </div>

          <h3 className="beforeAssessmentHeadline">
            <span>Support</span>
            <span>doesn’t have to</span>
            <em>wait for</em>
            <span>a diagnosis</span>
          </h3>
        </div>

        <div className="beforeAssessmentTopRight">
          <div className="beforeAssessmentCover">
            <img
              src="/images/while-youre-waiting-cover.avif"
              alt="While You're Waiting guide cover"
              loading="lazy"
              decoding="async"
              width={268}
              height={380}
            />
          </div>
          <p className="beforeAssessmentExplore">
            <span>Inside,</span>
            <em>you’ll</em>
            <span>explore</span>
          </p>
        </div>
      </div>

      <div className="beforeAssessmentBottom">
        <div className="beforeAssessmentPages">
          {PAGE_IMAGES.map((page) => (
            <img
              key={page.src}
              src={page.src}
              alt={page.alt}
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>

        <div className="beforeAssessmentTopics">
          <div
            className="beforeAssessmentTopicList"
            role="listbox"
            aria-label="Topics inside the Pre-Assessment Guide"
          >
            {TOPICS.map((topic) => {
              const isActive = topic.id === activeId;
              return (
                <button
                  key={topic.id}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  className={`beforeAssessmentTopic${isActive ? ' is-active' : ''}`}
                  onMouseEnter={() => setActiveId(topic.id)}
                  onFocus={() => setActiveId(topic.id)}
                  onClick={() => setActiveId(topic.id)}
                >
                  <span className="beforeAssessmentTopicLabel">{topic.lines}</span>
                </button>
              );
            })}
          </div>
          <p className="beforeAssessmentDescription" aria-live="polite">
            {activeTopic.description}
          </p>
        </div>
      </div>
    </div>
  );
}
