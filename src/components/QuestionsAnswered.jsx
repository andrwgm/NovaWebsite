import React, { useEffect, useMemo, useRef, useState } from 'react';
import './questionsAnswered.css';

// Carousel: viewport + transform-based track
// - Drag horizontally on the images to move
// - Click dots to jump to a card

const SLIDES = [
  {
    img: '/images/penguin-kid.jpg',
    question: 'How fast are results?',
    answer:
      "You'll have your first appointment within 7–14 days of booking. Your written report with next steps arrives within five working days of the final assessment.",
  },
  {
    img: '/images/flower-kid.png',
    question: 'Are appointments online?',
    answer:
      'Yes — assessments are held online across the UK so you can join from home at a time that suits your family.',
  },
  {
    img: '/images/bg-pic-1.jpg',
    question: 'Will my GP be informed?',
    answer:
      'With your consent, we can share the outcome with your GP and school to help coordinate support.',
  },
  {
    img: '/images/ChatGPT Image.png',
    question: 'What about workplace or school?',
    answer:
      'Our reports are accepted for education plans and reasonable adjustments under the Equality Act 2010.',
  },
];

export default function QuestionsAnswered() {
  const slides = useMemo(() => SLIDES.map((s, idx) => ({ ...s, idx })), []);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const [x, setX] = useState(0); // current translateX

  const getTargetX = (idx) => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return 0;
    const child = track.children[idx];
    if (!child) return 0;
    return -(child.offsetLeft - (viewport.clientWidth - child.clientWidth) / 2);
  };

  const goTo = (idx) => {
    const target = getTargetX(idx);
    setX(target);
    if (idx !== active) setActive(idx);
  };

  // Initial centering and on resize
  useEffect(() => {
    goTo(0);
  }, []);

  // Keep centered on responsive changes
  useEffect(() => {
    const onResize = () => setX(getTargetX(active));
    window.addEventListener('resize', onResize);
    onResize();
    return () => window.removeEventListener('resize', onResize);
  }, [active]);

  const onDotClick = (idx) => goTo(idx);
  const prev = () => goTo(Math.max(0, active - 1));
  const next = () => goTo(Math.min(slides.length - 1, active + 1));

  return (
    <section className="qa">
      <div className="qa-left">
        <h2 className="qa-title">YOUR QUESTIONS ANSWERED</h2>
        <p className="qa-answer">{slides[active]?.answer}</p>
        <div className="qa-dots" role="tablist" aria-label="Carousel pagination">
          {slides.map((s, i) => (
            <button
              key={s.idx}
              className={`qa-dot${i === active ? ' active' : ''}`}
              aria-label={`Go to item ${i + 1}`}
              aria-selected={i === active}
              onClick={() => onDotClick(i)}
            />
          ))}
        </div>
      </div>

      <div className="qa-right">
        <div className="qa-viewport" ref={viewportRef}>
          <button
            type="button"
            className={`qa-arrow left${active === 0 ? ' disabled' : ''}`}
            aria-label="Previous"
            onClick={prev}
          >
            <i className="pi pi-chevron-left" />
          </button>
          <div className="qa-track" ref={trackRef} style={{ transform: `translateX(${x}px)` }}>
          {slides.map((s, i) => (
            <figure
              key={s.idx}
              className={`qa-card${i === active ? ' active' : ''}`}
              onClick={() => {
                if (i === active - 1) return goTo(Math.max(0, active - 1));
                if (i === active + 1) return goTo(Math.min(slides.length - 1, active + 1));
              }}
            >
              <img src={s.img} alt={s.question} />
              <figcaption className="qa-question">{s.question}</figcaption>
            </figure>
          ))}
          </div>
          <button
            type="button"
            className={`qa-arrow right${active === slides.length - 1 ? ' disabled' : ''}`}
            aria-label="Next"
            onClick={next}
          >
            <i className="pi pi-chevron-right" />
          </button>
        </div>
      </div>
    </section>
  );
}
