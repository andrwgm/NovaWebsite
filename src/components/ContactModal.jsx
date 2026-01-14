import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputMask } from 'primereact/inputmask';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';

import ApplicationSuccessModal from './ApplicationSuccessModal';
import { onContactModalRequest } from '../utils/contactModalService';
import { CONTACT_SUBMISSIONS_ENDPOINT } from '../utils/api';
import './contactModal.css';

const INITIAL_FORM = {
  name: '',
  email: '',
  phone: '',
  message: '',
  consent: false,
};

export default function ContactModal() {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const unsubscribe = onContactModalRequest(() => setVisible(true));
    return unsubscribe;
  }, []);

  const handleChange = (field) => (event) => {
    if (field === 'consent') {
      setFormData((prev) => ({ ...prev, consent: event.target.checked }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    }
  };

  const close = () => {
    setVisible(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError('');

    if (!formData.consent) {
      setSubmitError('Debes aceptar la política de privacidad.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(CONTACT_SUBMISSIONS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Not provided',
          message: formData.message || 'Not provided',
          consent: Boolean(formData.consent),
        }),
      });

      if (!response.ok) {
        const message = `Request failed with status ${response.status}`;
        throw new Error(message);
      }

      setFormData(INITIAL_FORM);
      setSubmitSuccess(true);
      close();
    } catch (error) {
      console.error('Failed to submit contact form', error);
      setSubmitError('No se pudo enviar la solicitud. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!visible && !submitSuccess) {
    return null;
  }

  return (
    <>
      {visible && (
        <div className="contact-modal-overlay" onClick={close}>
          <div className="contact-modal" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="contact-modal-close"
              aria-label="Close contact form"
              onClick={close}
            >
              <i className="pi pi-times" />
            </button>
            <h2 className="contact-modal-title">Get in contact</h2>
            <form className="contact-modal-form" onSubmit={handleSubmit}>
              <span className="p-float-label">
                <InputText
                  id="contact-name"
                  value={formData.name}
                  onChange={handleChange('name')}
                  required
                />
                <label htmlFor="contact-name">Full name</label>
              </span>
              <span className="p-float-label">
                <InputText
                  id="contact-email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange('email')}
                  required
                />
                <label htmlFor="contact-email">Email address</label>
              </span>
              <span className="p-float-label">
                <InputMask
                  id="contact-phone"
                  mask="+44 9999 999999"
                  value={formData.phone}
                  onChange={handleChange('phone')}
                  placeholder="+44 ____ ______"
                />
                <label htmlFor="contact-phone">Phone (UK) (optional)</label>
              </span>
              <span className="p-float-label textarea-field">
                <InputTextarea
                  id="contact-message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange('message')}
                  required
                />
                <label htmlFor="contact-message">How can we help?</label>
              </span>
              <p className="contact-modal-consent-notice">Please do not include any medical or sensitive health information in this form.</p>
              <div className="contact-modal-consent">
                <Checkbox
                  inputId="contact-consent"
                  checked={formData.consent}
                  onChange={(event) => setFormData((prev) => ({ ...prev, consent: event.checked }))}
                />
                <label htmlFor="contact-consent">I have read and understood the <a href="/privacy-policy" target="_blank">Privacy Policy</a> and agree to the processing of my personal data for the purpose of responding to my enquiry.</label>
              </div>
              {submitError && <p className="contact-modal-error">{submitError}</p>}

              <Button
                type="submit"
                label={isSubmitting ? 'Submitting...' : 'Submit'}
                icon="pi pi-send"
                iconPos="right"
                className="contact-modal-submit"
                disabled={isSubmitting || !formData.consent}
              />
            </form>
          </div>
        </div>
      )}
      <ApplicationSuccessModal
        visible={submitSuccess}
        onClose={() => setSubmitSuccess(false)}
        message="Done! We'll get back to you as soon as possible."
      />
    </>
  );
}
