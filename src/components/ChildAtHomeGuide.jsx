import React from 'react';
import './supportGuideContent.css';
import './childAtHomeGuide.css';

const HOME_SIDE_ITEMS = [
  {
    title: 'Understanding your child',
    body:
      'Learn to notice everyday patterns, strengths, preferences and the situations that may feel more difficult. The activities help families look beyond behaviour and understand what their child may be communicating through their responses.',
  },
  {
    title: 'Sensory comfort & regulation',
    body:
      'Explore sensory preferences and discover practical ways to help your child feel more comfortable and regulated. From movement and textures to calming activities, the guide encourages you to find what works best for them.',
  },
];

const HOME_FULL_ITEMS = [
  {
    title: 'Routines, emotions & communication',
    body:
      'Use simple tools to make routines and transitions more predictable, while helping your child recognise emotions, body signals and different ways to communicate what they need.',
  },
  {
    title: 'Activities to explore together',
    body:
      'Creative and interactive activities designed for parents and children to complete side by side. They create opportunities to talk, play and discover your child’s needs, interests and ways of feeling comfortable together.',
  },
];

const SCHOOL_ITEMS = [
  {
    title: 'What helps me feel comfortable',
    body: 'The routines and environments that help your child feel settled.',
  },
  {
    title: 'Things I may find difficult',
    body: 'Sensory, social or everyday situations that may feel overwhelming.',
  },
  {
    title: 'How I communicate and feel',
    body:
      'Helping school understand how your child expresses emotions, communicates their needs and shows when things are becoming too much.',
  },
  {
    title: 'What helps me at school',
    body:
      'Practical strategies, breaks and adjustments that can make learning, transitions and the school day feel more manageable.',
  },
  {
    title: 'My strengths & interests',
    body: 'What your child enjoys, feels confident in and would like others to know.',
  },
];

export default function ChildAtHomeGuide() {
  return (
    <div className="supportGuideContent childAtHomeGuide">
      <div className="childAtHomeGuideIntroRow">
        <p className="supportGuideContentIntro childAtHomeGuideIntro">
          Everyday life at home can bring moments of connection, but also uncertainty about what your
          child may be feeling, needing, or trying to communicate. Understanding their patterns,
          preferences and responses can make daily routines feel clearer, more manageable, and more
          supportive for the whole family.
        </p>
        <p className="childAtHomeGuideLabel">
          At
          <br />
          Home
        </p>
      </div>

      <h3 className="supportGuideContentHeadline childAtHomeGuideHeadline">
        Small moments can make a big
        <br />
        difference.
      </h3>

      <div className="supportGuideContentFeature childAtHomeGuideFeature">
        <p className="supportGuideContentExplore">
          Inside, you’ll
          <br />
          explore
        </p>
        <div className="supportGuideContentCover childAtHomeGuideCover">
          <img
            src="/images/day-by-day-at-home-cover.avif"
            alt="Day by Day at Home guide cover"
            loading="lazy"
            decoding="async"
            width={268}
            height={380}
          />
        </div>
        <ul className="supportGuideContentList supportGuideContentList--side childAtHomeGuideList--side">
          {HOME_SIDE_ITEMS.map((item) => (
            <li key={item.title}>
              <strong>{item.title}</strong>
              <span>{item.body}</span>
            </li>
          ))}
        </ul>
      </div>

      <ul className="supportGuideContentList supportGuideContentList--full childAtHomeGuideList--homeFull">
        {HOME_FULL_ITEMS.map((item) => (
          <li key={item.title}>
            <strong>{item.title}</strong>
            <span>{item.body}</span>
          </li>
        ))}
      </ul>

      <div className="childAtHomeGuideSchool">
        <p className="childAtHomeGuideLabel childAtHomeGuideLabel--school">
          At
          <br />
          School
        </p>
        <p className="supportGuideContentIntro childAtHomeGuideSchoolIntro">
          My School Passport is a child-friendly booklet that helps families share key information
          with school about their child’s strengths, preferences and support needs.
        </p>
        <div className="childAtHomeGuideSchoolCover">
          <img
            src="/images/my-school-passport-cover.avif"
            alt="My School Passport guide cover"
            loading="lazy"
            decoding="async"
            width={160}
            height={228}
          />
        </div>
      </div>

      <div className="childAtHomeGuideSchoolBlocks">
        {SCHOOL_ITEMS.map((item) => (
          <div key={item.title} className="childAtHomeGuideSchoolBlock">
            <strong>{item.title}</strong>
            <span>{item.body}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
