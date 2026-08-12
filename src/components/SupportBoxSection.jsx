import React from 'react';
import { Link } from 'react-router-dom';
import './supportBoxSection.css';

export default function SupportBoxSection() {
  return (
    <section className="supportBoxSection" aria-labelledby="support-box-title">
      <div className="supportBoxSectionWall" aria-hidden="true" />

      <div className="supportBoxSectionLayout">
        <div className="supportBoxSectionContent">
          <div className="supportBoxSectionCopy">
            <h2 className="supportBoxSectionTitle" id="support-box-title">
              <span className="supportBoxSectionTitleLine">Everything</span>
              <span className="supportBoxSectionTitleLine">you need,</span>
              <span className="supportBoxSectionTitleLine supportBoxSectionTitleLineIndented">
                in one <span className="supportBoxSectionTitleItalic">box.</span>
              </span>
            </h2>
            <p className="supportBoxSectionText">
              Whichever Nova Clinics plan you choose, your support box is included. Inside,
              you&apos;ll find practical guides, family resources and thoughtfully designed tools
              to help you feel informed, prepared and supported throughout the assessment journey.
            </p>
          </div>

          <Link className="supportBoxSectionCta" to="/support">
            Explore what&apos;s inside
            <span className="supportBoxSectionCtaArrow" aria-hidden="true">
              →
            </span>
          </Link>
        </div>

        <div className="supportBoxSectionImage">
          <img
            src="/images/box-no-bg-shadow-cropped.avif"
            alt="Nova Clinics support box with practical guides and family resources"
            loading="lazy"
            decoding="async"
            width={640}
            height={480}
          />
        </div>
      </div>
    </section>
  );
}
