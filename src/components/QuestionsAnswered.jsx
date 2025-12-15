import React, { useCallback, useMemo, useState } from 'react';
import { Carousel } from 'primereact/carousel';
import './questionsAnswered.css';


const SLIDES = [
  {
    img: '/images/penguin-kid.jpg',
    question: 'How fast are the results?',
    answer:
      "We aim to provide your comprehensive report within 4 weeks of completing the assessment process, although it’s usually much quicker. This includes time for our multidisciplinary team to thoughtfully review all insights, ensuring a thorough understanding of your unique strengths and needs. If any delays arise, we'll keep you informed every step of the way.",
  },
  {
    img: '/images/flower-kid.png',
    question: 'Are appointments online only?',
    answer:
      'Yes, our assessments are conducted securely online via video call, making them accessible from anywhere in the UK. If you need adjustments for in-person elements, just let us know.',
  },
  {
    img: '/images/bg-pic-1.jpg',
    question: 'Will my GP be informed?',
    answer:
      'We only share information with your GP or other healthcare professionals with your explicit consent, conforming with GDPR regulations. Many clients choose to share their report to support ongoing care, but the decision is entirely yours - we\'re here to empower your choices.',
  },
  {
    img: '/images/ChatGPT Image.png',
    question: 'What about my workplace or school?',
    answer:
      'Our reports are designed to highlight your neurodiverse strengths and recommend practical adjustments, recognised under the Equality Act 2010 for workplaces and education settings. They can support access to accommodations like flexible working or exam arrangements, helping you thrive in your environment.',
  },
  {
    img: '/images/ChatGPT Image.png',
    question: 'How much does an assessment cost?',
    answer:
      'Our ADHD or autism assessments start at £[   ] for adults and £[    ] for children/young people, with combined assessments at £[  ]. Prices include all stages, from questionnaires to feedback. We offer transparent pricing with no hidden fees - contact us for full details or payment options.',
  },
  {
    img: '/images/ChatGPT Image.png',
    question: 'What should I prepare for the assessment?',
    answer:
      'We\'ll guide you every step, but gathering any relevant history (like school reports or past medical notes) can help paint a fuller picture of your journey. For adults, think about inviting a close informant; for children, we\'ll involve parents/carers. No special preparation is needed beyond being in a comfortable space.',
  },
  {
    img: '/images/ChatGPT Image.png',
    question: 'Who will conduct my assessment?',
    answer:
      'Your assessment is led by our expert team of HCPC-registered clinical psychologists with extensive NHS experience in neurodiversity. We take a multidisciplinary approach, compliant with NICE standards, to ensure a holistic view that honours your individuality.',
  },
  {
    img: '/images/ChatGPT Image.png',
    question: 'What happens if I receive a diagnosis of ADHD or autism?',
    answer:
      'A diagnosis can be a powerful step towards self-understanding and accessing supports that amplify your strengths. We\'ll provide tailored recommendations in your report, plus signpost resources for therapy, coaching, or community groups. Ongoing support is available through our clinic if needed.',
  },
  {
    img: '/images/ChatGPT Image.png',
    question: 'Do you offer medication or treatment?',
    answer:
      'We focus on assessments, we recommend you speak with you GP about medication. ',
  },
  {
    img: '/images/ChatGPT Image.png',
    question: 'Do you provide combined ADHD and autism assessments?',
    answer:
      'Absolutely - we offer integrated assessments for those exploring both ADHD and autism, saving time and providing a unified view of your neurodiverse profile. This follows best practices from NICE and helps uncover how your traits interplay.',
  },
  {
    img: '/images/ChatGPT Image.png',
    question: 'What is your cancellation and refund policy?',
    answer:
      'We understand that plans can change, and we\'re here to make things as straightforward as possible. Here\'s a clear breakdown:\n\n• More than 14 days before your first appointment: Full refund minus the £400 deposit.\n• Between 48 hours and 14 days before: 50% of the total fee is payable (we\'ll refund the rest).\n• Less than 48 hours before, or if you don\'t attend: The full fee is payable, with no refund. (If you\'re more than 20 minutes late, we\'ll treat it as a non-attendance, but please don\'t worry - our admin team will happily help reschedule to our next available slot that suits you.)\n\nRefunds are processed within 10 working days to your original payment method. You can reschedule once for free with at least 48 hours\' notice; any further changes or those within 48 hours will be handled as a cancellation under the above terms. As a helpful reminder, we\'ll call you 72 hours before your appointment to confirm and address any questions. Full details are in our terms and conditions.',
  },
  {
    img: '/images/ChatGPT Image.png',
    question: 'Am I eligible for an assessment at Nova Clinics?',
    answer:
      'We\'re open to children, young people, and adults across the UK who suspect they may be neurodivergent. No referral is needed - if you\'re curious about ADHD or autism traits, our initial screening can help determine if an assessment fits your journey.',
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
