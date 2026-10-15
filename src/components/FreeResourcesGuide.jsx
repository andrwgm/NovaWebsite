import React, { useEffect, useState } from 'react';
import { FREE_RESOURCE_TAGS, FREE_RESOURCES } from '../data/freeResources';
import './freeResourcesGuide.css';

const INTRO =
  'Explore our free, practical resources for autistic and ADHD children, adults, families and the people who support them. From understanding sensory needs and navigating routines to school, work, communication and everyday challenges, everything here is designed to be used in real life, not just read and forgotten.';

function resourceLabel(resource) {
  return `${resource.line} ${resource.emphasis}`;
}

function useMagnetic(ref, active) {
  useEffect(() => {
    const node = ref.current;
    if (!node || !active) {
      return undefined;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const engageRadius = 100;
    const releaseRadius = 176;
    const strength = 0.78;
    const maxPull = 54;
    const stiffness = 210;
    const damping = 24;

    let frame = 0;
    let running = false;
    let engaged = false;
    let currentX = 0;
    let currentY = 0;
    let velocityX = 0;
    let velocityY = 0;
    let targetX = 0;
    let targetY = 0;
    let lastTime = 0;

    const tick = (time) => {
      const dt = Math.min(0.032, lastTime ? (time - lastTime) / 1000 : 0.016);
      lastTime = time;
      const forceX = (targetX - currentX) * stiffness - velocityX * damping;
      const forceY = (targetY - currentY) * stiffness - velocityY * damping;
      velocityX += forceX * dt;
      velocityY += forceY * dt;
      currentX += velocityX * dt;
      currentY += velocityY * dt;
      node.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;

      const settled = Math.hypot(targetX - currentX, targetY - currentY) < 0.2 && Math.hypot(velocityX, velocityY) < 0.2;
      if (settled && targetX === 0 && targetY === 0) {
        currentX = 0;
        currentY = 0;
        velocityX = 0;
        velocityY = 0;
        node.style.transform = '';
        running = false;
        lastTime = 0;
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (!running) {
        running = true;
        frame = requestAnimationFrame(tick);
      }
    };

    const onMove = (event) => {
      if (event.pointerType && event.pointerType !== 'mouse') {
        return;
      }
      const rect = node.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2 - currentX;
      const centerY = rect.top + rect.height / 2 - currentY;
      const dx = event.clientX - centerX;
      const dy = event.clientY - centerY;
      const distance = Math.hypot(dx, dy);

      if (!engaged && distance < engageRadius) {
        engaged = true;
      } else if (engaged && distance > releaseRadius) {
        engaged = false;
      }

      if (engaged && distance > 0) {
        const pull = Math.min(maxPull, distance * strength);
        const scale = pull / distance;
        targetX = dx * scale;
        targetY = dy * scale;
      } else {
        targetX = 0;
        targetY = 0;
      }
      start();
    };

    const release = () => {
      engaged = false;
      targetX = 0;
      targetY = 0;
      start();
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('blur', release);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('blur', release);
      cancelAnimationFrame(frame);
      node.style.transform = '';
    };
  }, [ref, active]);
}

function ResourcePreview({ resource }) {
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [status, setStatus] = useState(resource.kind === 'pdf' ? 'loading' : 'ready');
  const canvasRef = React.useRef(null);
  const renderTaskRef = React.useRef(null);

  useEffect(() => {
    setPage(1);
  }, [resource.src]);

  useEffect(() => {
    if (resource.kind !== 'pdf') {
      return undefined;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }

    let cancelled = false;
    setStatus((current) => (current === 'ready' ? current : 'loading'));

    import('../lib/pdfPreview.js')
      .then(async ({ loadPdf, renderPdfPage }) => {
        const pdf = await loadPdf(resource.src);
        if (cancelled) {
          return;
        }
        renderTaskRef.current?.cancel();
        const task = renderPdfPage(pdf, page, canvas);
        renderTaskRef.current = task;
        const count = await task.promise;
        if (cancelled) {
          return;
        }
        setPageCount(count);
        setStatus('ready');
      })
      .catch((error) => {
        if (cancelled || error?.name === 'RenderingCancelledException') {
          return;
        }
        setStatus('error');
      });

    return () => {
      cancelled = true;
      renderTaskRef.current?.cancel();
    };
  }, [page, resource.kind, resource.src]);

  if (resource.kind === 'image') {
    return (
      <div className="freeResourcesPreview">
        <img src={resource.src} alt={resource.alt || resourceLabel(resource)} />
      </div>
    );
  }

  const canTurn = pageCount > 1;

  return (
    <div className="freeResourcesPreview">
      <div className="freeResourcesPreview__sheet">
        <canvas ref={canvasRef} role="img" aria-label={`${resourceLabel(resource)}, page ${page}${pageCount ? ` of ${pageCount}` : ''}`} />
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
      {status === 'loading' ? <p className="freeResourcesPreview__status">Opening preview…</p> : null}
      {status === 'error' ? (
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
