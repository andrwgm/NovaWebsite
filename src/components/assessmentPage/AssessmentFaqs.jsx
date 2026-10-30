import React from 'react';
import { requestContact } from '../../utils/contactRequestService';
import './assessmentFaqs.css';

// Native <details>: every answer is in the HTML (and the prerender) even while collapsed.
export default function AssessmentFaqs({ content }) {
  const { faqs, faqTitle } = content;

  return (
    <section className="asmt-faq" id="faqs" aria-labelledby="asmt-faq-title">
      <div className="asmt-faq__layout">
        <h2 className="asmt-faq__title" id="asmt-faq-title">
          {faqTitle.lead}{' '}
          <span className="asmt-faq__title-italic">{faqTitle.italic}</span>
        </h2>

        <div className="asmt-faq__list">
          {faqs.map((faq) => (
            <details className="asmt-faq__item" key={faq.id}>
              <summary className="asmt-faq__summary">
                <span className="asmt-faq__question">{faq.question}</span>
                <i className="pi pi-plus asmt-faq__icon" aria-hidden="true" />
              </summary>
              <p className="asmt-faq__answer">
                {faq.answer}
                {faq.action && (
                  <>
                    {' '}
                    <button
                      type="button"
                      className="asmt-faq__action"
                      onClick={() => requestContact({
                        source: faq.action.source,
                        itemId: faq.action.itemId,
                        audience: faq.action.audience,
                        under8Interest: faq.action.under8Interest,
                      })}
                    >
                      {faq.action.label}
                      <span aria-hidden="true"> →</span>
                    </button>
                  </>
                )}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
