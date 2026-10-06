import React from 'react';
import { Link } from 'react-router-dom';
import { requestContactModal } from '../../utils/contactModalService';
import './assessmentHero.css';

export default function AssessmentHero({ content }) {
  const { hero, enquiry, seo } = content;

  const openEnquiry = () => {
    requestContactModal({
      message: enquiry.message,
      source: enquiry.heroSource,
      itemId: enquiry.itemId,
    });
  };

  return (
    <section className="asmt-hero" id="overview" aria-labelledby="asmt-hero-title">
      <nav className="asmt-hero__breadcrumb" aria-label="Breadcrumb">
        <ol>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/#pricing">Assessments</Link>
          </li>
          <li aria-current="page">{hero.breadcrumbLabel}</li>
        </ol>
      </nav>

      <div className="asmt-hero__grid">
        <div className="asmt-hero__copy">
          <p className="asmt-hero__label">{hero.label}</p>
          <h1 className="asmt-hero__title" id="asmt-hero-title">
            {hero.titleLead}{' '}
            <span className="asmt-hero__title-italic">{hero.titleItalic}</span>
          </h1>
          <p className="asmt-hero__intro">{hero.intro}</p>
          <p className="asmt-hero__body">{hero.body}</p>

          <div className="asmt-hero__price">
            <p className="asmt-hero__price-value">{hero.price}</p>
            <p className="asmt-hero__price-caption">{hero.priceCaption}</p>
            <p className="asmt-hero__price-note">{hero.priceNote}</p>
          </div>

          <div className="asmt-hero__actions">
            <button
              type="button"
              className="asmt-hero__button asmt-hero__button--primary"
              onClick={openEnquiry}
            >
              {enquiry.cta}
              <i className="pi pi-arrow-right" aria-hidden="true" />
            </button>
            <a
              className="asmt-hero__button asmt-hero__button--secondary"
              href="#how-it-works"
            >
              See how it works
            </a>
          </div>

          {hero.footnote && (
            <p className="asmt-hero__footnote">
              {hero.footnote.text}
              {hero.footnote.action && (
                <>
                  {' '}
                  <button
                    type="button"
                    className="asmt-hero__footnote-action"
                    onClick={() => requestContactModal({
                      message: hero.footnote.action.message,
                      source: hero.footnote.action.source,
                      itemId: hero.footnote.action.itemId,
                    })}
                  >
                    {hero.footnote.action.label}
                    <span aria-hidden="true"> →</span>
                  </button>
                </>
              )}
            </p>
          )}
        </div>

        <figure className="asmt-hero__media">
          <img
            className="asmt-hero__image"
            src={seo.heroImage}
            alt={seo.heroImageAlt}
            width={1536}
            height={1024}
            decoding="async"
            fetchpriority="high"
          />
        </figure>
      </div>
    </section>
  );
}
