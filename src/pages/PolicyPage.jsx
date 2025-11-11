import React from 'react';
import './policyPage.css';

export default function PolicyPage({ title, caption, intro = [], sections = [] }) {
  return (
    <section className="policy-page">
      <div className="policy-container">
        <header className="policy-header">
          {caption && <p className="policy-eyebrow">{caption}</p>}
          {title && <h1>{title}</h1>}
          {intro.map((paragraph, index) => (
            <p key={index} className="policy-paragraph">
              {paragraph}
            </p>
          ))}
        </header>

        <div className="policy-sections">
          {sections.map((section) => (
            <article key={section.title} className="policy-section">
              <h2>{section.title}</h2>
              {section.body?.map((paragraph, index) => (
                <p key={index} className="policy-paragraph">
                  {paragraph}
                </p>
              ))}
              {section.list && (
                <ul>
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
