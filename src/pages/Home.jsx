import React, { Suspense, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './home.css';

import { Image } from 'primereact/image';
import { Button } from 'primereact/button';
import { requestContactModal } from '../utils/contactModalService';
import LazySection from '../components/LazySection';

const CompressedSections = React.lazy(() => import('../components/CompressedSections'));
const QuestionnaireSection = React.lazy(() => import('../components/QuestionnaireSection'));
const PricesSection = React.lazy(() => import('../components/PricesSection'));
const SupportBoxSection = React.lazy(() => import('../components/SupportBoxSection'));
const HowItWorks = React.lazy(() => import('../components/HowItWorks'));
const QuestionsAnswered = React.lazy(() => import('../components/QuestionsAnswered'));
const TrustBadges = React.lazy(() => import('../components/TrustBadges'));

export default function Home() {
  const gentleSlideRef = useRef(null);
  const ageSectionsRef = useRef(null);
  const location = useLocation();
  const anchorId = location.hash ? location.hash.replace('#', '') : '';
  const forceLazySections = ['pricing', 'how-it-works', 'faqs'].includes(anchorId);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !('matchMedia' in window)) {
      return undefined;
    }
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => {
      setReduceMotion(mediaQuery.matches);
    };
    updateMotionPreference();
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateMotionPreference);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(updateMotionPreference);
    }
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', updateMotionPreference);
      } else if (mediaQuery.removeListener) {
        mediaQuery.removeListener(updateMotionPreference);
      }
    };
  }, []);

  useEffect(() => {
    const applyGentleSlideTransform = (progressOverride) => {
      if (!gentleSlideRef.current) return;

      // Get current transform value to calculate original position
      const currentTransform = gentleSlideRef.current.style.transform;
      let currentTranslateY = 0;
      if (currentTransform) {
        const match = currentTransform.match(/translateY\(([\d.]+)em\)/);
        if (match) {
          currentTranslateY = parseFloat(match[1]);
        }
      }

      // Get current visual positions (includes current transform)
      const gentleSlideRect = gentleSlideRef.current.getBoundingClientRect();

      // Convert em to pixels for calculations
      const emToPx = parseFloat(getComputedStyle(gentleSlideRef.current).fontSize);
      const currentTranslateYPx = currentTranslateY * emToPx;

      // Calculate original position by subtracting current transform
      const gentleSlideOriginalTop = gentleSlideRect.top - currentTranslateYPx;
      const gentleSlideOriginalHeight = gentleSlideRect.height;
      const gentleSlideOriginalBottom = gentleSlideRect.bottom - currentTranslateYPx;

      // Calculate progress based on original position
      const windowHeight = window.innerHeight;
      const elementTop = gentleSlideOriginalTop;
      const elementHeight = gentleSlideOriginalHeight;
      const progress = typeof progressOverride === 'number'
        ? progressOverride
        : Math.max(0, Math.min(1, (windowHeight - elementTop) / (windowHeight + elementHeight)));

      // Allow deeper translation on very large screens
      const maxTranslateEm = window.innerWidth >= 2560 ? 45 : 40;

      // Calculate desired translateY based on scroll progress
      const desiredTranslateY = (progress * maxTranslateEm);
      const desiredTranslateYPx = desiredTranslateY * emToPx;

      // Calculate where the bottom would be with the desired transform
      const gentleSlideBottomWithTransform = gentleSlideOriginalBottom + desiredTranslateYPx;
      let finalTranslateY = desiredTranslateY;
      if (ageSectionsRef.current) {
        const ageSectionsRect = ageSectionsRef.current.getBoundingClientRect();
        const ageSectionsTop = ageSectionsRect.top;
        if (gentleSlideBottomWithTransform > ageSectionsTop) {
          // Calculate maximum allowed translateY to prevent overlap
          const maxTranslateYPx = ageSectionsTop - gentleSlideOriginalBottom;
          const maxTranslateYEm = maxTranslateYPx / emToPx;
          finalTranslateY = Math.max(0, Math.min(desiredTranslateY, maxTranslateYEm));
        }
      }

      gentleSlideRef.current.style.transform = `translateY(${finalTranslateY}em)`;
    };

    if (reduceMotion) {
      const handleResize = () => applyGentleSlideTransform(1);
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }

    const handleScroll = () => applyGentleSlideTransform();

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial position

    window.history.scrollRestoration = 'manual';

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (!anchorId) return;

    requestAnimationFrame(() => {
      const target = document.getElementById(anchorId);
      if (target) {
        const offset = 120;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
      }
    });
  }, [anchorId]);

  return (
    <div className="mainContent">
      <div className='titleAndButton parallax' fetchpriority="high">
        <div className='titles'>
          <p className='bigTitle'>
            Skip the NHS wait
            <span className='bigTitleItalic'>
              Feel Great
            </span>
          </p>
          <div className='smallTitle'>
            <h1 className='smallTitleBold'>
              Private Autism & ADHD Assessments
            </h1>
            <p className='smallTitleRegular'>
              <br />
              Your assessment in weeks, not years
            </p>
          </div>
        </div>
        <div className='bookButton'>
          <Button onClick={requestContactModal}>
            <Image src="/images/bookButton.avif" alt="Book Button" />
            Contact us
          </Button>
        </div>
      </div>
      <div className='whiteBg withHeight'>
        <div className='whyChooseUsContent' id="why-choose-us">
          <h2 className='whyChooseUsTitle'>
            Why people
            <span className='whyChooseUsTitleItalic'>
              trust Nova?
            </span>
          </h2>
          <div className='whyChooseUsTextAndImg'>
            <div className='whyChooseUsText'>
              <div className='whyChooseUsTextBold'>
                End the 2 year NHS wait today.
              </div>
              <div className='whyChooseUsTextRegular'>
                95% of our clients are seen within 2 weeks.
                All of them have an outcome within 1 month.
              </div>
              <div className='whyChooseUsTextBold'>
                Experts Who Actually Listen.
              </div>
              <div className='whyChooseUsTextRegular'>
                Experienced HCPC and BPS registered Clinical Psychologists offering compassionate support for all ages, every day.
              </div>
              <div className='whyChooseUsTextBold'>
                Outcome Letters That Change Everything
              </div>
              <div className='whyChooseUsTextRegular'>
                Instantly accepted by schools, colleges, universities, employers and the DWP.
                {/* – whether it confirms a diagnosis or gives you peace of mind. */}
              </div>
              <div className='whyChooseUsTextBold'>
                100% Online, Anywhere in the UK
              </div>
              <div className='whyChooseUsTextRegular'>
                No Travel, No Stress. Perfect for busy parents, anxious teens, or adults juggling work.
              </div>
            </div>
            <div className='whyChooseUsImg'>
              <Image src="/images/beach-kid.avif" alt="Kid on the beach" />
            </div>
          </div>
        </div>
        <Image className="curveShadow" src="/images/curveShadow.avif" alt="Curve Shadow Image" />
        <div className='whyChooseUsContent gentleSlide' ref={gentleSlideRef} id="is-this-for-me">
          <h2 className='isThisForMeTitle'>
            Is this
            <span className='isThisForMeTitleItalic'>
              for me?
            </span>
          </h2>
          <div className='isThisForMeText'>
            Every child, teen and adult is unique - but sometimes those little (or big) differences start to feel like something more.
            If school is a battle, work feels overwhelming, or daily life just seems harder than it should… you’re in the right place.
            We’ve helped thousands recognise the signs of Autism, ADHD (or both) - and discover it’s NOT a lack of effort or “bad behaviour”.
          </div>
        </div>
      </div>
      <LazySection className="parallax" ref={ageSectionsRef} forceVisible={forceLazySections}>
        <Suspense fallback={null}>
          <QuestionnaireSection />
        </Suspense>
      </LazySection>
      <LazySection id="pricing" forceVisible={forceLazySections}>
        <Suspense fallback={null}>
          <div className='blueLineBg'>
            <div className='darkBlueLine' />
            <PricesSection />
          </div>
        </Suspense>
      </LazySection>
      <LazySection forceVisible={forceLazySections}>
        <Suspense fallback={null}>
          <SupportBoxSection />
        </Suspense>
      </LazySection>
      <LazySection id="how-it-works" forceVisible={forceLazySections}>
        <Suspense fallback={null}>
          <HowItWorks />
        </Suspense>
      </LazySection>
      <LazySection id="faqs" forceVisible={forceLazySections}>
        <Suspense fallback={null}>
          <QuestionsAnswered />
        </Suspense>
      </LazySection>
      <LazySection forceVisible={forceLazySections}>
        <div className='stillHaveQuestionsBg'>
          <p className='stillHaveQuestionsTitle'>
            Still have questions?
          </p>
          <Button label="Get in contact" icon="pi pi-send" iconPos="right" onClick={requestContactModal} />
        </div>
      </LazySection>
      <LazySection forceVisible={forceLazySections}>
        <Suspense fallback={null}>
          <TrustBadges className="trust-badges--no-top-border" />
        </Suspense>
      </LazySection>
    </div>
  );
} 
