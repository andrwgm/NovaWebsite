import React from 'react';
import './aboutStory.css';

export default function AboutStory() {
  return (
    <section className="aboutStory">
      <h1 className="aboutStoryTitle">
        A different kind of
        <br />
        <em>assessment journey</em>
      </h1>

      <div className="aboutStoryCopy">
        <p className="aboutStoryLabel">
          Our
          <br />
          <em>Story</em>
        </p>
        <div className="aboutStoryCopyMain">
          <p>
            Nova Clinics began with a simple idea: getting answers about Autism or ADHD should not
            add more complexity to an already important moment in someone’s life.
          </p>
          <p>
            For many people and families, the assessment journey can mean long waits, scattered
            information, multiple appointments and uncertainty about what happens next.
          </p>
          <p className="aboutStoryCopyItalic">We wanted to create something more considered.</p>
          <p>
            A clinic where clinical expertise and thoughtful support sit side by side. Where the
            different professionals involved in your assessment work as one team. And where you
            always have a clear view of where you are, what comes next and who is there to help.
          </p>
          <p className="aboutStoryCopyBold">
            That idea continues to shape how we build Nova Clinics today.
          </p>
        </div>
      </div>

      <div className="aboutStoryPhotos">
        <img
          className="aboutStoryConfetti"
          src="/images/confetti.avif"
          alt=""
          decoding="async"
        />
        <div className="aboutStoryPhotoRow">
          <img
            className="aboutStoryPhotoRow--left"
            src="/images/about-us-1.avif"
            alt="Three children smiling together"
            loading="lazy"
            decoding="async"
          />
          <img
            className="aboutStoryPhotoRow--tall"
            src="/images/about-us-2.avif"
            alt="Person sitting in an armchair"
            loading="lazy"
            decoding="async"
          />
          <img
            className="aboutStoryPhotoRow--right"
            src="/images/about-us-3.avif"
            alt="Child standing in a field at sunset"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
