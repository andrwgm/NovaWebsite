import React, { useState } from 'react';
import './supportGuideContent.css';
import './beforeAssessmentGuide.css';

export default function SupportGuidePanel({
  intro,
  headline,
  headlineVariant = 'default',
  cover,
  topics,
  pages,
  topicsLabel = 'Guide topics',
}) {
  const [activeId, setActiveId] = useState(topics[0]?.id);
  const activeTopic = topics.find((topic) => topic.id === activeId) ?? topics[0];

  return (
    <div className="supportGuideContent beforeAssessmentGuide">
      <div className="beforeAssessmentTop">
        <div className="beforeAssessmentTopLeft">
          <div className="beforeAssessmentIntro">
            {intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <h3
            className={`beforeAssessmentHeadline${
              headlineVariant !== 'default' ? ` beforeAssessmentHeadline--${headlineVariant}` : ''
            }`}
          >
            {headline}
          </h3>
        </div>

        <div className="beforeAssessmentTopRight">
          <div className="beforeAssessmentCover">
            <img
              src={cover.src}
              alt={cover.alt}
              loading="lazy"
              decoding="async"
              width={cover.width ?? 268}
              height={cover.height ?? 380}
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
          {pages.map((page) => (
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
            aria-label={topicsLabel}
          >
            {topics.map((topic) => {
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
