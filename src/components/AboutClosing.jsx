import React from 'react';
import { Link } from 'react-router-dom';
import './aboutClosing.css';

export default function AboutClosing() {
  return (
    <section className="aboutClosing">
      <div className="aboutClosingPrinciples">
        <div className="aboutClosingItem aboutClosingItem--left">
          <h3 className="aboutClosingHeading">
            One connected
            <br />
            <em>pathway</em>
          </h3>
          <div className="aboutClosingCard">
            <p>
              Different professionals may contribute at different stages, but they work towards the
              same clinical picture, sharing relevant information and bringing their perspectives
              together rather than treating each appointment in isolation.
            </p>
          </div>
        </div>

        <div className="aboutClosingItem aboutClosingItem--center">
          <h3 className="aboutClosingHeading">
            Thoughtful care,
            <br />
            beyond
            <br />
            <em>the appointment</em>
          </h3>
          <div className="aboutClosingCard aboutClosingCard--tall">
            <p>Much of your assessment happens behind the scenes.</p>
            <p>
              Information is reviewed, clinicians collaborate, documentation is prepared and next
              steps are coordinated so that the pathway continues moving without you having to piece
              everything together yourself.
            </p>
          </div>
        </div>

        <div className="aboutClosingItem aboutClosingItem--right">
          <h3 className="aboutClosingHeading aboutClosingHeading--right">
            Understanding the
            <br />
            <em>whole person</em>
          </h3>
          <div className="aboutClosingCard">
            <p>
              We look beyond individual traits or symptoms, considering development, communication,
              sensory experiences, everyday functioning, strengths and challenges within the context
              of each person’s life
            </p>
          </div>
        </div>
      </div>

      <div className="aboutClosingBanner">
        <img
          src="/images/hands-background-compressed.avif"
          alt="Hands coming together"
          loading="lazy"
          decoding="async"
        />
        <div className="aboutClosingBannerShade" aria-hidden="true" />
        <div className="aboutClosingBannerCopy">
          <h2 className="aboutClosingBannerTitle">
            <span>Care built around you</span>
            <em>
              From the first question
              <br />
              to clearer answers.
            </em>
          </h2>
          <p>
            helping you understand the whole picture and
            <br />
            what comes next.
          </p>
        </div>
        <Link className="aboutClosingCta" to="/">
          Explore our assessments
          <span className="aboutClosingCtaArrow" aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
