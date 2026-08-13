import React from 'react';
import './beforeAssessmentGuide.css';

const SIDE_ITEMS = [
  {
    title: 'Understanding what you’re noticing',
    body:
      'Sensory, emotional and cognitive load, masking, fatigue, meltdowns and shutdowns, and why these experiences may become more noticeable while waiting.',
  },
  {
    title: 'Practical changes you can make now',
    body:
      'Simple ways to reduce unnecessary load at home, school or work, including support around routines, transitions, communication, sensory needs and recovery.',
  },
  {
    title: 'Supporting children and young people',
    body:
      'Guidance to help recognise when a child may be approaching overload and respond with greater predictability, clearer communication and preventative support',
  },
];

const FULL_ITEMS = [
  {
    title: 'Making space for how waiting feels',
    body:
      'Relief, doubt, frustration, grief or even no strong emotion at all, the guide explores the different ways this period can affect families and individuals.',
  },
  {
    title: 'Understanding the assessment ahead',
    body:
      'A clear explanation of what an assessment is, what it isn’t, what information may be considered and how the process can turn uncertainty into a clearer picture.',
  },
  {
    title: 'Tools you can actually use',
    body:
      'Practical prompts, sensory strategies, recovery planning and simple exercises designed to help you notice patterns and communicate needs more easily.',
  },
];

export default function BeforeAssessmentGuide() {
  return (
    <div className="beforeAssessmentGuide">
      <p className="beforeAssessmentGuideIntro">
        Waiting for an assessment — whether for yourself or your child — can bring many
        emotions: hope, uncertainty, and questions about what comes next.
      </p>

      <h3 className="beforeAssessmentGuideHeadline">
        Support doesn’t have to wait
        <br />
        for a diagnosis
      </h3>

      <p className="beforeAssessmentGuideIntro">
        That’s why we’ve created our <strong>Pre-Assessment Guide</strong>, designed to help you
        understand the process, prepare for your appointment.
      </p>

      <div className="beforeAssessmentGuideFeature">
        <div className="beforeAssessmentGuideFeatureVisual">
          <p className="beforeAssessmentGuideExplore">
            Inside, you’ll
            <br />
            explore
          </p>
          <div className="beforeAssessmentGuideCover">
            <img
              src="/images/while-youre-waiting-cover.avif"
              alt="While You're Waiting guide cover"
              loading="lazy"
              decoding="async"
              width={268}
              height={380}
            />
          </div>
        </div>

        <ul className="beforeAssessmentGuideList beforeAssessmentGuideList--side">
          {SIDE_ITEMS.map((item) => (
            <li key={item.title}>
              <strong>{item.title}</strong> {item.body}
            </li>
          ))}
        </ul>
      </div>

      <ul className="beforeAssessmentGuideList beforeAssessmentGuideList--full">
        {FULL_ITEMS.map((item) => (
          <li key={item.title}>
            <strong>{item.title}</strong> {item.body}
          </li>
        ))}
      </ul>

      <p className="beforeAssessmentGuideClosing">
        Because understanding can begin
        <br />
        before the assessment does.
      </p>
    </div>
  );
}
