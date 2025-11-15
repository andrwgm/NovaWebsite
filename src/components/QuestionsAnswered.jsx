import React, { useCallback, useMemo, useState } from 'react';
import { Carousel } from 'primereact/carousel';
import './questionsAnswered.css';


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
  const [active, setActive] = useState(0);
  const totalSlides = slides.length;
  const activeSlideId = slides[active]?.idx;

  const goTo = useCallback(
    (idx) => {
      if (!totalSlides) return;
      const safeIndex = Math.min(Math.max(idx, 0), totalSlides - 1);
      setActive(safeIndex);
    },
    [totalSlides]
  );

  const onDotClick = (idx) => goTo(idx);
  const prev = () => goTo(active - 1);
  const next = () => goTo(active + 1);

  const handlePageChange = (event) => {
    const nextIndex = typeof event.page === 'number' ? event.page : 0;
    if (nextIndex !== active) {
      goTo(nextIndex);
    }
  };

  const cardTemplate = (slide) => {
    if (!slide) return null;
    const isActive = slide.idx === activeSlideId;

    return (
      <figure className={`qa-card${isActive ? ' active' : ''}`}>
        <img src={slide.img} alt={slide.question} />
        <figcaption className="qa-question">{slide.question}</figcaption>
      </figure>
    );
  };

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
        <div className="qa-viewport">
          <button
            type="button"
            className={`qa-arrow left${active === 0 ? ' disabled' : ''}`}
            aria-label="Previous"
            onClick={prev}
          >
            <i className="pi pi-chevron-left" />
          </button>
          <Carousel
            className="qa-carousel"
            value={slides}
            itemTemplate={cardTemplate}
            numVisible={1}
            numScroll={1}
            page={active}
            showIndicators={false}
            showNavigators={false}
            circular={false}
            onPageChange={handlePageChange}
          />
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
