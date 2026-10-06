import React from 'react';
import { requestContactModal } from '../../utils/contactModalService';
import './assessmentFinalCta.css';

export default function AssessmentFinalCta({ content }) {
  const { enquiry, finalCta } = content;

  const openEnquiry = () => {
    requestContactModal({
      message: enquiry.message,
      source: enquiry.finalSource,
      itemId: enquiry.itemId,
    });
  };

  return (
    <section className="asmt-cta" aria-labelledby="asmt-cta-title">
      <h2 className="asmt-cta__title" id="asmt-cta-title">
        {finalCta.titleLead}{' '}
        <span className="asmt-cta__title-italic">{finalCta.titleItalic}</span>
      </h2>
      <button type="button" className="asmt-cta__button" onClick={openEnquiry}>
        {finalCta.button}
        <i className="pi pi-arrow-right" aria-hidden="true" />
      </button>
    </section>
  );
}
