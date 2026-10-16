import React, { useEffect, useState } from 'react';
import { FREE_RESOURCE_TAGS, FREE_RESOURCES } from '../data/freeResources';
import useMagnetic from '../lib/useMagnetic';
import './freeResourcesGuide.css';

const INTRO =
  'Explore our free, practical resources for autistic and ADHD children, adults, families and the people who support them. From understanding sensory needs and navigating routines to school, work, communication and everyday challenges, everything here is designed to be used in real life, not just read and forgotten.';

function resourceLabel(resource) {
  return `${resource.line} ${resource.emphasis}`;
}

function ResourcePreview({ resource }) {
  const previews = resource.previews ?? [];
  const [page, setPage] = useState(1);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setPage(1);
    setFailed(false);
  }, [resource.src]);

  useEffect(() => {
    previews.forEach((src) => {
      const image = new Image();
      image.src = src;
    });
  }, [resource.src, previews]);

  if (resource.kind === 'image') {
    return (
      <div className="freeResourcesPreview">
        <img src={resource.src} alt={resource.alt || resourceLabel(resource)} />
      </div>
    );
  }

  const pageCount = previews.length;
  const canTurn = pageCount > 1;
  const showMore = Boolean(resource.moreBeyondPreview) && page === pageCount;
  const src = previews[page - 1];

  return (
    <div className="freeResourcesPreview">
      <div className="freeResourcesPreview__sheet">
        {src ? (
          <img
            src={src}
            alt={`${resourceLabel(resource)}, preview page ${page}`}
            onError={() => setFailed(true)}
          />
        ) : null}
        {showMore ? <p className="freeResourcesPreview__more">There's more if you download</p> : null}
        {canTurn ? (
          <>
            <button
              type="button"
              className="freeResourcesPreview__arrow freeResourcesPreview__arrow--prev"
              aria-label="Previous page"
              disabled={page <= 1}
              onClick={() => setPage((current) => Math.max(1, current - 1))}
            >
              <i className="pi pi-chevron-left" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="freeResourcesPreview__arrow freeResourcesPreview__arrow--next"
              aria-label="Next page"
              disabled={page >= pageCount}
              onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
            >
              <i className="pi pi-chevron-right" aria-hidden="true" />
            </button>
          </>
        ) : null}
      </div>
      {failed ? (
        <p className="freeResourcesPreview__status">The preview could not be opened. You can still download the file.</p>
      ) : null}
      {canTurn ? (
        <span className="freeResourcesPreview__count">
          {page} / {pageCount}
        </span>
      ) : null}
    </div>
  );
}

function matchesTags(resource, tags) {
  return tags.every((tag) => resource.tags.includes(tag));
}

export default function FreeResourcesGuide() {
  const downloadRef = React.useRef(null);
  const [activeTags, setActiveTags] = useState(['children']);
  const [resourceId, setResourceId] = useState(FREE_RESOURCES[0].id);
  const visibleResources = FREE_RESOURCES.filter((item) => matchesTags(item, activeTags));
  const resource = visibleResources.find((item) => item.id === resourceId) ?? visibleResources[0] ?? null;
  useMagnetic(downloadRef, Boolean(resource));

  const toggleTag = (tagId) => {
    const nextTags = activeTags.includes(tagId)
      ? activeTags.filter((tag) => tag !== tagId)
      : [...activeTags, tagId];
    const nextVisible = FREE_RESOURCES.filter((item) => matchesTags(item, nextTags));
    setActiveTags(nextTags);
    if (!nextVisible.some((item) => item.id === resourceId)) {
      setResourceId(nextVisible[0]?.id ?? null);
    }
  };

  return (
    <div className="freeResources">
      <p className="freeResources__tagline">
        Small tools can make everyday life feel a little easier.
      </p>
      <p className="freeResources__intro">{INTRO}</p>

      <div className="freeResources__spotlight">
        <img
          src="/images/tooth-kid.avif"
          alt="A smiling child showing a missing tooth"
          width="640"
          height="420"
        />
        <h3 className="freeResources__headline">
          <span>Practical support</span>
          <em>for real life</em>
        </h3>
      </div>

      <h3 className="freeResources__browse">
        Browse resources
        <i className="pi pi-arrow-down" aria-hidden="true" />
      </h3>

      <div className="freeResources__categories" role="group" aria-label="Filter resources">
        {FREE_RESOURCE_TAGS.map((item) => {
          const selected = activeTags.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={selected}
              className={`freeResources__category${selected ? ' is-active' : ''}`}
              onClick={() => toggleTag(item.id)}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="freeResources__stage">
        <div className="freeResources__list" role="listbox" aria-label="Resources">
          {visibleResources.length === 0 ? (
            <p className="freeResources__empty">No resources match these filters.</p>
          ) : null}
          {visibleResources.map((item) => {
            const selected = item.id === resource?.id;
            return (
              <button
                key={item.id}
                type="button"
                role="option"
                aria-selected={selected}
                className={`freeResources__resource${selected ? ' is-active' : ''}`}
                onMouseEnter={() => setResourceId(item.id)}
                onFocus={() => setResourceId(item.id)}
                onClick={() => setResourceId(item.id)}
              >
                <span>
                  {item.line}
                  <em>{item.emphasis}</em>
                </span>
              </button>
            );
          })}
        </div>

        {resource ? (
          <div className="freeResources__detail">
            <ResourcePreview resource={resource} />
            <div className="freeResources__aside">
              <a ref={downloadRef} className="freeResources__download" href={resource.src} download={resource.filename}>
                <i className="pi pi-download" aria-hidden="true" />
                Download
              </a>
              <p className="freeResources__note">{resource.description}</p>
            </div>
          </div>
        ) : null}
      </div>

      <div className="freeResources__close">
        <h3>
          <span>A little support</span>
          <em>can go</em>
          <span>a long way</span>
        </h3>
        <p>{INTRO}</p>
      </div>

      <p className="freeResources__signoff">
        Keep exploring. Take what helps. Come back whenever you need it.
      </p>
    </div>
  );
}
