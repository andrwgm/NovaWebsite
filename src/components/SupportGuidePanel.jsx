import React, { useState } from 'react';
import './supportGuideContent.css';

function SupportGuidePanelInner({
  scope,
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
  const c = (name, modifier) =>
    modifier ? `${scope}${name} ${scope}${name}--${modifier}` : `${scope}${name}`;

  const introBlock =
    intro.length > 0 ? (
      <div
        className={
          introPlacement === 'after-headline' ? c('Intro', 'aligned') : c('Intro')
        }
      >
        {intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    ) : null;

  const headlineBlock = (
    <h3
      className={
        headlineVariant !== 'default'
          ? c('Headline', headlineVariant)
          : c('Headline')
      }
    >
      {headline}
    </h3>
  );

  return (
    <>
      <div className={c('Top')}>
        <div className={c('TopLeft')}>
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

        <div className={c('TopRight')}>
          <div
            className={`${c('Cover')}${cover.className ? ` ${cover.className}` : ''}`}
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
            <p className={c('Explore')}>
              <span>Inside,</span>
              <em>you’ll</em>
              <span>explore</span>
            </p>
          ) : null}
        </div>
      </div>

      <div
        className={
          orientation === 'media-right' ? c('Bottom', 'mediaRight') : c('Bottom')
        }
      >
        <div className={c('Media')}>
          <div className={c('Pages')}>
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
        </div>

        <div className={c('Topics')}>
          <div className={c('TopicList')} role="listbox" aria-label={topicsLabel}>
            {topics.map((topic) => {
              const isActive = topic.id === activeId;
              return (
                <button
                  key={topic.id}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  className={`${c('Topic')}${isActive ? ' is-active' : ''}`}
                  onMouseEnter={() => setActiveId(topic.id)}
                  onFocus={() => setActiveId(topic.id)}
                  onClick={() => setActiveId(topic.id)}
                >
                  <span className={c('TopicLabel')}>{topic.lines}</span>
                </button>
              );
            })}
          </div>
          <p className={c('Description')} aria-live="polite">
            {activeTopic.description}
          </p>
        </div>
      </div>
    </>
  );
}

export default function SupportGuidePanel({
  scope,
  wrap = true,
  className = '',
  ...props
}) {
  const inner = <SupportGuidePanelInner scope={scope} {...props} />;

  if (!wrap) {
    return inner;
  }

  return (
    <div className={`supportGuideContent ${scope} ${className}`.trim()}>{inner}</div>
  );
}
