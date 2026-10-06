import React from 'react';
import './assessmentIncluded.css';

export default function AssessmentIncluded({ content }) {
  const { included } = content;

  return (
    <section className="asmt-included" id="whats-included" aria-labelledby="asmt-included-title">
      <header className="asmt-included__header">
        <h2 className="asmt-included__title" id="asmt-included-title">
          More than an{' '}
          <span className="asmt-included__title-italic">appointment</span>
        </h2>
        <p className="asmt-included__intro">{included.intro}</p>
      </header>

      <ul className="asmt-included__grid">
        {included.items.map((item) => (
          <li className="asmt-included__item" key={item.id}>
            <span className="asmt-included__icon" aria-hidden="true">
              <i className={item.icon} />
            </span>
            <h3 className="asmt-included__item-title">{item.title}</h3>
            <p className="asmt-included__item-copy">{item.description}</p>
          </li>
        ))}
      </ul>

      <p className="asmt-included__note">
        <i className="pi pi-info-circle" aria-hidden="true" />
        <span>{included.note}</span>
      </p>
    </section>
  );
}
