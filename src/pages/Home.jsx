import React, { useEffect, useRef } from 'react';

import './home.css';

import CompressedSections from '../components/CompressedSections';
import PricesSection from '../components/PricesSection';
import HowItWorks from '../components/HowItWorks';
import QuestionsAnswered from '../components/QuestionsAnswered';
import PeopleBehind from '../components/PeopleBehind';

import { Image } from 'primereact/image';
import { Button } from 'primereact/button';
import { requestContactModal } from '../utils/contactModalService';

export default function Home() {
  const gentleSlideRef = useRef(null);
  const ageSectionsRef = useRef(null);

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

    window.history.scrollRestoration = 'manual'

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="mainContent">
      <div className='bgContent'>
        <Image src="/images/bg-pic-1.jpg" />
      </div>
      <div className="topContent">
        <div className='titleAndButton'>
          <div className='titles'>
            <div className='bigTitle'>
              Skip the Wait
              <br />
              Feel Great
            </div>
            <div className='smallTitle'>
              <div className='smallTitleBold'>
                Book Today, Be Seen Right Away,
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
          <div className='whyChooseUsContent'>
            <div className='whyChooseUsTitle'>
              Why Choose Us?
            </div>
            <div className='whyChooseUsTextAndImg'>
              <div className='whyChooseUsText'>
                <div className='whyChooseUsTextBold'>
                  No waiting list.
                </div>
                <div className='whyChooseUsTextRegular'>
                  Automatic appointment available vs +2 years on the NHS.
                </div>
                <div className='whyChooseUsTextBold'>
                  Expert team.
                </div>
                <div className='whyChooseUsTextRegular'>
                  Child and adult psychiatrists with GMC registration and NHS experience.
                </div>
                <div className='whyChooseUsTextBold'>
                  Valid reports
                </div>
                <div className='whyChooseUsTextRegular'>
                  for education plans and work adjustments (Equality Act 2010).
                </div>
                <div className='whyChooseUsTextBold'>
                  Flexibility.
                </div>
                <div className='whyChooseUsTextRegular'>
                  Online assessment throughout the UK.
                </div>
              </div>
              <div className='whyChooseUsImg'>
                <Image src="/images/flower-kid.png" />
              </div>
            </div>
          </div>
          <Image className="curveShadow" src="/images/curveShadow.png" />
          <div className='whyChooseUsContent gentleSlide' ref={gentleSlideRef}>
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
        <div className='whiteBg'>
          <div className='blueLineBg'>
            <div className='darkBlueLine' />
            <PricesSection />
          </div>
        </div>
        <div className='whiteBg'>
          <HowItWorks />
        </div>
        <div className='whiteBg'>
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
        <div className='whiteBg'>
          <PeopleBehind />
        </div>
      </div>
    </div>
  );
} 
