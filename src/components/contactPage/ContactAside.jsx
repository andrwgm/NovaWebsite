import React from 'react';
import { CONTACT_ASIDE } from '../../data/contactPage';
import './contactAside.css';

export default function ContactAside() {
  const { stepsTitle, steps, reassurance, image, imageAlt } = CONTACT_ASIDE;

  return (
    <aside className="caside" aria-label="About your enquiry">
      <figure className="caside__media">
        <img
          className="caside__image"
          src={image}
          alt={imageAlt}
          loading="lazy"
          decoding="async"
        />
      </figure>

      <div className="caside__card">
        <h2 className="caside__title">{stepsTitle}</h2>
        <ol className="caside__steps">
          {steps.map((step, index) => (
            <li key={step.title} className="caside__step">
              <span className="caside__step-icon" aria-hidden="true">
                <i className={step.icon} />
              </span>
              <div>
                <p className="caside__step-title">
                  <span className="caside__step-number">{index + 1}.</span> {step.title}
                </p>
                <p className="caside__step-text">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <ul className="caside__reassurance">
          {reassurance.map((item) => (
            <li key={item.text}>
              <i className={item.icon} aria-hidden="true" />
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
