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
                  {section.list.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}
              {section.orderedList && (
                <ol>
                  {section.orderedList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ol>
              )}
              {section.table && (
                <div className="policy-table-wrap">
                  <table className="policy-table">
                    <thead>
                      <tr>
                        {section.table.headers.map((header) => (
                          <th key={header} scope="col">{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {section.bodyAfterList?.map((paragraph, index) => (
                <p key={`after-${index}`} className="policy-paragraph">
                  {paragraph}
                </p>
              ))}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
