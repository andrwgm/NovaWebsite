import React from 'react';
import { Button } from 'primereact/button';
import './contactVacationModal.css';

export default function ContactVacationModal({ visible, onClose }) {
  if (!visible) return null;

  return (
    <div className="contact-vacation-overlay" role="dialog" aria-modal="true" aria-labelledby="contact-vacation-title">
      <div className="contact-vacation-card">
        <div className="contact-vacation-icon" aria-hidden="true">
          <i className="pi pi-envelope" />
        </div>
        <h2 id="contact-vacation-title" className="contact-vacation-title">
          We&apos;ve received your enquiry
        </h2>
        <p className="contact-vacation-message">
          Thank you for getting in touch. We&apos;re currently on holiday until 1 September,
          but we&apos;ll respond as quickly as we can once we&apos;re back.
        </p>
        <Button
          type="button"
          label="Understood"
          className="contact-vacation-button"
          onClick={onClose}
        />
      </div>
    </div>
  );
}
