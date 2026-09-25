import React, { useEffect, useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';

import ApplicationSuccessModal from './ApplicationSuccessModal';
import ContactVacationModal from './ContactVacationModal';
import { CONTACT_FORM_RESPONSE_MODE } from '../config/contactFormResponse';
import { CONTACT_SUBMISSIONS_ENDPOINT } from '../utils/api';
import { trackContactFormOpen, trackGenerateLead } from '../utils/googleAnalytics';
import { trackMetaFormStart } from '../utils/metaPixel';
import { getEnquiryAttributionPayload } from '../utils/enquiryAttribution';
import { TURNSTILE_CONTACT_ACTION, TURNSTILE_SITE_KEY, whenTurnstileReady } from '../utils/turnstile';
import './contactModal.css';

function formatUkPhone(raw) {
  let digits = String(raw ?? '').replace(/\D/g, '');

  if (digits.startsWith('0044')) {
    digits = digits.slice(4);
  } else if (digits.startsWith('44')) {
    digits = digits.slice(2);
  }

  if (digits.startsWith('0')) {
    digits = digits.slice(1);
  }

  digits = digits.slice(0, 10);
  if (!digits) return '';

  const first = digits.slice(0, 4);
  const rest = digits.slice(4);
  return rest ? `+44 ${first} ${rest}` : `+44 ${first}`;
}

const INITIAL_FORM = {
  name: '',
  email: '',
  phone: '',
  message: '',
  consent: false,
  website: '',
};

export default function ContactModal({
  requestId = 0,
  prefillMessage = '',
  formSource = 'unknown',
  itemId,
}) {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const overlayRef = useRef(null);
  const turnstileContainerRef = useRef(null);
  const turnstileWidgetIdRef = useRef(null);
  const formStartTracked = useRef(false);
  const [turnstileToken, setTurnstileToken] = useState('');

  useEffect(() => {
    if (requestId > 0) {
      setVisible(true);
      formStartTracked.current = false;
      setFormData((prev) => ({ ...prev, message: prefillMessage }));
      trackContactFormOpen({ form_source: formSource, item_id: itemId });
    }
  }, [requestId, prefillMessage, formSource, itemId]);

  useEffect(() => {
    if (!visible) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const overlay = overlayRef.current;
    const visualViewport = window.visualViewport;

    const syncKeyboardInset = () => {
      if (!overlay || !visualViewport) return;
      const inset = Math.max(0, window.innerHeight - visualViewport.height - visualViewport.offsetTop);
      overlay.style.setProperty('--keyboard-inset', `${inset}px`);
    };

    visualViewport?.addEventListener('resize', syncKeyboardInset);
    visualViewport?.addEventListener('scroll', syncKeyboardInset);
    syncKeyboardInset();

    return () => {
      document.body.style.overflow = previousOverflow;
      visualViewport?.removeEventListener('resize', syncKeyboardInset);
      visualViewport?.removeEventListener('scroll', syncKeyboardInset);
      overlay?.style.setProperty('--keyboard-inset', '0px');
    };
  }, [visible]);

  useEffect(() => {
    if (!visible) {
      return undefined;
    }

    setTurnstileToken('');
    let cancelled = false;

    const cancelReadyWait = whenTurnstileReady(() => {
      if (cancelled || !turnstileContainerRef.current || !window.turnstile?.render) {
        return;
      }
      if (turnstileWidgetIdRef.current) {
        window.turnstile.remove(turnstileWidgetIdRef.current);
        turnstileWidgetIdRef.current = null;
      }
      turnstileWidgetIdRef.current = window.turnstile.render(turnstileContainerRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        action: TURNSTILE_CONTACT_ACTION,
        theme: 'light',
        size: 'flexible',
        language: 'en',
        'refresh-expired': 'auto',
        callback: (token) => setTurnstileToken(token),
        'expired-callback': () => setTurnstileToken(''),
        'error-callback': () => setTurnstileToken(''),
        'timeout-callback': () => setTurnstileToken(''),
      });
    });

    return () => {
      cancelled = true;
      cancelReadyWait();
      if (turnstileWidgetIdRef.current && window.turnstile?.remove) {
        window.turnstile.remove(turnstileWidgetIdRef.current);
      }
      turnstileWidgetIdRef.current = null;
      setTurnstileToken('');
    };
  }, [visible]);

  const resetTurnstile = () => {
    setTurnstileToken('');
    if (turnstileWidgetIdRef.current && window.turnstile?.reset) {
      window.turnstile.reset(turnstileWidgetIdRef.current);
    }
  };

  const trackFormStartOnce = () => {
    if (formStartTracked.current) return;
    formStartTracked.current = true;
    trackMetaFormStart({ form_source: formSource, item_id: itemId });
  };

  const handleFieldFocus = (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (!['INPUT', 'TEXTAREA'].includes(target.tagName)) return;
    if (target.id === 'contact-website') return;

    if (target.getAttribute('type') !== 'checkbox') {
      trackFormStartOnce();
    }

    window.requestAnimationFrame(() => {
      target.scrollIntoView({ block: 'center', inline: 'nearest' });
    });
  };

  const handleChange = (field) => (event) => {
    if (field === 'consent') {
      setFormData((prev) => ({ ...prev, consent: event.target.checked }));
    } else if (field === 'website') {
      setFormData((prev) => ({ ...prev, website: event.target.value }));
    } else {
      trackFormStartOnce();
      setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    }
  };

  const handlePhoneChange = (event) => {
    trackFormStartOnce();
    setFormData((prev) => ({ ...prev, phone: formatUkPhone(event.target.value) }));
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

    if (!turnstileToken) {
      setSubmitError('Please complete the verification before submitting.');
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
          attribution: getEnquiryAttributionPayload(),
          'cf-turnstile-response': turnstileToken,
          website: formData.website,
        }),
      });

      if (!response.ok) {
        resetTurnstile();
        const message = `Request failed with status ${response.status}`;
        throw new Error(message);
      }

      trackGenerateLead({
        method: 'contact_form',
        form_source: formSource,
        item_id: itemId,
      });
      setFormData(INITIAL_FORM);
      setSubmitSuccess(true);
      close();
    } catch (error) {
      console.error('Failed to submit contact form', error);
      resetTurnstile();
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
        <div className="contact-modal-overlay" ref={overlayRef} onClick={close}>
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
            <form className="contact-modal-form" onSubmit={handleSubmit} onFocus={handleFieldFocus}>
              <span className="p-float-label">
                <InputText
                  id="contact-name"
                  value={formData.name}
                  onChange={handleChange('name')}
                  required
                />
                <label htmlFor="contact-name">Full name</label>
              </span>
              <div className="contact-modal-hp" aria-hidden="true">
                <label htmlFor="contact-website">Website</label>
                <input
                  id="contact-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={handleChange('website')}
                />
              </div>
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
                <InputText
                  id="contact-phone"
                  inputMode="tel"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  placeholder="+44 7700 900123"
                />
                <label htmlFor="contact-phone">Phone (UK) (optional)</label>
              </span>
              <p className="contact-modal-phone-hint">Leave out the first 0. For example, 07700 900123 is +44 7700 900123.</p>
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
              <div
                ref={turnstileContainerRef}
                className="contact-modal-turnstile"
                aria-label="Bot verification"
              />
              {submitError && <p className="contact-modal-error">{submitError}</p>}

              <Button
                type="submit"
                label={isSubmitting ? 'Submitting...' : 'Submit'}
                icon="pi pi-send"
                iconPos="right"
                className="contact-modal-submit"
                disabled={isSubmitting || !formData.consent || !turnstileToken}
              />
            </form>
          </div>
        </div>
      )}
      {CONTACT_FORM_RESPONSE_MODE === 'standard' && (
        <ApplicationSuccessModal
          visible={submitSuccess}
          onClose={() => setSubmitSuccess(false)}
          message="Done! We'll get back to you by email as soon as possible. Please keep an eye on your inbox."
        />
      )}
      {CONTACT_FORM_RESPONSE_MODE === 'vacation' && (
        <ContactVacationModal
          visible={submitSuccess}
          onClose={() => setSubmitSuccess(false)}
        />
      )}
    </>
  );
}
