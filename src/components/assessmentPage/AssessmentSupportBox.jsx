import React from 'react';
import { Link } from 'react-router-dom';
import './assessmentSupportBox.css';

export default function AssessmentSupportBox({ content }) {
  const box = content.supportBox;

  return (
    <section className="asmt-box" id="support-box" aria-labelledby="asmt-box-title">
      <div className="asmt-box__layout">
        <div className="asmt-box__copy">
          <h2 className="asmt-box__title" id="asmt-box-title">
            {box.titleLead}{' '}
            <span className="asmt-box__title-italic">{box.titleItalic}</span>
          </h2>
          <p className="asmt-box__text">{box.body}</p>
          <p className="asmt-box__delivery">
            <i className="pi pi-truck" aria-hidden="true" />
            <span>{box.delivery}</span>
          </p>
          <Link className="asmt-box__link" to={box.linkTo}>
            {box.linkLabel}
            <span className="asmt-box__link-arrow" aria-hidden="true">→</span>
          </Link>
        </div>

        <figure className="asmt-box__media">
          <img
            className="asmt-box__image"
            src={box.image}
            alt={box.imageAlt}
            loading="lazy"
            decoding="async"
            width={941}
            height={892}
          />
        </figure>
      </div>
    </section>
  );
}
