import React, { useState } from 'react';
import './supportGuideContent.css';
import './beforeAssessmentGuide.css';

function SupportGuidePanelInner({
  intro = [],
  introPlacement = 'before-headline',
  headline,
  headlineVariant = 'default',
  cover,
  showExplore = true,
  topics,
  pages,
  topicsLabel = 'Guide topics',
  orientation = 'media-left',
}) {
  const [activeId, setActiveId] = useState(topics[0]?.id);
  const activeTopic = topics.find((topic) => topic.id === activeId) ?? topics[0];
  const coverRotate = cover.rotate ?? '18deg';

  const introBlock =
    intro.length > 0 ? (
      <div className="beforeAssessmentIntro">
        {intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    ) : null;

  const headlineBlock = (
    <h3
      className={`beforeAssessmentHeadline${
        headlineVariant !== 'default' ? ` beforeAssessmentHeadline--${headlineVariant}` : ''
      }`}
    >
      {headline}
    </h3>
  );

  return (
    <>
      <div className="beforeAssessmentTop">
        <div className="beforeAssessmentTopLeft">
          {introPlacement === 'before-headline' ? (
            <>
              {introBlock}
              {headlineBlock}
            </>
          ) : (
            <>
              {headlineBlock}
              {introBlock}
            </>
          )}
        </div>

        <div className="beforeAssessmentTopRight">
          <div
            className={`beforeAssessmentCover${cover.className ? ` ${cover.className}` : ''}`}
            style={{ '--cover-rotate': coverRotate }}
          >
            <img
              src={cover.src}
              alt={cover.alt}
              loading="lazy"
              decoding="async"
              width={cover.width ?? 268}
              height={cover.height ?? 380}
            />
          </div>
          {showExplore ? (
            <p className="beforeAssessmentExplore">
              <span>Inside,</span>
              <em>you’ll</em>
              <span>explore</span>
            </p>
          ) : null}
        </div>
      </div>

      <div
        className={`beforeAssessmentBottom${
          orientation === 'media-right' ? ' beforeAssessmentBottom--mediaRight' : ''
        }`}
      >
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
    </>
  );
}

export default function SupportGuidePanel({
  wrap = true,
  className = '',
  ...props
}) {
  const inner = <SupportGuidePanelInner {...props} />;

  if (!wrap) {
    return inner;
  }

  return (
    <div className={`supportGuideContent beforeAssessmentGuide ${className}`.trim()}>
      {inner}
    </div>
  );
}
