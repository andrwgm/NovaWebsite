import React, { useEffect, useRef } from 'react';

import './home.css';

import CompressedSections from '../components/CompressedSections';
import PricesSections from '../components/PricesSection';

import { Image } from 'primereact/image';
import { Button } from 'primereact/button';

export default function Home() {
  const gentleSlideRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (gentleSlideRef.current) {
        const rect = gentleSlideRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementTop = rect.top;
        const elementHeight = rect.height;

        // Calculate how much of the element should be visible
        const progress = Math.max(0, Math.min(1, (windowHeight - elementTop) / (windowHeight + elementHeight)));

        // Apply transform based on scroll progress
        const translateY = (10 + progress * 40);

        if (translateY <= 30) {
          gentleSlideRef.current.style.transform = `translateY(${translateY}em)`;
        }
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
            <Button>
              <Image src="/images/bookButton.png" />
              BOOK IN 60
            </Button>
          </div>
        </div>
        <div className='whiteBg'>
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
        <CompressedSections />
        <div className='whiteBg'>
          <div className='blueLineBg'>
            <div className='darkBlueLine' />
            <PricesSections />
          </div>
        </div>
      </div>
    </div>
  );
} 