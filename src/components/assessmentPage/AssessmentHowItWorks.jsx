import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { requestContact } from '../../utils/contactRequestService';
import './assessmentHowItWorks.css';

const TITLE_WITH_DURATION = /^(.*?)\s*\(([^)]+)\)\s*$/;

/** Short pause before hover opens/closes anything, so brushing past a step does not flicker the list. */
const HOVER_OPEN_DELAY_MS = 120;
/** Grace period that lets the pointer travel from the "i" icon to its bubble without closing it. */
const INFO_CLOSE_DELAY_MS = 200;

/** "Online questionnaires (60 minutes)" -> name + short duration, so the pill can lay them out apart. */
function splitStepTitle(title) {
  const match = TITLE_WITH_DURATION.exec(title);
  if (!match) {
    return { name: title, duration: '' };
  }
  return { name: match[1], duration: match[2].replace(/minutes?/i, 'min') };
}

export default function AssessmentHowItWorks({ content }) {
  const pathways = content.pathways;
  const [audienceId, setAudienceId] = useState('adult');
  const [openIndex, setOpenIndex] = useState(0);
  const [infoIndex, setInfoIndex] = useState(null);
  const hoverTimer = useRef(null);
  const infoTimer = useRef(null);
  // Step opened by hovering: the click that usually follows must keep it open, not close it.
  const hoverOpenedIndex = useRef(null);

  const audiences = useMemo(
    () => pathways.audiences.map((audience) => ({
      ...audience,
      steps: audience.steps.map((step, index) => ({
        ...step,
        ...splitStepTitle(step.title),
        index,
        extraInfo: step.extraInfo || step.detail,
      })),
    })),
    [pathways],
  );
  const activeAudience = audiences.find((item) => item.id === audienceId);

  const clearTimers = useCallback(() => {
    window.clearTimeout(hoverTimer.current);
    window.clearTimeout(infoTimer.current);
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const selectAudience = (id) => {
    clearTimers();
    hoverOpenedIndex.current = null;
    setAudienceId(id);
    setOpenIndex(0);
    setInfoIndex(null);
  };

  const handleStepClick = (index) => {
    window.clearTimeout(hoverTimer.current);
    if (hoverOpenedIndex.current === index) {
      hoverOpenedIndex.current = null;
      setOpenIndex(index);
      return;
    }
    setOpenIndex((current) => (current === index ? -1 : index));
  };

  const handleStepPointerEnter = (event, index) => {
    // Touch taps also fire pointerenter; they are handled by the click that follows.
    if (event.pointerType !== 'mouse') {
      return;
    }
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => {
      hoverOpenedIndex.current = index;
      setOpenIndex(index);
    }, HOVER_OPEN_DELAY_MS);
  };

  const handleStepPointerLeave = () => {
    window.clearTimeout(hoverTimer.current);
    // Once the pointer leaves, a later click is a deliberate toggle again.
    hoverOpenedIndex.current = null;
  };

  const showInfo = (index) => {
    window.clearTimeout(infoTimer.current);
    setInfoIndex(index);
  };

  const scheduleInfoClose = (index) => {
    window.clearTimeout(infoTimer.current);
    infoTimer.current = window.setTimeout(() => {
      setInfoIndex((current) => (current === index ? null : current));
    }, INFO_CLOSE_DELAY_MS);
  };

  useEffect(() => {
    if (infoIndex === null) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      const target = event.target;
      if (!(target instanceof Element) || !target.closest('.asmt-step__info-wrap')) {
        setInfoIndex(null);
      }
    };
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setInfoIndex(null);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [infoIndex]);

  return (
    <section className="asmt-steps" id="how-it-works" aria-labelledby="asmt-steps-title">
      <div className="asmt-steps__layout">
        <div className="asmt-steps__intro">
          <h2 className="asmt-steps__title" id="asmt-steps-title">
            {pathways.titleLead}{' '}
            <span className="asmt-steps__title-italic">{pathways.titleItalic}</span>
          </h2>
          <p className="asmt-steps__text">{pathways.intro}</p>

          <div className="asmt-steps__toggle" role="group" aria-label="Choose who the assessment is for">
            {audiences.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`asmt-steps__toggle-btn${item.id === audienceId ? ' is-active' : ''}`}
                aria-pressed={item.id === audienceId}
                onClick={() => selectAudience(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          {audienceId === 'child' && (
            <p className="asmt-steps__note" role="status">
              <i className="pi pi-info-circle" aria-hidden="true" />
              <span>
                {pathways.childNote}
                {pathways.childNoteAction && (
                  <>
                    {' '}
                    <button
                      type="button"
                      className="asmt-steps__note-action"
                      onClick={() => requestContact({
                        message: pathways.childNoteAction.message,
                        source: pathways.childNoteAction.source,
                        itemId: pathways.childNoteAction.itemId,
                        audience: pathways.childNoteAction.audience,
                        waitlist: pathways.childNoteAction.waitlist,
                      })}
                    >
                      {pathways.childNoteAction.label}
                      <span aria-hidden="true"> →</span>
                    </button>
                  </>
                )}
              </span>
            </p>
          )}
        </div>

        {/*
          Both pathways are always rendered; the inactive one is just `hidden`. That keeps the adult and
          child steps in the HTML and in the prerender for crawlers, without any extra visible block.
        */}
        {audiences.map((audience) => {
          const isActive = audience.id === audienceId;
          return (
            <ol
              key={audience.id}
              className="asmt-steps__list"
              aria-label={`${audience.label} ${content.schema.assessmentLabel} assessment steps`}
              hidden={!isActive}
            >
              {audience.steps.map((step) => {
                const isOpen = isActive && step.index === openIndex;
                const isInfoOpen = isActive && step.index === infoIndex;
                const bodyId = `asmt-step-body-${audience.id}-${step.index}`;
                const infoId = `asmt-step-info-${audience.id}-${step.index}`;
                return (
                  <li className={`asmt-step${isOpen ? ' is-open' : ''}`} key={step.index}>
                    <span className="asmt-step__marker" aria-hidden="true">
                      {step.index + 1}
                    </span>
                    <div
                      className="asmt-step__pill"
                      onPointerEnter={(event) => handleStepPointerEnter(event, step.index)}
                      onPointerLeave={handleStepPointerLeave}
                    >
                      <div className="asmt-step__head">
                        <button
                          type="button"
                          className="asmt-step__toggle"
                          aria-expanded={isOpen}
                          aria-controls={bodyId}
                          onClick={() => handleStepClick(step.index)}
                        >
                          <span className="asmt-step__name">{step.name}</span>
                          {step.duration && (
                            <span className="asmt-step__duration">{step.duration}</span>
                          )}
                        </button>
                        <div
                          className="asmt-step__info-wrap"
                          onMouseEnter={() => showInfo(step.index)}
                          onMouseLeave={() => scheduleInfoClose(step.index)}
                        >
                          <button
                            type="button"
                            className="asmt-step__info"
                            aria-label={`More information about step ${step.index + 1}`}
                            aria-expanded={isInfoOpen}
                            aria-controls={infoId}
                            onClick={() => (isInfoOpen ? setInfoIndex(null) : showInfo(step.index))}
                            onFocus={() => showInfo(step.index)}
                            onBlur={(event) => {
                              if (!event.currentTarget.parentElement?.contains(event.relatedTarget)) {
                                scheduleInfoClose(step.index);
                              }
                            }}
                          >
                            <i className="pi pi-info-circle" aria-hidden="true" />
                          </button>
                          <div
                            id={infoId}
                            role="tooltip"
                            className={`asmt-step__tooltip${isInfoOpen ? ' is-visible' : ''}`}
                          >
                            {step.extraInfo}
                          </div>
                        </div>
                      </div>
                      <div className="asmt-step__body" id={bodyId}>
                        <div className="asmt-step__body-inner">
                          <p className="asmt-step__detail">{step.detail}</p>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          );
        })}
      </div>
    </section>
  );
}
