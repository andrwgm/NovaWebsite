import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './home.css';

import CompressedSections from '../components/CompressedSections';
import PricesSection from '../components/PricesSection';
import HowItWorks from '../components/HowItWorks';
import QuestionsAnswered from '../components/QuestionsAnswered';
import PeopleBehind from '../components/PeopleBehind';
import TrustBadges from '../components/TrustBadges';

import { Image } from 'primereact/image';
import { Button } from 'primereact/button';
import { requestContactModal } from '../utils/contactModalService';

export default function Home() {
  const gentleSlideRef = useRef(null);
  const ageSectionsRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (gentleSlideRef.current && ageSectionsRef.current) {
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
        const ageSectionsRect = ageSectionsRef.current.getBoundingClientRect();

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
        const progress = Math.max(0, Math.min(1, (windowHeight - elementTop) / (windowHeight + elementHeight)));

        // Calculate desired translateY based on scroll progress
        const desiredTranslateY = (progress * 40);
        const desiredTranslateYPx = desiredTranslateY * emToPx;

        // Calculate where the bottom would be with the desired transform
        const gentleSlideBottomWithTransform = gentleSlideOriginalBottom + desiredTranslateYPx;
        const ageSectionsTop = ageSectionsRect.top;

        // If the transformed bottom would overlap with age-sections, cap the translateY
        let finalTranslateY = desiredTranslateY;
        if (gentleSlideBottomWithTransform > ageSectionsTop) {
          // Calculate maximum allowed translateY to prevent overlap
          const maxTranslateYPx = ageSectionsTop - gentleSlideOriginalBottom;
          const maxTranslateYEm = maxTranslateYPx / emToPx;
          finalTranslateY = Math.max(0, Math.min(desiredTranslateY, maxTranslateYEm));
        }

        gentleSlideRef.current.style.transform = `translateY(${finalTranslateY}em)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial position

    window.history.scrollRestoration = 'manual';

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!location.hash) return;
    const targetId = location.hash.replace('#', '');
    if (!targetId) return;

    requestAnimationFrame(() => {
      const target = document.getElementById(targetId);
      if (target) {
        const offset = 120;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
      }
    });
  }, [location.hash]);

  return (
    <div className="mainContent">
      <div className='bgContent'>
        <Image src="/images/bg-pic-1.jpg" />
      </div>
      <div className="topContent">
        <div className='titleAndButton'>
          <div className='titles'>
            <div className='bigTitle'>
              Skip the NHS Wait
              <br />
              Feel Great
            </div>
            <div className='smallTitle'>
              <div className='smallTitleBold'>
                Your assessment in weeks, not years
              </div>
              <div className='smallTitleRegular'>
                <br />
                Private ADHD & Autism Diagnosis UK
              </div>
            </div>
          </div>
          <div className='bookButton'>
            <Button onClick={requestContactModal}>
              <Image src="/images/bookButton.png" />
              BOOK IN 60
            </Button>
          </div>
        </div>
        <div className='whiteBg withHeight'>
          <Image className="blueLine" src="/images/blueLine.png" />
          <div className='whyChooseUsContent' id="why-choose-us">
            <div className='whyChooseUsTitle'>
              Why People Trust Nova
            </div>
            <div className='whyChooseUsTextAndImg'>
              <div className='whyChooseUsText'>
                <div className='whyChooseUsTextBold'>
                  End the 2 year NHS wait today.
                  {/* No waiting list. */}
                </div>
                <div className='whyChooseUsTextRegular'>
                  95% of our clients are seen within 2 weeks.
                  All of them have an outcome within 1 month.
                </div>
                <div className='whyChooseUsTextBold'>
                  Experts Who Actually Listen.
                </div>
                <div className='whyChooseUsTextRegular'>
                  HCPC and BPS registered Clinical Psychologists with decades of NHS and private experience are here to support children, young people and adults every single day.
                </div>
                <div className='whyChooseUsTextBold'>
                  Outcome Letters That Change Everything
                </div>
                <div className='whyChooseUsTextRegular'>
                  Instantly accepted by schools, colleges, universities, employers and the DWP – whether it confirms a diagnosis or gives you peace of mind.
                </div>
                <div className='whyChooseUsTextBold'>
                  100% Online, Anywhere in the UK
                </div>
                <div className='whyChooseUsTextRegular'>
                  No Travel, No Stress. Perfect for busy parents, anxious teens, or adults juggling work.
                </div>
              </div>
              <div className='whyChooseUsImg'>
                <Image src="/images/flower-kid.png" />
              </div>
            </div>
          </div>
          <Image className="curveShadow" src="/images/curveShadow.png" />
          <div className='whyChooseUsContent gentleSlide' ref={gentleSlideRef} id="is-this-for-me">
            <div className='isThisForMeTitle'>
              Is this for me?
            </div>
            <div className='isThisForMeText'>
              Every child is unique, yet certain patterns of behaviour can signal that an Autism Spectrum Condition (ASC) or Attention-Deficit/Hyperactivity Disorder (ADHD) assessment could be helpful. <br /> Below you’ll find common red-flags grouped by age—use them as a guide, not a checklist. If several points resonate, our team is here to talk things through.
            </div>
          </div>
        </div>
        <div ref={ageSectionsRef}>
          <CompressedSections />
        </div>
        <div className='whiteBg' id="pricing">
          <div className='blueLineBg'>
            <div className='darkBlueLine' />
            <PricesSection />
          </div>
        </div>
        <div className='whiteBg' id="how-it-works">
          <HowItWorks />
        </div>
        <div className='whiteBg' id="faqs">
          <QuestionsAnswered />
        </div>
        <div className='whiteBg'>
          <div className='stillHaveQuestionsBg'>
            <div className='stillHaveQuestionsTitle'>
              Still have questions?
            </div>
            <Button label="Get in contact" icon="pi pi-send" iconPos="right" onClick={requestContactModal} />
          </div>
        </div>
        <div className='whiteBg' id="people-behind">
          <PeopleBehind />
        </div>
        <div className="whiteBg">
          <TrustBadges />
        </div>
      </div>
    </div>
  );
} 
